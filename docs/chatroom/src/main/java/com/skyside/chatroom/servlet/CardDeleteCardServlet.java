package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.CardDAO;
import com.skyside.chatroom.vo.Card;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

// 功能：收到 card-id，删除对应卡片
@WebServlet("/delete-card")
public class CardDeleteCardServlet extends HttpServlet {
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
        } else {
            // 获取卡片 id
            int cardId = Integer.parseInt(request.getParameter("card-id"));
            // 初始化系统消息
            JsonObject message = new JsonObject();
            CardDAO cardDAO = new CardDAO();
            if (cardDAO.getCardByCardId(cardId).getUserid() == userid) {
                // 如果用户是卡片的作者，删除卡片
                int result = CardDAO.deleteCardByCardId(cardId);
                message.addProperty("result", result);
            } else {
                // 用户无权删除卡片
                message.addProperty("result", -1);
                message.addProperty("message", "action unauthorized");
            }
            out.print(gson.toJson(message));
        }
        out.close();
    }
}
