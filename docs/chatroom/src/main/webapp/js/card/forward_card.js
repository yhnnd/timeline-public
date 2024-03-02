// 去掉数组 array 中属性 property 值相同的元素
// $.unique 和 _.uniq 均无效
function unique(array, property) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i][property] === array[j][property]) {
                array.splice(j, 1);
                j--;
            }
        }
    }
    return array;
}


function forward_card(card_id) {
    let modalTitle = '<i class="fa fa-share pl-2 pr-3 pr-md-4 pr-lg-5"></i><span data-chinese="转发卡片">Share Card</span>';
    appendModal("text-primary", "", modalTitle, "", "", false);
    let userId = sessionStorage.getItem("user-id");
    if (userId) {
        get_friends_by_userid(userId, function (userId, friends) {
                friends = unique(friends, "userid");
                let modalBody = $('.modal-body');
                for (i = 0; i < friends.length; ++i) {
                    let friend = friends[i];
                    if (friend.userid != userId) {
                        get_user_and_room_by_friendid(friend.userid, function (userAndRoom) {
                            if ([4, 8].includes(userAndRoom["status-code"])) {
                                let $user = $("<div class='row p-1'>");
                                $user.append("<div class='col-4 col-sm-4 col-md-3 col-lg-2'><img class='rounded-circle' src='" + friend.avatar + "' style='width:2rem;height:2rem;'></div>");
                                $user.append("<div class='col-8 col-sm-8 col-md-9 col-lg-10'><span>" + friend.username + "</span></div>");
                                $user.on("click", function () {
                                    let params = {
                                        "card-id": card_id,
                                        "sender-id": userId,
                                        "receiver-id": friend.userid
                                    };
                                    sendMessage(userAndRoom["roomid"], getWebRoot() + "/card-page.html?" + parseParam(params), "url");
                                });
                                modalBody.append($user);
                            }
                        });
                    }
                }
            }
        );
    }
}