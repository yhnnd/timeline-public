function init_cards_callback(cards) {
    // 清空卡片展示区域
    $(".card-field").empty();

    if (cards === undefined) {
        console.log("card init callback error: cards is undefined");
        return;
    }

    // 添加卡片类别按键
    let toolbar = $(
        '<div class="card card-outline-primary px-0 py-3 border-0 mb-0">' +
        '    <div class="card-block p-0">' +
        '        <div class="btn-group w-100">' +
        '            <div class="btn-group w-50">' +
        '                <button class="btn btn-outline-primary w-75 px-0" type="button" onclick="refresh_cards()">' +
        '                    <i class="fa fa-refresh" id="button-refresh-cards"></i>' +
        '                    <small data-chinese="刷新">&nbsp;Refresh</small>' +
        '                </button>' +
        '                <div class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split w-25 px-0" data-toggle="dropdown">' +
        '                </div>' +
        '                <div class="dropdown-menu" id="card-dropdown-menu">' +
        '                </div>' +
        '            </div>' +
        '            <div class="btn-group w-50">' +
        '                <button class="btn btn-outline-primary w-75 px-0 border-left-0" onclick="create_card()">' +
        '                    <i class="fa fa-pencil"></i>' +
        '                    <small data-chinese="撰写卡片">Write a Card</small>' +
        '                </button>' +
        '                <button class="btn btn-outline-primary w-25 px-0" onclick="" data-toggle="collapse" data-target="#card-search-collapse">' +
        '                    <i class="fa fa-search fa-1"></i>' +
        '                </button>' +
        '            </div>' +
        '        </div>' +
        '        <div class="collapse" id="card-search-collapse">' +
        '            <div class="p-2">' +
        '                <label class="text-primary">search</label>' +
        '                <input class="form-control"/>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>');
    toolbar.find("#card-dropdown-menu").html(
        '<a href="#" class="dropdown-item text-primary" onclick="init_cards_friends()">' +
        '    <i class="fa fa-globe w-25"></i>' +
        '    <small class="w-75" data-chinese="好友卡片">Friend Cards</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="init_cards(sessionStorage.getItem(&quot;user-id&quot;),init_cards_callback)">' +
        '    <i class="fa fa-home w-25"></i>' +
        '    <small class="w-75" data-chinese="我的卡片">My Cards</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="gotoAlbum()">' +
        '    <i class="fa fa-picture-o w-25"></i>' +
        '    <small class="w-75" data-chinese="相册">Album</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="">' +
        '    <i class="fa fa-pencil-square-o w-25"></i>' +
        '    <small class="w-75" data-chinese="草稿">Drafts</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="">' +
        '    <i class="fa fa-heart-o w-25"></i>' +
        '    <small class="w-75" data-chinese="收藏">Favorites</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="">' +
        '    <i class="fa fa-comment-o w-25"></i>' +
        '    <small class="w-75" data-chinese="评论">Comments</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="">' +
        '    <i class="fa fa-share-alt w-25"></i>' +
        '    <small class="w-75" data-chinese="转发">Forwards</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="">' +
        '    <i class="fa fa-share w-25"></i>' +
        '    <small class="w-75" data-chinese="分享">Shares</small>' +
        '</a>' +
        '<a href="#" class="dropdown-item text-primary" onclick="">' +
        '    <i class="fa fa-trash-o w-25"></i>' +
        '    <small class="w-75" data-chinese="废纸篓">Trash</small>' +
        '</a>');
    $('.card-field').append(toolbar);
    // 撰写卡片表单区域
    $('.card-field').append(
        '<div class="collapse" id="create-card-collapse">' +
        '<div class="card card-outline-primary card-block" id="create-card-field">' +
        '</div>' +
        '</div>');
    // 倒序遍历卡片数组，加载卡片
    for (i = cards.length - 1; i >= 0; --i) {
        let card = cards[i];
        switch (card["card-type"]) {
            case "article":
                append_card_article(card);
                break;
            case "image":
                append_card_image(card);
                break;
        }
    }
    // 添加回到顶部按键
    $('.card-field').append(
        '<div class="card card-block p-3">' +
        '    <a href="#page-top">' +
        '        <p class="card-text text-center">' +
        '            <small class="text-muted" data-chinese="回到顶部">' +
        '                go back to top' +
        '            </small>' +
        '        </p>' +
        '    </a>' +
        '</div>');

    if (cards.length == 0) {
        console.log("card init callback: cards length == 0");
        return;
    }

    // 修改反色卡片的字体颜色为白色
    $(".card.card-inverse").not(".card-block-normal").find(".card-block .card-text").addClass("text-white");
    $(".card.card-inverse").find(".card-footer .text-muted").removeClass("text-muted").addClass("text-white");
    // 反色卡片加上 card-block-normal 的类之后， card-block 会恢复正常颜色
    $(".card.card-inverse.card-block-normal .card-block").addClass("bg-faded");
    $(".card.card-inverse.card-block-normal .card-block .card-text").addClass("text-gray-dark");
    // 为每一个卡片的 cover image 绑定点击事件
    let CardImages = $('.card-field .card > img');
    $(CardImages).each(function (index, elem) {
        // 设置鼠标悬停样式，设置不支持拖动
        $(this).css({"cursor": "pointer"}).attr({"ondragstart": "return false"});
        // 生成弹窗内容
        let ModalBody =
            "<p>" +
            "   <span class='badge badge-primary' style='padding: .25em .8em .5em .8em;position: relative;top: -0.1em;'>src</span> " +
            "   <a target='_blank' href='" + $(this).attr("src") + "'>" +
            "       <span class='text-underline'>" + $(this).attr("src") + "</span>" +
            "   </a>" +
            "</p>" +
            "<img src='" + $(this).attr("src") + "' style='width: 100%;cursor: pointer;' ondragstart='return false;'>" +
            "<div style='margin-top: 1rem;'>" +
            "   <div class='btn-group text-center' style='width:100%;'>" +
            "       <button class='btn btn-sm btn-outline-primary' style='width:26%;' data-chinese='收藏'> favorite </button>" +
            "       <a href='" + $(this).attr("src") + "' download='" + filename($(this).attr("src"), '/') + "' class='btn btn-sm btn-outline-primary' style='width:26%;'>" +
            "           <span data-chinese='下载'>download</span>" +
            "       </a>" +
            "       <button class='btn btn-sm btn-outline-primary' style='width:24%;' data-chinese='转发'> share </button>" +
            "       <button class='btn btn-sm btn-outline-danger' style='width:24%;' data-chinese='举报'> report </button>" +
            "   </div>" +
            "</div>";
        // 绑定点击事件，点击触发弹窗
        $(this).on("click", function () {
            appendModal("bg-primary text-white", "text-primary", "Card Image", ModalBody, "", false);
            change_system_language(localStorage.getItem("application-language"));
        });
    });
}