/* 드래그 선긋기 */
function setLineDrawing($target)
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
		var optionType = target.data("option");

		var box = target.find(".drag-line-active");
		var dragObj = target.find(".drag-obj");
		var dropObj = target.find(".drop-obj");

		var _canvasEle = target.find("canvas");
		var c = _canvasEle[0];
		var ctx = c.getContext("2d");
		var actions = [];
		var dragIconOverX = 26.5;
		var dragIconOverY = 26.5;
		var ansCheckBtn = target.find(".ans-check-btn");
		var ansPrevealBtn = target.find(".ans-preveal-btn");
		var chance = 2;
		var defaultLineSize = 5;
		var defaultColor = "#000000";
		if( _canvasEle.data("color") ) defaultColor = _canvasEle.data("color")
		if( _canvasEle.data("line") ) defaultLineSize = _canvasEle.data("line")

		var ansViewLineSize = 12;
		var ansViewColor = "#ff0000";

		var targetObj = "";
		var dropObjItem = new Array();

		var _ansCanvas = _canvasEle.clone();
		box.append( _ansCanvas );
		var c2 = _ansCanvas[0];
		var ctx2 = c2.getContext("2d");

		_ansCanvas.css("z-index", "1");
		_canvasEle.css("z-index", "2");
		//btnBox.css("z-index", "3");
		dropObj.css("z-index", "10");
		dragObj.css("z-index", "11");

		var customChkNum = 0;
		var customChkNum2 = 0;

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


		dragObj.each(function(i){
			actions[i] = {};

			var copy = $(this).clone();
			copy.css({"pointer-events":"none"});
			copy.removeAttr("tabIndex");
			box.append( copy );

			$(this).attr("id", "page-"+bookData.curPage+"-drag-"+"-"+Math.random());
			$(this).attr("data-originalLeft", ( dp2lp( $(this).position().left) ) );
			$(this).attr("data-originalTop", ( dp2lp( $(this).position().top) ) );

			/* draw ans */
			var dataAns = $(this).attr("data-ans");
			var defaultX = Number($(this).attr("data-originalLeft") ) + dragIconOverX;
			var defaultY = Number($(this).attr("data-originalTop") ) + dragIconOverY;
			dropObj.each(function(i){
				var dataDropAns = $(this).attr("data-ans");
				if( dataAns == dataDropAns && ( $(this).attr("data-ans") ) )
				{
					var eventX = ( dp2lp( $(this).position().left) ) + dragIconOverX;
					var eventY = ( dp2lp( $(this).position().top) ) + dragIconOverY;

					ctx2.beginPath();
					//ctx2.setLineDash([10, 20]);
					ctx2.moveTo(defaultX,defaultY);
					ctx2.lineTo(eventX, eventY);
					ctx2.strokeStyle = ansViewColor;
					ctx2.lineWidth = ansViewLineSize;
					ctx2.lineCap = 'round'; // butt, round, square
					ctx2.stroke();
				}
			})
		})

		_ansCanvas.hide();

		function setDragObjEvent()
		{
			dragObj.off("click").on("click",function($e){
				if( $(this).data("color") ) defaultColor = $(this).data("color");

				$e.preventDefault();
				$e.stopPropagation();

				for(var i = 0; i<dropObjItem.length; i++)
				{
					if( dropObjItem[i] && dropObjItem[i] != ""  )
					{
						if( dropObjItem[i].attr("id") == $(this).attr("id") )
						{
							dropObjItem[i].removeData("user");
							dropObjItem[i] = "";
						}
					}
				}
				targetObj = $(this);
				dragObj.css({"pointer-events":"none"});
				popAudio("click");
				$(this).css("z-index", Number( $(this).css("z-index") ) + 100 + 1 );
				$(this).removeData("user");
			})
		}
		setDragObjEvent();

		dropObj.off("click").on("click",function(){
			if( targetObj )
			{
				if(optionType=="not-ans-btn-one")
				{
					dragIconOverX = 11;
					dragIconOverY = 11;
					var item = targetObj;
					targetObj = "";

					var index = dropObj.index( $(this) );
					if( dropObjItem[index] && dropObjItem[index] != ""  )
					{
						itemReturn( dropObjItem[index] );
						dropObjItem[index].removeData("user");
						dropObjItem[index] = "";
					}
					dropObjItem[index] = item;


					var dragIndex = dragObj.index( item );
					var dropTop =  dp2lp($(this).position().top);
					var dropLeft =  dp2lp($(this).position().left);

					var defaultX = Number(item.attr("data-originalLeft") ) + dragIconOverX;
					var defaultY = Number(item.attr("data-originalTop") ) + dragIconOverY;

					var eventX = dropLeft + dragIconOverX;
					var eventY = dropTop + dragIconOverY;

					item.css({"top": ( dropTop ) + "px", "left": ( dropLeft ) + "px"});
					actions[dragIndex].eventX = eventX;
					actions[dragIndex].eventY = eventY;

					addAction(dragIndex, defaultX, defaultY, eventX, eventY, {});
					drawLine();

					dragObj.css({"pointer-events":"auto"});
					item.data("user", $(this).data("ans") );


					var bool = true;
					item.each(function(){
						if( $(this).data("user") != $(this).data("ans") ) bool = false;
					})
					if(bool)
					{
						lastSet(true);
						alertShowHide(target, "correct");

						$("#" + item.data("target") ).show();
					}
					else
					{
						--chance;
						if(chance == 0 )
						{
							lastSet(false);
							alertShowHide(target, "incorrect");
							$("#" + item.data("target") ).show();
						}
						else
						{
							alertShowHide(target, "again" , function(){
								allReset();
								setDragObjEvent();
								dragObj.css({"pointer-events":"auto"});
							});
						}

					}
				}
				else if(optionType=="ans-to-ans")
				{
					var item = targetObj;
					targetObj = "";

					var index = dropObj.index( $(this) );
					if( dropObjItem[index] && dropObjItem[index] != ""  )
					{
						itemReturn( dropObjItem[index] );
						dropObjItem[index].removeData("user");
						dropObjItem[index] = "";
					}
					dropObjItem[index] = item;

					var dragIndex = dragObj.index( item );
					var dropTop =  dp2lp($(this).position().top);
					var dropLeft =  dp2lp($(this).position().left);

					var defaultX = Number(item.attr("data-originalLeft") ) + dragIconOverX;
					var defaultY = Number(item.attr("data-originalTop") ) + dragIconOverY;

					var eventX = dropLeft + dragIconOverX;
					var eventY = dropTop + dragIconOverY;

					item.css({"top": ( dropTop ) + "px", "left": ( dropLeft ) + "px"});
					actions[dragIndex].eventX = eventX;
					actions[dragIndex].eventY = eventY;

					addAction(dragIndex, defaultX, defaultY, eventX, eventY, {});
					drawLine();

					dragObj.css({"pointer-events":"auto"});
					item.data("user", $(this).data("ans") );


					var bool = true;
					if( item.data("user") != item.data("ans") ) bool = false;

					if(bool)
					{
						popAudio("correct");
						item.off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none"});
						$(this).off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none"});
					}
					else
					{
						itemReturn( item );
						popAudio("incorrect");
					}
				}
				else
				{
					var item = targetObj;
					targetObj = "";

					if( optionType != "unReturn")
					{
						var index = dropObj.index( $(this) );
						if( dropObjItem[index] && dropObjItem[index] != ""  )
						{
							itemReturn( dropObjItem[index] );
							dropObjItem[index].removeData("user");
							dropObjItem[index] = "";
						}
						dropObjItem[index] = item;
					}


					var dragIndex = dragObj.index( item );
					var dropTop =  dp2lp($(this).position().top);
					var dropLeft =  dp2lp($(this).position().left);

					var defaultX = Number(item.attr("data-originalLeft") ) + dragIconOverX;
					var defaultY = Number(item.attr("data-originalTop") ) + dragIconOverY;

					var eventX = dropLeft + dragIconOverX;
					var eventY = dropTop + dragIconOverY;

					item.css({"top": ( dropTop ) + "px", "left": ( dropLeft ) + "px"});
					actions[dragIndex].eventX = eventX;
					actions[dragIndex].eventY = eventY;

					popAudio("click");

					addAction(dragIndex, defaultX, defaultY, eventX, eventY, {});
					drawLine();

					dragObj.css({"pointer-events":"auto"});
					item.data("user", $(this).data("ans") );
				}

			}
		})

		box.off("mousemove").on("mousemove", function($e){
			if(targetObj)
			{
				itemDrawLine($e, targetObj);
			}
		})

		box.off("click").on("click", function(){
			if(targetObj && !$(':focus').hasClass("speaker-btn") )
			{
				if( !$(':focus').hasClass("drag-obj") )
				{
					itemReturn(targetObj);
					targetObj.removeData("user");
					targetObj = "";
					dragObj.css({"pointer-events":"auto"});
					popAudio("incorrect");
				}
			}
			else
			{

			}
		})

		target.find(".popup_close_btn").bind("click",function(){
			if( targetObj )
			{
				itemReturn(targetObj);
				targetObj.removeData("user");
				targetObj = "";
				dragObj.css({"pointer-events":"auto"});
			}
		})

		ansCheckBtn.off("click").on("click", function(){
			dragObj.off("click")

			if( isAll() )
			{
				if( isAns() )
				{
					lastSet(true);
					alertShowHide(target, "correct");
				}
				else
				{
					--chance;
					if(chance == 0 )
					{
						lastSet(false);
						alertShowHide(target, "incorrect");
					}
					else
					{
						alertShowHide(target, "again" , function(){
							allReset();
							setDragObjEvent();
						});
					}
				}
			}
			else
			{
				alertShowHide(target, "checkAns" , function(){
					setDragObjEvent();
				});
			}
		});
		var isAnsLineView = false;
		ansPrevealBtn.off("click").on("click",function(){
			isAnsLineView = !isAnsLineView;
			if(isAnsLineView)
			{
				_ansCanvas.show();

				if( $(this).data("target") )
				{
					$("#"+$(this).data("target")).show();
				}
			}
			else
			{
				_ansCanvas.hide();
				if( $(this).data("target") )
				{
					$("#"+$(this).data("target")).hide();
				}
			}
		})

		function addAction(idx, dX, dY, eX, eY, opt)
		{
			actions[idx] = {};
			actions[idx].defaultX = dX;
			actions[idx].defaultY = dY;
			actions[idx].eventX = eX;
			actions[idx].eventY = eY;

			actions[idx].color = opt.color ? opt.color : defaultColor ;
			actions[idx].size = opt.size ? opt.size : defaultLineSize ;
		}
		function setAction(idx, eX, eY, opt)
		{
			actions[idx].eventX = eX;
			actions[idx].eventY = eY;

			actions[idx].color = opt.color ? opt.color : defaultColor ;
			actions[idx].size = opt.size ? opt.size : defaultLineSize ;
		}

		function drawLine()
		{
			ctx.clearRect(0, 0, 9999, 9999);
			$.each(actions, function(i) {
				draw(this);
			});
		}

		function draw($actions)
		{
			var defaultX = ( ($actions.defaultX ));
			var defaultY = ( ($actions.defaultY ));
			var eventX = ( ($actions.eventX ));
			var eventY = ( ($actions.eventY ));

			ctx.beginPath();
			ctx.moveTo(defaultX,defaultY);
			ctx.lineTo(eventX, eventY);
			ctx.strokeStyle = $actions.color;
			ctx.lineWidth = $actions.size;
			ctx.lineCap = 'round'; // butt, round, square
			ctx.stroke();
		}

		function itemDrawLine($e, $item)
		{
			var item = $item;
			var xMouse = Number($e.pageX) - ( document.getElementById( item.attr("id") ).getBoundingClientRect().width ) / 2;
			var yMousea = Number($e.pageY) - ( document.getElementById( item.attr("id") ).getBoundingClientRect().height ) / 2;
			item.offset( { left: xMouse, top: yMousea } );

			var dragIndex = dragObj.index( item );

			var defaultX = Number(item.attr("data-originalLeft") ) + dragIconOverX;
			var defaultY = Number(item.attr("data-originalTop") ) + dragIconOverY;
			var eventX = ( dp2lp( item.position().left) ) + dragIconOverX;
			var eventY = ( dp2lp( item.position().top) ) + dragIconOverY;

			addAction(dragIndex, defaultX, defaultY, eventX, eventY, {});
			drawLine();
		}
		function itemReturn($item)
		{
			var item = $item;
			var dragIndex = dragObj.index( item );

			var defaultX = Number(item.attr("data-originalLeft") ) + dragIconOverX;
			var defaultY = Number(item.attr("data-originalTop") ) + dragIconOverY;

			actions[dragIndex].defaultX = defaultX;
			actions[dragIndex].defaultY = defaultY;
			actions[dragIndex].eventX = defaultX;
			actions[dragIndex].eventY = defaultY;

			item.removeData("user");
			item.css( { left: (defaultX-dragIconOverX)+"px", top: (defaultY-dragIconOverY)+"px" } );
			drawLine();
		}
		function allReset()
		{
			dragObj.each(function(){
				itemReturn( $(this) );
			})
		}
		function isAll()
		{
			var bool = true;
			dragObj.each(function(){
				var temp = false;
				if(  $(this).data("option") )
				{
					if( $(this).data("option") == "not")  temp = true;
				}

				if( $(this).data("user") == undefined && temp == false) bool = false;
			})
			return bool;
		}
		function isAns()
		{
			var bool = true;
			dragObj.each(function(){
				if( $(this).data("user") != $(this).data("ans") && $(this).data("ans") != "not" ) bool = false;
				if( $(this).data("user") == "no-data" ) bool = false;
			})
			return bool;
		}

		function lastSet($bool)
		{
			ansCheckBtn.off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none", "opacity":"0.5"});
			dragObj.off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none"});
			dropObj.off("click").removeClass("focusRemove").addClass("focusRemove").css({"pointer-events":"none"});
			box.off("click mousemove");

			if( ansCheckBtn.data("target") )
			{
				$("#"+ansCheckBtn.data("target")).show();
			}

			if($bool)
			{
				
			}
			else
			{
				dragObj.each(function(i){
					var dragItem = $(this);
					var dataAns = dragItem.data("ans");
					var dragIndex = dragObj.index( dragItem );

					dropObj.each(function(){
						var dataDropAns = $(this).data("ans");
						if( dataAns == dataDropAns )
						{
							var defaultX = ( dp2lp( $(this).position().left) ) + dragIconOverX;
							var defaultY = ( dp2lp( $(this).position().top) ) + dragIconOverY;

							actions[dragIndex].eventX = defaultX;
							actions[dragIndex].eventY = defaultY;
							actions[dragIndex].color = ansViewColor;

							dragItem.css( { left: (defaultX-dragIconOverX)+"px", top: (defaultY-dragIconOverY)+"px" } );
						}
					})
					drawLine();
				})
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
