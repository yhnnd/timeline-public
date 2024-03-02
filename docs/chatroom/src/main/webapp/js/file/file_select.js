// 返回文件名（去掉路径）
function filename(str, slash) {
    let arr = str.split(slash ? slash : '\\');
    return arr[arr.length - 1];
}

// 在 FileControl 中显示 input 的 value（保留 FileControl 原内容）
function file_selected(input) {
    let fileControl = $(input).siblings(".custom-file-control").eq(0);
    if ($(fileControl).data("title") == undefined) {
        $(fileControl).attr("data-title", $(fileControl).text());
    }
    $(fileControl).html($(fileControl).data("title") + "&nbsp;<small>" + filename($(input).val()) + "</small>");
}

// 在 FileControl 中显示 input 的 value（不保留 FileControl 原内容）
function file_select_truncate(input) {
    let fileControl = $(input).siblings(".custom-file-control").eq(0);
    $(fileControl).html("<small>" + filename($(input).val()) + "</small>");
}

// 返回文件的拓展名
function file_ext(filename) {
    let arr = filename.split('.');
    return arr[arr.length - 1];
}