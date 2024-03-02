// 初始化系统语言功能
function init_system_language(scope) {
    if (!scope) {
        scope = "body";
    }
    $(scope).find('[data-chinese]').each(function (index, elem) {
        $(elem).attr("data-english", $(elem).text());
    });
}

// 应用系统语言
function change_system_language(lang, scope) {
    let map = {"lang-zh": "chinese", "lang-en": "english"};
    let langName = map[lang];
    if (!scope) scope = "body";
    $(scope).find('[data-' + langName + ']').each(function (index, elem) {
        // $(elem).text($(elem).data(langName));
        $(elem).text($(elem).attr('data-' + langName));
    });
    localStorage["application-language"] = lang;
}

// 重新应用系统语言
function refresh_system_language(scope) {
    change_system_language(localStorage.getItem("application-language"), scope);
}

// 设置系统语言
function select_system_language(button) {
    $('input[name="language"]').attr("checked", false);
    let input = $(button).find('input');
    $(input).attr("checked", true);
    let lang = $(input).attr('id');
    change_system_language(lang);
    set_preferences("application-language", lang, "string");
}