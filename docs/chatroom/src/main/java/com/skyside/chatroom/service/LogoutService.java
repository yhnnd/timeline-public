package com.skyside.chatroom.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.skyside.chatroom.servlet.WebSocket;
import com.skyside.chatroom.vo.Message;

import java.sql.Timestamp;

public class LogoutService {
    private Gson gson = new Gson();

    public void logout(String message,WebSocket webSocket){
        JsonObject messageObject = new JsonParser().parse(message).getAsJsonObject();
        int userid = messageObject.get("user-id").getAsInt();
        String type = messageObject.get("type").getAsString();
        if(userid==webSocket.getUserid() && type.equalsIgnoreCase("logout")){
            webSocket.setUserid(0);
            Message systemMessage = new Message(0, 0, "system", "success", "success", 0, new Timestamp(System.currentTimeMillis()),
                    "log out success","text");
            webSocket.sendMessage(gson.toJson(systemMessage));
        }else{
            Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()),
                    "log out failed","text");
            webSocket.sendMessage(gson.toJson(systemMessage));
        }
    }
}
