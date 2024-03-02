package com.skyside.chatroom.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.servlet.WebSocket;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.User;

import javax.websocket.Session;
import java.sql.Timestamp;
import java.util.concurrent.CopyOnWriteArraySet;

public class LoginService {
    private Gson gson = new Gson();

    private void loginSuccess(User user, Session session, WebSocket webSocket) {
        // 用户登录
        webSocket.setUserid(user.getUserid());
        // 发送登录成功信息
        Message systemMessage = new Message(0, 0, "system", "success", "success", 0, new Timestamp(System.currentTimeMillis()), "login success", "text");
        webSocket.sendMessage(gson.toJson(systemMessage));
        // 发送用户信息
        JsonObject jsonMessage = new JsonObject();
        jsonMessage.addProperty("type", "login");
        jsonMessage.add("user", new JsonParser().parse(gson.toJson(user)).getAsJsonObject());
        jsonMessage.addProperty("session-id", session.getId());
        webSocket.sendMessage(gson.toJson(jsonMessage));
    }

    // 允许同时在线
    private void loginMultipleOnline(User user, Session session, WebSocket webSocket, CopyOnWriteArraySet<WebSocket> webSocketSet) {
        // 通知该用户的所有连接：有新的连接
        Message systemMessage = new Message(0, 0, "system", "default", "muted", 0, new Timestamp(System.currentTimeMillis()),
                "someone has signed in with your ID on another device", "text");
        WebSocket.sendSystemMessage(user.getUserid(), gson.toJson(systemMessage));
        // 允许同时在线，登录成功
        loginSuccess(user, session, webSocket);
    }

    // 允许强制下线
    private void loginCompulsory(User user, Session session, WebSocket webSocket, CopyOnWriteArraySet<WebSocket> webSocketSet) {
        // 强制下线已上线用户
        Message systemMessage = new Message(0, 0, "system", "default", "muted", 0, new Timestamp(System.currentTimeMillis()),
                "you have been disconnected because someone has signed in with your ID on another device", "compulsory disconnect");
        for (WebSocket item : webSocketSet) {
            if (user.getUserid() == item.getUserid()) {
                item.sendMessage(gson.toJson(systemMessage));
                item.setUserid(0);
            }
        }
        // 强制下线完成，登录成功
        loginSuccess(user, session, webSocket);
    }

    // 不允许同时在线，也不允许强制下线
    private void loginFailed(User user, WebSocket webSocket, CopyOnWriteArraySet<WebSocket> webSocketSet) {
        // 通知该用户的所有连接：已拒绝新的连接
        Message alertMessage = new Message(0, 0, "system", "default", "muted", 0, new Timestamp(System.currentTimeMillis()),
                "someone is attempting to sign in with your ID on another device", "text");
        WebSocket.sendSystemMessage(user.getUserid(), gson.toJson(alertMessage));
        // 向本用户发送系统消息
        Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()),
                "user is online", "text");
        webSocket.sendMessage(gson.toJson(systemMessage));
    }

    public void login(String message, Session session, WebSocket webSocket, CopyOnWriteArraySet<WebSocket> webSocketSet) {
        JsonObject messageObject = new JsonParser().parse(message).getAsJsonObject();// 解析消息体
        String type = messageObject.get("type").getAsString();// 查看消息类型
        if (type.equalsIgnoreCase("login")) {// 如果消息类型是登录
            String loginBy = messageObject.get("by").getAsString();// 查看登录方式
            String username = messageObject.get(loginBy).getAsString();// 获取用户名（或 user id）
            String password = messageObject.get("password").getAsString();// 获取用户密码
            if (username != null && !username.equals("system") && password != null) {// 如果用户名和密码不为空
                UserDAO userDAO = new UserDAO();
                User user = null;
                try {
                    if (loginBy.equalsIgnoreCase("username")) {// 如果以用户名登录
                        user = userDAO.getUserByUsernameAndPassword(username, password);
                    } else if (loginBy.equalsIgnoreCase("user-id")) {// 如果以 user id 登录
                        try {
                            int userId = Integer.parseInt(username);// 获取 user id
                            user = userDAO.getUserByUserIdAndPassword(userId, password);
                        } catch (Exception ignore) {
                            Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()), "user id doesn't exist", "text");
                            webSocket.sendMessage(gson.toJson(systemMessage));
                            return;
                        }
                    }
                    if (user != null) {// 用户名和密码正确
                        int userCount = 0;
                        for (WebSocket item : webSocketSet) {// 获取该用户同时在线数
                            if (user.getUserid() == item.getUserid()) {
                                userCount++;
                            }
                        }
                        if (userCount == 0) {// 用户未上线，登录成功
                            loginSuccess(user, session, webSocket);
                        } else {// 用户已经上线
                            if (AdvancedSettingsService.getAdvancedSettingsByUserid(user.getUserid()).isMultipleOnline()) {// 允许同时在线
                                loginMultipleOnline(user, session, webSocket, webSocketSet);
                            } else if (AdvancedSettingsService.getAdvancedSettingsByUserid(user.getUserid()).isCompulsoryDisconnect()) {// 允许强制下线
                                loginCompulsory(user, session, webSocket, webSocketSet);
                            } else {// 不允许同时在线，也不允许强制下线
                                loginFailed(user, webSocket, webSocketSet);
                            }
                        }
                    } else {// 用户名或密码错误
                        Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()), "wrong username or password", "text");
                        webSocket.sendMessage(gson.toJson(systemMessage));
                    }
                } catch (Exception e) {
                    // 客戶端錯誤提示
                    Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()), e.getMessage(), "text");
                    webSocket.sendMessage(gson.toJson(systemMessage));
                    // 服務器端錯誤提示
                    String log = "------------------------------" +
                            "\n" + e.getMessage();
                    System.out.println(log);
                }
            }
        }
    }
}
