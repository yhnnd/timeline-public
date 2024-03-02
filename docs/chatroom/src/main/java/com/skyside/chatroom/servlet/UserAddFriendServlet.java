package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.User;
import com.skyside.chatroom.vo.UserAndRoom;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能：收到 userid 和 friend id，发送加好友请求
@WebServlet("/add-friend")
public class UserAddFriendServlet extends HttpServlet {
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
        int FriendID = Integer.parseInt(request.getParameter("friend-id"));
        UserDAO userDAO = new UserDAO();
        User user = userDAO.getUserByUserid(userid);
        User friend = userDAO.getUserByUserid(FriendID);
        // 初始化系统消息
        JsonObject message = new JsonObject();
        message.addProperty("user-id", 0);
        message.addProperty("username", "system");
        message.addProperty("room-id", 0);
        message.addProperty("type", "add friend");
        if (user != null && friend != null) {
            // 如果这两个用户都存在
            UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
            if (userAndRoomDAO.getRoomByUserIdAndFriendId(userid, FriendID) == null) {
                // 如果两个用户不是好友关系
                RoomDAO roomDAO = new RoomDAO();
                // 创建好友房间
                String roomName = user.getUsername() + " and " + friend.getUsername();
                Room room = roomDAO.InsertRoom(roomName, "friends", true);
                if (room != null) {
                    // 如果好友房间创建成功
                    // 发送加好友请求 status 2
                    UserAndRoom userAndRoom = userAndRoomDAO.InsertUserAndRoom(userid, room.getRoomid(), 2, 1, 1, user.getUsername());
                    // 收到加好友请求 status 6
                    UserAndRoom friendAndRoom = userAndRoomDAO.InsertUserAndRoom(FriendID, room.getRoomid(), 6, 1, 1, friend.getUsername());
                    if (userAndRoom != null && friendAndRoom != null) {
                        // 发送加好友请求成功
                        message.addProperty("badge-class", "success");
                        message.addProperty("text-class", "success");
                        message.addProperty("message", "add friend request has been sent.");
                    } else {
                        // 发送加好友请求失败
                        message.addProperty("badge-class", "danger");
                        message.addProperty("text-class", "danger");
                        message.addProperty("message", "unable to send add friend request.");
                    }
                } else {
                    // 好友房间创建失败
                    message.addProperty("badge-class", "danger");
                    message.addProperty("text-class", "danger");
                    message.addProperty("message", "unable to create friend room.");
                }
            } else {
                // 两个用户是好友关系
                message.addProperty("badge-class", "success");
                message.addProperty("text-class", "success");
                message.addProperty("message", "you have added this friend already.");
            }
        } else {
            // 用户不存在
            message.addProperty("badge-class", "danger");
            message.addProperty("text-class", "danger");
            message.addProperty("message", "user not found");
        }
        out.println(gson.toJson(message));
        out.close();
    }
}
