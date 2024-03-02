function search_room_by_roomid(roomid) {
    // 将加入房间按钮改为不可用状态
    $("#search-room-confirm").removeClass("btn-outline-primary").attr("disabled",true);
    // 显示查找的房间 id
    $("#search-room-by").text(roomid);
    var ResultsField = $("#search-room-results-field");
    // 清空结果显示区域
    $(ResultsField).empty();
    // 查询房间 id
    $.getJSON("searchroom",{
        "room-id": roomid
    },function (data) {
        if(data == null){// 没有查到结果
            $(ResultsField).append("<p class='h6 text-center text-muted'>no result</p>");
        }else {// 有查到结果
            $("#search-room-confirm")
                .removeAttr("disabled").addClass("btn-outline-primary");
            $(ResultsField)
                .append("<p class='h6 d-inline-block text-muted' style='width:50%;'>room name</p>")
                .append("<p class='h6 d-inline-block text-muted' style='width:50%;'>room type</p>");
            $(ResultsField)
                .append("<p class='h6 d-inline-block room-name' style='width:50%;'>" + data.name + "</p>")
                .append("<p class='h6 d-inline-block room-type' style='width:50%;'>" + data.type + "</p>");
        }
        search_room_results_collapse_show();
    });
}