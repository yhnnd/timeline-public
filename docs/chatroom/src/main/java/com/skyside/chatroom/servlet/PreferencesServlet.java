package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.service.PreferencesService;
import com.skyside.chatroom.vo.Preferences;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/preferences")
public class PreferencesServlet extends HttpServlet {
    private Gson gson = new Gson();

    // 返回用户首选项
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Preferences preferences = null;
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        // 查看用户登录状态
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
        } else {
            preferences = PreferencesService.getPreferencesByUserid(userid);
        }
        out.print(gson.toJson(preferences));
        out.close();
    }

    // 设置用户首选项
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int result = -2;
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        // 查看用户登录状态
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            result = -2;
        } else {
            String propertyName = request.getParameter("property-name");
            String propertyValue = request.getParameter("property-value");
            String propertyType = request.getParameter("property-type");
            if (propertyName != null && propertyValue != null && propertyType != null) {
                if (propertyType.equals("string")) {
                    result = PreferencesService.setPreferencesByUserid(userid, propertyName, propertyValue);
                } else {
                    boolean value = propertyValue.equals("true") || Integer.parseInt(propertyValue) == 1;
                    result = PreferencesService.setPreferencesByUserid(userid, propertyName, value);
                }
            }
        }
        JsonObject message = new JsonObject();
        message.addProperty("result", result);
        out.print(gson.toJson(message));
        out.close();
    }
}
