speed / mirroring tools for Youtube

(useful for learning dance from videos, lecture videos, etc.)

##  note

Kind of broken as of 18 jan 2026 because of various updates to youtube. last update at least preserves speed up/slow down and start/end time functionality.

## to activate
Set the following as a bookmark in any browser and 'click' the bookmark on a Youtube video.

~~~
javascript:(function()%7Bdocument.body.appendChild(document.createElement(%27script%27)).src%3D%27https://cdn.rawgit.com/lzil/yt-dance/master/yt-dance.js%27%3B%7D)()%3B
~~~

NOTE: might not work anymore because of CSP issues. In that case need to minimize the JS and put it in the bookmark:

~~~
javascript:(function(){var m=false,n=null;function u(e){var t=parseInt(e/60),r=parseInt(e-60*t),i=parseInt(100*(e-60*t-r));return r<10&&(r="0"+r),i<10&&(i="0"+i),t+":"+r+":"+i}function f(){m?document.body.removeChild(n):(n=document.createElement("style"),document.body.appendChild(n),n.innerHTML=".xflip{-moz-transform:scale(-1,1)!important;-webkit-transform:scale(-1,1)!important;-o-transform:scale(-1,1)!important;transform:scale(-1,1)!important;filter:FlipH!important;}"),m=!m}function main(){if(!on_lock)return;var b=document.getElementsByClassName("ytp-chrome-top-buttons")[0],s=document.createElement("div");s.textContent="[1x]",s.style.cssText="background-color:rgba(0,0,0,0.3);font-size:25px;left:0;position:absolute;padding:0 5px;top:10px",b.appendChild(s);var t=document.createElement("div");t.style.cssText="background-color:rgba(0,0,0,0.3);font-size:15px;left:0;position:absolute;padding:0 5px;top:42px",b.appendChild(t);var a=document.createElement("a");a.href="https://github.com/lzil/yt-dance",a.target="_blank",a.textContent="press for help";var i=document.createElement("div");i.style.cssText="background-color:rgba(0,0,0,0.3);font-size:15px;right:0;position:absolute;padding:0 5px;top:10px",i.appendChild(a),b.appendChild(i);var v=document.querySelector("video"),p=document.getElementById("movie_player"),ts=0,ts_t="start",te=null,te_t="end",r=false,info_toggle=true;v.ontimeupdate=function(){var c=p.getCurrentTime(),e=null==te&&c>=v.duration||null!=te&&c>te&&c<te+v.playbackRate;!v.paused&&e&&(r?p.seekTo(ts):v.pause())};window.onkeydown=function(e){if("INPUT"!==e.target.nodeName){var c=v.playbackRate,time,ok=false;switch(e.keyCode){case 83:ok=true,ts!==0?(ts=0,ts_t="start"):(time=p.getCurrentTime(),(null==te&&time>=v.duration||null!=te&&time>=te)||(ts=time,ts_t=u(time)));break;case 69:ok=true,null!==te?(te=null,te_t="end"):(time=p.getCurrentTime(),time>ts&&(te=time,te_t=u(time)));break;case 71:ok=true,p.seekTo(ts,true);break;case 72:ok=true,info_toggle=!info_toggle,info_toggle?i.appendChild(a):i.removeChild(a);break;case 68:ok=true,f();break;case 80:ok=true,c+=.1;break;case 81:ok=true,c-=.1;break;case 82:ok=true,c=1,m&&f(),ts=0,te=null,r=false;break;case 90:ok=true,on_lock=void 0,b.removeChild(t),b.removeChild(s),b.removeChild(i),v.playbackRate=1,m&&f(),v.ontimeupdate=null,window.onkeydown=null;break;case 186:case 59:ok=true,r=!r}if(ok){v.playbackRate=c,s.textContent=" ["+Math.round(10*c)/10+"x"+(m?", mirrored":"")+"]";var l=ts_t+" - "+te_t;r&&(l+=", replay on"),t.textContent=l==="start - end"?"":l}}}}try{on_lock||(on_lock=true,main())}catch(e){on_lock=true,main()}})();
~~~

## to use

- `p` to speed up by 0.1x
- `q` to slow down by 0.1x
- `d` to mirror (press again to unmirror)
<br/><br/>
- `s` to save current timestamp as START_TIME (default: start of video)
- `e` to save current timestamp as END_TIME (default: end of video)
- press `s`/`e` again to reset START_TIME and END_TIME to defaults
- `g` to go to START_TIME
- `;` toggles auto-replay from START_TIME once video reaches END_TIME
<br/><br/>
- `.` to move forward one frame (base YT functionality)
- `,` to move backward one frame (base YT functionality)
<br/><br/>
- `r` to reset to 1x unmirrored (original video), no replay, start or end times
- `h` to toggle help link
<br/><br/>
- `z` to remove this javascript from the video

## troubleshooting

- it's potentially interacting with another plugin you have. for instance if used with Chrome's youtube speed plugin then things will potentially break
- for other issues, or comments, contact me at liangz [at] gatsby.ucl.ac.uk
