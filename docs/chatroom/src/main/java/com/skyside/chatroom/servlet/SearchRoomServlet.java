package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.vo.Room;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

// 功能：收到 name 或 room id，返回房间数据
@WebServlet("/searchroom")
public class SearchRoomServlet extends HttpServlet{
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
        String name = request.getParameter("name");
        if(name!=null) {
            // 按房间名查询房间
            PrintWriter out = response.getWriter();
            try {
                ArrayList<Room> roomArrayList = RoomDAO.getRoomByName(name);
                out.print(gson.toJson(roomArrayList));
            } finally {
                out.close();
            }
        }else{
            // 按房间 id 查询房间
            PrintWriter out = response.getWriter();
            try {
                int roomid = Integer.parseInt(request.getParameter("room-id"));
                RoomDAO roomDAO = new RoomDAO();
                Room room = roomDAO.getRoomByRoomid(roomid);
                out.print(gson.toJson(room));
            } finally {
                out.close();
            }
        }
    }
}
