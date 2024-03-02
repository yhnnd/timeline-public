package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.skyside.chatroom.service.RoomManagerService;
import com.skyside.chatroom.vo.RoomManager;

import javax.json.Json;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能
// 收到 userId，roomId，roomUserId
// 返回 roomUser 的管理员权限
// 如果 roomUser 不是管理员，返回空

@WebServlet("/room-manager")
public class RoomManagerServlet extends HttpServlet {
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
        // 查看用户登录状态
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            out.println("not logged in");
        } else {
            // 获取待查询的房间
            int roomid = Integer.parseInt(request.getParameter("room-id"));
            // 获取待查询的用户
            int roomUserId = Integer.parseInt(request.getParameter("room-user-id"));
            // 获取管理员权限
            RoomManager roomManager = RoomManagerService.getRoomManagerByRoomIdAndUserId(roomid, roomUserId);
            // 获取操作
            String action = request.getParameter("action");

            switch (action) {
                case "get": {
                    // 返回待查询用户的管理员权限（如果不是管理员，返回空）
                    out.print(gson.toJson(roomManager));
                }
                break;
                case "add": {
                    // 添加管理员
                    if (roomManager == null) {
                        RoomManagerService.InsertRoomManager(roomid, roomUserId);
                        roomManager = RoomManagerService.getRoomManagerByRoomIdAndUserId(roomid, roomUserId);
                    }
                    out.print(gson.toJson(roomManager));
                }
                break;
                case "remove": {
                    // 删除管理员
                    int result = RoomManagerService.deleteRoomManager(userid, roomid, roomUserId);
                    JsonObject jsonObject = new JsonObject();
                    jsonObject.addProperty("result", result);
                    out.print(gson.toJson(jsonObject));
                }
                break;
                case "set": {
                    // 设置管理员权限
                    String privilegeName = request.getParameter("privilege-name");
                    String privilegeValue = request.getParameter("privilege-value");
                    String privilegeValueType = request.getParameter("privilege-value-type");
                    int result = 0;
                    if (privilegeName != null && roomManager != null) {
                        String json = gson.toJson(roomManager);// 将管理员变成 JSON 字符串
                        JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();// 将 JSON 字符串变成 JSON 对象
                        jsonObject.remove(privilegeName);// 删除原属性
                        switch (privilegeValueType.toLowerCase()) {
                            case "string":
                                jsonObject.addProperty(privilegeName, privilegeValue);
                                break;
                            case "bool":
                            case "boolean":
                                jsonObject.addProperty(privilegeName, Boolean.parseBoolean(privilegeValue));
                                break;
                            case "int":
                            case "integer":
                                jsonObject.addProperty(privilegeName, Integer.parseInt(privilegeValue));
                                break;
                        }
                        RoomManager newRoomManager = gson.fromJson(jsonObject, RoomManager.class);// 将 JSON 字符串变成管理员
                        result = RoomManagerService.updateRoomManager(userid, roomManager, newRoomManager);// 更新管理员权限
                    }
                    JsonObject message = new JsonObject();
                    message.addProperty("result", result);
                    out.print(gson.toJson(message));
                }
                break;
            }
        }
        out.close();
    }
}
