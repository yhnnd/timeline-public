package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.service.FriendCardsService;
import com.skyside.chatroom.vo.Card;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

// 功能：收到 userid，返回好友的所有卡片
@WebServlet("/friend-cards")
public class FriendCardsServlet extends HttpServlet{
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
        if(sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
        } else {
            FriendCardsService friendCardsService = new FriendCardsService();
            ArrayList<Card> cards = friendCardsService.getFriendCardsByUserid(userid);
            out.print(gson.toJson(cards));
        }
        out.close();
    }
}
