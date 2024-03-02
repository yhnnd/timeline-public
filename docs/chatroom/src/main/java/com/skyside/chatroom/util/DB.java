package com.skyside.chatroom.util;

import java.sql.*;

public class DB {
    private static boolean connected = true;
    private static String DBDRIVER = "com.mysql.cj.jdbc.Driver";
    private static String DBURL = "jdbc:mysql://localhost:3306/db?useUnicode=true&characterEncoding=UTF-8";
    private static String DBUSER = "root";
    private static String DBPASSWORD = "";
    private Connection connection = null;
    private ResultSet resultSet = null;
    private Statement statement = null;

    static {
        try {
            Class.forName(DBDRIVER);
            Connection conn = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
            conn.close();
        } catch (Exception e) {
            DBPASSWORD = "xuTong123+";
            try {
                Class.forName(DBDRIVER);
                Connection conn = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
                conn.close();
            } catch (Exception e2) {
                connected = false;
            }
        }
    }

    public DB() {
    }

    public PreparedStatement getPreparedStatement(String sql) {
        if (!connected) {
            return null;
        }
        PreparedStatement preparedStatement = null;
        try {
            Class.forName(DBDRIVER);
            connection = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
            preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return preparedStatement;
    }

    public ResultSet executeQuery(String sql) {
        if (!connected) {
            return null;
        }
        try {
            Class.forName(DBDRIVER);
            connection = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
            statement = connection.createStatement();
            resultSet = statement.executeQuery(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultSet;
    }

    public int executeUpdate(String sql) throws ClassNotFoundException, SQLException {
        if (!connected) {
            return -1;
        }
        Class.forName(DBDRIVER);
        connection = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
        statement = connection.createStatement();
        return statement.executeUpdate(sql);
    }

    public ResultSet executeUpdateGetKeys(String sql) throws ClassNotFoundException, SQLException {
        if (!connected) {
            return null;
        }
        Class.forName(DBDRIVER);
        connection = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
        statement = connection.createStatement();
        statement.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
        return statement.getGeneratedKeys();
    }

    public int executeUpdate(String sql, Object... params) {
        if (!connected) {
            return -1;
        }
        int result = -1;
        try {
            connection = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
            PreparedStatement statement = connection.prepareStatement(sql);
            if (params != null && params.length != 0) {
                for (int i = 0; i < params.length; i++) {
                    statement.setObject(i + 1, params[i]);
                }
            }
            result = statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public void close() {
        try {
            if (resultSet != null && !resultSet.isClosed()) {
                resultSet.close();
            }
            if (statement != null && !statement.isClosed()) {
                statement.close();
            }
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
