$(document).ready(function(){
    var API_KEY = "AIzaSyAYUJirQE2io-hjqAce9IJCQw9D-F6aFNk";   

    $("#form").submit(function (event) {
        event.preventDefault();
        var search = $("#search").val();
        var videoDuration = "short";
        videoSearch(API_KEY, search, 12, videoDuration);
    })

    function videoSearch(key, search, maxResults, videoDuration) {

        $("#videos").empty()
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search + "&videoDuration=" + videoDuration, 
        function(data){
            var videosContainer = $("<div class='row'></div>");
            console.log(data);
            data.items.forEach(item => {
                var videoColumn = $("<div class='col-md-4'></div>");
                var videoContainer = $("<div class='video-container'></div>");
        
                // Create an image or link to represent the video thumbnail and trigger the pop-up
                var thumbnail = $("<img src='" + item.snippet.thumbnails.medium.url + "' alt='Video Thumbnail'>");
                thumbnail.on("click", function () {
                    openVideo("https://www.youtube.com/embed/" + item.id.videoId);
                });
        
                var videoTitle = $("<p class='video-title'></p>");
                videoTitle.text(item.snippet.title);
        
                videoContainer.append(thumbnail);
                videoContainer.append(videoTitle);
                videoColumn.append(videoContainer);
                videosContainer.append(videoColumn);
        
                if (data.items.indexOf(item) % 3 === 2) {
                    $("#videos").append(videosContainer);
                    videosContainer = $("<div class='row'></div>");
                }
            })
        })
    }

    var videoScreen = document.getElementById("videoScreen");
    var videoFrame = document.getElementById("videoFrame");

    function openVideo(videoUrl) {
        videoFrame.src = videoUrl;
        videoScreen.style.display = "block";
    }

    function closeVideo() {
        videoFrame.src = "";
        videoScreen.style.display = "none";
    }

    var closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", closeVideo);
    
    window.onclick = function(event) {
        if (event.target === videoScreen) {
            closeVideo();
        }
    }
});

