


var title = document.getElementsByClassName('title')[0];
var title_orig = title.textContent;
var video = document.getElementsByTagName('video')[0]
var mirrored = false;

window.onkeydown = function(event) {
	var c = video.playbackRate;

	switch (event.keyCode) {
		case 73:
			mirrored = !mirrored;
			flip();
			break;
		case 80:
			c += 0.1;
			break;
		case 81:
			c -= 0.1;
	}
	video.playbackRate = c;
	title.textContent = title_orig + ' (' + Math.round(c * 10)/10 + 'x)';
	if (mirrored) {
		title.textContent += ' (mirrored)'
	}
	console.log(document.getElementsByTagName('video')[0].playbackRate)
};



//from https://rawgit.com/amacfie/MirrorYouTubeVideos/master/Mirror_HTML5_Video.js
var flip = function() {
	var node = document.createElement('style');
	document.body.appendChild(node);
	window.addStyleString = function(str) {
		node.innerHTML = str;
	}

	cssText = ".xflip { \
	  -moz-transform: scale(-1, 1) !important;\
	  -webkit-transform: scale(-1, 1) !important;\
	  -o-transform: scale(-1, 1) !important;\
	  transform: scale(-1, 1) !important;\
	  filter: FlipH !important;\
	}";

	addStyleString(cssText);
	var numberOfVideos = document.getElementsByTagName("video").length;
	if(numberOfVideos >= 1) {
		var video;
		for (var i = 0; i < numberOfVideos; ++i) {
			if (document.getElementsByTagName("video")[i].videoHeight > 100) {
				video = document.getElementsByTagName("video")[i];
				video.classList.toggle('xflip');
				break;
			}
		}
	};
}