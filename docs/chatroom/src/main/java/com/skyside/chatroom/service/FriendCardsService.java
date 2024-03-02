package com.skyside.chatroom.service;

import com.google.gson.Gson;
import com.skyside.chatroom.dao.CardDAO;
import com.skyside.chatroom.vo.Card;
import com.skyside.chatroom.vo.User;

import java.util.ArrayList;

public class FriendCardsService {
    private Gson gson = new Gson();

    // 返回所有好友卡片
    public ArrayList<Card> getFriendCardsByUserid(int userid){
        CardDAO cardDAO = new CardDAO();
        // 初始化【所有好友卡片数组】
        ArrayList<Card> cards = new ArrayList<Card>();
        // 获取所有好友
        FriendsService friendsService = new FriendsService();
        ArrayList<User> friendArrayList = friendsService.getFriendsByUserid(userid);
        // 遍历好友数组
        for(User friend : friendArrayList) {
            if(friend.getUserid()!=userid) {
                // 获取好友卡片
                ArrayList<Card> friendCards = cardDAO.getCardsByUserid(friend.getUserid());
                // 将好友卡片添加到【所有好友卡片数组】
                for (Card card : friendCards) {
                    if(card.getIsPrivate()==false) {
                        cards.add(card);
                    }
                }
            }
        }
        return cards;
    }
}
