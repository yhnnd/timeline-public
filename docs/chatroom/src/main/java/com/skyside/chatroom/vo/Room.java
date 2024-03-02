package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class Room {
    @SerializedName("roomid")
    private int roomid;
    @SerializedName("name")
    private String name;
    @SerializedName("create-time")
    private Timestamp createTime;
    @SerializedName("type")
    private String type;
    @SerializedName("live")
    private int live;

    public int getRoomid() {
        return roomid;
    }

    public void setRoomid(int roomid) {
        this.roomid = roomid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getLive() {
        return live;
    }

    public void setLive(int live) {
        this.live = live;
    }

    public Room(int roomid, String name, Timestamp createTime, String type, int live) {
        this.roomid = roomid;
        this.name = name;
        this.createTime = createTime;
        this.type = type;
        this.live = live;
    }
}
