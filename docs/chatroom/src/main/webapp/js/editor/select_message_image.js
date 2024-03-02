// 选择图片文件
function select_message_image() {
    // 获取图片输入框（隐藏）
    let messageImageInput = $("#message-image-input");
    // 模拟点击图片输入框
    $(messageImageInput).val("").click();
    // 获取发送键
    let sendMessageButton = $("#send-message-button");
    // 撤销发送键原有的点击触发函数
    $(sendMessageButton).off("click").removeAttr("onclick").removeClass("btn-primary").addClass("btn-danger");
    // 为发送键绑定新的点击触发函数
    $(sendMessageButton).on("click",function () {
        // 上传图片（回调函数：发送图片消息）
        upload_message_image(messageImageInput, send_message_image);
        // 恢复发送键原有的点击触发函数
        $(sendMessageButton).off("click").attr("onclick","sendMessage()").removeClass("btn-danger").addClass("btn-primary");
    });
}