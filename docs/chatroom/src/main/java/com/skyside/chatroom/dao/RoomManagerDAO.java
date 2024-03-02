package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.RoomManager;

import java.sql.ResultSet;
import java.util.ArrayList;

public class RoomManagerDAO {
    private static ArrayList<RoomManager> getRoomManagers(String sql) {
        ArrayList<RoomManager> roomManagers = new ArrayList<RoomManager>();
        DB db = new DB();
        try {
            ResultSet resultSet = db.executeQuery(sql);
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int roomId = resultSet.getInt("roomid");
                int userId = resultSet.getInt("userid");
                int changeManager = resultSet.getInt("changeManager");
                int changeManagerPrivilege = resultSet.getInt("changeManagerPrivilege");
                int changeRoomName = resultSet.getInt("changeRoomName");
                int changeRoomType = resultSet.getInt("changeRoomType");
                int changeRoomLive = resultSet.getInt("changeRoomLive");
                int deleteRoom = resultSet.getInt("deleteRoom");
                int splitRoom = resultSet.getInt("splitRoom");
                int mergeRoom = resultSet.getInt("mergeRoom");
                int approveUser = resultSet.getInt("approveUser");
                int muteUser = resultSet.getInt("muteUser");
                int muteAllUser = resultSet.getInt("muteAllUser");
                int removeUser = resultSet.getInt("removeUser");
                int callAllUser = resultSet.getInt("callAllUser");
                int toggleAnonymous = resultSet.getInt("toggleAnonymous");
                RoomManager roomManager = new RoomManager(id, roomId, userId, changeManager, changeManagerPrivilege, changeRoomName, changeRoomType, changeRoomLive, deleteRoom, splitRoom, mergeRoom, approveUser, muteUser, muteAllUser, removeUser, callAllUser, toggleAnonymous);
                roomManagers.add(roomManager);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return roomManagers;
    }

    public static RoomManager getRoomManagerByRoomIdAndUserId(int roomId, int userId) {
        String sql = "select * from room_manager where roomid = " + roomId + " and userid = " + userId;
        ArrayList<RoomManager> roomManagers = getRoomManagers(sql);
        return roomManagers.size() > 0 ? roomManagers.get(0) : null;
    }

    public static ArrayList<RoomManager> getRoomManagersByRoomId(int roomId) {
        String sql = "select * from room_manager where roomid = " + roomId;
        return getRoomManagers(sql);
    }

    public static ArrayList<RoomManager> getRoomManagersByUserId(int userId) {
        String sql = "select * from room_manager where userid = " + userId;
        return getRoomManagers(sql);
    }

    public static int insertRoomManager(int roomId, int userId, int CM, int CMP, int CRN, int CRT, int CRL, int DR, int SR, int MR, int AU, int MU, int MAU, int RU, int CAU, int TA) {
        RoomManager roomManager = new RoomManager(0, roomId, userId, CM, CMP, CRN, CRT, CRL, DR, SR, MR, AU, MU, MAU, RU, CAU, TA);
        int result = 0;
        DB db = new DB();
        String sql = "insert into room_manager(roomid,userid,changeManager,changeManagerPrivilege,"
                + "changeRoomName,changeRoomType,changeRoomLive,deleteRoom,splitRoom,mergeRoom,"
                + "approveUser,muteUser,muteAllUser,removeUser,callAllUser,toggleAnonymous) "
                + "values(" + roomId + "," + userId + "," + CM + "," + CMP + ","
                + CRN + "," + CRT + "," + CRL + "," + DR + "," + SR + "," + MR + ","
                + AU + "," + MU + "," + MAU + "," + RU + "," + CAU + "," + TA + ")";
        try {
            result = db.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return result;
    }

    public static int deleteRoomManagerByRoomIdAndUserId(int roomId, int userId) {
        int result = 0;
        DB db = new DB();
        String sql = "delete from room_manager where roomid = " + roomId + " and userid = " + userId;
        try {
            result = db.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return result;
    }

    public static int updateRoomManager(RoomManager roomManager) {
        int result = 0;
        DB db = new DB();
        String sql = "update room_manager set"
                + " changeManager = " + roomManager.getChangeManager()
                + ",changeManagerPrivilege = " + roomManager.getChangeManagerPrivilege()
                + ",changeRoomName = " + roomManager.getChangeRoomName()
                + ",changeRoomType = " + roomManager.getChangeRoomType()
                + ",changeRoomLive = " + roomManager.getChangeRoomLive()
                + ",deleteRoom = " + roomManager.getDeleteRoom()
                + ",splitRoom = " + roomManager.getSplitRoom()
                + ",mergeRoom = " + roomManager.getMergeRoom()
                + ",approveUser = " + roomManager.getApproveUser()
                + ",muteUser = " + roomManager.getMuteUser()
                + ",muteAllUser = " + roomManager.getMuteAllUser()
                + ",removeUser = " + roomManager.getRemoveUser()
                + ",callAllUser = " + roomManager.getCallAllUser()
                + ",toggleAnonymous = " + roomManager.getToggleAnonymous()
                + " where id = " + roomManager.getId();
        try {
            result = db.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return result;
    }
}
