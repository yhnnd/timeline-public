package com.skyside.chatroom.service;

import com.skyside.chatroom.dao.RoomManagerDAO;
import com.skyside.chatroom.vo.RoomManager;

import java.util.ArrayList;

public class RoomManagerService {
    public static int InsertRoomFounder(int roomId, int userId) {
        // 添加聊天室房主（默认权限最大）
        return RoomManagerDAO.insertRoomManager(roomId, userId, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    }

    public static int InsertRoomManager(int roomId, int userId) {
        // 添加聊天室管理员（默认权限最小）
        return RoomManagerDAO.insertRoomManager(roomId, userId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    // 获取一个房间的所有管理员
    public static ArrayList<RoomManager> getRoomManagersByRoomId(int roomId) {
        return RoomManagerDAO.getRoomManagersByRoomId(roomId);
    }

    // 获取一个用户管理的所有房间
    public static ArrayList<RoomManager> getRoomManagersByUserId(int userId) {
        return RoomManagerDAO.getRoomManagersByUserId(userId);
    }

    // 获取一个房间管理员
    public static RoomManager getRoomManagerByRoomIdAndUserId(int roomId, int userId) {
        return RoomManagerDAO.getRoomManagerByRoomIdAndUserId(roomId, userId);
    }

    // 删除一个房间管理员
    public static int deleteRoomManager(int managerId, int roomId, int userId) {
        // 获取执行者
        RoomManager executor = RoomManagerDAO.getRoomManagerByRoomIdAndUserId(roomId, managerId);
        // 获取被执行者
        RoomManager roomManager = RoomManagerDAO.getRoomManagerByRoomIdAndUserId(roomId, userId);
        // 【执行者有权限修改管理员】且【被执行者没有权限修改管理员】或者【执行者和被执行者是同一人】
        if (executor.getChangeManager() == 1 && (roomManager.getChangeManager() == 0 || executor.getId() == roomManager.getId())) {
            return RoomManagerDAO.deleteRoomManagerByRoomIdAndUserId(roomId, userId);
        }
        return -1;
    }

    // 更新一个房间管理员的权限
    public static int updateRoomManager(int managerId, RoomManager roomManager, RoomManager newRoomManager) {
        // 获取执行操作的管理员
        RoomManager executor = RoomManagerDAO.getRoomManagerByRoomIdAndUserId(roomManager.getRoomId(), managerId);
        // 【执行者有权限修改管理员】且(【被执行者没有权限修改管理员权限】或者【执行者和被执行者是同一人】)
        if (executor.getChangeManager() == 1 && (roomManager.getChangeManagerPrivilege() == 0 || executor.getId() == roomManager.getId())) {
            return RoomManagerDAO.updateRoomManager(newRoomManager);
        }
        return -1;
    }
}
