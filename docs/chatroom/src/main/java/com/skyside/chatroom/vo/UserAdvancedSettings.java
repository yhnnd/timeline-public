package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

public class UserAdvancedSettings {
    @SerializedName("id")
    private int id;
    @SerializedName("user-id")
    private int userid;

    @SerializedName("allow-multiple-online-devices")
    private boolean multipleOnline;
    @SerializedName("allow-compulsory-disconnect")
    private boolean compulsoryDisconnect;
    @SerializedName(value = "allow-expose-online-status", alternate = {"allow-online-status-exposed"})
    private boolean exposeOnlineStatus;
    @SerializedName(value = "allow-expose-username", alternate = {"allow-username-exposed"})
    private boolean exposeUserName;
    @SerializedName(value = "allow-expose-user-id", alternate = {"allow-user-id-exposed"})
    private boolean exposeUserId;
    @SerializedName(value = "allow-expose-user-gender", alternate = {"allow-user-gender-exposed"})
    private boolean exposeUserGender;
    @SerializedName(value = "allow-expose-user-age", alternate = {"allow-user-age-exposed"})
    private boolean exposeUserAge;
    @SerializedName(value = "allow-expose-user-cards", alternate = {"allow-user-cards-exposed"})
    private boolean exposeUserCards;
    @SerializedName("allow-load-html-messages")
    private boolean loadHtmlMessages;
    @SerializedName("allow-temporary-chats")
    private boolean enableTemporaryChats;

    // Allow notification popup show preview text
    @SerializedName("allow-popup-preview")
    private boolean popupPreview;

    // Turn Night Mode on to block notifications from 22:00 to 8:00
    @SerializedName("is-night-mode-enabled")
    private boolean nightMode;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public boolean isMultipleOnline() {
        return multipleOnline;
    }

    public void setMultipleOnline(boolean multipleOnline) {
        this.multipleOnline = multipleOnline;
    }

    public boolean isCompulsoryDisconnect() {
        return compulsoryDisconnect;
    }

    public void setCompulsoryDisconnect(boolean compulsoryDisconnect) {
        this.compulsoryDisconnect = compulsoryDisconnect;
    }

    public boolean isExposeOnlineStatus() {
        return exposeOnlineStatus;
    }

    public void setExposeOnlineStatus(boolean exposeOnlineStatus) {
        this.exposeOnlineStatus = exposeOnlineStatus;
    }

    public boolean isExposeUserName() {
        return exposeUserName;
    }

    public void setExposeUserName(boolean exposeUserName) {
        this.exposeUserName = exposeUserName;
    }

    public boolean isExposeUserId() {
        return exposeUserId;
    }

    public void setExposeUserId(boolean exposeUserId) {
        this.exposeUserId = exposeUserId;
    }

    public boolean isExposeUserGender() {
        return exposeUserGender;
    }

    public void setExposeUserGender(boolean exposeUserGender) {
        this.exposeUserGender = exposeUserGender;
    }

    public boolean isExposeUserAge() {
        return exposeUserAge;
    }

    public void setExposeUserAge(boolean exposeUserAge) {
        this.exposeUserAge = exposeUserAge;
    }

    public boolean isExposeUserCards() {
        return exposeUserCards;
    }

    public void setExposeUserCards(boolean exposeUserCards) {
        this.exposeUserCards = exposeUserCards;
    }

    public boolean isLoadHtmlMessages() {
        return loadHtmlMessages;
    }

    public void setLoadHtmlMessages(boolean loadHtmlMessages) {
        this.loadHtmlMessages = loadHtmlMessages;
    }

    public boolean isEnableTemporaryChats() {
        return enableTemporaryChats;
    }

    public void setEnableTemporaryChats(boolean enableTemporaryChats) {
        this.enableTemporaryChats = enableTemporaryChats;
    }

    public boolean isPopupPreview() {
        return popupPreview;
    }

    public void setPopupPreview(boolean popupPreview) {
        this.popupPreview = popupPreview;
    }

    public boolean isNightMode() {
        return nightMode;
    }

    public void setNightMode(boolean nightMode) {
        this.nightMode = nightMode;
    }

    public UserAdvancedSettings(int id, int userid, boolean multipleOnline, boolean compulsoryDisconnect, boolean exposeOnlineStatus, boolean exposeUserName, boolean exposeUserId, boolean exposeUserGender, boolean exposeUserAge, boolean exposeUserCards, boolean loadHtmlMessages, boolean enableTemporaryChats, boolean popupPreview, boolean nightMode) {
        this.id = id;
        this.userid = userid;
        this.multipleOnline = multipleOnline;
        this.compulsoryDisconnect = compulsoryDisconnect;
        this.exposeOnlineStatus = exposeOnlineStatus;
        this.exposeUserName = exposeUserName;
        this.exposeUserId = exposeUserId;
        this.exposeUserGender = exposeUserGender;
        this.exposeUserAge = exposeUserAge;
        this.exposeUserCards = exposeUserCards;
        this.loadHtmlMessages = loadHtmlMessages;
        this.enableTemporaryChats = enableTemporaryChats;
        this.popupPreview = popupPreview;
        this.nightMode = nightMode;
    }

    @Override
    public String toString() {
        return "UserAdvancedSettings{" +
                "id=" + id +
                ", userid=" + userid +
                ", multipleOnline=" + multipleOnline +
                ", compulsoryDisconnect=" + compulsoryDisconnect +
                ", exposeOnlineStatus=" + exposeOnlineStatus +
                ", exposeUserName=" + exposeUserName +
                ", exposeUserId=" + exposeUserId +
                ", exposeUserGender=" + exposeUserGender +
                ", exposeUserAge=" + exposeUserAge +
                ", exposeUserCards=" + exposeUserCards +
                ", loadHtmlMessages=" + loadHtmlMessages +
                ", enableTemporaryChats=" + enableTemporaryChats +
                ", popupPreview=" + popupPreview +
                ", nightMode=" + nightMode +
                '}';
    }
}
