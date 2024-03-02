package com.skyside.chatroom.vo;

public class User {
    private int userid;
    private String username;
    private String password;
    private String gender;
    private String avatar;
    private String role;
    private String email;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User(int userid, String username, String password, String gender, String avatar, String role) {
        this.userid = userid;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.avatar = avatar;
        this.role = role;
    }

    public User(int userid, String username, String password, String gender, String avatar, String role, String email) {
        this.userid = userid;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.avatar = avatar;
        this.role = role;
        this.email = email;
    }
}
