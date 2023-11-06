$(document).ready(function(){
    var API_KEY = "AIzaSyAYUJirQE2io-hjqAce9IJCQw9D-F6aFNk";
    var selectedCategories = new Set();

    // Function to handle category button click
    function handleCategoryClick() {
        var categoryKeyword = $(this).data("category");

        if (selectedCategories.has(categoryKeyword)) {
            selectedCategories.delete(categoryKeyword);
        } else {
            selectedCategories.add(categoryKeyword);
        }

        $(this).toggleClass("selected");
        updateSearchInput();
    }

    // Load predefined categories
    $(".category-button").on("click", handleCategoryClick);

    // Load custom keywords from local storage
    var customKeywords = localStorage.getItem("customKeywords");
    if (customKeywords) {
        customKeywords = JSON.parse(customKeywords);
        customKeywords.forEach(function(keyword) {
            addCustomCategoryButton(keyword);
            if (selectedCategories.has(keyword)) {
                $(".category-button[data-category='" + keyword + "']").addClass("selected");
            }
        });
    }

    // Function to add custom category button
    function addCustomCategoryButton(keyword) {
        var newCategoryButton = $("<button class='category-button' data-category='" + keyword + "'>" + keyword + "</button>");
        newCategoryButton.on("click", handleCategoryClick);
        $(".category-buttons").append(newCategoryButton);
    }

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

        // + button function
        $("#addKeywordButton").click(function (){
            console.log("Add Custom Keyword clicked");
            $("#keywordPopup").css("display", "block");
        });

        $("#cancelKeyword").click(function (){
            $("#keywordPopup").css("display", "none");
        });

        $("#submitKeyword").click(function () {
            var customKeyword = $("#customKeyword").val();
            if (customKeyword.trim() !== "") {
                var customKeywords = localStorage.getItem("customKeywords");
                if (customKeywords) {
                    customKeywords = JSON.parse(customKeywords);
                    customKeywords.push(customKeyword);
                } else {
                    customKeywords = [customKeyword];
                }
                localStorage.setItem("customKeywords", JSON.stringify(customKeywords));
    
                addCustomCategoryButton(customKeyword);
                updateSearchInput();
    
                // Clear the input and close the popup
                $("#customKeyword").val("");
                $("#keywordPopup").css("display", "none");
            }
        });
    
        // Function to update the search input
        function updateSearchInput() {
            var combinedCategories = Array.from(selectedCategories).join(" ");
            var $searchInput = $("#search");
            $searchInput.val(combinedCategories);
        }
        
        $("#clearAllKeywords").click(function () {
            localStorage.removeItem("customKeywords");
            $(".custom-category-button").remove(); // Remove custom buttons from the DOM
            selectedCategories.clear(); // Clear the selectedCategories set
            updateSearchInput();

            location.reload();
        });
    });