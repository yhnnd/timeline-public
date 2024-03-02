function append_message_reset_password(messageText, data) {
    let resetMessageRequestData = JSON.parse(data.message);
    if (resetMessageRequestData) {
        const MillisInOneDay = 86400000;
        let sendTimeMillis = parseInt(resetMessageRequestData["send-time"]);
        let beginsAfter = parseInt(resetMessageRequestData["activation-begins-after"]);
        let expiresAfter = parseInt(resetMessageRequestData["activation-expires-after"]);
        let sendTime = new Date(sendTimeMillis);
        let beginTime = new Date(sendTimeMillis + beginsAfter * MillisInOneDay);
        let expiresTime = new Date(sendTimeMillis + expiresAfter * MillisInOneDay);
        messageText.html(
            "<p>" +
            "   <span data-chinese='请协助我重置密码'>please help me to reset password.</span>" +
            "</p>" +
            "<div class='activation-info mb-3'>" +
            "   <div class='bg-inverse text-white'>" +
            "       <small data-chinese='发起时间'>send time</small>" +
            "   </div>" +
            "   <div class='bg-info text-white'>" +
            "       <small>" + sendTime.toDateString() + "</small>" +
            "   </div>" +
            "   <div class='bg-inverse text-white'>" +
            "       <small data-chinese='激活开始时间'>activation begin date</small>" +
            "   </div>" +
            "   <div class='bg-success text-white'>" +
            "       <small>" + beginTime.toDateString() + "</small>" +
            "   </div>" +
            "   <div class='bg-inverse text-white'>" +
            "       <small data-chinese='失效时间'>expire date</small>" +
            "   </div>" +
            "   <div class='bg-danger text-white'>" +
            "       <small>" + expiresTime.toDateString() + "</small>" +
            "   </div>" +
            "</div>");
        let senderId = parseInt(resetMessageRequestData["sender-id"]);
        if (senderId === parseInt(sessionStorage.getItem("user-id"))) {
            // 本人向好友发送的请求
            let cancelButton = $("<button>")
                .addClass("btn btn-block btn-outline-danger")
                .attr("data-chinese", "取消请求")
                .text("cancel request")
                .attr("onclick", "withdraw_message(" + data.id + ",appendMessage)");
            messageText.append(cancelButton);
        } else {
            // 好友向本人发送的请求
            let timeNow = new Date();
            if (timeNow.getTime() < beginTime.getTime()) {
                messageText.append("<div data-chinese='现在不能重置密码'>can not reset password now.</div>");
            } else if (timeNow.getTime() > expiresTime.getTime()) {
                messageText.append("<div data-chinese='请求已失效'>request expired.</div>");
            } else {
                let resetButton = $("<button>")
                    .addClass("btn btn-block btn-outline-danger")
                    .attr("data-chinese", "重置密码")
                    .text("reset password")
                    .on("click", function () {
                        let modalTitle = "<span data-chinese='重置密码'>Reset Password</span>";
                        appendModal("bg-primary text-white", "text-primary", modalTitle, "", "", false);
                        let field = $(".modal");
                        field.find(".modal-body")
                            .load("template-reset-password.html", function () {
                                refresh_system_language(field);
                                field.find("#reset-password-confirm").on("click", function () {
                                    let inputNewPassword1 = field.find("#new-password");
                                    let inputNewPassword2 = field.find("#new-password-repeat");
                                    let newPassword1 = inputNewPassword1.val();
                                    let newPassword2 = inputNewPassword2.val();
                                    if (newPassword1 && newPassword2) {
                                        if (newPassword1 === newPassword2) {
                                            $.post('user-reset-password-activate', {
                                                "user-id": sessionStorage.getItem("user-id"),
                                                "session-id": sessionStorage.getItem("session-id"),
                                                "helper-id": resetMessageRequestData["helper-id"],
                                                "sender-id": resetMessageRequestData["sender-id"],
                                                "request-id": resetMessageRequestData["request-id"],
                                                "request-token": resetMessageRequestData["request-token"],
                                                "new-password": newPassword1
                                            }, function (data) {
                                                let message = JSON.parse(data);
                                                appendMessage(message);
                                            });
                                        } else {
                                            inputNewPassword1.val("").attr("placeholder", "两次输入的密码");
                                            inputNewPassword2.val("").attr("placeholder", "必须一致");
                                        }
                                    } else {
                                        inputNewPassword1.val("").attr("placeholder", "密码不能为空");
                                        inputNewPassword2.val("").attr("placeholder", "密码不能为空");
                                    }
                                });
                            });
                    });
                messageText.append(resetButton);
            }
        }
    } else {
        messageText.html("<span data-chinese='无效请求'>invalid request.</span>");
    }
}