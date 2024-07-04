function setToTheLine($target)
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
		var box = target.find(".draw-line-box");

		box.each(function(i){
			var option = $(this).data("option");
			var canvasID = "page-"+bookData.curPage+"-draw-line-box-canvas-"+"-"+Math.random()+"-"+i;
			var _canvasEle = $(this).find("canvas");
			_canvasEle.attr("id", canvasID);


			if(option=="cover")
			{
				var copy = _canvasEle.clone();
				copy.attr("id", canvasID+"-copy");
				$(this).append(copy);
				copy.css({"z-index":"1", "position":"absolute"});

				var copyCty = copy[0].getContext("2d");
			}


			var c = _canvasEle[0];
			var ctx = c.getContext("2d");
			var _w = Number( _canvasEle.attr("width") );
			var _h = Number( _canvasEle.attr("height") );

			var color = "#ffffff";
			if( $(this).data("color") ) color = $(this).data("color");

			var svgPath = $(this).attr("data-path");
			var svgBg = $(this).attr("data-src");

			//$(this).find("img").remove();

			_canvasEle.css({"z-index":"1", "position":"absolute"});
			ctx.strokeStyle = color;
			ctx.lineWidth = 15; //기본 값은 20 이였음
			if( $(this).data("size") ) ctx.lineWidth = $(this).data("size");

			ctx.stroke();

			var imgClo = new Image();
			imgClo.addEventListener('load', function(){
				if(option=="cover" )
				{
					copyCty.drawImage( imgClo , 0, 0, _w, _h);
				}
				else
				{
					ctx.drawImage( imgClo , 0, 0, _w, _h);
				}
			},false);
			imgClo.src = svgBg;

			const canvas = new Raphael( $(this).attr("id") );
			$(this).find("svg").attr({"width":_w, "height":_h});

			const path = canvas.path(svgPath);
			const startingPoint = path.getPointAtLength(0);
			const ellipse = canvas.ellipse(startingPoint.x, startingPoint.y, 15, 15);
			ellipse.attr("fill","#f00000")
			if( $(this).data("ellipse") )
			{
				ellipse.attr("fill",$(this).data("ellipse") )
			}

			const context = {
				canvas:canvas,
				path:path,
				ellipse:ellipse,
				totalLength: path.getTotalLength(),
				stepLength: 1,
				currentPosition: 1,
				findDistance: function(point1, point2)
				{
					const dx = point1.x - point2.x;
					const dy = point1.y - point2.y;
					return Math.sqrt(dx * dx + dy * dy);
				},
				closestPoint: function(svgPath,totalLength,currentPosition,stepLength,cursorPosition,findDistance)
				{
					const previousPoint = currentPosition - stepLength > 0 ? currentPosition - stepLength : 0;
					const previousDistance = findDistance(svgPath.getPointAtLength(previousPoint), cursorPosition);
					const nextPoint = currentPosition + stepLength < totalLength ? currentPosition + stepLength : totalLength;
					const nextDistance = findDistance(svgPath.getPointAtLength(nextPoint), cursorPosition);
					const movementStep = previousDistance < nextDistance ? -stepLength : stepLength;
					let movementPoint = previousDistance < nextDistance ? previousPoint : nextPoint;
					let movementDistance = previousDistance < nextDistance ? previousDistance : nextDistance;
					let pointDistance = Infinity;

					while (pointDistance > movementDistance) {if (window.CP.shouldStopExecution(0)) break;if (window.CP.shouldStopExecution(0)) break;
					pointDistance = movementDistance;
					movementPoint += movementStep;
					movementDistance = findDistance(svgPath.getPointAtLength(movementPoint), cursorPosition);
				}
				// We undo the last step, the one that made the condition fail
				window.CP.exitedLoop(0);window.CP.exitedLoop(0);movementPoint -= movementStep;
				return movementPoint;
			} }



			const dragStart = function dragStart()
			{
			  this.ellipse.ox = this.ellipse.attr('cx');
			  this.ellipse.oy = this.ellipse.attr('cy');
			  tempX= this.ellipse.ox;
			  tempY= this.ellipse.oy;

			  essenceAllChk();
			};

			const dragStop = function dragStop()
			{
				this.ellipse.ox = this.ellipse.attr('cx');
				this.ellipse.oy = this.ellipse.attr('cy');
				tempX= this.ellipse.ox;
				tempY= this.ellipse.oy;
			};

			const dragMove = function dragMove(dx, dy)
			{
				// ctx.clearRect(0, 0, _w, _h);
				ctx.beginPath();
				ctx.moveTo(tempX,tempY);

				const cursorPosition =
				{
					x: this.ellipse.ox + dp2lp(dx),
					y: this.ellipse.oy + dp2lp(dy)
				};


				this.currentPosition = this.closestPoint(this.path,this.totalLength,this.currentPosition,this.stepLength,cursorPosition,this.findDistance);

				const newPoint = this.path.getPointAtLength(this.currentPosition);
				this.ellipse.attr({cx: newPoint.x, cy: newPoint.y });
				tempX2 = newPoint.x;
				tempY2 = newPoint.y;

				ctx.lineTo(tempX2, tempY2);
				ctx.strokeStyle = color;
				//ctx.lineWidth = 15;
				ctx.stroke();
				if(option=="cover")
				{
					//ctx.drawImage( imgClo , 0, 0, _w, _h);
				}
				ctx.lineCap="round";

				tempX= newPoint.x;tempY= newPoint.y;
			};

			ellipse.drag(dragMove,dragStart,dragStop,context,context,context);
			$(this).find("svg").css({"z-index":"2"});

		})

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
