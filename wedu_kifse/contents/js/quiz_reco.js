function setQuizRecording($target)
{
	var _this = this;
	var initialization = false;
	var getUserMedia;
	var recorder;
	var joinQuiz = false;

	_this.audio;
	_this.view = function()
	{
		if(initialization==false)
		{
			_this.init();

			var temp = new Array();
			$target.find(".popup_video_box").each(function(i){
				temp[i] = new setQuizVideoPop( $target );
				temp[i].view();
				$target.parent().removeClass("popup_view_video");
			})

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

	_this.init = function()
	{

		initialization = true;
		var isFirstPlay = false;
		var target = $target;
		var closeBtn = target.find(".popup_close_btn");
		var tabIndexNum = Number( target.parent().attr("tabIndex") )+2;
		var fileName = "./"+target.find(".reco-box").data("file") + ".mp3";
		//console.log(fileName);
		var tag = '<audio class="reco-audio" preload="none"></audio>';
		tag	+= '<div class="audio-controller reco">';
		tag	+=	 '<button class="record-start-btn"></button>';
		tag	+=	 '<button class="record-listen-btn"></button>';
		tag	+=	 '<button class="record-save-btn"></button>';
		tag	+=	 '<div class="progress-box"><div class="progress-bar"></div></div>';
		tag	+=	 '<div class="rate-box"><button class="rate-btn"></button><button class="rate-btn on"></button><button class="rate-btn"></button></div>';
		tag	+=	 '<button class="volume-btn on"></button>';
		tag	+=	 '<div class="volume-progress-box"><div class="volume-progress-bar"></div></div>';
		tag	+= '</div>';
		target.find(".reco-box").append(tag);

		var audio = target.find("audio")[0];

		pageAudio = audio;

		var startBtn = target.find(".audio-controller .record-start-btn");
		var listenBtn = target.find(".audio-controller .record-listen-btn");
		var saveBtn = target.find(".audio-controller .record-save-btn");
		var p_box = target.find(".audio-controller .progress-box");
		var p_bar = target.find(".audio-controller .progress-bar");
		var p_p = target.find(".audio-controller .progress-point");

		var volumeBtn = target.find(".audio-controller .volume-btn");
		var v_box = target.find(".audio-controller .volume-progress-box");
		var v_bar = target.find(".audio-controller .volume-progress-bar");
		var v_p = target.find(".audio-controller .volume-progress-point");
		var rateBtn = target.find(".audio-controller .rate-box .rate-btn");
		var recoExBox = target.find(".audio-controller .reco-ex-box");
		var rateArr = ["0.8","1.0","1.2"];
		var mainRate = 1;
		var isPlay = false;

		var clickBtn = target.find(".audio-ex-btn");
		var exBtn = target.find(".reco-ex-btn");
		var exBox = target.find(".audio-ex-txt-box");


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

		//audio.src = fileName;
		audio.addEventListener("timeupdate", function(){
			updateProgress( 100/$(this)[0].duration*$(this)[0].currentTime );
		});
		audio.addEventListener("pause", function(){
			isExPlay = false;
			isRecord = false;
			recoExBox.removeClass("on");
			startBtn.removeClass("on");
			exBtn.removeClass("off");
			isPlay = false;
			//playPauseBtn.removeClass("play").removeClass("pause").addClass("play");
		});
		audio.addEventListener("ended", function(){
			isPlay = false;
			//playPauseBtn.removeClass("play").removeClass("pause").addClass("play");
		});
		audio.addEventListener('volumechange', function() {;
			var per = audio.volume/1 * 100;
			v_p.css("left", (80/100*per)+"px");
			v_bar.css("width", per+"%");
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

		_this.audio = audio;

		if (navigator.mediaDevices === undefined)
		{
			navigator.mediaDevices = {};
		}

		if (navigator.mediaDevices.getUserMedia === undefined)
		{
			navigator.mediaDevices.getUserMedia = function(constraints)
			{
				getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

				if (!getUserMedia)
				{
					return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
				}

				// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
				return new Promise(function(resolve, reject){
					getUserMedia.call(navigator, constraints, resolve, reject);
				});
			}
		}


		var isRecord = false;
		startBtn.off("click").on("click",function(){
			isExPlay = false;

			recoExBox.removeClass("on");
			$(this).removeClass("on");
			isRecord = !isRecord;
			if(isRecord)
			{
				$(this).addClass("on");
				recoExBox.addClass("on");
				audio.src = "";
				updateProgress(0);
				captureMicrophone(function(microphone) {
					audio.srcObject = microphone;

					recorder = RecordRTC(microphone, {
						type: 'audio',
						recorderType: StereoAudioRecorder,
						// numberOfAudioChannels: 1
					});
					console.log(AudioContext)
					recorder.startRecording();

					// release microphone on stopRecording
					recorder.microphone = microphone;
				})

				essenceAllChk(true);
			}
			else
			{
				recorder.stopRecording(stopRecordingCallback);
			}
		})
		listenBtn.off("click").on("click",function(){
			console.log(audio.recordSrc);
			if(audio.src == "") return false;
			audio.src = audio.recordSrc;
			audio.playbackRate = mainRate;
			audio.play();
		})
		saveBtn.off("click").on("click",function(){
			if(audio.recordSrc==""|| audio.recordSrc == undefined || audio.recordSrc == "undefined")
			{
				alert("녹음을 진행 해주세요.")
			}
			else
			{
				var clipName = prompt("녹음 파일 제목을 입력하세요.", String(bookId+"_"+bookData.curPage) );
				if(clipName==null)
				{
					alert("녹음 파일 제목을 입력하세요.")
				}
				else
				{
					var fileLink = document.createElement('a');
					fileLink.href = audio.recordSrc;
					fileLink.download = clipName;
					fileLink.click();
				}
			}
		})


		var isExPlay = false;
		exBtn.off("click").on("click",function(){
			pageAudio = audio;
			if(isRecord)
			{
				isExPlay = false;
				isRecord = false;
				recorder.stopRecording(stopRecordingCallback);
				recoExBox.removeClass("on");
				startBtn.removeClass("on");
			}

			isExPlay = !isExPlay;

			$(this).removeClass("off");
			if(isExPlay)
			{
				$(this).addClass("off");
				audio.src = fileName;
				audio.play();
				audio.playbackRate = mainRate;
			}
			else
			{
				if(!audio.paused)
				{
					audio.pause();
					audio.currentTime = 0;
				}
			}
		})



		startBtn.attr("role", "button");
		startBtn.attr("title", "녹음  및 정지 버튼입니다. 버튼을 누르면 음성 녹음이 시작, 종료 됩니다.");
		startBtn.attr("aria-label", "녹음  및 정지 버튼입니다. 버튼을 누르면 음성 녹음이 시작, 종료 됩니다.");
		++tabIndexNum;
		startBtn.attr("tabIndex", tabIndexNum);

		listenBtn.attr("role", "button");
		listenBtn.attr("title", "듣기 버튼입니다. 버튼을 누르면 나의 말하기 음성이 재생 됩니다.");
		listenBtn.attr("aria-label", "듣기 버튼입니다. 버튼을 누르면 나의 말하기 음성이 재생 됩니다.");
		++tabIndexNum;
		listenBtn.attr("tabIndex", tabIndexNum);


		saveBtn.attr("role", "button");
		saveBtn.attr("title", "저장 버튼입니다. 버튼을 누르면 나의 말하기 음성이 저장 됩니다.");
		saveBtn.attr("aria-label", "저장 버튼입니다. 버튼을 누르면 나의 말하기 음성이 저장 됩니다.");
		++tabIndexNum;
		saveBtn.attr("tabIndex", tabIndexNum);


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

		if( exBtn.attr("title") )
		{
			exBtn.attr("aria-label", exBtn.attr("title"));
		}
		else
		{
			exBtn.attr("title", "예시듣기 버튼입니다. 버튼을 누르면 예시문장이 재생 됩니다.");
			exBtn.attr("aria-label", "예시듣기 버튼입니다. 버튼을 누르면 예시문장이 재생 됩니다.");
		}
		exBtn.attr("tabIndex", tabIndexNum);

		clickBtn.attr("title", "예시 지문 확인 버튼입니다. 버튼을 누르면 예시 지문을 확인할 수 있습니다.");
		clickBtn.attr("aria-label", "예시 지문 확인 버튼입니다. 버튼을 누르면 예시 지문을 확인할 수 있습니다.");
		clickBtn.attr("tabIndex", tabIndexNum);

		if(bookId != "01_01_01" && bookId != "01_02_01" && bookId != "02_01_01" && bookId != "02_02_01" && bookId != "03_01_01" && bookId != "03_02_01" && bookId != "04_01_01"  && bookId != "04_02_01" && bookId != "05_01_01" && bookId != "05_02_01")
		{
			startBtn.attr("title", "녹음 및 정지");
			startBtn.attr("aria-label", "녹음 및 정지");

			listenBtn.attr("title", "듣기");
			listenBtn.attr("aria-label", "듣기");

			saveBtn.attr("title", "저장");
			saveBtn.attr("aria-label", "저장");

			rateBtn.eq(0).attr("title", "영점팔배속");
			rateBtn.eq(0).attr("aria-label", "영점팔배속");

			rateBtn.eq(1).attr("title", "일배속");
			rateBtn.eq(1).attr("aria-label", "일배속");

			rateBtn.eq(2).attr("title", "일점이배속");
			rateBtn.eq(2).attr("aria-label", "일점이배속");

			volumeBtn.attr("title", "음소거 및 음복구");
			volumeBtn.attr("aria-label", "음소거 및 음복구");

			v_box.attr("title", "볼륨");
			v_box.attr("aria-label", "볼륨");

			if( exBtn.attr("title") )
			{
				exBtn.attr("aria-label", exBtn.attr("title"));
			}
			else
			{
				exBtn.attr("title", "예시듣기");
				exBtn.attr("aria-label", "예시듣기");
			}

			clickBtn.attr("title", "예시지문 확인");
			clickBtn.attr("aria-label", "예시지문 확인");
		}


		if( exBox.attr("title"))
		{
			exBox.attr("tabIndex", tabIndexNum);
			exBox.attr("aria-label", exBox.attr("title"))
			exBox.attr("role", "text")
			exBox.attr("aria-hidden", "false")
		}


		function updateProgress($per)
		{
			p_bar.css("width", $per+"%");
			p_p.css("left", $per+"%");
		}

		function getProgressSize()
		{
			return p_box.css("width").split("px")[0];
		}

		rateBtn.off("click").on("click", function(){
			var index = rateBtn.index( $(this) );
			mainRate = Number( rateArr[index] );
			rateBtn.removeClass("on");
			$(this).addClass("on");
			audio.playbackRate = mainRate;
		});


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

	function captureMicrophone(callback)
	{
		navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		}).then(function(microphone) {
			callback(microphone);
		}).catch(function(error) {
			alert('마이크를 인식할수 없습니다.');
			//console.error(error);
		});
	}

	function stopRecordingCallback()
	{
		// var blob = recorder.getBlob();
		//   var file = new File([blob], "test.mp3", {
		//       type: 'audio/mp3'
		//   });
		//   invokeSaveAsDialog(file);
		// ------------------------------------------------------------
		// get access to StereoAudioRecorder object (name as "internal-recorder")
		// ------------------------------------------------------------
		var internalRecorder = recorder.getInternalRecorder();

		// ------------------------------------------------------------
		// get left and right audio channels
		// ------------------------------------------------------------
		var leftchannel = internalRecorder.leftchannel;
		var rightchannel = internalRecorder.rightchannel;

		// ------------------------------------------------------------
		// create your own WAV
		// ------------------------------------------------------------
		mergeLeftRightBuffers({
			desiredSampRate: internalRecorder.desiredSampRate,
			sampleRate: internalRecorder.sampleRate,
			numberOfAudioChannels: internalRecorder.numberOfAudioChannels,
			internalInterleavedLength: internalRecorder.recordingLength,
			leftBuffers: leftchannel,
			rightBuffers: internalRecorder.numberOfAudioChannels === 1 ? [] : rightchannel
		}, function(buffer, view) {
			// ------------------------------------------------------------
			// here is your own WAV (generated by your own codes)
			// ------------------------------------------------------------
			var blob = new Blob([buffer], {
				type: 'audio/mp3'
			});
			_this.audio.srcObject = null;
			_this.audio.src = URL.createObjectURL(blob);
			_this.audio.recordSrc = _this.audio.src;
		});

		recorder.microphone.stop();
	}

	function mergeLeftRightBuffers(config, callback)
	{
		function mergeAudioBuffers(config, cb)
		{
			var numberOfAudioChannels = config.numberOfAudioChannels;

			// todo: "slice(0)" --- is it causes loop? Should be removed?
			var leftBuffers = config.leftBuffers.slice(0);
			var rightBuffers = config.rightBuffers.slice(0);
			var sampleRate = config.sampleRate;
			var internalInterleavedLength = config.internalInterleavedLength;
			var desiredSampRate = config.desiredSampRate;

			if (numberOfAudioChannels === 2)
			{
				leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
				rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);
				if (desiredSampRate)
				{
					leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
					rightBuffers = interpolateArray(rightBuffers, desiredSampRate, sampleRate);
				}
			}

			if (numberOfAudioChannels === 1)
			{
				leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
				if (desiredSampRate)
				{
					leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
				}
			}

			// set sample rate as desired sample rate
			if (desiredSampRate)
			{
				sampleRate = desiredSampRate;
			}

			// for changing the sampling rate, reference:
			// http://stackoverflow.com/a/28977136/552182
			function interpolateArray(data, newSampleRate, oldSampleRate)
			{
				var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
				//var newData = new Array();
				var newData = [];
				//var springFactor = new Number((data.length - 1) / (fitCount - 1));
				var springFactor = Number((data.length - 1) / (fitCount - 1));
				newData[0] = data[0]; // for new allocation
				for (var i = 1; i < fitCount - 1; i++)
				{
					var tmp = i * springFactor;
					//var before = new Number(Math.floor(tmp)).toFixed();
					//var after = new Number(Math.ceil(tmp)).toFixed();
					var before = Number(Math.floor(tmp)).toFixed();
					var after = Number(Math.ceil(tmp)).toFixed();
					var atPoint = tmp - before;
					newData[i] = linearInterpolate(data[before], data[after], atPoint);
				}
				newData[fitCount - 1] = data[data.length - 1]; // for new allocation
				return newData;
			}

			function linearInterpolate(before, after, atPoint)
			{
				return before + (after - before) * atPoint;
			}

			function mergeBuffers(channelBuffer, rLength)
			{
				var result = new Float64Array(rLength);
				var offset = 0;
				var lng = channelBuffer.length;

				for (var i = 0; i < lng; i++)
				{
					var buffer = channelBuffer[i];
					result.set(buffer, offset);
					offset += buffer.length;
				}
				return result;
			}

			function interleave(leftChannel, rightChannel)
			{
				var length = leftChannel.length + rightChannel.length;

				var result = new Float64Array(length);

				var inputIndex = 0;

				for (var index = 0; index < length;)
				{
					result[index++] = leftChannel[inputIndex];
					result[index++] = rightChannel[inputIndex];
					inputIndex++;
				}
				return result;
			}

			function writeUTFBytes(view, offset, string)
			{
				var lng = string.length;
				for (var i = 0; i < lng; i++)
				{
					view.setUint8(offset + i, string.charCodeAt(i));
				}
			}

			// interleave both channels together
			var interleaved;

			if (numberOfAudioChannels === 2)
			{
				interleaved = interleave(leftBuffers, rightBuffers);
			}

			if (numberOfAudioChannels === 1)
			{
				interleaved = leftBuffers;
			}

			var interleavedLength = interleaved.length;

			// create wav file
			var resultingBufferLength = 44 + interleavedLength * 2;

			var buffer = new ArrayBuffer(resultingBufferLength);

			var view = new DataView(buffer);

			// RIFF chunk descriptor/identifier
			writeUTFBytes(view, 0, 'RIFF');

			// RIFF chunk length
			view.setUint32(4, 44 + interleavedLength * 2, true);

			// RIFF type
			writeUTFBytes(view, 8, 'WAVE');

			// format chunk identifier
			// FMT sub-chunk
			writeUTFBytes(view, 12, 'fmt ');

			// format chunk length
			view.setUint32(16, 16, true);

			// sample format (raw)
			view.setUint16(20, 1, true);

			// stereo (2 channels)
			view.setUint16(22, numberOfAudioChannels, true);

			// sample rate
			view.setUint32(24, sampleRate, true);

			// byte rate (sample rate * block align)
			view.setUint32(28, sampleRate * 2, true);

			// block align (channel count * bytes per sample)
			view.setUint16(32, numberOfAudioChannels * 2, true);

			// bits per sample
			view.setUint16(34, 16, true);

			// data sub-chunk
			// data chunk identifier
			writeUTFBytes(view, 36, 'data');

			// data chunk length
			view.setUint32(40, interleavedLength * 2, true);

			// write the PCM samples
			var lng = interleavedLength;
			var index = 44;
			var volume = 1;
			for (var i = 0; i < lng; i++)
			{
				view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
				index += 2;
			}

			if (cb)
			{
				return cb({buffer: buffer, view: view});
			}

			postMessage({buffer: buffer, view: view});
		}

		if (!isChrome)
		{
		// its Microsoft Edge
			mergeAudioBuffers(config, function(data) {
			    callback(data.buffer, data.view);
			});
			return;
		}


		var webWorker = processInWebWorker(mergeAudioBuffers);

		webWorker.onmessage = function(event)
		{
			callback(event.data.buffer, event.data.view);
			// release memory
			URL.revokeObjectURL(webWorker.workerURL);
		};

		webWorker.postMessage(config);
	}

	function processInWebWorker(_function)
	{
		var workerURL = URL.createObjectURL(new Blob([_function.toString(),
			';this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
		], {type: 'application/javascript'}));

		var worker = new Worker(workerURL);
		worker.workerURL = workerURL;
		return worker;
	}
}
