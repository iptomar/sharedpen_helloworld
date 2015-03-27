
$( document ).ready(function() {
  var socket = io.connect('http://localhost:8080');

  socket.on('welcome', function (data) {
    $('#panel').append('Connected to server<br/>');
  });

  socket.on('message', function (data) {
    $('#panel').append(data.data + '<br/>');
  });


  $('#btnSend').click(function() {
    var aux = $('#msg').val();
    $('#msg').val('');
    socket.emit('message', {'data': aux});
  });
});
