function setListening($target)
{
	var _this = this;
	var initialization = false;
	var joinQuiz = false;
	_this.view = function()
	{
		if(initialization==false)
		{
			_this.init();
			switch ($target.data("type-join"))
			{
				case "button-click":
					joinQuiz = new setQuizButtonClick( $target );
					$target.find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break

				case "dragAndDrop":
					joinQuiz = new setDragAndDrop( $target );
					$target.find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;
				case "write":
					joinQuiz = new setQuizwrite( $target );
					$target.find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;
				case "drawing-pop":
					joinQuiz = new setDrawing( $target );
					$target.find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;
				case "lineDrawing":
					joinQuiz = new setLineDrawing( $target );
					$target.find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;
			}

			if( joinQuiz != false)
			{
				joinQuiz.view();
			}
		}
		if( joinQuiz != false)
		{
			joinQuiz.view();
		}
	}

	var speakerBtn = $target.find(".speaker-btn");
	speakerBtn.each(function(i){
		$(this).off("click").on("click",function(){
			pageAudio.pause();
			pageAudio = new Audio("./"+$(this).attr("data-mp3")+".mp3");
			if(pageAudio.currentTime != 0)
			{
				pageAudio.currentTime = 0;
			}
			pageAudio.play();
		})
	})

	_this.init = function()
	{
		initialization = true;
		var isFirstPlay = false;
		var target = $target;
		var closeBtn = target.find(".popup_close_btn");
		var tabIndexNum = Number( target.parent().attr("tabIndex") )+2;
		var fileName = "./"+target.find(".listening-box").data("file") + ".mp3";
		//console.log(fileName);
		var tag = '<audio class="listening-audio" preload="none"></audio>';
		tag	+= '<div class="audio-controller">';
		// tag	+=	 '<button class="return-btn"></button>';
		tag	+=	 '<button class="play-pause-btn play"></button>';
		// tag	+=	 '<button class="last-btn"></button>';
		//tag	+=	 '<div class="progress-box"><div class="progress-bar"></div><div class="progress-point"></div></div>';
		tag	+=	 '<div class="progress-box"><div class="progress-bar"></div></div>';
		// tag	+=	 '<div class="audio-time">00:00</div>';
		tag	+=	 '<div class="rate-box"><button class="rate-btn"></button><button class="rate-btn on"></button><button class="rate-btn"></button></div>';
		tag	+=	 '<button class="volume-btn on"></button>';
		tag	+=	 '<div class="volume-progress-box"><div class="volume-progress-bar"></div></div>';
		tag	+= '</div>';
		target.find(".listening-box").append(tag);

		var audio = target.find("audio")[0];
		var playPauseBtn = target.find(".play-pause-btn");
		var p_box = target.find(".progress-box");
		var p_bar = target.find(".progress-bar");
		var p_p = target.find(".progress-point");

		var volumeBtn = target.find(".volume-btn");
		var v_box = target.find(".volume-progress-box");
		var v_bar = target.find(".volume-progress-bar");
		var v_p = target.find(".volume-progress-point");
		var rateBtn = target.find(".rate-box .rate-btn");
		var rateArr = ["0.8","1.0","1.2"];
		var mainRate = 1;
		var isPlay = false;

		var returnBtn = target.find(".return-btn");
		var lastBtn = target.find(".last-btn");
		var clickBtn = target.find(".audio-ex-btn");

		playPauseBtn.attr("role", "button");
		playPauseBtn.attr("title", "재생 및 일시정지 버튼입니다. 버튼을 누르면 음성이 재생, 일시정지 됩니다.");
		playPauseBtn.attr("aria-label", "재생 및 일시정지 버튼입니다. 버튼을 누르면 음성이 재생, 일시정지 됩니다.");
		playPauseBtn.attr("tabIndex", tabIndexNum);
		++tabIndexNum;

		returnBtn.attr("role", "button");
		returnBtn.attr("title", "되감기 버튼입니다. 버튼을 누르면 음성이 앞으로 이동합니다.");
		returnBtn.attr("aria-label", "되감기 버튼입니다. 버튼을 누르면 음성이 앞으로 이동합니다.");
		returnBtn.attr("tabIndex", tabIndexNum);

		lastBtn.attr("role", "button");
		lastBtn.attr("title", "빨리감기 버튼입니다. 버튼을 누르면 음성이 뒤로 이동합니다.");
		lastBtn.attr("aria-label", "빨리감기 버튼입니다. 버튼을 누르면 음성이 뒤로 이동합니다.");
		lastBtn.attr("tabIndex", tabIndexNum);

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

		clickBtn.attr("title", "지문 확인 버튼입니다. 버튼을 누르면 지문을 확인할 수 있습니다.");
		clickBtn.attr("aria-label", "지문 확인 버튼입니다. 버튼을 누르면 지문을 확인할 수 있습니다.");
		clickBtn.attr("tabIndex", tabIndexNum);

		// console.log(fileName);
		audio.src = fileName;
		audio.addEventListener("timeupdate", function(){
			updateProgress( 100/$(this)[0].duration*$(this)[0].currentTime );
		});
		audio.addEventListener("ended", function(){
			isPlay = false;
			playPauseBtn.removeClass("play").removeClass("pause").addClass("play");
		});
		audio.addEventListener('volumechange', function() {;
			var per = audio.volume/1 * 100;
			v_p.css("left", (80/100*per)+"px");
			v_bar.css("width", per+"%");
		});


		playPauseBtn.off("click").on("click", function(){
			isPlay = !isPlay;
			$(this).removeClass("play").removeClass("pause");
			if(isPlay)
			{
				isFirstPlay = true;
				$(this).addClass("pause");
				audio.playbackRate = mainRate;
				audio.play();
			}
			else
			{
				$(this).addClass("play");
				audio.pause();
			}

			if( !target.data("type-join") ) 
			{
				essenceAllChk();
			}
		})

		rateBtn.off("click").on("click", function(){
			var index = rateBtn.index( $(this) );
			mainRate = Number( rateArr[index] );
			rateBtn.removeClass("on");
			$(this).addClass("on");
			audio.playbackRate = mainRate;
		});



		closeBtn.bind("click",function(){
			if( audio.paused )
			{

			}
			else
			{
				audio.pause();
			}
			audio.currentTime = 0;
		})

		p_box.off("mousedown").on("mousedown",function($e){
			if(isFirstPlay==false)
			{
				isPlay = true;
				isFirstPlay = true;
				playPauseBtn.removeClass("play").removeClass("pause").addClass("pause");
				audio.play();
			}
			$e.preventDefault();
			audio.pause();

			p_box.off("mousemove").on("mousemove",function($e){
				$e.preventDefault();

				var p_width = Number( getProgressSize() );
				var startX = $(this).offset().left;
				var lastX = dp2lw(p_width);
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
				var clientX = $e.pageX-startX;
				var per = 100/lastX*clientX;
				if(per<0)per = 0;
				if(per>100)per = 100;
				updateProgress(per);

				audio.currentTime = audio.duration/100*per;
				audio.play();
			})
		})

		v_box.off("mousedown").on("mousedown",function($e){
			$e.preventDefault();

			v_box.off("mousemove").on("mousemove",function($e){
				$e.preventDefault();

				var startX = $(this).offset().left;
				var lastX = dp2lw(100);
				var clientX = $e.pageX-startX;
				var per = 100/lastX*clientX;
				if(per<0)per = 0;
				if(per>100)per = 100;;

				audio.volume = per/100;
				v_p.css("left", (80/100*per)+"px");
				v_bar.css("width", per+"%");
			})

			v_box.off("mouseup mouseleave").on("mouseup mouseleave",function($e){
				$e.preventDefault();
				v_box.off("mousemove mouseup mouseleave");

				var startX = $(this).offset().left;
				var lastX = dp2lw(100);
				var clientX = $e.pageX-startX;
				var per = 100/lastX*clientX;
				if(per<0)per = 0;
				if(per>100)per = 100;

				audio.volume = per/100;
				v_p.css("left", (80/100*per)+"px");
				v_bar.css("width", per+"%");
			})
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
			audio.muted = !audio.muted;
		})

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

		/**/
		clickBtn.off("click").on("click",function(){
			popAudio("click");
			$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
			$(this).parent().removeClass("on").addClass("on")
		})

		function essenceAllChk()
		{
			if( target.parent().parent().attr("data-essence") )
			{
				target.attr("data-ans","ok");
				setEssenceAnsChk( target.parent().parent() );
			}
		}
	}
}
