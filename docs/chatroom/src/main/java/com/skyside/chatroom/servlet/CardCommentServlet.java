package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.service.CardCommentService;
import com.skyside.chatroom.util.time;
import com.skyside.chatroom.vo.CardComment;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet("/card-comment")
public class CardCommentServlet extends HttpServlet {
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
        String userid = request.getParameter("user-id");
        String sessionId = request.getParameter("session-id");
        if (userid != null && sessionId != null) {
            int userId = Integer.parseInt(userid);
            if (WebSocket.getUserIdBySessionId(sessionId) == userId) {
                CardCommentService cardCommentService = new CardCommentService();
                String action = request.getParameter("action");
                switch (action) {
                    case "get-by-card-id": {
                        String cardid = request.getParameter("card-id");
                        int cardId = Integer.parseInt(cardid);
                        ArrayList cardComments = cardCommentService.getCardCommentsByCardId(cardId);
                        out.println(gson.toJson(cardComments));
                    }
                    break;
                    case "get-by-id": {
                        String commentid = request.getParameter("comment-id");
                        int commentId = Integer.parseInt(commentid);
                        CardComment cardComment = cardCommentService.getCardCommentById(commentId);
                        out.println(gson.toJson(cardComment));
                    }
                    break;
                    case "add": {
                        int user_id = Integer.parseInt(request.getParameter("user-id"));
                        int card_id = Integer.parseInt(request.getParameter("card-id"));
                        String text = request.getParameter("text");
                        if (text.length() == 0) {
                            out.println("text is empty");
                        } else if (text.length() > 255) {
                            out.println("text too long");
                        } else {
                            String type = request.getParameter("type");
                            String target = request.getParameter("target");
                            int target_id = Integer.parseInt(request.getParameter("target-id"));
                            long create_time = time.getCurrentTime();
                            boolean is_timed = Boolean.parseBoolean(request.getParameter("is-timed"));
                            long life_days = 0;
                            if (is_timed) {
                                life_days = Long.parseLong(request.getParameter("life-days"));
                            }
                            long life_millis = life_days * time.getMillisPerDay();
                            CardComment cardComment = new CardComment(0, user_id, card_id, text, type, target, target_id, create_time, is_timed, life_millis);
                            int id = cardCommentService.addCardComment(cardComment);
                            cardComment = cardCommentService.getCardCommentById(id);
                            out.println(gson.toJson(cardComment));
                        }
                    }
                    break;
                    case "remove-by-card-id": {
                        int cardId = Integer.parseInt(request.getParameter("card-id"));
                        int result = cardCommentService.removeCardCommentByCardId(cardId);
                        JsonObject jsonObject = new JsonObject();
                        jsonObject.addProperty("result", result);
                        out.println(gson.toJson(jsonObject));
                    }
                    break;
                    case "remove-by-id": {
                        int commentId = Integer.parseInt(request.getParameter("comment-id"));
                        int result = cardCommentService.removeCardCommentById(commentId);
                        JsonObject jsonObject = new JsonObject();
                        jsonObject.addProperty("result", result);
                        out.println(gson.toJson(jsonObject));
                    }
                    break;
                    default:
                        out.println("unknown request '" + action + "'");
                }
            } else {
                out.println("login failed.");
            }
        } else {
            out.println("user-id and session-id required.");
        }
        out.close();
    }
}
