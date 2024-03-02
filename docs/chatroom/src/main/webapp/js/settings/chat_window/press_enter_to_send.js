function init_press_enter_to_send() {
    // 监听消息输入框键盘按下
    $('#message').off('keydown').on('keydown', function (e) {
        if (e.keyCode == 13) {// 如果按下的键是回车
            if (localStorage.isPressEnterToSend === 1 ||
                localStorage.isPressEnterToSend === true ||
                localStorage.isPressEnterToSend === "true") {
                // 如果已开启按回车发送消息功能
                e.preventDefault();
                sendMessage();// 发送消息
            }
        }
    });
}

// 按回车发送消息
function enablePressEnterToSend() {
    set_preferences("is-press-enter-to-send", 1, "boolean", function (data) {
        if (data.result === 1) {
            localStorage.isPressEnterToSend = 1;
        }
    });
}

// 按回车换行
function disablePressEnterToSend() {
    set_preferences("is-press-enter-to-send", 0, "boolean", function (data) {
        if (data.result === 1) {// result = 1 表示更新成功
            localStorage.isPressEnterToSend = 0;
        }
    });
}