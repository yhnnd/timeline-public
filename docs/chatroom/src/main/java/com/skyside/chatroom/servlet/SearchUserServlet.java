package com.skyside.chatroom.servlet;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.UserDAO;
import com.skyside.chatroom.vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 功能：收到 username 或 userid，返回用户数据
@WebServlet("/searchuser")
public class SearchUserServlet extends HttpServlet {
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
        UserDAO userDAO = new UserDAO();
        String username = request.getParameter("username");
        if(username!=null) {
            User user = userDAO.getUserByUsername(username);
            out.print(gson.toJson(user));
        }else{
            int userid = Integer.parseInt(request.getParameter("userid"));
            User user = userDAO.getUserByUserid(userid);
            out.print(gson.toJson(user));
        }
        out.close();
    }
}
