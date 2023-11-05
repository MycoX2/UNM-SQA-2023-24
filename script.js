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

// Function to display a note in the notes list
function displayNoteInList(note) {
  const timestampInSeconds = note.timestamp;
  const minutes = Math.floor(timestampInSeconds / 60);
  const seconds = Math.floor(timestampInSeconds % 60);

  const timestamp = `${padNumber(minutes)}:${padNumber(seconds)}`;
  const listItem = document.createElement("li");
  listItem.textContent = `${timestamp}: ${note.text}`;

  // Add an "Edit" button for each note
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editNote(note));
  listItem.appendChild(editButton);

  notesList.appendChild(listItem);
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
function saveNoteToLocalStorage(note) {
  const key = `notes_${note.videoId}`;
  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
  const updatedNotes = existingNotes.filter(
    (n) => n.timestamp !== note.timestamp
  );
  updatedNotes.push(note);
  localStorage.setItem(key, JSON.stringify(updatedNotes));
}

// Function to load notes for a video from local storage
function loadNotesForVideo(videoId) {
  const key = `notes_${videoId}`;
  const existingNotes = JSON.parse(localStorage.getItem(key)) || [];
  notesList.innerHTML = ""; // Clear existing notes
  existingNotes.forEach((note) => displayNoteInList(note));
}

// Function to edit a note
function editNote(note) {
  const newText = prompt("Edit the note:", note.text);

  if (newText !== null) {
    // Update the note's text
    note.text = newText;

    // Save the updated note to local storage
    saveNoteToLocalStorage(note);

    // Reload the notes for the current video to reflect changes
    loadNotesForVideo(currentVideoId);
  }
}
