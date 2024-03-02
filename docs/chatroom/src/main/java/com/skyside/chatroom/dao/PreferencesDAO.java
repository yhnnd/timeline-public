package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.Preferences;

import java.sql.ResultSet;

public class PreferencesDAO {
    public Preferences getPreferencesByUserid(int user_id) {
        Preferences preferences = null;
        DB db = new DB();
        String sql = "select * from preferences where user_id = " + user_id;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                preferences = new Preferences(
                        resultSet.getInt("id"),
                        resultSet.getInt("user_id"),
                        resultSet.getInt("enable_dark_mode") == 1,
                        resultSet.getString("profile_page_background_image"),
                        resultSet.getString("global_chat_background_image"),
                        resultSet.getInt("enable_press_enter_to_send") == 1,
                        resultSet.getString("application_language"),
                        resultSet.getInt("allow_hide_scroll_control") == 1,
                        resultSet.getInt("allow_hide_page_header") == 1,
                        resultSet.getInt("allow_hide_message_input") == 1,
                        resultSet.getInt("enable_modal_fade") == 1,
                        resultSet.getInt("enable_assistive_links") == 1
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return preferences;
    }

    public int insertPreferences(Preferences preferences) {
        int result = -1;
        DB db = new DB();
        String sql = "insert into preferences(" +
                "user_id," +
                "enable_dark_mode," +
                "profile_page_background_image," +
                "global_chat_background_image," +
                "enable_press_enter_to_send," +
                "application_language," +
                "allow_hide_scroll_control," +
                "allow_hide_page_header," +
                "allow_hide_message_input," +
                "enable_modal_fade," +
                "enable_assistive_links) " +
                "values(?,?,?,?,?,?,?,?,?,?,?)";
        result = db.executeUpdate(sql,
                preferences.getUserid(),
                preferences.isDarkMode() ? 1 : 0,
                preferences.getProfilePageBackgroundImage(),
                preferences.getGlobalChatBackgroundImage(),
                preferences.isPressEnterToSend() ? 1 : 0,
                preferences.getApplicationLanguage(),
                preferences.isAllowHideScrollControl() ? 1 : 0,
                preferences.isAllowHidePageHeader() ? 1 : 0,
                preferences.isAllowHideMessageInput() ? 1 : 0,
                preferences.isModalFade() ? 1 : 0,
                preferences.isAssistiveLinks() ? 1 : 0);
        db.close();
        return result;
    }

    public int updatePreferences(Preferences preferences) {
        String sql = "update preferences set " +
                "user_id = ?," +
                "enable_dark_mode = ?," +
                "profile_page_background_image = ?," +
                "global_chat_background_image = ?," +
                "enable_press_enter_to_send = ?," +
                "application_language = ?," +
                "allow_hide_scroll_control = ?," +
                "allow_hide_page_header = ?," +
                "allow_hide_message_input = ?," +
                "enable_modal_fade = ?," +
                "enable_assistive_links = ? " +
                "where id = ?";
        DB db = new DB();
        int result = db.executeUpdate(sql,
                preferences.getUserid(),
                preferences.isDarkMode() ? 1 : 0,
                preferences.getProfilePageBackgroundImage(),
                preferences.getGlobalChatBackgroundImage(),
                preferences.isPressEnterToSend() ? 1 : 0,
                preferences.getApplicationLanguage(),
                preferences.isAllowHideScrollControl() ? 1 : 0,
                preferences.isAllowHidePageHeader() ? 1 : 0,
                preferences.isAllowHideMessageInput() ? 1 : 0,
                preferences.isModalFade() ? 1 : 0,
                preferences.isAssistiveLinks() ? 1 : 0,
                preferences.getId());
        db.close();
        return result;
    }

    public int deletePreferencesByUserid(int user_id) {
        String sql = "delete from preferences where user_id = ?";
        DB db = new DB();
        int result = db.executeUpdate(sql, user_id);
        db.close();
        return result;
    }
}
