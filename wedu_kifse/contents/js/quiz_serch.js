function setSerchQuiz($target)
{
	var _this = this;
	var initialization = false;
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
		}
	}

	_this.init = function()
	{
		initialization = true;
		var target = $target;

		var box = target.find(".serch-box");
		var nextBtn = box.find(".serch-next-btn");
		var quizIndex = 0;
		var userChk = new Array();
		var resultBtn = box.find(".serch-result-btn");
		var ans = target.attr("data-ans");
		var userChk;
		var saveBtn = target.find(".serch_upload_btn");
		var btn;

		//var chance = 2;
		var chance = 1;

		function eventInit()
		{
			nextBtn.removeClass("on");
			btn = box.eq(quizIndex).find(".click-obj");
			btn.attr("data-click", "false");
			if( (box.length-1) == quizIndex )
			{
				box.hide().eq(quizIndex).show();

				saveBtn.off("click").on("click",function(){
					popAudio("click");
					alertShowHide(target.parent().parent(), "upload");
				})

			}
			else if( (box.length-2) == quizIndex )
			{
				var temp = box.eq(quizIndex).find(".serch-img-off");
				temp.show();
				btn.hide();
				for(var i = 0; i<userChk.length; i++)
				{
					if(userChk[i] == "true" )
					{
						temp.eq( i ).hide();
						btn.eq( i ).show();
					}
				}
				userChk = new Array();

				btn.off("click").on("click",function(){
					console.log('click test2');
					popAudio("click");

					var index = btn.index( $(this) );

					var bool = $(this).attr("data-click");
					if( bool == "false")
					{
						$(this).attr("data-click", "true");
						$(this).removeClass("on").addClass("on");
						userChk[index] = "true";
					}
					else
					{
						$(this).attr("data-click", "false");
						$(this).removeClass("on")
						userChk[index] = "false";
					}
				})


				resultBtn.off("click").on("click",function(){
					if(isAll())
					{
						if( isAns() )
						{
							resultBtn.off("click");
							++quizIndex;
							alertShowHide(target.parent().parent(), "correct", eventInit);
						}
						else
						{
							--chance;
							if( chance <= 0 )
							{
								resultBtn.off("click");
								++quizIndex;
								alertShowHide(target.parent().parent(), "incorrect", eventInit);
							}
							else
							{
								alertShowHide(target.parent().parent(), "again", function(){
									userChk = new Array();
									btn.attr("data-click", "false");
									btn.removeClass("on")
								});
							}
						}
					}
					else
					{
						alertShowHide(target.parent().parent(), "checkAns");
					}
				})
			}
			else
			{
				if(userChk.length>=1)
				{
					var temp = box.eq(quizIndex).find(".serch-img-off");
					temp.show();
					btn.hide();
					for(var i = 0; i<userChk.length; i++)
					{
						if(userChk[i] == "true" )
						{
							temp.eq( i ).hide();
							btn.eq( i ).show();
						}
					}
					userChk = new Array();
				}
				btn.off("click").on("click",function(){
					console.log('click test1');
					popAudio("click");

					var index = btn.index( $(this) );

					var bool = $(this).attr("data-click");
					if( bool == "false")
					{
						$(this).attr("data-click", "true");
						$(this).removeClass("on").addClass("on");
						userChk[index] = "true";
					}
					else
					{
						$(this).attr("data-click", "false");
						$(this).removeClass("on")
						userChk[index] = "false";
					}

					nextBtn.removeClass("on");
					nextBtn.off("click")
					if(isAll())
					{
						nextBtn.removeClass("on").addClass("on");
						nextBtn.off("click").on("click",function(){
							popAudio("click");
							nextBtn.off("click");
							++quizIndex;
							box.hide().eq(quizIndex).show();
							eventInit();
						})
					}
				})
			}
		}
		function isAll()
		{
			var bool = false;
			btn.each(function(){
				if( $(this).attr("data-click") == "true") bool = true;
			})
			return bool;
		}
		function isAns()
		{
			var temp = new Array();
			btn.each(function(i){
				if( $(this).attr("data-click") == "true")
				{
					var num = Number(i)+1;
					temp.push( num );
				}
			})
			return (temp.toString() == ans.toString());

		}
		eventInit();
	}
}
