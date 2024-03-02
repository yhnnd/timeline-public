function selectMessageBackgroundStyle(select) {
    $('#text-style,.message-body-sample .message-text')
        .removeClass('alert-primary alert-secondary alert-success alert-info alert-warning alert-danger alert-light alert-dark')
        .addClass('alert-' + $(select).val());
}