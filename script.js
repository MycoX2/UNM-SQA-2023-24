const notesList = document.getElementById("notes-list");
const noteText = document.getElementById("note-text");
const addNoteButton = document.getElementById("add-note");
const videoSelector = document.getElementById("video-selector");
const loadVideoButton = document.getElementById("load-video");
let currentVideoId = null;
let player;

// Function to fetch YouTube videos based on a query
function fetchYouTubeVideos() {
  const query = "Software Quality Assurance";
  const maxResults = 12;
  const apiUrl =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=viewCount&q=Software%20Quality%20Assurance&key=AIzaSyAZZGG2MbLClM6RHdahrZCgX3nX8nTtN1Q";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      populateVideoSelector(data.items);
    })
    .catch((error) => {
      console.error("Error fetching video data:", error);
    });
}

// Function to populate the video selection dropdown with video options
function populateVideoSelector(videoData) {
  videoSelector.innerHTML = "";

  videoData.forEach((video) => {
    const videoId = video.id.videoId;
    const videoTitle = video.snippet.title;

    const option = document.createElement("option");
    option.value = videoId;
    option.text = videoTitle;
    videoSelector.appendChild(option);
  });
}

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

  addUniqueIdToNote(note); // Add unique ID to the note
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

function displayNoteInList(note) {
  const timestampInSeconds = note.timestamp;
  const minutes = Math.floor(timestampInSeconds / 60);
  const seconds = Math.floor(timestampInSeconds % 60);

  const timestamp = `${padNumber(minutes)}:${padNumber(seconds)}`;
  const listItem = document.createElement("li");

  // Create a div to hold the note content and edit controls
  const noteContainer = document.createElement("div");

  // Display the timestamp and note text
  const timestampElement = document.createElement("span");
  timestampElement.textContent = timestamp;

  // Create an editable textarea for the note text
  const noteTextElement = document.createElement("textarea");
  noteTextElement.value = note.text;

  // Add an "Edit" button for each note
  const editButton = document.createElement("button");
  editButton.textContent = "Save";
  editButton.addEventListener("click", () =>
    saveNoteChanges(note, noteTextElement, editButton)
  );

  noteContainer.appendChild(timestampElement);
  noteContainer.appendChild(noteTextElement);
  noteContainer.appendChild(editButton);

  listItem.appendChild(noteContainer);
  notesList.appendChild(listItem);
}

// Function to save the changes made to a note
function saveNoteChanges(note, noteTextElement, editButton) {
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
  editButton.textContent = "Edit";
  editButton.removeEventListener("click", () =>
    saveNoteChanges(note, noteTextElement, editButton)
  );
  editButton.addEventListener("click", () =>
    enableNoteEditing(note, noteTextElement, editButton)
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
function enableNoteEditing(note, noteTextElement, editButton) {
  // Enable the textarea for editing
  noteTextElement.disabled = false;

  // Change the "Edit" button to "Save"
  editButton.textContent = "Save";

  // Remove the enableNoteEditing event listener
  editButton.removeEventListener("click", () =>
    enableNoteEditing(note, noteTextElement, editButton)
  );

  // Add the saveNoteChanges event listener
  editButton.addEventListener("click", () =>
    saveNoteChanges(note, noteTextElement, editButton)
  );

  // Focus on the textarea
  noteTextElement.focus();
}

// Function to edit a note and copy it to the clipboard
function editNoteAndCopyToClipboard(note) {
  const newText = prompt("Edit the note:", note.text);

  if (newText !== null) {
    // Update the note's text
    note.text = newText;

    // Save the updated note to local storage
    saveNoteToLocalStorage(note);

    // Reload the notes for the current video to reflect changes
    loadNotesForVideo(currentVideoId);

    // Copy the updated note text to the clipboard
    copyTextToClipboard(note.text);
  }
}

// Function to copy text to the clipboard
function copyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  // You can provide some user feedback that the text has been copied, for example:
  alert("Note text has been copied to the clipboard!");
}

// Function to pad a number with leading zeros
function padNumber(number) {
  return number < 10 ? `0${number}` : number;
}

// Function to load a YouTube video
function loadYouTubeVideo(videoId) {
  if (player) {
    player.loadVideoById(videoId);
    currentVideoId = videoId;
  }
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
  fetchYouTubeVideos();
}

// Function to save a note to local storage
// Function to save a note to local storage
function saveNoteToLocalStorage(note) {
  const key = `notes_${note.videoId}`;
  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
  const updatedNotes = existingNotes.filter((n) => n.id !== note.id);
  updatedNotes.push(note); // Add the updated note
  localStorage.setItem(key, JSON.stringify(updatedNotes));
}

// Function to load notes for a video from local storage
function loadNotesForVideo(videoId) {
  const key = `notes_${videoId}`;
  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
  notesList.innerHTML = ""; // Clear existing notes
  existingNotes.forEach((note) => displayNoteInList(note));
}
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
