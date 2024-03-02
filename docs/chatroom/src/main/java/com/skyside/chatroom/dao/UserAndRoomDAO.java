package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.UserAndRoom;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

public class UserAndRoomDAO {
    public UserAndRoom getUserAndRoomById(int id) {
        UserAndRoom userAndRoom = null;
        DB db = new DB();
        String sql = "select * from user_and_room where id=" + id;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                int userid = resultSet.getInt("userid");
                int roomid = resultSet.getInt("roomid");
                Timestamp joinTime = resultSet.getTimestamp("joinTime");
                int status = resultSet.getInt("status");
                int notify = resultSet.getInt("notify");
                int popup = resultSet.getInt("popup");
                String nickname = resultSet.getString("nickname");
                userAndRoom = new UserAndRoom(id, userid, roomid, joinTime, status, notify, popup, nickname);
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userAndRoom;
    }

    public UserAndRoom getUserAndRoomByUseridAndRoomid(int userid, int roomid) {
        UserAndRoom userAndRoom = null;
        DB db = new DB();
        String sql = "select * from user_and_room where userid = " + userid + " and roomid = " + roomid;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                int id = resultSet.getInt("id");
                Timestamp joinTime = resultSet.getTimestamp("joinTime");
                int status = resultSet.getInt("status");
                int notify = resultSet.getInt("notify");
                int popup = resultSet.getInt("popup");
                String nickname = resultSet.getString("nickname");
                userAndRoom = new UserAndRoom(id, userid, roomid, joinTime, status, notify, popup, nickname);
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userAndRoom;
    }

    public ArrayList<UserAndRoom> getUserAndRoomByUserid(int userid) {
        ArrayList<UserAndRoom> userAndRoom = new ArrayList<UserAndRoom>();
        DB db = new DB();
        String sql = "select * from user_and_room where userid=" + userid;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int roomid = resultSet.getInt("roomid");
                Timestamp joinTime = resultSet.getTimestamp("joinTime");
                int status = resultSet.getInt("status");
                int notify = resultSet.getInt("notify");
                int popup = resultSet.getInt("popup");
                String nickname = resultSet.getString("nickname");
                userAndRoom.add(new UserAndRoom(id, userid, roomid, joinTime, status, notify, popup, nickname));
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userAndRoom;
    }

    public ArrayList<UserAndRoom> getUserAndRoomByRoomid(int roomid) {
        ArrayList<UserAndRoom> userAndRoom = new ArrayList<UserAndRoom>();
        DB db = new DB();
        String sql = "select * from user_and_room where roomid =" + roomid;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int userid = resultSet.getInt("userid");
                Timestamp joinTime = resultSet.getTimestamp("joinTime");
                int status = resultSet.getInt("status");
                int notify = resultSet.getInt("notify");
                int popup = resultSet.getInt("popup");
                String nickname = resultSet.getString("nickname");
                userAndRoom.add(new UserAndRoom(id, userid, roomid, joinTime, status, notify, popup, nickname));
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userAndRoom;
    }

    public int InsertUserAndRoomByUseridAndRoomid(int userid, int roomid) {
        // 检查是否有这个房间
        RoomDAO roomDAO = new RoomDAO();
        Room room = roomDAO.getRoomByRoomid(roomid);
        // 如果没有这个房间，不能创建用户房间联系
        if (room == null) {
            return -1;
        }
        // 检查是否已经有这个用户房间联系
        UserAndRoom userAndRoom = getUserAndRoomByUseridAndRoomid(userid, roomid);
        // 已经有这个用户房间联系，不用再添加一次
        if (userAndRoom != null) {
            return 1;
        }
        DB db = new DB();
        String sql = "insert into user_and_room(userid,roomid,joinTime) values(" + userid + "," + roomid + ",'" + new Timestamp(System.currentTimeMillis()) + "')";
        int result = 0;
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public int deleteUserAndRoomByUseridAndRoomid(int userid, int roomid) {
        DB db = new DB();
        String sql = "delete from user_and_room where userid = " + userid + " and roomid = " + roomid;
        int result = 0;
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public Room getRoomByUserIdAndFriendId(int userid, int friendId) {
        DB db = new DB();
        RoomDAO roomDAO = new RoomDAO();
        // 先找到 user 和 friend 同在的 room
        String sql = "SELECT table1.roomid FROM user_and_room table1 INNER JOIN user_and_room table2 ON " +
                "table1.roomid = table2.roomid AND table1.userid = " + userid + " AND table2.userid = " + friendId;
        Room room = null;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            // 遍历所有 user 和 friend 同在的 room
            while (resultSet.next()) {
                int roomid = resultSet.getInt("roomid");
                Room roomTemp = roomDAO.getRoomByRoomid(roomid);
                // 如果该 room 的 type 为 friends
                if (roomTemp.getType().equalsIgnoreCase("friends")) {
                    // 则该 room 就是我们要找的好友房间
                    room = roomDAO.getRoomByRoomid(roomid);
                    break;
                }
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return room;
    }

    public UserAndRoom InsertUserAndRoom(int userid, int roomid, int statusCode, int notifyCode, int popup, String nickname) {
        // 检查是否有这个房间
        RoomDAO roomDAO = new RoomDAO();
        Room room = roomDAO.getRoomByRoomid(roomid);
        // 如果没有这个房间，不能创建用户房间联系
        if (room == null) {
            return null;
        }
        // 检查是否已经有这个用户房间联系
        UserAndRoom userAndRoom = getUserAndRoomByUseridAndRoomid(userid, roomid);
        // 已经有这个用户房间联系，不用再添加一次
        if (userAndRoom != null) {
            return userAndRoom;
        }
        DB db = new DB();
        Timestamp nowTime = new Timestamp(System.currentTimeMillis());
        String sql = "insert into user_and_room(userid,roomid,joinTime,status,notify,popup,nickname) "
                + "values(" + userid + "," + roomid + ",'" + nowTime + "'," + statusCode + "," + notifyCode + "," + popup + ",'" + nickname + "')";
        try {
            ResultSet resultSet = db.executeUpdateGetKeys(sql);
            if (resultSet.next()) {
                int id = resultSet.getInt(1);
                userAndRoom = getUserAndRoomById(id);
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userAndRoom;
    }

    // 更新 User And Room。按 userid 和 room id 找到 User And Room，更新其它字段。
    public UserAndRoom UpdateUserAndRoom(int userid, int roomid, int statusCode, int notifyCode, int popup, String nickname) {
        DB db = new DB();
        UserAndRoom userAndRoom = getUserAndRoomByUseridAndRoomid(userid, roomid);
        int id = userAndRoom.getId();
        if (nickname != null) {
            nickname = nickname.replace("'", "\'");
        }
        String sql = "update user_and_room set"
                + " userid = " + userid
                + ",roomid = " + roomid
                + ",status = " + statusCode
                + ",notify = " + notifyCode
                + ",popup = " + popup
                + ",nickname = '" + nickname
                + "' where id = " + id;
        try {
            ResultSet resultSet = db.executeUpdateGetKeys(sql);
            if (resultSet.next()) {
                id = resultSet.getInt(1);
                userAndRoom = getUserAndRoomById(id);
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userAndRoom;
    }

    public UserAndRoom updateUserAndRoom(UserAndRoom userAndRoom) {
        return UpdateUserAndRoom(
                userAndRoom.getUserid(),
                userAndRoom.getRoomid(),
                userAndRoom.getStatusCode(),
                userAndRoom.getNotifyCode(),
                userAndRoom.getPopup(),
                userAndRoom.getNickname());
    }
}
