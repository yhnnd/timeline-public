// 用户注册
function signup(callback) {
    let username = $("#signup-username").val();
    let password = $("#signup-password").val();
    let age = $("#signup-age").val();
    let gender = $("#signup-gender").val();
    let email = $("#signup-email").val();
    if (username && password && age && gender) {
        $.post("signup", {
            "username": username,
            "password": password,
            "age": age,
            "gender": gender,
            "email": email,
            "type": "signup"
        }, function (data) {
            callback(JSON.parse(data));
        });
    } else {
        let modalTitle = "<span data-chinese='用户信息不完整'>user info not sufficient.</span>";
        let modalBody = "<span data-chinese='请正确填写用户各项信息'>please fill in every user info item.</span>";
        appendModal("bg-danger text-white", "text-danger", modalTitle, modalBody, "");
        refresh_system_language(".modal");
    }
}

function signup_callback(data) {
    appendMessage(data);
}

function toggle_agree_terms_of_use(button) {
    let signupButton = $("#signup");
    if ($(button).hasClass("active")) {
        $("#agree-to-terms-of-use,#signup").removeClass("btn-outline-primary").addClass("btn-outline-danger");
        signupButton.addClass("disabled").attr("disabled", true);
    } else {
        $("#agree-to-terms-of-use,#signup").removeClass("btn-outline-danger").addClass("btn-outline-primary");
        signupButton.removeClass("disabled").removeAttr("disabled");
    }
}