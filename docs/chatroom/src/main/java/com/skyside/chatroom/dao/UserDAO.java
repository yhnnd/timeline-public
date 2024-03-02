package com.skyside.chatroom.dao;

import com.skyside.chatroom.service.SystemMessageService;
import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.User;

import java.sql.ResultSet;

public class UserDAO {

    private User getUser(String sql) throws Exception {
        User user = null;
        DB db = new DB();
        ResultSet resultSet = null;
        try {
            resultSet = db.executeQuery(sql);
            if (resultSet != null) {
                if (resultSet.next()) {
                    int userid = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    String role = resultSet.getString("role");
                    String gender = resultSet.getString("gender");
                    String avatar = resultSet.getString("avatar");
                    String email = resultSet.getString("email");
                    user = new User(userid, name, "classified", gender, avatar, role, email);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        if (resultSet == null) {
            throw new Exception("Error Connecting Database");
        }
        return user;
    }

    public User getUserByUsernameAndPassword(String username, String password) throws Exception {
        // 防御 SQL 注入
        if (username.contains("'") || password.contains("'")) {
            User user = getUserByUsername(username.split("'")[0]);
            if (user != null) {
                SystemMessageService.sendAccountUnsafeMessage(user);
            }
            return null;
        }
        String sql = "select * from user where name='" + username + "' and password ='" + password + "'";
        return getUser(sql);
    }

    public User getUserByUserIdAndPassword(int userId, String password) {
        // 防御 SQL 注入
        if (password.contains("'") || password.contains("--")) {
            User user = getUserByUserid(userId);
            if (user != null) {
                SystemMessageService.sendAccountUnsafeMessage(user);
            }
            return null;
        }
        String sql = "select * from user where id=" + userId + " and password ='" + password + "'";
        User user = null;
        try {
            user = getUser(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public User getUserByUserid(int userid) {
        String sql = "select * from user where id = " + userid;
        User user = null;
        try {
            user = getUser(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public User getUserByUsername(String username) {
        String sql = "select * from user where name = '" + username + "'";
        User user = null;
        try {
            user = getUser(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public int InsertUser(String username, String password, int age, String gender, String email) {
        int result = 0;
        DB db = new DB();
        String sql = "insert into user(name,password,age,gender,role,email) " +
                "values('" + username + "','" + password + "'," + age + ",'" + gender + "'," +
                "'normal'," +
                "'" + email + "')";
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    private User update(String sql) {
        DB db = new DB();
        User newUser = null;
        try {
            ResultSet resultSet = db.executeUpdateGetKeys(sql);
            if (resultSet.next()) {
                int id = resultSet.getInt(1);
                newUser = getUserByUserid(id);
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return newUser;
    }

    public User updateUsername(User user) {
        String sql = "update user set name = '" + user.getUsername() + "' where id = " + user.getUserid();
        return update(sql);
    }

    public User updatePassword(User user) {
        String sql = "update user set password = '" + user.getPassword() + "' where id = " + user.getUserid();
        return update(sql);
    }

    public User updateAvatar(User user) {
        String sql = "update user set avatar = '" + user.getAvatar() + "' where id = " + user.getUserid();
        return update(sql);
    }

    public User updateGender(User user) {
        String sql = "update user set gender = '" + user.getGender() + "' where id = " + user.getUserid();
        return update(sql);
    }
}
