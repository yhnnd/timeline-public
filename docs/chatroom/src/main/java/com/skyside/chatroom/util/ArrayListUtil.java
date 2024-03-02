package com.skyside.chatroom.util;

import java.util.ArrayList;
import java.util.List;

public class ArrayListUtil {
    public static ArrayList removeDuplicates(List list) {
        ArrayList<Object> list2 = new ArrayList<>();
        for (Object s : list) {
            if (!list2.contains(s)) {
                list2.add(s);
            }
        }
        return list2;
    }
}
