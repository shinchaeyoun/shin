function setExaminQuiz($target)
{
	var _this = this;
	var initialization = false;
	var joinQuiz = false;

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
				case "dragAndDrop":
					joinQuiz = new setDragAndDrop( $target );
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

		var target = $target;
		var optionType = target.data("option");

		if(optionType=="ox-drag-dragtxt")
		{
			var isWorng = false;
			var dragImg;
			var boxIndex = 0;
			var box = target.find(".examin-box");
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");
			nextBtn.hide();
			nextBtn.off("click").on("click",function(){
				nextBtn.hide();

				++boxIndex;
				box.hide().eq(boxIndex).show();

				target.find(".drag-obj").each(function(i){
					if( $(this).css("visibility") == "hidden" )
					{
						dragImg = $(this).find("img").attr("src");
						target.find(".examin-drop-img").css("background-image","url("+dragImg+")");
					}
				})
				popAudio("click");
			})
			//background:url(./16_01_01/98/img3_1.png);

			var oxBtn = target.find(".click-obj");

			oxBtn.off("click").on("click",function(){
				var oxBoxTemp = $(this).parent().find(".click-obj");
				oxBoxTemp.removeClass("on").removeClass("no").addClass("no");
				$(this).removeClass("on").removeClass("no").addClass("on");

				if( $(this).parent().is('[data-ans]') )
				{
					if( $(this).parent().data("ans")  == $(this).data("ans") )
					{
						if( $(this).attr("data-target") )
						{
							$("#"+$(this).attr("data-target")).show();
						}

						nextBtn.show();

						oxBoxTemp.removeClass("on").removeClass("no");
						$(this).off("click").removeClass("focusRemove").addClass("focusRemove");
						$(this).css({"pointer-events":"none"});
						$(this).removeClass("yes").addClass("yes");

						oxBoxTemp.off("click").removeClass("focusRemove").addClass("focusRemove");
						oxBoxTemp.css({"pointer-events":"none"});

						oxBoxTemp.not($(this)).removeAttr("tabIndex");


						/*oxBoxTemp.off("click").removeClass("focusRemove").addClass("focusRemove");
						oxBoxTemp.css({"pointer-events":"none"});
						oxBoxTemp.removeAttr("tabIndex");
						oxBoxTemp.removeClass("on")
						$(this).removeClass("yes").addClass("yes");*/

						alertShowHide(target.parent().parent(), "correct", function(){

						});
					}
					else
					{
						alertShowHide(target.parent().parent(), "again", function(){
							oxBoxTemp.removeClass("on")
						});
					}
				}

				else
				{
					$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
					$(this).removeClass("on").removeClass("no").addClass("on");


					if( $(this).parent().parent().find(".click-active-obj-box").length <= $(this).parent().parent().find(".click-obj.on").length )
					{
						nextBtn.show();
					}
				}
			})

			var saveBtn = target.find(".write_save_btn");
			var area = target.find(".write-save-area");
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

					if( $(this).parent().hasClass("write-area-box") )
					{
						$(this).parent().removeClass("on")
					}
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
				if( $(this).val().split(" ").join("") == "")
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save", oxDragLast);

					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			function isInputAll()
			{
				var bool = false;
				area.eq(0).each(function(){
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

			function oxDragLast()
			{
				box.hide().eq(boxIndex+1).show();
				target.find(".write-load-area").val( target.find(".write-save-area").eq(0).val() );
				target.find(".write-load-area").parent().removeClass("on");

				target.find(".write-load-area").each(function(){
					if( $(this).hasClass("custom") )
					{
						var titleTxt = $(this).attr("data-custom").replace("^", $(this).val() );
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
				})
			}
		}
		else if(optionType=="ox-drag")
		{
			var lastPageNum = 1;
			var isWorng = false;
			var boxIndex = 0;
			var box = target.find(".examin-box");
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");
			nextBtn.hide();
			nextBtn.off("click").on("click",function(){
				nextBtn.hide();

				++boxIndex;
				box.hide().eq(boxIndex).show();

				/*oxBtn.each(function(i){
					if( $(this).hasClass("on") )
					{
						if( (i%2) > 0  ) isWorng = true;
					}
				})*/

				target.find(".drag-obj").each(function(i){
					if( $(this).css("visibility") == "hidden" )
					{
						if( (i%2) > 0  ) isWorng = true;
					}
				})
				popAudio("click");
			})

			var oxBtn = target.find(".click-obj");

			oxBtn.off("click").on("click",function(){
				$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
				$(this).removeClass("on").removeClass("no").addClass("on");


				if( $(this).parent().parent().find(".click-active-obj-box").length <= $(this).parent().parent().find(".click-obj.on").length )
				{
					nextBtn.show();
				}
				popAudio("click");
			})

			var saveBtn = target.find(".write_save_btn");
			var area = target.find(".write-save-area");
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

					if( $(this).parent().hasClass("write-area-box") )
					{
						$(this).parent().removeClass("on")
					}
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
				if( $(this).val().split(" ").join("") == "")
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save", oxDragLast);

					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			function isInputAll()
			{
				var bool = false;
				area.eq(0).each(function(){
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

			function oxDragLast()
			{
				if(isWorng) lastPageNum = 2;
				box.hide().eq(boxIndex+lastPageNum).show();
				target.find(".write-load-area").val( target.find(".write-save-area").eq(0).val() );
				target.find(".write-load-area").parent().removeClass("on")

				target.find(".write-load-area").each(function(){
					if( $(this).hasClass("custom") )
					{
						var titleTxt = $(this).attr("data-custom").replace("^", $(this).val() );
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
				})
			}
		}
		else if(optionType=="img-click")
		{
			var userArr = new Array();
			var ansTxt = target.attr("data-txt").split(',');
			var box = target.find(".examin-box");
			var btn = target.find(".click-obj");
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");
			var userChoice;
			var boxIndex = 0;
			var linkBtn = target.find(".examin-link-btn-page");

			linkBtn.off("click").on("click",function(){
				window.open("https://www.nise.go.kr/examine/info.do?m=090101&s=nise", "_blank");
			})


			btn.off("click").on("click",function(){
				$($(this).attr("data-hide-target")).hide();
				$( $(this).attr("data-target") ).show();
				nextBtn.removeClass("on").addClass("on");
				nextBtn.show();

				userChoice = btn.index( $(this) );


				nextBtn.off("click").on("click",function(){
					nextBtn.off("click");
					nextBtn.removeClass("on");
					userArr.push( userChoice );

					++boxIndex;
					box.hide().eq(boxIndex).show();

					if( (box.length-1) == boxIndex )
					{
						box.find(".examin-box-txt-b").each(function(i){
							var txt = $(this).attr("data-txt");
							txt = txt.replace("^", "<span class='on'>"+ansTxt[ userArr[i] ]+"</span>" );

							$(this).html(txt);


							$(this).attr("role","text");
							$(this).attr("title", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
							$(this).attr("aria-label", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
						})
					}
					popAudio("click");
				})
				popAudio("click");
			})
		}
		else if(optionType=="img-click2")
		{
			var userArr = new Array();
			var txtArr = target.attr("data-txt").split(",");
			var box = target.find(".examin-box");
			var btn = target.find(".click-obj");
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");
			var boxIndex = 0;
			var ansTxt = target.attr("data-txt").split(',');


			btn.off("click").on("click",function(){
				$($(this).attr("data-hide-target")).hide();
				$( $(this).attr("data-target") ).show();
				nextBtn.removeClass("on").addClass("on");
				nextBtn.show();

				userChoice = btn.index( $(this) );

				nextBtn.off("click").on("click",function(){
					nextBtn.off("click");
					nextBtn.removeClass("on");
					userArr.push( userChoice );

					++boxIndex;
					box.hide().eq(boxIndex).show();

					if( (box.length-2) <= boxIndex )
					{
						step2Event();
					}
					popAudio("click");
				})
				popAudio("click");
			})

			function step2Event()
			{
				if( userArr.length > 1 )
				{
					var temp1 = userArr[0];
					var temp2 = userArr[1];

					var imgBox_l = target.find(".examin-img-box-left > div");
					var imgBox_r = target.find(".examin-img-box-right > div");
					var imgBtn_l = target.find(".examin-btn-box-left > button");
					var imgBtn_r = target.find(".examin-btn-box-right > button");
					var tempClick;

					$(  imgBtn_l.eq(0).attr("data-hide-target")).hide();
					imgBox_l.hide();
					imgBox_r.hide();
					imgBtn_l.hide();
					imgBtn_r.hide();


					imgBox_l.eq( temp1 ).show();
					imgBtn_l.eq( temp1 ).show();

					imgBox_r.eq( temp2 ).show();
					imgBtn_r.eq( temp2 ).show();

					nextBtn.removeClass("on");
					nextBtn.show();

					userArr.shift();
					userArr.shift();

					imgBtn_l.off("click").on("click",function(){
						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();

						tempClick = temp1;
						step2BtnClick();
					})
					imgBtn_r.off("click").on("click",function(){
						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();

						tempClick = temp2;
						step2BtnClick();
					})


					function step2BtnClick()
					{
						nextBtn.removeClass("on").addClass("on");
						nextBtn.off("click").on("click",function(){
							nextBtn.off("click");
							imgBtn_l.off("click");
							imgBtn_r.off("click");


							userArr.push( tempClick );

							nextBtn.off("click")
							step2Event();
							popAudio("click");
						})
						popAudio("click");
					}
				}
				else
				{
					++boxIndex;
					box.hide().eq(boxIndex).show();

					box.find(".examin-box-txt-b").each(function(i){
						target.find(".examin-img-box-last > div").eq( userArr[i] ).show();

						var txt = $(this).attr("data-txt");
						txt = txt.replace("^", "<span class='on'>"+ansTxt[ userArr[i] ]+"</span>" );

						$(this).html(txt);


						var titleTxt = $(this).text();
						$(this).attr("role","text");
						//$(this).attr("title", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
						//$(this).attr("aria-label", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);


					})
				}
			}
		}
		else if(optionType=="img-click3")
		{
			var box = target.find(".examin-box");
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");
			//nextBtn.hide();
			nextBtn.off("click").on("click",function(){
				if( $(this).attr("data-last") )
				{
					if( $(this).attr("data-last") == "true" )
					{
						if( userIndex == undefined )
						{
							box.hide();
							box.last().show();
						}
						else
						{
							//box.find(".examin-img-box > div").eq(userIndex).show();
							box.find(".examin-img-box").each(function(i){
								$(this).find(">div").eq(userIndex).show();
							})
							$("#" + $(this).data("hide-target") ).hide();
							$("#" + $(this).data("target") ).show();
						}
					}
				}
				else
				{
					$("#" + $(this).data("hide-target") ).hide();
					$("#" + $(this).data("target") ).show();
				}
				popAudio("click");
			})

			var oxBtn = target.find(".click-obj");
			var userIndex;

			oxBtn.off("click").on("click",function(){
				userIndex = oxBtn.index( $(this) );
				$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
				$(this).removeClass("on").removeClass("no").addClass("on");

				popAudio("click");
			})

			var saveBtn = target.find(".write_save_btn");
			var area = target.find(".write-save-area");
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

					if( $(this).parent().hasClass("write-area-box") )
					{
						$(this).parent().removeClass("on")
					}
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
				if( $(this).val().split(" ").join("") == "")
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					alertShowHide(target.parent().parent(), "save", lasteView);

					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			function isInputAll()
			{
				var bool = false;
				area.eq(0).each(function(){
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

			function lasteView()
			{
				box.hide().eq( box.length-2 ).show();
				target.find(".write-load-area").val( target.find(".write-save-area").eq(0).val() );
				target.find(".write-load-area").parent().removeClass("on")
			}
		}
		else if(optionType=="examine-not-first")
		{
			///
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");

			nextBtn.off("click").on("click",function(){
				$("#"+ $(this).attr("data-hide-target") ).hide();
				$("#"+ $(this).attr("data-target") ).show();
				popAudio("click");
			})

			var userArr = new Array();
			var ansTxt = target.attr("data-txt").split(',');
			var box = target.find(".examin-box");
			var btn = target.find(".click-obj");
			var boxIndex = 1;
			var boxTxt = target.find(".examin-box-txt");

			var saveBtn = target.find(".write_save_btn");
			var area = target.find(".write-area");


			btn.off("click").on("click",function(){
				$($(this).attr("data-hide-target")).hide();
				$( $(this).attr("data-target") ).show();
				nextBtn.removeClass("on").addClass("on");
				nextBtn.show();

				userChoice = btn.index( $(this) );

				nextBtn.off("click").on("click",function(){
					nextBtn.off("click");
					nextBtn.removeClass("on");
					userArr.push( userChoice );

					++boxIndex;
					box.hide().eq(boxIndex).show();

					if( (box.length-4) <= boxIndex )
					{
						step2Event();
						popAudio("click");
					}
				})
				popAudio("click");
			})

			function step2Event()
			{
				if( userArr.length > 1 )
				{
					var temp1 = userArr[0];
					var temp2 = userArr[1];

					var imgBox_l = target.find(".examin-img-box-left > div");
					var imgBox_r = target.find(".examin-img-box-right > div");
					var imgBtn_l = target.find(".examin-btn-box-left > button");
					var imgBtn_r = target.find(".examin-btn-box-right > button");
					var tempClick;

					$(  imgBtn_l.eq(0).attr("data-hide-target")).hide();
					imgBox_l.hide();
					imgBox_r.hide();
					imgBtn_l.hide();
					imgBtn_r.hide();

					imgBox_l.eq( temp1 ).show();
					imgBtn_l.eq( temp1 ).show();

					imgBox_r.eq( temp2 ).show();
					imgBtn_r.eq( temp2 ).show();

					nextBtn.removeClass("on");
					nextBtn.show();

					userArr.shift();
					userArr.shift();

					imgBtn_l.off("click").on("click",function(){
						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();

						tempClick = temp1;
						step2BtnClick();
					})
					imgBtn_r.off("click").on("click",function(){
						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();

						tempClick = temp2;
						step2BtnClick();
					})


					function step2BtnClick()
					{
						popAudio("click");
						nextBtn.removeClass("on").addClass("on");
						nextBtn.off("click").on("click",function(){
							nextBtn.off("click");
							imgBtn_l.off("click");
							imgBtn_r.off("click");


							userArr.push( tempClick );

							nextBtn.off("click")
							step2Event();
							popAudio("click");
						})
					}
				}
				else
				{
					++boxIndex;
					box.hide().eq(boxIndex).show();

					boxTxt.text( ansTxt[ userArr[0] ]   );
					boxTxt.parent().find(".examin-img-box > div").eq(userArr[0]).show();

					boxTxt.each(function(){
					if( $(this).hasClass("custom") )
						{
							var titleTxt = $(this).attr("data-custom").replace("^",ansTxt[ userArr[0] ]);
							$(this).attr("title", titleTxt);
							$(this).attr("aria-label", titleTxt);
							
							if($(this).parent().find("label").length > 0)
							{
								$(this).parent().find("label").attr("title", titleTxt);
								$(this).parent().find("label").attr("aria-label", titleTxt);
							}
						}
					})

					nextBtn.off("click").on("click",function(){
						++boxIndex;
						box.hide().eq(boxIndex).show();

						box.eq(boxIndex).find(".examin-img-box > div").eq(userArr[0]).show();
						popAudio("click");
					})
				}
			}




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

					if( $(this).parent().hasClass("write-area-box") )
					{
						$(this).parent().removeClass("on")
					}
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
				if( $(this).val().split(" ").join("") == "")
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save", lastEvent);

					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			function isInputAll()
			{
				var bool = false;
				area.eq(0).each(function(){
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


			function lastEvent()
			{
				++boxIndex;
				box.hide().eq(boxIndex).show();
				box.eq(boxIndex).find(".examin-img-box > div").eq(userArr[0]).show();

				box.eq(boxIndex).find(".write-area").val( area.eq(0).val() );
				box.eq(boxIndex).find(".write-area").parent().removeClass("on")


				box.eq(boxIndex).find(".write-area").each(function(){
					if( $(this).hasClass("custom") )
					{
						var titleTxt = $(this).attr("data-custom").replace("^", $(this).val() );
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
				})

				/*imgBox5.eq( box1Arr[0] ).show();
				box5Txt.text( txtArr[ box1Arr[0] ]   );
				box5.find(".write-area").val( area.eq(0).val() );
				box5.find(".write-area").parent().removeClass("on")
				box5.show();*/
			}
		}
		else if(optionType=="examine-not-first-160102315")
		{
			///
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");

			nextBtn.off("click").on("click",function(){
				$("#"+ $(this).attr("data-hide-target") ).hide();
				$("#"+ $(this).attr("data-target") ).show();
				popAudio("click");
			})

			var userArr = new Array();
			var ansTxt = target.attr("data-txt").split(',');
			var box = target.find(".examin-box");
			var btn = target.find(".click-obj");
			var boxIndex = 0;
			var boxTxt = target.find(".examin-box-txt");

			var saveBtn = target.find(".write_save_btn");
			var area = target.find(".write-area");


			btn.off("click").on("click",function(){
				$(this).parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
				$(this).removeClass("on").removeClass("no").addClass("on");
				$($(this).attr("data-hide-target")).hide();
				$( $(this).attr("data-target") ).show();

				nextBtn.removeClass("on").addClass("on");
				nextBtn.show();

				userChoice = btn.index( $(this) );

				nextBtn.off("click").on("click",function(){
					nextBtn.off("click");
					nextBtn.removeClass("on");
					userArr[0] = userChoice;
					userArr[1] = 2;

					++boxIndex;
					box.hide().eq(boxIndex).show();
					step2Event(false);
					popAudio("click");
				})
				popAudio("click");
			})

			function step2Event($bool)
			{
				var tempClick;

				if( $bool == false )
				{
					btn.off("click").on("click",function(){
						$(this).parent().parent().find(".click-obj").removeClass("on").removeClass("no").addClass("no");
						$(this).removeClass("on").removeClass("no").addClass("on");
						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();

						tempClick = $(this).data("ans");
						step2BtnClick();
						popAudio("click");
					})
					nextBtn.removeClass("on");
					nextBtn.show();


					function step2BtnClick()
					{
						popAudio("click");
						nextBtn.removeClass("on").addClass("on");
						nextBtn.off("click").on("click",function(){
							nextBtn.off("click");
							btn.off("click");

							userArr[0] = tempClick;

							nextBtn.off("click")
							step2Event(true);
							popAudio("click");
						})
					}
				}
				else
				{
					++boxIndex;
					box.hide().eq(boxIndex).show();
					boxTxt.text( ansTxt[ userArr[0] ]   );
					boxTxt.parent().find(".examin-img-box > div").eq(userArr[0]).show();

					nextBtn.off("click").on("click",function(){
						++boxIndex;
						box.hide().eq(boxIndex).show();

						box.eq(boxIndex).find(".examin-img-box > div").eq(userArr[0]).show();
						popAudio("click");
					})
				}
			}




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

					if( $(this).parent().hasClass("write-area-box") )
					{
						$(this).parent().removeClass("on")
					}
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
				if( $(this).val().split(" ").join("") == "")
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save", lastEvent);

					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			function isInputAll()
			{
				var bool = false;
				area.eq(0).each(function(){
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


			function lastEvent()
			{
				//++boxIndex;
				//box.hide().eq(boxIndex).show();
				//box.eq(boxIndex).find(".examin-img-box > div").eq(userArr[0]).show();

				//box.eq(boxIndex).find(".write-area").val( area.eq(0).val() );
				//box.eq(boxIndex).find(".write-area").parent().removeClass("on")

				/*imgBox5.eq( box1Arr[0] ).show();
				box5Txt.text( txtArr[ box1Arr[0] ]   );
				box5.find(".write-area").val( area.eq(0).val() );
				box5.find(".write-area").parent().removeClass("on")
				box5.show();*/
			}
		}
		else if(optionType=="img-click4")
		{
			var userArr = new Array();
			var txtArr = target.attr("data-txt").split(",");
			var box = target.find(".examin-box");
			var btn = target.find(".click-obj");
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");
			var boxIndex = 0;
			var ansTxt = target.attr("data-txt").split(',');
			nextBtn.hide();

			function btn2Event()
			{
				if( (box.length-2) <= boxIndex )
				{
					step2Event();
				}
				else
				{
					btn.off("click").on("click",function(){
						btn.off("click");
						popAudio("click");
						$(this).addClass("on");

						var index = btn.index( $(this) );
						userArr.push( index );


						setTimeout(function(){
							++boxIndex;
							box.hide().eq(boxIndex).show();
							btn2Event();
						},300);
					});
				}
			}
			btn2Event();

			function step2Event()
			{
				if( userArr.length > 1 )
				{
					var temp1 = userArr[0];
					var temp2 = userArr[1];

					var imgBox_l = target.find(".examin-img-box-left > div");
					var imgBox_r = target.find(".examin-img-box-right > div");
					var imgBtn_l = target.find(".examin-btn-box-left > button");
					var imgBtn_r = target.find(".examin-btn-box-right > button");
					var tempClick;

					$(  imgBtn_l.eq(0).attr("data-hide-target")).hide();
					imgBox_l.hide();
					imgBox_r.hide();
					imgBtn_l.hide();
					imgBtn_r.hide();

					imgBtn_l.removeClass("on");
					imgBtn_r.removeClass("on");


					imgBox_l.eq( temp1 ).show();
					imgBtn_l.eq( temp1 ).show();

					imgBox_r.eq( temp2 ).show();
					imgBtn_r.eq( temp2 ).show();

					//nextBtn.removeClass("on");
					//nextBtn.show();

					userArr.shift();
					userArr.shift();

					imgBtn_l.off("click").on("click",function(){
						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();
						$(this).addClass("on");

						tempClick = temp1;
						step2BtnClick();
					})
					imgBtn_r.off("click").on("click",function(){
						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();
						$(this).addClass("on");

						tempClick = temp2;
						step2BtnClick();
					})


					function step2BtnClick()
					{
						imgBtn_l.off("click");
						imgBtn_r.off("click");

						userArr.push( tempClick );


						setTimeout(function(){
							step2Event();
						},300);

						popAudio("click");
					}
				}
				else
				{
					nextBtn.show();
					nextBtn.off("click").on("click",function(){
						++boxIndex;
						box.hide().eq(boxIndex).show();

						box.find(".examin-box-txt-b").each(function(i){
							target.find(".examin-img-box-last > div").eq( userArr[i] ).show();

							var txt = $(this).attr("data-txt");
							txt = txt.replace("^", "<span class='on'>"+ansTxt[ userArr[i] ]+"</span>" );

							$(this).html(txt);


							var titleTxt = $(this).text();
							$(this).attr("role","text");
							//$(this).attr("title", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
							//$(this).attr("aria-label", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
							if( $(this).hasClass("custom") )
							{
								titleTxt = $(this).attr("data-custom").replace("^",ansTxt[ userArr[i] ]);
								$(this).attr("title", titleTxt);
								$(this).attr("aria-label", titleTxt);
								
								if($(this).parent().find("label").length > 0)
								{
									$(this).parent().find("label").attr("title", titleTxt);
									$(this).parent().find("label").attr("aria-label", titleTxt);
								}
							}
							else
							{
								$(this).attr("title", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
								$(this).attr("aria-label", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
								
								if($(this).parent().find("label").length > 0)
								{
									$(this).parent().find("label").attr("title", $(this).attr("title").replace("^",ansTxt[ userArr[i] ]) );
									$(this).parent().find("label").attr("aria-label", $(this).attr("title").replace("^",ansTxt[ userArr[i] ]) );
								}
							}
						})
						popAudio("click");

					})
				}
			}
		}
		else if(optionType=="img-click5")
		{
			var userArr = new Array();
			var ansTxt = target.attr("data-txt").split(',');
			var box = target.find(".examin-box");
			var btn = target.find(".click-obj");
			var nextBtn = target.find(".examin-next-btn, .examin-result-btn");
			var userChoice;
			var boxIndex = 0;
			var linkBtn = target.find(".examin-link-btn-page");

			linkBtn.off("click").on("click",function(){
				window.open("https://www.nise.go.kr/examine/info.do?m=090101&s=nise", "_blank");
			})
			function btn2Event()
			{
				if( (box.length-1) <= boxIndex )
				{
					step2Event();
				}
				else
				{
					btn.off("click").on("click",function(){
						btn.off("click");
						popAudio("click");
						$(this).addClass("on");

						$($(this).attr("data-hide-target")).hide();
						$( $(this).attr("data-target") ).show();

						var index = btn.index( $(this) );
						userArr.push( index );


						setTimeout(function(){
							++boxIndex;
							box.hide().eq(boxIndex).show();
							btn2Event();
						},300);
					});
				}
			}
			btn2Event();

			function step2Event()
			{
				box.find(".examin-box-txt-b").each(function(i){
					var txt = $(this).attr("data-txt");
					txt = txt.replace("^", "<span class='on'>"+ansTxt[ userArr[i] ]+"</span>" );

					$(this).html(txt);


					$(this).attr("role","text");
					//$(this).attr("title", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
					//$(this).attr("aria-label", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
					if( $(this).hasClass("custom") )
					{
						titleTxt = $(this).attr("data-custom").replace("^",ansTxt[ userArr[i] ]);
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
					else
					{
						$(this).attr("title", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
						$(this).attr("aria-label", $(this).attr("data-txt").replace("^",ansTxt[ userArr[i] ]) );
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", replace("^",ansTxt[ userArr[i] ]) );
							$(this).parent().find("label").attr("aria-label", replace("^",ansTxt[ userArr[i] ]) );
						}
					}
				})
			}
		}
		else if(optionType=="img-click6")
		{
			var txtArr =  target.attr("data-txt").split(",");
			var box1 = target.find(".examin-box1");
			var imgBox1 = box1.find(".examin-img-box > div");
			var btn1 = box1.find(".click-obj");
			var box1ChkNum = 0;
			var box1Arr = new Array();


			var box2 = target.find(".examin-box2");
			var imgBox2_1 = box2.find(".examin-img-box2-1 > div");
			var imgBox2_2 = box2.find(".examin-img-box2-2 > div");
			var box2ChkNum = 0;
			var btn2 = box2.find(".click-obj");
			var box2NextBtn = box2.find(".examin-result-btn, .examin-next-btn");
			imgBox2_1.each(function(i){
				box1Arr.push( i );
			})


			var box3 = target.find(".examin-box3");
			var imgBox3 = box3.find(".examin-img-box > div");
			var box3NextBtn = box3.find(".examin-result-btn, .examin-next-btn");
			var box3Txt = box3.find(".examin-box-txt");


			var box4 = target.find(".examin-box4");
			var imgBox4 = box4.find(".examin-img-box > div");


			var box5 = target.find(".examin-box5");
			var imgBox5 = box5.find(".examin-img-box > div");
			var box5Txt = box5.find(".examin-box-txt");


			var box6 = target.find(".examin-box6");


			var area = target.find(".write-area");
			var saveBtn = target.find(".write_save_btn");
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

					if( $(this).parent().hasClass("write-area-box") )
					{
						$(this).parent().removeClass("on")
					}
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
				if( $(this).val().split(" ").join("") == "")
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save", btn5Event);

					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			function isInputAll()
			{
				var bool = false;
				area.eq(0).each(function(){
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

			function btn1Event()
			{
				if( box1ChkNum < imgBox1.length )
				{
					imgBox1.eq(box1ChkNum).show();
					imgBox1.not(":eq("+box1ChkNum+")").hide();


					btn1.removeClass("on");
					btn1.off("click").on("click",function(){
						btn1.off("click");
						popAudio("click");
						$(this).addClass("on");


						var index = btn1.index($(this));
						if( index <= 0 )
						{
							box1Arr.push(box1ChkNum);
						}
						++box1ChkNum;

						setTimeout(function(){
							btn1Event();
						},300);
					})
				}
				else
				{
					if( box1Arr.length < 1 )
					{
						/*alertShowHide(target.parent().parent(), "again" ,function(){
							box1ChkNum = 0;
							box1Arr = new Array();
							btn1Event()
						});*/

						box1.hide();
						box2.hide();
						box3.hide();
						box3.hide();
						box4.hide();
						box5.hide();
						box6.show();
					}
					else if( box1Arr.length >= 2 )
					{
						box2.show();
						box1.hide();
						btn2Event();
					}
					else
					{
						btn3Event();
					}
				}
			}



			function btn2Event()
			{
				box2NextBtn.hide();
				if( box1Arr.length > 1 )
				{
					var temp1 = box1Arr[0];
					var temp2 = box1Arr[1];
					imgBox2_1.hide();
					imgBox2_2.hide();
					imgBox2_1.eq( temp1 ).show();
					imgBox2_2.eq( temp2 ).show();

					box1Arr.shift();
					box1Arr.shift();

					btn2.removeClass("on");
					btn2.off("click").on("click",function(){
						btn2.off("click");
						popAudio("click");
						$(this).addClass("on");

						var index = btn2.index( $(this) );
						if( index > 0 )
						{
							box1Arr.push( temp2 );
						}
						else
						{
							box1Arr.push( temp1 );
						}


						setTimeout(function(){
							btn2Event();
						},300);
					});
				}
				else
				{
					//btn3Event();
					box2NextBtn.show();
					box2NextBtn.off("click").on("click",function(){
						box2NextBtn.off("click")
						popAudio("click");
						btn3Event();
					})
				}
			}

			btn2Event();

			function btn3Event()
			{
				box3NextBtn.show();
				imgBox3.hide();
				imgBox3.eq( box1Arr[0] ).show();
				box3Txt.text( txtArr[ box1Arr[0] ]   );

				box3Txt.each(function(){
				if( $(this).hasClass("custom") )
					{
						var titleTxt = $(this).attr("data-custom").replace("^",txtArr[ box1Arr[0] ]);
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
				})

				box1.hide();
				box2.hide();
				box3.show();

				box3NextBtn.off("click").on("click",function(){
					box3NextBtn.off("click").hide();
					btn4Event();
					popAudio("click");
				})
			}


			function btn4Event()
			{
				box1.hide();
				box2.hide();
				box3.hide();

				imgBox4.hide();
				imgBox4.eq( box1Arr[0] ).show();

				box4.show();
			}


			function btn5Event()
			{
				box1.hide();
				box2.hide();
				box3.hide();
				box4.hide();

				imgBox5.eq( box1Arr[0] ).show();
				box5Txt.text( txtArr[ box1Arr[0] ]   );

				box5.find(".write-area").val( area.eq(0).val() );
				box5.find(".write-area").parent().removeClass("on")

				box5.find(".write-area").attr("title", area.eq(0).val());
				box5.find(".write-area").attr("aria-label", area.eq(0).val());

				box5.find("label").attr("title", area.eq(0).val());
				box5.find("label").attr("aria-label", area.eq(0).val());


				box5Txt.each(function(){
					if( $(this).hasClass("custom") )
					{
						var titleTxt = $(this).attr("data-custom").replace("^",txtArr[ box1Arr[0] ]);
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
				})

				box5.show();
			}
		}
		else
		{
			var txtArr =  target.attr("data-txt").split(",");
			var box1 = target.find(".examin-box1");
			var imgBox1 = box1.find(".examin-img-box > div");
			var btn1 = box1.find(".click-obj");
			var box1ChkNum = 0;
			var box1Arr = new Array();


			var box2 = target.find(".examin-box2");
			var imgBox2_1 = box2.find(".examin-img-box2-1 > div");
			var imgBox2_2 = box2.find(".examin-img-box2-2 > div");
			var box2ChkNum = 0;
			var btn2 = box2.find(".click-obj");
			var box2NextBtn = box2.find(".examin-result-btn, .examin-next-btn");


			var box3 = target.find(".examin-box3");
			var imgBox3 = box3.find(".examin-img-box > div");
			var box3NextBtn = box3.find(".examin-result-btn, .examin-next-btn");
			var box3Txt = box3.find(".examin-box-txt");


			var box4 = target.find(".examin-box4");
			var imgBox4 = box4.find(".examin-img-box > div");


			var box5 = target.find(".examin-box5");
			var imgBox5 = box5.find(".examin-img-box > div");
			var box5Txt = box5.find(".examin-box-txt");


			var box6 = target.find(".examin-box6");


			var area = target.find(".write-area");
			var saveBtn = target.find(".write_save_btn");
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

					if( $(this).parent().hasClass("write-area-box") )
					{
						$(this).parent().removeClass("on")
					}
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
				if( $(this).val().split(" ").join("") == "")
				{
					$(this).removeClass("on")
				}
				if( $(this).parent().hasClass("write-area-box") && $(this).val().split(" ").join("") == "" )
				{
					$(this).parent().removeClass("on").addClass("on");
				}
			})

			saveBtn.off("click").on("click", function(){
				if( isInputAll() )
				{
					$("#" + $(this).data("target") ).show();
					alertShowHide(target.parent().parent(), "save", btn5Event);

					inputDataSave();
					essenceAllChk(true);
				}
				else
				{
					alertShowHide(target.parent().parent(), "write");
				}
			})
			function isInputAll()
			{
				var bool = false;
				area.eq(0).each(function(){
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

			function btn1Event()
			{
				if( box1ChkNum < imgBox1.length )
				{
					imgBox1.eq(box1ChkNum).show();
					imgBox1.not(":eq("+box1ChkNum+")").hide();


					btn1.removeClass("on");
					btn1.off("click").on("click",function(){
						btn1.off("click");
						popAudio("click");
						$(this).addClass("on");


						var index = btn1.index($(this));
						if( index <= 0 )
						{
							box1Arr.push(box1ChkNum);
						}
						++box1ChkNum;

						setTimeout(function(){
							btn1Event();
						},300);
					})
				}
				else
				{
					if( box1Arr.length < 1 )
					{
						/*alertShowHide(target.parent().parent(), "again" ,function(){
							box1ChkNum = 0;
							box1Arr = new Array();
							btn1Event()
						});*/

						box1.hide();
						box2.hide();
						box3.hide();
						box3.hide();
						box4.hide();
						box5.hide();
						box6.show();
					}
					else if( box1Arr.length >= 2 )
					{
						box2.show();
						box1.hide();
						btn2Event();
					}
					else
					{
						btn3Event();
					}
				}
			}
			btn1Event();



			function btn2Event()
			{
				box2NextBtn.hide();
				if( box1Arr.length > 1 )
				{
					var temp1 = box1Arr[0];
					var temp2 = box1Arr[1];
					imgBox2_1.hide();
					imgBox2_2.hide();
					imgBox2_1.eq( temp1 ).show();
					imgBox2_2.eq( temp2 ).show();

					box1Arr.shift();
					box1Arr.shift();

					btn2.removeClass("on");
					btn2.off("click").on("click",function(){
						btn2.off("click");
						popAudio("click");
						$(this).addClass("on");

						var index = btn2.index( $(this) );
						if( index > 0 )
						{
							box1Arr.push( temp2 );
						}
						else
						{
							box1Arr.push( temp1 );
						}


						setTimeout(function(){
							btn2Event();
						},300);
					});
				}
				else
				{
					//btn3Event();
					box2NextBtn.show();
					box2NextBtn.off("click").on("click",function(){
						box2NextBtn.off("click")
						popAudio("click");
						btn3Event();
					})
				}
			}

			function btn3Event()
			{
				box3NextBtn.show();
				imgBox3.hide();
				imgBox3.eq( box1Arr[0] ).show();
				box3Txt.text( txtArr[ box1Arr[0] ]   );

				box3Txt.each(function(){
				if( $(this).hasClass("custom") )
					{
						var titleTxt = $(this).attr("data-custom").replace("^",txtArr[ box1Arr[0] ]);
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
				})

				box1.hide();
				box2.hide();
				box3.show();

				box3NextBtn.off("click").on("click",function(){
					box3NextBtn.off("click").hide();
					btn4Event();
					popAudio("click");
				})
			}


			function btn4Event()
			{
				box1.hide();
				box2.hide();
				box3.hide();

				imgBox4.hide();
				imgBox4.eq( box1Arr[0] ).show();

				box4.show();
			}


			function btn5Event()
			{
				box1.hide();
				box2.hide();
				box3.hide();
				box4.hide();

				imgBox5.eq( box1Arr[0] ).show();
				box5Txt.text( txtArr[ box1Arr[0] ]   );

				box5.find(".write-area").val( area.eq(0).val() );
				box5.find(".write-area").parent().removeClass("on")

				box5.find(".write-area").attr("title", area.eq(0).val());
				box5.find(".write-area").attr("aria-label", area.eq(0).val());

				box5.find("label").attr("title", area.eq(0).val());
				box5.find("label").attr("aria-label", area.eq(0).val());


				box5Txt.each(function(){
					if( $(this).hasClass("custom") )
					{
						var titleTxt = $(this).attr("data-custom").replace("^",txtArr[ box1Arr[0] ]);
						$(this).attr("title", titleTxt);
						$(this).attr("aria-label", titleTxt);
						
						if($(this).parent().find("label").length > 0)
						{
							$(this).parent().find("label").attr("title", titleTxt);
							$(this).parent().find("label").attr("aria-label", titleTxt);
						}
					}
				})

				box5.show();
			}
		}
	}
}
