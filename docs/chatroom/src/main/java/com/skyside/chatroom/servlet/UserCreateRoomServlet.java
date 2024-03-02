package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.service.RoomManagerService;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.UserAndRoom;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/create-room")
public class UserCreateRoomServlet extends HttpServlet {
    private Gson gson = new Gson();

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
        try {
            // 获取用户发送的数据
            int userid = Integer.parseInt(request.getParameter("user-id"));
            String roomName = request.getParameter("room-name");
            String roomType = request.getParameter("room-type");
            int live = Integer.parseInt(request.getParameter("room-live"));
            // 创建房间
            RoomDAO roomDAO = new RoomDAO();
            Room room = roomDAO.InsertRoom(roomName, roomType, live == 1 ? true : false);
            // 初始化系统返回消息
            JsonObject message = new JsonObject();
            message.addProperty("user-id", 0);
            message.addProperty("username", "system");
            message.addProperty("room-id", 0);
            // 如果房间创建成功
            if (room != null) {
                // 建立用户房间联系
                UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
                UserAndRoom userAndRoom = userAndRoomDAO.InsertUserAndRoom(userid, room.getRoomid(), 4, 1, 1, null);
                if (userAndRoom != null) {
                    // 用户房间联系建立成功
                    // 设置用户为房主
                    RoomManagerService.InsertRoomFounder(room.getRoomid(), userid);
                    message.addProperty("badge-class", "success");
                    message.addProperty("text-class", "success");
                    message.addProperty("message", "create room success");
                } else {
                    // 用户房间联系建立失败
                    message.addProperty("badge-class", "danger");
                    message.addProperty("text-class", "danger");
                    message.addProperty("message", "create room succeeded. but join room failed.");
                }
            } else {
                // 房间创建失败
                message.addProperty("badge-class", "danger");
                message.addProperty("text-class", "danger");
                message.addProperty("message", "create room failed. room cannot be created.");
            }
            // 输出消息
            out.println(gson.toJson(message));
        } finally {
            out.close();
        }
    }
}
