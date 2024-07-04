function setExaminQuiz($target)
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

		if(optionType=="img-click")
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

							$(this).html( txt);
						})
					}
				})
			})
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
			var box2NextBtn = box2.find(".examin-result-btn");


			var box3 = target.find(".examin-box3");
			var imgBox3 = box3.find(".examin-img-box > div");
			var box3NextBtn = box3.find(".examin-result-btn");
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

				box1.hide();
				box2.hide();
				box3.show();

				box3NextBtn.off("click").on("click",function(){
					box3NextBtn.off("click").hide();
					btn4Event();
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

				box5.show();
			}
		}
	}
}
