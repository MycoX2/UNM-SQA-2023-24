function playVideo(videoId) {
    //create a youtube player in the 'video-container' div
    //with the specified videoId
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'VIDEO_ID',
        events: {
            'onReady': onPlayerReady,
        }
    });

    //function to autoplay the video when the player is ready
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    //function playVideo(videoId) {

        player.loadVideoById(videoId);
   // }
}