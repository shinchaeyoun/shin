function setQuizVideoPop($target)
{
	var _this = this;
	var initialization = false;
	var posterImg;
	_this.view = function()
	{
		if(initialization==false)
		{
			_this.init();
		}
		posterImg.show();
	}

	_this.init = function()
	{
		//$("video").attr("contextmenu", "false");
		//$("video").attr("playsinline", "playsinline");
		//$("video").attr("webkitplaysinline", "webkitplaysinline");
		initialization = true;
		var isFirstPlay = false;
		var target = $target;
		var tabIndexNum = Number( target.parent().attr("tabIndex") )+2;
		var videoBox = target.find(".video_play_embed_box");
		var videoUrl = videoBox.attr("data-src");
		var videoPosterSrc = "./video_thumb/"+bookId+"/"+ (videoUrl.split("./video/"+bookId+"/")[1]).split(".")[0] + ".png";
		var videoPlayer = videoBox.find("video");
		var videoObj = videoPlayer[0];
		var closeBtn = target.find(".popup_close_btn");

		var videoContrl = '<div class="video-controller">';
		videoContrl		+=	 '<button class="play-btn"></button>';
		videoContrl		+=	 '<button class="pause-btn"></button>';
		videoContrl		+=	 '<div class="progress-box"><div class="progress-bar"></div><div class="progress-point"></div></div>';
		videoContrl		+=	 '<div class="rate-box"><button class="rate-btn"></button><button class="rate-btn on"></button><button class="rate-btn"></button></div>';
		videoContrl		+=	 '<div class="video-time">00:00</div>';
		videoContrl		+=	 '<button class="volume-btn on"></button>';
		videoContrl		+=	 '<button class="volume-progress-box"><div class="volume-progress-bar"></div><div class="volume-progress-point"></div></button>';
		videoContrl		+=	 '<button class="video-zoom-btn on"></button>';
		videoContrl		+= '</div>';
		videoBox.append(videoContrl);

		var playBtn = target.find(".popup_video_box .play-btn");
		var pauseBtn = target.find(".popup_video_box .pause-btn");
		var p_box = target.find(".popup_video_box .progress-box");
		var p_bar = target.find(".popup_video_box .progress-bar");
		var p_p = target.find(".popup_video_box .progress-point");

		var volumeBtn = target.find(".popup_video_box .volume-btn");
		var v_box = target.find(".popup_video_box .volume-progress-box");
		var v_bar = target.find(".popup_video_box .volume-progress-bar");
		var v_p = target.find(".popup_video_box .volume-progress-point");
		var rateBtn = target.find(".popup_video_box .rate-box .rate-btn");
		var rateArr = ["0.8","1.0","1.2"];
		var mainRate = 1;

		var zoomBtn = target.find(".popup_video_box .video-zoom-btn");

		if( target.parent().find(".popup_box").length == 1)
		{
			target.parent().removeClass("popup_view_video").addClass("popup_view_video");
		}
		videoPlayer.attr("poster",videoPosterSrc);
		videoBox.append('<div class="poster-img"></div>' );
		posterImg = videoBox.find(".poster-img");


		videoObj.addEventListener("timeupdate", function(){
			var temp = $(this).parent();
			temp.find(".video-time").text( $.bookUtils.getSecToTime( $(this)[0].currentTime ) );

			updateProgress( 100/$(this)[0].duration*$(this)[0].currentTime );
		});
		videoObj.addEventListener("ended", function(){
			posterImg.show();
			updateProgress(100);
		});
		videoObj.addEventListener('volumechange', function() {;
			var per = videoObj.volume/1 * 100;
			v_p.css("left", (80/100*per)+"px");
			v_bar.css("width", per+"%");
		});

		/*
		plyr.setup( videoObj ,{
			controls:['play','progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
			hideControls:false,
			iconUrl:"./common/lib/plyr.svg"
		});

		$(".plyr__controls").css("visibility","hidden");
		$(".plyr__controls").attr("aria-hidden", "true");
		$(".plyr__controls").removeAttr("title");
		$(".plyr__controls").removeAttr("aria-label");


		$(".plyr__controls *").attr("aria-hidden", "true");
		$(".plyr__controls *").removeAttr("title");
		$(".plyr__controls *").removeAttr("aria-label");

		$(".js-player.plyr--setup").attr("aria-hidden", "true");

		$(".js-player.plyr--setup").removeAttr("title");
		$(".js-player.plyr--setup").removeAttr("aria-label");
		*/
		playBtn.off("click").on("click", function(){
			if(isFirstPlay)
			{
				videoObj.playbackRate = mainRate;
				videoObj.play();
				posterImg.hide();
			}
			else
			{
				playEvent();
				videoObj.play();
				posterImg.hide();
			}
		})
		pauseBtn.off("click").on("click", function(){
			videoObj.pause();
			posterImg.show();
		})
		volumeBtn.off("click").on("click", function(){
			if(volumeBtn.hasClass("on"))
			{
				volumeBtn.removeClass("on").removeClass("off").addClass("off");
			}
			else
			{
				volumeBtn.removeClass("on").removeClass("off").addClass("on");
			}
			videoObj.muted = !videoObj.muted;
		})

		var temp = target.find(".js-player");
		temp.attr("role", "button");
		temp.attr("title", "재생과 일시정지 버튼입니다. 버튼을 누르면 영상이 재생 일시정지 됩니다.");
		temp.attr("aria-label", "재생과 일시정지 버튼입니다. 버튼을 누르면 영상이 재생 일시정지 됩니다.");
		//++tabIndexNum;
		temp.attr("tabIndex", tabIndexNum);
		temp.off("click").on("click", function(){
			if( posterImg.css("display") == "block")
			{
				playEvent();
				videoObj.play();
				posterImg.hide();
			}
			else
			{
				videoObj.pause();
				posterImg.show();
			}
		});

		playBtn.attr("role", "button");
		playBtn.attr("title", "재생 버튼입니다. 버튼을 누르면 영상이 재생 됩니다.");
		playBtn.attr("aria-label", "재생 버튼입니다. 버튼을 누르면 영상이 재생 됩니다.");
		//++tabIndexNum;
		playBtn.attr("tabIndex", tabIndexNum);

		pauseBtn.attr("role", "button");
		pauseBtn.attr("title", "일시정지 버튼입니다. 버튼을 누르면 영상이 일시정지 됩니다.");
		pauseBtn.attr("aria-label", "일시정지 버튼입니다. 버튼을 누르면 영상이 일시정지 됩니다.");
		//++tabIndexNum;
		pauseBtn.attr("tabIndex", tabIndexNum);

		rateBtn.attr("tabIndex", tabIndexNum);
		rateBtn.eq(0).attr("title", "배속 버튼입니다. 버튼을 누르면 영상이 영점팔배속 됩니다.");
		rateBtn.eq(0).attr("aria-label", "배속 버튼입니다. 버튼을 누르면 영상이 영점팔배속 됩니다.");

		rateBtn.eq(1).attr("title", "배속 버튼입니다. 버튼을 누르면 영상이 일배속 됩니다.");
		rateBtn.eq(1).attr("aria-label", "배속 버튼입니다. 버튼을 누르면 영상이 일배속 됩니다.");

		rateBtn.eq(2).attr("title", "배속 버튼입니다. 버튼을 누르면 영상이 일점이배속 됩니다.");
		rateBtn.eq(2).attr("aria-label", "배속 버튼입니다. 버튼을 누르면 영상이 일점이배속 됩니다.");


		volumeBtn.attr("role", "button");
		volumeBtn.attr("title", "음소거 음복구 버튼입니다. 버튼을 누르면 영상이 음소거 음복구 됩니다.");
		volumeBtn.attr("aria-label", "음소거 음복구 버튼입니다. 버튼을 누르면 영상이 음소거 음복구 됩니다.");
		//++tabIndexNum;
		volumeBtn.attr("tabIndex", tabIndexNum);


		v_box.attr("title", "볼륨 조절 바입니다. 볼륨을 조절할 수 있습니다.");
		v_box.attr("aria-label", "볼륨 조절 바입니다. 볼륨을 조절할 수 있습니다.");
		v_box.attr("tabIndex", tabIndexNum);

		zoomBtn.attr("title", "전체 화면 보기, 창 화면 보기 토글 버튼 입니다. 버튼을 누루면 영상이 전체 화면, 창 화면으로 전환 됩니다.");
		zoomBtn.attr("aria-label", "전체 화면 보기, 창 화면 보기 토글 버튼 입니다. 버튼을 누루면 영상이 전체 화면, 창 화면으로 전환 됩니다.");
		zoomBtn.attr("tabIndex", tabIndexNum);

		//videoPlayer.off("click").on("click", playEvent);

		rateBtn.off("click").on("click", function(){
			var index = rateBtn.index( $(this) );
			mainRate = Number( rateArr[index] );
			rateBtn.removeClass("on");
			$(this).addClass("on");
			videoObj.playbackRate = mainRate;
		});



		closeBtn.bind("click",function(){
			if( videoObj.paused )
			{

			}
			else
			{
				videoObj.pause();
			}
			videoObj.currentTime = 0;
		})

		zoomBtn.off("click").on("click", function(){
			if( $(this).hasClass("on") )
			{
				$(this).removeClass("on").removeClass("off").addClass("off");
				videoBox.fullscreen();

			}
			else
			{
				$(this).removeClass("on").removeClass("off").addClass("on");
				$.fullscreen.exit();
			}
		});

		function playEvent()
		{
			videoObj.playbackRate = mainRate;
			isFirstPlay = true;

			posterImg.show();
			var videoSrc = videoUrl;
			var videoSrcName = videoUrl.split(".mp4")[0];
			var videoSrcExt = "mp4";//videoUrl.split(".mp4")[1];
			var isSuaVideo = window.parent.isSua;//false;//viewerInfo.isSuaVideo;

			if(isSuaVideo) videoSrc = videoSrcName + "_sua" + "." + videoSrcExt;

			$(".plyr__controls").css("visibility","visible");

			var url = mediaServer + videoSrc;
			if( isPorting ) url = url.replace('./video/','');
			if( videoPlayer.attr("src") == url)
			{

			}
			else
			{
				videoObj.src = url;
			}


			if( videoObj.paused )
			{
				posterImg.hide();
			}
			else
			{
				posterImg.show();
			}

			p_box.off("mousedown").on("mousedown",function($e){
				$e.preventDefault();
				posterImg.hide();
				videoObj.pause();

				p_box.off("mousemove").on("mousemove",function($e){
					$e.preventDefault();

					var p_width = Number( getProgressSize() );
					var startX = $(this).offset().left;
					var lastX = dp2lw(p_width);
					if( videoBox.css("overflow") == "hidden" ) lastX = p_width;
					var clientX = $e.pageX-startX;
					var per = 100/lastX*clientX;
					if(per<0)per = 0;
					if(per>100)per = 100;;
					updateProgress(per);
				})

				p_box.off("mouseup mouseleave").on("mouseup mouseleave",function($e){
					$e.preventDefault();
					p_box.off("mousemove mouseup mouseleave");

					var p_width = Number( getProgressSize() );
					var startX = $(this).offset().left;
					var lastX = dp2lw(p_width);
					if( videoBox.css("overflow") == "hidden" ) lastX = p_width;
					var clientX = $e.pageX-startX;
					var per = 100/lastX*clientX;
					if(per<0)per = 0;
					if(per>100)per = 100;
					updateProgress(per);

					if( posterImg.css("display") == "block")
					{
						videoObj.play();
					}
					videoObj.currentTime = videoObj.duration/100*per;
					videoObj.play();
				})
			})

			v_box.off("mousedown").on("mousedown",function($e){
				$e.preventDefault();

				v_box.off("mousemove").on("mousemove",function($e){
					$e.preventDefault();

					var startX = $(this).offset().left;
					var lastX = dp2lw(100);
					var clientX = $e.pageX-startX;
					if( videoBox.css("overflow") == "hidden" ) lastX = 100;

					var per = 100/lastX*clientX;
					if(per<0)per = 0;
					if(per>100)per = 100;;

					videoObj.volume = per/100;
					v_p.css("left", (80/100*per)+"px");
					v_bar.css("width", per+"%");
				})

				v_box.off("mouseup mouseleave").on("mouseup mouseleave",function($e){
					$e.preventDefault();
					v_box.off("mousemove mouseup mouseleave");

					var startX = $(this).offset().left;
					var lastX = dp2lw(100);
					var clientX = $e.pageX-startX;
					if( videoBox.css("overflow") == "hidden" ) lastX = 100;

					var per = 100/lastX*clientX;
					if(per<0)per = 0;
					if(per>100)per = 100;

					videoObj.volume = per/100;
					v_p.css("left", (80/100*per)+"px");
					v_bar.css("width", per+"%");
				})
			})

			essenceAllChk(true);
		}

		function updateProgress($per)
		{
			//var p_width = Number( getProgressSize() ) - 20;
			p_bar.css("width", $per+"%");
			//p_p.css("left", (p_width/100*$per)+"px");
			p_p.css("left", $per+"%");
		}

		function getProgressSize()
		{
			return p_box.css("width").split("px")[0];
		}



		function essenceAllChk($bool)
		{
			if( target.parent().parent().attr("data-essence") )
			{
				if($bool)
				{
					target.attr("data-ans","ok");
				}
				else
				{
					target.attr("data-ans","no");
				}
				setEssenceAnsChk( target.parent().parent() );
			}
		}
	}
}
