var getUserMedia = require('getusermedia')

// getUserMedia({ video: true, audio: false }, function (err, stream) {
  // if (err) return console.error(err)

//below best for video peer to peer 

// https://www.youtube.com/watch?v=ieBtXwHvoNk
navigator.getUserMedia({ 
  video: true, audio: true }, 
  gotMedia, function (stream) {

// function gotMedia (stream) {

  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  });

  peer.on('signal', function (data) {
       console.log(data);
    document.getElementById('yourId').value = JSON.stringify(data);
  });

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  });

  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    peer.send(yourMessage)
  });

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n'
  });

  peer.on('stream', function (stream) {
    var video = document.createElement('video')
    document.body.appendChild(video)

    video.src = window.URL.createObjectURL(stream)
    video.play()
  });
// };
}, (er) => {
  console.error(er.message);
});