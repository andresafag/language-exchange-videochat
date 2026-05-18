import { connect } from 'livekit-client';

async function joinRoom() {
  const roomId = "#{sala.id}"; // Pug will interpolate this
  const name = sessionStorage.getItem('userName') || "Invitado";

  // Fetch token from backend
  const token = await fetch(`/getToken?room=${roomId}&name=${name}`).then(r => r.text());

  // Connect to LiveKit
  const room = await connect("wss://3.229.212.146:7881", token, {
    audio: true,
    video: true
  });

  // Show local video
  room.localParticipant.videoTracks.forEach(pub => {
    const el = pub.track.attach();
    document.getElementById('video-grid').append(el);
  });

  // Handle remote participants
  room.on('participantConnected', participant => {
    participant.on('trackSubscribed', track => {
      const el = track.attach();
      document.getElementById('video-grid').append(el);
    });
  });

  room.on('participantDisconnected', participant => {
    participant.tracks.forEach(pub => {
      if (pub.track) {
        const el = pub.track.attach();
        el.remove();
      }
    });
  });
}

joinRoom();
