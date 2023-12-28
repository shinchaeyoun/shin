var pageAudio = new Audio();
function setPageEvent($bookId)
{
	pageAudio.pause();
	popAudio_quiz1("allStop");
	popAudio_quiz2("allStop");
	popAudio_quiz3("allStop");

	var bookIdTemp = "00-00-00"
	if($bookId) bookIdTemp = $bookId;

	var popup = $("#middle").find(".popup_view");
	popup.each(function(){
		var _this = $(this);
		var naem = _this.data("popup-name");
		_this.removeData("popup-name");
		_this.removeAttr("data-popup-name");

		var btn = $(this).parent().find("[data-popup-target='"+naem+"']");
		btn.removeData("popup-target");
		btn.removeAttr("data-popup-target");

		var eventArr = new Array();
		_this.find(".popup_box").each(function(i){
			//$(this).data("popID", $(this).parent().parent().find(".s_reader-num").text()+"-"+i+"/" );
			$(this).data("popID", bookIdTemp+"-"+$(".s_reader-num").text()+"-"+i+"/" );

			switch ($(this).data("type"))
			{
				case "video-pop":
					eventArr[i] = new setQuizVideoPop( $(this) );
				break;

				case "button-click":
					eventArr[i] = new setQuizButtonClick( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;

				case "calculator":
					eventArr[i] = new setQuizCalculator( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;

				case "lineDrawing":
					eventArr[i] = new setLineDrawing( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;

				case "drawing-pop":
					eventArr[i] = new setDrawing( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;
				case "dragAndDrop":
					eventArr[i] = new setDragAndDrop( $(this) );
				break;

				case "toTheLine":
					eventArr[i] = new setToTheLine( $(this) );
				break;

				case "drawfull":
					eventArr[i] = new setDrawfull( $(this) );
				break;

				case "drawfull":
					eventArr[i] = new setDrawfull( $(this) );
				break;

				case "recode":
					eventArr[i] = new setQuizRecording( $(this) );
				break;

				case "listen":
					eventArr[i] = new setListening( $(this) );
				break;

				case "ladder":
					eventArr[i] = new setLadderQuiz( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>");
				break;

				case "write":
					eventArr[i] = new setQuizwrite( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break;

				case "popup-view-last":
					eventArr[i] = new setPopViewLast( true );
					popViewLastEvent = eventArr[i];
				break;

				case "examin":
					eventArr[i] = new setExaminQuiz( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>");
				break;

				case "serch":
					eventArr[i] = new setSerchQuiz( $(this) );
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>");
				break;

				case "customPageEvent":
					eventArr[i] = new customPageEvent( $(this) );
				break;

				case "customPageEvent-l1":
					eventArr[i] = new customPageEventl1( $(this) );
				break;
				case "customPageEvent-l2":
					eventArr[i] = new customPageEventl2( $(this) );
				break;
				case "customPageEvent-r1":
					eventArr[i] = new customPageEventr1( $(this) );
				break;
				case "customPageEvent-r2":
					eventArr[i] = new customPageEventr2( $(this) );
				break;

				default:
					eventArr[i] = new function()
					{
						this.view = function()
						{
							if(btn.hasClass("click-obj-img")) popAudio("click");
						}
					}
			}
			$(this).removeData("type");
			$(this).removeAttr("data-type");

			var popNavi = new setPopNavi( $(this) );
			popNavi.prevBtn.bind("click",function(){
				pageAudio.pause();
				eventArr[popNavi.index-1].view();
			})
			popNavi.nextBtn.bind("click",function(){
				pageAudio.pause();
				eventArr[popNavi.index+1].view();
			})

			// if( $(this).find(".listening-box").length > 0 )
			// {
			// 	var listen = new setListening( $(this) );
			// }
		})


		/*btn.off("click").on("click", function(){
			_this.css("visibility","visible").show().focus();
			eventArr[0].view();
		});
		btn.show();*/
		_this.css("visibility","visible").show().focus();
		eventArr[0].view();


		var index = Number( btn.attr("tabIndex") );
		var closeBtn = _this.find(".popup_close_btn");;

		closeBtn.off("click").on("click",function() {
			_this.parent().find(".popup_view").hide();
			btn.focus();
			pageAudio.pause();
		})
	});

	//$("#wrap #left-page .contents-box > div:first-child").append("<div class='quiz-alert-box'></div>"  );
	//$("#wrap #right-page .contents-box > div:first-child").append("<div class='quiz-alert-box'></div>"  );

	if(typeof custom_onLoadEvent === "function" )
	{
		custom_onLoadEvent();
	}

	var customSpeaker = $(".book-page > .speaker-btn");
	customSpeaker.each(function(){
		var isPlay = false;

		$(this).off("click").on("click",function(){
			isPlay = !isPlay;
			if(isPlay)
			{
				pageAudio = new Audio("./"+$(this).attr("data-mp3")+".mp3");
				pageAudio.addEventListener("ended", function(){
					isPlay = false;
				});
				pageAudio.play();
			}
			else
			{
				pageAudio.pause();
				pageAudio.currentTime = 0;
			}
		})
	})
}

function setPopNavi($target)
{
	var _this = this;
	var target = $target;
	var targetAll = target.parent().find(".popup_box");
	_this.index = Number(targetAll.index(target));
	_this.prevBtn = target.find(".prev_paging_btn");
	_this.nextBtn = target.find(".next_paging_btn");

	target.find(".cur_num").text( _this.index+1 );
	target.find(".max_num").text( targetAll.length );

	if( _this.index == 0 || _this.index == "0" ) _this.prevBtn.hide();
	if( _this.index == (targetAll.length-1) ) _this.nextBtn.hide();

	_this.prevBtn.off("click").on("click",function(){
		targetAll.hide().eq( _this.index-1 ).show().find(".popup_title").focus();
	})

	_this.nextBtn.off("click").on("click",function(){
		targetAll.hide().eq( _this.index+1 ).show().find(".popup_title").focus();
	})
}

function popAudio(type)
{
	var correct = new Audio('./common/audio/correct.mp3');
	var incorrect = new Audio('./common/audio/incorrect.mp3');
	var finish = new Audio('./common/audio/finish.mp3');
	var click = new Audio('./common/audio/click.mp3');

	switch (type)
 	{
		case "correct":
			correct.play();
		break;

		case "incorrect":
			incorrect.play();
		break;

		case "finish":
			finish.play();
		break;

		case "click":
			click.play();
		break;
	}
}


function popAudio_quiz1($type)
{
	var ans = new Audio('./common/audio/quiz1/ans.mp3');
	var click = new Audio('./common/audio/quiz1/click.mp3');
	var no = new Audio('./common/audio/quiz1/no.mp3');
	var not = new Audio('./common/audio/quiz1/not.mp3');
	var ok = new Audio('./common/audio/quiz1/ok.mp3');

	switch ($type)
 	{
		case "ans":
			ans.play();
		break;

		case "click":
			click.play();
		break;

		case "no":
			no.play();
		break;

		case "not":
			not.play();
		break;

		case "ok":
			ok.play();
		break;
	}
}

var pop_Quiz2_bgm = new Audio('./common/audio/bgm.mp3');
var pop_Quiz2_watch = new Audio('./common/audio/quiz2/watch.mp3');
var pop_Quiz2_ok = new Audio('./common/audio/quiz2/ok.mp3');
var pop_Quiz2_no = new Audio('./common/audio/quiz2/no.mp3');
var pop_Quiz2_ans = new Audio('./common/audio/quiz2/ans.mp3');
var pop_Quiz2_end = new Audio('./common/audio/quiz2/end.mp3');
function popAudio_quiz2($type)
{
	switch ($type)
 	{
		case "bgm":
			pop_Quiz2_bgm.loop = true;
			pop_Quiz2_bgm.play();
			pop_Quiz2_bgm.currentTime = 0;
		break;

		case "watch":
			pop_Quiz2_watch.loop = true;
			pop_Quiz2_watch.play();
			pop_Quiz2_watch.currentTime = 0;
		break;
		case "ok":
			pop_Quiz2_ok.play();
			pop_Quiz2_ok.currentTime = 0;
		break;
		case "no":
			pop_Quiz2_no.play();
			pop_Quiz2_no.currentTime = 0;
		break;
		case "ans":
			pop_Quiz2_ans.play();
			pop_Quiz2_ans.currentTime = 0;
		break;
		case "end":
			pop_Quiz2_end.play();
			pop_Quiz2_end.currentTime = 0;
		break;


		case "allStop":
			pop_Quiz2_bgm.pause();
			pop_Quiz2_watch.pause();
			pop_Quiz2_ok.pause();
			pop_Quiz2_no.pause();
			pop_Quiz2_ans.pause();
			pop_Quiz2_end.pause();
		break;
	}
}

function popAudio_quiz3($type)
{
	var on = new Audio('./common/audio/quiz3/on.mp3');
	var get = new Audio('./common/audio/quiz3/get.mp3');
	var not = new Audio('./common/audio/quiz3/not.mp3');
	var click = new Audio('./common/audio/quiz3/click.mp3');
	var ans = new Audio('./common/audio/quiz3/ans.mp3');
	var no = new Audio('./common/audio/quiz3/no.mp3');

	switch ($type)
 	{
		case "on":
			on.play();
		break;

		case "get":
			get.play();
		break;

		case "not":
			not.play();
		break;

		case "click":
			click.play();
		break;

		case "ans":
			ans.play();
		break;

		case "no":
			no.play();
		break;
	}
}

function alertShowHide($box, type, $callback)
{
	switch (type)
	{
		case "correct":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box correct"></div>');
			popAudio("correct");
		break;

		case "incorrect":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box incorrect"></div>');
			popAudio("incorrect");
		break;

		case "again":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box again"></div>');
			popAudio("incorrect");
		break;

		case "checkAns":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box checkAns"></div>');
			popAudio("incorrect");
		break;

		case "write":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box write"></div>');
			popAudio("incorrect");
		break;

		case "save":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box save"></div>');
			popAudio("correct");
		break;

		case "custom":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box custom"></div>');
		break;
	}

	$box.stop();
	$box.find("*").stop();
	$box.find(".quiz-alert-box").show().animate({"opacity":"1"}, 1000, function(){
		$(this).delay(2000).animate({"opacity":"0"}, 1000, function(){
			$(this).hide();
			if( typeof $callback === "function" )
			{
				$callback();
			}
		});
	});
}

function setEssenceAnsChk($div)
{
	var middleBox = $div;
	var isAll = true;
	var bool = true;
	middleBox.find(".popup_box").each(function(i){
		if( $(this).attr("data-ans") )
		{
			var chk = $(this).attr("data-ans");

			if( chk == "ok" )
			{
			}
			else
			{
				bool = false;
			}
		}
		else
		{
			isAll = false;
		}
	})

	if( isAll )
	{
		var listFolder = middleBox.attr("data-essence");
		var listTarget = $("#essence-left").find("[data-folder='"+listFolder+"']").find(".pgae-ans-chk");

		listTarget.removeClass("ok").removeClass("no");

		var tempSaveData="";
		if(bool)
		{
			listTarget.addClass("ok");
			tempSaveData="ok";
		}
		else
		{
			listTarget.addClass("no");
			tempSaveData="no";
		}

		var tempID = listFolder+"-essenceResultData";
		essenceResultDataID.push( tempID );

		var newIDArr = new Array();
		essenceResultDataID.forEach(function(element){
			if (!newIDArr.includes(element))
			{
				newIDArr.push(element);
			}
		});

		essenceResultDataID = newIDArr;

		localStorage.setItem(uniqId+"-essenceResultDataID", JSON.stringify(essenceResultDataID));
		localStorage.setItem(tempID, tempSaveData);
	}
}