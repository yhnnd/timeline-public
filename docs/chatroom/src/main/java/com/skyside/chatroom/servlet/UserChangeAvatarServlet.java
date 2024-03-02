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

@WebServlet("/change/avatar")
public class UserChangeAvatarServlet extends HttpServlet{
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
        systemMessage.addProperty("type", "change avatar");
        systemMessage.addProperty("badge-class", "default");
        systemMessage.addProperty("text-class", "muted");
        // 查看用户登录状态
        if(sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            systemMessage.addProperty("message","please log in first");
        } else {
            // 获取用户发送的头像 URL 地址
            String newAvatar = request.getParameter("new-avatar");
            // 获取用户对象
            UserDAO userDAO = new UserDAO();
            User user = userDAO.getUserByUserid(userid);
            // 设置新头像
            user.setAvatar(newAvatar);
            userDAO.updateAvatar(user);
            // 重新获取用户对象
            User newUser = userDAO.getUserByUserid(userid);
            // 判断头像修改是否成功
            if( newUser != null && newUser.getAvatar().equals(newAvatar) ){
                // 头像修改成功
                systemMessage.addProperty("badge-class", "primary");
                systemMessage.addProperty("text-class", "primary");
                systemMessage.addProperty("message","new avatar has been applied");
            } else {
                // 头像修改失败
                systemMessage.addProperty("message","failed to apply new avatar");
            }
        }
        // 输出系统消息
        out.print(gson.toJson(systemMessage));
        out.close();
    }
}
