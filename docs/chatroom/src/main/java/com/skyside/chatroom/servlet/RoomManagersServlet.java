package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.service.RoomManagerService;
import com.skyside.chatroom.vo.RoomManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

// 功能：收到 userid 和 roomid，返回该房间的所有管理员
@WebServlet("/room-managers")
public class RoomManagersServlet extends HttpServlet {
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
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            out.println("not logged in");
        } else {
            // 获取房间号
            int roomid = Integer.parseInt(request.getParameter("room-id"));
            // 获取该房间的所有管理员
            ArrayList<RoomManager> roomManagers = RoomManagerService.getRoomManagersByRoomId(roomid);
            out.print(gson.toJson(roomManagers));
        }
        out.close();
    }
}
