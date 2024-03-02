package com.skyside.chatroom.service;

import com.skyside.chatroom.dao.AdvancedSettingsDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.User;
import com.skyside.chatroom.vo.UserAdvancedSettings;

public class AdvancedSettingsService {
    public static int setAdvancedSettingsByUserid(int userid, String valueName, String value) {
        UserDAO userDAO = new UserDAO();
        User user = userDAO.getUserByUserid(userid);
        if (user != null) {
            return AdvancedSettingsDAO.setAdvancedSettingsByUserid(userid, valueName, value);
        } else {// user not found
            return -1;
        }
    }

    public static UserAdvancedSettings getAdvancedSettingsByUserid(int userid) {
        UserAdvancedSettings userAdvancedSettings = AdvancedSettingsDAO.getAdvancedSettingsByUserid(userid);
        if (userAdvancedSettings != null) {
            return userAdvancedSettings;
        } else {
            return new UserAdvancedSettings(0, userid,
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
                    false);
        }
    }
}
