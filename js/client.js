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
       $('#login').fadeOut();
       $('#tchat').fadeIn();
    });

    /**
     *
     */


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