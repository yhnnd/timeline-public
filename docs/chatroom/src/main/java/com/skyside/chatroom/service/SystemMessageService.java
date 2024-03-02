package com.skyside.chatroom.service;

import com.google.gson.Gson;
import com.skyside.chatroom.servlet.WebSocket;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.User;

import java.sql.Timestamp;

public class SystemMessageService {
    private static Gson gson = new Gson();

    public static void sendAccountUnsafeMessage(User user) {
        String username = user.getUsername();
        Message message = new Message(
                0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()),
                "<div>Your account with username <span class='badge badge-default'>" + username + "</span> is being attack.</div>" +
                        "<div>你的用户名为 <span class='badge badge-default'>" + username + "</span> 的账户正在被攻击。</div>",
                "html");
        WebSocket.sendSystemMessage(user.getUserid(), gson.toJson(message));// 向用户发送系统消息（不存入数据库）
    }
}
