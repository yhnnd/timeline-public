function search_room_by_name(name) {
    // 将加入房间按钮改为不可用状态
    $("#search-room-confirm").removeClass("btn-outline-primary").attr("disabled",true);
    // 显示查找的房间名
    $("#search-room-by").text(name);
    var ResultsField = $("#search-room-results-field");
    // 清空结果显示区域
    $(ResultsField).empty();
    // 查询房间名
    $.getJSON("searchroom",{
        "name": name
    },function (data) {
        if(data.length == 0){
            // 没有查到结果
            $(ResultsField).append("<p class='h6 text-center text-muted'>no result</p>");
        }else {
            // 有查到结果
            $("#search-room-confirm")
                .removeAttr("disabled").addClass("btn-outline-primary");
            $(ResultsField)
                .append("<p class='h6 d-inline-block text-muted' style='width:50%;'>room id</p>")
                .append("<p class='h6 d-inline-block text-muted' style='width:50%;'>room type</p>");
            // 遍历房间数组
            for (i = 0; i < data.length; ++i) {
                var room = data[i];
                $(ResultsField)
                    .append("<p class='h6 d-inline-block room-id' style='width:50%;'>" + room.roomid + "</p>")
                    .append("<p class='h6 d-inline-block room-type' style='width:50%;'>" + room.type + "</p>");
            }
        }
        search_room_results_collapse_show();
    });
}