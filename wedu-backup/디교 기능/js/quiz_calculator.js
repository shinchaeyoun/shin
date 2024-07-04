function setQuizCalculator($target)
{
	var _this = this;
	var initialization = false;
	_this.view = function()
	{
		if(initialization==false)
		{
			_this.init();
		}
	}

	_this.init = function()
	{
		initialization = true;

		var target = $target;
		var tabIndexNum = Number( target.parent().attr("tabIndex") )+2;
		var btnBox = target.find(".calculator-box");
		var btn = btnBox.find(".calculator-btn");
		var countBox = target.find(".count-box");

		var ansBtn = target.find(".ans-btn");
		var isSingle = (countBox.length == 1);
		var chance = 2;
		var ans = btnBox.data("ans").toString().split(",");
		var activeObj;
		var option = target.data("option");

		function singleEvent()
		{
			btn.off("click").on("click",function() {
				popAudio("click");

				var txt = Number( btn.index( $(this) ) ) ;

				if( countBox.data("type") == "custom-2" || countBox.data("type") == "custom-3" ||
					countBox.data("type") == "custom-4" || countBox.data("type") == "custom-5" || countBox.data("type") == "custom-6" ||
					countBox.data("type") == "custom-7" || countBox.data("type") == "custom-8" || countBox.data("type") == "custom-9" ||
					countBox.data("type") == "custom-10" || countBox.data("type") == "custom-11" || countBox.data("type") == "custom-12"
				)
				{
					if( isNaN(  Number(countBox.val() ))  )
					{
						txt = "";
					}
					else
					{
						if(txt > 9 )
						{
							txt = "";
						}
						else
						{
							txt = countBox.val() + txt;

							var temp = Number( countBox.data("type").split("custom-")[1] );
							if(txt.length > temp)
							{
								txt = "";
							}
						}
					}
				}
				else if( countBox.data("type") == "Triple"  )
				{
					if( isNaN(  Number(countBox.val() ))  )
					{
						txt = "";
					}
					else
					{
						if(txt > 9 )
						{
							txt = "";
						}
						else
						{
							txt = countBox.val() + txt;

							if(txt.length > 3)
							{
								//txt = txt.substring(1, 3);
								txt = "";
							}
						}
					}
				}
				else if( countBox.data("type") == "multi"  )
				{
					if( isNaN(  Number(countBox.val() ))  )
					{
						txt = "";
					}
					else
					{
						if(txt > 9 )
						{
							txt = "";
						}
						else
						{
							txt = countBox.val() + txt;

							if(txt.length > 2)
							{
								//txt = txt.substring(1, 3);
								txt = "";
							}
						}
					}
				}
				else if(txt > 9 )
				{
					txt = "";
				}
				countBox.val( txt );
				if( countBox.data("change") )
				{
					var txt = countBox.data("change").replace("???", txt);
					countBox.attr("title", txt );
					countBox.attr("aria-label", txt );
				}
			})
		}
		function multipleEvent()
		{
			countBox.each(function(){
				$(this).off("click").on("click",function() {
					popAudio("click");
					$(this).removeClass("on");
					$(this).addClass("on");
					activeObj = $(this);
				})

				$(this).off("keydown").on("keydown",function($e) {
					var keyCode = $e.keyCode || $e.which;
					if(keyCode == 13 )
					{
						popAudio("click");
						$(this).removeClass("on");
						$(this).addClass("on");
						activeObj = $(this);
					}
				})
			})

			btn.off("click").on("click",function() {
				if(activeObj)
				{
					popAudio("click");

					var txt = Number( btn.index( $(this) ) ) ;
					if( activeObj.data("type") == "custom-2" || activeObj.data("type") == "custom-3" ||
					    activeObj.data("type") == "custom-4" || activeObj.data("type") == "custom-5" || activeObj.data("type") == "custom-6" ||
						activeObj.data("type") == "custom-7" || activeObj.data("type") == "custom-8" || activeObj.data("type") == "custom-9" ||
						activeObj.data("type") == "custom-10" || activeObj.data("type") == "custom-11" || activeObj.data("type") == "custom-12"
					)
					{
						if( isNaN(  Number(activeObj.val() ))  )
						{
							txt = "";
						}
						else
						{
							if(txt > 9 )
							{
								txt = "";
							}
							else
							{
								txt = activeObj.val() + txt;

								var temp = Number( activeObj.data("type").split("custom-")[1] );
								if(txt.length > temp)
								{
									txt = "";
								}
							}
						}
					}
					else if( activeObj.data("type") == "Triple"  )
					{
						if( isNaN(  Number(activeObj.val() ))  )
						{
							txt = "";
						}
						else
						{
							if(txt > 9 )
							{
								txt = "";
							}
							else
							{
								txt = activeObj.val() + txt;

								if(txt.length > 3)
								{
									//txt = txt.substring(1, 3);
									txt = "";
								}
							}
						}
					}
					else if( activeObj.data("type") == "multi"  )
					{
						if( isNaN(  Number(activeObj.val() ))  )
						{
							txt = "";
						}
						else
						{
							if(txt > 9 )
							{
								txt = "";
							}
							else
							{
								txt = activeObj.val() + txt;

								if(txt.length > 2)
								{
									//txt = txt.substring(1, 3);
									txt = "";
								}
							}
						}
					}
					else
					{
						if(txt > 9 )
						{
							txt = "";
						}
					}
					activeObj.val( txt );
				}
			})
		}

		if(isSingle) singleEvent();
		else multipleEvent();

		countBox.on("keypress, keyup",function($e){
			 $(this).val($(this).val().replace(/[^0-9]/g,""));
		})

		ansBtn.off("click").on("click", function(){
			btn.off("click");

			if( isAll())
			{
				if(isAns())
				{
					lastSet(true);
					if( option == "free")
					{
						//
						popAudio("correct");
					}
					else
					{
						alertShowHide(target.parent().parent(), "correct");
					}
					essenceAllChk(true);
				}
				else
				{
					--chance;
					if(chance==0)
					{
						lastSet(false);
						alertShowHide(target.parent().parent(), "incorrect");
						essenceAllChk(false);
					}
					else
					{
						alertShowHide(target.parent().parent(), "again" , function(){
							if(isSingle) singleEvent();
							else multipleEvent();
						});
					}
				}
			}
			else
			{
				alertShowHide(target.parent().parent(), "checkAns" , function(){
					if(isSingle) singleEvent();
					else multipleEvent();
				});
			}
		})

		target.find(".popup_close_btn").bind("click",function(){
			if( activeObj )
			{
				activeObj = "";
				countBox.removeClass("on");
			}
		})

		function isAll()
		{
			var bool = true;
			countBox.each(function(){
				console.log($(this).val());
				if( $(this).val() == "") bool = false;
			})
			return bool;
		}

		function isAns()
		{
			var bool = true;
			countBox.each(function(i){
				if( $(this).val() != ans[i]) bool = false;
			})
			if( btnBox.data("ans2") )
			{
				countBox.each(function(i){
					if( $(this).val().toString() == btnBox.data("ans2").toString() ) bool = true;
				})
			}
			if( btnBox.data("ans3") && bool == false )
			{
				bool = true;
				countBox.each(function(i){
					if( $(this).val().toString() != btnBox.data("ans3").toString().split(",")[i].toString() ) bool = false;
				})
			}
			if( option == "free") bool = true;
			return bool;
		}

		function lastSet()
		{
			ansBtn.off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none", "opacity":"0.5"});
			btn.off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none"});
			countBox.off("click");

			countBox.removeClass("on");
			countBox.each(function(i){
				if( $(this).data("ans-view") )
				{
					$(this).val(  $(this).data("ans-view") );
				}
				else
				{
					if( option == "free")
					{

					}
					else
					{
						$(this).val( ans[i] );
					}
				}

				if( $(this).data("change") )
				{
					var txt = $(this).data("change").replace("???", $(this).val() );
					$(this).attr("title", txt );
					$(this).attr("aria-label", txt );
				}
				if( $(this).data("change-ans") )
				{
					var txt = $(this).data("change-ans") + $(this).attr("title");
					$(this).attr("title", txt );
					$(this).attr("aria-label", txt );
				}

				if( $(this).data("change-target") )
				{
					var targetImg = target.find("#" + $(this).data("change-target") );
					var newSrc = targetImg.data("change");

					targetImg.attr("src", newSrc);
				}

				if( $(this).data("all-change") )
				{
					var txt = $(this).data("all-change");
					$(this).attr("title", txt );
					$(this).attr("aria-label", txt );
				}
			})

			if( ansBtn.data("target") )
			{
				$( ansBtn.data("target") ).show();
				countBox.removeClass("focusRemove").addClass("focusRemove");
			}
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
