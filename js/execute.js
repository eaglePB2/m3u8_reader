// your_script.js
$(document).ready(function () {
  var mediaSource = new MediaSource();
  var videoElement = document.getElementById("video");
  videoElement.src = URL.createObjectURL(mediaSource);

  var mimeType = 'application/vnd.apple.mpegurl'; // Use the correct MIME type for HLS videos
  var hls;

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.attachMedia(videoElement);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      loadNewVideo($("#url").val());
    });
  } else if (videoElement.canPlayType(mimeType)) {
    videoElement.addEventListener("canplay", function () {
      videoElement.play();
    });
    videoElement.src = $("#url").val();
  } else {
    console.error("HLS is not supported on this browser");
  }
  
  $("#btn").on("click", function () {
    var newUrl = $("#url").val();
    if (hls) {
      loadNewVideo(newUrl);
    } else {
      videoElement.src = newUrl;
    }
  });

  function loadNewVideo(url) {
    if (hls) {
      hls.destroy();
      hls = new Hls();
      hls.attachMedia(videoElement);
      hls.loadSource(url);
    }
  }
});
