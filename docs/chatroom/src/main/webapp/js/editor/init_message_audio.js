let recorder;

function start_audio_recording() {
    recorder.record();
    // 为录音按钮点击事件绑定停止录音
    $("#send-audio-message-button")
        .off("click").on("click", stop_audio_recording)
        .removeClass("btn-outline-primary").addClass("btn-danger");
}

function stop_audio_recording() {
    recorder.stop();
    // 获取发送键
    let sendMessageButton = $("#send-message-button");
    // 撤销发送键原有的点击触发函数
    $(sendMessageButton).off("click").removeAttr("onclick").removeClass("btn-primary").addClass("btn-danger");
    // 为发送键绑定新的点击触发函数
    $(sendMessageButton).on("click", function () {
        // 上传音频（回调函数：发送音频消息）
        recorder.exportWAV(function (blob) {
            let filename = new Date().toISOString() + '.wav';
            upload_message_audio(blob, filename, send_message_audio);
        });
        recorder.clear();
        // 恢复发送键原有的点击触发函数
        $(sendMessageButton).off("click").attr("onclick", "sendMessage()").removeClass("btn-danger").addClass("btn-primary");
    });
    // 为录音按钮点击事件绑定开始录音
    $("#send-audio-message-button")
        .off("click").on("click", start_audio_recording)
        .removeClass("btn-danger").addClass("btn-outline-primary");
}

function init_audio_record() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: true}).then(function (stream) {
            let audioContext = new AudioContext;
            let input = audioContext.createMediaStreamSource(stream);
            recorder = new Recorder(input);
            $("#send-audio-message-button").on("click", start_audio_recording);
        }).catch(function (e) {
            const error_message = e.name;
            $("#send-audio-message-button").addClass("disabled").off("click").on("click", function () {
                appendModal("bg-danger text-white", "text-danger", "No Live Audio Input", error_message, "");
            });
        });
    } else {
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true},
                function (stream) {
                    let audioContext = new AudioContext;
                    let input = audioContext.createMediaStreamSource(stream);
                    recorder = new Recorder(input);
                    $("#send-audio-message-button").on("click", start_audio_recording);
                },
                function () {
                    $("#send-audio-message-button").addClass("disabled").off("click").on("click", function () {
                        appendModal("bg-danger text-white", "text-danger", "No Live Audio Input", "User Media Is Not Accessible.", "");
                    });
                });
        } else {
            $("#send-audio-message-button").addClass("disabled").off("click").on("click", function () {
                appendModal("bg-danger text-white", "text-danger", "No Live Audio Input", "Your Navigator Does Not Support User Media.", "");
            });
        }
    }
}