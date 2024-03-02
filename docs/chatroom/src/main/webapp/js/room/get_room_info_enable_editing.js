function get_room_info_enable_editing(room, manager, ValueNames) {
    // 如果用户有修改房间名的权限
    if (manager["change-room-name"] === 1) {
        // 找到房间名显示区
        let roomNameField = $(".modal-body span").filter(function (index) {
            return $(this).children().length === 0 && $(this).text().trim() === ValueNames["room-name"];
        }).closest("p");
        let changeRoomNameField =
            '<div class="collapse" id="change-room-name-collapse">' +
            '   <div class="form-group">' +
            '       <div class="input-group input-group-sm">' +
            '           <span class="input-group-addon" style="cursor: pointer;">' + ValueNames["room-name"] + '</span>' +
            '           <input type="text" class="form-control" id="new-room-name">' +
            '           <div class="input-group-btn">' +
            '               <button class="btn btn-primary" onclick="change_room_name(' + room.roomid + ')" data-chinese="确认">confirm</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>';
        // 在房间名显示区下添加编辑区
        $(roomNameField).attr({
            "data-toggle": "collapse",
            "data-target": "#change-room-name-collapse"
        }).after(changeRoomNameField);
        // 设置输入框默认值为当前房间名
        $("#new-room-name").attr("value", room.name);
    }
    // 如果用户有修改房间类型的权限
    if (manager["change-room-type"] === 1) {
        // 找到房间类型显示区
        let roomTypeField = $(".modal-body span").filter(function (index) {
            return $(this).children().length === 0 && $(this).text().trim() === ValueNames.type;
        }).closest("p");
        let changeRoomTypeField =
            '<div class="collapse" id="change-room-type-collapse">' +
            '   <div class="form-group">' +
            '       <div class="input-group input-group-sm">' +
            '           <span class="input-group-addon" style="cursor: pointer;">' + ValueNames.type + '</span>' +
            '           <select type="text" class="form-control" id="new-room-type">' +
            '               <option value="public">public</option>' +
            '               <option value="private">private</option>' +
            '               <option value="secret">secret</option>' +
            '           </select>' +
            '           <div class="input-group-btn">' +
            '               <button class="btn btn-primary" onclick="change_room_type(' + room.roomid + ')" data-chinese="确认">confirm</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>';
        // 在房间类型显示区下添加编辑区
        $(roomTypeField).attr({
            "data-toggle": "collapse",
            "data-target": "#change-room-type-collapse"
        }).after(changeRoomTypeField);
        // 选中当前房间类型
        $("#new-room-type").find("[value='" + room.type + "']").attr("selected", true);
    }
    // 如果用户有修改房间 live 的权限
    if (manager["change-room-live"] === 1) {
        // 找到房间 live 显示区
        let roomLiveField = $(".modal-body span").filter(function (index) {
            return $(this).children().length === 0 && $(this).text().trim() === ValueNames.live;
        }).closest("p");
        let changeRoomLiveField =
            '<div class="collapse" id="change-room-live-collapse">' +
            '   <div class="form-group">' +
            '       <div class="input-group input-group-sm">' +
            '           <span class="input-group-addon" style="cursor: pointer;">' + ValueNames.live + '</span>' +
            '           <select type="text" class="form-control" id="new-room-live">' +
            '               <option value="1">yes</option>' +
            '               <option value="0">no</option>' +
            '           </select>' +
            '           <div class="input-group-btn">' +
            '               <button class="btn btn-primary" onclick="change_room_live(' + room.roomid + ')" data-chinese="确认">confirm</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>';
        // 在房间类型显示区下添加编辑区
        $(roomLiveField).attr({
            "data-toggle": "collapse",
            "data-target": "#change-room-live-collapse"
        }).after(changeRoomLiveField);
        // 选中当前房间 live
        $("#new-room-live").find("[value='" + room.live + "']").attr("selected", true);
    }
}