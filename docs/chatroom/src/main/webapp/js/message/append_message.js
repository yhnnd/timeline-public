function appendMessage(data, config) {
    // 解析消息类型
    const is_from_system = data["user-id"] === 0 && data.username === "system";
    const is_from_myself = sessionStorage["user-id"] && data["user-id"] == sessionStorage["user-id"];
    let messageType = data.type;
    let messageTypeComponents = undefined;
    let messageIsSegment = false;
    let segmentWrapperId = undefined;
    // 如果消息类型是片段
    if (messageType && messageType.indexOf("segment-") === 0) {
        messageIsSegment = true;
        messageTypeComponents = messageType.split('-');
        messageType = messageTypeComponents[1];//（片段消息的 type 属性为 segment-type-timestamp-total-number）
    }
    // 撤回消息指令
    if (messageType === "withdraw message") {
        delete_message(data.message);
        cut_unread_message_count();
        return;
    }
    // 登录成功后服务器返回的用户信息
    if (messageType && messageType === "login") {
        append_message_login(data);
        return;
    }
    // 如果收到的消息不是系统消息
    if (data["room-id"] !== 0 && !is_from_system) {
        // 如果用户未登录
        if (!sessionStorage.getItem("user-id")) {
            return;
        }
        let userRoomId = $('#room-id').val();
        let dataRoomId = data["room-id"];
        // 如果当前 room id 未定义或者消息的 room id 未定义
        if (!userRoomId || !dataRoomId) {
            log.error({
                title: "appendMessage()",
                filename: "message/append_message.js",
                name: "error",
                text: "Room ID Undefined"
            });
            appendModal("bg-danger text-white", "text-danger", "Error Message", "Room ID Undefined", "");
            return;
        }
        if (config && config['allow-popup']) {
            if (parseInt(userRoomId) !== dataRoomId || !$(".tab-pane#chat").hasClass("active")) {
                // 如果用户当前 roomId 和收到的消息的 roomId 不同
                // 或者如果用户没在查看当前房间的聊天窗口
                if ($(".tab-pane#chat-list").hasClass("active")) {
                    for (let i = 0; i < 10; ++i) {
                        setTimeout(function () {
                            $(`[data-room-id='${dataRoomId}']`).toggleClass("bg-danger text-white");
                        }, i * 300);
                    }
                } else if (get_room_notification_popup(dataRoomId) === 1) {
                    append_message_elsewhere(data);// 弹窗提示新消息
                }
                return;
            }
        }
    }

    // 设置默认头像和用户名的样式
    if (data['badge-class'].indexOf('bg-') < 0 && data['badge-class'].indexOf('badge-') < 0) {
        // 设置默认头像的样式
        data['avatar-class'] = 'text-' + data['badge-class'];
        // 设置用户名的样式
        if (data['badge-class'] === 'inverse') {
            data['badge-class'] = 'bg-' + data['badge-class'];
        } else {
            data['badge-class'] = 'badge-' + data['badge-class'];
        }
    }
    // 设置消息气泡的文本样式
    if (data['text-class'].indexOf('text-') < 0) {
        data['text-class'] = 'text-' + data['text-class'];
    }

    if (is_from_system && data.message.indexOf("message deleted") >= 0) {
        // 【系统消息: 消息撤回成功】只弹窗，不在消息窗口中显示
    } else {
        // 如果消息是系统消息，或者消息的房间号和用户房间号相等，则在消息窗口中显示
        let messageBubbleStyle = {
            "display": "inline-block",
            "min-width": "40px",
            "max-width": data["user-id"] === 1 ? "100%" : (window.innerWidth > 768 ? "40%" : "80%"),
            "word-wrap": "break-word",
            "border-radius": "2px",
            "padding": "7px",
            "margin": "0",
            "box-shadow": "0 0 1px rgb(37, 40, 48)"
        };
        // 應用消息氣泡背景樣式
        if (data["background-class"]) {
            data["text-class"] += " " + data["background-class"];
        } else {
            messageBubbleStyle["background-color"] = "#fff";
        }
        // 建立消息体
        let messageField = $('<h5 class="message-field" data-style="no-support" style="clear:both;">');
        // 用户名
        let messageUsername = $('<span class="badge ' + data['badge-class'] + '">' + data.username + '</span>');
        // 用户昵称
        let messageUserNickname = $('<small class="room-user-nickname d-inline-block mx-1 text-muted"></small>');
        let messageText = $("<span>")
            .addClass("message-text " + data["text-class"])
            .css(messageBubbleStyle);
        // 为代码类型的消息设置显示样式
        if (messageType === "code") {
            messageText = $("<pre>")
                .attr("class", data["text-class"])
                .css(messageBubbleStyle)
                .addClass("prettyprint")
                .attr("id", ("code-" + Math.random()).split(".").join(""))
                .css({
                    "max-width": "100%",
                    "border": "1px solid #343a40"
                });
        }
        // 如果消息是 sys 发的
        if (data["user-id"] === 1 && ["html"].includes(messageType)) {
            messageText.addClass("w-100");
        }

        // 如果消息是我发的
        if (is_from_myself) {
            messageField.addClass("text-right");
            messageText.addClass("text-left");
        }

        // 绑定消息 ID
        $(messageText).attr('data-message-id', data.id);
        // 绑定消息发送人
        $(messageText).attr('data-username', data.username);
        $(messageText).attr('data-user-id', data['user-id']);
        // 绑定消息发送时间
        // $(messageText).attr('data-send-time', new Date(data['send-time']).toLocaleTimeString());
        $(messageText).attr('data-send-time', new Date(data['send-time']).toLocaleString());
        // 为用户名绑定点击事件，查看消息更多信息
        if (messageType !== "more messages") {
            $(messageUsername).on("click", function () {
                check_message_info(this, data);
            });
        } else if (messageType === "more messages") {
            $(".button-load-more-messages")
                .removeAttr("data-chinese")
                .html(data.message);
        }
        // 为消息气泡绑定点击事件，显示消息发送时间
        $(messageText).on('click', function () {
            toggle_message_send_time(this);
        });
        // 加载消息内容
        if (messageType === "image") {
            // 图片消息
            $(messageText).html(`<img style="width:100%" src="${data.message}" onclick="inspect_message_image($(this))">`);
        } else if (messageType === "audio") {
            // 音频消息
            append_message_audio(messageText, data);
        } else if (messageType === "html" || messageType === "more messages") {
            // 超文本消息
            $(messageText).html(data.message);
        } else if (messageType === "reset password") {
            // 消息是重置密码请求
            append_message_reset_password(messageText, data);
        } else {
            // 将消息中的 HTML 标签（"<a>"）转义（"&lt;a&gt;"）
            $(messageText).text(data.message);
            // 将消息中的换行符 "\n" 转换成 "<br/>"
            let newText = $(messageText).html().split("\n").join('<br/>');
            if (messageType === "text") {// 如果消息类型是代码，不应该识别 URL 网址
                // 将消息中的 URL 网址转换成 a 链接
                append_message_linkable(messageText, newText);
            }
        }
        // 消息用户头像
        let avatar = $(`<img class="message-avatar rounded-circle" data-user-id=${data["user-id"]}>`);
        if (is_from_myself) {// 如果消息是我发的
            $(messageField).append(messageUsername, messageUserNickname, avatar);
        } else {// 如果消息是别人发的
            $(messageField).append(avatar, messageUsername, messageUserNickname);
            add_unread_message_count();// 增加未读消息数
        }
        // 把消息内容置入消息体
        $(messageField).append('<br/>').append(messageText);

        // 加载消息体到消息窗口上
        if (messageIsSegment) {
            // 如果消息是片段
            segmentWrapperId = messageTypeComponents[0] + '-' + messageType + '-' + messageTypeComponents[2];
            let segmentTotal = messageTypeComponents[3];
            let segmentNO = messageTypeComponents[4];
            let segmentWrapper = $('#messages').find("#" + segmentWrapperId);
            let segmentText = messageText;
            if (segmentWrapper.length === 0) {
                // 如果未发现其他同源片段，加载消息片段到窗口中
                $(messageField).attr("id", segmentWrapperId);
                $('#messages').append(messageField);
            } else {
                // 如果发现其他同源片段，加载消息片段到其后
                segmentText = $(segmentWrapper).children(":last-child");
                let pre = segmentText.find("pre");
                if (pre.length) {
                    pre.append(messageText.html());
                } else {
                    segmentText.append(messageText.html());
                }
            }
            // 保存当前消息片段内容，以备转发消息时使用
            segmentText.attr(`data-message-${segmentTotal}-${segmentNO}`, data.message);
        } else {// 如果消息是完整消息
            $('#messages').append(messageField);
        }

        // 如果消息是回复型消息
        if (messageType && messageType.indexOf("reply") === 0) {
            let split = messageType.split('-');
            let replyMessageId = split[split.length - 1];
            let replyIcon = $('<div class="d-inline-block">').append('<span class="fa fa-reply">');
            let replyMessageText = $(`[data-message-id="${replyMessageId}"]`);
            let replyMessage = $(replyMessageText).closest(".message-field");
            if (replyMessage.length > 0) {
                let checkReplyIcon = $('<div class="d-inline-block">').append('<span class="fa fa-comment-o">');
                if (replyMessage.hasClass('text-right')) {
                    $(checkReplyIcon).addClass('pr-3 pr-md-4');
                    $(replyMessageText).before(checkReplyIcon);
                } else {
                    $(checkReplyIcon).addClass('pl-3 pl-md-4');
                    $(replyMessageText).after(checkReplyIcon);
                }
                // 点击查看消息的回复
                $(checkReplyIcon).off("click").on("click", function () {
                    gotoMessage(messageField, "bg-warning", messageText, "bg-inverse text-white");
                });
                // 点击查看被回复的消息
                $(replyIcon).off("click").on("click", function () {
                    gotoMessage(replyMessage, "bg-faded", replyMessageText, "bg-inverse text-white");
                });
                _.each([replyIcon, checkReplyIcon], function (elem) {
                    $(elem).addClass("text-primary");
                });
            } else {
                replyIcon.addClass("text-muted");
            }
            if (is_from_myself) {
                $(replyIcon).addClass('pr-3 pr-md-4');
                $(messageText).before(replyIcon);
            } else {
                $(replyIcon).addClass('pl-3 pl-md-4');
                $(messageText).after(replyIcon);
            }
        }

        // 加载用户头像图片
        append_message_avatar(avatar, data);

        setTimeout(function () {// 非阻滞
            if (!is_from_system) {
                if ($(`.row[data-room-id="${data["room-id"]}"]`).data("room-type") === "friends"
                    && parseInt(data["user-id"]) === parseInt(sessionStorage.getItem("user-id"))) {
                } else {// 加载用户昵称
                    let key = `room-${data["room-id"]}-user-${data["user-id"]}-nickname`;
                    let nickname = localStorage.getItem(key);// 读缓存
                    if (nickname) {// 有缓存
                        messageUserNickname.text(nickname);
                    } else {// 没缓存
                        $.getJSON("room-user-nickname", {
                            "user-id": sessionStorage.getItem("user-id"),
                            "session-id": sessionStorage.getItem("session-id"),
                            "room-id": data["room-id"],
                            "room-user-id": data["user-id"]
                        }, function (data) {
                            if (data.nickname) {
                                messageUserNickname.text(data.nickname);
                                localStorage.setItem(key, data.nickname);// 写缓存
                            }
                        });
                    }
                }
            }
        }, 0);

        // 高亮代码类型的消息
        if (messageType === "code") {
            if (messageIsSegment) {
                $("#" + segmentWrapperId).find(".prettyprinted").removeClass("prettyprinted");
                prettyPrint("#" + segmentWrapperId);
            } else {
                prettyPrint("[data-message-id='" + data.id + "']");
            }
        }
    }

    // 如果消息是服务器发送过来的系统消息，特殊处理这些消息
    if (is_from_system) {
        append_message_system(data);
    }

    // 如果消息是我发的
    if (is_from_myself) {
        // 滚动到聊天记录底部
        $('#messages .message-field:last').get(0).scrollIntoView();
    }
}


function gotoMessage(messageField, messageFieldClass, messageText, messageTextClass) {
    // 滚动到消息
    scrollIntoView(messageField.get(0));
    // 闪烁消息体
    let timeout;
    let highlight = function () {
        $(messageField).addClass(messageFieldClass);
        timeout = setTimeout(function () {
            $(messageField).removeClass(messageFieldClass);
        }, 150);
    };
    highlight();
    let interval = setInterval(highlight, 300);
    setTimeout(function () {
        clearTimeout(timeout);
        clearInterval(interval);
        $(messageField).removeClass(messageFieldClass);
    }, 900);
    // 高亮消息气泡
    _.each([$(messageText), $(messageText).find('*')], function (elem) {
        let textClass = elem.attr("class") ? _.filter((elem.attr("class")).split(' '), function (clazz) {
            return !_.contains(['text-left', 'text-right'], clazz) && clazz.indexOf('text-') === 0
        }).join(' ') : '';
        elem.toggleClass(messageTextClass + ' ' + textClass);
        setTimeout(function () {
            elem.toggleClass(messageTextClass + ' ' + textClass);
        }, 900);
    });
}
