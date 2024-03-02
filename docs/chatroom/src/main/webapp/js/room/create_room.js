function create_room() {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    // 设置弹窗内容
    let ModalBody =
        "<div class='row'>" +
        "   <div class='col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>" +
        "       <div class='input-group' style='margin-bottom: 15px;'>" +
        "           <span class='input-group-addon' data-chinese='房间名'>name</span>" +
        "           <input class='form-control' type='text' id='room-name-to-create' placeholder='required' " +
        "           onblur='create_room_check();' onchange='create_room_check();'>" +
        "       </div>" +
        "       <div class='input-group' style='margin-bottom: 15px;'>" +
        "           <span class='input-group-addon' data-chinese='类型'>type</span>" +
        "           <select class='form-control' id='room-type-to-create' style='color: #666;' " +
        "           onblur='$(this).removeAttr(&quot;style&quot;);create_room_check();' " +
        "           onchange='$(this).removeAttr(&quot;style&quot;);create_room_check();'>" +
        "               <option value='private' selected hidden data-chinese='必须填写'>required</option>" +
        "               <option value='public' data-chinese='公开'>public</option>" +
        "               <option value='private' data-chinese='私密'>private</option>" +
        "               <option value='secret' data-chinese='机密'>secret</option>" +
        "           </select>" +
        "       </div>" +
        "       <div class='input-group' style='margin-bottom: 15px;'>" +
        "           <span class='input-group-addon' data-chinese='阅后即焚'>live</span>" +
        "           <select class='form-control' id='room-live-to-create' style='color: #666;' " +
        "           onblur='$(this).removeAttr(&quot;style&quot;);create_room_check();' " +
        "           onchange='$(this).removeAttr(&quot;style&quot;);create_room_check();'>" +
        "               <option value='1' selected hidden data-chinese='必须填写'>required</option>" +
        "               <option value='1' data-chinese='是'>yes</option>" +
        "               <option value='0' data-chinese='否'>no</option>" +
        "           </select>" +
        "       </div>" +
        "       <div class='btn-group text-center' style='width:100%;'>" +
        "           <button class='btn' disabled style='width:50%;padding: .4rem 1rem;' id='create-room-confirm' data-chinese='确定'> confirm </button>" +
        "           <button class='btn btn-outline-danger' style='width:50%;padding: .4rem 1rem;' data-dismiss='modal' data-chinese='取消'> cancel </button>" +
        "       </div>" +
        "   </div>" +
        "</div>";
    // 显示弹窗
    appendModal("bg-primary text-white", "text-primary", "Create Room", ModalBody, "", false);
    change_system_language(localStorage.getItem("application-language"));
    // 将创建房间按钮改为不可用状态
    $("#create-room-confirm")
        .removeClass("btn-outline-primary")
        .attr("disabled", true)
        // 为创建房间按钮的点击事件绑定函数
        .on("click", function () {
            if ($("#create-room-confirm").hasClass("btn-outline-primary") === false) {
                // 确认按钮不可用
                return;
            }
            let userid = sessionStorage.getItem("user-id");
            let roomName = $("#room-name-to-create").val();
            let roomType = $("#room-type-to-create").val();
            let live = $("#room-live-to-create").val();
            live = (_.contains([true, "true", 1, "1"], live) ? "1" : "0");
            create_room_submit(userid, roomName, roomType, live);
        });
}

function create_room_check() {
    let a = $("#room-name-to-create").val();
    let b = $("#room-type-to-create").val();
    let c = $("#room-live-to-create").val();
    if (a && a !== "" && b && b !== "" && c && c !== "") {
        $("#create-room-confirm").removeAttr("disabled").addClass("btn-outline-primary");
    }
}

function create_room_submit(userid, roomName, roomType, live) {
    $.getJSON('create-room', {
        "type": "create room",
        "user-id": userid,
        "room-name": roomName,
        "room-type": roomType,
        "room-live": live
    }, function (data) {
        appendMessage(data);
    });
}