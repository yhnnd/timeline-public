package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.skyside.chatroom.service.SendMessageService;
import com.skyside.chatroom.vo.Message;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

// 功能：接收用户发送的音频消息，发送到房间
@WebServlet("/user-send-message-audio")
public class UserSendMessageAudioServlet extends HttpServlet{
    private Gson gson = new Gson();

    private JsonParser parser = new JsonParser();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            doPost(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的身份数据
        String data = request.getParameter("data");
        JsonObject message = parser.parse(data).getAsJsonObject();
        int userid = message.get("user-id").getAsInt();
        String sessionid = message.get("session-id").getAsString();
        // 初始化系统消息
        Message systemMessage;
        // 查看用户登录状态
        if(sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            systemMessage = new Message(0, 0, "system", "success", "success", 0, new Timestamp(System.currentTimeMillis()),
                    "not logged in", "text");
        } else {
            // 获取用户的 WebSocket
            WebSocket webSocket = WebSocket.getWebSocketBySessionId(sessionid);
            if(webSocket != null) {
                // 发送音频消息
                SendMessageService sendMessageService = new SendMessageService();
                sendMessageService.sendMessage(data, webSocket);
                systemMessage = new Message(0, 0, "system", "success", "success", 0, new Timestamp(System.currentTimeMillis()),
                        "uploaded", "text");
            } else {
                systemMessage = new Message(0, 0, "system", "success", "success", 0, new Timestamp(System.currentTimeMillis()),
                        "not connected", "text");
            }
        }
        out.print(gson.toJson(systemMessage));
        out.close();
    }
}
