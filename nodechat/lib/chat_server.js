var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nicknames = {};
var namesUsed = [];
var currentRoom = {};


exports.listen = function(server){
    io = socketio.listen(server);
    io.set('log level', 1);
    io.socket.on('connection', function(socket){
        guestNumber = assignGuestName(socket, guestNumber,
                                     nickNames, namesUsed);
        joinRoom(socket, 'Lobby');

        handleMessageBroadcasting(socket, nickNmaes);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        socket.on('rooms', function(){
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        handleClientDisconnecting(socket, nickNames, namesUsed);
    });
};


function assignGuestName(socket, guestNumber, nickNames, namesUsed){
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name,
    });
    namesUsed.push(name);
    return guestNumber + 1;
}


function joinRoom(socket, room){
    socket.join(room);
    currentRoom[socket.io] = rooms;
    socket.emit('joinresult', {room: room});
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + 'has joined ' + room + '.'
    });

    var usersInRoom = io.sockets.clients(room);
    if(usersInRoom.length > 1){
        var userInRoomSummary = 'Users currently in ' + room + ': ';
        for(var index in usersInRoom){
            var userSocketId = usersInRoom[index].id;
            if(userSocketId != socket.id){
                if(index > 0){
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
}


function handleNameChangeAttempts(socket, nickName, namesUsed){
    socket.on('nameAttempt', function(name){
        if(name.indexOf('Guest') == 0){
            socket.emit('nameResult', {
                success: false,
                message: 'Names cannot begin with *Guest*.'
            });
        }else{
            if(namesUsed.indexOf(name) == -1){
                var previouseName = nickNames[socket.id];
                var previouseNameIndex = namesUsed.indexOf(previouseName);
                namesUsed.push(name);
                nickNames[socket.id] = name;

                delete namesUsed[previouseNameIndex];
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previouseName + ' is now known as ' + name + '.'
                });
            }else{
                socket.emit('nameResult', {
                    success: false,
                    message: 'That name is already in use.'
                });
            }
        }
    });
}
