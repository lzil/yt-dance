


var titles = document.getElementsByClassName('ytd-video-primary-info-renderer title');
var titles_orig = [];
for (var t = 0; t < titles.length; t++) {
    titles_orig.push(titles[t].textContent);
}

var vid_buttons = document.getElementsByClassName('ytp-chrome-top-buttons')[0];
var node = document.createTextNode("");
var para = document.createElement("p");
para.appendChild(node);
vid_buttons.appendChild(para);
para.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
para.style.fontSize = '25px'

var video = document.getElementsByTagName('video')[0]
var mirrored = false;
console.log('done')

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
            break;
        case 82:
            c = 1;
            if (mirrored) {
                flip();
                mirrored = false;
            }
            break;
	}
	video.playbackRate = c;
    var str = ' [' + Math.round(c * 10)/10 + 'x';
    if (mirrored) {
        str += ', mirrored'
    }
    str += ']'
    for (t = 0; t < titles.length; t++) {
        titles[t].textContent = titles_orig[t] + str;
    }
    para.textContent = str;
	
	console.log('playback rate:',video.playbackRate)
    console.log('mirrored:', mirrored)
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
