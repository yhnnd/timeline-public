package com.skyside.chatroom.util;

import java.util.ArrayList;
import java.util.List;

public class ListUtil {
    public static List removeDuplicates(List list) {
        List<Object> list2 = new ArrayList<>();
        for (Object s : list) {
            if (!list2.contains(s)) {
                list2.add(s);
            }
        }
        return list2;
    }
}