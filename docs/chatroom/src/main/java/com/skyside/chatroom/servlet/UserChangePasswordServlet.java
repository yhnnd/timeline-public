package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/change/password")
public class UserChangePasswordServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            doPost(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        // 初始化系统消息
        JsonObject systemMessage = new JsonObject();
        systemMessage.addProperty("user-id", 0);
        systemMessage.addProperty("username", "system");
        systemMessage.addProperty("room-id", 0);
        systemMessage.addProperty("type", "change password");
        systemMessage.addProperty("badge-class", "default");
        systemMessage.addProperty("text-class", "muted");
        // 查看用户登录状态
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            systemMessage.addProperty("message", "please log in first");
        } else {
            // 获取用户发送的新密码
            String newPassword = request.getParameter("new-password");
            // 获取用户对象
            UserDAO userDAO = new UserDAO();
            User user = userDAO.getUserByUserid(userid);
            // 备份原密码
            String oldPassword = user.getPassword();
            // 新旧密码是否相同
            if (oldPassword.equals(newPassword)) {
                // 新旧密码相同
                systemMessage.addProperty("message", "new password is same with previous password");
            } else {
                // 设置新密码
                user.setPassword(newPassword);
                userDAO.updatePassword(user);
                try {
                    // 如果密码修改成功
                    if (userDAO.getUserByUsernameAndPassword(user.getUsername(), newPassword) != null &&
                            userDAO.getUserByUsernameAndPassword(user.getUsername(), newPassword).getUserid() == userid) {
                        systemMessage.addProperty("badge-class", "primary");
                        systemMessage.addProperty("text-class", "primary");
                        systemMessage.addProperty("message", "new password has been applied");
                    } else {
                        // 密码修改失败
                        systemMessage.addProperty("message", "failed to apply new password");
                        // 恢复原密码
                        user.setPassword(oldPassword);
                        userDAO.updatePassword(user);
                    }
                } catch (Exception e) {
                    systemMessage.addProperty("message", "Error Connecting to Database");
                    e.printStackTrace();
                }
            }
        }
        // 输出系统消息
        out.print(gson.toJson(systemMessage));
        out.close();
    }
}
