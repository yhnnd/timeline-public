package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.service.RoomService;
import com.skyside.chatroom.util.ListUtil;
import com.skyside.chatroom.vo.UserAndRoom;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet("/user-and-rooms")
public class UserAndRoomsServlet extends HttpServlet {
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
        UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
        ArrayList<UserAndRoom> userAndRooms = new ArrayList<UserAndRoom>();
        try {
            // 返回用户的所有房间
            int userId = Integer.parseInt(request.getParameter("user-id"));
            userAndRooms = userAndRoomDAO.getUserAndRoomByUserid(userId);
        } catch (Exception ignore) {
            try {
                // 返回房间的所有用户
                int roomId = Integer.parseInt(request.getParameter("room-id"));
                userAndRooms = userAndRoomDAO.getUserAndRoomByRoomid(roomId);
            } catch (Exception ignore2) {
                try {
                    // 返回用户管理的所有房间的所有欲加入未通过的用户
                    int adminId = Integer.parseInt(request.getParameter("admin-id"));
                    userAndRooms = RoomService.getJoinRoomRequests(adminId);
                } catch (Exception ignore3) {
                    System.out.println("user-and-rooms servlet error: parameter illegal.");
                }
            }
        } finally {
            // 输出去除重复后的数组
            out.print(gson.toJson(ListUtil.removeDuplicates(userAndRooms)));
            out.close();
        }
    }
}
