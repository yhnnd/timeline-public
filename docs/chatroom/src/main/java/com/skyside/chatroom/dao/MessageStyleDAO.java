package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.MessageStyle;

import java.sql.ResultSet;

public class MessageStyleDAO {
    public MessageStyle getMessageStyleByUserid(int user_id) {
        MessageStyle messageStyle = null;
        DB db = new DB();
        String sql = "select * from message_style where user_id = " + user_id;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                int id = resultSet.getInt("id");
                String ac = resultSet.getString("avatar_class");
                String ab = resultSet.getString("avatar_border");
                String abr = resultSet.getString("avatar_border_radius");
                String utc = resultSet.getString("username_text_class");
                String ubc = resultSet.getString("username_badge_class");
                String mtc = resultSet.getString("message_text_class");
                String mbc = resultSet.getString("message_background_class");
                String mb = resultSet.getString("message_border");
                String mbr = resultSet.getString("message_border_radius");
                messageStyle = new MessageStyle(id, user_id, ac, ab, abr, utc, ubc, mtc, mbc, mb, mbr);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return messageStyle;
    }

    public int insertMessageStyle(MessageStyle messageStyle) {
        String sql = "insert into message_style(" +
                "user_id," +
                "avatar_class," +
                "avatar_border," +
                "avatar_border_radius," +
                "username_text_class," +
                "username_badge_class," +
                "message_text_class," +
                "message_background_class," +
                "message_border," +
                "message_border_radius) " +
                "values(?,?,?,?,?,?,?,?,?,?)";
        DB db = new DB();
        int result = db.executeUpdate(sql,
                messageStyle.getUserid(),
                messageStyle.getAvatarClass(),
                messageStyle.getAvatarBorder(),
                messageStyle.getAvatarBorderRadius(),
                messageStyle.getUsernameTextClass(),
                messageStyle.getUsernameBadgeClass(),
                messageStyle.getMessageTextClass(),
                messageStyle.getMessageBackgroundClass(),
                messageStyle.getMessageBorder(),
                messageStyle.getMessageBorderRadius());
        db.close();
        return result;
    }

    public int updateMessageStyle(MessageStyle messageStyle) {
        String sql = "update message_style set " +
                "user_id = ?," +
                "avatar_class = ?," +
                "avatar_border = ?," +
                "avatar_border_radius = ?," +
                "username_text_class = ?," +
                "username_badge_class = ?," +
                "message_text_class = ?," +
                "message_background_class = ?," +
                "message_border = ?," +
                "message_border_radius = ? " +
                "where id = ?";
        DB db = new DB();
        int result = db.executeUpdate(sql,
                messageStyle.getUserid(),
                messageStyle.getAvatarClass(),
                messageStyle.getAvatarBorder(),
                messageStyle.getAvatarBorderRadius(),
                messageStyle.getUsernameTextClass(),
                messageStyle.getUsernameBadgeClass(),
                messageStyle.getMessageTextClass(),
                messageStyle.getMessageBackgroundClass(),
                messageStyle.getMessageBorder(),
                messageStyle.getMessageBorderRadius(),
                messageStyle.getId());
        db.close();
        return result;
    }

    public int deleteMessageStyleByUserid(int user_id){
        String sql = "delete from message_style where user_id = ?";
        DB db = new DB();
        int result = db.executeUpdate(sql,user_id);
        db.close();
        return result;
    }
}
