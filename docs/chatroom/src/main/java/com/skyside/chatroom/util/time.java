package com.skyside.chatroom.util;

public class time {
    private static final long millisPerDay = 86400000;

    public static long getCurrentTime() {
        return System.currentTimeMillis();
    }

    public static boolean isNDaysBefore(String beginTime, String endTime, int n) {
        long begin = Integer.parseInt(beginTime);
        long end = Integer.parseInt(endTime);
        return begin + n * millisPerDay < end;
    }

    public static long getMillisPerDay() {
        return millisPerDay;
    }
}
