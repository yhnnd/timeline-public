function gotoAlbum() {
    initAlbum(function () {
        $('[data-toggle="tab"][href="#album"]').click();
    });
}