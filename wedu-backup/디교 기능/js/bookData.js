function getBookData($callback)
{
	var _this = this;
	var unitIdArr = unitId.split("-");

	_this.data = new Object();
	_this.minPage;
	_this.maxPage;
	_this.curPage;

	var script = document.createElement('script');
	script.src = "./"+bookId+"/data/bookdata"+unitId+".js";
	script.type = 'text/javascript';
	script.language = 'javascript';

	var done = false;
	script.onload = script.onreadystatechange = function()
	{
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'))
		{
			done = true;

			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;
			script.parentNode.removeChild(script);

			_this.data = eval("unit"+unitId+"Data");
			_this.minPage = _this.data.info.pageStart;
			_this.maxPage = _this.data.info.pageEnd;
			_this.curPage = _this.minPage;

			if( typeof $callback === "function" )
			{
				$callback();
			}
		}
	};
	document.getElementsByTagName( "head" )[0].appendChild(script);
}
