// Basic client-side behaviors:
// - Subscribe form: simple client-only success flow
// - Video play/pause toggle for hero video

document.addEventListener('DOMContentLoaded', function () {
  // Video controls
  var video = document.getElementById('heroVideo');
  var playBtn = document.getElementById('videoPlay');

  if (video && playBtn) {
    playBtn.addEventListener('click', function () {
      if (video.paused) {
        video.muted = false;
        video.play().catch(function(){ /* autoplay blocked */ });
        playBtn.textContent = 'Pause';
      } else {
        video.pause();
        playBtn.textContent = 'Play';
      }
    });
  }

  // Subscribe form
  var form = document.getElementById('subscribeForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();

      if (!email) {
        alert('Please enter a valid email address.');
        return;
      }

      // Demo-only: show a success message
      form.innerHTML = '<p style="font-weight:600;">Thanks ' + (name ? name : '') + '! You are subscribed to REAL ESTATE EDGE — check your inbox.</p>';
    });
  }
});