package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class CardComment {
    @SerializedName("id")
    private int id;
    @SerializedName("user-id")
    private int userId;
    @SerializedName("card-id")
    private int cardId;
    @SerializedName("text")
    private String text;
    @SerializedName("type")
    private String type;// text, HTML, image
    @SerializedName("target")
    private String target;// card, comment
    @SerializedName("target-id")
    private int targetId;// card-id, comment-id
    @SerializedName("create-time")
    private long createTime;
    @SerializedName("is-timed")
    private boolean isTimed;
    @SerializedName("life-millis")
    private long lifeMillis;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
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

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public int getTargetId() {
        return targetId;
    }

    public void setTargetId(int targetId) {
        this.targetId = targetId;
    }

    public long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(long createTime) {
        this.createTime = createTime;
    }

    public boolean isTimed() {
        return isTimed;
    }

    public void setTimed(boolean timed) {
        isTimed = timed;
    }

    public long getLifeMillis() {
        return lifeMillis;
    }

    public void setLifeMillis(long lifeMillis) {
        this.lifeMillis = lifeMillis;
    }

    public CardComment(int id, int userId, int cardId, String text, String type, String target, int targetId, long createTime, boolean isTimed, long lifeMillis) {
        this.id = id;
        this.userId = userId;
        this.cardId = cardId;
        this.text = text;
        this.type = type;
        this.target = target;
        this.targetId = targetId;
        this.createTime = createTime;
        this.isTimed = isTimed;
        this.lifeMillis = lifeMillis;
    }
}
