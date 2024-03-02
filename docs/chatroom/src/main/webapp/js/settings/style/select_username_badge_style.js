function selectUsernameBadgeStyle(select) {
    let label = $('#badge-style,#username-text-style,.message-body-sample .badge');
    label.removeClass('badge-primary bg-primary bg-success bg-info bg-warning bg-danger badge-default bg-inverse');
    if ($(select).val() == 'default') {
        // Bootstrap has no class bg-default, so we use badge-default instead
        label.addClass('badge-' + $(select).val());
    } else {
        label.addClass('bg-' + $(select).val());
    }
}