function processUserInput(chatApp, socket){
    var message = $('#send-message').val();
    var systemMessage;

    if(message.charat(0) == '/'){
        systemMessage = chatApp.processCommand(message);
        if(systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }else{
        chatApp.sendMesage($('#room').text(), message);
        $('#messages').append(divEscapedConentElement(message));
        $('#messages').scrollTop($('#message').prop('scrollHeight'));
    }

    $('#send-message').val('');
}

var socket = io.connect();
$(document).read(function(){
    var chatApp = new Chat(socket);
    socket.on('nameResult', function(result){
        var message;

        if(result.success){
            message = 'You are now know as ' + result.name + '.';
        }else{
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });

    socket.on('joinResult', function(result){
        $('#room').text(result.room);
        $('#message').append(divSystemContentElement('Room changed.'));
    });

    socket.on('message', function(message){
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });

    socket.on('rooms', function(rooms){
        $('#room-list').empty();

        for(var room in rooms){
            room = room.substring(1, room.length);
            if(room != ''){
                $('#room-list').append(divEscapedConentElement(room));
            }
        }

        $('#room-list div').click(function(){
            chatApp.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        });
    });

    setInerval(function(){
        socket.emit('rooms');
    }, 1000);

    $('#send-message').focus();

    $('#send-form').submit(function(){
        processUserInput(chatApp, socket);
        return false;
    });
});
