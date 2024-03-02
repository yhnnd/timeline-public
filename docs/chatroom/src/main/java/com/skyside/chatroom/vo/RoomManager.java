package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

public class RoomManager {
    @SerializedName("id")                       private int id;
    @SerializedName("room-id")                  private int roomId;
    @SerializedName("user-id")                  private int userId;
    @SerializedName("change-manager")           private int changeManager;
    @SerializedName("change-manager-privilege") private int changeManagerPrivilege;
    @SerializedName("change-room-name")         private int changeRoomName;
    @SerializedName("change-room-type")         private int changeRoomType;
    @SerializedName("change-room-live")         private int changeRoomLive;
    @SerializedName("delete-room")              private int deleteRoom;
    @SerializedName("split-room")               private int splitRoom;
    @SerializedName("merge-room")               private int mergeRoom;
    @SerializedName("approve-user")             private int approveUser;
    @SerializedName("mute-user")                private int muteUser;
    @SerializedName("mute-all-user")            private int muteAllUser;
    @SerializedName("remove-user")              private int removeUser;
    @SerializedName("call-all-user")            private int callAllUser;
    @SerializedName("toggle-anonymous")         private int toggleAnonymous;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getChangeManager() {
        return changeManager;
    }

    public void setChangeManager(int changeManager) {
        this.changeManager = changeManager;
    }

    public int getChangeManagerPrivilege() {
        return changeManagerPrivilege;
    }

    public void setChangeManagerPrivilege(int changeManagerPrivilege) {
        this.changeManagerPrivilege = changeManagerPrivilege;
    }

    public int getChangeRoomName() {
        return changeRoomName;
    }

    public void setChangeRoomName(int changeRoomName) {
        this.changeRoomName = changeRoomName;
    }

    public int getChangeRoomType() {
        return changeRoomType;
    }

    public void setChangeRoomType(int changeRoomType) {
        this.changeRoomType = changeRoomType;
    }

    public int getChangeRoomLive() {
        return changeRoomLive;
    }

    public void setChangeRoomLive(int changeRoomLive) {
        this.changeRoomLive = changeRoomLive;
    }

    public int getDeleteRoom() {
        return deleteRoom;
    }

    public void setDeleteRoom(int deleteRoom) {
        this.deleteRoom = deleteRoom;
    }

    public int getSplitRoom() {
        return splitRoom;
    }

    public void setSplitRoom(int splitRoom) {
        this.splitRoom = splitRoom;
    }

    public int getMergeRoom() {
        return mergeRoom;
    }

    public void setMergeRoom(int mergeRoom) {
        this.mergeRoom = mergeRoom;
    }

    public int getApproveUser() {
        return approveUser;
    }

    public void setApproveUser(int approveUser) {
        this.approveUser = approveUser;
    }

    public int getMuteUser() {
        return muteUser;
    }

    public void setMuteUser(int muteUser) {
        this.muteUser = muteUser;
    }

    public int getMuteAllUser() {
        return muteAllUser;
    }

    public void setMuteAllUser(int muteAllUser) {
        this.muteAllUser = muteAllUser;
    }

    public int getRemoveUser() {
        return removeUser;
    }

    public void setRemoveUser(int removeUser) {
        this.removeUser = removeUser;
    }

    public int getCallAllUser() {
        return callAllUser;
    }

    public void setCallAllUser(int callAllUser) {
        this.callAllUser = callAllUser;
    }

    public int getToggleAnonymous() {
        return toggleAnonymous;
    }

    public void setToggleAnonymous(int toggleAnonymous) {
        this.toggleAnonymous = toggleAnonymous;
    }

    public RoomManager(int id, int roomId, int userId, int changeManager, int changeManagerPrivilege, int changeRoomName, int changeRoomType, int changeRoomLive, int deleteRoom, int splitRoom, int mergeRoom, int approveUser, int muteUser, int muteAllUser, int removeUser, int callAllUser, int toggleAnonymous) {
        this.id = id;
        this.roomId = roomId;
        this.userId = userId;
        this.changeManager = changeManager;
        this.changeManagerPrivilege = changeManagerPrivilege;
        this.changeRoomName = changeRoomName;
        this.changeRoomType = changeRoomType;
        this.changeRoomLive = changeRoomLive;
        this.deleteRoom = deleteRoom;
        this.splitRoom = splitRoom;
        this.mergeRoom = mergeRoom;
        this.approveUser = approveUser;
        this.muteUser = muteUser;
        this.muteAllUser = muteAllUser;
        this.removeUser = removeUser;
        this.callAllUser = callAllUser;
        this.toggleAnonymous = toggleAnonymous;
    }
}
