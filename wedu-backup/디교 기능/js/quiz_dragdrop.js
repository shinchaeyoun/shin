function setDragAndDrop($target)
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
				case "button-click":
					joinQuiz = new setQuizButtonClick( $target );
					$target.find(".popup_content").append("<div class='quiz-alert-box'></div>"  );
				break
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
		var overLap = (target.data("over") );
		var dragObj = target.find(".drag-obj");
		var dropObj = target.find(".drop-obj");
		var dropObjz = target.find(".drop-obj.z");
		var targetObj = "";
		var box = target.find(".popup_content");
		var countNum = 0;
		var freeZ = 10;
		var replayBtn = target.find(".ans-replay-btn");
		var sumCount = 0;
		var audioArr = new Array();
		var optionArr = new Array();
		var isComplteAlert = target.data("alert");

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
		/**/

		dropObj.css("z-index", "10");
		dropObjz.css("z-index", "11");
		dragObj.css("z-index", "12");

		dragObj.each(function(i){
			$(this).attr("id", "page-"+bookData.curPage+"-drag-"+"-"+Math.random());
			$(this).data("originalLeft", $(this).css("left") );
			$(this).data("originalTop", $(this).css("top")  );
			$(this).attr("data-sum-chk-bool", "no");
		})

		dropObj.each(function(i){
			optionArr[i] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

			if( $(this).find("img").length >= 1 )
			{
				$(this).data("orgin-src", $(this).find("img").attr("src") );
			}
		})


		function setDragObjEvent()
		{
			dragObj.off("click").on("click",function($e){
				$e.preventDefault();
				$e.stopPropagation();

				if(optionType == "non-stop")
				{
					if ( $(this).find("img").attr("data-on") )
					{
						$(this).find("img").attr("src", $(this).find("img").attr("data-on"));
					}
				}

				if(target.data("option2") == "ansOn" )
				{
					if( targetObj )
					{
						targetObj.remove();
					}
				}
				if(optionType == "ansOn-drop-new-img")
				{
					if( targetObj )
					{
						dragRetrun( targetObj );
					}
				}

				if( optionType == "loop" )
				{
					var xMouse = Number($e.pageX) - ( document.getElementById( $(this).attr("id") ).getBoundingClientRect().width )
					var yMousea = Number($e.pageY) - ( document.getElementById( $(this).attr("id") ).getBoundingClientRect().height )

					var copy = $(this).clone();
					copy.css({"position":"absolute", "pointer-events":"none"});
					//copy.removeClass()
					$(this).parent().append(copy);
					copy.offset( { left: xMouse, top: yMousea } );
					targetObj = copy;
				}
				else  if(  target.data("option2") == "loop")
				{
					var xMouse = Number($e.pageX) - ( document.getElementById( $(this).attr("id") ).getBoundingClientRect().width )
					var yMousea = Number($e.pageY) - ( document.getElementById( $(this).attr("id") ).getBoundingClientRect().height )

					var copy = $(this).clone();
					copy.css({"position":"absolute", "pointer-events":"none"});
					copy.off("click");

					//copy.removeClass()
					$(this).parent().append(copy);
					copy.offset( { left: xMouse, top: yMousea } );
					copy.attr("id", "page-"+bookData.curPage+"-drag-"+"-"+Math.random() +"-clone" );
					copy.attr("class", "copy-drag-obj")
					++freeZ;
					copy.css("z-index", freeZ);
					setAddNewDragObjEvent(copy);

					targetObj = copy;
				}
				else
				{
					targetObj = $(this);
				}
				dragObj.css({"pointer-events":"none"});
				if(target.data("option2") == "loop")
				{
					target.find(".copy-drag-obj").css({"pointer-events":"none"});
				}
				popAudio("click");

				if(optionType == "free" || target.data("option2") == "loop" )
				{
					++freeZ;
					$(this).css("z-index", freeZ);

					if( target.data("option2") == "sumChk" )
					{
						if( $(this).attr("data-sum-chk-bool") == "ok")
						{
							$(this).attr("data-sum-chk-bool", "no");
							sumCount -= Number( $(this).attr("data-sumNum") );
						}
					}
				}
			})
		}
		function setAddNewDragObjEvent($target)
		{
			$target.off("click").on("click",function($e){
				targetObj = $(this);
				target.find(".copy-drag-obj").css({"pointer-events":"none"});
				dragObj.css({"pointer-events":"none"});
				popAudio("click");

				if(optionType == "free" || target.data("option2") == "loop" )
				{
					++freeZ;
					$(this).css("z-index", freeZ);

					if( target.data("option2") == "sumChk" )
					{
						if( $(this).attr("data-sum-chk-bool") == "ok")
						{
							$(this).attr("data-sum-chk-bool", "no");
							sumCount -= Number( $(this).attr("data-sumNum") );
						}
					}
				}
			})
		}
		setDragObjEvent();

		dropObj.off("click").on("click",function(){
			if( targetObj )
			{
				$("#do_hide_box").remove();
				var item = targetObj;
				targetObj = "";

				if(target.data("option2") == "loop")
				{
					target.find(".copy-drag-obj").css({"pointer-events":"auto"});
				}


				if(optionType != "non-stop")  dragObj.css({"pointer-events":"auto"});
				if(optionType == "non-stop")
				{
					var dropItem = $(this);
					if(item.data("num") == dropItem.data("ans") )
					{
						++countNum;
						if(target.data("option4") == "non-hide")
						{

						}
						else
						{
							dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
						}

						$("#" + dropItem.data("hide-target") ).hide();
						$("#" + dropItem.data("target") ).show();

						targetObj = item;
					}

					if(target.data("option5"))
					{
						if(countNum >= dropObj.length && target.data("option5") == "last-hide" )
						{
							$("#" + dropItem.parent().attr("data-hide-target") ).hide();
						}
					}

					if(countNum >= dropObj.length && target.data("option4") != "non-hide" )
					{
						targetObj.remove();
						targetObj = "";

						$("#" + dropItem.parent().attr("data-hide-target") ).hide();
						$("#" + dropItem.parent().attr("data-target") ).show();

						dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
						dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
						popAudio("finish")
						essenceAllChk(true);
					}
					else
					{
						popAudio("correct");
					}
				}
				else if(optionType == "append-array")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					var index = dropObj.index( dropItem );
					var option = Number( item.data("option") );
					var temp = Number(option) - 1
					var arr = dropItem.data("count").split(",");


					if( optionArr[index][ temp ] < arr[ temp ] )
					{
						++optionArr[index][ temp ];

						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");

						var imgTarget = dropItem.parent();
						var newSrc = item.find("img").attr("src").split(".png")[0];
						newSrc += "_"+(Number(index)+1)+"_"+optionArr[index][ temp ]+"_on.png";
						imgTarget.append('<div class="click-target-img" style="display:block; left:0px; top:0px; width:100%; height:100%; background-image:url('+newSrc+')"></div>');

						if(countNum >= dragObj.length)
						{
							dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							popAudio("finish")
							essenceAllChk(true);

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");

							if(target.data("option2") == "allShow")
							{
								var temp = $("#" +$(this).parent().data("target") );
								temp.show();
							}
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if( target.data("option") == "count-chanage-max" )
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					var bool = true;
					var maxNum = Number( $(this).parent().attr("data-maxNum") );

					if(item.data("num") == dropItem.data("ans")   )
					{
						if( item.attr("data-sumNum") )
						{
							var temp = 0;
							if(  target.find(".sum-count-box").attr("data-defaultNum") )
							{
								temp = Number( target.find(".sum-count-box").attr("data-defaultNum") );
								target.find(".sum-count-box").attr("data-defaultNum", "0");
							}
							sumCount += Number( item.attr("data-sumNum") ) + temp;
							if(  sumCount > maxNum ) bool = false;
						}
						if( bool )
						{
							++countNum;
							item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");
							dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

							var imgTarget = dropItem.find("img");
							imgTarget.attr("src", item.find("img").attr("src"));

							$("#" + dropItem.data("target") ).show()

							if(sumCount >= maxNum)
							{
								dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
								dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
								popAudio("finish")
								essenceAllChk(true);

								dragObj.not(dropItem).removeAttr("tabIndex");
								dropObj.not(dropItem).removeAttr("tabIndex");
							}
							else
							{
								popAudio("correct");
							}
						}
						else
						{
							sumCount -= Number( item.attr("data-sumNum") ) + temp;
							dragRetrun( item );
							popAudio("incorrect");
						}
						target.find(".sum-count-box").text( sumCount );
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if( target.data("option") == "count-chanage" )
				{
					item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");

					++countNum;
					$("#" + item.data("target") ).show();

					if( item.attr("data-sumNum") )
					{
						var temp = 0;
						//console.log( target.find(".sum-count-box").attr("data-defaultNum") )
						if(  target.find(".sum-count-box").attr("data-defaultNum") )
						{
							temp = Number( target.find(".sum-count-box").attr("data-defaultNum") );
							target.find(".sum-count-box").attr("data-defaultNum", "0");
						}
						sumCount += Number( item.attr("data-sumNum") ) + temp;
						target.find(".sum-count-box").text( sumCount );
					}

					if(countNum >= dragObj.length)
					{
						popAudio("finish");
						dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
						essenceAllChk(true);
					}
					else
					{
						popAudio("correct");
					}
				}
				else if( target.data("option") == "count-chanage2" )
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					var bool = true;
					var maxNum = Number( $(this).parent().attr("data-maxNum") );

					if(item.data("num") == dropItem.data("ans")   )
					{
						if( item.attr("data-sumNum") )
						{
							var temp = 0;
							if(  target.find(".sum-count-box").attr("data-defaultNum") )
							{
								temp = Number( target.find(".sum-count-box").attr("data-defaultNum") );
								target.find(".sum-count-box").attr("data-defaultNum", "0");
							}
							sumCount += Number( item.attr("data-sumNum") ) + temp;
							if(  sumCount > maxNum ) bool = false;
						}
						if( bool )
						{
							++countNum;
							item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");
							//dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

							var imgTarget = dropItem.find("img");
							var newSrc = imgTarget.attr("src").split("drop_")[0];
							newSrc += "drop_"+countNum+".png";
							imgTarget.attr("src", newSrc);

							//$("#" + dropItem.data("target") ).show()

							if(sumCount >= maxNum)
							{
								dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
								dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
								popAudio("finish")
								essenceAllChk(true);

								dragObj.not(dropItem).removeAttr("tabIndex");
								dropObj.not(dropItem).removeAttr("tabIndex");

								if( target.data("option7") )
								{
									if(target.data("option7") == "allShow" )
									{
										var temp = $("#" +$(this).parent().data("target") );
										temp.show();
									}
								}
							}
							else
							{
								popAudio("correct");
							}
						}
						else
						{
							sumCount -= Number( item.attr("data-sumNum") ) + temp;
							dragRetrun( item );
							popAudio("incorrect");
						}
						target.find(".sum-count-box").text( sumCount );
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if(optionType == "count")
				{
					item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");

					++countNum;
					var imgTarget = $(this).find("img");
					var newSrc = imgTarget.attr("src").split("drop_")[0];
					newSrc += "drop_"+countNum+".png";
					imgTarget.attr("src", newSrc);

					var temp = false;
					if(target.data("custom"))
					{
						if(target.data("custom") == "sum-chk")
						{
							var num = Number( $(this).parent().data("max") );
							if( countNum >= num) temp = true;
						}
					}

					if(countNum >= dragObj.length || temp)
					{
						popAudio("finish");
						essenceAllChk(true);
						dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

						if( $(this).parent().data("target") )
						{
							var temp = $("#" +$(this).parent().data("target") );
							temp.show();
						}
					}
					else
					{
						popAudio("correct");
					}
					if(temp)
					{
						dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
					}
				}
				else if(optionType == "ansOn")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					if(item.data("num") == dropItem.data("ans") )
					{
						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");
						dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

						var imgTarget = dropItem.find("img");
						var newSrc = imgTarget.attr("src").split(".png")[0];
						newSrc += "_on.png";
						imgTarget.attr("src", newSrc);

						if( $(this).data("target") )
						{
							var temp = $("#" +$(this).data("target") );
							temp.show();
						}

						if(countNum >= dropObj.length)
						{
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");


							if( $(this).attr("data-mp3") )
							{
								pageAudio = new Audio("./"+$(this).attr("data-mp3")+".mp3");
								if(pageAudio.currentTime != 0)
								{
									pageAudio.currentTime = 0;
								}
								pageAudio.play();
							}else{
								if(target.data("option2") == "not-finish" )
								{
									popAudio("correct");
									essenceAllChk(true);
								}
								else
								{
									popAudio("finish")
									essenceAllChk(true);
								}
							}

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");


							if( $(this).parent().attr("data-target") )
							{
								var temp = $("#" + $(this).parent().attr("data-target") );
								temp.show();
							}
							if( $(this).parent().attr("data-hide-target") )
							{
								var temp = $("#" + $(this).parent().attr("data-hide-target") );
								temp.hide();
							}
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if(optionType == "ansOn-append")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					if(item.data("num") == dropItem.data("ans") )
					{
						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");

						var imgTarget = dropItem.parent();
						var newSrc = item.find("img").attr("src").split(".png")[0];
						newSrc += "_on.png";
						imgTarget.append('<div class="click-target-img" style="display:block; left:0px; top:0px; width:100%; height:100%; background-image:url('+newSrc+')"></div>');

						if(countNum >= Number(dropObj.data("total")))
						{
							dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							popAudio("finish")
							essenceAllChk(true);

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");

							if( target.data("option2") == "allShow")
							{
								var temp = $("#" +$(this).parent().data("target") );
								temp.show();
							}
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if(optionType == "ansOn-append2")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					if(item.data("num") == dropItem.data("ans") )
					{
						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");

						var imgTarget = dropItem.parent();
						var newSrc = item.find("img").attr("src");//.split(".png")[0];
						//newSrc += "_on.png";
						imgTarget.append('<img src="'+newSrc+'" alt="대체텍스트 없음"/>');

						if( !dropItem.attr("data-count") ) dropItem.attr("data-count", "0")
						var num = Number(dropItem.attr("data-count"));
						++num;
						dropItem.attr("data-count", num)

						if( num >= Number(dropItem.data("max")) )
						{
							dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
						}


						if(countNum >= Number(dropObj.data("total")) )
						{
							dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							popAudio("finish")
							essenceAllChk(true);

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");

							if( target.data("option2") == "allShow")
							{
								var temp = $("#" +$(this).parent().data("target") );
								temp.show();
							}
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if(optionType == "ansOn-drop-new-img")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					if(item.data("num") == dropItem.data("ans") )
					{
						//audioArr.push( new Audio( item.attr("data-mp3") )  );
						audioArr[ dropObj.index($(this)) ] = new Audio( item.attr("data-mp3") );

						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");
						dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

						var imgTarget = dropItem.find("img");
						var newSrc = item.find("img").attr("src").split(".png")[0];
						newSrc += "_on.png";
						imgTarget.attr("src", newSrc);

						if( target.data("option5") )
						{
							if(  target.data("option5") == "darg-drop-target-show" )
							{
								$(item.data("target-item")+dropItem.attr("data-target-item") ).show();
							}
						}

						var temp = $("#" +$(this).data("target") );
						temp.show();
						var temp = $("#" +item.data("target") );
						temp.show();




						if(countNum >= dropObj.length)
						{
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");


							if( target.attr("data-mp3") == "finish-mp3-play")
							{
								var chkNum = 0;
								audioArr[0].onended = function(){
									auidoLoopPlay();
								};
								audioArr[0].play();
								function auidoLoopPlay()
								{
									++chkNum;
									if( chkNum < audioArr.length)
									{
										audioArr[chkNum].onended = function(){
											auidoLoopPlay();
										};
										audioArr[chkNum].play();
									}
									else
									{
										essenceAllChk(true);
									}
								}
							}
							else
							{
								if(target.data("option2") == "not-finish" )
								{
									popAudio("correct");
								}
								else
								{
									popAudio("finish")
								}
								essenceAllChk(true);
							}

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");

							$(  $(this).attr("data-allShow") ).show();
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if(optionType == "free")
				{
					if( target.data("option2") )
					{
						if(  target.data("option2") == "loop" )
						{

							popAudio("click");
						}
						else if( target.data("option2") == "sumChk" )
						{
							var totalSum = Number( $(this).attr("data-totalSum") );

							if( item.attr("data-sumNum") )
							{
								item.attr("data-sum-chk-bool", "ok");
								sumCount += Number( item.attr("data-sumNum") );
							}

							if(  totalSum == sumCount )
							{
								dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
								dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
								popAudio("finish")
								essenceAllChk(true);

								dragObj.not(dropItem).removeAttr("tabIndex");
								dropObj.not(dropItem).removeAttr("tabIndex");

								var temp = $("#" +$(this).parent().data("target") );
								temp.show();
							}
							else if(  totalSum < sumCount )
							{
								sumCount -= Number( item.attr("data-sumNum") );
								dragRetrun(item);
								item.attr("data-sum-chk-bool", "no");
								targetObj = "";
								popAudio("incorrect");
							}
							else
							{
								item.attr("data-sum-chk-bool", "ok");
								popAudio("click");
							}
						}
					}
					else
					{
						popAudio("click");
					}
				}
				else if(optionType == "lock")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);


					if(item.data("num") == dropItem.data("ans") && lock_isAll( $(this).data("option") ) )
					{
						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");
						dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

						var imgTarget = dropItem.find("img");
						imgTarget.attr("src", item.find("img").attr("src"));

						$("#" + dropItem.data("target") ).show();

						if(countNum >= dropObj.length)
						{
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							popAudio("finish")
							essenceAllChk(true);

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if(optionType == "lock2")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					if(item.data("num") == dropItem.data("ans") && lock_isAll2( item.data("option") ) )
					{
						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");
						//dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

						//var imgTarget = dropItem.find("img");
						//imgTarget.attr("src", item.find("img").attr("src"));
						$("#" + item.data("target") ).show();

						if(countNum >= dragObj.length)
						{
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							popAudio("finish")
							essenceAllChk(true);

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else if(optionType == "lock3")
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);

					if(item.data("num") == dropItem.data("ans") && lock_isAll2( item.data("option") ) )
					{
						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");

						$("#" + item.data("hide-target") ).hide();
						$("#" + item.data("target") ).show();

						if(countNum >= Number( dropItem.attr("data-total-custom") ))
						{
							$("#" + dropItem.parent().attr("data-hide-target-custom") ).hide();
							$("#" + dropItem.parent().attr("data-target-custom") ).show();
						}

						if(countNum >= Number( $(this).attr("data-total") ))
						{
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

							if(target.data("option4") == "not-finish")
							{
								popAudio("correct");
							}
							else
							{
								popAudio("finish");
							}
							essenceAllChk(true);


							$("#" + dropItem.parent().attr("data-target") ).show();

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
				else
				{
					var dropItem = $(this);
					if(overLap) dropItem = overLapChk(item, dropItem);
					if(target.data("option2") == "overlap") dropItem = overLapChk(item, dropItem);

					var custom1 = true;
					if(target.data("option3") == "chk3")
					{
						if(item.data("not") == dropItem.data("not") ) custom1 = false;
					}

					if(item.data("num") == dropItem.data("ans") && custom1 || item.data("num") == dropItem.data("ans2") )
					{
						++countNum;
						item.off("click").css({"pointer-events":"none","visibility":"hidden"}).removeClass("focusRemove").addClass("focusRemove");
						dropItem.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");

						if(target.data("option2") == "ansOn")
						{
							var imgTarget = dropItem.find("img");
							var newSrc = imgTarget.attr("src").split(".png")[0];
							newSrc += "_on.png";
							imgTarget.attr("src", newSrc);
						}
						else
						{
							var imgTarget = dropItem.find("img");
							imgTarget.attr("src", item.find("img").attr("src"));
						}

						$("#" + dropItem.data("target") ).show();

						if( item.attr("data-sumNum") )
						{
							sumCount += Number( item.attr("data-sumNum") );
						}


						var temp = false;
						if(target.data("custom"))
						{
							if(target.data("custom") == "count-num")
							{
								target.find(".count-box").text( countNum );
							}
							if(target.data("custom") == "sum-chk")
							{
								var num = Number( $(this).parent().data("max") );
								if( countNum >= num) temp = true;
							}
							if(target.data("custom") == "sum-chk2")
							{
								var num = Number( $(this).parent().data("max") );
								var chk;
								if( $(this).parent().attr("data-chkNum") ) chk = $(this).parent().attr("data-chkNum");
								else chk = 0;
								++chk;
								$(this).parent().attr("data-chkNum", chk);

								if( chk >= num)
								{
									$(  $(this).data("show-target") ).show();
								}
							}
						}

						if(countNum >= dropObj.length || temp)
						{
							dragObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							dropObj.off("click").css({"pointer-events":"none"}).removeClass("focusRemove").addClass("focusRemove");
							popAudio("finish")
							essenceAllChk(true);
							if(isComplteAlert=="correct")
							{
								alertShowHide(target.parent().parent(), "correct", "", "not-sound");
							}
							else
							{

							}

							dragObj.not(dropItem).removeAttr("tabIndex");
							dropObj.not(dropItem).removeAttr("tabIndex");


							if(optionType == "sumChange")
							{
								var temp = $("#" +$(this).parent().data("target") );
								var newSrc = temp.attr("src").split(".png")[0];
								newSrc += "_"+sumCount+".png";
								temp.attr("src", newSrc);
							}

							if(optionType == "allShow" || target.data("option2") == "allShow")
							{
								var temp = $("#" +$(this).parent().data("target") );
								temp.show();
							}
						}
						else
						{
							popAudio("correct");
						}
					}
					else
					{
						dragRetrun( item );
						popAudio("incorrect");
					}
				}
			}
		})


		replayBtn.off("click").on("click",function(){
			if(optionType == "ansOn-drop-new-img")
			{
				targetObj = "";
				dragObj.each(function(){
					dragRetrun( $(this) );
				})

				countNum = 0;

				dragObj.off("click").css({"pointer-events":"auto", "visibility":"visible"}).removeClass("focusRemove");
				dropObj.off("click").css({"pointer-events":"auto", "visibility":"visible"}).removeClass("focusRemove");
				dropObj.each(function(){
					if( $(this).data("orgin-src") )
					{
						$(this).find("img").attr("src", $(this).data("orgin-src") );
					}
				})

				_this.init();
			}
			else if(target.data("option2") == "loop")
			{
				targetObj = "";
				target.find(".copy-drag-obj").remove();

				dragObj.off("click").css({"pointer-events":"auto", "visibility":"visible"}).removeClass("focusRemove");
				dropObj.off("click").css({"pointer-events":"auto", "visibility":"visible"}).removeClass("focusRemove");
				_this.init();
			}
			else if(optionType == "free")
			{
					targetObj = "";
					dragObj.each(function(){
						dragRetrun( $(this) );
					})
			}
			else if(optionType == "sumChange")
			{
				targetObj = "";
				dragObj.each(function(){
					dragRetrun( $(this) );
				})

				countNum = 0;
				sumCount = 0;

				dragObj.off("click").css({"pointer-events":"auto", "visibility":"visible"}).removeClass("focusRemove");
				dropObj.off("click").css({"pointer-events":"auto", "visibility":"visible"}).removeClass("focusRemove");
				dropObj.each(function(){
					if( $(this).data("orgin-src") )
					{
						$(this).find("img").attr("src", $(this).data("orgin-src") );
					}
					var temp = $("#" +$(this).parent().data("target") );
					var newSrc = temp.data("orgin");
					temp.attr("src", newSrc);
				})

				_this.init();
			}
		})

		box.off("mousemove").on("mousemove", function($e){
			if(targetObj)
			{
				var xMouse = Number($e.pageX) - ( document.getElementById( targetObj.attr("id") ).getBoundingClientRect().width ) / 2;
				var yMousea = Number($e.pageY) - ( document.getElementById( targetObj.attr("id") ).getBoundingClientRect().height ) / 2;
				targetObj.offset( { left: xMouse, top: yMousea } );
			}
		})

		box.off("click").on("click", function(){
			if(targetObj)
			{
				if( !$(':focus').hasClass("drag-obj") && !$(':focus').hasClass("copy-drag-obj") )
				{
					if(optionType != "non-stop")
					{
						dragRetrun(targetObj);
						if( optionType == "loop")
						{
							targetObj.remove();
						}
						if(target.data("option2") == "loop")
						{
							target.find(".copy-drag-obj").css({"pointer-events":"auto"});
							targetObj.remove();
						}
						targetObj = "";
						dragObj.css({"pointer-events":"auto"});

						popAudio("incorrect");
					}
				}
			}
			else
			{

			}
		})

		target.find(".popup_close_btn").bind("click",function(){
			if( targetObj )
			{

				dragRetrun(targetObj);
				if( optionType == "loop" || target.data("option2") == "loop")
				{
					targetObj.remove();
				}

				if(target.data("option2") == "loop") targetObj.css({"pointer-events":"auto"});
				dragObj.css({"pointer-events":"auto"});
				targetObj = "";

			}
		})

		function dragRetrun($item)
		{
			if(target.data("option2") == "loop") targetObj.css({"pointer-events":"auto"});

			var item = $item;
			var defaultX = item.data("originalLeft");
			var defaultY = item.data("originalTop");
			item.css({"left":defaultX, "top":defaultY, "pointer-events":"auto"});

			if(optionType == "non-stop")
			{
				if ( item.find("img").attr("data-off") )
				{
					item.find("img").attr("src", item.find("img").attr("data-off"));
				}
			}

			if( optionType == "loop" && target.data("option2") != "loop")
			{
				item.remove();
			}
		}

		function overLapChk($item, $defaultDrop)
		{
			var returnDefault = $defaultDrop;
			var chk = true;
			dropObj.each(function(){
				if( $(this).hitTestObject($item) && chk && !$(this).hasClass("focusRemove") )
				{
					if($item.data("num") == $(this).data("ans") )
					{
						chk = false;
						returnDefault = $(this);
					}
				}
			})
			return returnDefault;
		}

		function lock_isAll($option)
		{
			var bool = true;
			var num = Number( $option ) - 1;
			dropObj.each(function(){
				if( $(this).data("option") == num && $(this).data("option") != "all" )
				{
					if( !$(this).hasClass("focusRemove") ) bool = false;
				}
			})
			return bool;
		}
		function lock_isAll2($option)
		{
			var bool = true;
			var num = Number( $option ) - 1;
			dragObj.each(function(){
				if( $(this).data("option") == num )
				{
					if( !$(this).hasClass("focusRemove") ) bool = false;
				}
			})
			return bool;
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
	}
}
