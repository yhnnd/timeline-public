package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.MessageDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.vo.Message;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;

// 功能：收到 user id, session id, room id, 返回该房间的所有消息
@WebServlet("/messages")
public class MessagesServlet extends HttpServlet {
    private Gson gson = new Gson();
    MessageDAO messageDAO = new MessageDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        // 获取用户发送的 userid
        int userid = Integer.parseInt(request.getParameter("user-id"));
        // 获取用户发送的 session id
        String sessionid = request.getParameter("session-id");
        // 如果用户发送的 userid 和 session id 匹配
        if (sessionid != null && userid == WebSocket.getUserIdBySessionId(sessionid)) {
            // 则用户已经登录
            PrintWriter out = response.getWriter();
            // 获取用户发送的 room id
            int roomid = Integer.parseInt(request.getParameter("room-id"));
            try {
                UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
                // 可以找到用户房间联系
                if (userAndRoomDAO.getUserAndRoomByUseridAndRoomid(userid, roomid) != null) {
                    // 获取房间的所有消息
                    ArrayList messages = messageDAO.getUserMessageByRoomid(roomid);
                    // 输出消息数量
                    out.println(messages.size());
                } else {
                    // 找不到用户房间联系
                    System.out.println("messages servlet: user " + userid + " is not in room " + roomid);
                }
            } finally {
                out.close();
            }
        } else {
            // 用户提供的 user id 和 session id 不匹配
            System.out.println("messages servlet: user " + userid + " didn't provide a valid session id");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        // 获取用户发送的 userid
        int userid = Integer.parseInt(request.getParameter("user-id"));
        // 获取用户发送的 session id
        String sessionid = request.getParameter("session-id");
        // 如果用户发送的 userid 和 session id 匹配
        if (sessionid != null && userid == WebSocket.getUserIdBySessionId(sessionid)) {
            // 则用户已经登录
            PrintWriter out = response.getWriter();
            // 获取用户发送的 room id
            int roomid = Integer.parseInt(request.getParameter("room-id"));
            // 获取用户发送的消息数量上限
            int messageMax = Integer.parseInt(request.getParameter("message-max"));
            try {
                UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
                // 可以找到用户房间联系
                if (userAndRoomDAO.getUserAndRoomByUseridAndRoomid(userid, roomid) != null) {
                    // 获取房间的所有消息
                    ArrayList messages = messageDAO.getUserMessageByRoomid(roomid);
                    // 删去最后 10 条之前的消息
                    ArrayList newMessages = new ArrayList();
                    int i = 0;
                    if (messages.size() > messageMax) {
                        i = messages.size() - messageMax;
                        Message message = new Message(0, 0,
                                "system", "default", "muted",
                                0, new Timestamp(System.currentTimeMillis()),
                                "<div class='btn btn-outline-primary' " +
                                        "onclick=\"add_loading_icon();get_room_messages($('#room-id').val()," +
                                        messages.size() + ",remove_loading_icon)\">more messages</div>", "more messages");
                        newMessages.add(message);
                    }
                    for (; i < messages.size(); ++i) {
                        newMessages.add(messages.get(i));
                    }
                    // 输出消息数组
                    out.println(gson.toJson(newMessages));
                } else {
                    // 找不到用户房间联系
                    System.out.println("messages servlet: user " + userid + " is not in room " + roomid);
                }
            } finally {
                out.close();
            }
        } else {
            // 用户提供的 user id 和 session id 不匹配
            System.out.println("messages servlet: user " + userid + " didn't provide a valid session id");
        }
    }
}
