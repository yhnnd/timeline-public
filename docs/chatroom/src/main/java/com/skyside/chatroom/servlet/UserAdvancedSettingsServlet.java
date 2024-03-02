package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.service.AdvancedSettingsService;
import com.skyside.chatroom.vo.UserAdvancedSettings;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 用户高级设置
@WebServlet("/advanced")
public class UserAdvancedSettingsServlet extends HttpServlet {
    private Gson gson = new Gson();

    // 功能：获取用户高级设置数据
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        // 查看用户登录状态
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
        } else {
            // 获取用户高级设置
            UserAdvancedSettings userAdvancedSettings = AdvancedSettingsService.getAdvancedSettingsByUserid(userid);
            JsonObject data = new JsonObject();
            if (userAdvancedSettings != null) {
                data.addProperty("allow-multiple-online-devices", userAdvancedSettings.isMultipleOnline());
                data.addProperty("allow-compulsory-disconnect", userAdvancedSettings.isCompulsoryDisconnect());
            } else {
                data.addProperty("allow-multiple-online-devices", 1);
                data.addProperty("allow-compulsory-disconnect", 1);
            }
            // 输出用户高级设置对象
            out.print(gson.toJson(data));
        }
        out.close();
    }

    // 功能：更新用户高级设置
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的身份数据
        int userid = Integer.parseInt(request.getParameter("user-id"));
        String sessionid = request.getParameter("session-id");
        // 查看用户登录状态
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
        } else {
            String valueName = "";
            int result = 0;
            // 设置是否允许同时在线
            String strAllowMultipleOnlineDevices = request.getParameter("allow-multiple-online-devices");
            if (strAllowMultipleOnlineDevices != null) {
                int AllowMultipleOnlineDevices = Integer.parseInt(strAllowMultipleOnlineDevices);
                if (AllowMultipleOnlineDevices == 1 || AllowMultipleOnlineDevices == 0) {
                    valueName = "MultipleOnlineDevices = " + AllowMultipleOnlineDevices;
                    result = AdvancedSettingsService.setAdvancedSettingsByUserid(userid, "multipleOnline", strAllowMultipleOnlineDevices);
                }
            }
            // 设置是否允许强制下线
            String strAllowCompulsoryDisconnect = request.getParameter("allow-compulsory-disconnect");
            if (strAllowCompulsoryDisconnect != null) {
                int AllowCompulsoryDisconnect = Integer.parseInt(strAllowCompulsoryDisconnect);
                if (AllowCompulsoryDisconnect == 1 || AllowCompulsoryDisconnect == 0) {
                    valueName = "CompulsoryDisconnect = " + AllowCompulsoryDisconnect;
                    result = AdvancedSettingsService.setAdvancedSettingsByUserid(userid, "compulsoryDisconnect", strAllowCompulsoryDisconnect);
                }
            }
            // 初始化返回消息
            JsonObject data = new JsonObject();
            if (result == 0) {
                data.addProperty("message", "not applied");
            } else if (result == -1) {
                data.addProperty("message", "user not found");
            } else {
                data.addProperty("message", valueName + " applied");
            }
            out.print(gson.toJson(data));
        }
        out.close();
    }
}
