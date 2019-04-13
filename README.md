speed / mirroring tools for Youtube

(useful for learning dance from videos, lecture videos, etc.)

## to activate
Set the following as a bookmark in any browser and 'click' the bookmark on a Youtube video.

~~~

javascript:(function()%7Bdocument.body.appendChild(document.createElement(%27script%27)).src%3D%27https://cdn.rawgit.com/lzil/yt-dance/master/yt-dance.js%27%3B%7D)()%3B

~~~

## to use

- `p` to speed up by 0.1x
- `q` to slow down by 0.1x
- `d` to mirror (press again to unmirror)

- `s` to save current timestamp as START_TIME (default: start of video)
- `e` to save current timestamp as END_TIME (default: end of video)
- press `s`/`e` again to reset START_TIME and END_TIME to defaults
- `g` to go to START_TIME
- `;` toggles auto-replay from START_TIME once video reaches END_TIME

- `.` to move forward one frame (base YT functionality)
- `,` to move backward one frame (base YT functionality)

- `r` to reset to 1x unmirrored (original video), no replay, start or end times
- `h` to toggle help link

- `z` to remove this javascript from the video

## troubleshooting

- it's potentially interacting with another plugin you have. for instance if used with Chrome's youtube speed plugin then things will potentially break
- for other issues, or comments, contact me at liangz [at] gatsby.ucl.ac.uk
