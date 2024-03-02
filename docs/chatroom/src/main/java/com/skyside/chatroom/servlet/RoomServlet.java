package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.vo.Room;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能：收到 userid 和 room id，返回房间数据（用户必须在该房间里）
@WebServlet("/room")
public class RoomServlet extends HttpServlet {
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
            int userid = Integer.parseInt(request.getParameter("user-id"));
            int roomid = Integer.parseInt(request.getParameter("room-id"));
            // 查询用户房间联系
            UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
            // 如果存在用户房间联系
            if(userAndRoomDAO.getUserAndRoomByUseridAndRoomid(userid,roomid)!=null) {
                // 获取房间
                RoomDAO roomDAO = new RoomDAO();
                Room room = roomDAO.getRoomByRoomid(roomid);
                // 输出房间信息
                out.println(gson.toJson(room));
            }
        } finally {
            out.close();
        }
    }
}
