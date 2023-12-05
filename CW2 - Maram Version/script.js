const notesList = document.getElementById("notes-list");
const noteText = document.getElementById("note-text");
const addNoteButton = document.getElementById("add-note");


document.getElementById("video-title").innerHTML = sessionStorage.getItem("selectedVideoTitle");
let currentVideoId = null;
let player;
let highlightInterval;

// Event listener for adding notes
addNoteButton.addEventListener("click", () => {
  const text = noteText.value.trim();
  if (text === "" || !currentVideoId) return;

  const timestamp = player.getCurrentTime();

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

// Function to load notes for a video from local storage
function loadNotesForVideo(videoId) {
  const key = `notes_${videoId}`;
  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
  notesList.innerHTML = ""; // Clear existing notes

  // Get the current timestamp of the video
  const currentTimestamp = player.getCurrentTime();

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
    listItem.style.backgroundColor = "yellow";
    listItem.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      listItem.style.backgroundColor = "";
    }, 5000);
  }
}

// Function to highlight the note at the current time
function highlightNoteAtCurrentTime() {
  const currentTimestamp = player.getCurrentTime();

  // Iterate through all notes and highlight the one at the current timestamp
  const key = `notes_${currentVideoId}`;
  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];

  existingNotes.forEach((note) => {
    const noteStart = note.timestamp;
    const noteEnd = note.timestamp + 5;

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
}
// Function to initialize the YouTube player
function initYouTubePlayer() {
  if (!player) {
    player = new YT.Player("player", {
      height: "315",
      width: "560",
      playerVars: {
        controls: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
}
// Function to load a YouTube video
function loadYouTubeVideo(videoId) {
  if (!player) {
    initYouTubePlayer();
  }

  player.loadVideoById(videoId);
  currentVideoId = videoId;
  localStorage.setItem("selectedVideoId", videoId);
  
  
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
						
const key = `notes_${videoId}`;
const notes = localStorage.getItem(key);						
var link = document.getElementById("downloadlink");
link.href = makeTextFile("https://www.youtube.com/embed/" + videoId + "\n" + notes)})()
}

// Function called when the YouTube IFrame API is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "315",
    width: "560",
    playerVars: {
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

// Function called when the YouTube player is ready
function onPlayerReady(event) {
  addNoteButton.disabled = false;
  const selectedVideoId = localStorage.getItem("selectedVideoId");

  if (selectedVideoId) {
    loadYouTubeVideo(selectedVideoId);
    loadNotesForVideo(selectedVideoId); // Load notes for the selected video
  }
}

// Function called when the YouTube player state changes
function onPlayerStateChange(event) {
  // Check if the player is playing or replaying
  if (
    event.data === YT.PlayerState.PLAYING ||
    event.data === YT.PlayerState.PLAYBACK_RATE_CHANGE
  ) {
    startHighlighting();
  }
}

// Function to start highlighting notes at the current time
function startHighlighting() {
  // Set up the interval to check and highlight notes
  highlightInterval = setInterval(() => {
    highlightNoteAtCurrentTime();
  }, 1);
}

// Function to save a note to local storage
function saveNoteToLocalStorage(note) {
  const key = `notes_${note.videoId}`;
  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
  const updatedNotes = existingNotes.filter((n) => n.id !== note.id);
  updatedNotes.push(note); // Add the updated note
  localStorage.setItem(key, JSON.stringify(updatedNotes));
}
// When the document is ready
document.addEventListener("DOMContentLoaded", function () {
  // Load the YouTube IFrame API script
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Initialize the YouTube player and other functionalities
  initYouTubePlayer();
});