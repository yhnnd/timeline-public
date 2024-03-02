package com.skyside.chatroom.dao;

import com.skyside.chatroom.vo.CardComment;

import java.util.ArrayList;

public interface CardCommentDAO {
    int removeCardCommentByCardId(int cardId);
    int removeCardCommentById(int id);
    ArrayList getCardCommentByCardId(int cardId);
    CardComment getCardCommentById(int id);
    int addCardComment(CardComment cardComment);
}
