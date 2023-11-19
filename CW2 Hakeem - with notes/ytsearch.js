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
		//makes sure iframe is asynchronous
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		   
        $("#videos").empty();
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search + "&videoDuration=" + videoDuration, 
		
        function(data){
			//populateVideoSelector(data.items);
            var videosContainer = $("<div class='row'></div>");
            console.log(data);
            data.items.forEach(function (item, index) {
                var videoColumn = $("<div class='col-md-4'></div>");
                var videoContainer = $("<div class='video-container'></div>");
		
                // Create an image or link to represent the video thumbnail and trigger the pop-up
                var thumbnail = $("<img src='" + item.snippet.thumbnails.medium.url + "' alt='Video Thumbnail'>");
                thumbnail.on("click", function () {
							//initialize player
							window.player;
							
							//create player function
							window.onYouTubeIframeAPIReady = function() {
								player = new YT.Player('player', {
								height: "315",
								width: "560",
								playerVars: {
									'playsinline': 1
								},
								events: {
									'onReady': onPlayerReady,
									}
								});
								 player.loadVideoById(item.id.videoId);
							  }
							  
							   function onPlayerReady(player){
								   videoScreen.style.display = "block"
								   player.playVideo();
							   }
							//load videoId
							onPlayerReady();
							
							//openVideo("https://www.youtube.com/embed/" + item.id.videoId +"?enablejsapi=1"); 
						 
						 (function () {
							var textFile = null,
							  makeTextFile = function (text) {
								var data = new Blob([text], {type: 'text/plain'});

								// If we are replacing a previously generated file we need to
								// manually revoke the object URL to avoid memory leaks.
								if (textFile !== null) {
								  window.URL.revokeObjectURL(textFile);
								}

								textFile = window.URL.createObjectURL(data);

								return textFile;
							  };
							  
								var link = document.getElementById("downloadlink");
								link.href = makeTextFile("https://www.youtube.com/embed/" + item.id.videoId)})()
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
			
			window.videoData = data;

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
	
	//note-taking functionality
/*	const notesList = document.getElementById("notes-list");
	const noteText = document.getElementById("note-text");
	const addNoteButton = document.getElementById("add-note");
	const videoSelector = document.getElementById("video-selector");
	const loadVideoButton = document.getElementById("load-video");
	let currentVideoId = null;
	let player;
	let highlightInterval;
			
	function populateVideoSelector(videoData) {
	  videoSelector.innerHTML = "";

	     //data.items.forEach(function (item, index) {
		videoData.forEach((item) => {
	    const videoId = item.id.videoId;
	    const videoTitle = item.snippet.title;

	    const option = document.createElement("option");
	    option.value = videoId;
	    option.text = videoTitle;
	    videoSelector.appendChild(option);
	    })
	}
	  
	  addNoteButton.addEventListener("click", () => {
	  const text = noteText.value.trim();
	  if (text === "" || !currentVideoId) return;

	  const timestamp = document.getElementById("videoFrame").getCurrentTime();

	  const note = {
		videoId: currentVideoId,
		timestamp: timestamp,
		text: text,
	  };

	  addUniqueIdToNote(note); // Add a unique ID to the note
	  displayNoteInList(note);
	  saveNoteToLocalStorage(note);

	  noteText.value = "";
	});
	
	// Event listener for loading a selected video
	loadVideoButton.addEventListener("click", () => {
	  const selectedVideoId = videoSelector.value;
	  if (selectedVideoId) {
		loadYouTubeVideo(selectedVideoId);
		loadNotesForVideo(selectedVideoId);
	  }
	});
	
	// Function to load notes for a video from local storage
	function loadNotesForVideo(videoId) {
	  const key = `notes_${videoId}`;
	  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
	  notesList.innerHTML = ""; // Clear existing notes

	  // Get the current timestamp of the video
	  const currentTimestamp = document.getElementById("videoFrame").getCurrentTime();

	  existingNotes.forEach((note) => {
		displayNoteInList(note);

		// Compare the timestamp of each note with the current timestamp of the video
		if (
		  currentTimestamp >= note.timestamp &&
		  currentTimestamp < note.timestamp + 10
		) {
		  // Highlight or indicate the relevant note
		  highlightNoteInList(note);
		}
	  });
	}
	
		// Function to highlight the relevant note in the list
	function highlightNoteInList(note) {
	  // Customize this function based on how you want to highlight the note
	  const listItem = notesList.querySelector(`[data-note-id="${note.id}"]`);
	  if (listItem) {
		listItem.style.backgroundColor = "yellow"; // Change the background color as an example
		listItem.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the highlighted note
		setTimeout(() => {
		  listItem.style.backgroundColor = ""; // Remove the background color
		}, 5000); // Adjust the time as needed (5 seconds in this example)
	  }
	}

	// Function to highlight the note at the current time
	function highlightNoteAtCurrentTime() {
	  const currentTimestamp = document.getElementById("videoFrame").getCurrentTime();

	  // Iterate through all notes and highlight the one at the current timestamp
	  const key = `notes_${currentVideoId}`;
	  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];

	  existingNotes.forEach((note) => {
		const noteStart = note.timestamp;
		const noteEnd = note.timestamp + 5; // Assuming notes are valid for a 5-second window

		if (currentTimestamp >= noteStart && currentTimestamp < noteEnd) {
		  // Highlight the note
		  highlightNoteInList(note);
		}
	  });
	}
	
		// Function to display a note in the list
	function displayNoteInList(note) {
	  const timestampInSeconds = note.timestamp;
	  const minutes = Math.floor(timestampInSeconds / 60);
	  const seconds = Math.floor(timestampInSeconds % 60);

	  const timestamp = `${padNumber(minutes)}:${padNumber(seconds)}`;
	  const listItem = document.createElement("li");
	  listItem.setAttribute("data-note-id", note.id);

	  // Create a div to hold the note content and edit controls
	  const noteContainer = document.createElement("div");

	  // Display the timestamp and note text
	  const timestampElement = document.createElement("span");
	  timestampElement.textContent = timestamp;

	  // Create an editable textarea for the note text
	  const noteTextElement = document.createElement("textarea");
	  noteTextElement.value = note.text;

	  // Add a "Save" button for each note
	  const saveButton = document.createElement("button");
	  saveButton.textContent = "Save";
	  saveButton.addEventListener("click", () =>
		saveNoteChanges(note, noteTextElement, saveButton)
	  );

	  noteContainer.appendChild(timestampElement);
	  noteContainer.appendChild(noteTextElement);
	  noteContainer.appendChild(saveButton);

	  listItem.appendChild(noteContainer);
	  notesList.appendChild(listItem);
	}
	
		// Function to save the changes made to a note
	function saveNoteChanges(note, noteTextElement, saveButton) {
	  if (noteTextElement.value.trim() === "") {
		// If the note text is empty, remove the note and timestamp
		removeNoteAndTimestamp(note);
	  } else {
		// Remove the note with the specific ID from local storage
		removeNoteById(note.id);

		// Update the note's text with the content of the textarea
		note.text = noteTextElement.value;

		// Save the updated note to local storage
		saveNoteToLocalStorage(note);
	  }

	  // Reload the notes for the current video to reflect changes
	  loadNotesForVideo(currentVideoId);

	  // Disable the textarea and hide the "Save" button
	  noteTextElement.disabled = true;
	  saveButton.textContent = "Edit";
	  saveButton.removeEventListener("click", () =>
		saveNoteChanges(note, noteTextElement, saveButton)
	  );
	  saveButton.addEventListener("click", () =>
		enableNoteEditing(note, noteTextElement, saveButton)
	  );
	}

	// Function to remove a note by its ID
	function removeNoteById(noteId) {
	  const key = `notes_${currentVideoId}`;
	  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
	  const updatedNotes = existingNotes.filter((n) => n.id !== noteId);
	  localStorage.setItem(key, JSON.stringify(updatedNotes));
	}

	// Function to enable editing for a note
	function enableNoteEditing(note, noteTextElement, saveButton) {
	  // Enable the textarea for editing
	  noteTextElement.disabled = false;

	  // Change the "Edit" button to "Save"
	  saveButton.textContent = "Save";

	  // Remove the enableNoteEditing event listener
	  saveButton.removeEventListener("click", () =>
		enableNoteEditing(note, noteTextElement, saveButton)
	  );

	  // Add the saveNoteChanges event listener
	  saveButton.addEventListener("click", () =>
		saveNoteChanges(note, noteTextElement, saveButton)
	  );

	  // Focus on the textarea
	  noteTextElement.focus();
	}

	// Function to remove a note and its timestamp
	function removeNoteAndTimestamp(note) {
	  const key = `notes_${note.videoId}`;
	  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
	  const updatedNotes = existingNotes.filter(
		(n) => n.timestamp !== note.timestamp
	  );
	  localStorage.setItem(key, JSON.stringify(updatedNotes));
	  loadNotesForVideo(note.videoId); // Reload notes after removing
	}

	// Function to add a unique ID to a note
	function addUniqueIdToNote(note) {
	  note.id = Date.now().toString();
	}

	// Function to pad a number with leading zeros
	function padNumber(number) {
	  return number < 10 ? `0${number}` : number;
	}*/

});

