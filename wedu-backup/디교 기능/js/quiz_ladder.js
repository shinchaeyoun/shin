function setLadderQuiz($target)
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

		var tabIndexNum = Number( target.parent().attr("tabIndex") )+2;
		var dragBtn = target.find(".ladder-drag-obj");
		var dropBtn = target.find(".ladder-drop-obj");
		var ansCheckBtn = target.find(".ans-check-btn");
		var chance = 2;
		var curObj;
		var ansImg = target.find(".ladder-ans");

		var speakerBtn = target.find(".speaker-btn");
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

		ansCheckBtn.off("click").on("click", function(){
			var bool = true;
			dropBtn.each(function(){
				if( $(this).attr("class").length <= 15 ) bool = false;
			})

			if(bool)
			{
				var bool2 = true;
				dropBtn.each(function(){
					if( $(this).data("ans") != $(this).data("user") ) bool2 = false;
				})

				if(bool2)
				{
					ansCheckBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
					ansCheckBtn.css({"pointer-events":"none"});

					dragBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
					dragBtn.css({"pointer-events":"none"});
					dragBtn.removeAttr("tabIndex");
					dropBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
					dropBtn.css({"pointer-events":"none"});
					dropBtn.removeAttr("tabIndex");
					/*alertShowHide(target.parent().parent(), "correct", function(){
						var temp = ansImg.length;
						ansImg.each(function(i){
							$(this).delay(2000*i).fadeIn();
						})
					});*/
					var temp = ansImg.length;
					ansImg.each(function(i){
						$(this).delay(3000*i).fadeIn();
					})
					$("#"+ $(this).attr("data-target") ).show();
					setTimeout(function(){
						alertShowHide(target.parent().parent(), "correct");
					},(temp)*3000);

					essenceAllChk(true);
				}
				else
				{
					--chance;
					if(chance==0)
					{
						ansCheckBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
						ansCheckBtn.css({"pointer-events":"none"});

						dragBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
						dragBtn.css({"pointer-events":"none"});
						dragBtn.removeAttr("tabIndex");
						dropBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
						dropBtn.css({"pointer-events":"none"});
						dropBtn.removeAttr("tabIndex");
						alertShowHide(target.parent().parent(), "incorrect", function(){
							var temp = ansImg.length;
							ansImg.each(function(i){
								$(this).delay(3000*i).fadeIn();
							})
						});
						$("#"+ $(this).attr("data-target") ).show();

						essenceAllChk(false);
					}
					else
					{
						curObj = "";
						dragBtn.data("isOn", "off");
						dragBtn.removeClass("on")

						dropBtn.removeClass("drop1").removeClass("drop2").removeClass("drop3").removeClass("drop4").removeClass("drop5").removeClass("drop6");
						dropBtn.data("user", "reset" );
						alertShowHide(target.parent().parent(), "again");
					}
				}
			}
			else
			{
				alertShowHide(target.parent().parent(), "checkAns");
			}
		})

		dragBtn.each(function(i){
			var n = Number(i)+1;
			$(this).data("num", n);
		})

		dragBtn.off("click").on("click", function(){
			if(curObj)
			{
				if(curObj.data("isOn") == "on")
				{
					curObj = $(this);
					var name = "drag"+ $(this).data("num");
					$(this).removeClass("on").addClass("on");
				}
				else
				{
					curObj = $(this);
					var name = "drag"+ $(this).data("num");
					dragBtn.removeClass("on");
					$(this).addClass("on");
				}
			}
			else
			{
				curObj = $(this);
				var name = "drag"+ $(this).data("num");
				dragBtn.removeClass("on");
				$(this).addClass("on");
			}
			popAudio("click");
		})
		dropBtn.off("click").on("click", function(){
			if( curObj )
			{
				$(this).removeClass("drop1").removeClass("drop2").removeClass("drop3").removeClass("drop4").removeClass("drop5").removeClass("drop6");

				//var name = "drop"+curObj.data("num");
				var name = "drop"+curObj.attr("class").replace(/[^0-9]/g, '');

				dropBtn.removeClass(name);
				$(this).addClass(name);
				curObj.data("isOn", "on");
				popAudio("click");
				$(this).data("user", curObj.data("ans") );

			}
			else
			{
				popAudio("incorrect");
			}
		})

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

			if($bool) target.attr("data-last-ans","ok");
			else target.attr("data-last-ans","no");
			popViewLastEvent.update();
		}
	}
}
