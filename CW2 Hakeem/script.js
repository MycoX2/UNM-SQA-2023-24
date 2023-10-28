var download = document.getElementById("download");

function openNW() {
	var NW = window.open("", "Results", "")
	var filePath = "C:\Users\hakee\OneDrive - University of Nottingham Malaysia\Y3 CSAI\Software Quality Assurance\CW Hakeem\CW2 Hakeem\button.html"
	NW.document.write(filePath + "<br>hello")
	NW;
}