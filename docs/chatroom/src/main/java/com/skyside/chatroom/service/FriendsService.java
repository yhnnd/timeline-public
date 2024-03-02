package com.skyside.chatroom.service;

import com.skyside.chatroom.dao.RoomDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.User;
import com.skyside.chatroom.vo.UserAndRoom;

import java.util.ArrayList;

public class FriendsService {
    // 返回用户的所有好友（数组）
    public ArrayList<User> getFriendsByUserid(int userid) {
        UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
        RoomDAO roomDAO = new RoomDAO();
        UserDAO userDAO = new UserDAO();
        ArrayList<UserAndRoom> userAndRoomArrayList;
        ArrayList<User> friendArrayList = new ArrayList<User>();
        try {
            // 获得所有【用户房间关系】
            userAndRoomArrayList = userAndRoomDAO.getUserAndRoomByUserid(userid);
            // 遍历所有【用户房间关系】
            for (UserAndRoom userAndRoom : userAndRoomArrayList) {
                // 获得关系对应的房间
                Room room = roomDAO.getRoomByRoomid(userAndRoom.getRoomid());
                // 如果该房间是好友房间
                if (room != null && room.getType().equalsIgnoreCase("friends")) {
                    // 找到该房间对应的所有【好友房间关系】
                    ArrayList<UserAndRoom> friendAndRoomArrayList = userAndRoomDAO.getUserAndRoomByRoomid(room.getRoomid());
                    // 遍历所有【好友房间关系】
                    for (UserAndRoom aFriendAndRoom : friendAndRoomArrayList) {
                        // 获取关系中的好友 id
                        int friendUserid = aFriendAndRoom.getUserid();
                        // 获取好友 id 对应的用户
                        User friend = userDAO.getUserByUserid(friendUserid);
                        // 将该用户添加到好友列表中
                        if (friend != null) {
                            friendArrayList.add(friend);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return friendArrayList;
    }
}
