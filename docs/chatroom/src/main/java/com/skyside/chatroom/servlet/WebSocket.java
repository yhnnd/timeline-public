package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.service.LoginService;
import com.skyside.chatroom.service.LogoutService;
import com.skyside.chatroom.service.SendMessageService;
import com.skyside.chatroom.vo.Message;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServlet;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/websocket")
public class WebSocket extends HttpServlet {
    // 静态变量，当前在线连接数
    private static int onlineCount = 0;
    // concurrent 包的线程安全 Set，存放每个客户端对应的 WebSocket 对象
    private static CopyOnWriteArraySet<WebSocket> webSocketSet = new CopyOnWriteArraySet<WebSocket>();
    // 与客户端的连接会话，通过它来给客户端发送数据
    private Session session;
    // 当前 user id
    private int userid = 0;// 0 表示用户未登录
    private UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
    private Gson gson = new Gson();

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
        addOnlineCount();
        String message = "------------------------------" +
                "\nConnection Established." +
                "\nRemote IP Address: " +
                "\nCurrent Connections: " + getOnlineCount();
        System.out.println(message);
    }

    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
        subOnlineCount();
        String message = "------------------------------" +
                "\nConnection Closed." +
                "\nRemote IP Address: " +
                "\nCurrent Connections: " + getOnlineCount();
        System.out.println(message);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        if (message.contains("\"type\":\"login\"")) {
            // 用户登录
            LoginService loginService = new LoginService();
            loginService.login(message, session, this, webSocketSet);
        } else if (message.contains("\"type\":\"logout\"")) {
            // 用户登出
            LogoutService logoutService = new LogoutService();
            logoutService.logout(message, this);
        } else {
            // 发送消息（如果未登录，不会发送消息）
            SendMessageService sendMessageService = new SendMessageService();
            sendMessageService.sendMessage(message, this);
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        subOnlineCount();// 在线数减 1
        String message = "------------------------------" +
                "\nConnection Lost." +
                "\nRemote IP Address: " +
                "\nCurrent Connections: " + getOnlineCount();
        System.out.println(message);
        error.printStackTrace();
    }

    public void sendMessage(String message) {
        try {
            this.session.getBasicRemote().sendText(message);
//			this.session.getAsyncRemote().sendText(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 向房間中的所有在線成員發送消息（僅能在數據庫可以訪問時使用）（* 消息不存入数据库）
    public void sendMessageToAll(Message userMessage) {
        // 设置消息的 user id 为当前 webSocket 的 user id
        userMessage.setUserid(this.getUserid());
        // 将消息转化为 JSON 字符串
        String message = gson.toJson(userMessage);
        // 向房间中在线上的每个用户发送消息
        for (WebSocket item : webSocketSet) {
            // 遍历 webSocketSet，如果 webSocket 的 user id 在消息的 room id 所发送的房间中，就向该 webSocket 发送消息
            if (userAndRoomDAO.getUserAndRoomByUseridAndRoomid(item.getUserid(), userMessage.getRoomid()) != null) {
                item.sendMessage(message);
            }
        }
    }

    // 群发函数静态版，可以被其他 service 调用（僅能在數據庫可以訪問時使用）
    public static synchronized void StaticSendMessageToAll(String message) {
        Gson gson = new Gson();
        UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
        Message userMessage = gson.fromJson(message, Message.class);
        // 向房间中每个在线上的用户发送消息
        for (WebSocket item : webSocketSet) {
            // 遍历 webSocketSet，如果 webSocket 的 user id 在 room id 对应的房间中，就向该 webSocket 发送消息
            if (userAndRoomDAO.getUserAndRoomByUseridAndRoomid(item.getUserid(), userMessage.getRoomid()) != null) {
                item.sendMessage(message);
            }
        }
    }

    // 向 user id 对应的用户发送系统消息（不属于任何聊天室）（* 消息不存入数据库）
    public static synchronized void sendSystemMessage(int userId, String message) {
        for (WebSocket webSocket : webSocketSet) {
            if (userId == webSocket.getUserid()) {
                webSocket.sendMessage(message);
            }
        }
    }

    // 向網站所有用户发送系统消息（不属于任何聊天室）（* 消息不存入数据库）
    public static synchronized void sendSystemMessageToAll(String message) {
        for (WebSocket webSocket : webSocketSet) {
            webSocket.sendMessage(message);
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    private static synchronized void addOnlineCount() {
        WebSocket.onlineCount++;
    }

    private static synchronized void subOnlineCount() {
        WebSocket.onlineCount--;
    }

    public static synchronized int getUserIdBySessionId(String sessionId) {
        for (WebSocket ws : webSocketSet) {
            if (ws.session.getId().equals(sessionId)) {
                return ws.getUserid();
            }
        }
        return -1;
    }

    public static synchronized WebSocket getWebSocketBySessionId(String sessionId) {
        for (WebSocket webSocket : webSocketSet) {
            if (webSocket.session.getId().equals(sessionId)) {
                return webSocket;
            }
        }
        return null;
    }

    public static synchronized WebSocket getWebSocketByUserId(int userId) {
        for (WebSocket webSocket : webSocketSet) {
            if (webSocket.userid == userId) {
                return webSocket;
            }
        }
        return null;
    }
}