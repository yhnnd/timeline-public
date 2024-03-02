package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.Message;
import com.skyside.chatroom.vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@WebServlet("/signup")
public class UserSignupServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            int age = Integer.parseInt(request.getParameter("age"));
            String gender = request.getParameter("gender");
            String email = request.getParameter("email");
            String type = request.getParameter("type");
            if (type.equalsIgnoreCase("signup")) {
                if (!username.equals("") && !password.equals("")) {
                    UserDAO userDAO = new UserDAO();
                    User user = userDAO.getUserByUsername(username);
                    if (user != null) {
                        // 该用户名已经被注册
                        Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()),
                                "username not available. signup failed", "text");
                        out.print(gson.toJson(systemMessage));
                    } else {
                        int result = userDAO.InsertUser(username, password, age, gender, email);
                        if (result == 0) {
                            Message systemMessage = new Message(0, 0, "system", "danger", "danger", 0, new Timestamp(System.currentTimeMillis()),
                                    "signup error", "text");
                            out.print(gson.toJson(systemMessage));
                        } else {
                            Message systemMessage = new Message(0, 0, "system", "success", "success", 0, new Timestamp(System.currentTimeMillis()),
                                    "signup success", "text");
                            out.print(gson.toJson(systemMessage));
                        }
                    }
                } else {
                    Message systemMessage = new Message(0, 0, "system", "success", "success", 0, new Timestamp(System.currentTimeMillis()),
                            "username and password cannot be empty. signup failed", "text");
                    out.print(gson.toJson(systemMessage));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
