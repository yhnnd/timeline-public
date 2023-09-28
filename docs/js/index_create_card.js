function createCard() {
    $(".create-card-error-messge-wrapper").hide();

    let init_args = getScopeAndCardToCreate();
    let $scope = init_args.$scope;
    let card = init_args.card;
    if (!createCardValidate($scope, card)) {
        return false;
    }

    // 如果撰写的卡片是 Quill 卡片，就调用上传 Quill 卡片的函数
    if ($(".nav-link.active").attr("href") === "#create-quill-card") {
        createQuillCard($scope, card);
        return;
    }

    // 如果卡片未指定版本号, 自动在卡片正文末尾追加版本号
    if (!_.some(card.text.split("\n"), function(line) {
        return line.startsWith("@wecard_version(");
    })) {
        card.text += "\n\n@wecard_version(" + appVersion.version + ")";
    }
    
    // 如果撰写的卡片是图片卡片，就调用上传图片卡片的函数
    if ($(".nav-link.active").attr("href") === "#create-image-card") {
        createImageCard($scope, card);
        return;
    }

    // startLoading(max.loading.delay.time);
    let formData = new FormData();
    formData.append("title", card.title);
    formData.append("text", card.text);
    for (let i = 0; i < card.topics.length; ++i) {
        formData.append("topics", card.topics[i]);
    }

    $.ajax({
        url: $scope.httpRoot + apis.create.card.text,
        type: 'POST',
        data: formData,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        processData: false,
        contentType: false,
        success: function (resultData) {
            // stopLoading();
            let result = {
                "data": resultData
            };
            switch (result.data.message) {
                case "Please login":
                    createCardAlert("[ERROR] createCard(): 请先登录");
                    break;
                case "card title too long":
                    createCardAlert("[ERROR] createCard(): 文本标题过长");
                    break;
                case "card text too long":
                    createCardAlert("[ERROR] createCard(): 文本内容过长");
                    break;
                case "card create failed":
                    createCardAlert("[ERROR] createCard(): 卡片上传失败");
                    saveCardAsDraft($scope.user, card, "text");
                    break;
                case "card create success":
                    if (result.data.card) {
                        $scope.card_to_create.type = "";
                        $scope.card_to_create.title = "";
                        $scope.card_to_create.text = "";
                        $scope.card_to_create.topics = [];
                        $scope.$apply();
                        $scope.alert("createCard()", "上传卡片成功", "alert-success");
                        v2_7.empty();
                    } else {
                        createCardAlert("[ERROR] createCard(): 卡片上传成功了，但是服务器没有返回（添加到数据库中的）卡片对象");
                    }
                    break;
                default:
                    createCardAlert("[ERROR] createCard(): 未知错误：" + result.data.message);
                    saveCardAsDraft($scope.user, card, "text");
                    break;
            }
        },
        error: function (result) {
            createCardAlert("[ERROR] createCard(): 与服务器连接失败 错误代码: " + result.status);
            saveCardAsDraft($scope.user, card, "text");
        }
    });
}


function getScopeAndCardToCreate() {
    const model = document.querySelector('[ng-controller="controller"]');
    const $scope = angular.element(model).scope();
    if (!$scope) {
        console.log("[ERROR] getScopeAndCardToCreate(): 找不到 $scope, 请联系开发人员检查代码");
        return false;
    }
    const card = $scope.card_to_create;
    if (!card) {
        console.log("[ERROR] getScopeAndCardToCreate(): 找不到要上传的卡片, 请联系开发人员检查代码");
        return false;
    }
    const clone = window.structuredClone ?
    window.structuredClone : function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    return {
        "$scope": $scope,
        "card": clone(card)
    };
}


function createCardValidate($scope, card) {
    let missing_arg = undefined;
    if (!$scope) {
        missing_arg = " $scope";
        // no return, go on
    } else if (!card) {
        missing_arg = "要上传的卡片";
        // no return, go on
    }
    if (missing_arg) {
        createCardAlert("[ERROR] createCard(): 找不到" + missing_arg + ", 中止卡片上传");
        return false;
    } else if ($scope.my_topic) {
        createCardAlert("[ERROR] createCard(): 正在编辑的话题未添加到卡片中, 中止卡片上传");
        return false;
    } else if (!(card.title && card.title.trim())) {
        // if card.title is "", then card.title is false, and card.title.trim() is also false
        // if card.title is " ", then card.title is true, but card.title.trim() is false
        // if card.title is not "" or " ", then card.title is true, and card.title.trim() is also true
        if ($scope.writeCard.editorType === "v2_7" && !card.text) {
            createCardAlert("[ERROR] createCard(): 卡片标题和卡片正文不能同时为空, 中止卡片上传");
            return false;
        } else if ($scope.writeCard.editorType === "quill") {
            createCardAlert("[ERROR] createCard(): 卡片标题不能为空, 中止卡片上传");
            return false;
        }
    }
    return true;
}


function createCardAlert(errorMsg) {
    $(".create-card-error-messge-wrapper")
        .show()
        .find(".create-card-error-messge")
        .text(errorMsg);
}



function getDraftCardIds () {
    let ids = window.localStorage.getItem("draft_card_ids");
    if (ids !== undefined && typeof ids === "string") {
        ids = JSON.parse(ids);
    }
    if (ids instanceof Array === false) {
        ids = [];
    }
    return ids;
}

function saveDraftCardIds (ids) {
    if (ids instanceof Array) {
        return window.localStorage.setItem("draft_card_ids", JSON.stringify(ids));
    } else {
        console.error("saveDraftCardIds: invalid parameter type for 'ids'", ids);
    }
}

function getDraftCreateTime (draft) {
    const createTime = draft["createTime"];
    if (createTime !== undefined) {
        const date = new Date();
        date.setTime(parseInt(createTime));
        return date;
    } else {
        return "no record";
    }
}

function getDraft (draftId) {
    const draftStr = window.localStorage.getItem("draft_card_" + draftId);
    if (draftStr !== undefined && typeof draftStr === "string") {
        const draft = JSON.parse(draftStr);
        draft.getCreateTime = function () {
            return getDraftCreateTime(draft);
        }
        return draft;
    } else {
        console.error("getDraft: no draft with id " + draftId);
    }
}

function saveDraft (draftId, createTime, user, card) {
    return window.localStorage.setItem("draft_card_" + draftId, JSON.stringify({
        "id": draftId,
        "createTime": createTime,
        "user": {
            "id": user.id,
            "username": user.username,
            "nickname": user.nickname,
            "avatarUrl": user.avatarUrl,
        },
        "card": card
    }));
}

function removeDraft (draftId) {
    saveDraftCardIds(getDraftCardIds().filter(elem => elem !== draftId));
    window.localStorage.removeItem("draft_card_" + draftId);
}

function saveCardAsDraft(user, card, apiType) {
    if (user && user.id) {
        card.apiType = apiType;
        // generate draft id
        const createTime = Date.now();
        const draftId = window.getRandomString().substring(0,12) + "-" + createTime;
        // save draft
        saveDraft(draftId, createTime, user, card);
        // get draft id list
        let ids = getDraftCardIds();
        // push the id of current draft to draft id list
        ids.push(draftId);
        // save new draft id list
        saveDraftCardIds(ids);
    } else {
        console.log("saveCardAsDraft: save draft failed, no user logged in.");
    }
}