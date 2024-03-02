package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.RoomManagerDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.service.RoomManagerService;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.RoomManager;
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
@WebServlet("/add-friend-accept")
public class UserAddFriendAcceptServlet extends HttpServlet {
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
        message.addProperty("type", "add friend accept");
        if (user != null && friend != null) {
            // 如果这两个用户都存在
            UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
            // 获取好友房间
            Room room = userAndRoomDAO.getRoomByUserIdAndFriendId(userid, FriendID);
            if (room != null) {
                // 如果两个用户有好友房间
                // 发送加好友请求被接受 status 4
                UserAndRoom friendAndRoom = userAndRoomDAO.UpdateUserAndRoom(FriendID, room.getRoomid(), 4, 1, 1, friend.getUsername());
                // 收到加好友请求已接受 status 8
                UserAndRoom userAndRoom = userAndRoomDAO.UpdateUserAndRoom(userid, room.getRoomid(), 8, 1, 1, user.getUsername());
                if (userAndRoom != null && friendAndRoom != null) {
                    // 设置好友为房间管理员
                    RoomManagerService.InsertRoomManager(room.getRoomid(), FriendID);
                    RoomManager roomManagerFriend = RoomManagerService.getRoomManagerByRoomIdAndUserId(room.getRoomid(), FriendID);
                    roomManagerFriend.setChangeRoomName(1);
                    RoomManagerDAO.updateRoomManager(roomManagerFriend);
                    // 设置自己为房间管理员
                    RoomManagerService.InsertRoomManager(room.getRoomid(), userid);
                    RoomManager roomManagerUser = RoomManagerService.getRoomManagerByRoomIdAndUserId(room.getRoomid(), userid);
                    roomManagerUser.setChangeRoomName(1);
                    RoomManagerDAO.updateRoomManager(roomManagerUser);
                    // 接受加好友请求成功
                    message.addProperty("badge-class", "success");
                    message.addProperty("text-class", "success");
                    message.addProperty("message", "add friend request has been accepted.");
                } else {
                    // 接受加好友请求失败
                    message.addProperty("badge-class", "danger");
                    message.addProperty("text-class", "danger");
                    message.addProperty("message", "unable to accept add friend request.");
                }
            } else {
                // 两个用户不存在好友房间
                message.addProperty("badge-class", "danger");
                message.addProperty("text-class", "danger");
                message.addProperty("message", "unable to accept add friend request.");
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
