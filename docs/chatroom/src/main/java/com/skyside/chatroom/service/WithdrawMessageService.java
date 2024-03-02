package com.skyside.chatroom.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.MessageDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.servlet.WebSocket;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.User;
import com.skyside.chatroom.vo.UserAndRoom;

public class WithdrawMessageService {
    private Gson gson = new Gson();

    // delete message 表示删除数据库消息的结果，withdraw message 是删除客户端消息指令
    public JsonObject WithdrawMessage(int userid, String session_id, int message_id) {
        // 初始化系统消息
        JsonObject systemMessage = new JsonObject();
        systemMessage.addProperty("user-id", 0);
        systemMessage.addProperty("username", "system");
        systemMessage.addProperty("room-id", 0);
        systemMessage.addProperty("type", "delete message");
        // 检查用户是否已登录
        if (session_id != null && userid == WebSocket.getUserIdBySessionId(session_id)) {
            // 获取用户对象
            UserDAO userDAO = new UserDAO();
            User user = userDAO.getUserByUserid(userid);
            // 获取消息对象
            MessageDAO messageDAO = new MessageDAO();
            Message message = messageDAO.getUserMessageById(message_id);
            if (message != null) {
                // 获取用户房间联系
                UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
                UserAndRoom userAndRoom = userAndRoomDAO.getUserAndRoomByUseridAndRoomid(userid, message.getRoomid());
                // 如果消息是用户发送的
                if (message.getUserid() == user.getUserid()) {
                    // 如果用户在消息属于的房间中
                    if (userAndRoom != null) {
                        // 删除消息
                        int result;
                        if (message.isSegment()) {// 如果消息是消息片段
                            String segment_type = message.getSegmentType();
                            String segment_id = message.getSegmentId();
                            result = messageDAO.deleteUserMessageBySegmentTypeAndSegmentId(segment_type, segment_id);
                        } else {// 如果消息是单个完整消息
                            result = messageDAO.deleteUserMessageById(message_id);
                        }
                        if (result >= 1) {
                            // 成功删除消息
                            systemMessage.addProperty("badge-class", "primary");
                            systemMessage.addProperty("text-class", "primary");
                            systemMessage.addProperty("message", "message deleted");
                            // 初始化删除消息指令
                            JsonObject withdrawDirective = new JsonObject();
                            withdrawDirective.addProperty("user-id", user.getUserid());
                            withdrawDirective.addProperty("username", user.getUsername());
                            withdrawDirective.addProperty("room-id", message.getRoomid());
                            withdrawDirective.addProperty("type", "withdraw message");
                            withdrawDirective.addProperty("message", message_id);
                            // 群发删除消息指令
                            WebSocket.StaticSendMessageToAll(gson.toJson(withdrawDirective));
                        } else {
                            // 删除消息失败
                            systemMessage.addProperty("badge-class", "danger");
                            systemMessage.addProperty("text-class", "danger");
                            systemMessage.addProperty("message", "delete message failed");
                        }
                    } else {
                        // 用户不在消息所在的房间中，无权删除消息
                        systemMessage.addProperty("badge-class", "danger");
                        systemMessage.addProperty("text-class", "danger");
                        systemMessage.addProperty("message", "cannot withdraw message because you are not in room " + message.getRoomid());
                    }
                } else {
                    // 无权删除别人发送的消息
                    systemMessage.addProperty("badge-class", "danger");
                    systemMessage.addProperty("text-class", "danger");
                    systemMessage.addProperty("message", "cannot withdraw message sent by others");
                }
            } else {
                // 无法找到该消息
                systemMessage.addProperty("badge-class", "danger");
                systemMessage.addProperty("text-class", "danger");
                systemMessage.addProperty("message", "message not found");
            }
        } else {
            // 用户未登录
            systemMessage.addProperty("badge-class", "danger");
            systemMessage.addProperty("text-class", "danger");
            systemMessage.addProperty("message", "you are not logged in.");
        }
        return systemMessage;
    }
}
