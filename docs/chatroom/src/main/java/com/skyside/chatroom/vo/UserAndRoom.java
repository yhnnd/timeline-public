package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class UserAndRoom {
    @SerializedName("id")
    private int id;
    @SerializedName("userid")
    private int userid;
    @SerializedName("roomid")
    private int roomid;
    @SerializedName("join-time")
    private Timestamp joinTime;
    @SerializedName("status-code")
    private int statusCode;
    // status   meaning                 status   meaning
    // 1        已发送，被屏蔽             5        已收到，已屏蔽
    // 2        已发送，待回复             6        已收到，未回复
    // 3        已发送，被拒绝             7        已收到，已拒绝
    // 4        已发送，被接受             8        已收到，已接受
    @SerializedName("notify-code")
    private int notifyCode;
    // notify       meaning
    // 0            有新消息不显示 badge
    // 1            有新消息显示 badge-default
    // 2            有新消息显示 badge-primary
    // 3            有新消息显示 badge-success
    // 4            有新消息显示 badge-info
    // 5            有新消息显示 badge-warning
    // 6            有新消息显示 badge-danger
    // 7            有新消息显示 badge-inverse
    @SerializedName("popup")
    private int popup;
    // popup        meaning
    // 0            有新消息不弹窗
    // 1            有新消息弹窗
    @SerializedName("nickname")
    private String nickname;

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

    public int getRoomid() {
        return roomid;
    }

    public void setRoomid(int roomid) {
        this.roomid = roomid;
    }

    public Timestamp getJoinTime() {
        return joinTime;
    }

    public void setJoinTime(Timestamp joinTime) {
        this.joinTime = joinTime;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public int getNotifyCode() {
        return notifyCode;
    }

    public void setNotifyCode(int notifyCode) {
        this.notifyCode = notifyCode;
    }

    public int getPopup() {
        return popup;
    }

    public void setPopup(int popup) {
        this.popup = popup;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public UserAndRoom(int id, int userid, int roomid, Timestamp joinTime, int statusCode, int notifyCode, int popup, String nickname) {
        this.id = id;
        this.userid = userid;
        this.roomid = roomid;
        this.joinTime = joinTime;
        this.statusCode = statusCode;
        this.notifyCode = notifyCode;
        this.popup = popup;
        this.nickname = nickname;
    }
}
