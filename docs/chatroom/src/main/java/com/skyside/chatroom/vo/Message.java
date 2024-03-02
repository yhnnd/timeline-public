package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class Message {
    @SerializedName("id")
    private int id;
    @SerializedName("user-id")
    private int userid;
    @SerializedName("username")
    private String username;
    @SerializedName("badge-class")
    private String badgeClass;
    @SerializedName("text-class")
    private String textClass;
    @SerializedName("room-id")
    private int roomid;
    @SerializedName("send-time")
    private Timestamp sendTime;
    // 消息内容（可选项：文本，HTML，网址，图片地址，视频地址）
    @SerializedName("message")
    private String text;
    // 消息类型
    // 可选项
    // text, html, url, image, video, code,
    // compulsory disconnect, login, logout,
    // delete message, withdraw message, more messages,
    // create card, add friend accept, add friend,
    // change username, change password, change avatar, change gender, change age, change email
    @SerializedName("type")
    private String type;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBadgeClass() {
        return badgeClass;
    }

    public void setBadgeClass(String badgeClass) {
        this.badgeClass = badgeClass;
    }

    public String getTextClass() {
        return textClass;
    }

    public void setTextClass(String textClass) {
        this.textClass = textClass;
    }

    public int getRoomid() {
        return roomid;
    }

    public void setRoomid(int roomid) {
        this.roomid = roomid;
    }

    public Timestamp getSendTime() {
        return sendTime;
    }

    public void setSendTime(Timestamp sendTime) {
        this.sendTime = sendTime;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Message(int id, int userid, String username, String badgeClass, String textClass, int roomid, Timestamp sendTime, String text, String type) {
        this.id = id;
        this.userid = userid;
        this.username = username;
        this.badgeClass = badgeClass;
        this.textClass = textClass;
        this.roomid = roomid;
        this.sendTime = sendTime;
        this.text = text;
        this.type = type;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", userid=" + userid +
                ", username='" + username + '\'' +
                ", badgeClass='" + badgeClass + '\'' +
                ", textClass='" + textClass + '\'' +
                ", roomid=" + roomid +
                ", sendTime=" + sendTime +
                ", text='" + text + '\'' +
                ", type='" + type + '\'' +
                '}';
    }

    // 消息片段的 type 样例: segment-code-1510453012408038995965658218257-2-1
    public boolean isSegment() {
        return this.type.startsWith("segment-");
    }

    public String getSegmentType() {
        return this.type.split("-")[1];
    }

    public String getSegmentId() {
        return this.type.split("-")[2];
    }

    public int getSegmentNumber() {
        return Integer.parseInt(this.type.split("-")[3]);
    }
}
