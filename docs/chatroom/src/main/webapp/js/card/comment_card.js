function comment_card(button, card) {
    $(button).find(".fa").toggleClass("fa-comment fa-comment-o");
    open_new_page("comment-card-foreground", "comment-card-background");
    let close = function () {
        close_new_page("comment-card-foreground", "comment-card-background");
    };
    // let background = $(".comment-card-background");
    let foreground = $(".comment-card-foreground");
    let container = $("<div class='container p-0'>")
        .css("background", "rgba(0, 0, 0, 0.5)")
        .appendTo(foreground);
    let title = $("<div>")
        .addClass("bg-faded p-3 d-flex align-items-center justify-content-between")
        .append(`<span>${card["card-title"]}</span>`)
        .append("<i class='fa fa-times close-comment-page'>")
        .appendTo(container);
    let commentsField = $("<div class='p-3 mt-1 bg-faded'>")
        .attr("id", "card-comments")
        .html("<div>comments</div>")
        .append("<div class='w-100 p-3 text-center' id='loading-comments'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i></div>")
        .appendTo(container);

    get_card_comments(commentsField, card);

    let submitCommentField = $("<div class='p-3 mt-1 bg-faded'>").text("my comment").appendTo(container);
    submitCommentField.append(
        `<div class="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 p-0">
            <div class="input-group">
                <textarea class="form-control" id="card-comment"></textarea>
                <span class="input-group-btn">
                    <button type="button" class="btn btn-primary" data-chinese="发送" onclick="submit_card_comment($(this),$('#card-comment'),${JSON.stringify(card).split("\"").join("&quot;")})">Send</button>
                </span>
            </div>
        </div>`);
    foreground.find('.close-comment-page').on("click", close);
}

function append_card_comment(commentsField, cardComment) {
    let isFromSelf = cardComment['user-id'] == sessionStorage.getItem('user-id');
    let avatarField = $("<div>")
        .addClass("avatar-field d-flex align-items-center justify-content-center");
    let commentText = $("<div>")
        .addClass("comment-text p-1");
    let comment = $("<div>")
        .addClass('card-comment alert-primary d-flex align-items-center justify-content-between')
        .attr("id", `card-comment-${cardComment.id}`)
        .append(avatarField, commentText);
    let operationField = $("<div>")
        .addClass('operation-field d-flex justify-content-around')
        .appendTo(comment);
    if (isFromSelf) {
        $("<button class='btn btn-sm btn-outline-danger'>")
            .append("<i class='fa fa-trash'>")
            .on("click", function () {
                delete_card_comment(cardComment.id);
            }).appendTo(operationField);
    } else {
        $("<button class='btn btn-sm btn-outline-danger'>")
            .append("<i class='fa fa-flag'>")
            .on("click", function () {
                report_card_comment(cardComment.id);
            }).appendTo(operationField);
    }
    comment.appendTo(commentsField);
    avatarField.html("<img style='width: 2rem;height: 2rem;border-radius: 1rem;'>");
    get_user_by_userid(cardComment["user-id"], function (data) {
        avatarField.find("img").attr("src", data.avatar);
    });
    comment.find(".comment-text").text(cardComment.text);
    refresh_no_comment();
}

function get_card_comments(commentsField, card) {
    $.getJSON("card-comment", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "action": "get-by-card-id",
        "card-id": card["card-id"]
    }, function (cardComments) {
        if (cardComments && cardComments.length > 0) {
            for (let i = 0; i < cardComments.length; ++i) {
                append_card_comment(commentsField, cardComments[i]);
            }
        } else {
            refresh_no_comment();
        }
        $("#loading-comments").remove();
    });
}

function submit_card_comment(button, input, card) {
    let text = input.val();
    if (text && text.length) {
        if (text.length > 255) {
            alert("评论内容过长");
        } else {
            $.post("card-comment", {
                "user-id": sessionStorage.getItem("user-id"),
                "session-id": sessionStorage.getItem("session-id"),
                "action": "add",
                "card-id": card["card-id"],
                "text": text,
                "type": "text",
                "target": "card",
                "target-id": card["card-id"],
                "is-timed": false
            }, function (data) {
                let card = JSON.parse(data);
                if (card) {
                    input.val("");
                    append_card_comment($("#card-comments"), card);
                }
            });
        }
    } else {
        input.attr("placeholder", "请填写评论内容");
    }
}

function delete_card_comment(id) {
    $.post("card-comment", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "action": "remove-by-id",
        "comment-id": id
    }, function (data) {
        let result = JSON.parse(data);
        if (result.result === 1) {
            $('#card-comment-' + id).remove();
            refresh_no_comment();
        }
    });
}

function report_card_comment(id) {

}

function refresh_no_comment() {
    let commentsField = $("#card-comments");
    if (commentsField.find(".card-comment").length) {
        commentsField.find(".no-comment").remove();
    } else if (!commentsField.find(".no-comment").length) {
        commentsField.append("<div class='alert-danger p-3 no-comment'>no comment</div>");
    }
}