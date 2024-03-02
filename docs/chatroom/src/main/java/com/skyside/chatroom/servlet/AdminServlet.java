package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.MessageDAO;
import com.skyside.chatroom.dao.RoomManagerDAO;
import com.skyside.chatroom.dao.UserAndRoomDAO;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.service.RoomManagerService;
import com.skyside.chatroom.service.RoomService;
import com.skyside.chatroom.vo.RoomManager;
import com.skyside.chatroom.vo.User;
import com.skyside.chatroom.vo.UserAndRoom;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/admin")
public class AdminServlet extends HttpServlet {
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
        String action = "";
        String attribute = request.getParameter("get");
        if (attribute != null) {
            action = "get";
        } else {
            attribute = request.getParameter("set");
            if (attribute != null) {
                action = "set";
            } else {
                attribute = request.getParameter("delete");
                if (attribute != null) {
                    action = "delete";
                } else {
                    attribute = "";
                }
            }
        }
        PrintWriter out = response.getWriter();
        switch (action.toLowerCase()) {
            case "get":
                switch (attribute) {
                    case "user":
                        String getBy = request.getParameter("by");
                        String want = request.getParameter("want");
                        if (getBy != null && getBy.equals("username")) {
                            String username = request.getParameter("username");
                            if (username != null) {
                                UserDAO userDAO = new UserDAO();
                                User user = userDAO.getUserByUsername(username);
                                if (user != null) {
                                    if (want != null && want.equals("id")) {
                                        out.println(user.getUserid());
                                    } else if (want != null && want.equals("password")) {
                                        out.println(user.getPassword());
                                    } else if (want != null && want.equals("gender")) {
                                        out.println(user.getGender());
                                    } else if (want != null && want.equals("role")) {
                                        out.println(user.getRole());
                                    } else if (want != null && want.equals("avatar")) {
                                        out.println(user.getAvatar());
                                    } else {
                                        out.println("<pre>\n" +
                                                "error: action get user want unknown.\n" +
                                                "please select one of these attributes:\n" +
                                                "1 id\n" +
                                                "2 username(unavailable)\n" +
                                                "3 password\n" +
                                                "4 gender\n" +
                                                "5 role\n" +
                                                "6 age(unavailable)\n" +
                                                "7 email(unavailable)\n" +
                                                "8 telephone(unavailable)\n" +
                                                "9 avatar\n" +
                                                "</pre>");
                                    }
                                } else {
                                    out.println("user does not exist.");
                                }
                            } else {
                                out.println("<pre>\n" +
                                        "error: action get user by username must give a username.\n" +
                                        "</pre>");
                            }
                        } else {
                            out.println("<pre>\n" +
                                    "error: action get user by unknown.\n" +
                                    "please select one of these attributes:\n" +
                                    "1 id(unavailable)\n" +
                                    "2 username\n" +
                                    "</pre>");
                        }
                        break;
                    case "online-count":
                        out.println(WebSocket.getOnlineCount());
                        break;
                    default:
                        out.println("<pre>\n" +
                                "error: action get attribute unknown.\n" +
                                "please select one of these attributes:\n" +
                                "1 user\n" +
                                "2 message\n" +
                                "3 message-style\n" +
                                "4 user-preferences\n" +
                                "5 user-advanced-settings\n" +
                                "6 room\n" +
                                "7 room-member\n" +
                                "8 room-admin\n" +
                                "9 card\n" +
                                "10 card-comment\n" +
                                "11 online-count\n" +
                                "</pre>");
                        break;
                }
                break;
            case "set":
                switch (attribute) {
                    case "user":
                        break;
                    case "message":
                        break;
                    case "message-style":
                        break;
                    case "user-preferences":
                        break;
                    case "user-advanced-settings":
                        break;
                    case "room":
                        break;
                    case "room-member": {
                        String type = request.getParameter("type");
                        if (type != null) {
                            switch (type) {
                                case "approve user join room request":
                                    int adminId = Integer.parseInt(request.getParameter("admin-id"));
                                    String sessionId = request.getParameter("session-id");
                                    int requestId = Integer.parseInt(request.getParameter("request-id"));
                                    if (WebSocket.getUserIdBySessionId(sessionId) == adminId) {
                                        UserAndRoom result = RoomService.ApproveUserJoinRoom(adminId, requestId);
                                        if (result != null) out.println("1");
                                        else out.println("0");
                                    } else {
                                        out.println("admin not logged in");
                                    }
                                    break;
                                default:
                                    out.println("set room-member unknown type");
                                    break;
                            }
                        } else {
                            out.println("<pre>set room-member type not given.\n" +
                                    "please choose one of these types:\n" +
                                    "1 approve user join room request\n" +
                                    "</pre>");
                        }
                    }
                    break;
                    case "room-admin": {
                        String type = request.getParameter("type");
                        if (type != null) {
                            switch (type) {
                                case "grant admin all privileges":
                                    String admin_id = request.getParameter("admin-id");
                                    String room_id = request.getParameter("room-id");
                                    if (admin_id != null && room_id != null) {
                                        int adminId = Integer.parseInt(admin_id);
                                        int roomId = Integer.parseInt(room_id);
                                        int result = -1;
                                        if ((new UserAndRoomDAO()).getUserAndRoomByUseridAndRoomid(adminId, roomId) != null) {
                                            RoomManager admin = RoomManagerService.getRoomManagerByRoomIdAndUserId(roomId, adminId);
                                            if (admin != null) {
                                                admin = new RoomManager(admin.getId(), roomId, adminId, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
                                                result = RoomManagerDAO.updateRoomManager(admin);
                                            } else {
                                                result = RoomManagerService.InsertRoomFounder(roomId, adminId);
                                            }
                                        }
                                        out.println(result);
                                    } else {
                                        out.println("admin-id or room-id not given.");
                                    }
                                    break;
                                default:
                                    out.println("set room-admin unknown type");
                                    break;
                            }
                        } else {
                            out.println("<pre>set room-admin type not given.\n" +
                                    "please choose one of these types:\n" +
                                    "1 grant admin all privileges\n" +
                                    "</pre>");
                        }
                    }
                    break;
                    case "card":
                        break;
                    case "card-comment":
                        break;
                    default:
                        out.println("<pre>\n" +
                                "error: action set attribute unknown.\n" +
                                "please select one of these attributes:\n" +
                                "1 user\n" +
                                "2 message\n" +
                                "3 message-style\n" +
                                "4 user-preferences\n" +
                                "5 user-advanced-settings\n" +
                                "6 room\n" +
                                "7 room-member\n" +
                                "8 room-admin\n" +
                                "9 card\n" +
                                "10 card-comment\n" +
                                "</pre>");
                        break;
                }
                break;
            case "delete":
                switch (attribute) {
                    case "user":
                        break;
                    case "message":
                        String selectBy = request.getParameter("select-by");
                        if (selectBy != null) {
                            if (selectBy.equals("id") || selectBy.equals("message-id")) {
                                String _id = request.getParameter("id");
                                if (_id != null) {
                                    int id = Integer.parseInt(_id);
                                    MessageDAO messageDAO = new MessageDAO();
                                    int result = messageDAO.deleteUserMessageById(id);
                                    out.println(result);
                                } else {
                                    out.println("error: delete message select-by id but id not given.");
                                }
                            } else {
                                out.println("error: delete message select-by unknown.");
                            }
                        } else {
                            out.println("error: delete message without select-by.");
                        }
                        break;
                    case "message-style":
                        break;
                    case "user-preferences":
                        break;
                    case "user-advanced-settings":
                        break;
                    case "room":
                        break;
                    case "room-member":
                        break;
                    case "room-admin":
                        break;
                    case "card":
                        break;
                    case "card-comment":
                        break;
                    default:
                        out.println("<pre>\n" +
                                "error: action delete attribute unknown.\n" +
                                "please select one of these attributes:\n" +
                                "1 user\n" +
                                "2 message\n" +
                                "3 message-style\n" +
                                "4 user-preferences\n" +
                                "5 user-advanced-settings\n" +
                                "6 room\n" +
                                "7 room-member\n" +
                                "8 room-admin\n" +
                                "9 card\n" +
                                "10 card-comment\n" +
                                "</pre>");
                        break;
                }
                break;
            default:
                out.println("<pre>\n" +
                        "error: action unknown.\n" +
                        "please select one of these actions:\n" +
                        "1 get\n" +
                        "2 set\n" +
                        "3 delete\n" +
                        "</pre>");
                break;
        }
        out.close();
    }
}