package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.MessageDAO;
import com.skyside.chatroom.service.MessageStyleService;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.MessageStyle;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@WebServlet("/reply-message")
public class UserReplyMessageServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        // 获取用户是否登录
        String user_id = request.getParameter("user-id");
        // 获取被回复消息ID
        // 判断被回复消息的发送者和用户是否在同一个房间
        String message_id = request.getParameter("message-id");
        String room_id = request.getParameter("room-id");
        //  添加回复的消息
        //      输出回复的消息
        String username = request.getParameter("username");
        String messageText = request.getParameter("reply-message-text");
        String messageType = request.getParameter("reply-message-type");
        int messageId = Integer.parseInt(message_id);
        messageType = "reply-" + messageType + "-" + messageId;
        int userId = Integer.parseInt(user_id);
        MessageStyle messageStyle = MessageStyleService.getMessageStyle(userId);
        String badgeClass = messageStyle.getUsernameBadgeClass();
        String textClass = messageStyle.getMessageTextClass();
        int roomId = Integer.parseInt(room_id);
        Timestamp sendTime = new Timestamp(System.currentTimeMillis());
        Message message = new Message(0, userId, username, badgeClass, textClass, roomId, sendTime, messageText, messageType);
        MessageDAO messageDAO = new MessageDAO();
        PrintWriter out = response.getWriter();
        if ((message = messageDAO.InsertUserMessage(message)) != null) {
            out.println(gson.toJson(message));
        } else {
            out.println("insert message failed.");
        }
        out.close();
    }
}
