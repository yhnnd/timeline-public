package com.skyside.chatroom.service;

import com.skyside.chatroom.dao.PreferencesDAO;
import com.skyside.chatroom.vo.Preferences;

public class PreferencesService {
    private static Preferences defaultPreferences(int userid) {
        return new Preferences(
                0,
                userid,
                false,
                null,
                null,
                false,
                "lang-en",
                true,
                true,
                false,
                true,
                true);
    }

    public static int setPreferencesByUserid(int userid, String propertyName, String propertyValue) {
        PreferencesDAO preferencesDAO = new PreferencesDAO();
        Preferences preferences = preferencesDAO.getPreferencesByUserid(userid);
        if (preferences == null) {
            preferences = defaultPreferences(userid);
            preferencesDAO.insertPreferences(preferences);
        }
        switch (propertyName) {
            case "profile-page-background-image":
                preferences.setProfilePageBackgroundImage(propertyValue);
                break;
            case "global-chat-background-image":
                preferences.setGlobalChatBackgroundImage(propertyValue);
                break;
            case "application-language":
                preferences.setApplicationLanguage(propertyValue);
                break;
        }
        return preferencesDAO.updatePreferences(preferences);
    }

    public static int setPreferencesByUserid(int userid, String propertyName, boolean propertyValue) {
        PreferencesDAO preferencesDAO = new PreferencesDAO();
        Preferences preferences = preferencesDAO.getPreferencesByUserid(userid);
        if (preferences == null) {
            preferences = defaultPreferences(userid);
            preferencesDAO.insertPreferences(preferences);
        }
        switch (propertyName) {
            case "is-dark-mode":
                preferences.setDarkMode(propertyValue);
                break;
            case "is-press-enter-to-send":
                preferences.setPressEnterToSend(propertyValue);
                break;
            case "allow-hide-scroll-control":
                preferences.setAllowHideScrollControl(propertyValue);
                break;
            case "allow-hide-page-header":
                preferences.setAllowHidePageHeader(propertyValue);
                break;
            case "allow-hide-message-input":
                preferences.setAllowHideMessageInput(propertyValue);
                break;
            case "is-modal-fade":
                preferences.setModalFade(propertyValue);
                break;
            case "is-assistive-links-enabled":
                preferences.setAssistiveLinks(propertyValue);
                break;
        }
        return preferencesDAO.updatePreferences(preferences);
    }

    public static Preferences getPreferencesByUserid(int userid) {
        PreferencesDAO preferencesDAO = new PreferencesDAO();
        Preferences preferences = preferencesDAO.getPreferencesByUserid(userid);
        if (preferences == null) preferences = defaultPreferences(userid);
        return preferences;
    }
}
