function search_user_by_userid(userid) {
    // 将加好友按钮改为不可用状态
    $("#search-user-confirm").removeClass("btn-outline-primary").attr("disabled",true);
    // 显示查找的用户 id
    $("#search-user-by").text(userid);
    var ResultsField = $("#search-user-results-field");
    // 清空结果显示区域
    $(ResultsField).empty();
    // 查询用户 id
    $.getJSON("searchuser",{
        "userid": userid
    },function (data) {
        if(data == null){
            // 没有查到结果
            $(ResultsField).append("<p class='h6 text-center text-muted'>no result</p>");
        }else {
            // 有查到结果
            $("#search-user-confirm")
                .removeAttr("disabled").addClass("btn-outline-primary");
            $(ResultsField)
                .append("<p class='h6 d-inline-block text-muted' style='width:50%;'>user id</p>")
                .append("<p class='h6 d-inline-block text-muted' style='width:50%;'>username</p>");
            var user = data;
            $(ResultsField)
                .append("<p class='h6 d-inline-block result-userid' style='width:50%;'>" + user.userid + "</p>")
                .append("<p class='h6 d-inline-block result-username' style='width:50%;'>" + user.username + "</p>");
        }
        search_user_results_collapse_show();
    });
}