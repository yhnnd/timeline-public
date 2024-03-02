package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.Message;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

public class MessageDAO {
    // 获取一个房间的所有消息
    public ArrayList<Message> getUserMessageByRoomid(int roomid) {
        ArrayList<Message> messages = new ArrayList<Message>();
        DB db = new DB();
        String sql = "select * from message where roomid = " + roomid;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int userid = resultSet.getInt("userid");
                String username = resultSet.getString("username");
                String badgeClass = resultSet.getString("badgeclass");
                String textClass = resultSet.getString("textclass");
                Timestamp sendTime = resultSet.getTimestamp("sendtime");
                String text = resultSet.getString("text");
                String type = resultSet.getString("type");
                messages.add(new Message(id, userid, username, badgeClass, textClass, roomid, sendTime, text, type));
            }
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return messages;
    }

    // 根据消息的 id 获取消息
    public Message getUserMessageById(int id) {
        Message message = null;
        DB db = new DB();
        String sql = "select * from message where id = " + id;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                int userid = resultSet.getInt("userid");
                int roomid = resultSet.getInt("roomid");
                String username = resultSet.getString("username");
                String badgeClass = resultSet.getString("badgeclass");
                String textClass = resultSet.getString("textclass");
                Timestamp sendTime = resultSet.getTimestamp("sendtime");
                String text = resultSet.getString("text");
                String type = resultSet.getString("type");
                message = new Message(id, userid, username, badgeClass, textClass, roomid, sendTime, text, type);
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return message;
    }

    // 插入消息到数据库
    public Message InsertUserMessage(Message message) {
        int userid = message.getUserid();
        int roomid = message.getRoomid();
        String username = message.getUsername();
        String badgeClass = message.getBadgeClass();
        String textClass = message.getTextClass();
        Timestamp sendTime = message.getSendTime();
        String text = message.getText();
        String type = message.getType();
        // 特殊字符转义
        text = text.replace("'", "\\'");
        DB db = new DB();
        String sql = "insert into message(userid,username,badgeclass,textclass,roomid,sendtime,text,type) " +
                "values(" + userid + ",'" + username + "','" + badgeClass + "','" + textClass + "'," + roomid + ",'" + sendTime + "','" + text + "','" + type + "')";
        int id = 0;
        try {
            ResultSet resultSet = db.executeUpdateGetKeys(sql);
            if (resultSet.next()) {
                id = resultSet.getInt(1);
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (id > 0) {
            // 插入消息成功
            return getUserMessageById(id);
        }
        // 插入消息失败
        return null;
    }

    // 根据消息的 id 删除消息
    public int deleteUserMessageById(int id) {
        DB db = new DB();
        String sql = "delete from message where id = " + id;
        int result = 0;
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    // 消息片段的 type 样例: segment-code-1510453012408038995965658218257-2-1
    public int deleteUserMessageBySegmentTypeAndSegmentId(String segmentType, String fragmentId) {
        DB db = new DB();
        String sql = "delete from message where type like 'segment-" + segmentType + "-" + fragmentId + "-%'";
        int result = 0;
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
