var http = require('http');
var md5 = require('md5');

httpServer = http.createServer(function (req, res) {
    console.log('Un utilisateur a affiche la page')
});
httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

var users = {};

io.sockets.on('connection', function (socket) {
    var me = false;
    console.log('Nouveau utilisateur');

    for(var k in users){
        console.log(users.length);
        socket.emit('newusr', users[k]);
    }

    /**
     * Je me connecte
     */
    socket.on('login', function (user) {
        me = user;
        me.id = user.mail.replace('@', '-').replace('.','-');
        me.avatar = 'https://gravatar.com/avatar/' + md5(user.mail) + '?s=50';
        socket.emit('logged');
        users[me.id] = me;
        io.sockets.emit('newusr', me);
    });

    /**
     * Je quitte le tchat
     */
    socket.on('disconnect', function () {
        if(!me){
            return false;
        }
        delete users[me.id];
        io.sockets.emit('disusr', me);
    });

    /**
     * On a reçu un message
     */
    socket.on('newmsg', function (message) {
       message.user = me;
       date = new Date();
       message.h = date.getHours();
       message.m = date.getMinutes();
       io.sockets.emit('newmsg', message);
    });
});