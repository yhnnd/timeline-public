package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.vo.Room;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能：收到 userid 和 roomid，更新房间数据
@WebServlet("/room-update")
public class RoomUpdateServlet extends HttpServlet{
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
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        // 查看用户登录状态
        if(sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
        } else {
            // 获取用户发送的房间数据
            int roomid = Integer.parseInt(request.getParameter("room-id"));
            String roomName = request.getParameter("room-name");
            String roomType = request.getParameter("room-type");
            String roomLive = request.getParameter("room-live");
            // 获取房间
            RoomDAO roomDAO = new RoomDAO();
            Room room = roomDAO.getRoomByRoomid(roomid);
            // 设置房间属性
            if(roomName!=null) room.setName(roomName);
            if(roomType!=null) room.setType(roomType);
            if(roomLive!=null) room.setLive(Integer.parseInt(roomLive));
            // 更新房间
            room = roomDAO.UpdateRoom(room);
            // 输出更新后的房间对象
            out.print(gson.toJson(room));
        }
        out.close();
    }
}
