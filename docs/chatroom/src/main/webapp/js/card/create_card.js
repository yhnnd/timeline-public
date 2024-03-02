function create_card() {
    $("#create-card-field")
        .empty()
        .append(
            "<div class='form-group row'>" +
            "   <label class='col-3 col-form-label' data-chinese='标题'>title</label>" +
            "   <div class='col-9'>" +
            "       <input class='form-control' type='text' placeholder='title' id='card-title-to-create'>" +
            "   </div>" +
            "</div>" +
            "<div class='form-group row'>" +
            "   <label class='col-3 col-form-label' data-chinese='内容'>content</label>" +
            "   <div class='col-9'>" +
            "       <input class='form-control' type='text' placeholder='content' id='card-block-text-to-create'>" +
            "   </div>" +
            "</div>" +
            "<div class='form-group row'>" +
            "   <div class='offset-0 col-12'>" +
            "       <textarea class='form-control' id='card-block-text-full-to-create' rows='3'></textarea>" +
            "   </div>" +
            "</div>" +
            "<div class='form-group'>" +
            "   <label class='custom-file'>" +
            "       <input type='file' id='image-to-create' class='custom-file-input' onchange='file_selected(this);'>" +
            "       <span class='custom-file-control' id='image-filename'> cover image </span>" +
            "   </label>" +
            "</div>" +
            "<div class='form-group'>" +
            "   <label class='custom-file'>" +
            "       <input type='file' id='avatar-to-create' class='custom-file-input' onchange='file_selected(this);'>" +
            "       <span class='custom-file-control' id='avatar-filename'> avatar </span>" +
            "   </label>" +
            "</div>" +
            "<div class='form-group row'>" +
            "   <label class='col-3 col-form-label' data-chinese='页脚'>footer</label>" +
            "   <div class='col-9'>" +
            "       <input class='form-control' type='text' placeholder='footer' id='card-footer-to-create'>" +
            "   </div>" +
            "</div>" +
            "<div class='form-group row'>" +
            "   <label class='col-3' data-card-type='article' data-chinese='类型'>type</label>" +
            "   <div class='col-4'>" +
            "       <label class='custom-control custom-radio' onclick='$(&quot;[data-card-type]&quot;).attr(&quot;data-card-type&quot;,&quot;article&quot;);'>" +
            "           <input id='radio1' name='radio' type='radio' class='custom-control-input'>" +
            "           <span class='custom-control-indicator'></span>" +
            "           <span class='custom-control-description' data-chinese='文章'>Article</span>" +
            "       </label>" +
            "   </div>" +
            "   <div class='col-4'>" +
            "       <label class='custom-control custom-radio' onclick='$(&quot;[data-card-type]&quot;).attr(&quot;data-card-type&quot;,&quot;image&quot;);'>" +
            "           <input id='radio2' name='radio' type='radio' class='custom-control-input'>" +
            "           <span class='custom-control-indicator'></span>" +
            "           <span class='custom-control-description' data-chinese='图片'>Image</span>" +
            "       </label>" +
            "   </div>" +
            "</div>" +
            "<div class='row'>" +
            "   <div class='offset-2 col-5'>" +
            "       <button class='btn btn-primary' data-chinese='上传卡片' id='upload-card-button'> Create Card </button>" +
            "   </div>" +
            "   <div class='col-5'>" +
            "       <button class='btn btn-danger' data-toggle='collapse' data-target='#create-card-collapse' data-chinese='取消'> Cancel </button>" +
            "   </div>" +
            "</div>");
    change_system_language(localStorage.getItem("application-language"));
    $("#upload-card-button").on("click", create_card_submit);
    $("#create-card-collapse").collapse("toggle");
}

function create_card_submit() {
    // 读取卡片信息
    let cardType = $("[data-card-type]").data("card-type");
    let cardTitle = $("#card-title-to-create").val();
    let cardBlockText = $("#card-block-text-to-create").val();
    let cardBlockTextFull = $("#card-block-text-full-to-create").val();
    let cardFooter = $("#card-footer-to-create").val();
    let ImageType = file_ext($("#image-to-create").val());
    let AvatarType = file_ext($("#avatar-to-create").val());
    let createTime = new Date().getTime();
    // 检查是否有参数为空
    if (cardType === "article") {
        // 如果卡片类型是文章，则题目不能为空（如果卡片类型是图片，题目可以为空）
        if (cardTitle == undefined || cardTitle == "") {
            $("#card-title-to-create").attr("placeholder", "title is required");
            return;
        }
    }
    if (cardBlockText === undefined || cardBlockText === "") {
        $("#card-block-text-to-create").attr("placeholder", "content is required");
        return;
    }
    // 生成默认 Footer
    cardFooter = cardFooter !== "" ? cardFooter : "uploaded on " + new Date().toLocaleString();
    // 用户和卡片数据
    let formData = {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "card-class": "card-outline-primary",
        "card-type": cardType,
        "card-title": cardTitle,
        "card-block-text": cardBlockText,
        "card-block-text-full": cardBlockTextFull,
        "card-footer-text": cardFooter,
        "cover-image-type": ImageType,
        "avatar-type": AvatarType,
        "create-time": createTime
    };
    // 上传卡片
    $.getJSON("create/card", formData, function (data) {
        // 获取已上传卡片 id
        if (data["card-id"]) {
            // 上传卡片成功
            let Image = data["cover-image"];
            let Avatar = data["avatar"];
            if (Image && Image !== "") {
                // 上传卡片封面图片
                upload("#image-to-create", Image);
            }
            if (Avatar && Avatar !== "") {
                // 上传卡片作者头像
                upload("#avatar-to-create", Avatar);
            }
            log.line({
                title: "create_card_submit()",
                filename: "card/create_card.js",
                name: "jQuery getJSON 'create/card' callback",
                text: [
                    "<var>form data</var><br/>" + JSON.stringify(formData),
                    "<var>response</var><br/>" + JSON.stringify(data)
                ]
            });
        } else {
            log.error({
                title: "create_card_submit()",
                filename: "card/create_card.js",
                name: "jQuery getJSON 'create/card' callback error",
                text: [
                    "<var>form data</var><br/>" + JSON.stringify(formData),
                    "<var>response</var><br/>" + JSON.stringify(data)
                ]
            });
        }
        // 输出系统返回的消息
        appendMessage(data);
    });
}