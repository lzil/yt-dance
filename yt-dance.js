/*

speed / mirroring tools for Youtube

(useful for learning dance from videos)

- press 'p' to speed up by 0.1x
- press 'q' to slow down by 0.1x
- press 'i' to mirror (and again to unmirror)
- press 'r' to reset to 1x unmirrored (original video)

*/


var yt_dance_main = function() {
    var titles = document.getElementsByClassName('ytd-video-primary-info-renderer title');
    var titles_orig = [];
    for (var t = 0; t < titles.length; t++) {
        titles_orig.push(titles[t].textContent);
        titles[t].textContent += ' [1x]';
    }

    var vid_buttons = document.getElementsByClassName('ytp-chrome-top-buttons')[0];
    var node = document.createTextNode("[1x]");
    var para = document.createElement("p");
    para.appendChild(node);
    vid_buttons.appendChild(para);
    para.setAttribute('id', 'video-speed-label')
    para.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    para.style.fontSize = '25px';
    para.style.marginTop = '10px';
    //para.style.marginRight = '15px';

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
}

try {
    yt_dance_on;
} catch (ReferenceError) {
    yt_dance_on = true;
    yt_dance_main();
}

