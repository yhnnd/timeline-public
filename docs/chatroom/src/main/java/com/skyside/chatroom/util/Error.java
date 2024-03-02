package com.skyside.chatroom.util;

import com.google.gson.Gson;
import com.skyside.chatroom.servlet.WebSocket;
import com.skyside.chatroom.vo.Message;

import java.sql.Timestamp;

public class Error {
    private static Gson gson = new Gson();

    public static void sendError(String message) {
        Message systemMessage = new Message(
                0,
                0,
                "system",
                "danger",
                "danger",
                0,
                new Timestamp(System.currentTimeMillis()),
                message,
                "text");
        WebSocket.sendSystemMessageToAll(gson.toJson(systemMessage));
    }
}
