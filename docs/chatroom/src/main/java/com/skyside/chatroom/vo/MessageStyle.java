package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

public class MessageStyle {
    @SerializedName("id")
    private int id;
    @SerializedName("user-id")
    private int userid;
    @SerializedName("avatar-class")
    private String avatarClass;
    @SerializedName("avatar-border")
    private String avatarBorder;
    @SerializedName("avatar-border-radius")
    private String avatarBorderRadius;
    @SerializedName("username-text-class")
    private String usernameTextClass;
    @SerializedName("username-badge-class")
    private String usernameBadgeClass;
    @SerializedName("message-text-class")
    private String messageTextClass;
    @SerializedName("message-background-class")
    private String messageBackgroundClass;
    @SerializedName("message-border")
    private String messageBorder;
    @SerializedName("message-border-radius")
    private String messageBorderRadius;

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

    public String getAvatarClass() {
        return avatarClass;
    }

    public void setAvatarClass(String avatarClass) {
        this.avatarClass = avatarClass;
    }

    public String getAvatarBorder() {
        return avatarBorder;
    }

    public void setAvatarBorder(String avatarBorder) {
        this.avatarBorder = avatarBorder;
    }

    public String getAvatarBorderRadius() {
        return avatarBorderRadius;
    }

    public void setAvatarBorderRadius(String avatarBorderRadius) {
        this.avatarBorderRadius = avatarBorderRadius;
    }

    public String getUsernameTextClass() {
        return usernameTextClass;
    }

    public void setUsernameTextClass(String usernameTextClass) {
        this.usernameTextClass = usernameTextClass;
    }

    public String getUsernameBadgeClass() {
        return usernameBadgeClass;
    }

    public void setUsernameBadgeClass(String usernameBadgeClass) {
        this.usernameBadgeClass = usernameBadgeClass;
    }

    public String getMessageTextClass() {
        return messageTextClass;
    }

    public void setMessageTextClass(String messageTextClass) {
        this.messageTextClass = messageTextClass;
    }

    public String getMessageBackgroundClass() {
        return messageBackgroundClass;
    }

    public void setMessageBackgroundClass(String messageBackgroundClass) {
        this.messageBackgroundClass = messageBackgroundClass;
    }

    public String getMessageBorder() {
        return messageBorder;
    }

    public void setMessageBorder(String messageBorder) {
        this.messageBorder = messageBorder;
    }

    public String getMessageBorderRadius() {
        return messageBorderRadius;
    }

    public void setMessageBorderRadius(String messageBorderRadius) {
        this.messageBorderRadius = messageBorderRadius;
    }

    public MessageStyle(int id, int userid, String avatarClass, String avatarBorder, String avatarBorderRadius, String usernameTextClass, String usernameBadgeClass, String messageTextClass, String messageBackgroundClass, String messageBorder, String messageBorderRadius) {
        this.id = id;
        this.userid = userid;
        this.avatarClass = avatarClass;
        this.avatarBorder = avatarBorder;
        this.avatarBorderRadius = avatarBorderRadius;
        this.usernameTextClass = usernameTextClass;
        this.usernameBadgeClass = usernameBadgeClass;
        this.messageTextClass = messageTextClass;
        this.messageBackgroundClass = messageBackgroundClass;
        this.messageBorder = messageBorder;
        this.messageBorderRadius = messageBorderRadius;
    }

    @Override
    public String toString() {
        return "MessageStyle{" +
                "id=" + id +
                ", userid=" + userid +
                ", avatarClass='" + avatarClass + '\'' +
                ", avatarBorder='" + avatarBorder + '\'' +
                ", avatarBorderRadius='" + avatarBorderRadius + '\'' +
                ", usernameTextClass='" + usernameTextClass + '\'' +
                ", usernameBadgeClass='" + usernameBadgeClass + '\'' +
                ", messageTextClass='" + messageTextClass + '\'' +
                ", messageBackgroundClass='" + messageBackgroundClass + '\'' +
                ", messageBorder='" + messageBorder + '\'' +
                ", messageBorderRadius='" + messageBorderRadius + '\'' +
                '}';
    }
}
