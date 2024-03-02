package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.service.WithdrawMessageService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能：收到 message id，删除消息
@WebServlet("/withdraw-message")
public class RecallMessageServlet extends HttpServlet {
    private Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            doPost(request, response);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        // 获取用户发送的数据
        String userid_str = request.getParameter("user-id");
        String session_id = request.getParameter("session-id");
        String message_id_str = request.getParameter("message-id");
        // 检查用户发送的数据是否合法
        if(userid_str != null && message_id_str != null) {
            int userid = Integer.parseInt(userid_str);
            int message_id = Integer.parseInt(message_id_str);
            // 撤回消息
            WithdrawMessageService withdrawMessageService = new WithdrawMessageService();
            JsonObject systemMessage = withdrawMessageService.WithdrawMessage(userid,session_id,message_id);
            systemMessage.addProperty("send-time",System.currentTimeMillis());
            // 输出执行结果
            out.print(systemMessage);
        }
        out.close();
    }
}
