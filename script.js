// Lazy YouTube embed and flexible subscribe handling.
//
// How to change the hero video:
// - Edit the data-video-id attribute on the #ytThumb element in index.html.
//   Example: data-video-id="nGeXAXmhyAA"
//
// Subscribe options:
// - Simple redirect to a Google Form: set data-gform-redirect on the form to your Google Form URL.
// - Programmatic: set data-endpoint to a Formspree or API endpoint and the code will POST JSON.

document.addEventListener('DOMContentLoaded', function () {
  // --- YouTube lazy embed using data-video-id ---
  var ytThumb = document.getElementById('ytThumb');
  if (ytThumb) {
    function loadYouTube() {
      var videoId = ytThumb.getAttribute('data-video-id');
      if (!videoId) return;
      var iframe = document.createElement('iframe');
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      // autoplay=1 for immediate play on click
      iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&rel=0';
      // Replace thumbnail with iframe
      ytThumb.parentNode.replaceChild(iframe, ytThumb);
    }

    // Click and keyboard (Enter/Space) to play
    ytThumb.addEventListener('click', loadYouTube);
    ytThumb.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadYouTube();
      }
    });
  }

  // --- Subscribe form handling ---
  var form = document.getElementById('subscribeForm');
  if (form) {
    var redirectUrl = form.getAttribute('data-gform-redirect'); // default: redirect to a Google Form
    var endpoint = form.getAttribute('data-endpoint'); // if provided, send programmatically

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();

      if (!email) {
        alert('Please enter a valid email address.');
        return;
      }

      // Option 1: Redirect to Google Form (simple, no backend)
      if (redirectUrl && (redirectUrl.indexOf('forms.gle') !== -1 || redirectUrl.indexOf('docs.google.com/forms') !== -1)) {
        // Open the Google Form in a new tab so the user can submit and responses land in your Google Sheet.
        window.open(redirectUrl, '_blank');
        form.querySelector('.subscribe-note').textContent = 'You will be redirected to complete subscription.';
        return;
      }

      // Option 2: Programmatic POST to an endpoint (e.g., Formspree)
      if (endpoint) {
        fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: name, email: email})
        }).then(function (res) {
          if (res.ok) {
            form.innerHTML = '<p style="font-weight:600;">Thanks ' + (name ? name : '') + '! You are subscribed to REAL ESTATE EDGE — check your inbox.</p>';
          } else {
            return res.text().then(function(t){ throw new Error(t || 'Submit failed'); });
          }
        }).catch(function (err) {
          alert('Subscription failed. Please try again later.');
          console.error(err);
        });
        return;
      }

      // Default fallback: show a success message locally
      form.innerHTML = '<p style="font-weight:600;">Thanks ' + (name ? name : '') + '! You are subscribed to REAL ESTATE EDGE — check your inbox.</p>';
    });
  }
});