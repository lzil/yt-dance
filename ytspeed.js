

window.onkeydown = function(event) {
	var c = document.getElementsByTagName('video')[0].playbackRate

	switch (event.keyCode) {
		case 80:
			document.getElementsByTagName('video')[0].playbackRate = c + 0.1;
			break;
		case 81:
			document.getElementsByTagName('video')[0].playbackRate = c - 0.1;
	}
	console.log(document.getElementsByTagName('video')[0].playbackRate)
};