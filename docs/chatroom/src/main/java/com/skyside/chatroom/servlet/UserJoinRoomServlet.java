package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.vo.Room;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/join-room")
public class UserJoinRoomServlet extends HttpServlet {
    private Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response){
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
            int userid = Integer.parseInt(request.getParameter("user-id"));
            int roomid = Integer.parseInt(request.getParameter("room-id"));
            // 初始化系统消息
            JsonObject message = new JsonObject();
            message.addProperty("user-id", 0);
            message.addProperty("username", "system");
            message.addProperty("room-id", 0);
            // 获取房间
            RoomDAO roomDAO = new RoomDAO();
            Room room = roomDAO.getRoomByRoomid(roomid);
            if(room != null) {
                // 获取房间类型
                String roomType = room.getType();
                // 如果房间类型不是 friends 或 secret
                if (roomType.equalsIgnoreCase("private") || roomType.equalsIgnoreCase("public")) {
                    // 添加用户房间联系
                    UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
                    int result = userAndRoomDAO.InsertUserAndRoomByUseridAndRoomid(userid, roomid);
                    if (result == -1) {
                        // 没有这个房间
                        message.addProperty("badge-class", "danger");
                        message.addProperty("text-class", "danger");
                        message.addProperty("message", "join room failed. room not found.");
                    } else if (result == 0) {
                        // 添加用户房间联系失败
                        message.addProperty("badge-class", "danger");
                        message.addProperty("text-class", "danger");
                        message.addProperty("message", "join room failed.");
                    } else if (result == 1) {
                        // 添加用户房间联系成功
                        message.addProperty("badge-class", "success");
                        message.addProperty("text-class", "success");
                        message.addProperty("message", "join room request was sent.");
                    }
                } else {
                    // 房间类型不支持外人加入
                    message.addProperty("badge-class", "danger");
                    message.addProperty("text-class", "danger");
                    message.addProperty("message", "join room failed. unauthorized.");
                }
            } else {
                // 没有这个房间
                message.addProperty("badge-class", "danger");
                message.addProperty("text-class", "danger");
                message.addProperty("message", "join room failed. room not found.");
            }
            out.println(gson.toJson(message));
        } finally {
            out.close();
        }
    }
}