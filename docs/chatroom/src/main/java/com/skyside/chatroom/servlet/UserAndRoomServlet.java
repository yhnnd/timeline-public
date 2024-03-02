package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.vo.UserAndRoom;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/user-and-room")
public class UserAndRoomServlet extends HttpServlet {
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
        int userid = Integer.parseInt(request.getParameter("user-id"));
        int roomid = Integer.parseInt(request.getParameter("room-id"));
        UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
        UserAndRoom userAndRoom = userAndRoomDAO.getUserAndRoomByUseridAndRoomid(userid,roomid);
        out.print(gson.toJson(userAndRoom));
        out.close();
    }
}
