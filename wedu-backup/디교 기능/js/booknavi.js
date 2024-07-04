function pageNavi()
{
	var _this = this;
	var prevBtn = $("#ui-sub-prev-btn");
	var nextBtn = $("#ui-sub-next-btn");

	prevBtn.off("click").on("click", function(){
		navi.prevPage();
	});
	nextBtn.off("click").on("click", function(){
		navi.nextPage();
	});

	_this.prevPage = function()
	{
		if(pageType == "even")
		{
			if( Number(bookData.curPage) > Number(bookData.minPage)+1 )
			{
				var moveNum = Number(bookData.curPage)-2;
				bookData.curPage = moveNum;
				bookLoaer.pageLoad( moveNum );
				setPage();
			}
		}
		else
		{
			if( Number(bookData.curPage) > Number(bookData.minPage) )
			{
				var leftPage = ( (Number(bookData.curPage)%2) != 0 ) ? true :false;
				if(leftPage)
				{
					var moveNum = Number(bookData.curPage)-1;
					bookData.curPage = moveNum;
					$("#wrap").attr("page", "right");
					bookLoaer.pageLoad( moveNum );
				}
				else
				{
					var moveNum = Number(bookData.curPage)-1;
					bookData.curPage = moveNum;

					$("#wrap").attr("page", "left");
				}
				setPage();
			}
		}
	}

	_this.nextPage = function()
	{
		if(pageType == "even")
		{
			if( Number(bookData.curPage) < Number(bookData.maxPage)-1 )
			{
				var moveNum = Number(bookData.curPage)+2;
				bookData.curPage = moveNum;
				bookLoaer.pageLoad( moveNum );
				setPage();
			}
		}
		else
		{
			if( Number(bookData.curPage) < Number(bookData.maxPage) )
			{
				var leftPage = ( (Number(bookData.curPage)%2) != 0 ) ? true :false;
				if(leftPage)
				{
					var moveNum = Number(bookData.curPage)+1;
					bookData.curPage = moveNum;
					$("#wrap").attr("page", "right");
				}
				else
				{
					var moveNum = Number(bookData.curPage)+1;
					bookData.curPage = moveNum;
					bookLoaer.pageLoad( moveNum );
					$("#wrap").attr("page", "left");
				}
				setPage();
			}
		}
	}
	_this.movePage = function($page, $target)
	{
		$("#wrap #middle").css({"visibility":"hidden","opacity":"0"});
		bookData.curPage = Number($page);
		bookLoaer.pageLoad( Number($page) );
		setPage();

		$(".book-popup").hide();

		$($target).focus();
	}

	function setPage()
	{
		$(".navi-page-text .cur-page").text(bookData.curPage);
		$(".navi-page-text .max-page").text(bookData.maxPage);
	}
	setPage();
}
