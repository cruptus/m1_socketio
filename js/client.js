(function ($) {
    var socket = io.connect('http://localhost:1337');

    $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 50);

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
        $('#room').delay(500).fadeIn(200);
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
        var content = $('<p></p>').text(message.message).html();
        var username = $('<h4></h4>').text(message.user.username).html();
        $('#messages').append('<div class="col-xs-offset-1 col-xs-10 msg"><h4>'+username+'</h4><p>'+message.h+':'+message.m+'</p><p>'+content+'</p></div>');
        $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 50);
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