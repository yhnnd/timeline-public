package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@WebServlet("/change/gender")
public class UserChangeGenderServlet extends HttpServlet{
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
        Timestamp sendTime = new Timestamp(System.currentTimeMillis());
        Message systemMessage = new Message(0,0,"system","default","muted",0,sendTime,"","change gender");
        // 查看用户登录状态
        if(sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            systemMessage.setText("please log in first");
        } else {
            String newGender = request.getParameter("new-gender");
            UserDAO userDAO = new UserDAO();
            User user = userDAO.getUserByUserid(userid);
            user.setGender(newGender);
            userDAO.updateGender(user);
            if(userDAO.getUserByUserid(userid).getGender().equals(newGender)){
                // 修改成功
                systemMessage.setBadgeClass("primary");
                systemMessage.setTextClass("primary");
                systemMessage.setText("new gender has been applied");
            } else {
                // 修改失败
                systemMessage.setText("failed to apply gender");
            }
        }
        // 输出系统消息
        out.print(gson.toJson(systemMessage));
        out.close();
    }
}
