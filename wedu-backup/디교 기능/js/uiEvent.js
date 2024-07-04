function uiResizeEvent()
{
	var wrapEle = $("#wrap");
	var wrapWidth;
	var wrapHeight;
	var windowRatioWidth = window.innerWidth;
	var windowRatioHeight = window.innerHeight;

	if( windowRatioWidth > windowRatioHeight )
	{
		pageType = "even";
		wrapWidth = 1968;
		wrapHeight = 1404;

		windowRatio = windowRatioWidth / wrapWidth;
		if( windowRatio > (windowRatioHeight / wrapHeight) ) windowRatio = (windowRatioHeight / wrapHeight);
	}
	else
	{
		pageType = "odd";
		wrapWidth = 1059;
		wrapHeight = 1514;
		windowRatio = (windowRatioHeight / wrapHeight);
		if( windowRatio > (windowRatioWidth / wrapWidth) ) windowRatio = windowRatioWidth / wrapWidth;
	}

	var wrapTop = wrapHeight/2;
	var wrapLeft = wrapWidth/2;

	wrapEle.css("transform","scale(" + windowRatio + ")");
	wrapEle.css("transform-origin","50% 50%");

	wrapEle.css("top",50 + "%");
	wrapEle.css("left",50 + "%");
	wrapEle.css("margin-top", - wrapTop+ "px");
	wrapEle.css("margin-left", - wrapLeft+ "px");

	window.addEventListener("resize", uiResizeEvent, false);
	window.addEventListener("orientationchange", uiResizeEvent, false);
}
