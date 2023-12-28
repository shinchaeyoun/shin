function bookLoaderEvent()
{
	var _this = this;
	var leftPage = $("#wrap #left-page .contents-box .book-page");
	var rightPage = $("#wrap #right-page .contents-box .book-page");
	var loadChkNum = 0;

	function leftPgaeLoad($page)
	{
		leftPage.find("*").remove();
		leftPage.load("./"+bookId+"/"+$page+".html", function(){
			leftPage.prepend( '<div id="pg'+$page+'" style="-webkit-user-select: none;"><img src="'+"./"+bookId+"/"+$page+'/'+$page+'.png" id="pdf'+$page+'" style="width:909px; height:1169px; background-color:white; -webkit-user-select: none;"/></div>' );
			leftPage.prepend( '<div class="pg-overlap"></div>' );
			pageEventReady( leftPage, function(){
				leftPage.find("#pg"+$page+"Overlay").css("z-index", "0");
				leftPage.find("#pg"+$page+" img").css("background-color", "transparent").attr("alt", "배경");

				loadComplte();
			});
		})
	}
	function rightPgaeLoad($page)
	{
		rightPage.find("*").remove();
		rightPage.load("./"+bookId+"/"+$page+".html", function(){
			rightPage.prepend( '<div id="pg'+$page+'" style="-webkit-user-select: none;"><img src="'+"./"+bookId+"/"+$page+'/'+$page+'.png" id="pdf'+$page+'" style="width:909px; height:1169px; background-color:white; -webkit-user-select: none;"/></div>' );
			rightPage.prepend( '<div class="pg-overlap"></div>' );
			pageEventReady( rightPage, function(){
				rightPage.find("#pg"+$page+"Overlay").css("z-index", "0");
				rightPage.find("#pg"+$page+" img").css("background-color", "transparent").attr("alt", "배경");

				loadComplte();
			});
		})
	}
	function loadComplte()
	{
		++loadChkNum;
		if(loadChkNum >= 2) pageLoadComplte();
	}

	_this.pageLoad = function($page)
	{
		$("#wrap #middle").css({"visibility":"hidden","opacity":"0"});
		var leftPageNum = ( ($page%2) == 0 ) ? $page-1 : $page;
		var rightPageNum = Number(leftPageNum)+1;
		leftPgaeLoad(leftPageNum);
		rightPgaeLoad(rightPageNum);

		loadChkNum = 0;
	}
}

function pageEventReady($target, $ballback)
{
	var imgTag = $target.find("img");
	if (imgTag.length > 0)
	{
		var temp = this;
		var chkNum = 0;
		imgTag.each(function(){
			var img = $(this);
			var src = $(this).attr("src");

			if ( !this.complete )
			{
				//console.log('이미지가 완전히 로딩되지 않음');
				var tmpImg = new Image() ;
				tmpImg.onload = imageLoaded;
				tmpImg.src = src;
				function imageLoaded()
				{
					var height = $(this).height();
					++chkNum;
					if(chkNum >= imgTag.length)
					{
						$ballback();
					}
				}
			}
			else
			{
				++chkNum;
				if(chkNum >= imgTag.length)
				{
					$ballback();
				}
			}
		})
	}
	else
	{
		$ballback();
	}
}
