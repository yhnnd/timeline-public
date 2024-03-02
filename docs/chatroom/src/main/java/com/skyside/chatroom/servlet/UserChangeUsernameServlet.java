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

@WebServlet("/change/username")
public class UserChangeUsernameServlet extends HttpServlet{
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
        systemMessage.addProperty("type", "change username");
        systemMessage.addProperty("badge-class", "default");
        systemMessage.addProperty("text-class", "muted");
        // 查看用户登录状态
        if(sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            systemMessage.addProperty("message","please log in first");
        } else {
            // 获取用户发送的新用户名
            String newUsername = request.getParameter("new-username");
            // 获取用户对象
            UserDAO userDAO = new UserDAO();
            User user = userDAO.getUserByUserid(userid);
            // 备份原用户名
            String oldUsername = user.getUsername();
            // 新旧用户名是否相同
            if(oldUsername.equals(newUsername)){
                // 新旧用户名相同
                systemMessage.addProperty("message","new username is same with previous username");
            } else if (userDAO.getUserByUsername(newUsername) != null) {
                // 用户名已被别人使用
                systemMessage.addProperty("message", "new username not available");
            } else {
                // 设置新用户名
                user.setUsername(newUsername);
                userDAO.updateUsername(user);
                // 如果用户名修改成功
                if(userDAO.getUserByUsername(newUsername) != null &&
                        userDAO.getUserByUsername(newUsername).getUserid() == userid){
                    systemMessage.addProperty("badge-class", "primary");
                    systemMessage.addProperty("text-class", "primary");
                    systemMessage.addProperty("message","new username has been applied");
                } else {
                    // 用户名修改失败
                    systemMessage.addProperty("message","failed to apply new username");
                    // 恢复原用户名
                    user.setUsername(oldUsername);
                    userDAO.updateUsername(user);
                }
            }
        }
        // 输出系统消息
        out.print(gson.toJson(systemMessage));
        out.close();
    }
}
