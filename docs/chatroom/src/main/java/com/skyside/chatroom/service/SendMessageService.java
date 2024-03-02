package com.skyside.chatroom.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.skyside.chatroom.dao.MessageDAO;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.servlet.WebSocket;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.User;
import com.skyside.chatroom.vo.UserAndRoom;

import java.sql.Timestamp;
import java.util.ArrayList;

public class SendMessageService {
    private static Gson gson = new Gson();
    private static UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();

    // 向消息所在的房间发送消息（不存入数据库）
    public static void sendMessage(Message message) {
        WebSocket.StaticSendMessageToAll(gson.toJson(message));
    }

    // 向消息所在的房间发送消息（存入数据库）
    public void sendMessage(String message, WebSocket webSocket) {
        if (webSocket.getUserid() != 0) {
            // 用户已登录
            Message userMessage = gson.fromJson(message, Message.class);
            // 过滤音频消息
            Message userMessage2 = gson.fromJson(message, Message.class);
            if (userMessage.getType().equals("audio")) {
                userMessage2.setText("audio message");
            }
            // 存储用户消息到数据库
            MessageDAO messageDAO = new MessageDAO();
            // 计算消息文本长度
            String messageText = userMessage2.getText();
            if (messageText.length() > 255) {// 如果消息文本长度超出上限
                Message fragment = gson.fromJson(message, Message.class);
                int n_segments = messageText.length() / 255;
                String segmentWrapperId = "segment-" + userMessage2.getType() + "-" + System.currentTimeMillis() + "-" + n_segments;
                for (int i = 0; i <= n_segments; ++i) {
                    int segmentBegin = i * 255, segmentEnd = (i + 1) * 255;
                    String segment = messageText.substring(segmentBegin, segmentEnd < messageText.length() ? segmentEnd : messageText.length());
                    String segmentId = segmentWrapperId + "-" + (i + 1);
                    fragment.setText(segment);
                    fragment.setType(segmentId);
                    int message_id = messageDAO.InsertUserMessage(fragment).getId();
                    if (i == 0) {
                        userMessage2.setId(message_id);
                    }
                }
            } else {
                int message_id = messageDAO.InsertUserMessage(userMessage2).getId();
                userMessage.setId(message_id);
            }
            // 获取消息发到的房间号
            int roomid = userMessage.getRoomid();
            // 如果用户在消息发到的房间，或者用户是 sys
            if (userAndRoomDAO.getUserAndRoomByUseridAndRoomid(webSocket.getUserid(), roomid) != null
                    || webSocket.getUserid() == 1) {
                // 群发该消息
                webSocket.sendMessageToAll(userMessage);
                // 获取消息内容
                String text = userMessage.getText();
                // 如果消息是指令消息
                if (text.startsWith("@sys ")) {
                    handleCommandMessage(text, roomid);
                }
            } else {
                // 用户不在消息发到的房间
                String msg = roomid == 0 ? "please select room id first" : "you are not in room " + roomid;
                Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()), msg, "text");
                webSocket.sendMessage(gson.toJson(systemMessage));
            }
        } else {
            // 用户未登录
            Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()), "please login first", "text");
            webSocket.sendMessage(gson.toJson(systemMessage));
        }
    }

    // 用户群发消息到用户所在的所有房间
    public static void sendMessageToAll(Message message) {
        // 获取房间用
        UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
        // 插入消息用
        MessageDAO messageDAO = new MessageDAO();
        // 发送消息用
        SendMessageService sendMessageService = new SendMessageService();
        // 获取用户所有房间
        ArrayList<UserAndRoom> userAndRooms = userAndRoomDAO.getUserAndRoomByUserid(message.getUserid());
        // 获取用户连接
        WebSocket webSocket = WebSocket.getWebSocketByUserId(message.getUserid());
        // 遍历房间
        for (int i = 0; i < userAndRooms.size(); ++i) {
            UserAndRoom room = userAndRooms.get(i);
            message.setRoomid(room.getRoomid());
            if (webSocket != null) {// 用户在线上
                String _message = gson.toJson(message);
                sendMessageService.sendMessage(_message, webSocket);// 发消息（并插入消息到数据库）
            } else {
                messageDAO.InsertUserMessage(message);// 插入消息到数据库
            }
        }
    }


    // 处理指令性消息
    private void handleCommandMessage(String text, int roomid) {
        if (text.startsWith("@sys print ")) {
            // 获取指令内容
            String key = text.substring(11);
            System.out.println("------------------------------\nwe got a directive \"print " + key + "\"");
            // 如果指令有关房间
            if (key.startsWith("room.")) {
                // 获取房间信息
                RoomDAO roomDAO = new RoomDAO();
                Room room = roomDAO.getRoomByRoomid(roomid);
                // 如果房间存在
                if (room != null) {
                    Gson gson = new GsonBuilder().setPrettyPrinting().create();
                    UserDAO userDAO = new UserDAO();
                    long now = System.currentTimeMillis();
                    Message systemMessage = new Message(0, 1, "sys", "primary", "primary",
                            roomid,
                            new Timestamp(now),
                            "<pre id='pre-" + now + "'>" +
                                    "print room.attribute attribute not found\n" +
                                    "please use these attributes:\n" +
                                    "   room.id\n" +
                                    "   room.name\n" +
                                    "   room.members\n" +
                                    "   room.info\n" +
                                    "visit service/SendMessageService/handleCommandMessage for more." +
                                    "</pre>",
                            "text");
                    switch (key) {
                        case "room.id":
                            systemMessage.setText("room.id = " + roomid);
                            break;
                        case "room.name":
                            systemMessage.setText("room.name = \"" + room.getName() + "\"");
                            break;
                        case "room.members":
                            ArrayList<UserAndRoom> userAndRooms = userAndRoomDAO.getUserAndRoomByRoomid(roomid);
                            ArrayList<User> members = new ArrayList<>();
                            for (UserAndRoom userAndRoom : userAndRooms) {
                                members.add(userDAO.getUserByUserid(userAndRoom.getUserid()));
                            }
                            systemMessage.setText("<pre id='pre-" + now + "'>" +
                                    gson.toJson(members) +
                                    "</pre>");
                            systemMessage.setType("html");
                            break;
                        case "room.info":
                            systemMessage.setText("<pre id='pre-" + now + "'>" +
                                    gson.toJson(room) +
                                    "</pre>");
                            systemMessage.setType("html");
                            break;
                        default:
                            systemMessage.setType("html");
                    }
                    WebSocket sysWebSocket = new WebSocket();
                    sysWebSocket.setUserid(1);
                    this.sendMessage(gson.toJson(systemMessage), sysWebSocket);
                }
            }
        }
    }
}
