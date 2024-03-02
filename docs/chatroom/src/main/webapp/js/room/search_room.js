function search_room_results_collapse_show() {
    $("#search-room-results-collapse-show").removeClass("text-primary").addClass("text-muted");
    $("#search-room-results-collapse-hide").removeClass("text-white").addClass("text-primary");
    $("#search-room-results-collapse").collapse("show");
}

function search_room_results_collapse_hide() {
    $("#search-room-results-collapse-hide").removeClass("text-primary").addClass("text-muted");
    $("#search-room-results-collapse-show").removeClass("text-white").addClass("text-primary");
    $("#search-room-results-collapse").collapse("hide");
}

function search_room(callback) {
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
        "               <a class='nav-link active' data-toggle='tab' href='#search-room-by-name' data-chinese='房间名'>name</a>" +
        "           </li>" +
        "           <li class='nav-item'>" +
        "               <a class='nav-link' data-toggle='tab' href='#search-room-by-roomid' data-chinese='房间 ID'>room ID</a>" +
        "           </li>" +
        "       </ul>" +
        "       <div class='tab-content'>" +
        "           <div class='tab-pane active' id='search-room-by-name'>" +
        "               <div class='input-group'>" +
        "                   <input class='form-control' type='text' id='name-to-search'>" +
        "                   <span class='input-group-btn'>" +
        "                       <button type='button' class='btn btn-primary' onclick='search_room_by_name($(this).parent().siblings(\"input\").val())' data-chinese='搜索'>" +
        "                           Search" +
        "                       </button>" +
        "                   </span>" +
        "               </div>" +
        "           </div>" +
        "           <div class='tab-pane' id='search-room-by-roomid'>" +
        "               <div class='input-group'>" +
        "                   <input class='form-control' type='number' id='roomid-to-search'>" +
        "                   <span class='input-group-btn'>" +
        "                       <button type='button' class='btn btn-primary' onclick='search_room_by_roomid($(this).parent().siblings(\"input\").val())' data-chinese='搜索'>" +
        "                           Search" +
        "                       </button>" +
        "                   </span>" +
        "               </div>" +
        "           </div>" +
        "       </div>" +
        "       <div class='text-center text-primary' id='search-room-results-collapse-show' onclick='search_room_results_collapse_show()'>" +
        "           <i class='fa fa-caret-down fa-2'></i>" +
        "       </div>" +
        "       <div class='collapse' id='search-room-results-collapse' style='padding: 0 1em;'>" +
        "           <p class='h6'>" +
        "               <span>search for</span>" +
        "               <u class='text-gray-dark font-weight-normal' id='search-room-by'></u>" +
        "           </p>" +
        "           <div id='search-room-results-field'>" +
        "           </div>" +
        "           <div class='text-center text-primary' id='search-room-results-collapse-hide' onclick='search_room_results_collapse_hide()'>" +
        "               <i class='fa fa-caret-up fa-2'></i>" +
        "           </div>" +
        "       </div>" +
        "       <div class='btn-group text-center' style='width:100%;'>" +
        "           <button class='btn' disabled style='width:50%;padding: .4rem 1rem;' id='search-room-confirm' data-chinese='确定'> confirm </button>" +
        "           <button class='btn btn-outline-danger' style='width:50%;padding: .4rem 1rem;' data-dismiss='modal' data-chinese='取消'> cancel </button>" +
        "       </div>" +
        "   </div>" +
        "</div>";
    // 生成弹窗
    appendModal("bg-primary text-white","text-primary","Search Room",ModalBody,"",false);
    change_system_language(localStorage.getItem("application-language"));
    $("#search-room-confirm").on("click",callback);
}