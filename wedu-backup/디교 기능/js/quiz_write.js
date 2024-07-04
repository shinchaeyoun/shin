function setQuizwrite($target)
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
		var tabIndexNum = Number( target.parent().attr("tabIndex") )+9;
		var saveBtn = target.find(".write_save_btn, .write_save_btn-s");
		var optionType = target.data("option");
		var joinTxt = "^-page-^";
		var ansCheckBtn = target.find(".ans-check-btn");

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

		if(optionType=="research")
		{
			var isFirst = false;
			//.popup_content height는 이미지 height + 120;
			//tabIndexNum = Number( target.parent().attr("tabIndex") )+6;
			saveBtn = target.find(".input_save_btn, .write_save_btn");
			var area = target.find(".input-area, .write-area");
			//var textarea = target.find(".write-area-box");
			var isAnsView = false;
			var ansPrevealBtn = target.find(".ans-preveal-btn");
			var tempArea = new Array();
			var firstBtns = target.find(".acc-box-research");
			var newBox = target.find(".research-con-box");
			var area = newBox.find(".input-area, .write-area");


			//area.attr("tabIndex", tabIndexNum);
			//saveBtn.attr("tabIndex", tabIndexNum);
			area.each(function(){
				if( $(this).parent().hasClass("write-area-box") )
				{
					$(this).parent().removeClass("on").addClass("on")
				}
			})
			area.each(function(i){
				$(this).attr("autocomplete", "off")
				var data = localStorage.getItem(uniqId+"-"+target.data("popID")+"-writedata-"+i);
				if(data)
				{
					$(this).val(data);
					$(this).removeClass("on").addClass("on");
				}
			})
			area.on("focus",function(){
				$(this).removeClass("on").addClass("on");

				if( $(this).parent().hasClass("write-area-box") )
				{
					$(this).parent().removeClass("on")
				}
			})
			area.on("focusout",function(){
				if( $(this).val().split(" ").join("") == "" && isAnsView==false)
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" && isAnsView==false )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})
			area.on("keydown",function(){
				if( $(this).val().split(" ").join("") != "" )
				{
					firstBtns.removeClass("on");
					$(this).removeClass("research-area-not");
				}
			})
			area.on("keyup",function(){
				if( $(this).val().split(" ").join("") != "" )
				{
					firstBtns.removeClass("on");
					$(this).removeClass("research-area-not");
				}
			})

			/*   */
			var isOn = false;
			var pageCount = 0;
			var curPage = 0;
			var inputPage = 0;
			function isInputAll()
			{
				var bool = false;
				var temp = newBox.eq(inputPage).find(".input-area, .write-area")
				temp.each(function(){
					if( $(this).val().split(" ").join("") == "" ) bool = true;
				})
				return !bool;
			}
			/*   */
			target.find(".popup_close_btn").bind("click",function(){
				isOn = false;
				pageCount = 0;
				curPage = 0;
				inputPage = 0;
				nextPageTemp = 0;
				userChkArr = new Array();
				target.find("input, textarea").each(function(){
					$(this).val("");
				})
				target.find("input, textarea").removeClass("research-area-not");
				target.find("input, textarea").removeClass("on");
				firstBtns.removeClass("on");
				newBox.hide();
				newBox.eq(0).show();
			})

			var nextPageTemp = 0;
			firstBtns.off("click").on("click",function(){
				firstBtns.removeClass("on");
				$(this).addClass("on");
				popAudio("correct");
				curPage = Number( $(this).data("next") );


				userChkArr[pageCount] = $(this).attr("title");
				$(this).parent().find("input, textarea").removeClass("research-area-not").addClass("research-area-not");
				$(this).parent().find("input, textarea").val("");
				$(this).parent().find("input, textarea").removeClass("on");
			})

			var userChkArr = new Array();
			saveBtn.off("click").on("click", function(){
				var userInputChk = isInputAll();	//입력 판별에 재확인
				if( userInputChk || firstBtns.hasClass("on") )
				{
					newBox.hide();

					if(!firstBtns.hasClass("on"))
					{
						if(inputPage==0) userChkArr[0] = newBox.eq(inputPage).find("input, textarea").val();
						else userChkArr[pageCount] = newBox.eq(inputPage).find("input, textarea").val();

						var temp = Number( $(this).parent().parent().attr("data-inputNext") );
						curPage = temp;
						newBox.eq(curPage).find(".acc-box-research").hide()
						newBox.eq(curPage).find(".research-main-hide").show()
						newBox.eq(curPage).show();
						++pageCount;
					}
					else
					{
						var temp = Number(curPage);
						curPage = temp;
						newBox.eq(curPage).find(".acc-box-research").show();
						newBox.eq(curPage).find(".research-main-hide").hide();
						newBox.eq(curPage).show();
						++pageCount;
					}
					inputPage = curPage;
					firstBtns.removeClass("on");
					target.find(".popup_title").focus();


					if( newBox.eq(curPage).find(".research-end").length > 0 )
					{
						var endBox = newBox.eq(curPage).find(".research-end");
						var copyEle = newBox.eq(curPage).find(".research-end-box-copy .research-end-box").clone();

						var acc1 = copyEle.find(".research-end-acc:eq(0) p");
						var acc2 = copyEle.find(".research-end-acc:eq(1) p");
						var acc3 = copyEle.find(".research-end-acc:eq(2) p");

						var txt1 = userChkArr[0];
						var txt2 = userChkArr[1];
						var txt3 = userChkArr[2];


						acc1.text(txt1);
						acc2.text(txt2);
						acc3.text(txt3);
						acc1.attr("title", txt1);
						acc2.attr("title", txt2);
						acc3.attr("title", txt3);


						endBox.append(copyEle);

						target.find(".research_again_btn").off("click").on("click",function(){
							isOn = false;
							pageCount = 0;
							curPage = 0;
							inputPage = 0;
							nextPageTemp = 0;
							userChkArr = new Array();
							target.find("input, textarea").each(function(){
								$(this).val("");
							})
							target.find("input, textarea").removeClass("research-area-not");
							target.find("input, textarea").removeClass("on");
							firstBtns.removeClass("on");
							newBox.hide();
							newBox.eq(0).show();
						})
						target.find(".research_end_btn").off("click").on("click",function(){
							isOn = false;
							pageCount = 0;
							curPage = 0;
							inputPage = 0;
							nextPageTemp = 0;
							userChkArr = new Array();
							target.find("input, textarea").each(function(){
								$(this).val("");
							})
							target.find("input, textarea").removeClass("research-area-not");
							target.find("input, textarea").removeClass("on");
							firstBtns.removeClass("on");
							newBox.hide();
							newBox.eq(0).show();
							target.find(".popup_close_btn").trigger("click");

							if( target.parent().parent().parent().attr("data-essence") )
							{
								target.parent().parent().hide();
							}
						})
						essenceAllChk2(true);
					}
				}
				else
				{
					alertShowHide(target.parent().parent(), "again");
				}
				/*if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save");
					
					inputDataSave();

				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}*/

			})
		}
		else if(optionType=="input")
		{

			tabIndexNum = Number( target.parent().attr("tabIndex") )+6;
			saveBtn = target.find(".input_save_btn, .write_save_btn");
			var area = target.find(".input-area, .write-area");
			//var textarea = target.find(".write-area-box");
			var isAnsView = false;
			var ansPrevealBtn = target.find(".ans-preveal-btn");
			var tempArea = new Array();
			area.attr("tabIndex", tabIndexNum);
			saveBtn.attr("tabIndex", tabIndexNum);
			area.each(function(){
				if( $(this).parent().hasClass("write-area-box") )
				{
					$(this).parent().removeClass("on").addClass("on")
				}
			})

			var chance = 2;
			ansCheckBtn.off("click").on("click", function(){
				var bool = true;
				area.each(function(){
					var val = $(this).val().split("").join("");
					if( val == "" ) bool = false;
				})

				if(bool)
				{
					var bool = true;
					area.each(function(){
						var ans = $(this).data("ans");
						var val = $(this).val().split("").join("");
						if( ans != val ) bool = false;

						if(bool==false)
						{
							if( $(this).data("ans2") )
							{
								var ans = $(this).data("ans2");
								var val = $(this).val().split("").join("");
								if( ans == val ) bool = true;
							}

							if( $(this).data("ans3") )
							{
								var ans = $(this).data("ans3");
								var val = $(this).val().split("").join("");
								if( ans == val ) bool = true;
							}

							if( $(this).data("ans4") )
							{
								var ans = $(this).data("ans4");
								var val = $(this).val().split("").join("");
								if( ans == val ) bool = true;
							}
						}
					})

					if( target.data("option4") )
					{
						if( target.data("option4") == "many" )
						{
							var ansTxt = target.find(".input-area-box").data("ans").split("&");
							var tempArr = new Array();

							area.each(function(){
								var txt = $(this).val().split(" ").join("");
								tempArr.push( txt )
							 })
							if(  String(ansTxt.sort()) == String(tempArr.sort()) ) bool = true;
						}
					}

					if( bool )
					{
						$(this).off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none", "opacity":"0.5"});
						$("#"+$(this).data("target")).show();
						alertShowHide(target.parent().parent(), "correct");
						area.attr("readonly", "readonly");
						area.removeClass("on").addClass("on");
						essenceAllChk(true);
					}
					else
					{
						--chance;
						if(chance==0)
						{
							$(this).off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none", "opacity":"0.5"});
							$("#"+$(this).data("target")).show();

							alertShowHide(target.parent().parent(), "incorrect");
							area.removeClass("on").addClass("on");
							area.attr("readonly", "readonly");
							area.each(function(i){
								$(this).val($(this).data("ans"));
								$(this).attr("readonly", "readonly");
							})
							essenceAllChk(false);
						}
						else
						{
							alertShowHide(target.parent().parent(), "again");
							area.val("");
							area.removeClass("on");
						}
					}
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})

			area.each(function(i){
				$(this).attr("autocomplete", "off")
				var data = localStorage.getItem(uniqId+"-"+target.data("popID")+"-writedata-"+i);
				if(data)
				{
					$(this).val(data);
					$(this).removeClass("on").addClass("on");
				}
			})
			area.on("focus",function(){
				$(this).removeClass("on").addClass("on");

				if( $(this).parent().hasClass("write-area-box") )
				{
					$(this).parent().removeClass("on")
				}
			})
			area.on("focusout",function(){
				if( $(this).val().split(" ").join("") == "" && isAnsView==false)
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" && isAnsView==false )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save");
					
					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			ansPrevealBtn.off("click").on("click", function(){
				isAnsView = !isAnsView;

				if( isAnsView )
				{
					$("#" + $(this).data("target") ).show();
					area.each(function(i){

						tempArea[i] = $(this).val();
						$(this).val("");
						$(this).attr("readonly", "readonly");
						if( $(this).data("hint") )
						{
							$(this).attr("placeholder", $(this).data("hint"));
						}
						else
						{
							$(this).attr("placeholder", $(this).data("ans"));
						}
						$(this).removeClass("on").addClass("on");
						$(this).parent('.write-area-box').removeClass("on");
					})
				}
				else
				{
					$("#" + $(this).data("target") ).hide();
					area.each(function(i){
						$(this).val(tempArea[i]);
						$(this).removeAttr("readonly");
						$(this).removeAttr("placeholder");
						if( $(this).data("placeholder") )
						{
							$(this).attr("placeholder", $(this).data("placeholder") );
						}
						$(this).parent('.write-area-box').addClass("on");

						if( $(this).val().split(" ").join("") == "")
						{
							$(this).removeClass("on")
						}

					})
				}
			})

			function isInputAll()
			{
				var bool = false;
				area.each(function(){
					if( $(this).val().split(" ").join("") == "" ) bool = true;
				})
				return !bool;
			}


			function inputDataSave()
			{
				var data = "";
				area.each(function(i){
					localStorage.setItem(uniqId+"-"+target.data("popID")+"-writedata-"+i, $(this).val() );
				})
			}
		}
		else
		{
			var area = target.find(".write-area");
			area.attr("tabIndex", tabIndexNum);
			saveBtn.attr("tabIndex", tabIndexNum);
			area.parent().removeClass("on").addClass("on");
			area.attr("autocomplete", "off")
			var tempArea = new Array();




			var isAnsView = false;
			var ansPrevealBtn = target.find(".ans-preveal-btn");
			ansPrevealBtn.attr("tabIndex", tabIndexNum);
			ansPrevealBtn.off("click").on("click", function(){
				isAnsView = !isAnsView;
				if( isAnsView )
				{
					$("#" + $(this).data("target") ).show();
					area.each(function(i){
						tempArea[i] = $(this).val();
						$(this).val("");
						$(this).attr("readonly", "readonly");
						$(this).attr("placeholder", $(this).data("ans"));
						$(this).removeClass("on").addClass("on");
						$(this).parent().removeClass("on");
					})
				}
				else
				{
					$("#" + $(this).data("target") ).hide();
					area.each(function(i){
						$(this).val(tempArea[i]);
						$(this).removeAttr("readonly");
						$(this).removeAttr("placeholder");

						if( $(this).val().split(" ").join("") == "")
						{
							$(this).removeClass("on")
							$(this).parent().removeClass("on").addClass("on");
						}
					})
				}
			})

			var data = localStorage.getItem(uniqId+"-"+target.data("popID")+"-writedata");
			if(data)
			{
				area.each(function(i){
					$(this).val( data.split(joinTxt)[i]  );
					$(this).parent().removeClass("on");

					if( $(this).val().split(" ").join("") == "" )
					{
						$(this).removeClass("on");
						$(this).parent().removeClass("on").addClass("on")
					}
				})
			}

			area.each(function(){
				$(this).on("focus",function(){
					$(this).parent().removeClass("on");
				})
				$(this).on("focusout",function(){
					if( $(this).val().split(" ").join("") == "" && isAnsView==false)
					{
						$(this).removeClass("on");
						$(this).parent().removeClass("on").addClass("on")
					}
				})
			})


			saveBtn.off("click").on("click", function(){
				// popAudio("click");
				var bool = false;
				area.each(function(){
					if( area.val().split(" ").join("") == "") bool = true;
				})
				if( bool )
				{
					alertShowHide(target.parent().parent(), "write");
				}
				else
				{
					alertShowHide(target.parent().parent(), "save");
					
					var txt = "";
					area.each(function(){
						txt += $(this).val()+joinTxt;
					})
					localStorage.setItem(uniqId+"-"+target.data("popID")+"-writedata", txt);
					essenceAllChk(true);
				}
			})
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

			if($bool) target.attr("data-last-ans","ok");
			else target.attr("data-last-ans","no");
			popViewLastEvent.update();
		}

		function essenceAllChk2($bool)
		{
			if( target.parent().parent().parent().attr("data-essence") )
			{
				if($bool)
				{
					target.parent().parent().parent().find(".popup_box").attr("data-ans","ok");
				}
				else
				{
					target.parent().parent().parent().find(".popup_box").attr("data-ans","no");
				}
				setEssenceAnsChk( target.parent().parent().parent() );
			}

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
