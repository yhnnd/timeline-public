package com.skyside.chatroom.service;

import com.skyside.chatroom.dao.MessageStyleDAO;
import com.skyside.chatroom.vo.MessageStyle;

public class MessageStyleService {
    private static MessageStyleDAO messageStyleDAO = new MessageStyleDAO();

    public static int setMessageStyle(MessageStyle messageStyle) {
        MessageStyle messageStyle1 = messageStyleDAO.getMessageStyleByUserid(messageStyle.getUserid());
        if (messageStyle1 == null) {
            return messageStyleDAO.insertMessageStyle(messageStyle);
        } else {
            messageStyle.setId(messageStyle1.getId());
            return messageStyleDAO.updateMessageStyle(messageStyle);
        }
    }

    public static MessageStyle getMessageStyle(int userId) {
        return messageStyleDAO.getMessageStyleByUserid(userId);
    }

    public static int deleteMessageStyle(int userId) {
        return messageStyleDAO.deleteMessageStyleByUserid(userId);
    }
}
