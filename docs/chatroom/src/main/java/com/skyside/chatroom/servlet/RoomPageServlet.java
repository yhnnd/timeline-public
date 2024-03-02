package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能：收到 room-id，返回对应的房间首页
@WebServlet("/room-page")
public class RoomPageServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            doPost(request, response);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的数据
//        int userid = Integer.parseInt(request.getParameter("user-id"));
        int roomid = Integer.parseInt(request.getParameter("room-id"));
        RoomDAO roomDAO = new RoomDAO();
        Room room = roomDAO.getRoomByRoomid(roomid);
        out.println(gson.toJson(room));
        out.close();
    }
}
