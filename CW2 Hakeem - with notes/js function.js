    function videoSearch(key, search, maxResults, videoDuration) {
        $("#videos").empty();
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search + "&videoDuration=" + videoDuration, 
        function(data){
            var videosContainer = $("<div class='row'></div>");
            console.log(data);
            data.items.forEach(function (item, index) {
                var videoColumn = $("<div class='col-md-4'></div>");
                var videoContainer = $("<div class='video-container'></div>");
        
                // Create an image or link to represent the video thumbnail and trigger the pop-up
                var thumbnail = $("<img src='" + item.snippet.thumbnails.medium.url + "' alt='Video Thumbnail'>");
                thumbnail.on("click", function () {
						var vidContainer = document.getElementById("vid_container");
						vidContainer.innerHTML = 
						`<iframe src = "https://www.youtube.com/embed/" + item.id.videoId frameborder="0" allowfullscreen></iframe>`
						window.open("file.html");
                });