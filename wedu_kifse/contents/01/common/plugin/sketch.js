var __slice = Array.prototype.slice;
(function($) {
  var Sketch;
  $.fn.sketch = function() {
    var args, key, sketch;
    key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (this.length > 1) {
      $.error('Sketch.js can only be called on one element at a time.');
    }
    sketch = this.data('sketch');
    if (typeof key === 'string' && sketch) {
      if (sketch[key]) {
        if (typeof sketch[key] === 'function') {
          return sketch[key].apply(sketch, args);
        } else if (args.length === 0) {
          return sketch[key];
        } else if (args.length === 1) {
          return sketch[key] = args[0];
        }
      } else {
        return $.error('Sketch.js did not recognize the given command.');
      }
    } else if (sketch) {
      return sketch;
    } else {
      this.data('sketch', new Sketch(this.get(0), key));
      return this;
    }
  };
  Sketch = (function() {
    function Sketch(el, opts) {
	  var _this = this;
	  this.end = false;
      this.el = el;
      this.canvas = $(el);
      this.context = el.getContext('2d');
      this.options = $.extend({
        toolLinks: true,
        defaultTool: 'marker',
        defaultColor: '#000000',
        defaultSize: 20
      }, opts);
      this.painting = false;
      this.color = this.options.defaultColor;
      this.size = this.options.defaultSize;
	  this.operation = "";
      this.tool = this.options.defaultTool;
      this.actions = this.options.actions ? this.options.actions : [];
      this.action = [];
      this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', this.onEvent);
      if (this.options.toolLinks) {

		$("a[href=\"#" + (this.canvas.attr('id')) + "\"]").click(function(e){
			var $canvas, $this, key, sketch, _i, _len, _ref;
			  $this = $(this);
			  $canvas = $($this.attr('href'));
			  sketch = $canvas.data('sketch');
			  _ref = ['color', 'size', 'tool'];
			  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				key = _ref[_i];
				if ($this.attr("data-" + key)) {
				  sketch.set(key, $(this).attr("data-" + key));
				}
			  }
			  if ($(this).attr('data-download')) {
				sketch.download($(this).attr('data-download'));
			  }
			  return false;
		});

      }
    }
    Sketch.prototype.download = function(format) {
      var mime;
      format || (format = "png");
      if (format === "jpg") {
        format = "jpeg";
      }
      mime = "image/" + format;
      return this.el.toDataURL(mime);
    };
	Sketch.prototype.getActions = function() {

      return this.actions;
    };
    Sketch.prototype.set = function(key, value) {
      this[key] = value;
      return this.canvas.trigger("sketch.change" + key, value);
    };
    Sketch.prototype.startPainting = function() {
      this.painting = true;
      return this.action = {
        tool: this.tool,
        color: this.color,
        size: parseFloat(this.size),
		operation:this.operation,
        events: []
      };
    };
    Sketch.prototype.stopPainting = function() {
      if (this.action) {
        this.actions.push(this.action);
      }
      this.painting = false;
      this.action = null;
      return this.redraw();
    };
    Sketch.prototype.onEvent = function(e) {
      if (e.originalEvent && e.originalEvent.targetTouches && e.type!="touchend") {
        e.pageX = e.originalEvent.targetTouches[0].pageX;
        e.pageY = e.originalEvent.targetTouches[0].pageY;
      }
      $.sketch.tools[$(this).data('sketch').tool].onEvent.call($(this).data('sketch'), e);
      e.preventDefault();
      return false;
    };
    Sketch.prototype.redraw = function() {
      var sketch;
      this.el.width = this.canvas.width();
      this.context = this.el.getContext('2d');
      sketch = this;
      $.each(this.actions, function() {
        if (this.tool) {
          return $.sketch.tools[this.tool].draw.call(sketch, this);
        }
      });
      if (this.painting && this.action) {
        return $.sketch.tools[this.action.tool].draw.call(sketch, this.action);
      }
    };
    return Sketch;
  })();
  $.sketch = {
    tools: {}
  };
  $.sketch.tools.marker = {
    onEvent: function(e) {
      switch (e.type) {
        case 'mousedown':
        case 'touchstart':
          this.startPainting();
          break;
        case 'mouseup':
        case 'mouseout':
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.stopPainting();
      }

      if (this.painting) {
        this.action.events.push({
          x: dp2lp(e.pageX - this.canvas.offset().left),
          y: dp2lp(e.pageY - this.canvas.offset().top),
		  //x: e.pageX - this.canvas.offset().left,
          //y: e.pageY - this.canvas.offset().top,
          event: e.type
        });
        return this.redraw();
      }
    },
    draw: function(action) {
      var event, previous, _i, _len, _ref;
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.moveTo(action.events[0].x, action.events[0].y);
      _ref = action.events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.context.lineTo(event.x, event.y);
        previous = event;
      }
      this.context.strokeStyle = action.color;
      this.context.lineWidth = action.size;

	  if(action.operation != ""){
		  this.context.strokeStyle = "rgba(0,0,0,1)";
		  this.context.globalCompositeOperation = action.operation;
	  }else{
		  this.context.globalCompositeOperation = "source-over";
	  }

		var tempAction = event;
		var canvasBg = $(this.canvas);
		var canvasoffset = this.canvas.offset();
		var tempContext = this.context;
		var _this = this;

		canvasBg.parent().find(".sketch-auto-txt").each(function(){
			if(_this.end|| _this.action == null) return false;
			var mx = (tempAction.x);
			var my = (tempAction.y);

			var bounds = $(this).offset();
			var mT = dp2lp(bounds.top) - dp2lp(canvasoffset.top);
			var mB = mT + dp2lp( $(this).outerHeight()+5 );
			var mL = dp2lp(bounds.left) - dp2lp(canvasoffset.left);
			var mR = mL + dp2lp( $(this).outerWidth()+5 );

			if(mL <= mx && mx <= mR && mT <= my && my <= mB )
			{
				$(this).removeClass("on").addClass("on");

				var max = Math.floor( $(this).parent().find(".sketch-auto-txt").length/2 );
				var min = $(this).parent().find(".sketch-auto-txt.on").length;

				if( min >= max )
				{
					$(this).parent().find(".sketch-auto-txt").removeClass("on").addClass("on");
					$(this).parent().removeClass("on").addClass("on");
					//$(this).parent().find("img").show();
				}

				var max = $(this).parent().parent().find(".sketch-auto-txt").length;
				var min = $(this).parent().parent().find(".sketch-auto-txt.on").length;
				//if( min >= max && $(".sketch-auto-txt-group").find("img").css("display") == "none" )
				if( min >= max && _this.end == false )
				{
					_this.canvas.off('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', _this.onEvent);
					_this.end = true;

					//$(".sketch-auto-txt-group").find("img").show();
					canvasBg.parent().find("img").show();
					//_this.context.clearRect(0, 0, _this.el.width, _this.el.width);
					//tempContext.fillStyle = 'rgba(0,0,0,1)';
					//tempContext.fillRect(0, 0, 9999, 9999);
					_this.actions = [];
					_this.action = null;
					_this.redraw();
				}
			}
		})

      return this.context.stroke();
    }
  };
  return $.sketch.tools.eraser = {
    onEvent: function(e) {
      return $.sketch.tools.marker.onEvent.call(this, e);
    },
    draw: function(action) {
      var oldcomposite;
      oldcomposite = this.context.globalCompositeOperation;
      this.context.globalCompositeOperation = "copy";
      action.color = "rgba(0,0,0,0)";
      $.sketch.tools.marker.draw.call(this, action);
      return this.context.globalCompositeOperation = oldcomposite;
    }
  };
})(jQuery);
