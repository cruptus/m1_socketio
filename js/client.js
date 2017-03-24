(function ($) {
    var socket = io.connect('http://localhost:1337');

    $('#loginform').submit(function (event) {
        event.preventDefault();
        socket.emit('login', {
            username : $('#username').val(),
            mail : $('#mail').val()
        })
    });

    /**
     * Connecté
     */
    socket.on('logged', function () {
        $('#login').fadeOut(200);
        $('#tchat').delay(500).fadeIn(200);
        $('#message').focus();
    });

    /**
     * Envoie de message
     */
    $('#form').submit(function (event) {
        event.preventDefault();
        socket.emit('newmsg', {message : $('#message').val()});
        $('#message').val('').focus();
    });

    socket.on('newmsg', function (message) {

    });

    /**
     * Gestion des connectées
     */
    socket.on('newusr', function (user) {
        $('#users').append('<img src="' + user.avatar + '" id="'+ user.id +'" />');
    });

    socket.on('disusr', function (user) {
        $('#'+user.id).remove();
    });
})(jQuery);