function append_card_article(card) {
    // 卡片 id
    let id = card["card-id"];
    let CollapseId = 'card-' + id + '-content-full';
    // 封面图片路径
    let CoverImagePath = ( card["cover-image"] === "" ? undefined : getCloudRootPath() + card["cover-image"] );
    // 头像图片路径
    let AvatarPath = ( card["avatar"] === "" ? undefined : getCloudRootPath() + card["avatar"] );
    // 卡片标题
    let title = card["card-title"];
    // 生成卡片
    $(".card-field").append(
        '<div class="card '+ card["card-class"] + '">' +
        ( CoverImagePath === undefined ? '' :
            '<img class="card-img-top" src="' + CoverImagePath + '" style="width: 100%; display: block;">') +
        '    <div class="card-block">' +
        '        <div>' +
        '            <h4 class="card-title">' +
        '' +            title +
        '' +            '<span class="btn btn-sm btn-outline-primary float-right" data-toggle="collapse" data-target="#' + CollapseId + '">' +
        '' +                '<span class="fa fa-sort"></span>' +
        '' +            '</span>' +
        '            </h4>' +
        '            <p class="card-text pb-3">' +
        '' +            card["card-block-text"] +
        '            </p>' +
        '        </div>' +
        '        <div class="collapse" id="' + CollapseId + '">' +
        '            <p class="card-text">' +
        '' +            card["card-block-text-full"].split('\n').join('<br>') +
        '            </p>' +
        '            <div class="row">' +
        '                <div class="col-4">' +
        ( AvatarPath === undefined ? '<i class="fa fa-user-circle fa-4x"></i>' :
        '                    <img class="img-fluid img-thumbnail" src="' + AvatarPath + '">') +
        '                </div>' +
        '                <div class="col-8">' +
        '                    <div class="p-2 card-text">' +
        '                        <div class="pb-2" style="line-height: 1.1;">' +
        '                            <small>' +
        '                                written by <span class="card-owner-username"></span>' +
        '                                <span class="start-chat-with-card-owner fa fa-envelope-o"></span>.' +
        '                            </small>' +
        '                        </div>' +
        '                        <div class="btn-group btn-group-sm">' +
        '                            <div class="btn btn-sm btn-outline-primary" onclick="like_card($(this),' + id + ')"><i class="fa fa-heart-o"></i></div>' +
        '                            <div class="btn btn-sm btn-outline-primary" onclick="comment_card($(this),' + JSON.stringify(card).split("\"").join("&quot;") + ')"><i class="fa fa-comment-o"></i></div>' +
        '                            <div class="btn btn-sm btn-outline-primary" onclick="share_card(' + id + ')"><i class="fa fa-share-alt"></i></div>' +
        '                            <div class="btn btn-sm btn-outline-primary" onclick="forward_card(' + id + ')"><i class="fa fa-share"></i></div>' +
        '                            <div class="btn btn-sm btn-outline-primary"><i class="fa fa-info px-1"></i></div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="card-footer">' +
        '        <p class="card-text">' +
        ( AvatarPath === undefined ? '<i class="fa fa-user-circle fa-lg"></i>&nbsp;' :
        '            <img class="rounded-circle d-inline-block" src="' + AvatarPath + '">') +
        '            <small class="text-muted" data-toggle="collapse" data-target="#' + CollapseId + '">' +
        '' +            card["card-footer-text"] +
        '            </small>' +
        (card['user-id'] == sessionStorage.getItem("user-id") ?
        '            <span class="btn btn-sm btn-outline-danger float-right" onclick="delete_card(' + card['card-id'] + ')">' +
        '                <i class="fa fa-trash-o"></i>' +
        '            </span>' : '') +
        '        </p>' +
        '    </div>' +
        '</div>');
    get_user_by_userid(card['user-id'], function (user) {
        let usernameField = $("#" + CollapseId).find(".card-owner-username");
        usernameField
            .text(user.username)
            .addClass("hover-text-underline text-primary")
            .off("click")
            .on("click", function () {
                appendModal("bg-primary text-white", "text-primary", user.username + "\'s info", "", "", false);
                $(".modal-body")
                    .data("user-id", card['user-id'])
                    .attr("data-user-id", card['user-id'])
                    .data("user", JSON.stringify(user))
                    .attr("data-user", JSON.stringify(user))
                    .load("template-user-personal-homepage.html");
            });
        let chatButton = usernameField.siblings('.start-chat-with-card-owner').addClass("text-primary");
        if (parseInt(card['user-id']) !== parseInt(sessionStorage.getItem("user-id"))) {
            // 卡片作者不是當前用戶
            chatButton.off("click").on("click", function () {
                add_loading_icon();
                prompt_private_chat_callback(card['user-id']);
            });
        } else {
            // 卡片作者是當前用戶
            chatButton.hide();
        }
    });
}