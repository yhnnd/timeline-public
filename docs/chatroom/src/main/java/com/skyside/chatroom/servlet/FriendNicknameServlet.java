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

@WebServlet("/friend-nickname")
public class FriendNicknameServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            out.println("user not logged in");
        } else {
            int roomId = Integer.parseInt(request.getParameter("room-id"));
            int friendId = Integer.parseInt(request.getParameter("friend-id"));
            UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
            UserAndRoom userAndRoom = userAndRoomDAO.getUserAndRoomByUseridAndRoomid(friendId, roomId);
            out.print(gson.toJson(userAndRoom));
        }
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            out.println("user not logged in");
        } else {
            int roomId = Integer.parseInt(request.getParameter("room-id"));
            int friendId = Integer.parseInt(request.getParameter("friend-id"));
            String nickname = request.getParameter("nickname");
            UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
            UserAndRoom userAndRoom = userAndRoomDAO.getUserAndRoomByUseridAndRoomid(friendId, roomId);
            userAndRoom.setNickname(nickname);
            userAndRoom = userAndRoomDAO.updateUserAndRoom(userAndRoom);
            out.print(gson.toJson(userAndRoom));
        }
        out.close();
    }
}
