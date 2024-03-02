package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.CardComment;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class CardCommentDAOImpl implements CardCommentDAO {
    @Override
    public int addCardComment(CardComment cardComment) {
        DB db = new DB();
        String sql = "insert into card_comment" +
                "(user_id,card_id,text,type,target,target_id,create_time,is_timed,life_millis) " +
                "values(?,?,?,?,?,?,?,?,?)";
        PreparedStatement preparedStatement = db.getPreparedStatement(sql);
        int id = 0;
        try {
            preparedStatement.setInt(1, cardComment.getUserId());
            preparedStatement.setInt(2, cardComment.getCardId());
            preparedStatement.setString(3, cardComment.getText());
            preparedStatement.setString(4, cardComment.getType());
            preparedStatement.setString(5, cardComment.getTarget());
            preparedStatement.setInt(6, cardComment.getTargetId());
            preparedStatement.setString(7, String.valueOf(cardComment.getCreateTime()));
            preparedStatement.setBoolean(8, cardComment.isTimed());
            preparedStatement.setString(9, String.valueOf(cardComment.getLifeMillis()));
            preparedStatement.executeUpdate();
            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                id = resultSet.getInt(1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return id;
    }

    @Override
    public int removeCardCommentByCardId(int cardId) {
        DB db = new DB();
        String sql = "delete from card_comment where card_id = ?";
        PreparedStatement preparedStatement = db.getPreparedStatement(sql);
        int result = 0;
        try {
            preparedStatement.setInt(1, cardId);
            result = preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return result;
    }

    @Override
    public int removeCardCommentById(int id) {
        DB db = new DB();
        String sql = "delete from card_comment where id = ?";
        PreparedStatement preparedStatement = db.getPreparedStatement(sql);
        int result = 0;
        try {
            preparedStatement.setInt(1, id);
            result = preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return result;
    }

    @Override
    public ArrayList<CardComment> getCardCommentByCardId(int cardId) {
        DB db = new DB();
        ArrayList<CardComment> cardComments = new ArrayList<>();
        String sql = "select * from card_comment where card_id = ?";
        PreparedStatement preparedStatement = db.getPreparedStatement(sql);
        ResultSet resultSet = null;
        try {
            preparedStatement.setInt(1, cardId);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int user_id = resultSet.getInt("user_id");
                int card_id = resultSet.getInt("card_id");
                String text = resultSet.getString("text");
                String type = resultSet.getString("type");
                String target = resultSet.getString("target");
                int target_id = resultSet.getInt("target_id");
                long create_time = Long.parseLong(resultSet.getString("create_time"));
                boolean is_timed = resultSet.getBoolean("is_timed");
                long life_millis = Long.parseLong(resultSet.getString("life_millis"));
                CardComment cardComment = new CardComment(id, user_id, card_id, text, type, target, target_id, create_time, is_timed, life_millis);
                cardComments.add(cardComment);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return cardComments;
    }

    @Override
    public CardComment getCardCommentById(int Id) {
        DB db = new DB();
        String sql = "select * from card_comment where id = ?";
        PreparedStatement preparedStatement = db.getPreparedStatement(sql);
        ResultSet resultSet = null;
        CardComment cardComment = null;
        try {
            preparedStatement.setInt(1, Id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                int id = resultSet.getInt("id");
                int user_id = resultSet.getInt("user_id");
                int card_id = resultSet.getInt("card_id");
                String text = resultSet.getString("text");
                String type = resultSet.getString("type");
                String target = resultSet.getString("target");
                int target_id = resultSet.getInt("target_id");
                long create_time = Long.parseLong(resultSet.getString("create_time"));
                boolean is_timed = resultSet.getBoolean("is_timed");
                long life_millis = Long.parseLong(resultSet.getString("life_millis"));
                cardComment = new CardComment(id, user_id, card_id, text, type, target, target_id, create_time, is_timed, life_millis);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            db.close();
        }
        return cardComment;
    }
}
