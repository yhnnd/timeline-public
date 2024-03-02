package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.UserAdvancedSettings;

import java.sql.*;

public class AdvancedSettingsDAO {

    public static UserAdvancedSettings getAdvancedSettingsByUserid(int userid) {
        UserAdvancedSettings userAdvancedSettings = null;
        DB db = new DB();
        String sql = "select * from user_advanced_settings where userid = " + userid;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                int id = resultSet.getInt("id");
                boolean mo = resultSet.getBoolean("multipleOnline");
                boolean cd = resultSet.getBoolean("compulsoryDisconnect");
                boolean eo = resultSet.getBoolean("exposeOnlineStatus");
                boolean en = resultSet.getBoolean("exposeUsername");
                boolean ei = resultSet.getBoolean("exposeUserid");
                boolean eg = resultSet.getBoolean("exposeGender");
                boolean ea = resultSet.getBoolean("exposeAge");
                boolean ec = resultSet.getBoolean("exposeCards");
                boolean lh = resultSet.getBoolean("loadHtmlMessages");
                boolean tc = resultSet.getBoolean("temporaryChats");
                boolean pp = resultSet.getBoolean("popupPreview");
                boolean nm = resultSet.getBoolean("nightMode");
                userAdvancedSettings = new UserAdvancedSettings(id, userid, mo, cd, eo, en, ei, eg, ea, ec, lh, tc, pp, nm);
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userAdvancedSettings;
    }

    private static int updateAdvancedSettings(int userid, String valueName, String value) {
        if (valueName.contains("'") || valueName.contains("--") || value.contains("'") || value.contains("--")) {
            return -1;
        }
        int result = 0;
        DB db = new DB();
        String sql = "update user_advanced_settings set " + valueName + " = " + value + " where userid = " + userid;
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    private static int InsertAdvancedSettings(UserAdvancedSettings advancedSettings) {
        int result = 0;
        DB db = new DB();
        String sql = "insert into user_advanced_settings(" +
                "userid," +
                "multipleOnline," +
                "compulsoryDisconnect," +
                "exposeOnlineStatus," +
                "exposeUsername," +
                "exposeUserid," +
                "exposeGender," +
                "exposeAge," +
                "exposeCards," +
                "loadHtmlMessages," +
                "temporaryChats," +
                "popupPreview," +
                "nightMode" +
                ") values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        PreparedStatement pstmt = db.getPreparedStatement(sql);
        try {
            pstmt.setInt(1, advancedSettings.getUserid());
            pstmt.setBoolean(2, advancedSettings.isMultipleOnline());
            pstmt.setBoolean(3, advancedSettings.isCompulsoryDisconnect());
            pstmt.setBoolean(4, advancedSettings.isExposeOnlineStatus());
            pstmt.setBoolean(5, advancedSettings.isExposeUserName());
            pstmt.setBoolean(6, advancedSettings.isExposeUserId());
            pstmt.setBoolean(7, advancedSettings.isExposeUserGender());
            pstmt.setBoolean(8, advancedSettings.isExposeUserAge());
            pstmt.setBoolean(9, advancedSettings.isExposeUserCards());
            pstmt.setBoolean(10, advancedSettings.isLoadHtmlMessages());
            pstmt.setBoolean(11, advancedSettings.isEnableTemporaryChats());
            pstmt.setBoolean(12, advancedSettings.isPopupPreview());
            pstmt.setBoolean(13, advancedSettings.isNightMode());
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return result;
    }

    public static int setAdvancedSettingsByUserid(int userid, String valueName, String value) {
        UserAdvancedSettings userAdvancedSettings = getAdvancedSettingsByUserid(userid);
        if (userAdvancedSettings == null) {
            InsertAdvancedSettings(new UserAdvancedSettings(
                    0, userid,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    false));
        }
        return updateAdvancedSettings(userid, valueName, value);
    }
}
