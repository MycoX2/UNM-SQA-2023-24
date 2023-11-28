$(document).ready(function(){
    var API_KEY = "AIzaSyAYUJirQE2io-hjqAce9IJCQw9D-F6aFNk";
    // var API_KEY = "AIzaSyASw0iFX4bRcwz10Lmm12CdTgxF-NLzve4"; 

    var selectedCategories = new Set();
    // Determine whether to use the stored query or default query
    var defaultQuery = "Software Quality Assurance";
        
    // Fetch and display search results with the determined query
    videoSearch(API_KEY, defaultQuery, 12, "short");


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

    // Handle search button
    $("#search-button").click(function () {
        var search = $("#search").val();
        var videoDuration = "short";

        videoSearch(API_KEY, search, 12, videoDuration);
    });

    // + button function to add keyword
    $("#addKeywordButton").click(function (){
        console.log("Add Custom Keyword clicked");
        $("#keywordPopup").css("display", "block");
    });

    // cancel button to close add keyword textbox
    $("#cancelKeyword").click(function (){
        $("#keywordPopup").css("display", "none");
    });

    // confirm button to add a keyword button
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
    
    // Function to clear all self-added keywords
    $("#clearAllKeywords").click(function () {
        localStorage.removeItem("customKeywords");
        $(".custom-category-button").remove(); // Remove custom buttons from the DOM
        selectedCategories.clear(); // Clear the selectedCategories set
        updateSearchInput();

        location.reload();
    });

    // search video according to input
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
                        var videoId = item.id.videoId;
                        localStorage.setItem('selectedVideoId', videoId);
                        window.location.href = 'videoPlayer.html';
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
            });
    }
});
