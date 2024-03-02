function selectUsernameTextStyle(select) {
    $('#badge-style,#username-text-style,.message-body-sample .badge')
        .removeClass('text-primary text-success text-info text-warning text-danger text-muted text-gray-dark')
        .addClass('text-' + $(select).val());
}