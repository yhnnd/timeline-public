package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.Room;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

public class RoomDAO {
    public Room getRoomByRoomid(int roomid) {
        Room room = null;
        DB db = new DB();
        String sql = "select * from room where id =" + roomid;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                String name = resultSet.getString("name");
                Timestamp createTime = resultSet.getTimestamp("createTime");
                String type = resultSet.getString("type");
                int live = resultSet.getInt("live");
                room = new Room(roomid, name, createTime, type, live);
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return room;
    }

    public static ArrayList<Room> getRoomByName(String name) {
        ArrayList<Room> roomArrayList = new ArrayList<Room>();
        DB db = new DB();
        String sql = "select * from room where name = '" + name + "'";
        try {
            ResultSet resultSet = db.executeQuery(sql);
            while (resultSet.next()) {
                int roomid = resultSet.getInt("id");
                Timestamp createTime = resultSet.getTimestamp("createTime");
                String type = resultSet.getString("type");
                int live = resultSet.getInt("live");
                roomArrayList.add(new Room(roomid, name, createTime, type, live));
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return roomArrayList;
    }

    // 不可用，createTime 有毫秒，mysql 上 createTime 没有毫秒
    public Room getRoomByNameAndCreateTime(String name, Timestamp createTime) {
        Room room = null;
        DB db = new DB();
        String sql = "select * from room where name = '" + name + "' and createTime = '" + createTime + "'";
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                int roomid = resultSet.getInt("id");
                String type = resultSet.getString("type");
                int live = resultSet.getInt("live");
                room = new Room(roomid, name, createTime, type, live);
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return room;
    }

    public Room InsertRoom(String name, String type, boolean live) {
        if (name.equals("") || name.contains("'") || type.contains("'")) {
            return null;
        }
        if (!(type.equals("friends") || type.equals("secret") || type.equals("private") || type.equals("public"))) {
            return null;
        }
        Room room = null;
        DB db = new DB();
        Timestamp createTime = new Timestamp(System.currentTimeMillis());
        String sql = "insert into room(name,createTime,type,live) values('" + name + "','" + createTime + "','" + type + "'," + (live == true ? 1 : 0) + ")";
        try {
            ResultSet resultSet = db.executeUpdateGetKeys(sql);
            if (resultSet.next()) {
                RoomDAO roomDAO = new RoomDAO();
                room = roomDAO.getRoomByRoomid(resultSet.getInt(1));// 不能用 rs.getInt("id")
            } else {
                System.out.println("insert room error");
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return room;
    }

    public Room UpdateRoom(Room room) {
        String name = room.getName();
        String type = room.getType();
        int live = room.getLive();
        // 特殊字符转义
        name = name.replace("'", "\\'");
        if (!(type.equals("friends") || type.equals("secret") || type.equals("private") || type.equals("public"))) {
            return null;
        }
        DB db = new DB();
        String sql = "update room set name = '" + name + "',type = '" + type + "',live = " + live + " where id = " + room.getRoomid();
        try {
            db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return getRoomByRoomid(room.getRoomid());
    }

    public int DeleteRoomByRoomId(int roomid) {
        int result = 0;
        DB db = new DB();
        String sql = "delete from room where id = " + roomid;
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
