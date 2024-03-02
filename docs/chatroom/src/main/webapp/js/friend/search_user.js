function search_user_results_collapse_show() {
    $("#search-user-results-collapse-show").removeClass("text-primary").addClass("text-muted");
    $("#search-user-results-collapse-hide").removeClass("text-white").addClass("text-primary");
    $("#search-user-results-collapse").collapse("show");
}

function search_user_results_collapse_hide() {
    $("#search-user-results-collapse-hide").removeClass("text-primary").addClass("text-muted");
    $("#search-user-results-collapse-show").removeClass("text-white").addClass("text-primary");
    $("#search-user-results-collapse").collapse("hide");
}

function search_user(callback) {
    if(!sessionStorage.getItem("user-id")){
        appendModal("bg-danger text-white","text-danger","Warning","please log in first");
        return;
    }
    // 设置弹窗内容
    var ModalBody =
        "<div class='row'>" +
        "   <div class='col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>" +
        "       <ul class='nav nav-tabs'>" +
        "           <li class='nav-item'>" +
        "               <a class='nav-link active' data-toggle='tab' href='#search-user-by-username' data-chinese='用户名'>Username</a>" +
        "           </li>" +
        "           <li class='nav-item'>" +
        "               <a class='nav-link' data-toggle='tab' href='#search-user-by-userid' data-chinese='用户 ID'>User ID</a>" +
        "           </li>" +
        "       </ul>" +
        "       <div class='tab-content'>" +
        "           <div class='tab-pane active' id='search-user-by-username'>" +
        "               <div class='input-group'>" +
        "                   <input class='form-control' type='text' id='username-to-search'>" +
        "                   <span class='input-group-btn'>" +
        "                       <button type='button' class='btn btn-primary' onclick='search_user_by_username($(this).parent().siblings(\"input\").val())' data-chinese='搜索'>" +
        "                           Search" +
        "                       </button>" +
        "                   </span>" +
        "               </div>" +
        "           </div>" +
        "           <div class='tab-pane' id='search-user-by-userid'>" +
        "               <div class='input-group'>" +
        "                   <input class='form-control' type='number' id='userid-to-search'>" +
        "                   <span class='input-group-btn'>" +
        "                       <button type='button' class='btn btn-primary' onclick='search_user_by_userid($(this).parent().siblings(\"input\").val())' data-chinese='搜索'>" +
        "                           Search" +
        "                       </button>" +
        "                   </span>" +
        "               </div>" +
        "           </div>" +
        "       </div>" +
        "       <div class='text-center text-primary' id='search-user-results-collapse-show' onclick='search_user_results_collapse_show()'>" +
        "           <i class='fa fa-caret-down fa-2'></i>" +
        "       </div>" +
        "       <div class='collapse' id='search-user-results-collapse' style='padding: 0 1em;'>" +
        "           <p class='h6'>" +
        "               <span>search for</span>" +
        "               <u class='text-gray-dark font-weight-normal' id='search-user-by'></u>" +
        "           </p>" +
        "           <div id='search-user-results-field'>" +
        "           </div>" +
        "           <div class='text-center text-primary' id='search-user-results-collapse-hide' onclick='search_user_results_collapse_hide()'>" +
        "               <i class='fa fa-caret-up fa-2'></i>" +
        "           </div>" +
        "       </div>" +
        "       <div class='btn-group text-center' style='width:100%;'>" +
        "           <button class='btn' disabled style='width:50%;padding: .4rem 1rem;' id='search-user-confirm' data-chinese='确定'> confirm </button>" +
        "           <button class='btn btn-outline-danger' style='width:50%;padding: .4rem 1rem;' data-dismiss='modal' data-chinese='取消'> cancel </button>" +
        "       </div>" +
        "   </div>" +
        "</div>";
    // 生成弹窗
    appendModal("bg-primary text-white","text-primary","Search User",ModalBody,"",false);
    change_system_language(localStorage.getItem("application-language"));
    $("#search-user-confirm").on("click",callback);
}

function search_user_callback() {
    if($("#search-user-confirm").hasClass("btn-outline-primary")===false){
        return;
    }
    var userid = sessionStorage.getItem("user-id");
    if($("#search-user-by-username").hasClass("active")){
        var ResultUserid = $("#search-user-results-field .result-userid");
        if(ResultUserid.length > 0) {
            var FriendID = parseInt(ResultUserid.text());
            add_friend(userid, FriendID);
        }
    }else if($("#search-user-by-userid").hasClass("active")){
        var InputUserid = $("#userid-to-search");
        var ResultUsername = $("#search-user-results-field .result-username");
        if(ResultUsername.length > 0){
            var FriendID = InputUserid.val();
            add_friend(userid, FriendID);
        }
    }
}