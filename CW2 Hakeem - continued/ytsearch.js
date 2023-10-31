$(document).ready(function(){
    var API_KEY = "AIzaSyAYUJirQE2io-hjqAce9IJCQw9D-F6aFNk";   
    var selectedCategories = [];

    $(".category-button").click(function () {
        $(this).toggleClass("selected");
        var categoryKeyword = $(this).data("category");
        var $searchInput = $("#search");
        
        if ($(this).hasClass("selected")) {
           selectedCategories.push(categoryKeyword);
        } else {
            selectedCategories = selectedCategories.filter(item => item !== categoryKeyword);
        }

        var combinedCategories = selectedCategories.join(" ");
        if (combinedCategories !== "") {
            $searchInput.val(combinedCategories);
        } else {
            $searchInput.val("");
        }
    });

    $("#search-button").click(function () {
        var search = $("#search").val();
        var videoDuration = "short";
        videoSearch(API_KEY, search, 12, videoDuration);
    });

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
                    openVideo("https://www.youtube.com/embed/" + item.id.videoId);
                });
        
                var videoTitle = $("<p class='video-title'></p>");
                videoTitle.text(item.snippet.title);
        
                videoContainer.append(thumbnail);
                videoContainer.append(videoTitle);
                videoColumn.append(videoContainer);
                videosContainer.append(videoColumn);
        
                if ((index + 1) % 3 === 0) {
                    $("#videos").append(videosContainer);
                    videosContainer = $("<div class='row'></div>");
                }
            });

            if (videosContainer.children().length > 0){
                $("#videos").append(videosContainer);
            }
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

    $("#addKeywordButton").click(function (){
        $("#keywordPopup").css("display", "block");
    });

    $("#cancelKeyword").click(function (){
        $("#keywordPopup").css("display", "none");
    });

    $("#submitKeyword").click(function () {
        var customKeyword = $("#customKeyword").val();
        if (customKeyword.trim() !== "") {
            var newCategoryButton = $("<button class='category-button' data-category='" + customKeyword + "'>" + customKeyword + "</button>");
            newCategoryButton.click(function () {
                $(this).toggleClass("selected");
                var $searchInput = $("#search");
                if ($(this).hasClass("selected")) {
                    $searchInput.val(customKeyword);
                } else {
                    $searchInput.val("");
                }
            });

            $(".category-buttons").append(newCategoryButton);
            $("#customKeyword").val("");
            $("#keywordPopup").css("display", "none");
        }
    })
});

	function openNW() {
		var NW = window.open("", "Results", "")
		var youtubeurlsrc = document.getElementById("videoFrame").src;
		NW.document.write(youtubeurlsrc + "<br>hello")
		NW;
	}





