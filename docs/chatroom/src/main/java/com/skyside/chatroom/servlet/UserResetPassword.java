package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.skyside.chatroom.dao.MessageDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.service.FriendsService;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.Room;
import com.skyside.chatroom.vo.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;

@WebServlet("/user-reset-password")
public class UserResetPassword extends HttpServlet {
    private Gson gson = new Gson();

    // 提交重置密码的用户名, 返回该用户的好友列表和陌生人列表
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String username = request.getParameter("username");
        if (username != null) {
            UserDAO userDAO = new UserDAO();
            User user = userDAO.getUserByUsername(username);
            if (user != null) {
                int userId = user.getUserid();
                FriendsService friendsService = new FriendsService();
                ArrayList<User> friends = friendsService.getFriendsByUserid(userId);
                ArrayList<User> strangers = new ArrayList<>();
                HashSet<Integer> friendIds = new HashSet<>();
                HashSet<Integer> strangerIds = new HashSet<>();
                for (User friend : friends) {
                    friendIds.add(friend.getUserid());
                }
                for (User friend : friends) {
                    User userPrev = userDAO.getUserByUserid(friend.getUserid() - 1);
                    User userNext = userDAO.getUserByUserid(friend.getUserid() + 1);
                    if (userPrev != null) {
                        if (!friendIds.contains(userPrev.getUserid())) {
                            if (!strangerIds.contains(userPrev.getUserid())) {
                                strangerIds.add(userPrev.getUserid());
                                strangers.add(userPrev);
                            }
                        } else {
                            User userPrev2 = userDAO.getUserByUserid(userPrev.getUserid() - 1);
                            if (userPrev2 != null && !friendIds.contains(userPrev2.getUserid())) {
                                if (!strangerIds.contains(userPrev2.getUserid())) {
                                    strangerIds.add(userPrev2.getUserid());
                                    strangers.add(userPrev2);
                                }
                            }
                        }
                    }
                    if (userNext != null) {
                        if (!friendIds.contains(userNext.getUserid())) {
                            if (!strangerIds.contains(userNext.getUserid())) {
                                strangerIds.add(userNext.getUserid());
                                strangers.add(userNext);
                            }
                        } else {
                            User userNext2 = userDAO.getUserByUserid(userNext.getUserid() + 1);
                            if (userNext2 != null && !friendIds.contains(userNext2.getUserid())) {
                                if (!strangerIds.contains(userNext2.getUserid())) {
                                    strangerIds.add(userNext2.getUserid());
                                    strangers.add(userNext2);
                                }
                            }
                        }
                    }
                }
                Iterator<User> iterator = friends.iterator();
                while (iterator.hasNext()) {
                    User friend = iterator.next();
                    if (friend.getUserid() == userId) {
                        iterator.remove();
                    }
                }
                iterator = strangers.iterator();
                while (iterator.hasNext()) {
                    User stranger = iterator.next();
                    if (stranger.getUserid() == userId) {
                        iterator.remove();
                    }
                }
                HashMap<String, Object> data = new HashMap<>();
                data.put("friends", friends);
                data.put("strangers", strangers);
                data.put("username", username);
                data.put("user-id", userId);
                out.print(gson.toJson(data));
            }
        }
        out.close();
    }

    // 如果提交的 request-id 对应的请求在【有效时间段】内，则重置用户的密码
    // 【有效时间段】为 request 发起时间后的第 10 天和第 11 天之间
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String requestType = request.getParameter("request-type");
        if (requestType.equals("reset password")) {
            try {
                int senderId = Integer.parseInt(request.getParameter("sender-id"));
                int helperId = Integer.parseInt(request.getParameter("helper-id"));
                int requestId = Integer.parseInt(request.getParameter("request-id"));
                String requestToken = request.getParameter("request-token");
                int beginsAfter = Integer.parseInt(request.getParameter("activation-begins-after"));
                int expiresAfter = Integer.parseInt(request.getParameter("activation-expires-after"));
                UserDAO userDAO = new UserDAO();
                User sender = userDAO.getUserByUserid(senderId);
                User helper = userDAO.getUserByUserid(helperId);
                if (sender != null && helper != null) {
                    JsonObject messageData = new JsonObject();
                    messageData.addProperty("sender-id", senderId);
                    messageData.addProperty("sender-username", sender.getUsername());
                    messageData.addProperty("helper-id", helperId);
                    messageData.addProperty("helper-username", helper.getUsername());
                    messageData.addProperty("request-type", requestType);
                    messageData.addProperty("request-id", requestId);
                    messageData.addProperty("request-token", requestToken);
                    messageData.addProperty("send-time", System.currentTimeMillis());
                    messageData.addProperty("activation-begins-after", beginsAfter);
                    messageData.addProperty("activation-expires-after", expiresAfter);
                    // 获取好友房间
                    UserAndRoomDAO userAndRoomDAO = new UserAndRoomDAO();
                    Room room = userAndRoomDAO.getRoomByUserIdAndFriendId(senderId, helperId);
                    String messageText = gson.toJson(messageData);
                    Message message = new Message(0, senderId, sender.getUsername(),
                            "primary", "primary",
                            room.getRoomid(), new Timestamp(System.currentTimeMillis()),
                            messageText, requestType);
                    MessageDAO messageDAO = new MessageDAO();
                    if (messageDAO.InsertUserMessage(message) != null) {
                        out.println(messageText);
                    } else {
                        out.println("failed to send request");
                    }
                } else {
                    out.println("sender or helper not found");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            out.println("request type invalid");
        }
        out.close();
    }
}
