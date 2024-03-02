package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class Card {
    @SerializedName("card-id")
    int id;
    @SerializedName("user-id")
    int userid;
    @SerializedName("card-class")
    String cardClass;
    @SerializedName("card-type")
    String cardType;
    @SerializedName("card-title")
    String cardTitle;
    @SerializedName("card-block-text")
    String cardBlockText;
    @SerializedName("card-block-text-full")
    String cardBlockTextFull;
    @SerializedName("card-footer-text")
    String cardFooterText;
    @SerializedName("cover-image")
    String image;
    @SerializedName("avatar")
    String avatar;
    @SerializedName("create-time")
    Timestamp createTime;

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

    public String getCardClass() {
        return cardClass;
    }

    public void setCardClass(String cardClass) {
        this.cardClass = cardClass;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardTitle() {
        return cardTitle;
    }

    public void setCardTitle(String cardTitle) {
        this.cardTitle = cardTitle;
    }

    public String getCardBlockText() {
        return cardBlockText;
    }

    public void setCardBlockText(String cardBlockText) {
        this.cardBlockText = cardBlockText;
    }

    public String getCardBlockTextFull() {
        return cardBlockTextFull;
    }

    public void setCardBlockTextFull(String cardBlockTextFull) {
        this.cardBlockTextFull = cardBlockTextFull;
    }

    public String getCardFooterText() {
        return cardFooterText;
    }

    public void setCardFooterText(String cardFooterText) {
        this.cardFooterText = cardFooterText;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public boolean getIsPrivate(){
        boolean isPrivate = false;
        String strPrivateCard = "[private]";
        if(cardBlockText.trim().indexOf(strPrivateCard)==0||cardBlockTextFull.trim().indexOf(strPrivateCard)==0){
            isPrivate = true;
        }
        return isPrivate;
    }

    public Card(int id, int userid, String cardClass, String cardType, String cardTitle, String cardBlockText, String cardBlockTextFull, String cardFooterText, String image, String avatar, Timestamp createTime) {
        this.id = id;
        this.userid = userid;
        this.cardClass = cardClass;
        this.cardType = cardType;
        this.cardTitle = cardTitle;
        this.cardBlockText = cardBlockText;
        this.cardBlockTextFull = cardBlockTextFull;
        this.cardFooterText = cardFooterText;
        this.image = image;
        this.avatar = avatar;
        this.createTime = createTime;
    }
}
