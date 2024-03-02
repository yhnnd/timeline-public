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

@WebServlet("/user-reset-password-activate")
public class UserResetPasswordActivate extends HttpServlet {
    private Gson gson = new Gson();

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
            int helperId = Integer.parseInt(request.getParameter("helper-id"));
            int senderId = Integer.parseInt(request.getParameter("sender-id"));
            if (helperId == userid) {
                String requestId = request.getParameter("request-id");
                String requestToken = request.getParameter("request-token");
                String newPassword = request.getParameter("new-password");
                UserDAO userDAO = new UserDAO();
                User sender = userDAO.getUserByUserid(senderId);
                User helper = userDAO.getUserByUserid(helperId);
                if (sender != null && helper != null) {
                    // 设置新密码
                    sender.setPassword(newPassword);
                    userDAO.updatePassword(sender);
                    try {
                        // 如果密码修改成功
                        if (userDAO.getUserByUsernameAndPassword(sender.getUsername(), newPassword) != null &&
                                userDAO.getUserByUsernameAndPassword(sender.getUsername(), newPassword).getUserid() == senderId) {
                            systemMessage.addProperty("badge-class", "primary");
                            systemMessage.addProperty("text-class", "primary");
                            systemMessage.addProperty("message", "new password has been applied");
                        } else {
                            // 密码修改失败
                            systemMessage.addProperty("message", "failed to apply new password (ERR 3)");
                        }
                    } catch (Exception e) {
                        systemMessage.addProperty("message", "Error Connecting to Database (ERR 4)");
                        e.printStackTrace();
                    }
                } else {
                    systemMessage.addProperty("message", "failed to apply new password (ERR 2)");
                }
            } else {
                systemMessage.addProperty("message", "failed to apply new password (ERR 1)");
            }
        }
        // 输出系统消息
        out.print(gson.toJson(systemMessage));
        out.close();
    }
}
