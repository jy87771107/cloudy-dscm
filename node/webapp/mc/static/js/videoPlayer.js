function myplayer(window, document, source){
    // 获取要操作的元素
    var video = document.getElementById("J_player");
	var replay = document.getElementById("J_repay");
	var prev = document.getElementById("J_prev");
	var next = document.getElementById("J_next");

    var time=document.getElementById('J_time');
    var playBtn = document.getElementById("J_play");
    var playIcon = document.getElementById("J_playIcon");
    //var fullScreenBtn = document.getElementById("fullScreenBtn");
    var progressWrap = document.getElementById("J_progressWrap");
    var progress = document.getElementById("J_progress");
    progress.style.width = "0px";

    // 创建我们的操作对象，我们的所有操作都在这个对象上。
    video.src=source;//"http://121.43.162.34/content/upload/video/ox-v-fe.mp4";
    var videoPlayer = {
        init: function(){
            var that = this;
            video.removeAttribute("controls");
            bindEvent(video, "loadeddata", videoPlayer.initControls);
            videoPlayer.operateControls();

            video.addEventListener('timeupdate', function() {
                getProgress();

			  	if(!video.currentTime || !video.duration) {
			  		return;
			  	}

				var length =parseInt(video.duration);
				var mt = parseInt(length / 60);
				var st = length % 60;
				var mtstr = mt < 10 ? '0'+mt : mt;
				var ststr = st < 10 ? '0'+st : st;
				var prefix = mtstr+':'+ststr;

				var	tcurr =parseInt(video.currentTime);
				mt = parseInt(tcurr / 60);
				st = tcurr % 60;
				mtstr = mt < 10 ? '0'+mt : mt;
				ststr = st < 10 ? '0'+st : st;
				var suffix = mtstr+':'+ststr;
				time.innerHTML=prefix+' | '+suffix;                
            }, false);             
        },
        initControls: function(){
            //videoPlayer.showHideControls();
        },
        showHideControls: function(){
            bindEvent(video, "mouseover", showControls);
            bindEvent(videoControls, "mouseover", showControls);
            bindEvent(video, "mouseout", hideControls);
            bindEvent(videoControls, "mouseout", hideControls);
        },
        operateControls: function(){
            bindEvent(playBtn, "click", play);
			bindEvent(replay, "click", replay);
			bindEvent(prev, "click", stop);
			bindEvent(next, "click", stop);
            bindEvent(progressWrap, "mousedown", videoSeek);
        }
    }

    videoPlayer.init();

    // 原生的JavaScript事件绑定函数
    function bindEvent(ele, eventName, func){
        if(window.addEventListener){
            ele.addEventListener(eventName, func);
        }
        else{
            ele.attachEvent('on' + eventName, func);
        }
    }

    // 控制video的播放
    function play(){
        if ( video.paused || video.ended ){              
            if ( video.ended ){ 
                video.currentTime = 0;
            } 
            video.play();
            playIcon.className = "u-iconPause"; 
            //progressFlag = setInterval(getProgress, 60);
        } 
        else{ 
            video.pause(); 
            playIcon.className = "u-iconPlay";
            //clearInterval(progressFlag);
        } 
    }
    // 控制video是否全屏，额这一部分没有实现好，以后有空我会接着研究一下
	function replay(){
		video.currentTime = 0; 
		playIcon.className = "u-iconPause"; 
		video.play();		
	}

	function stop(){
		video.currentTime = 0; 
		playIcon.className = "u-iconPlay"; 
		video.stop();		
	}	

    // video的播放条
    function getProgress(){
        var percent = video.currentTime / video.duration;
        //playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
        //showProgress.innerHTML = (percent * 100).toFixed(1) + "%";
        //playBtn.innerHTML = playProgress.style.width;
        progress.style.width = percent*100  + "%";

        if(video.paused){
            playIcon.className = "u-iconPlay"; 
        }
    }
    // 鼠标在播放条上点击时进行捕获并进行处理
    function videoSeek(e){
        if(video.paused || video.ended){
            play();
            enhanceVideoSeek(e);
        }
        else{
            enhanceVideoSeek(e);
        }

    }
    function enhanceVideoSeek(e){
        var length = e.pageX - progressWrap.offsetLeft;
        var percent = length / progressWrap.offsetWidth;
        //playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
        progress.style.width = percent*100  + "%";
        video.currentTime = percent * video.duration;
    }

}