package com.skyside.chatroom.dao;

import com.skyside.chatroom.util.DB;
import com.skyside.chatroom.vo.Card;

import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;

public class CardDAO {
    public Card getCardByCardId(int id) {
        DB db = new DB();
        Card card = null;
        String sql = "select * from card where id = " + id;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            if (resultSet.next()) {
                int userid = resultSet.getInt("userid");
                String cardClass = resultSet.getString("cardClass");
                String cardType = resultSet.getString("cardType");
                String cardTitle = resultSet.getString("cardTitle");
                String cardBlockText = resultSet.getString("cardBlockText");
                String cardBlockTextFull = resultSet.getString("cardBlockTextFull");
                String cardFooterText = resultSet.getString("cardFooterText");
                String image = resultSet.getString("imageType");
                String avatar = resultSet.getString("avatarType");
                Timestamp createTime = resultSet.getTimestamp("createTime");
                card = new Card(id, userid, cardClass, cardType, cardTitle, cardBlockText, cardBlockTextFull, cardFooterText, image, avatar, createTime);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return card;
    }

    public ArrayList<Card> getCardsByUserid(int userid) {
        DB db = new DB();
        ArrayList<Card> cards = new ArrayList<Card>();
        String sql = "select * from card where userid = " + userid;
        try {
            ResultSet resultSet = db.executeQuery(sql);
            while (resultSet.next()) {
                int id = resultSet.getInt(1);
                String cardClass = resultSet.getString("cardClass");
                String cardType = resultSet.getString("cardType");
                String cardTitle = resultSet.getString("cardTitle");
                String cardBlockText = resultSet.getString("cardBlockText");
                String cardBlockTextFull = resultSet.getString("cardBlockTextFull");
                String cardFooterText = resultSet.getString("cardFooterText");
                String image = resultSet.getString("imageType");
                String avatar = resultSet.getString("avatarType");
                Timestamp createTime = resultSet.getTimestamp("createTime");
                cards.add(new Card(id, userid, cardClass, cardType, cardTitle, cardBlockText, cardBlockTextFull, cardFooterText, image, avatar, createTime));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cards;
    }

    public Card InsertCard(Card card) {
        DB db = new DB();
        String sql = "insert card(userid,cardClass,cardType,cardTitle,cardBlockText,cardBlockTextFull,cardFooterText,imageType,avatarType,createTime)"
                + " values(" + card.getUserid() + ",'" + card.getCardClass() + "','" + card.getCardType() + "','" + card.getCardTitle()
                + "','" + card.getCardBlockText() + "','" + card.getCardBlockTextFull() + "','" + card.getCardFooterText()
                + "','" + card.getImage() + "','" + card.getAvatar() + "','" + card.getCreateTime() + "')";
        try {
            ResultSet resultSet = db.executeUpdateGetKeys(sql);
            if (resultSet.next()) {
                card = getCardByCardId(resultSet.getInt(1));
            }
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return card;
    }

    public static int deleteCardByCardId(int id) {
        DB db = new DB();
        String sql = "delete from card where id = " + id;
        int result = 0;
        try {
            result = db.executeUpdate(sql);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
