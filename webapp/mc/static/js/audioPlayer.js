/*
DONE:
- play/pause;
- volume;
- progress bar.

TODO:
- backward/forward;
- repeat/shuffle;
- lyrics;
- playlist.
*/

function myAudioPlayer(window, document,source){
	var audio = document.getElementById('J_audio');
	//var progress = document.getElementById('J_audioProgress');
	var playpause = document.getElementById("J_play");
	var replay = document.getElementById("J_repay");
	var prev = document.getElementById("J_prev");
	var next = document.getElementById("J_next");
	//var volume = document.getElementById("J_volume");
	var time=document.getElementById('J_time');

	var playIcon = document.getElementById("J_playIcon");
    var progressWrap = document.getElementById("J_progressWrap");
    var progress = document.getElementById("J_progress");
    progress.style.width = "0px";

    audio.src=source;//"http://121.43.162.34/content/upload/audio/gy-a-chjl.mp3";	

	var audioPlayer = {
		init : function() {

			audio.controls = false;
			audio.loop = false;
			// audio.autoplay=true;
			audio.addEventListener('timeupdate', function() {
				updateProgress();

			  	if(!audio.currentTime || !audio.duration) {
			  		return;
			  	}

				var length =parseInt(audio.duration);
				var mt = parseInt(length / 60);
				var st = length % 60;
				var mtstr = mt < 10 ? '0'+mt : mt;
				var ststr = st < 10 ? '0'+st : st;
				var prefix = mtstr+':'+ststr;

				var	tcurr =parseInt(audio.currentTime);
				mt = parseInt(tcurr / 60);
				st = tcurr % 60;
				mtstr = mt < 10 ? '0'+mt : mt;
				ststr = st < 10 ? '0'+st : st;
				var suffix = mtstr+':'+ststr;
				time.innerHTML=prefix+' | '+suffix;

			}, false);


			bindEvent(playpause, "click", togglePlay);
			bindEvent(replay, "click", replayAudio);
			bindEvent(prev, "click", replayAudio);
			bindEvent(next, "click", replayAudio);
			//bindEvent(volume, "change", setVolume);
			bindEvent(progressWrap, "mousedown", audioSeek);
		}
	}

	audioPlayer.init();

    function bindEvent(ele, eventName, func){
        if(window.addEventListener){
            ele.addEventListener(eventName, func);
        }
        else{
            ele.attachEvent('on' + eventName, func);
        }
    }	

	function togglePlay() {
	  	if(!audio.src) {
	  		playIcon.className = "u-iconPlay"; 
	  		return;
	  	}

	   if (audio.paused || audio.ended) {
	      playIcon.className = "u-iconPause"; 
	      audio.play();
	   } else {
	      playIcon.className = "u-iconPlay"; 
	      audio.pause();
	   }
	}

	function replayAudio(){
		audio.currentTime = 0; 
		playIcon.className = "u-iconPause"; 
		audio.play();		
	}


	function setVolume() {
	   audio.volume = volume.value;
	}

	function updateProgress() {
	    var percent = audio.currentTime / audio.duration;
	    //progress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
	    progress.style.width = percent*100  + "%";

		if(audio.ended){
			resetPlayer();
		}
	}

	function resetPlayer() {
	  audio.play();
	  playIcon.className = "u-iconPause"; 
	}

    function audioSeek(e){
        if(audio.paused || audio.ended){
            togglePlay();
            enhanceAudioSeek(e);
        }
        else{
            enhanceAudioSeek(e);
        }
    }

    function enhanceAudioSeek(e){
        var length = e.pageX - progressWrap.offsetLeft;
        var percent = length / progressWrap.offsetWidth;
        progress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
        audio.currentTime = percent * audio.duration;
    }	
}