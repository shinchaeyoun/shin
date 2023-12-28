var isPorting = false;
var mediaServer = "https://www.nise.go.kr/2021_digitalbook/01/";
var bookId;
var unitId;
var bookData;
var bookLoaer;
var navi;
var pageType;
var isSua = false;
var uniqId = "kifse-2021-01";
var customPage = $.bookUtils.getURLParam("pageNum");

function initialize()
{
	if(!isPorting) mediaServer = "./";
	bookId = $.bookUtils.getURLParam("bookId");
	if(!bookId)bookId = "01_01_01";

	uniqId += "-"+bookId;

	unitId = $.bookUtils.getURLParam("unitId");
	if(!unitId)unitId = "1";

	bookData = new getBookData(function(){
		init();
	});

	if( bookId == "00_00_00" || bookId == "00_00_01" || bookId == "00_00_02")
	{
		$(".icon-am-btn").remove();
		$(".icon-reference-btn").remove();
		$(".icon-zoom-btn").remove();
		$(".essence-open-btn").remove();
		$(".pack-open-btn").remove();

		$("#top-left-box").append('<button data-btn="ui-btn" class="icon-zoom-btn icon-btn" title="확대보기" role="button" tabIndex="1"></button>');
		$("#wrap #bottom .thumnail-btn").css({"display":"block", "margin":"0 auto"});
	}

	if($.bookUtils.getURLParam("test"))
	{
	}
	else
	{
		$("#wrap").removeClass("transparent").addClass("transparent");
	}
}

function init()
{
	navi = new pageNavi();
	bookLoaer = new bookLoaderEvent();
	//bookLoaer.pageLoad( bookData.minPage );
	if(customPage)
	{
		navi.movePage( Number(customPage), $("#wrap") );
		//bookData.curPage = Number(customPage);
		//bookLoaer.pageLoad( Number(customPage) );
	}
	else
	{
		bookLoaer.pageLoad( bookData.minPage );
	}

	uiResizeEvent();
	setBugaEvent();
	setKeyEvent();
	setZoomEvent();	/*uibutton.js*/

	setTimeout(function () { $("#wrap-acc").focus(); }, 100);

}

var isWrapLoad = false;
function pageLoadComplte()
{
	if(bookData.curPage >= ( Number(bookData.minPage)+2 ) || (bookId == "00_00_00") || bookId == "00_00_01" || bookId == "00_00_02" )
	{
		$(".book-mark-btn").remove();
		$("#left-box > div:first-child").append( '<button data-btn="ui-btn" class="book-mark-btn" title="책갈피 추가" tabindex="1001"></button>');
		$("#right-box > div:first-child").append('<button data-btn="ui-btn" class="book-mark-btn" title="책갈피 추가" tabindex="9000"></button>');

		var leftPageNum = ((Number(bookData.curPage)%2) == 0 ) ? (Number(bookData.curPage))-1 : (Number(bookData.curPage) );
		var rightPageNum = Number(leftPageNum)+1;
		var data1 = localStorage.getItem(uniqId+"-"+leftPageNum+"-bookmark");
		var data2 = localStorage.getItem(uniqId+"-"+rightPageNum+"-bookmark");

		if( data1 == "true" ) $("#left-box .book-mark-btn").removeClass("on").addClass("on");
		if( data2 == "true" ) $("#right-box .book-mark-btn").removeClass("on").addClass("on");
	}

	$(".book-mark-btn").off("click").on("click",function(){
		var leftPageNum = ((Number(bookData.curPage)%2) == 0 ) ? (Number(bookData.curPage))-1 : (Number(bookData.curPage) );
		var rightPageNum = Number(leftPageNum)+1;
		var pageNum = leftPageNum;
		if( $(this).parent().parent().attr("id") == "right-box") pageNum = rightPageNum;


		if( $(this).hasClass("on") )
		{
			$(this).removeClass("on");
			localStorage.setItem(uniqId+"-"+pageNum+"-bookmark", false);
		}
		else
		{
			$(this).addClass("on");
			localStorage.setItem(uniqId+"-"+pageNum+"-bookmark", true);
		}
		boomarkList_update();
	});

	if(isWrapLoad==false)
	{
		isWrapLoad = true;
		$("#wrap").show();
		$("#wrap").attr("page", $.bookUtils.pageChk( bookData.curPage ) );
		$("#wrap").removeClass(bookId).addClass("wrap-"+bookId);
		$("#wrap").css({"visibility":"visible","opacity":"1"});
		// $("#wrap #middle").css({"visibility":"visible","opacity":"1"});
	}

	/*프레임 에니메이션*/
	if( (bookData.minPage == bookData.curPage || Number(bookData.minPage)+1 == Number(bookData.curPage)) &&  bookId != "00_00_00" &&  bookId != "00_00_01" &&  bookId != "00_00_02" )
	{
		frameAnimationChkNum = 0;
		frameAnimation( $( "#middle #left-box" ).find(".frame_animation_box"),  Number(bookData.minPage) );
		frameAnimation( $( "#middle #right-box" ).find(".frame_animation_box"),  Number(bookData.minPage)+1 );
		$( "#middle #left-box .book-page" ).removeClass("on");
		$( "#middle #right-box .book-page").removeClass("on");
	}
	else
	{
		$( "#middle #left-box .book-page" ).removeClass("on").addClass("on");
		$( "#middle #right-box .book-page").removeClass("on").addClass("on");
		digitalBookView();
	}
}

var frameAnimationChkNum;
function frameAnimation($box, $pageNum)
{
	$box.each(function(){
		var frameCanvas = $(this).find(".frame_animation_canvas");
		var frames = new Array();
		var framesMax = $(this).attr("data-max");
		var type = $(this).attr("data-file");
		for(var i=0; i<framesMax; i++)
		{
			frames.push("./"+bookId+"/"+ $pageNum + "/" + $pageNum + "_" + (i+1) + type);
		}

		frameCanvas.spritespin({
			width : 909,
			height: 1169,
			frames: frames.length,
			behavior: "drag", // "hold"
			module: "360",
			sense : -1,
			source: frames,
			animate : true,
			loop: true,
			frameWrap : true,
			frameStep : 1,
			frameTime : 30,
			enableCanvas : true,
			onLoad:function()
			{
				++frameAnimationChkNum;
				if(frameAnimationChkNum >= 2 ) digitalBookView();
			}
		});
	});
}

function digitalBookView()
{
	$("#wrap").attr("page", $.bookUtils.pageChk( bookData.curPage ) );
	$("#wrap #middle").css({"visibility":"visible","opacity":"1"});
	pageAccessibilitySetting();
	setPageEvent();

	$(".essence-btn").addClass("on");
	$(".essence-btn").each(function(i){
		var pageNum = $(this).parent().find(".s_reader-num").text();

		var id = uniqId+"-"+pageNum+"-"+$(this).attr("data-essence");
		var essenceId = "kifse-2021-01-essence";

		var data = localStorage.getItem(id);
		if(!data) $(this).removeClass("on");

		var popName = $(this).parent().find(".popup_view[data-popup-name='"+$(this).attr("data-essence")+"']").find(".popup_box:first-child .popup_title").text();
		var arr = new Array();
		var data2 = JSON.parse( localStorage.getItem(essenceId) );
		arr = data2;
		if( arr == null ) arr = new Array();
		if( arr.length <= 0) localStorage.removeItem(essenceId);


		$(this).off("click").on("click",function(){
			if( $(this).hasClass("on") )
			{
				$(this).removeClass("on");
				localStorage.removeItem(id);

				var delStr = bookId+"*"+unitId+"*"+pageNum+"*"+$(this).attr("data-essence")+"*"+popName;

				var arr = new Array();
				var data2 = JSON.parse( localStorage.getItem(essenceId) );
				arr = data2;
				if(arr)
				{
					var index = arr.indexOf(delStr);
					if(index >= 0 )
					{
						arr.splice(index,1);
						localStorage.setItem(essenceId, JSON.stringify(arr));
						if( arr.length <= 0) localStorage.removeItem(essenceId);
					}
				}

				var length = localStorage.getItem("kifse-2021-01-essence-saveNum");
				if(length)
				{
					for(var i = 1; i<=Number(length); i++ )
					{
						var folder = localStorage.getItem("kifse-2021-01-essence-folder-" + i+"/data");
						if(folder)
						{
							var arr = new Array();
							var data2 = JSON.parse( folder );
							if(data2)
							{
								arr = data2;
								var index = arr.indexOf(delStr);
								if(index >= 0 )
								{
									arr.splice(index,1);
									localStorage.setItem("kifse-2021-01-essence-folder-" + i+"/data", JSON.stringify(arr));
									if( arr.length <= 0) localStorage.removeItem("kifse-2021-01-essence-folder-" + i+"/data");
								}
							}
						}
					}
				}
			}
			else
			{
				$(this).removeClass("on").addClass("on");
				localStorage.setItem(id, "root");

				var arr = new Array();
				var data2 = JSON.parse( localStorage.getItem(essenceId) );
				if(data2) arr = data2;
				arr.push( bookId+"*"+unitId+"*"+pageNum+"*"+$(this).attr("data-essence")+"*"+popName );
				localStorage.setItem(essenceId, JSON.stringify(arr));


			}
		})
	})

	var tempBool = false;
	$(".s_reader-num").each(function(){
		var txt = $(this).attr("title");
		if( txt.indexOf("페이지 페이지") > 0 )
		{
			tempBool = true;
		}
	})
	if(tempBool )
	{
		bookLoaer.pageLoad(bookData.curPage);
	}
}



function dp2lp( $dp )
{
	if(windowRatio== undefined) return $dp;
	return ( $dp / windowRatio );
}
function dp2lw( $dp )
{
	if(windowRatio== undefined) return $dp;
	return ( $dp * windowRatio );
}
