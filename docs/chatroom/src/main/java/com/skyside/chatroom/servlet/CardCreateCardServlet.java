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
import java.sql.Timestamp;

// 功能：收到卡片数据，将卡片存入数据库
@WebServlet("/create/card")
public class CardCreateCardServlet extends HttpServlet {
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
        systemMessage.addProperty("type", "create card");
        systemMessage.addProperty("badge-class", "default");
        systemMessage.addProperty("text-class", "muted");
        // 查看用户登录状态
        if (sessionid == null || userid != WebSocket.getUserIdBySessionId(sessionid)) {
            // 用户登录状态异常
            systemMessage.addProperty("message", "please log in first");
        } else {
            // 获取用户发送的卡片数据
            String cardClass = request.getParameter("card-class");
            String cardType = request.getParameter("card-type");
            String cardTitle = request.getParameter("card-title");
            String cardBlockText = request.getParameter("card-block-text");
            String cardBlockTextFull = request.getParameter("card-block-text-full");
            String cardFooter = request.getParameter("card-footer-text");
            String imageType = request.getParameter("cover-image-type");
            String avatarType = request.getParameter("avatar-type");
            String createTime = request.getParameter("create-time");
            // 特殊字符转义
            cardTitle = cardTitle.replace("'", "\\'");
            cardBlockText = cardBlockText.replace("'", "\\'");
            cardBlockTextFull = cardBlockTextFull.replace("'", "\\'");
            cardFooter = cardFooter.replace("'", "\\'");
            // 生成图片文件名
            String image = (imageType == null || imageType == "") ? "" : "card-image-" + userid + "-" + createTime + "." + imageType;
            String avatar = (avatarType == null || avatarType == "") ? "" : "card-avatar-" + userid + "-" + createTime + "." + avatarType;
            // 生成卡片对象
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            Card card = new Card(0, userid, cardClass, cardType, cardTitle, cardBlockText, cardBlockTextFull, cardFooter, image, avatar, timestamp);
            // 将卡片存入数据库
            CardDAO cardDAO = new CardDAO();
            card = cardDAO.InsertCard(card);
            if (card.getId() != 0) {
                // 卡片成功存入数据库
                systemMessage.addProperty("badge-class", "primary");
                systemMessage.addProperty("text-class", "primary");
                systemMessage.addProperty("message", "card uploaded");
                systemMessage.addProperty("card-id", card.getId());
                systemMessage.addProperty("cover-image", card.getImage());
                systemMessage.addProperty("avatar", card.getAvatar());
            } else {
                // 卡片无法存入数据库
                systemMessage.addProperty("message", "error uploading card");
            }
        }
        // 输出系统消息
        out.print(gson.toJson(systemMessage));
        out.close();
    }
}
