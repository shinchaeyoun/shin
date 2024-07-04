var pageAudio = new Audio();
var popViewLastEvent;
function setPageEvent()
{
	pageAudio.pause();
	popAudio_quiz2("allStop");

	popViewLastEvent = new setPopViewLast( false );

	var popup = $("#middle").find(".popup_view");
	popup.each(function(){
		var _this = $(this);
		var naem = _this.data("popup-name");
		//_this.removeData("popup-name");
		//_this.removeAttr("data-popup-name");

		var btn = $(this).parent().find("[data-popup-target='"+naem+"']");
		btn.removeData("popup-target");
		btn.removeAttr("data-popup-target");

		var eventArr = new Array();
		_this.find(".popup_box").each(function(i){
			$(this).data("popID", $(this).parent().parent().find(".s_reader-num").text()+"-"+$(this).parent().index()+"-"+i+"/" );

			$(this).find(".pop-down-btn").off("click").on("click",function(){
				var downLoadFile = ( $(this).data("down") );
				//window.open( "./down/"+downLoadFile, "_blank");
				alert("준비중 입니다.");
			})
			$(this).find(".pop-print-btn").off("click").on("click",function(){
				//
			})

			//console.log( $(this).parent().parent().find(".s_reader-num").text()+"-"+$(this).parent().index()+"-"+i+"/" );
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
				$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
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
					$(this).find(".popup_content").append("<div class='quiz-alert-box'></div>");
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
				$("audio").each(function(){
					if( $(this)[0].paused == false )
					{
						$(this)[0].pause();
					}
				})
			})
			popNavi.nextBtn.bind("click",function(){
				pageAudio.pause();
				eventArr[popNavi.index+1].view();
				$("audio").each(function(){
					if( $(this)[0].paused == false )
					{
						$(this)[0].pause();
					}
				})
			})

			// if( $(this).find(".listening-box").length > 0 )
			// {
			// 	var listen = new setListening( $(this) );
			// }
		})


		btn.off("click").on("click", function(){
			if( _this.data("option") == "sub" )
			{
				_this.parent().find(".popup_close_btn").trigger("click");
			}
			_this.css("visibility","visible").show().focus();
			eventArr[0].view();
		});
		//btn.not(".result-pop-btn").show();
		btn.show();

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

	if( _this.index == 0 || _this.index == "0" ) _this.prevBtn.css("visibility", "hidden");
	if( _this.index == (targetAll.length-1) ) _this.nextBtn.css("visibility", "hidden");

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

function alertShowHide($box, type, $callback, $option)
{
	switch (type)
	{
		case "correct":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box correct"></div>');
		
			if($option)
			{
				if($option=="not-sound")
				{

				}
				else
				{
					popAudio("correct");
				}
			}
			else
			{
				popAudio("correct");
			}
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

		case "upload":
			$box.find(".quiz-alert-box").html('<div class="quiz-alert-img-box upload"></div>');
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

function setPopViewLast($bool)
{
	var isPage = $bool;
	var _this = this;

	_this.view = function(){}
	_this.update = function(){}


	if(isPage)
	{
		var target = $(".popup_view.popup_view_last");
		var graph = target.find(".popup-box-last-graph");
		var oxList = target.find(".popup_box_last_ox_list .popup_box_last_ox_box");
		var popupList = $(".popup_view").not(target);
		var lastResetBtn = target.find(".popup_last_reset_btn");

		lastResetBtn.off("click").on("click",function(){
			bookLoaer.pageLoad(bookData.curPage);
		})

		_this.view = function()
		{
			_this.update();
		}
		_this.update = function ()
		{
			var allChk = 0;
			var graphNum = 0;
			oxList.removeClass("ok").removeClass("no");
			popupList.each(function(i){
				var isNull = false;
				var isAns = true;

				$(this).find(".popup_box").each(function(){
					if( $(this).attr("data-last-ans") && (isNull == false) )
					{
						if( $(this).attr("data-last-ans") != "ok" )
						{
							isAns = false;
						}
					}
					else
					{
						isNull = true;
					}
				})

				if( isNull == false )
				{
					++allChk;
					if( isAns )
					{
						++graphNum;
						oxList.eq(i).addClass("ok");
					}
					else
					{
						oxList.eq(i).addClass("no");
					}
				}
			})

			if(allChk==4)
			{
				$(".result-pop-btn").show();
			}


			graph.removeClass("popup-box-last-graph-0").removeClass("popup-box-last-graph-1").removeClass("popup-box-last-graph-2").removeClass("popup-box-last-graph-3").removeClass("popup-box-last-graph-4");
			graph.addClass("popup-box-last-graph-"+graphNum);
		}
	}
}