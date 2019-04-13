/*

speed / mirroring tools for Youtube

(useful for learning dance from videos, lecture videos, etc.)

# TO ACTIVATE
Set the following as a bookmark in any browser and 'click' the bookmark on a Youtube video.

~~~

javascript:(function()%7Bdocument.body.appendChild(document.createElement(%27script%27)).src%3D%27https://cdn.rawgit.com/lzil/yt-dance/master/yt-dance.js%27%3B%7D)()%3B

~~~

# USAGE

See github.com/lzil/yt-dance for README

*/


var yt_dance_main = function() {
    if (!on_lock) {
        return;
    }

    var vid_buttons = document.getElementsByClassName('ytp-chrome-top-buttons')[0];

    // label for speed of video
    var speed_text = document.createElement("div");
    speed_text.textContent = '[1x]';
    vid_buttons.appendChild(speed_text);
    speed_text.setAttribute('id', 'video-speed-label');
    speed_text.setAttribute('style',
        'background-color:rgba(0,0,0,0.3);font-size:25px;left:0;position:absolute;padding:0 5px 0 5px;top:10px'
    );

    // label for saved timestamp in video
    var time_text = document.createElement("div");
    vid_buttons.appendChild(time_text);
    time_text.setAttribute('id', 'video-time-label')
    time_text.setAttribute('style',
        'background-color:rgba(0,0,0,0.3);font-size:25px;left:0;position:absolute;padding:0 5px 0 5px;top:42px'
    );

    // information label
    var info_a = document.createElement('a')
    info_a.setAttribute('href', 'http://www.github.com/lzil/yt-dance')
    info_a.setAttribute('target', '_blank')
    var info_text = document.createElement("div");
    info_text.appendChild(info_a);
    vid_buttons.appendChild(info_text);
    info_text.setAttribute('id', 'video-info-label');
    info_text.setAttribute('style',
        'background-color:rgba(0,0,0,0.3);font-size:15px;right:0;position:absolute;padding:0 5px 0 5px;top:10px'
    );
    info_a.textContent = 'press for help';
    info_toggle = true;


    var video = document.getElementsByTagName('video')[0];
    var player = document.getElementById('movie_player');
    var mirrored = false;
    var mirrorNode = null;
    var time_save = 0;
    var id = player.getVideoData()['video_id'];

    var replay = false;

    player.addEventListener('onStateChange', function() {
        if (id !== player.getVideoData()['video_id']) {
            id = player.getVideoData()['video_id'];
            time_text.textContent = '';
            time_save = 0;
        }
    })

    window.onkeydown = function(event) {
        var c = video.playbackRate;
        if (event.target.nodeName == 'INPUT') {
            return;
        }
        var code = 'NONE';
        switch (event.keyCode) {
            case 83: //s
                code = 'save';
                time_save = player.getCurrentTime();
                var mins = parseInt(time_save / 60);
                var secs = parseInt(time_save - mins * 60);
                var msecs = parseInt(100*(time_save - mins * 60 - secs));
                if (secs < 10) {
                    secs = '0' + secs;
                }
                if (msecs < 10) {
                    msecs = '0' + msecs;
                }
                time_text.textContent = mins + ':' + secs + ':' + msecs;
                break;
            case 71: //g
                code = 'goto';
                player.seekTo(time_save, true);
                break;
            case 72: //h
                code = 'help';
                info_toggle = !info_toggle
                if (info_toggle) {
                    info_text.appendChild(info_a)
                } else {
                    info_text.removeChild(info_a)
                }
                break;
            case 68: //d
                code = 'mirror';
                flip();
                break;
            case 80: //p
                code = 'speed up';
                c += 0.1;
                break;
            case 81: //q
                code = 'slow down'
                c -= 0.1;
                break;
            case 82: //r
                code = 'reset';
                c = 1;
                if (mirrored) {
                    flip();
                }
                time_text.textContent = '';
                time_save = 0;
                break;
            case 90: //z
                code = 'abort'
                c = 1;
                on_lock = undefined;
                vid_buttons.removeChild(time_text);
                vid_buttons.removeChild(speed_text);
                vid_buttons.removeChild(info_text)
                video.playbackRate = 1;
                if (mirrored) {
                    flip();
                }
                window.onkeydown = null;
                break;
            case 32: //space
                code = 'pause'
                if (event.target == document.body) {
                    event.preventDefault();
                    video.paused = !video.paused;
                }
                break;
            // case 39: //right arrow
            //     if (event.target == document.body) {
            //         player.seekTo(player.getCurrentTime() + 5, true)
            //     }
            //     break;
            // case 37: //left arrow
            //     if (event.target == document.body) {
            //         player.seekTo(player.getCurrentTime() - 5, true)
            //     }
            //     break;
            case 186: //semicolon (;) on IE/Safari
            case 59: //semicolon (;) on Firefox
                code = 'replay'
                replay = !replay;
                if (replay) {
                    video.onended = function () {
                        player.seekTo(time_save, true);
                    }
                } else {
                    video.onended = null;
                }
                
        }
        if (code != 'NONE') {
            video.playbackRate = c;
            var str = ' [' + Math.round(c * 10)/10 + 'x';
            if (mirrored) {
                str += ', mirrored';
            }
            if (replay) {
                str += ', replay on'
            }
            str += ']'
            speed_text.textContent = str;
            console.log(
                code,
                player.getCurrentTime(),
                video.playbackRate,
                mirrored
            );
        }
    };


    //adapted from https://rawgit.com/amacfie/MirrorYouTubeVideos/master/Mirror_HTML5_Video.js
    var flip = function() {
        if (mirrored) {
            document.body.removeChild(mirrorNode);
        } else {
            mirrorNode = document.createElement('style');
            document.body.appendChild(mirrorNode);
            window.addStyleString = function(str) {
                mirrorNode.innerHTML = str;
            }

            var cssText = ".xflip { \
              -moz-transform: scale(-1, 1) !important;\
              -webkit-transform: scale(-1, 1) !important;\
              -o-transform: scale(-1, 1) !important;\
              transform: scale(-1, 1) !important;\
              filter: FlipH !important;\
            }";
            addStyleString(cssText);
        }

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
        mirrored = !mirrored;
    }
}

// only activate once per press of bookmark
try {
    if (!on_lock) {
        on_lock = true;
        yt_dance_main();
    }
} catch (ReferenceError) {
    on_lock = true;
    yt_dance_main();
}

//some google analytics so i can see how the script is being used lol
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-65259513-3', 'auto');
ga('send', 'pageview');