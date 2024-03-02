function check_message_info(messageUsername, message) {
    // 给用户名徽章添加临时 id，用于删除没有 id 的消息
    let temp_id = parseInt(("" + Math.random()).split(".").join(""));
    $(messageUsername).attr("data-temp-id", temp_id);
    // 获取消息基本信息
    let message_id = message["id"];
    let message_user_id = message["user-id"];
    let message_username = message["username"];
    let message_send_time = message["send-time"];
    let message_text = message["message"];
    let message_type = message["type"];
    let isSegment = message_type.indexOf("segment-") === 0;
    let segmentTotal = 0;
    let message_details_categories = [
        ['content', '内容'],
        ['basic information', '基本信息'],
        ['styles', '样式'],
        ['more information', '更多信息']
    ];
    let message_details = {
        'message id': ['消息 ID', message_id, 1],
        'room id': ['房间 ID', message['room-id'], 1],
        'user id': ['用户 ID', message_user_id, 1],
        'user name': ['用户名', message_username, 1],
        'avatar style': ['头像样式', message['avatar-class'], 2],
        'badge style': ['徽章样式', message['badge-class'], 2],
        'text style': ['文本样式', message['text-class'], 2],
        'message type': ['消息类型', message_type, 3],
        'message segment': ['消息分片', isSegment, 3]
    };
    if (isSegment) {
        // 如果消息是多片段消息，恢复分片前的原消息
        message_text = '';
        let messageText = $(messageUsername).siblings("[data-message-id]");
        let slices = message_type.split('-');
        message_type = slices[1];
        segmentTotal = parseInt(slices[3]);
        message_details['message type'][1] = message_type;
        message_details['segment total'] = ['分片总数', segmentTotal, 3];
        message_details['message type ✱'] = ['消息类型✱', message['type'], 3];
        for (let i = 1; i <= segmentTotal; ++i) {
            let segment_text = messageText.attr(`data-message-${segmentTotal}-${i}`);
            if (segment_text) message_text += segment_text;
            else console.error(`message segment ${segmentTotal}-${i} not found`);
        }
    }
    let messageSendTimeLocaleCollapseId = 'message-send-time-locale-collapse-' + getRandom();
    // 生成弹窗内容
    let ModalBody =
        `<p class='d-flex align-items-baseline alert-info btn-info' data-toggle='collapse' data-target='#${messageSendTimeLocaleCollapseId}'>` +
        "   <span class='badge badge-primary btn btn-primary badge-optimized mr-2' data-chinese='发送时间'>send time</span>" +
        `   <span>${message_send_time}</span>` +
        "</p>" +
        `<div class='collapse' id='${messageSendTimeLocaleCollapseId}'>` +
        "   <p class='d-flex align-items-baseline'>" +
        "       <span class='badge badge-primary badge-optimized mr-2' data-chinese='发送时间(本土)'>send time locale</span>" +
        `       <span>${new Date(message_send_time).toLocaleString()}</span>` +
        "   </p>" +
        "</div>" +
        "<p class='d-flex align-items-baseline alert-info btn-info' data-toggle='collapse' data-target='#message-text-collapse'>" +
        "   <span class='badge badge-primary btn btn-primary badge-optimized mr-2' data-chinese='消息内容'>message text</span>" +
        "   <span class='d-inline-block w-75 overflow-ellipsis break-all'>" +
        `       <small>${$("<span>").text(message_text).html()}</small>` +
        "   </span>" +
        "</p>" +
        "<p class='collapse' id='message-text-collapse'>" +
        "   <span class='d-inline-block px-1 px-sm-2 px-md-3 px-lg-4 break-all'>" +
        `       <small>${$("<span>").text(message_text).html()}</small>` +
        "   </span>" +
        "</p>" +
        (function (d) {
            let s = '', category_number = -1, open_collapse = false;
            for (let i in d) {
                let e = d[i];
                if (category_number !== e[2]) {
                    category_number = e[2];
                    if (open_collapse) {
                        open_collapse = false;
                        s += '</article>';
                    }
                    let category = message_details_categories[category_number];
                    s += '<article>' +
                        `<p class="alert-info text-center border border-info btn-info" data-toggle="collapse" data-target="#message-details-category-${category_number}">` +
                        `<small data-chinese="${category[1]}">${category[0]}</small>` +
                        '</p>' +
                        '</article>' +
                        `<article class='collapse' id='message-details-category-${e[2]}'>`;
                    open_collapse = true;
                }
                s += '<p class="d-flex align-items-baseline">' +
                    `<span class='badge badge-primary badge-optimized mr-2' data-chinese='${e[0]}'>${i}</span>` +
                    `<span class="break-all">${e[1]}</span>` +
                    "</p>";
            }
            s += '</article>';
            return s;
        })(message_details)
        + "<div style='margin-top: 1rem;'>"
        + "<div class='btn-group text-center' style='width:100%;'>"
        + "<button class='btn btn-sm btn-outline-primary' style='width:26%;' data-chinese='收藏'> favorite </button>"
        + "<button class='btn btn-sm btn-outline-primary' style='width:26%;' data-chinese='回复' id='button-reply-message'> reply </button>"
        + "<button class='btn btn-sm btn-outline-primary' style='width:24%;' data-chinese='转发' id='button-forward-message'> forward </button>"
        /* 不能用 !==，只能用 !=  */
        + (message_user_id != sessionStorage.getItem("user-id") ?
        "<button class='btn btn-sm btn-outline-danger' style='width:24%;' onclick='delete_message(" + message_id + "," + temp_id + ")' data-chinese='删除'> delete </button>" :
        "<button class='btn btn-sm btn-outline-danger' style='width:24%;' onclick='withdraw_message(" + message_id + ",appendMessage)' data-chinese='撤回'> recall </button>")
        + "</div>"
        + "</div>";
    // 触发弹窗
    appendModal("bg-primary text-white", "text-primary", "Message Info", ModalBody, "", false);
    change_system_language(localStorage.getItem("application-language"));
    // 监听回复消息
    $(".modal #button-reply-message").off("click").on("click", function () {
        reply_message(message);
    });
    // 找到消息输入框
    let editor = $("#editor");
    // 当点击弹窗时
    $(".modal").on("click", function (event) {
        if (event.target.id !== "button-reply-message") {// 如果被点击的不是回复消息按钮
            $(editor).trigger("QuitReplyMessage");
        }
    });
    // 监听退出回复消息事件，恢复消息输入框的原有状态
    let backup = backup_message_input();
    $(editor).on("QuitReplyMessage", function () {
        reset_message_input(backup);
    });
    // 监听转发消息
    $(".modal #button-forward-message").off("click").on("click", function () {
        $(editor).trigger("QuitReplyMessage");
        forward_message({
            "message": message_text,
            "type": message_type
        });
    });
}