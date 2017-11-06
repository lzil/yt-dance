/*

speed / mirroring tools for Youtube

(useful for learning dance from videos)

- 'p' to speed up by 0.1x
- 'q' to slow down by 0.1x
- 'i' to mirror (and again to unmirror)
- 'r' to reset to 1x unmirrored (original video)

- 's' to save current timestamp
- 'g' to go to saved timestamp

*/


var yt_dance_main = function() {
    var titles = document.getElementsByClassName('ytd-video-primary-info-renderer title');
    var titles_orig = [];
    for (var t = 0; t < titles.length; t++) {
        titles_orig.push(titles[t].textContent);
        //titles[t].textContent += ' [1x]';
    }

    var vid_buttons = document.getElementsByClassName('ytp-chrome-top-buttons')[0];
    var speed_node = document.createTextNode("[1x]");
    var speed_text = document.createElement("p");
    speed_text.appendChild(speed_node);
    vid_buttons.appendChild(speed_text);
    speed_text.setAttribute('id', 'video-speed-label')
    speed_text.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    speed_text.style.fontSize = '25px';
    speed_text.style.marginTop = '10px';
    speed_text.style.textAlign = 'right'

    var time_node = document.createTextNode("0:00:00");
    var time_text = document.createElement("p");
    time_text.appendChild(time_node);
    vid_buttons.appendChild(time_text);
    time_text.setAttribute('id', 'video-time-label')
    time_text.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    time_text.style.fontSize = '25px';
    time_text.style.textAlign = 'right'
    //para.style.marginRight = '15px';

    var video = document.getElementsByTagName('video')[0];
    var player = document.getElementById('movie_player');
    var mirrored = false;
    var time_save = 0;

    window.onkeydown = function(event) {
        var c = video.playbackRate;
        //var c = player.getPlaybackRate();
        switch (event.keyCode) {
            case 83: //s
                time_save = player.getCurrentTime();
                var mins = parseInt(time_save / 60)
                var secs = parseInt(time_save - mins * 60)
                var msecs = parseInt(100*(time_save - mins * 60 - secs))

                if (secs < 10) {
                    secs = '0' + secs;
                }
                if (msecs < 10) {
                    msecs = '0' + msecs;
                }
                time_text.textContent = mins + ':' + secs + ':' + msecs;
                break;
            case 71: //g
                player.seekTo(time_save, true);
                break;  
            case 73: //i
                mirrored = !mirrored;
                flip();
                break;
            case 80: //p
                c += 0.1;
                console.log(c)
                break;
            case 81: //q
                c -= 0.1;
                break;
            case 82: //r
                c = 1;
                if (mirrored) {
                    flip();
                    mirrored = false;
                }
                break;
        }
        video.playbackRate = c;
        //player.setPlaybackRate(c);
        var str = ' [' + Math.round(c * 10)/10 + 'x';
        if (mirrored) {
            str += ', mirrored'
        }
        str += ']'
        // for (t = 0; t < titles.length; t++) {
        //     titles[t].textContent = titles_orig[t] + str;
        // }
        speed_text.textContent = str;
        console.log('timestamp:',video.playbackRate)
        console.log('playback rate:',player.getPlaybackRate())
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
}

try {
    yt_dance_on;
} catch (ReferenceError) {
    yt_dance_on = true;
    yt_dance_main();
}

