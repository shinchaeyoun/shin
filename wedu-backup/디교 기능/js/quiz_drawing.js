function setDrawing($target)
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
		var sketchBox = target.find(".sketch_box");
		var saveBtn = target.find(".sketch_save_btn");
		tabIndexNum = Number( target.parent().attr("tabIndex") )+6-4;

		if( isNaN(tabIndexNum) )
		{
			tabIndexNum = Number( target.find(".popup_title").attr("tabIndex") );
		}
		if(!saveBtn.attr("tabIndex") ) saveBtn.attr("tabIndex", tabIndexNum);

		if( sketchBox.data("index"))
		{
			tabIndexNum += Number( sketchBox.data("index") );
		}


		saveBtn.off("click").on("click", function(){
			alertShowHide(target.parent().parent(), "save");

			essenceAllChk();
		})

		sketchBox.find("img").css({"pointer-events":"none", "-ms-user-select":"none", "-ms-touch-select":"none", "-webkit-user-select":"none;"});

		var isAnsView = false;
		var ansPrevealBtn = target.find(".ans-preveal-btn");
		ansPrevealBtn.off("click").on("click", function(){
			isAnsView = !isAnsView;
			if( isAnsView )
			{
				$("#" + $(this).data("target") ).css("z-index","1000").show();
			}
			else
			{
				$("#" + $(this).data("target") ).hide();
			}
		})

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

		var sketchDrawBox2 = sketchBox.find(".sketch_draw_box");
		var sketchDrawBox = sketchBox.find(".sketch-auto-box");
		var sketchUiBox = sketchBox.find(".sketch_ui_box");
		var sketchSaveBtn = sketchBox.find(".sketch_save_btn");

		sketchDrawBox.each(function(){
			var sketchCanvas = $(this).find("canvas");
			var sketchPenSize = $(this).attr("data-pen-size") ? $(this).attr("data-pen-size") : 13;
			var sketchViewTarget = $(this).attr("data-sketch-view-target");
			var sketchActions = [];

			sketchCanvas.sketch({defaultSize:sketchPenSize, actions:sketchActions});
			sketchCanvas.sketch("redraw");
		});
		if(sketchDrawBox.length < 1 )
		{
			sketchDrawBox2.each(function(){
				var sketchCanvas = $(this).find("canvas");
				var sketchPenSize = $(this).attr("data-pen-size") ? $(this).attr("data-pen-size") : 13;
				var sketchViewTarget = $(this).attr("data-sketch-view-target");
				var sketchActions = [];

				sketchCanvas.sketch({defaultSize:sketchPenSize, actions:sketchActions});
				sketchCanvas.sketch("redraw");
			});
		}

		sketchUiBox.find(".sketch_ui_color_btn:eq(5)").removeClass("on").addClass("on");
		sketchUiBox.find(".sketch_ui_color_btn").off("click").on("click",function(){
			popAudio("click");
			sketchUiBox.find(".sketch_ui_eraser_btn").removeClass("on");
			sketchUiBox.find(".sketch_ui_color_btn").removeClass("on");
			$(this).addClass("on");


			var _thisBtn = $(this);
			sketchDrawBox.each(function(){
				var sketchCanvas = $(this).find("canvas");
				if(_thisBtn.attr("data-color")){
					sketchCanvas.sketch().set("operation", "");
					sketchCanvas.sketch().set("color", _thisBtn.attr("data-color"));
				}
			});
			sketchDrawBox2.each(function(){
				var sketchCanvas = $(this).find("canvas");
				if(_thisBtn.attr("data-color")){
					sketchCanvas.sketch().set("operation", "");
					sketchCanvas.sketch().set("color", _thisBtn.attr("data-color"));

				}
			});
		});

		sketchUiBox.find(".sketch_ui_size_btn:eq(2)").removeClass("on").addClass("on");
		sketchUiBox.find(".sketch_ui_size_btn").off("click").on("click",function(){
			popAudio("click")
			sketchUiBox.find(".sketch_ui_eraser_btn").removeClass("on");
			sketchUiBox.find(".sketch_ui_size_btn").removeClass("on");
			$(this).addClass("on");

			var _thisBtn = $(this);
			sketchDrawBox.each(function(){
				var sketchCanvas = $(this).find("canvas");
				if(_thisBtn.attr("data-size")){
					// sketchCanvas.sketch().set("size", _thisBtn.height());
					sketchCanvas.sketch().set("size", _thisBtn.find(".shape").height());
				}

			});
			sketchDrawBox2.each(function(){
				var sketchCanvas = $(this).find("canvas");
				if(_thisBtn.attr("data-size")){
					sketchCanvas.sketch().set("size", _thisBtn.find(".shape").height());
				}

			});
		});

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

		sketchUiBox.find(".sketch_ui_eraser_btn").off("click").on("click",function(){
			popAudio("click")
			sketchUiBox.find(".sketch_ui_eraser_btn").removeClass("on");
			$(this).addClass("on");

			var _thisBtn = $(this);
			sketchDrawBox.each(function(){
				var sketchCanvas = $(this).find("canvas");
				if(_thisBtn.attr("data-eraser")){
					if(_thisBtn.attr("data-eraser") == "pixcel"){
						sketchCanvas.sketch().set("operation", "destination-out");
					}else if(_thisBtn.attr("data-eraser") == "all"){
						sketchCanvas.sketch().set("operation", "");
						sketchCanvas.sketch("actions",[]);
						sketchCanvas.sketch("redraw");
					}
				}
			});
			sketchDrawBox2.each(function(){
				var sketchCanvas = $(this).find("canvas");
				if(_thisBtn.attr("data-eraser")){
					if(_thisBtn.attr("data-eraser") == "pixcel"){
						sketchCanvas.sketch().set("operation", "destination-out");
					}else if(_thisBtn.attr("data-eraser") == "all"){
						sketchCanvas.sketch().set("operation", "");
						sketchCanvas.sketch("actions",[]);
						sketchCanvas.sketch("redraw");
					}
				}
			});
		});
		sketchUiBox.find(".sketch_ui_color_btn").attr("tabindex",tabIndexNum);
		sketchUiBox.find(".sketch_ui_size_btn").attr("tabindex",tabIndexNum);
		sketchUiBox.find(".sketch_ui_eraser_btn").attr("tabindex",tabIndexNum);
		

		if( target.parent().parent().attr("data-essence") )
		{
			target.find("canvas").bind("mousedown touchstart",function(){
				essenceAllChk();
			})
		}

		function essenceAllChk()
		{
			if( target.parent().parent().attr("data-essence") )
			{
				target.attr("data-ans","ok");
				setEssenceAnsChk( target.parent().parent() );
			}
		}
	}
}
