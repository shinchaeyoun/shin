function setQuizButtonClick($target)
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

		var optionType = target.data("option");
		var optionType2 = target.data("option2");
		var optionType3 = target.data("option3");
		var tabIndexNum = Number( target.parent().attr("tabIndex") )+2;
		var btn = target.find(".click-obj");
		var countNum = 0;
		var countBox = target.find(".count-box");
		var chance = 2;
		var audioArr = new Array();
		target.removeData("option");
		target.removeAttr("data-option");
		//if(optionType == "ans-multiple") chance = 1;
		var ansCheckBtn = target.find(".ans-check-btn");
		var saveBtn = target.find(".click_save_btn");
		var svgBox;
		var svgObj;

		var customNextBtn = target.find(".practice-next-btn, .examin-result-btn");
		customNextBtn.off("click").on("click",function(){
			$("#" + $(this).data("target") ).show();
			$("#" + $(this).data("hide-target") ).hide();
			popAudio("click");
		})
		if(optionType == "motion")
		{
			var eleId = target.data("target");
			svgBox = new Raphael(document.getElementById(eleId), "100%", "100%");

			svgObj = new Array();
			btn.each(function(i){
				var temp = $( "#"+$(this).data("target") );
				svgObj[i] = svgBox.image(temp.data("img"), temp.css("left"), temp.css("top"), temp.css("width"), temp.css("height") );
			})
		}
		/**/
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
		saveBtn.off("click").on("click", function(){
			var bool = true;
			btn.each(function(){
				if( !$(this).parent().find(".click-obj").hasClass("on")  )
				{
					bool = false;
				}
			})
			if(bool)
			{
				alertShowHide(target.parent().parent(), "save");
				essenceAllChk1();

				if( $(this).attr("data-target") )
				{
					$("#"+$(this).attr("data-target")).show();
				}
			}
			else
			{
				alertShowHide(target.parent().parent(), "again");
			}
		})
		$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
		$(this).removeClass("on").removeClass("no").addClass("on");
		/**/

		ansCheckBtn.off("click").on("click", function(){
			var bool = false;

			btn.each(function(){
				if( $(this).hasClass("on") ) bool = true;
			})

			if(bool)
			{
				if(optionType2=="chk")
				{
					ansCheckBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
					ansCheckBtn.css({"pointer-events":"none"});

					btn.off("click").removeClass("focusRemove").addClass("focusRemove");
					btn.css({"pointer-events":"none"});
					btn.removeAttr("tabIndex");
					alertShowHide(target.parent().parent(), "correct");
					essenceAllChk1();

					btn.removeClass("on");
					btn.each(function(){
						if( $(this).data("ans") == "yes" ) $(this).addClass("yes");
						else $(this).addClass("not");
					})
				}
				else
				{
					btn.each(function(){
						if( $(this).hasClass("on") && $(this).data("ans") != "yes" ) bool = false;
						if( !$(this).hasClass("on") && $(this).data("ans") == "yes" ) bool = false;

						if( $(this).hasClass("on") && $(this).data("ans") == "no" ) bool = false;
						if( !$(this).hasClass("on") && $(this).data("ans") == "yes" ) bool = false;
					})
					if(optionType2=="any")
					{
						bool = true;
					}
					if(bool)
					{
						ansCheckBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
						ansCheckBtn.css({"pointer-events":"none"});

						btn.off("click").removeClass("focusRemove").addClass("focusRemove");
						btn.css({"pointer-events":"none"});
						btn.removeAttr("tabIndex");
						alertShowHide(target.parent().parent(), "correct");
						essenceAllChk2(true);

						btn.removeClass("on");
						btn.each(function(){
							if( $(this).data("ans") == "yes" ) $(this).addClass("yes");
							else $(this).addClass("not");
						})

						if( $(this).attr("data-target") )
						{
							$("#"+$(this).attr("data-target")).show();
						}
					}
					else
					{
						--chance;
						if(chance==0)
						{
							ansCheckBtn.off("click").removeClass("focusRemove").addClass("focusRemove");
							ansCheckBtn.css({"pointer-events":"none"});

							btn.removeClass("on");
							btn.off("click").removeClass("focusRemove").addClass("focusRemove");
							btn.css({"pointer-events":"none"});
							btn.removeAttr("tabIndex");
							alertShowHide(target.parent().parent(), "incorrect");
							essenceAllChk2(false);
							btn.each(function(){
								if( $(this).data("ans") == "yes" ) $(this).addClass("yes");
								else $(this).addClass("not");
							})
						}
						else
						{
							btn.removeClass("on");
							alertShowHide(target.parent().parent(), "again");
						}
					}
				}
			}
			else
			{
				alertShowHide(target.parent().parent(), "checkAns");
			}
		})

		btn.off("click").on("click", function(){
			if(optionType == "toggle-show-hide")
			{
				popAudio("click");
				if( $(this).hasClass("on") )
				{
					$(this).removeClass("on");

					$($(this).data("hide-target") ).hide();
					$($(this).data("target") ).hide();
				}
				else
				{
					$(this).removeClass("on").addClass("on");
					$($(this).data("hide-target") ).hide();
					$($(this).data("target") ).show();
				}

				var bool = false;
				$(this).parent().find(".click-obj").each(function(){
					if( $(this).hasClass("on") )
					{
						bool = true;
					}
				})
				if( bool ) $("#" + $(this).parent().data("target") ).show();
				else $("#" + $(this).parent().data("target") ).hide();
			}
			else if(optionType == "multiple-count")
			{
				popAudio("click");
				if( $(this).hasClass("on") )
				{
					--countNum;
					$(this).removeClass("on");
				}
				else
				{
					++countNum;
					$(this).removeClass("on").addClass("on");
				}

				countBox.text( countNum );
				if( countBox.data("change") )
				{
					var txt = countBox.data("change").replace("???", countNum);
					countBox.attr("title", txt );
					countBox.attr("aria-label", txt );
				}
			}
			else if(optionType == "ans-count2")
			{
				if( $(this).attr("data-target") )
				{
					$("#"+ $(this).attr("data-target")).show();
				}

				if( $(this).parent().data("ans") == $(this).data("ans") )
				{
					$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
					$(this).css({"pointer-events":"none"});
					$(this).removeClass("on").addClass("on");
					$(this).data("view", "true");

					if( $(this).parent().data("count") )
					{
						++countNum;
						if( Number($(this).parent().data("count")) <= countNum )
						{
							btn.off("click").removeClass("focusRemove").addClass("focusRemove");
							btn.css({"pointer-events":"none"});
							btn.not($(this)).removeAttr("tabIndex");
							alertShowHide(target.parent().parent(), "correct");
						}
						else
						{
							popAudio("correct");
						}
					}


					if( $(this).parent().attr("data-viewNum") )
					{
						var viewNum = Number( $(this).parent().attr("data-viewNum") );
						var num = Number( $(this).data("math") );
						viewNum += num;
						$(this).parent().attr("data-viewNum", viewNum );

						countBox.text( viewNum );

						if( countBox.data("change") )
						{
							var txt = countBox.data("change").replace("???", viewNum);
							countBox.attr("title", txt );
							countBox.attr("aria-label", txt );
						}
					}
				}
				else
				{
					$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
					$(this).css({"pointer-events":"none"});
					$(this).removeClass("on").removeClass("no").addClass("no");
					var ___this = $(this);
					setTimeout(function(){
						___this.removeClass("on").removeClass("no");
					},4000);
					alertShowHide(target.parent().parent(), "again", function(){
					});
				}
			}
			else if(optionType == "ans-count")
			{
				if( $(this).parent().data("ans") == $(this).data("ans") )
				{
					$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
					$(this).css({"pointer-events":"none"});
					$(this).removeClass("on").addClass("on");
					$(this).data("view", "true");

					if( $(this).parent().data("count") )
					{
						++countNum;
						if( Number($(this).parent().data("count")) <= countNum )
						{
							btn.off("click").removeClass("focusRemove").addClass("focusRemove");
							btn.css({"pointer-events":"none"});
							btn.not($(this)).removeAttr("tabIndex");
							alertShowHide(target.parent().parent(), "correct");
						}
						else
						{
							popAudio("correct");
						}
					}
				}
			}
			else if(optionType == "hideAndShowToggle")
			{
				popAudio("correct");

				$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
				$(this).removeClass("on").removeClass("no").addClass("on");

				if(optionType2=="hideAndShowToggle")
				{
					$("." + $(this).data("hide-target") ).hide();
					$("#" + $(this).data("target") ).show();
				}
			}
			else if(optionType == "lock")
			{
				if( isAll( $(this).data("option") ) )
				{
					clickEvent($(this));
				}
			}
			else if(optionType == "group")
			{
				popAudio("correct");

				$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
				$(this).removeClass("on").removeClass("no").addClass("on");
			}
			else if(optionType == "ans-multiple")
			{
				popAudio("click");
				if( $(this).hasClass("on") )
				{
					$(this).removeClass("on");
				}
				else
				{
					$(this).removeClass("on").addClass("on");
				}
			}
			else if(optionType == "ans-group")
			{
				if( $(this).parent().data("ans") == $(this).data("ans") )
				{
					$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
					$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
					$(this).css({"pointer-events":"none"});
					$(this).removeClass("on").removeClass("no").addClass("on");
					$(this).data("view", "true");

					alertShowHide(target.parent().parent(), "correct");

					if( $(this).parent().data("target") )
					{
						$("#" + $(this).parent().data("target") ).show();
					}
				}
				else
				{
					var tempChance = 2;
					if( $(this).parent().data("tempChance") ) tempChance = $(this).parent().data("tempChance");


					--tempChance;
					$(this).parent().data("tempChance", tempChance)
					$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
					$(this).css({"pointer-events":"none"});
					$(this).removeClass("on").removeClass("no").addClass("no");
					$(this).data("view", "true");

					if(tempChance==0)
					{
						btn.removeClass("on").removeClass("no").addClass("no");

						alertShowHide(target.parent().parent(), "incorrect");
						btn.each(function() {
							if( $(this).data("ans") == $(this).parent().data("ans") )
							{
								if( target.data("option2") )
								{
									if(  target.data("option2") == "multiple" )
									{
									}
								}
								else
								{
									$(this).removeClass("no").removeClass("on").addClass("on");

									$("#" + $(this).data("target") ).show();
								}
							}
						})
					}
					else
					{
						alertShowHide(target.parent().parent(), "again");
					}
				}
			}
			else if(optionType == "ans" || optionType == "ans-multiple")
			{
				if( $(this).parent().data("ans") == $(this).data("ans") )
				{
					btn.removeClass("on").removeClass("no").addClass("no");
					$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
					$(this).css({"pointer-events":"none"});
					$(this).removeClass("on").removeClass("no").addClass("on");
					$(this).data("view", "true");
					// 추가
					$("." + $(this).data("target") ).show();

					if( target.data("option3") )
					{
						if(  target.data("option3") == "acc-hide" )
						{
							$($(this).data("hide-target") ).hide();
						}
					}

					if( target.data("option2") )
					{
						if(  target.data("option2") == "noAlert" )
						{
							popAudio("correct");
						}
					}
					else
					{
						alertShowHide(target.parent().parent(), "correct");
					}

					if(optionType=="ans-multiple")
					{
						$("#" + $(this).data("target") ).show();
						$(this).css({"background":"none"});
					}

					if( isAll2( $(this).data("ans") ) )
					{
						btn.off("click").removeClass("focusRemove").addClass("focusRemove");
						btn.css({"pointer-events":"none"});

						btn.not($(this)).removeAttr("tabIndex");
						$("#" + $(this).data("target") ).show();

					}


					if( $(this).parent().data("count") )
					{
						++countNum;
						if( Number($(this).parent().data("count")) <= countNum )
						{
							btn.off("click").removeClass("focusRemove").addClass("focusRemove");
							btn.css({"pointer-events":"none"});
							btn.not($(this)).removeAttr("tabIndex");
						}
					}

					if( target.data("option2") )
					{
						if(  target.data("option2") == "multiple" )
						{
							$(this).parent().find(".click-obj").off("click").removeClass("focusRemove").addClass("focusRemove");
							$(this).parent().find(".click-obj").css({"pointer-events":"none"});
							$(this).parent().find(".click-obj").removeClass("on").addClass("on");
							$(this).parent().find(".click-obj").data("view", "true");
							$(this).parent().find(".click-obj").not($(this)).removeAttr("tabIndex");
						}
						else if(  target.data("option2") == "acc-hide" )
						{
							$($(this).data("hide-target") ).hide();
						}
					}
				}
				else
				{
					--chance;
					//$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
					//$(this).css({"pointer-events":"none"});
					$(this).removeClass("on").removeClass("no").addClass("no");
					$(this).data("view", "true");

					if(chance==0)
					{
						btn.removeClass("on").removeClass("no").addClass("no");
						btn.off("click").removeClass("focusRemove").addClass("focusRemove");
						btn.css({"pointer-events":"none"});

						alertShowHide(target.parent().parent(), "incorrect");
						btn.each(function() {
							if( $(this).data("ans") == $(this).parent().data("ans") )
							{
								if( target.data("option2") )
								{
									if(  target.data("option2") == "multiple" )
									{
									}
								}
								else
								{
									$(this).removeClass("no").removeClass("on").addClass("on");

									$("#" + $(this).data("target") ).show();
								}
							}
						})
					}
					else
					{
						var imgReset = $(this);
						alertShowHide(target.parent().parent(), "again", function(){
							imgReset.removeClass("on").removeClass("no");
						});
					}
				}
			}
			else if(optionType == "allHideTargetShow")
			{
				$($(this).data("hide-target") ).hide();
				$("#" + $(this).data("target") ).show();


				if( $(this).hasClass("speaker-btn"))
				{
					var _thisTemp = $(this);
					_thisTemp.attr("data-essenceChk", "ok");
					var index = btn.index($(this));
					pageAudio.pause();
					pageAudio = new Audio("./"+$(this).attr("data-mp3")+".mp3");
					pageAudio.addEventListener("ended", function(){
						$( _thisTemp.data("hide-target") ).hide();
					});

					pageAudio.play();
					if( btn.length == speakerBtn.length )
					{
						var tempBool = true;
						speakerBtn.each(function(){
							if( $(this).attr("data-essenceChk") != "ok") tempBool = false;
						})
						if(tempBool) essenceAllChk1();
					}
				}
				else if($(this).data("mp3") )
				{
					var _thisTemp = $(this);
					pageAudio.pause();
					pageAudio = new Audio("./"+$(this).attr("data-mp3")+".mp3");
					pageAudio.currentTime = 0;
					pageAudio.addEventListener("ended", function(){
						$( _thisTemp.data("hide-target") ).hide();
					});
					pageAudio.play();
				}
				else
				{
					/*if( $("#" + $(this).data("target") ).css("display") != "block" )
					{
						popAudio("correct");
					}*/
					popAudio("correct");
				}
			}
			else
			{
				clickEvent($(this));
			}

			essenceAllChk3();
		})

		if(optionType == "lock3" || optionType == "count-change-multie" )
		{
			btn.data("chkNum","0");
		}
		else if(optionType == "lock2")
		{
			btn.off("click");
			btn.eq(0).off("click").on("click", function(){
				clickEvent($(this));
			})
			btn.data("chkNum","0");

			btn.each(function(i){
				if( $(this).attr("data-mp3") )
				{
					audioArr[i] = new Audio($(this).attr("data-mp3"));
				}
				else
				{
					audioArr[i] = new Audio('./common/audio/correct.mp3');
				}
			})
		}


		function clickEvent($btn)
		{
			if(optionType == "click-count-sum")
			{
				popAudio("correct");

				var countMin = Number(  $btn.parent().data("min") );
				var countMax = Number(  $btn.parent().data("max") );
				var num = Number( $btn.data("num") );
				countNum += num;

				if( countNum < countMin ) countNum = countMin;
				if( countNum > countMax ) countNum = countMax;

				countBox.text( countNum );
			}
			else if(optionType == "lock3")
			{
				if( target.data("custom") )
				{
					if( target.data("custom") == "alert" )
					{
						if( $btn.attr("data-target") )
						{
							popAudio("correct");
						}
						else
						{
							alertShowHide(target.parent().parent(), "again");
						}
					}
				}
				else
				{
					popAudio("correct");
					var index = btn.index($btn);

					$btn.off("click");
					var num = Number( $btn.data("chkNum") );
					++num;
					$btn.data("chkNum", num)

					$("#"+ $btn.attr("data-target"+num)).show();
				}

				if( target.data("option3") )
				{
					if(  target.data("option3") == "acc-hide" )
					{
						$("#" + $btn.data("hide-target") ).hide().addClass("focusRemove");
						$("#" + $btn.data("target") ).show();
					}
				}

				var countMax = Number( $btn.data("count") );
				if( num >= countMax )
				{
					$btn.off("click").removeClass("focusRemove").addClass("focusRemove");
					$btn.css({"pointer-events":"none", "background":"none"});
					/*
					if(target.attr("data-overlap") == "true" )
					{
						$("#"+ $btn.attr("data-nextEventBtn"+num) ).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
					else
					{
						$("#"+ $btn.attr("data-nextEventBtn")).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
					*/
				}
				else
				{
					if(target.attr("data-overlap") == "true" )
					{
						$("#"+ $btn.attr("data-nextEventBtn"+num)).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
					else
					{
						$("#"+ $btn.attr("data-nextEventBtn")).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
				}
			}
			else if(optionType == "lock2")
			{
				//popAudio("correct");
				for(var i=0; i<btn.length; i++)
				{
					audioArr[i].pause();
					audioArr[i].currentTime = 0;
				}
				var index = btn.index($btn);
				if( !$btn.hasClass("focusRemove") ) audioArr[index].play();

				$btn.off("click");
				var num = Number( $btn.data("chkNum") );
				++num;
				$btn.data("chkNum", num)

				$("#"+ $btn.attr("data-target"+num)).show();


				var countMax = Number( $btn.data("count") );
				if( num >= countMax )
				{
					$btn.off("click").removeClass("focusRemove").addClass("focusRemove");
					$btn.css({"pointer-events":"none", "background":"none"});

					if(target.attr("data-overlap") == "true" )
					{
						$("#"+ $btn.attr("data-nextEventBtn"+num) ).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
					else
					{
						$("#"+ $btn.attr("data-nextEventBtn")).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
				}
				else
				{
					if(target.attr("data-overlap") == "true" )
					{
						$("#"+ $btn.attr("data-nextEventBtn"+num)).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
					else
					{
						$("#"+ $btn.attr("data-nextEventBtn")).off("click").on("click", function(){
							clickEvent($(this));
						})
					}
				}
			}
			else if(optionType == "count-change")
			{
				$btn.off("click").removeClass("focusRemove").addClass("focusRemove");
				$btn.css({"pointer-events":"none", "background":"none"});
				$("#" + $btn.data("target") ).show();
				popAudio("correct");
				++countNum;
				var temp = $("#"+ $btn.attr("data-targetbg") );
				var newSrc = temp.attr("src").split(".png")[0];
				newSrc += "_"+countNum+".png";
				temp.attr("src",newSrc);

				if( countBox.data("target") && countNum >= btn.length )
				{
					$( countBox.attr("data-target") ).show();
				}

				var temp = false;
				if(target.data("custom"))
				{
					if(target.data("custom") == "sum-chk")
					{
						var num = Number( $btn.parent().data("max") );

						if( countNum >= num) temp = true;
					}
				}
				if(temp)
				{
					btn.off("click");
					btn.each(function(){
						if( $(this).css("pointer-events") != "none" )
						{
							$(this).css({"pointer-events":"none", "background":"none"});
							$(this).removeAttr("tabIndex");
						}
					})
				}
			}
			else if(optionType == "count-change-multie")
			{
				$btn.off("click").removeClass("focusRemove").addClass("focusRemove");
				$btn.css({"pointer-events":"none", "background":"none"});

				var num = Number( $btn.data("chkNum") );
				++num;
				$btn.data("chkNum", num);


				popAudio("correct");
				++countNum;
				var temp = $("#"+ $btn.attr("data-targetbg") );
				var newSrc = temp.attr("src").split(".png")[0];
				newSrc += "_"+num+".png";
				temp.attr("src",newSrc);


				if(target.data("custom"))
				{
					if(target.data("custom") == "sum-chk2")
					{
						var num2 = Number( $btn.data("max") );

						if( (newSrc.split("_").length-2) >= num2)
						{
							$("#" + $btn.data("target") ).show();
						}
					}

					if(target.data("custom") == "sum-chk3")
					{
						$("#" + $btn.data("target") ).show();

						var num2 = Number( $btn.data("max") );
						if( (newSrc.split("_").length-2) >= num2)
						{
							$("#" + $btn.attr("data-targetTotal") ).show();
						}
					}
				}
				else
				{
					$("#" + $btn.data("target") ).show();
				}



				if( countBox.data("target") && countNum >= btn.length )
				{
					$( countBox.attr("data-target") ).show();
				}

				var temp = false;
				if(target.data("custom"))
				{
					if(target.data("custom") == "sum-chk")
					{
						var num = Number( $btn.parent().data("max") );

						if( countNum >= num) temp = true;
					}
				}
				if(temp)
				{
					btn.off("click");
					btn.each(function(){
						if( $(this).css("pointer-events") != "none" )
						{
							$(this).css({"pointer-events":"none", "background":"none"});
							$(this).removeAttr("tabIndex");
						}
					})
				}
			}
			else if(optionType2 == "allHideTargetShow")
			{
				$btn.off("click").removeClass("focusRemove").addClass("focusRemove");
				$btn.css({"pointer-events":"none", "background":"none"});

				$($btn.data("hide-target") ).hide();
				$("#" + $btn.data("target") ).show();

				if( $btn.hasClass("speaker-btn"))
				{
					var _thisTemp = $btn;
					var index = btn.index($btn);
					pageAudio.pause();
					pageAudio = new Audio("./"+$btn.attr("data-mp3")+".mp3");

					pageAudio.play();
				}
				else if($btn.data("mp3") )
				{
					var _thisTemp = $btn;
					pageAudio.pause();
					pageAudio = new Audio("./"+$btn.attr("data-mp3")+".mp3");
					pageAudio.currentTime = 0;
					pageAudio.play();
				}
				else
				{
					/*if( $("#" + $(this).data("target") ).css("display") != "block" )
					{
						popAudio("correct");
					}*/
					popAudio("correct");
				}
			}
			else
			{
				if(optionType == "hideAndShow")
				{
					if(target.data("option5"))
					{
						if(countNum >= dropObj.length && target.data("option5") == "last-hide" )
						{
							$("#" + dropItem.parent().attr("data-hide-target") ).hide();
						}
					}


					if( $btn.hasClass("speaker-btn"))
					{
						$($btn.data("hide-target") ).hide();
						$("#" + $btn.data("target") ).show()

						var _thisTemp = $btn;
						var index = btn.index($btn);
						pageAudio.pause();
						pageAudio = new Audio("./"+$btn.attr("data-mp3")+".mp3");

						pageAudio.play();
					}
					else
					{
						$btn.off("click").removeClass("focusRemove").addClass("focusRemove");
						$btn.css({"pointer-events":"none", "background":"none"});
					}
					if(optionType2 == ("custom-chk-max"))
					{
						if( countBox.data("target") && countNum >= Number( $btn.data("max-num") ) )
						{
							$( countBox.attr("data-target") ).show();
						}
					}
				}
				else
				{
					$btn.off("click").removeClass("focusRemove").addClass("focusRemove");
					$btn.css({"pointer-events":"none", "background":"none"});
				}


				if(optionType == "target-hide")
				{
					$("#" + $btn.data("target") ).hide();
				}
				else
				{
					$("#" + $btn.data("target") ).show();
				}


				if(optionType == "hideAndShow")
				{
					if(bookId == "01_01_01" || bookId == "01_02_01" || bookId == "02_01_01" || bookId == "02_02_01" || bookId == "03_01_01" || bookId == "03_02_01" || bookId == "04_01_01" || bookId == "04_02_01" || bookId == "05_01_01" || bookId == "05_02_01")
					{
						$("#" + $btn.data("hide-target") ).hide();
						$("#" + $btn.data("target") ).show();
					}
					else
					{
						if( target.data("option3") )
						{
							if(  target.data("option3") == "acc-hide" )
							{
								$("#" + $btn.data("hide-target") ).hide();
								$("#" + $btn.data("target") ).show();
							}
						}
						else
						{
							$("#" + $btn.data("hide-target") ).css("z-index","-1").addClass("focusRemove").css("top","-9999px");
							$("#" + $btn.data("target") ).show();
						}
					}
				}
				if(optionType == "motion")
				{
					var path =  $("#" + $btn.data("target") ).data("path");
					svgObj[ btn.index( $btn ) ].animateAlong({
						path: path,
						rotate: false,
						duration: 1000,
						debug: false,
						imgX:0,
						imgY:0
					})
				}


				if($btn.data("count") == "not")
				{
				}
				else
				{
					++countNum;
				}
				countBox.text( countNum );


				if(target.data("option6"))
				{
					if(target.data("option6") == "mp3-end-show" )
					{
						var _thisTemp = $btn;
						pageAudio.pause();
						pageAudio = new Audio("./"+_thisTemp.attr("data-mp3")+".mp3");
						pageAudio.currentTime = 0;
						pageAudio.addEventListener("ended", function(){
							$("#"+_thisTemp.data("hide-target2") ).hide();
							$("#"+_thisTemp.data("target2") ).show()
						});
						pageAudio.play();
					}
				}
				else if($btn.data("mp3") )
				{
					pageAudio.pause();
					pageAudio = new Audio("./"+$btn.attr("data-mp3")+".mp3");
					pageAudio.currentTime = 0;
					pageAudio.play();
				}
				else
				{
					if( target.data("option8") )
					{
						if(  target.data("option8") == "allClickAlert" && countNum >= btn.length )
						{
							alertShowHide(target.parent().parent(), "correct");
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
				}


				if( countBox.data("change") )
				{
					var txt = countBox.data("change").replace("???", countNum);
					countBox.attr("title", txt );
					countBox.attr("aria-label", txt );
				}

				if( countBox.data("target") && countNum >= btn.length )
				{
					$( countBox.attr("data-target") ).show();

					if( target.data("option4") )
					{
						if(  target.data("option4") == "allHiteLastShow" )
						{
							$( countBox.attr("data-hide-target") ).hide();
						}
					}
				}

				if(optionType == ("custom-chk-max"))
				{
					if( countBox.data("target") && countNum >= Number( $btn.data("max-num") ) )
					{
						$( countBox.attr("data-target") ).show();
					}
				}

				if(optionType == "click-flash")
				{
					$("#" + $btn.data("flash") ).stop(true, true).animate({opacity: 0.1}, 500).delay(100).animate({opacity: 1}, 500).animate({opacity: 0.1}, 500).delay(100).animate({opacity: 1}, 500).animate({opacity: 0.1}, 500).delay(100).animate({opacity: 1}, 500);
				}

				if(optionType == "show-left-to-right")
				{
					$("#" + $btn.data("motion") ).stop(true, true).animate({"width": "100%"}, 500);
				}


				if( target.attr("data-new-type") )
				{
					if(  target.attr("data-new-type") == "talk3" )
					{
						var tempDIV = $("#" + $btn.data("target") ).find(".click-obj");

						if( tempDIV.length == 0 )
						{
							essenceAllChk1();
						}
					}
				}


				if( $btn.attr("data-link") )
				{
					var linkURL = $btn.attr("data-link");
					window.open(linkURL, "_blank");
				}
			}
		}


		function isAll($option)
		{
			var bool = true;
			var num = Number( $option ) - 1;
			btn.each(function(){
				if( $(this).data("option") == num && $(this).data("option") != "all" )
				{
					if( !$(this).hasClass("focusRemove") ) bool = false;
				}
			})
			return bool;
		}

		function isAll2($ans)
		{
			var bool = true;
			btn.each(function(i){
				if( $(this).data("ans") == $ans)
				{
					//if( !$(this).hasClass("on") ) bool = false;
					if( String( $(this).data("view") ) != "true" ) bool = false;
				}
			})
			return bool;
		}

		function essenceAllChk1()
		{
			if( target.parent().parent().attr("data-essence") )
			{
				target.attr("data-ans","ok");
				setEssenceAnsChk( target.parent().parent() );
			}
			target.attr("data-last-ans","ok");
			popViewLastEvent.update();
		}
		function essenceAllChk2($bool)
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
		function essenceAllChk3()
		{
			var bool = true;

			btn.each(function(){
				if( !$(this).hasClass("focusRemove") ) bool = false;
			})
			if( target.parent().parent().attr("data-essence") )
			{
				if(bool)
				{
					target.attr("data-ans","ok");
					setEssenceAnsChk( target.parent().parent() );
				}
			}

			if(optionType!="ans-multiple")
			{
				if(bool) target.attr("data-last-ans","ok");
				else target.attr("data-last-ans","no");
				popViewLastEvent.update();
			}
		}
	}
}
