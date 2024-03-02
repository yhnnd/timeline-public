package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.service.MessageStyleService;
import com.skyside.chatroom.vo.MessageStyle;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/message-style")
public class MessageStyleServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId = Integer.parseInt(request.getParameter("user-id"));
        String sessionId = request.getParameter("session-id");
        if (sessionId == null || userId != WebSocket.getUserIdBySessionId(sessionId)) {
            // 用户身份验证失败
        } else {
            int queryUserId = Integer.parseInt(request.getParameter("query-user-id"));
            out.print(gson.toJson(MessageStyleService.getMessageStyle(queryUserId)));
        }
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId = Integer.parseInt(request.getParameter("user-id"));
        String sessionId = request.getParameter("session-id");
        if (sessionId == null || userId != WebSocket.getUserIdBySessionId(sessionId)) {
            // 用户身份验证失败
        } else {
            String data = request.getParameter("data");
            MessageStyle messageStyle = gson.fromJson(data, MessageStyle.class);
            if (messageStyle.getUserid() == userId) {
                int result = MessageStyleService.setMessageStyle(messageStyle);
                out.print(result);
            }
        }
        out.close();
    }
}
