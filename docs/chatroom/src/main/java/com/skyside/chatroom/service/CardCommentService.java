package com.skyside.chatroom.service;

import com.skyside.chatroom.dao.CardCommentDAOImpl;
import com.skyside.chatroom.vo.CardComment;

import java.util.ArrayList;

public class CardCommentService {
    static CardCommentDAOImpl cardCommentDAO = new CardCommentDAOImpl();

    public int removeCardCommentByCardId(int cardId) {
        return cardCommentDAO.removeCardCommentByCardId(cardId);
    }

    public int removeCardCommentById(int id) {
        return cardCommentDAO.removeCardCommentById(id);
    }

    public ArrayList getCardCommentsByCardId(int cardId) {
        return cardCommentDAO.getCardCommentByCardId(cardId);
    }

    public CardComment getCardCommentById(int id) {
        return cardCommentDAO.getCardCommentById(id);
    }

    public int addCardComment(CardComment cardComment) {
        return cardCommentDAO.addCardComment(cardComment);
    }
}
