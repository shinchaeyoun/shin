function setDrawfull($target)
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
		var sketchBox = target.find(".sketch_box");

		sketchBox.find("img").css({"pointer-events":"none", "-ms-user-select":"none", "-ms-touch-select":"none", "-webkit-user-select":"none;"});


		var sketchDrawBox = sketchBox.find(".sketch_draw_box");
		var sketchUiBox = sketchBox.find(".sketch_ui_box");

		sketchDrawBox.each(function(){
			var _this = $(this);
			var sketchPathItem = _this.find("path, polygon");
			var sketchTextItem = _this.find("text");
			sketchTextItem.css("pointer-events","none");

			sketchPathItem.off("click").on("click",function($e){
				$e.preventDefault();
				$e.stopPropagation();
				var parentColor = _this.attr("data-color");

				$(this).attr("fill",parentColor);
			});

			sketchPathItem.off("click").on("click",function($e){
				$e.preventDefault();
				$e.stopPropagation();
				var parentColor = _this.attr("data-color");

				$(this).attr("fill",parentColor);
			});
		});

		sketchUiBox.find(".sketch_ui_color_btn").off("click").on("click",function(){
			var _thisBtn = $(this);

			if(_thisBtn.attr("data-color"))
			{
				sketchDrawBox.attr("data-color", _thisBtn.attr("data-color"));
			}
		});

		sketchUiBox.find(".sketch_ui_color_btn").attr("tabindex","1");
	}
}
