function selectMessageTextStyle(select) {
    $('#text-style,.message-body-sample .message-text')
        .removeClass('text-primary text-success text-info text-warning text-danger text-muted text-gray-dark')
        .addClass('text-' + $(select).val());
}