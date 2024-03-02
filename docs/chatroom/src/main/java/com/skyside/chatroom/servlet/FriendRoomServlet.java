package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.vo.Room;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能：收到 userid 和 friend id，返回好友房间
@WebServlet("/friend-room")
public class FriendRoomServlet extends HttpServlet {
    private Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            doPost(request, response);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            // 获取用户发送的数据
            String type = request.getParameter("type");
            int userid = Integer.parseInt(request.getParameter("user-id"));
            int friendId = Integer.parseInt(request.getParameter("friend-id"));
            if(type.equalsIgnoreCase("friend room")) {
                // 获取好友房间
                UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
                Room room = userAndRoomDAO.getRoomByUserIdAndFriendId(userid, friendId);
                if (room != null) {
                    // 输出好友房间信息
                    out.println(gson.toJson(room));
                }
            }
        } finally {
            out.close();
        }
    }
}

