/*

speed / mirroring tools for Youtube

(useful for learning dance from videos)

- 'p' to speed up by 0.1x
- 'q' to slow down by 0.1x
- 'i' to mirror (and again to unmirror)
- 'r' to reset to 1x unmirrored (original video)

- 's' to save current timestamp
- 'g' to go to saved timestamp (defaults to 0:00:00)

*/


var yt_dance_main = function() {
    // hide info button which changes layout of labels
    var info = document.getElementsByClassName('ytp-button ytp-cards-button')[0];
    info.style.display = 'none'

    var vid_buttons = document.getElementsByClassName('ytp-chrome-top-buttons')[0];

    // label for speed of video
    var speed_node = document.createTextNode("[1x]");
    var speed_text = document.createElement("p");
    speed_text.appendChild(speed_node);
    vid_buttons.appendChild(speed_text);
    speed_text.setAttribute('id', 'video-speed-label')
    speed_text.setAttribute('style',
        'background-color:rgba(0,0,0,0.3);font-size:25px;margin-top:10px;left:0;position:absolute;padding:0 5px 0 5px'
    )

    // label for saved timestamp in video
    var time_node = document.createTextNode("");
    var time_text = document.createElement("p");
    time_text.appendChild(time_node);
    vid_buttons.appendChild(time_text);
    time_text.setAttribute('id', 'video-time-label')
    time_text.setAttribute('style',
        'background-color:rgba(0,0,0,0.3);font-size:25px;left:0;position:absolute;padding:0 5px 0 5px;top:42px'
    )

    var video = document.getElementsByTagName('video')[0];
    var player = document.getElementById('movie_player');
    var mirrored = false;
    var time_save = 0;
    var id = player.getVideoData()['video_id'];


    player.addEventListener('onStateChange', function() {
        var info = document.getElementsByClassName('ytp-button ytp-cards-button')[0];
        info.style.display = 'none'
        if (id !== player.getVideoData()['video_id']) {
            id = player.getVideoData()['video_id']
            time_text.textContent = ''
            time_save = 0;
            // setTimeout(function() {
            //     var info = document.getElementsByClassName('ytp-button ytp-cards-button')[0];
            //     info.style.display = 'none'
            // }, 500)
        }
    })

    window.onkeydown = function(event) {
        var c = video.playbackRate;
        if (event.target.nodeName == 'INPUT') {
            return;
        }
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
            case 32: //space
                if (player.getPlayerState() == 1) {
                    player.pauseVideo();
                } else if (player.getPlayerState() == 2) {
                    player.playVideo();
                }
                break;
        }
        video.playbackRate = c;
        var str = ' [' + Math.round(c * 10)/10 + 'x';
        if (mirrored) {
            str += ', mirrored'
        }
        str += ']'
        speed_text.textContent = str;
        console.log('timestamp:', player.getCurrentTime())
        console.log('playback rate:', video.playbackRate);
        console.log('mirrored:', mirrored)
    };


    //from https://rawgit.com/amacfie/MirrorYouTubeVideos/master/Mirror_HTML5_Video.js
    var flip = function() {
        var node = document.createElement('style');
        document.body.appendChild(node);
        window.addStyleString = function(str) {
            node.innerHTML = str;
        }

        var cssText = ".xflip { \
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

    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    });
}

try {
    yt_dance_on;
} catch (ReferenceError) {
    yt_dance_on = true;
    yt_dance_main();
}

