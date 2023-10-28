fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=software%20quality%20assurance&type=video&videoDuration=short&key=AIzaSyA0c9e2X5lcxnbWGg2QaUJvdo4aDQlXiNM')
.then((result)=>{
    return result.json();
})
.then(data=>{
	console.log(data);
	let videos = data.items;
	let videoContainer = document.querySelector(".youtube_container");
    // loop through data.items array
    for (let i = 0; i < data.items.length; i++) {
         const video = data.items[i]
         const videoId = video.id.videoId;

		 videoContainer.innerHTML += 
		`<iframe src = "https://www.youtube.com/embed/${videoId}" frameborder = "0" allowfullscreen></iframe>`;
		 
    }   
})