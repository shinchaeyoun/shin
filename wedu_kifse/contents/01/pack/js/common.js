var isPorting = false;
var version = "31.8"
var mediaServer = "https://www.nise.go.kr/2021_digitalbook/01/";
var uniqId = "kifse-2021-01-pack";
var uniqId2 = "kifse-2021-01-";
var bookIds =
[
	"01_01_01",
	"01_02_01",
	"02_01_01",
	"02_02_01",
	"03_01_01",
	"03_02_01",
	"04_01_01",
	"04_02_01",
	"05_01_01",
	"05_02_01",
	"06_01_01",
	"06_02_01",
	"07_01_01",
	"07_02_01",
	"08_01_01",
	"08_01_02",
	"08_02_01",
	"09_01_01",
	"09_01_02",
	"09_02_01",
	"10_01_01",
	"10_02_01",
	"11_01_01",
	"11_02_01",
	"12_01_01",
	"12_02_01",
	"13_01_01",
	"13_02_01",
	"14_01_01",
	"14_02_01",
	"14_03_01",
	"14_04_01",

	"15_01_01",
	"15_01_02",
	"15_02_01",
	"15_02_02",
	"16_01_01",
	"16_01_02",
	"16_02_01",
	"16_02_02"
]
var unitData = new Array();
unitData[1]=[1,2,3,4,5,6];
unitData[2]=[1,2,3,4,5,6,7];
unitData[3]=[1,2,3,4,5,6];
unitData[4]=[1,2,3,4,5,6];
unitData[5]=[1,2,3,4,5,6];
unitData[6]=[1,2,3,4,5,6];
unitData[7]=[1,2,3,4,5,6];
unitData[8]=[1,2,3,4,5,6];
unitData[9]=[1,2,3,4,5,6];
unitData[10]=[1,2,3,4,5,6];
unitData[11]=[1,2,3,4,5,6,7,8];
unitData[12]=[1,2,3,4,5,6,7,8];
unitData[13]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
unitData[14]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
unitData[15]=[1,2,3,4,5,6,7,8];
unitData[16]=[1,2,3,4,5,6,7,8];
unitData[17]=[1,2,3,4,5,6,7,8];
unitData[18]=[1,2,3,4,5,6,7,8,9];
unitData[19]=[1,2,3,4,5,6,7,8,9];
unitData[20]=[1,2,3,4,5,6,7];
unitData[21]=[1,2,3,4,5,6,7,8];
unitData[22]=[1,2,3,4,5,6,7,8];
unitData[23]=[1,2,3,4,5,6,7,8];
unitData[24]=[1,2,3,4,5,6,7,8];
unitData[25]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
unitData[26]=[1,2,3,4,5,6,7,8,9,10,11,12,13];
unitData[27]=[1,2,3,4,5,6,7,8,9,10,11,12,13];
unitData[28]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
unitData[29]=[1,2];
unitData[30]=[1,2,3,4];
unitData[31]=[1,2,3,4];
unitData[32]=[1,2,3,4];

unitData[33]=[1,2,3,4,5,6];
unitData[34]=[1,2,3,4,5,6];
unitData[35]=[1,2,3,4,5,6];
unitData[36]=[1,2,3,4,5];
unitData[37]=[1,2,3,4,5,6];
unitData[38]=[1,2,3,4,5,6];
unitData[39]=[1,2,3,4,5,6];
unitData[40]=[1,2,3,4,5,6];

var listName =
[
	"초등 창의적 체험활동<br>(자율활동, 동아리활동)",
    "초등 창의적 체험활동<br>(봉사활동, 진로활동)",
	"중등 국어",
    "고등 국어",
	"초등 사회",
	"중등 사회",
	"고등 사회",
	"초등 과학",
	"중등 과학",
	"고등 과학",
	"중·고등 창의적 체험활동<br>(자율활동, 동아리활동,<br>봉사활동, 진로활동)",
	"중학교 진로와직업",
	"고등학교 진로와직업",
]
var activeTxt =
[
	"그리기",
	"선긋기",
	"선택하기",
	"쓰기",
	"옮기기",
	"키패드/키보드 쓰기",
	"실험하기",
	"탐색하기",
	"사다리 타기",
	"관찬할기",
	"학습 더하기"
]



var packData = new Array();
var packDataLoadChk;
var packDataLoadList = new Array();
var packDataArr = new Array();

var windowRatio = 1;
var saveNum = 0;
var bookData;

var dragObj;
var dropObj;

var printId = "";
var moveTarget = "";

var printLayOut = [2,4,6,8];
var printLayOutDefulat = 1;
var printLayOutData;
var _saveNum;

function initialize()
{
	if(!isPorting) mediaServer = "./";
	resizeEvent();
	bookData = new Object();
	bookData.curPage = 1;
	bookData.maxPage = 1;

	packDataLoadChk = 0;
	for(var i = 1; i<unitData.length; i++)
	{
		for(var j = 0; j<unitData[i].length; j++)
		{
			packDataLoadList.push( "./"+bookIds[i-1]+"/data/"+"bookdata"+unitData[i][j]+".js" );
		}
	}

	getDataLoader();
}

function creaetRoot()
{
	$("#root *").remove();

	var tag = '<div id="pack" class="root">';
	tag +=		 '<div class="pack-btns">';
	tag +=			'<button class="creat-folder-btn"></button>';
	tag +=			'<button class="del-folder-btn"></button>';
	tag +=			'<button class="list-up-btn"></button>';
	tag +=			'<button class="list-down-btn"></button>';
	tag +=			'<button class="chk-reset-btn"></button>';
	tag +=			'<button class="guide-down-btn"></button>';
	tag +=		'</div>';
	tag +=		 '<div id="root-scroll">';
	tag +=			'<ul id="root-folder">';
	tag	+=			'</ul>';
	tag +=		'</div>';
	tag	+=	'</div>';

	$("#root").append(tag);
	$("#root").show();


	$("#root-scroll").mCustomScrollbar({
		scrollInertia : 1,
		theme:"dark"
	});

	$(".root .creat-folder-btn").off("click").on("click",function(){
		++saveNum;
		localStorage.setItem(uniqId+"-saveNum", saveNum);
		createFolder(saveNum);
	})
	$(".root .del-folder-btn").off("click").on("click",function(){
		delRootData();
	})
	$(".root .chk-reset-btn").off("click").on("click",function(){
		delRootResetData();
	})
	$(".root .list-up-btn").off("click").on("click",function(){
		var _this = $("#root-folder > li > .checkBox.on");
		_this = _this.parent();

		var index = $("#root-folder > li").index( _this );
		if( index > 0 )
		{
			_this.insertBefore( $("#root-folder > li:eq("+(index-1)+")") );
		}


		var arr = new Array();
		$("#root-folder li").each(function(){
			var num = $(this).attr("id").split("Folder-")[1];
			arr.push( "kifse-2021-01-pack-folder-" + num );
		})
		localStorage.setItem(uniqId+"-folder-list", JSON.stringify(arr) );
	})
	$(".root .list-down-btn").off("click").on("click",function(){
		var _this = $("#root-folder > li > .checkBox.on");
		_this = _this.parent();

		var index = $("#root-folder > li").index( _this );
		_this.insertAfter( $("#root-folder > li:eq("+(index+1)+")") );

		var arr = new Array();
		$("#root-folder li").each(function(){
			var num = $(this).attr("id").split("Folder-")[1];
			arr.push( "kifse-2021-01-pack-folder-" + num );
		})
		localStorage.setItem(uniqId+"-folder-list", JSON.stringify(arr) );
	})

	$(".guide-down-btn").off("click").on("click",function(){
		guideDownEvent();
	})



	var data = localStorage.getItem(uniqId+"-folder-list");
	if(data)
	{
		var loadData = JSON.parse(data);
		for(var i = 0; i<loadData.length; i++)
		{
			var folder = localStorage.getItem( loadData[i] );
			if( folder && "kifse-2021-01-pack-folder-undefined" != loadData[i] )
			{
				var num = loadData[i].split("kifse-2021-01-pack-folder-")[1];
				createFolder(num);
			}
		}

	}
	else
	{
		for(var i = 1; i<=saveNum; i++)
		{
			var folder = localStorage.getItem(uniqId+"-folder-"+i);
			if( folder )
			{
				createFolder(i);
			}
		}
	}
}
function createFolder($saveNum)
{
	var name = localStorage.getItem(uniqId+"-folder-"+$saveNum);
	if(!name) name = "학습꾸러미명";
	$("#root #root-folder").append('<li id="Folder-'+$saveNum+'"><div class="checkBox"></div><div class="forder-icon"></div><input class="folder-name" type="text" placeholder="'+name+'" readonly="readonly"><div class="btn-rename"></div></li>');
	localStorage.setItem(uniqId+"-folder-"+$saveNum, name);

	var arr = new Array();
	var data = localStorage.getItem(uniqId+"-folder-"+$saveNum+"/data");
	if(!data) localStorage.setItem(uniqId+"-folder-"+$saveNum+"/data", arr);

	var arr = new Array();
	$("#root-folder li").each(function(){
		var num = $(this).attr("id").split("Folder-")[1];
		arr.push( "kifse-2021-01-pack-folder-" + num );
	})
	localStorage.setItem(uniqId+"-folder-list", JSON.stringify(arr) );


	$("#Folder-"+$saveNum+" .btn-rename").off("click").on("click",function(){
		if( $(this).hasClass("on") )
		{
			$(this).removeClass("on");
			$(this).parent().removeClass("on");
			$(this).parent().find("input").removeAttr("readonly").attr("readonly", "readonly");
		}
		else
		{
			$(this).removeClass("on").addClass("on");
			$(this).parent().removeClass("on").addClass("on");
			$(this).parent().find("input").removeAttr("readonly");
		}
	})

	$("#Folder-"+$saveNum+" input").change(function(){
		var txt = $(this).val();
		localStorage.setItem(uniqId+"-folder-"+$saveNum, txt);
	});

	$("#Folder-"+$saveNum+" input").off("click").on("click",function(){
		if( $(this).attr("readonly") )
		{
			printId = "kifse-2021-01-pack-folder-"+$saveNum+"/data";
			printLayOutData = printLayOutDefulat;
			$("#root > *").remove();
			$("#root").hide();
			_saveNum = $saveNum;
			creaetSubPage($saveNum);
		}
		else
		{

		}
	})

	$("#root .checkBox").off("click").on("click",function(){
		$(this).parent().parent().find(".checkBox").removeClass("on");
		$(this).removeClass("on").addClass("on");
	})
}

function delRootData()
{
	$("#pack .checkBox.on").each(function(){
		var num = $(this).parent().attr("id").split("Folder-")[1];

		localStorage.removeItem(uniqId+"-folder-"+num);
		localStorage.removeItem(uniqId+"-folder-"+num+"/data");
		localStorage.removeItem(uniqId+"-folder-"+num+"/data"+"/layout");

		var arr2_title = new Array();
		var data_title = localStorage.getItem(uniqId+"-folder-"+num+"/data"+"/title");
		if(data_title) arr2_title = JSON.parse(data_title);
		for(var i = 0; i<arr2_title.length;i++)
		{
			localStorage.removeItem(arr2_title[i]);
		}

		localStorage.removeItem(uniqId+"-folder-"+num+"/data"+"/title");
		$(this).parent().remove();
	})

	var arr = new Array();
	$("#root-folder li").each(function(){
		var num = $(this).attr("id").split("Folder-")[1];
		arr.push( "kifse-2021-01-pack-folder-" + num );
	})
	localStorage.setItem(uniqId+"-folder-list", JSON.stringify(arr) );
}

function delRootResetData()
{
	$("#pack .checkBox.on").each(function(){
		var num = $(this).parent().attr("id").split("Folder-")[1];
		localStorage.removeItem(uniqId+"-folder-"+num+"/data");
		localStorage.removeItem(uniqId+"-folder-"+num+"/data"+"/layout");
		localStorage.removeItem(uniqId+"-folder-"+num+"/data"+"/title");
	})

	var arr = new Array();
	$("#root-folder li").each(function(){
		var num = $(this).attr("id").split("Folder-")[1];
		arr.push( "kifse-2021-01-pack-folder-" + num );
	})
	localStorage.setItem(uniqId+"-folder-list", JSON.stringify(arr) );
}

function creaetSubPage($num)
{
	moveTarget = "";
	$("#print-page").show();
	var tag = '';
	tag += '<div id="close-btn"></div>';
	tag += '<div id="list-id" class="list-box-main"><p>과목</p></div>';
	tag += '<div id="list-unit" class="list-box-main"><p>단원</p></div>';
	tag += '<div id="list-children" class="list-box-main"><p>제제 및 소주제</p></div>';
	tag += '<div id="list-name" class="list-box-main"><p>활동명</p></div>';


	tag +=		 '<div id="pack-guide"></div>';
	tag +=		 '<div class="pack-btns">';
	tag +=			'<button class="list-up-btn"></button>';
	tag +=			'<button class="list-down-btn"></button>';
	tag +=			'<button class="del-folder-btn"></button>';
	tag +=			'<button class="pack-print-btn"></button>';
	tag +=			'<button class="pack-zoom-up-btn"></button>';
	tag +=			'<button class="pack-zoom-down-btn"></button>';
	tag +=			'<button class="chk-reset-btn"></button>';
	tag +=			'<button class="layout-change-btn"></button>';
	tag +=			'<button class="title-change-btn"></button>';
	tag +=		'</div>';
	tag +=		 '<div id="plus-btn"></div>';

	$("#list-box").append(tag);
	$("#close-btn").off("click").on("click",function(){
		$("#list-box *").remove();
		$(".pack-box *").remove();
		creaetRoot();
	})

	$("#plus-btn").off("click").on("click",function(){
		var targetID = $("#list-name-sub").attr("data-id");
		if(targetID)
		{
			if( $(".pack-box .print-page").last().find(".page").length < printLayOut[printLayOutData] && $(".pack-box .print-page").length > 0 )
			{
				var mainClone = $("#load-html-box").find("#"+targetID).clone();
				mainClone.find(".popup_box").each(function(i){
					if( i > 0 )
					{
						var num = i;
						if( $(".pack-box .print-page").last().find(".page").length < printLayOut[printLayOutData] && $(".pack-box .print-page").length > 0 )
						{
							var clone =  $("#load-html-box").find("#"+targetID).clone();
							clone.find(".popup_box").hide();
							clone.find(".popup_box").each(function(i){
								if(i==num)
								{
									$(this).css("display","block").show();
									$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@"+num);
									console.log("set data-saveid");
								}

								var txt="";
								if( $(this).find(".popup_title").attr("data-pack-title") )
								{
									txt = $(this).find(".popup_title").attr("data-pack-title");
								}
								else
								{
									txt = $(this).find(".popup_title").text();
									$(this).find(".popup_title").attr("data-pack-title", txt);
								}
								//$(this).find(".popup_title").text("");
								$(this).find(".popup_title").find("textarea").remove();
								$(this).find(".popup_title").append('<textarea readonly="readonly"></textarea>');
								$(this).find(".popup_title textarea").val(txt);

							})
							$(".pack-box .print-page").last().append("<div class='page'></div>");
							$(".pack-box .print-page").last().find(".page").last().append( clone );
						}
						else
						{
							var clone =  $("#load-html-box").find("#"+targetID).clone();

							clone.find(".popup_box").hide();
							clone.find(".popup_box").each(function(i){
								if(i==num)
								{
									$(this).css("display","block").show();
									$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@"+num);
									console.log("set data-saveid");
								}

								var txt="";
								if( $(this).find(".popup_title").attr("data-pack-title") )
								{
									txt = $(this).find(".popup_title").attr("data-pack-title");
								}
								else
								{
									txt = $(this).find(".popup_title").text();
									$(this).find(".popup_title").attr("data-pack-title", txt);
								}
								//$(this).find(".popup_title").text("");
								$(this).find(".popup_title").find("textarea").remove();
								$(this).find(".popup_title").append('<textarea readonly="readonly"></textarea>');
								$(this).find(".popup_title textarea").val(txt);

							})
							$(".pack-box").append('<div class="print-page"></div>');
							$(".pack-box .print-page").last().append("<div class='page'></div>");

							$(".pack-box .print-page").last().find(".page").last().append( clone );
						}
					}
					else
					{
						var newTitle = mainClone.find(".popup_title");
						newTitle.each(function(){

							var txt="";
							if( $(this).attr("data-pack-title") )
							{
								txt = $(this).attr("data-pack-title");
							}
							else
							{
								txt = $(this).text();
								$(this).attr("data-pack-title", txt);
							}

							//$(this).text("");
							$(this).find("textarea").remove();
							$(this).append('<textarea readonly="readonly"></textarea>');
							$(this).find("textarea").val(txt);
						})

						$(".pack-box .print-page").last().append("<div class='page'></div>");
						$(".pack-box .print-page").last().find(".page").last().append( mainClone );
						$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@0");
						console.log("set data-saveid");
					}
				})
			}
			else
			{
				$(".pack-box").append('<div class="print-page"></div>');
				var mainClone = $("#load-html-box").find("#"+targetID).clone();
				mainClone.find(".popup_box").each(function(i){
					if( i > 0 )
					{
						var num = i;
						if( $(".pack-box .print-page").last().find(".page").length < printLayOut[printLayOutData] && $(".pack-box .print-page").length > 0 )
						{
							var clone =  $("#load-html-box").find("#"+targetID).clone();

							clone.find(".popup_box").hide();
							clone.find(".popup_box").each(function(i){
								if(i==num)
								{
									$(this).css("display","block").show();
									$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@"+num);
									console.log("set data-saveid");
								}

								var txt="";
								if( $(this).find(".popup_title").attr("data-pack-title") )
								{
									txt = $(this).find(".popup_title").attr("data-pack-title");
								}
								else
								{
									txt = $(this).find(".popup_title").text();
									$(this).find(".popup_title").attr("data-pack-title", txt);
								}
								//$(this).find(".popup_title").text("");
								$(this).find(".popup_title").find("textarea").remove();
								$(this).find(".popup_title").append('<textarea readonly="readonly"></textarea>');
								$(this).find(".popup_title textarea").val(txt);


							})
							$(".pack-box .print-page").last().append("<div class='page'></div>");
							$(".pack-box .print-page").last().find(".page").last().append( clone );
						}
						else
						{
							var clone =  $("#load-html-box").find("#"+targetID).clone();

							clone.find(".popup_box").hide();
							clone.find(".popup_box").each(function(i){
								if(i==num)
								{
									$(this).css("display","block").show();
									$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@"+num);
									console.log("set data-saveid");
								}

								var txt="";
								if( $(this).find(".popup_title").attr("data-pack-title") )
								{
									txt = $(this).find(".popup_title").attr("data-pack-title");
								}
								else
								{
									txt = $(this).find(".popup_title").text();
									$(this).find(".popup_title").attr("data-pack-title", txt);
								}
								//$(this).find(".popup_title").text("");
								$(this).find(".popup_title").find("textarea").remove();
								$(this).find(".popup_title").append('<textarea readonly="readonly"></textarea>');
								$(this).find(".popup_title textarea").val(txt);

						})
							$(".pack-box").append('<div class="print-page"></div>');
							$(".pack-box .print-page").last().append("<div class='page'></div>");
							$(".pack-box .print-page").last().find(".page").last().append( clone );
						}
					}
					else
					{
						$(".pack-box .print-page").last().append("<div class='page'></div>");

						var newTitle = mainClone.find(".popup_title");
						newTitle.each(function(){

							var txt="";
							if( $(this).attr("data-pack-title") )
							{
								txt = $(this).attr("data-pack-title");
							}
							else
							{
								txt = $(this).text();
								$(this).attr("data-pack-title", txt);
							}

							//$(this).text("");
							$(this).find("textarea").remove();
							$(this).append('<textarea readonly="readonly"></textarea>');
							$(this).find("textarea").val(txt);

						})



						$(".pack-box .print-page").last().find(".page").last().append( mainClone );
						$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@0");
						console.log("set data-saveid");
					}
				})
			}
		}
		else
		{
			alert("활동을 선택한 후 추가버튼을 눌러주세요.")
		}
		var arr = new Array();
		var arr2_title = new Array();
		$(".pack-box .popup_box").each(function(){
			if( $(this).data("saveid") )
			{
				arr.push( $(this).data("saveid") );

				if( !$(this).attr("data-uniqId") )
				{
					$(this).attr("data-uniqId", printId+"/"+$(this).data("saveid")+"/"+(Math.random()*Math.random()) );
				}
				arr2_title.push( $(this).attr("data-uniqId") );
			}
		})

		localStorage.setItem(printId, JSON.stringify(arr) );
		localStorage.setItem(printId+"/layout", printLayOutData );
		localStorage.setItem(printId+"/title", JSON.stringify(arr2_title) );

		$("#print-page").removeClass().addClass("layout-"+printLayOutData);

		$(".popup_view").off("click").on("click",function(){
			$(".popup_view").removeClass("on");
			$(this).addClass("on");
		})

		setPageEvent();
		$(".audio-ex-txt").removeClass("on").addClass("on");
		$(".prev_next_paging_ui_box").hide();
	})
	$("#list-box").append('<div id="list-id-sub" class="list-box-sub"></div>');
	for( var i = 0; i<listName.length; i++ )
	{
		$("#list-id-sub").append('<div class="list-box-sub-list"><p>'+listName[i]+'</p></div>');
	}

	$("#list-id").off("click").on("click",function(){
		$(".list-box-sub").not( $("#list-id-sub") ).hide();

		if( $("#list-id-sub").css("display") == "block")
		{
			$("#list-id-sub").hide();
		}
		else
		{
			$("#list-id-sub").show();
		}
	})
	$("#list-id-sub .list-box-sub-list").off("click").on("click",function(){

		$("#list-unit-sub").remove();
		$("#list-children-sub").remove();
		$("#list-name-sub").remove();

		$(".list-box-sub").hide();
		$("#list-id p").text( $(this).find("p").text()  );
		$("#list-unit p").text("단원");
		$("#list-children p").text("제재 및 소주제");
		$("#list-name p").text("활동명");
		creatUnitSubList( $(this).index() );
	})

	$(".pack-print-btn").off("click").on("click",function(){
		$(".title-change-btn").removeClass("on").addClass("on");
		$(".title-change-btn").trigger("click");
		if( $(".print-page").length > 0 )
		{
			PrintElem( $("#print-contents") );
		}
	})

	var arr = new Array();
	var arr2_title = new Array();

	var data = localStorage.getItem(printId);
	if(data) arr = JSON.parse(data);

	var data_title = localStorage.getItem(printId+"/title");
	if(data_title) arr2_title = JSON.parse(data_title);

	printLayOutData = printLayOutDefulat;
	var data2 = localStorage.getItem(printId+"/layout");
	if(data2) printLayOutData = data2;

	$("#print-page").removeClass().addClass("layout-"+printLayOutData);

	var loadChkNum = 0;
	function htmlLoad()
	{
		var num1 = arr[loadChkNum].split("*")[0];
		var num2 = arr[loadChkNum].split("*")[1];
		var page = arr[loadChkNum].split("*")[2];

		var targetID = packDataArr[num1][num2].id+"-"+packDataArr[num1][num2].unit+"-"+page;

		var bool = true;
		$("#load-html-box").find(".popup_view").each(function(i){
			if( $(this).hasClass(targetID) )
			{
				bool = false;
				$(this).parent().find(".popup_view").each(function(i){
					$(this).attr("data-type" , $(this).find(".popup_box:first-child").data("type") );
					$(this).attr("data-title" , $(this).find(".popup_box:first-child .popup_title").text() );
					//$(this).attr("data-uniqId", (Math.random()*Math.random()));

					$(this).attr("data-id" , num1+"*"+num2+"*"+page+"*"+i );
					$(this).attr("id", targetID+"-"+Number(Number(i)+1));

					$(this).removeClass(targetID).addClass(targetID);
					$(this).find(".click-obj-img").hide();
					$(this).find(".ans-check-btn").hide();
					$(this).find(".ans-preveal-btn").hide();
					$(this).find(".sketch_save_btn").hide();
					$(this).find(".input_save_btn").hide();
					$(this).find(".sketch_save_btn-s").hide();
					$(this).find(".click_save_btn").hide();
					$(this).find(".write_save_btn").hide();
					$(this).find(".write_save_btn-s").hide();

					var activeType = $(this).parent().find("[data-popup-target='"+$(this).attr("data-popup-name")+"']").attr("class");
				})
				$(this).find("> button").hide();
			}
		})

		if(bool)
		{
			var html = "./"+packDataArr[num1][num2].id+"/"+page+".html";
			$("#load-html-box").append('<div class="html-box"></div>');
			var target = $(".html-box").last();
			target.load(html, function(){
				$(this).find("> .s_reader-num").hide();
				$(this).find("> .s_reader-txt").hide();
				$(this).find("> .frame_animation_box").hide();
				$(this).find(".popup_view").each(function(i){
					$(this).find("img").each(function(){
						if ( $(this).attr("alt") )
						{
							//
						}
						else
						{
							$(this).attr("alt", "대체텍스트없음");
						}
						$(this).attr("title", $(this).attr("alt") )
					})

					$(this).attr("data-type" , $(this).find(".popup_box:first-child").data("type") );
					$(this).attr("data-title" , $(this).find(".popup_box:first-child .popup_title").text() );

					$(this).attr("data-id" , num1+"*"+num2+"*"+page+"*"+i );
					$(this).attr("id", targetID+"-"+Number(Number(i)+1));

					$(this).removeClass(targetID).addClass(targetID);
					$(this).find(".click-obj-img").hide();
					$(this).find(".ans-check-btn").hide();
					$(this).find(".ans-preveal-btn").hide();
					$(this).find(".sketch_save_btn").hide();
					$(this).find(".input_save_btn").hide();
					$(this).find(".sketch_save_btn-s").hide();
					$(this).find(".click_save_btn").hide();
					$(this).find(".write_save_btn").hide();
					$(this).find(".write_save_btn-s").hide();

					$(this).find('.popup_box[data-type="video-pop"]').remove();
				})

				$(this).find("> button").hide();


				++loadChkNum;
				if( arr.length > loadChkNum ) htmlLoad();
				else printHtmlLoadComplete();
			})
		}
		else
		{
			++loadChkNum;
			if( arr.length > loadChkNum ) htmlLoad();
			else printHtmlLoadComplete();
		}
	}
	if(arr.length > 0 )
	{
		htmlLoad();
	}

	function printHtmlLoadComplete()
	{
		for( var i = 0; i<arr.length; i++)
		{
			var targetID = arr[i].split("@")[1];
			var targetIndex = arr[i].split("@")[2];


			var uniqId_loadID = "not";
			var uniqId_loadID_txt = "not";
			if(data_title)
			{
				var uniqId_loadID_temp = arr2_title[i];
				if(uniqId_loadID_temp)
				{
					uniqId_loadID = uniqId_loadID_temp;

					var loadTemp = localStorage.getItem( uniqId_loadID );
					if(loadTemp)
					{
						uniqId_loadID_txt = loadTemp;
					}
				}
			}

			if( $(".pack-box .print-page").last().find(".page").length < printLayOut[printLayOutData] && $(".pack-box .print-page").length > 0 )
			{
				var mainClone = $("#load-html-box").find("#"+targetID).clone();
				mainClone.find(".popup_box").hide();
				mainClone.find(".popup_box").eq( targetIndex ).css("display","block").show();
				mainClone.find(".popup_box").eq( targetIndex ).each(function(){
					$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@"+targetIndex);

					var txt = $(this).find(".popup_title").text();
					var temp = Math.random()*Math.random();
					$(this).attr("data-uniqId", printId+"/"+$(this).data("saveid")+"/"+temp);
					$(this).find(".popup_title").attr("data-pack-title", txt);

					if(uniqId_loadID)
					{
						$(this).attr("data-uniqId", uniqId_loadID);

					}
					if(uniqId_loadID_txt != "not")
					{
						txt = uniqId_loadID_txt;
						$(this).find(".popup_title").attr("data-pack-title", uniqId_loadID_txt);

					}
					$(this).find(".popup_title textarea").remove();
					$(this).find(".popup_title").append('<textarea readonly="readonly"></textarea>');
					$(this).find(".popup_title textarea").val(txt);
				})

				$(".pack-box .print-page").last().append("<div class='page'></div>");
				$(".pack-box .print-page").last().find(".page").last().append( mainClone );
			}
			else
			{
				var mainClone = $("#load-html-box").find("#"+targetID).clone();
				mainClone.find(".popup_box").hide();
				mainClone.find(".popup_box").eq( targetIndex ).css("display","block").show();
				mainClone.find(".popup_box").eq( targetIndex ).each(function(){
					$(this).attr("data-saveid", $(this).parent().data("id")+"@"+$(this).parent().attr("id")+"@"+targetIndex);

					var txt = $(this).find(".popup_title").text();
					var temp = Math.random()*Math.random();
					$(this).attr("data-uniqId", printId+"/"+$(this).data("saveid")+"/"+temp);
					$(this).find(".popup_title").attr("data-pack-title", txt);

					if(uniqId_loadID)
					{
						$(this).attr("data-uniqId", uniqId_loadID);

					}
					if(uniqId_loadID_txt != "not")
					{
						txt = uniqId_loadID_txt;
						$(this).find(".popup_title").attr("data-pack-title", uniqId_loadID_txt);

					}
					$(this).find(".popup_title textarea").remove();
					$(this).find(".popup_title").append('<textarea readonly="readonly"></textarea>');
					$(this).find(".popup_title textarea").val(txt);
				})

				$(".pack-box").append('<div class="print-page"></div>');
				$(".pack-box .print-page").last().append("<div class='page'></div>");
				$(".pack-box .print-page").last().find(".page").last().append( mainClone );
			}
		}

		$(".popup_view").off("click").on("click",function(){
			$(".popup_view").removeClass("on");
			$(this).addClass("on");
		})
		setPageEvent();
		$(".audio-ex-txt").removeClass("on").addClass("on");
		$(".prev_next_paging_ui_box").hide();
	}

	$("#print-page .list-up-btn").off("click").on("click",function(){
		moveTarget = null;
		$(".pack-box .popup_view").each(function(){
			if( $(this).hasClass("on"))
			{
				moveTarget = $(this);
			}
		})
		if(moveTarget)
		{
			var targetBox = $(".pack-box .popup_view");
			var index = targetBox.index( moveTarget );
			if( index > 0 )
			{
				var target = targetBox.eq( index - 1);

				var clone1 = moveTarget.clone();
				var clone2 = target.clone();

				var temp1 = moveTarget.parent();
				temp1.find(".popup_view").remove()
				temp1.append( clone2 );

				var temp2 = target.parent();
				temp2.find(".popup_view").remove()
				temp2.append( clone1 );
			}
		}

		$(".popup_view").off("click").on("click",function(){
			$(".popup_view").removeClass("on");
			$(this).addClass("on");
		})

		var arr = new Array();
		var arr2_title = new Array();
		$(".pack-box .popup_box").each(function(){
			if( $(this).data("saveid") )
			{
				arr.push( $(this).data("saveid") );

				if( !$(this).attr("data-uniqId") )
				{
					var temp = Math.random()*Math.random();
					$(this).attr("data-uniqId", printId+"/"+$(this).data("saveid")+"/"+temp);
					console.log(temp);
				}
				arr2_title.push( $(this).attr("data-uniqId") );
			}
		})

		localStorage.setItem(printId, JSON.stringify(arr) );
		localStorage.setItem(printId+"/title", JSON.stringify(arr2_title) );
	})

	$("#print-page .list-down-btn").off("click").on("click",function(){
		moveTarget = null;
		$(".pack-box .popup_view").each(function(){
			if( $(this).hasClass("on"))
			{
				moveTarget = $(this);
			}
		})
		if(moveTarget)
		{
			var targetBox = $(".pack-box .popup_view");
			var index = targetBox.index( moveTarget );
			if( index < (targetBox.length-1) )
			{
				var target = targetBox.eq( index + 1);

				var clone1 = moveTarget.clone();
				var clone2 = target.clone();

				var temp1 = moveTarget.parent();
				temp1.find(".popup_view").remove()
				temp1.append( clone2 );

				var temp2 = target.parent();
				temp2.find(".popup_view").remove()
				temp2.append( clone1 );
			}
		}
		$(".popup_view").off("click").on("click",function(){
			$(".popup_view").removeClass("on");
			$(this).addClass("on");
		})

		var arr = new Array();
		var arr2_title = new Array();
		$(".pack-box .popup_box").each(function(){
			if( $(this).data("saveid") )
			{
				arr.push( $(this).data("saveid") );

				if( !$(this).attr("data-uniqId") )
				{
					var temp = Math.random()*Math.random();
					console.log(temp);
					$(this).attr("data-uniqId", printId+"/"+$(this).data("saveid")+"/"+temp);
				}
				arr2_title.push( $(this).attr("data-uniqId") );
			}
		})

		localStorage.setItem(printId, JSON.stringify(arr) );
		localStorage.setItem(printId+"/title", JSON.stringify(arr2_title) );
	})


	$("#print-page .del-folder-btn").off("click").on("click",function(){
		moveTarget = null;
		$(".pack-box .popup_view").each(function(){
			if( $(this).hasClass("on"))
			{
				moveTarget = $(this);

				$(this).find(".popup_box").each(function(){
					localStorage.removeItem( $(this).attr("data-uniqid") );
				})
			}
		})
		if(moveTarget)
		{
			moveTarget.remove();
		}
		$(".popup_view").off("click").on("click",function(){
			$(".popup_view").removeClass("on");
			$(this).addClass("on");
		})

		var arr = new Array();
		var arr2_title = new Array();
		$(".pack-box .popup_box").each(function(){
			if( $(this).data("saveid") )
			{
				arr.push( $(this).data("saveid") );
				if( !$(this).attr("data-uniqId") )
				{
					$(this).attr("data-uniqId", printId+"/"+$(this).data("saveid")+"/"+(Math.random()*Math.random()) );
				}
				arr2_title.push( $(this).attr("data-uniqId") );
			}
		})

		localStorage.setItem(printId, JSON.stringify(arr) );
		localStorage.setItem(printId+"/title", JSON.stringify(arr2_title) );
		$("#list-box *").remove();
		$(".pack-box *").remove();
		_saveNum = $num;
		creaetSubPage($num);
	})

	$(".pack-box").append('<div class="zoom_overlay"></div>');

	var zoomObj = new setPanZoomPack();
	var zoomOverlay = $(".zoom_overlay");


	$(".pack-zoom-up-btn").off("click").on("click", function(){
		zoomObj.panzoom("enable");
		zoomOverlay.show();
	});

	$(".pack-zoom-down-btn").off("click").on("click", function(){
		zoomOverlay.hide();
		zoomObj.panzoom("reset");
		zoomObj.panzoom("disable");
		$(".pack-box").css("transform","none");
	});

	$(".chk-reset-btn").off("click").on("click", function(){
		moveTarget = null;
		$(".pack-box .popup_view").each(function(){
			moveTarget = $(this);

			moveTarget.remove();
		})
		$(".popup_view").off("click").on("click",function(){
			$(".popup_view").removeClass("on");
			$(this).addClass("on");
		})

		var arr = new Array();
		$(".pack-box .popup_box").each(function(){
			localStorage.removeItem( $(this).attr("data-uniqid") );

			/*if( $(this).data("saveid") )
			{
				arr.push( $(this).data("saveid") );

				if( !$(this).attr("data-uniqId") )
				{
					$(this).attr("data-uniqId", printId+"/"+$(this).data("saveid")+"/"+(Math.random()*Math.random()) );
				}
				arr2_title.push( $(this).attr("data-uniqId") );
			}*/
		})

		localStorage.removeItem(printId);
		localStorage.removeItem(printId+"/layout");
		localStorage.removeItem(printId+"/title" );
		$("#list-box *").remove();
		$(".pack-box *").remove();
		_saveNum = $num;
		creaetSubPage($num);
	})

	$(".layout-change-btn").off("click").on("click", function(){
		++printLayOutData;
		if( printLayOutData >= printLayOut.length )
		{
			printLayOutData = 0;
		}
		localStorage.setItem(printId+"/layout", printLayOutData );

		$("#list-box *").remove();
		$(".pack-box *").remove();
		$("#print-page").removeClass().addClass("layout-"+printLayOutData);
		creaetSubPage(_saveNum);
	})


	$(".title-change-btn").off("click").on("click", function(){
		if( $(this).hasClass("on") )
		{
			$(this).removeClass("on");
			$(".popup_title textarea").attr("readonly","readonly");
			$(".popup_title textarea").removeClass("on")
			$(".popup_title textarea").off("change keyup keydown");
		}
		else
		{
			$(this).removeClass("on").addClass("on");
			$(".popup_title textarea").removeAttr("readonly");
			$(".popup_title textarea").removeClass("on").addClass("on");
			$(".popup_title textarea").off("change");
			$(".popup_title textarea").off("change").change(function(){
				var txt = $(this).val();
				$(this).parent().attr("data-pack-title", txt);
				titleAreaSave( $(this) );
			});
			$(".popup_title textarea").off("keyup").on("keyup",function(){
				var txt = $(this).val();
				$(this).parent().attr("data-pack-title", txt);
				titleAreaSave( $(this) );
			});
			$(".popup_title textarea").off("keydown").on("keydown",function(){
				var txt = $(this).val();
				$(this).parent().attr("data-pack-title", txt);
				titleAreaSave( $(this) );
			});
		}
	})
}
function titleAreaSave( $area )
{
	var _thisArea = $area;
	var _p = _thisArea.parent().parent().parent();
	var _saveid = _p.attr("data-uniqid");

	localStorage.setItem(_saveid, _thisArea.val() );
}

function creatUnitSubList( $num )
{
	$("#list-unit-sub").remove();

	$("#list-unit").off("click").on("click",function(){
		$(".list-box-sub").not( $("#list-unit-sub") ).hide();

		if( $("#list-unit-sub").css("display") == "block")
		{
			$("#list-unit-sub").hide();
		}
		else
		{
			$("#list-unit-sub").show();
		}
	})

	$("#list-box").append('<div id="list-unit-sub" class="list-box-sub"></div>');

	for(var i = 0; i<packDataArr[$num].length; i++)
	{
		var txt = packDataArr[$num][i].listDB.title;

		$("#list-unit-sub").append('<div class="list-box-sub-list" data-num1="'+$num+'" data-num2="'+i+'"><p>'+txt+'</p></div>');
	}

	$("#list-unit-sub .list-box-sub-list").off("click").on("click",function(){
		$("#list-children-sub").remove();
		$("#list-name-sub").remove();

		$(".list-box-sub").hide();
		$("#list-unit p").text( $(this).find("p").text()  );

		$("#list-children p").text("제재 및 소주제");
		$("#list-name p").text("활동명");

		creatChildrenSubList( $(this).data("num1"), $(this).data("num2"));
	})

	$("#list-unit-sub").mCustomScrollbar({
		scrollInertia : 1,
		theme:"dark"
	});
}

function creatChildrenSubList($num1, $num2)
{
	$("#list-children-sub").remove();

	$("#list-children").off("click").on("click",function(){
		$(".list-box-sub").not( $("#list-children-sub") ).hide();

		if( $("#list-children-sub").css("display") == "block")
		{
			$("#list-children-sub").hide();
		}
		else
		{
			$("#list-children-sub").show();
		}
	})

	$("#list-box").append('<div id="list-children-sub" class="list-box-sub"></div>');

	var thisTit = packDataArr[$num1][$num2].listDB;
	for(var i = 0; i<thisTit.children.length-1; i++)
	{
		var txt = thisTit.children[i].title;

		if(thisTit.children[i].children)
		{
			$("#list-children-sub").append('<div class="list-box-sub-list not-click" data-page="'+thisTit.children[i].page+'"><p>'+txt+'</p></div>');
			for(var j=0; j<thisTit.children[i].children.length; j++)
			{
				var temp = thisTit.children[i].children[j].title;

				temp = temp.replace("<span style='display:inline-block; color:red; transform: rotate(-90deg);'>&#60;</span>", "쐐기");
				temp = temp.replace("<span style='display:inline-block; color:red;transform: rotate(-90deg);'>&#171;</span>", "겹쐐기");


				if(thisTit.children[i].children[j].page == thisTit.children[i].page)
				{
					$("#list-children-sub").append('<div class="list-box-sub-list not-click" data-page="'+thisTit.children[i].children[j].page+'"><p>'+temp+'</p></div>');
				}
				else
				{
					$("#list-children-sub").append('<div class="list-box-sub-list" data-page="'+thisTit.children[i].children[j].page+'"><p>'+temp+'</p></div>');
				}
			}
		}
		else
		{
			if( txt.split("단계 학습평가").length > 1)
			{
				$("#list-children-sub").append('<div class="list-box-sub-list" data-page="'+thisTit.children[i].page+'"><p>'+txt+'</p></div>');
				//$("#list-children-sub").append('<div class="list-box-sub-list" data-page="'+Number(thisTit.children[i].page+1)+'"><p>'+txt+'</p></div>');
			}
			else
			{
				$("#list-children-sub").append('<div class="list-box-sub-list" data-page="'+thisTit.children[i].page+'"><p>'+txt+'</p></div>');
			}
		}
	}

	$("#list-children-sub .list-box-sub-list").not(".not-click").off("click").on("click",function(){
		$("#list-name-sub").remove();

		$(".list-box-sub").hide();
		$("#list-children p").text( $(this).find("p").text()  );

		$("#list-name p").text("활동명");

		creatNameSubList( $num1, $num2, $(this).data("page") );
	})

	$("#list-children-sub").mCustomScrollbar({
		scrollInertia : 1,
		theme:"dark"
	});
}

function creatNameSubList($num1, $num2, $page)
{
	var activeArr = new Array();
	var titleArr = new Array();
	var idArr = new Array();

	var targetID = packDataArr[$num1][$num2].id+"-"+packDataArr[$num1][$num2].unit+"-"+$page

	var bool = true;
	$("#load-html-box").find(".popup_view").each(function(i){
		if( $(this).hasClass(targetID) )
		{
			bool = false;
			$(this).parent().find(".popup_view").each(function(i){
				$(this).attr("data-type" , $(this).find(".popup_box:first-child").data("type") );
				$(this).attr("data-title" , $(this).find(".popup_box:first-child .popup_title").text() );
				$(this).attr("data-id" , $num1+"*"+$num2+"*"+$page+"*"+i );
				$(this).attr("id", targetID+"-"+Number(Number(i)+1));

				$(this).removeClass(targetID).addClass(targetID);
				$(this).find(".click-obj-img").hide();
				$(this).find(".ans-check-btn").hide();
				$(this).find(".ans-preveal-btn").hide();
				$(this).find(".sketch_save_btn").hide();
				$(this).find(".input_save_btn").hide();
				$(this).find(".sketch_save_btn-s").hide();
				$(this).find(".click_save_btn").hide();
				$(this).find(".write_save_btn").hide();
				$(this).find(".write_save_btn-s").hide();

				var activeType = $(this).parent().find("[data-popup-target='"+$(this).attr("data-popup-name")+"']").attr("class");

				if( activeType == "drag-drop-btn" )
				{
					var index = activeArr.indexOf("옮기기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("옮기기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "draw-line-btn" )
				{
					var index = activeArr.indexOf("선긋기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("선긋기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "draw-btn" )
				{
					var index = activeArr.indexOf("그리기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("그리기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "write-btn" )
				{
					var index = activeArr.indexOf("쓰기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("쓰기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "click-ans-btn" )
				{
					var index = activeArr.indexOf("선택하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("선택하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "keypad-btn" )
				{
					var index = activeArr.indexOf("키패드/키보드 쓰기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("키패드/키보드 쓰기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "do-btn" )
				{
					var index = activeArr.indexOf("실험하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("실험하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
					$(this).find('.popup_box[data-type="video-pop"]').remove();
				}
				else if( activeType == "search-page-pop-btn" )
				{
					var index = activeArr.indexOf("탐색하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("탐색하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "search-page-pop-btn2" )
				{
					var index = activeArr.indexOf("탐색하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("탐색하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "ladder-btn" )
				{
					var index = activeArr.indexOf("사다리 타기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("사다리 타기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "watch-btn" )
				{
					var index = activeArr.indexOf("관찬할기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("관찬할기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "con-plus-btn" )
				{
					var index = activeArr.indexOf("학습 더하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("학습 더하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
			})

			if( activeArr.length <= 0 )
			{
				alert("인쇄 가능한 활동이 없습니다.");
			}
			$(this).find("> button").hide();

			$("#list-name-sub").remove();

			$("#list-name").off("click").on("click",function(){
				$(".list-box-sub").not( $("#list-name-sub") ).hide();
				if( $("#list-name-sub").css("display") == "block")
				{
					$("#list-name-sub").hide();
				}
				else
				{
					$("#list-name-sub").show();
				}
			})
			$("#list-box").append('<div id="list-name-sub" class="list-box-sub"></div>');

			for( var i = 0; i<titleArr.length; i++)
			{
				$("#list-name-sub").append('<div class="list-box-sub-list"><p>'+titleArr[i]+'</p></div>');
			}

			$("#list-name-sub .list-box-sub-list").off("click").on("click",function(){
				$(".list-box-sub").hide();
				$("#list-name p").text( $(this).find("p").text()  );
				$("#list-name-sub").attr("data-id", idArr[ $(this).index() ]);
			})
		}
	})

	if(bool)
	{
		var html = "./"+packDataArr[$num1][$num2].id+"/"+$page+".html";

		$("#load-html-box").append('<div class="html-box"></div>');
		var target = $(".html-box").last();
		target.load(html, function(){
			$(this).find("> .s_reader-num").hide();
			$(this).find("> .s_reader-txt").hide();
			$(this).find("> .frame_animation_box").hide();
			$(this).find(".popup_view").each(function(i){
				$(this).find("img").each(function(){
					if ( $(this).attr("alt") )
					{
						//
					}
					else
					{
						$(this).attr("alt", "대체텍스트없음");
					}
					$(this).attr("title", $(this).attr("alt") )
				})

				$(this).attr("data-type" , $(this).find(".popup_box:first-child").data("type") );
				$(this).attr("data-title" , $(this).find(".popup_box:first-child .popup_title").text() );

				$(this).attr("data-id" , $num1+"*"+$num2+"*"+$page+"*"+i );
				$(this).attr("id", targetID+"-"+Number(Number(i)+1));
				$(this).removeClass(targetID).addClass(targetID);
				$(this).find(".click-obj-img").hide();
				$(this).find(".ans-check-btn").hide();
				$(this).find(".ans-preveal-btn").hide();
				$(this).find(".sketch_save_btn").hide();
				$(this).find(".input_save_btn").hide();
				$(this).find(".sketch_save_btn-s").hide();
				$(this).find(".click_save_btn").hide();
				$(this).find(".write_save_btn").hide();
				$(this).find(".write_save_btn-s").hide();

				var activeType = $(this).parent().find("[data-popup-target='"+$(this).attr("data-popup-name")+"']").attr("class");

				if( activeType == "drag-drop-btn" )
				{
					var index = activeArr.indexOf("옮기기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("옮기기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "draw-line-btn" )
				{
					var index = activeArr.indexOf("선긋기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("선긋기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "draw-btn" )
				{
					var index = activeArr.indexOf("그리기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("그리기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "write-btn" )
				{
					var index = activeArr.indexOf("쓰기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("쓰기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "click-ans-btn" )
				{
					var index = activeArr.indexOf("선택하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("선택하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "keypad-btn" )
				{
					var index = activeArr.indexOf("키패드/키보드 쓰기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("키패드/키보드 쓰기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "do-btn" )
				{
					var index = activeArr.indexOf("실험하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("실험하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
					$(this).find('.popup_box[data-type="video-pop"]').remove();
				}
				else if( activeType == "search-page-pop-btn" )
				{
					var index = activeArr.indexOf("탐색하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("탐색하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "search-page-pop-btn2" )
				{
					var index = activeArr.indexOf("탐색하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("탐색하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "ladder-btn" )
				{
					var index = activeArr.indexOf("사다리 타기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("사다리 타기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "watch-btn" )
				{
					var index = activeArr.indexOf("관찬할기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("관찬할기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "con-plus-btn" )
				{
					var index = activeArr.indexOf("학습 더하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("학습 더하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
				else if( activeType == "check-btn" )
				{
					var index = activeArr.indexOf("체크하기");
					if(index >= 0 )
					{
						activeArr.splice(index,1);
						titleArr.splice(index,1);
					}
					activeArr.push("체크하기");
					titleArr.push( $(this).attr( "data-title") );
					idArr.push( $(this).attr("id") );
				}
			})

			if( activeArr.length <= 0 )
			{
				alert("인쇄 가능한 활동이 없습니다.");
			}
			$(this).find("> button").hide();

			$("#list-name-sub").remove();

			$("#list-name").off("click").on("click",function(){
				$(".list-box-sub").not( $("#list-name-sub") ).hide();
				if( $("#list-name-sub").css("display") == "block")
				{
					$("#list-name-sub").hide();
				}
				else
				{
					$("#list-name-sub").show();
				}
			})
			$("#list-box").append('<div id="list-name-sub" class="list-box-sub"></div>');

			for( var i = 0; i<titleArr.length; i++)
			{
				$("#list-name-sub").append('<div class="list-box-sub-list"><p>'+titleArr[i]+'</p></div>');
			}

			$("#list-name-sub .list-box-sub-list").off("click").on("click",function(){
				$(".list-box-sub").hide();
				$("#list-name p").text( $(this).find("p").text()  );
				$("#list-name-sub").attr("data-id", idArr[ $(this).index() ] );
			})
		})
	}
}

function getDataLoader()
{
	var script = document.createElement('script');
	script.src = packDataLoadList[packDataLoadChk]+"?"+version+Math.random();
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

			var num = packDataLoadList[packDataLoadChk].split("bookdata")[1].split(".js")[0];
			var data = eval("unit"+num+"Data");
			var id = packDataLoadList[packDataLoadChk].split("/data/")[0].split("./")[1]
			var unit = num;
			data.id = id;
			data.unit = unit;
			if( id == "02_02_01" )
			{
				data.newUnit = (Number(unit)+6);
			}
			else if( id == "03_01_01" )
			{
				data.newUnit = (Number(unit)+12);
			}
			else if( id == "03_02_01" )
			{
				data.newUnit = (Number(unit)+19);
			}
			else if( id == "04_02_01" )
			{
				data.newUnit = (Number(unit)+6);
			}
			else if( id == "05_01_01" )
			{
				data.newUnit = (Number(unit)+12);
			}
			else if( id == "05_02_01" )
			{
				data.newUnit = (Number(unit)+19);
			}
			else if( id == "15_01_02" )
			{
				data.newUnit = (Number(unit)+6);
			}
			else if( id == "15_02_02" )
			{
				data.newUnit = (Number(unit)+6);
			}
			else if( id == "16_01_02" )
			{
				data.newUnit = (Number(unit)+6);
			}
			else if( id == "16_02_02" )
			{
				data.newUnit = (Number(unit)+6);
			}
			else
			{
				data.newUnit = Number(unit);
			}
			packData.push( data  );
			++packDataLoadChk;

			linkLoadComplet();
		}
	};
	document.getElementsByTagName( "head" )[0].appendChild(script);

	function linkLoadComplet()
	{

		if( packDataLoadChk < packDataLoadList.length )  getDataLoader();
		else dataLoadComplte();
	}
}

function dataLoadComplte()
{
	for(var i = 0; i<listName.length; i++)
	{
		packDataArr[i] = new Array();
	}
	for(var i = 0; i<packData.length; i++)
	{
		if( packData[i].id == "01_01_01" )
		{
			packData[i].name = listName[0];
			packDataArr[0].push( packData[i] )
		}
		else if( packData[i].id == "01_02_01" )
		{
			packData[i].name = listName[1];
			packDataArr[1].push( packData[i] )
		}
		else if( packData[i].id == "02_01_01" || packData[i].id == "02_02_01" || packData[i].id == "03_01_01" || packData[i].id == "03_02_01")
		{
			packData[i].name = listName[2];
			packDataArr[2].push( packData[i] )
		}
		else if( packData[i].id == "04_01_01" || packData[i].id == "04_02_01" || packData[i].id == "05_01_01" || packData[i].id == "05_02_01" )
		{
			packData[i].name = listName[3];
			packDataArr[3].push( packData[i] )
		}
		else if( packData[i].id == "06_01_01" || packData[i].id == "06_02_01" || packData[i].id == "07_01_01" || packData[i].id == "07_02_01")
		{
			packData[i].name = listName[4];
			packDataArr[4].push( packData[i] )
		}
		else if( packData[i].id == "08_01_01" || packData[i].id == "08_01_02" || packData[i].id == "08_02_01")
		{
			packData[i].name = listName[5];
			packDataArr[5].push( packData[i] )
		}
		else if( packData[i].id == "09_01_01" || packData[i].id == "09_01_02" || packData[i].id == "09_02_01")
		{
			packData[i].name = listName[6];
			packDataArr[6].push( packData[i] )
		}
		else if( packData[i].id == "10_01_01" || packData[i].id == "10_02_01" || packData[i].id == "11_01_01" || packData[i].id == "11_02_01")
		{
			packData[i].name = listName[7];
			packDataArr[7].push( packData[i] )
		}
		else if( packData[i].id == "12_01_01" || packData[i].id == "12_02_01")
		{
			packData[i].name = listName[8];
			packDataArr[8].push( packData[i] )
		}
		else if( packData[i].id == "13_01_01" || packData[i].id == "13_02_01")
		{
			packData[i].name = listName[9];
			packDataArr[9].push( packData[i] )
		}
		else if( packData[i].id == "14_01_01" || packData[i].id == "14_02_01" || packData[i].id == "14_03_01" || packData[i].id == "14_04_01")
		{
			packData[i].name = listName[10];
			packDataArr[10].push( packData[i] )
		}
		else if( packData[i].id == "15_01_01" || packData[i].id == "15_01_02" || packData[i].id == "15_02_01" || packData[i].id == "15_02_02")
		{
			packData[i].name = listName[11];
			packDataArr[11].push( packData[i] )
		}
		else if( packData[i].id == "16_01_01" || packData[i].id == "16_01_02" || packData[i].id == "16_02_01" || packData[i].id == "16_02_02")
		{
			packData[i].name = listName[12];
			packDataArr[12].push( packData[i] )
		}
	}
	for(var i = 0; i<packDataArr.length; i++)
	{
		for(var j = 0; j<packDataArr[i].length; j++)
		{
			var thisTit = packDataArr[i][j].listDB;
			var arr  = JSON.parse(JSON.stringify(packDataArr[i][j].listDB));
			var num = thisTit.children.length;
			var plusNum = 1;
			for(var k = 0; k<num-1; k++)
			{
				var txt = thisTit.children[k].title;
				if( txt.split("단계 학습평가").length > 1)
				{
					arr.children.splice(k+plusNum, 0, new Object( {"title" : txt, "page" : Number(thisTit.children[k].page)+1 } ) )
					plusNum += 1;
				}
			}

			//arr.children.splice(arr.children.length, 1);
			packDataArr[i][j].listDB = arr;
			/*
			var txt = thisTit.children[i].title;
			if( txt.split("단계 학습평가").length > 1)
			{
console.log(packDataArr[i][j].listDB)
			}
			/*for(var k = 0; k<packDataArr[$num].length; k++)
			{
				var txt = thisTit.children[i].title;
			}*/
		}
	}
	/**/
	saveNum = localStorage.getItem(uniqId+"-saveNum");
	if(!saveNum) saveNum = 0;
	creaetRoot();
	/**/
}


function PrintElem(elem)
{
	var cssLink = "";
	cssLink += '<link rel="stylesheet" type="text/css" href="../css/pagepop.css"/>'

	cssLink += '<link rel="stylesheet" type="text/css" href="./common/css/font.css"/>'
	cssLink += '<link rel="stylesheet" type="text/css" href="./common/css/common.css"/>'
	cssLink += '<link rel="stylesheet" type="text/css" href="./common/lib/plyr.css"/>'
	cssLink += '<link rel="stylesheet" type="text/css" href="./pack/css/common.css"/>'
	cssLink += '<link rel="stylesheet" type="text/css" href="./pack/css/print.css'+"?"+version+Math.random()+version+Math.random()+'"/>'

	var temp = elem.clone();
	temp.each(function(){
		if( $(this).find(".print-page").length > 0 )
		{
			var newTitle = $(this).find(".popup_title");
			newTitle.each(function(){
				var txt="";
				if( $(this).attr("data-pack-title") )
				{
					txt = $(this).attr("data-pack-title");
				}
				else
				{
					txt = $(this).text();
					$(this).attr("data-pack-title", txt);
				}
				$(this).find("textarea").remove();
				$(this).append('<textarea readonly="readonly">'+txt+'</textarea>');
			})

			var chkNum = $(this).find(".print-page").last().find(".page").length;
			var num = printLayOut[printLayOutData]-chkNum;
			for(var i = 0; i<num; i++)
			{
				$(this).find(".print-page").last().append("<div class='page'></div>");
			}
		}
	})
	/** 팝업 */
	var popupWindow = window.open("", "_blank", "width=700,height=800")
	popupWindow.document.write("<!DOCTYPE html>"+
	  "<html>"+
		"<head>"+
		cssLink+
		"</head>"+
		"<body id='print-popup'>"+temp.html()+"</body>"+

	  "</html>")

	popupWindow.document.close()
	popupWindow.focus()

	/** 1초 지연 */
	setTimeout(function(){
		popupWindow.print()         // 팝업의 프린트 도구 시작
		popupWindow.close()         // 프린트 도구 닫혔을 경우 팝업 닫기
	}, 1000)
}
function Popup(data)
{
	var mywindow = window.open('', 'my div', 'height=400,width=600');
	mywindow.document.write('<html><head><title>my div</title>');
	mywindow.document.write('</head><body >');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.document.close(); // IE >= 10에 필요
	mywindow.focus(); // necessary for IE >= 10
	mywindow.print();
	mywindow.close();
	return true;
}


///////////////////////////////////////////////////////////
function resizeEvent()
{
	var wrapEle = $("#pack");
	var wrapWidth = 1818;
	var wrapHeight = 1169;
	var windowRatioWidth = window.innerWidth;
	var windowRatioHeight = window.innerHeight;

	if( windowRatioWidth > windowRatioHeight )
	{
		windowRatio = windowRatioWidth / wrapWidth;
		if( windowRatio > (windowRatioHeight / wrapHeight) ) windowRatio = (windowRatioHeight / wrapHeight);
	}
	else
	{
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

	window.addEventListener("resize", resizeEvent, false);
	window.addEventListener("orientationchange", resizeEvent, false);

}
function dp2lp( $dp )
{
	//return $dp;
    if(windowRatio== undefined) return $dp;
    return ( $dp / windowRatio );
}
function dp2lw( $dp )
{
	//return $dp;
    if(windowRatio== undefined) return $dp;
    return ( $dp * windowRatio );
}

function setPanZoomPack()
{
	var _this = this;
	_this.isZoom = false;

	var target = $(".pack-box");
	target.each(function(){
		$(this).panzoom({
			minScale: 1,
			maxScale: 4,
		});

		$(this).on('click touchstart', function($e) {
			$e.stopPropagation();
			$e.preventDefault();

			if ($e.originalEvent && $e.originalEvent.targetTouches && $e.type!="touchend")
			{
				$e.pageX = $e.originalEvent.targetTouches[0].pageX;
				$e.pageY = $e.originalEvent.targetTouches[0].pageY;
			}
			var parentOffset = $(this).offset();
			var x = dp2lp($e.pageX - parentOffset.left);
			var y = dp2lp($e.pageY - parentOffset.top);

			$(this).panzoom(
				'zoom',
				2,
				{
					animate: true,
					focal:$e
				}
			)
		});
		target.panzoom("disable");
	});

	return target;
}

function guideDownEvent()
{
	window.open( "./down/guide_pack.zip", "_blank");
}