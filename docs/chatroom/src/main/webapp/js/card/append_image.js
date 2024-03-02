function append_card_image(card) {
    // 卡片 id
    let id = card["card-id"];
    let CollapseId = 'card-' + id + '-content-full';
    // 封面图片路径
    let CoverImagePath = ( card["cover-image"]==="" ? undefined : getCloudRootPath() + card["cover-image"] );
    // 头像图片路径
    let AvatarPath = ( card["avatar"]==="" ? undefined : getCloudRootPath() + card["avatar"] );
    // 卡片标题
    let title = card["card-title"];
    // 如果标题为空，就不显示标题
    title = (title === "" ? undefined : title);
    // 生成卡片
    $(".card-field").append(
        '<div class="card '+ card["card-class"] + '">' +
        ( title === undefined ? '':
        '<h4 class="card-header" data-toggle="collapse" data-target="#' + CollapseId + '">' + title + '</h4>') +
        ( CoverImagePath === undefined ? '':
        '    <img ' + (title===undefined?'class="card-img-top"':'') + ' src="' + CoverImagePath + '" style="width: 100%; display: block;">') +
        '    <div class="collapse" id="' + CollapseId + '">' +
        '        <div class="card-block">' +
        '            <div data-toggle="collapse" data-target="#' + CollapseId + '">' +
        '                <p class="card-text">' +
        '' +                card["card-block-text"] +
        '                </p>' +
        '                <p class="card-text pb-3">' +
        '' +                card["card-block-text-full"].split('\n').join('<br>') +
        '                </p>' +
        '            </div>' +
        '            <div class="row">' +
        '                <div class="col-4">' +
        ( AvatarPath === undefined ? '<i class="fa fa-user-circle fa-4x"></i>':
        '                    <img class="img-fluid img-thumbnail" src="' + AvatarPath + '">') +
        '                </div>' +
        '                <div class="col-8">' +
        '                    <div class="p-2 card-text">' +
        '                        <div class="pb-2" style="line-height: 1.1;">' +
        '                            <small>written by <span class="card-owner-username"></span>.</small>' +
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
        ( AvatarPath === undefined ? '<i class="fa fa-user-circle fa-lg"></i>&nbsp;':
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
        usernameField.text(user.username).addClass("hover-text-underline text-primary").off("click");
        if (parseInt(card['user-id']) !== parseInt(sessionStorage.getItem("user-id"))) {
            usernameField.on("click", function () {
                add_loading_icon();
                prompt_private_chat_callback(card['user-id']);
            });
        } else {
            // 點擊圖片卡片的作者用戶名（* 請與文字卡片代碼保持一致）
            usernameField.on("click", function () {
                appendModal("bg-primary text-white", "text-primary", user.username + "\'s info", "", "", false);
                $(".modal-body")
                    .data("user-id", card['user-id'])
                    .attr("data-user-id", card['user-id'])
                    .load("template-user-personal-homepage.html");
            });
        }
    });
}