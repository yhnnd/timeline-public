package com.skyside.chatroom.service;

import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.MessageDAO;
import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.RoomManagerDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.RoomManager;
import com.skyside.chatroom.vo.UserAndRoom;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

public class RoomService {
    private static UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
    private static RoomDAO roomDAO = new RoomDAO();
    private static MessageDAO messageDAO = new MessageDAO();

    public static void DeleteRoom(int roomid) {
        // 删除房间管理员权限
        ArrayList<RoomManager> roomManagers = RoomManagerDAO.getRoomManagersByRoomId(roomid);
        for (RoomManager roomManager : roomManagers) {
            RoomManagerDAO.deleteRoomManagerByRoomIdAndUserId(roomid, roomManager.getUserId());
        }
        // 删除房间所有消息
        ArrayList<Message> messages = messageDAO.getUserMessageByRoomid(roomid);
        for (Message message : messages) {
            messageDAO.deleteUserMessageById(message.getId());
        }
        // 删除房间所有成员
        ArrayList<UserAndRoom> userAndRooms = userAndRoomDAO.getUserAndRoomByRoomid(roomid);
        for (UserAndRoom userAndRoom : userAndRooms) {
            userAndRoomDAO.deleteUserAndRoomByUseridAndRoomid(userAndRoom.getUserid(), roomid);
        }
        // 删除房间
        roomDAO.DeleteRoomByRoomId(roomid);
    }

    public static JsonObject QuitRoom(int userid, int roomid) {
        // 初始化系统返回消息
        JsonObject message = new JsonObject();
        message.addProperty("user-id", 0);
        message.addProperty("username", "system");
        message.addProperty("room-id", 0);
        message.addProperty("send-time", System.currentTimeMillis());
        // 删除用户房间联系
        if (userAndRoomDAO.deleteUserAndRoomByUseridAndRoomid(userid, roomid) > 0) {
            // 如果房间是好友房间，删除房间
            if (roomDAO.getRoomByRoomid(roomid).getType().equalsIgnoreCase("friends")) {
                DeleteRoom(roomid);
            }
            // 如果房间是空房间，删除房间
            if (userAndRoomDAO.getUserAndRoomByRoomid(roomid).size() == 0) {
                DeleteRoom(roomid);
            }
            // 用户房间联系删除成功
            message.addProperty("badge-class", "success");
            message.addProperty("text-class", "success");
            message.addProperty("message", "quit room success");
        } else {
            // 用户房间联系删除失败
            message.addProperty("badge-class", "danger");
            message.addProperty("text-class", "danger");
            message.addProperty("message", "unable to quit room now");
        }
        return message;
    }

    // 返回我管理的所有房间的所有未通过的加入房间请求
    public static ArrayList<UserAndRoom> getJoinRoomRequests(int adminId) {
        // 找出我的所有房间
        ArrayList<UserAndRoom> roomsOfMine = userAndRoomDAO.getUserAndRoomByUserid(adminId);
        // 找出所有我是管理的房间（而且我有权限通过加入请求）
        ArrayList<UserAndRoom> roomsInWhichIAmAdmin = new ArrayList<>();
        for (UserAndRoom aRoomOfMine : roomsOfMine) {
            RoomManager roomManager = RoomManagerService.getRoomManagerByRoomIdAndUserId(aRoomOfMine.getRoomid(), adminId);
            if (roomManager != null && roomManager.getApproveUser() == 1) {
                roomsInWhichIAmAdmin.add(aRoomOfMine);
            }
        }
        ArrayList<Integer> OkayCodes = new ArrayList<>(Arrays.asList(4, 8));
        ArrayList<UserAndRoom> joinRoomRequestsNotPermitted = new ArrayList<>();
        // 遍历所有我是管理的房间
        for (UserAndRoom aRoomInWhichIAmAdmin : roomsInWhichIAmAdmin) {
            ArrayList<UserAndRoom> joinRoomRequests = userAndRoomDAO.getUserAndRoomByRoomid(aRoomInWhichIAmAdmin.getRoomid());
            // 找出这个房间的所有未通过的加入请求
            for (UserAndRoom joinRoomRequest : joinRoomRequests) {// 遍历所有加入请求
                if (!OkayCodes.contains(joinRoomRequest.getStatusCode())) {// 如果请求未通过
                    joinRoomRequestsNotPermitted.add(joinRoomRequest);
                }
            }
        }
        // 去除重复元素
        return new ArrayList<>(new HashSet<>(joinRoomRequestsNotPermitted));
    }

    public static UserAndRoom ApproveUserJoinRoom(int adminId, int requestId) {
        UserAndRoom request = userAndRoomDAO.getUserAndRoomById(requestId);
        int roomId = request.getRoomid();
        RoomManager admin = RoomManagerService.getRoomManagerByRoomIdAndUserId(roomId, adminId);
        if (admin != null && admin.getApproveUser() == 1) {
            request.setStatusCode(4);
            return userAndRoomDAO.updateUserAndRoom(request);
        }
        return null;
    }
}
