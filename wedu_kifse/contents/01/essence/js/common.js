var isPorting = false;
var mediaServer = "https://www.nise.go.kr/2021_digitalbook/01/";
var uniqId = "kifse-2021-01-essence";
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
var windowRatio = 1;
var saveNum = 0;
var bookData;
var essenceData;

var dragObj;
var dropObj;

var essenceResultDataID;
var essenceResultData;

var prevpageList = new Array();

var navi;
function initialize()
{
	function pageNavi()
	{
		this.prevPage = function(){}
		this.nextPage = function(){}
	}
	navi = new pageNavi();

	if(!isPorting) mediaServer = "./";
	resizeEvent();
	setKeyEvent();

	bookData = new Object();
	bookData.curPage = 1;
	bookData.maxPage = 1;

	saveNum = localStorage.getItem(uniqId+"-saveNum");
	if(!saveNum) saveNum = 0;

	creaetRoot();
}

function creaetRoot()
{
	var tag = '<div id="essence-1" class="root">';
	tag +=		 '<div class="bg-title"></div>';
	tag +=		 '<div class="essence-left-btns">';
	tag +=			'<button class="creat-folder-btn"></button>';
	tag +=			'<button class="del-folder-btn"></button>';
	tag +=			'<button class="prev-page-btn"></button>';
	tag +=			'<button class="list-move-btn"></button>';
	tag +=			'<button class="chk-reset-btn"></button>';
	tag +=			'<button class="guide-down-btn"></button>';

	tag +=		'</div>';
	tag +=		'<ul class="essence-folder">';

	tag	+=		'</ul>';
	tag +=		'<ul class="essence-list">';
	tag	+=		'</ul>';
	tag	+=	'</div>';

	$("#essence-left").append(tag);

	$("#essence-1").mCustomScrollbar({
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
	$(".root .prev-page-btn").off("click").on("click",function(){
		prevPageLoader();
	})
	$(".root .list-move-btn").off("click").on("click",function(){
		listMoveEvent();
	})
	$(".root .chk-reset-btn").off("click").on("click",function(){
		chkResetEvent();
	})
	$(".root .guide-down-btn").off("click").on("click",function(){
		guideDownEvent();
	})

	for(var i = 1; i<=saveNum; i++)
	{
		var folder = localStorage.getItem(uniqId+"-folder-"+i);
		if( folder )
		{
			createFolder(i);
		}
	}

	essenceData = new Array();
	for(var i = 0; i<bookIds.length; i++)
	{
		essenceData[i] = new Array();
	}

	var loadID = uniqId;
	var loadData = localStorage.getItem(loadID);
	if(loadData)
	{
		loadData = JSON.parse(loadData);
		for(var j = 0; j<loadData.length; j++)
		{
			var id = loadData[j].split("*")[0];
			var unit = loadData[j].split("*")[1];
			var page = loadData[j].split("*")[2];
			var popID = loadData[j].split("*")[3];
			var title = loadData[j].split("*")[4];
			var tempUnit = Number(unit);
			if(id == "01_02_01" ) tempUnit+=6;
			if(id == "02_02_01" ) tempUnit+=6;
			if(id == "03_02_01" ) tempUnit+=6;
			if(id == "04_02_01" ) tempUnit+=6;
			if(id == "05_02_01" ) tempUnit+=6;
			if(id == "08_01_02" ) tempUnit+=8;
			if(id == "09_01_02" ) tempUnit+=8;

			var dataId = uniqId2+id+"-"+page+"-"+popID;
			var folder = localStorage.getItem(dataId);

			var tag = "<li data-folder="+dataId+" data-id="+id+" data-unit="+unit+" data-page="+page+" data-pop="+popID+">";
			tag+= "<div class='checkBox'></div>";
			tag+= "<p class='unit-txt'>"+tempUnit+"단원</p>";
			tag+= "<div class='input-pop-name'><p>"+title+"</p></div>";

			tag+= "<div class='pgae-ans-chk-box'><div class='pgae-ans-chk'></div></div>";

			tag+= "</li>"

			if( folder == "root" )
			{
				$(".root .essence-list").prepend(tag);
			}
			else
			{
				//$("#page"+data+" .essence-list").append(tag);
			}
		}
	}

	essenceResultDataID = new Array();
	essenceResultData = new Array();

	var essenceResultDataTemp = localStorage.getItem(uniqId+"-essenceResultDataID");
	if( essenceResultDataTemp )
	{
		essenceResultDataID = JSON.parse( essenceResultDataTemp );
		for( var i = 0; i<essenceResultDataID.length; i++ )
		{
			var tempId = essenceResultDataID[i];
			var tempData = localStorage.getItem(tempId);
			var listID = tempId.split("-essenceResultData")[0];

			$("#essence-left").find("[data-folder='"+listID+"']").find(".pgae-ans-chk").removeClass("ok").removeClass("no");
			$("#essence-left").find("[data-folder='"+listID+"']").find(".pgae-ans-chk").addClass(tempData);
		}
	}


	$('#essence-1.root .essence-list').sortable({
		start: function(event, ui) {
			dragObj = ui.item;
			dragObj.css("pointer-events","none");
		},
		beforeStop: function(event, ui) {
			dragObj.css("pointer-events","auto");
			dragObj = "";
		},
		stop: function( event, ui )
		{
			rootDataSave();
		}
	})
	$('.essence-list').sortable("disable");


	$("#essence-1 .checkBox").off("click").on("click",function(){
		if( $(this).hasClass("on") )
		{
			$(this).removeClass("on");
		}
		else
		{
			$(this).removeClass("on").addClass("on");
		}
	})

	setPageLoadEvent();
}
function createFolder($saveNum)
{
	var name = localStorage.getItem(uniqId+"-folder-"+$saveNum);
	if(!name) name = "폴더명";
	$("#essence-1 .essence-folder").append('<li id="Folder-'+$saveNum+'"><div class="checkBox"></div><div class="forder-icon"></div><input class="folder-name" type="text" placeholder="'+name+'" readonly="readonly"><div class="btn-rename"></div></li>');
	localStorage.setItem(uniqId+"-folder-"+$saveNum, name);

	var arr = new Array();
	var data = localStorage.getItem(uniqId+"-folder-"+$saveNum+"/data");
	if(!data) localStorage.setItem(uniqId+"-folder-"+$saveNum+"/data", arr);

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
			creaetSubPage($saveNum);
			$("#essence-1.root").remove();
		}
		else
		{

		}
	})

	$("#essence-1 .checkBox").off("click").on("click",function(){
		if( $(this).hasClass("on") )
		{
			$(this).removeClass("on");
		}
		else
		{
			$(this).removeClass("on").addClass("on");
		}
	})

	$("#Folder-"+$saveNum).off("mouseup").on("mouseup",function(){
		if( dragObj )
		{
			localStorage.setItem( dragObj.data("folder") , $saveNum );

			var temp = uniqId+"-folder-"+$saveNum+"/data";
			var arr = new Array();
			var data2 = localStorage.getItem(temp);
			if(data2) arr = JSON.parse(data2);

			var str = dragObj.data("id")+ "*" + dragObj.data("unit")+ "*" + dragObj.data("page")+ "*" + dragObj.data("pop")+ "*" + dragObj.find(".input-pop-name p").text();

			arr.push( str );

			localStorage.setItem(temp, JSON.stringify(arr));

			dragObj.remove();
		}
		else
		{
			//
		}
	})
}
function rootDataSave()
{
	var arr = new Array();
	$('#essence-1.root .essence-list li').each(function(){
		var str = $(this).data("id")+ "*" + $(this).data("unit")+ "*" + $(this).data("page")+ "*" + $(this).data("pop")+ "*" + $(this).find(".input-pop-name p").text();
		arr.push( str );
	})
	localStorage.setItem(uniqId, JSON.stringify(arr));
}

function creaetSubPage($num)
{
	var name = localStorage.getItem(uniqId+"-folder-"+$num);
	var tag = '<div class="essence-page">';
	tag +=		 '<div class="bg-title"></div>';
	tag +=		 '<div class="essence-left-btns">';
	tag +=			'<button class="del-folder-btn"></button>';
	tag +=			'<button class="prev-page-btn"></button>';
	tag +=			'<button class="list-move-btn"></button>';
	tag +=			'<button class="chk-reset-btn"></button>';
	tag +=			'<button class="guide-down-btn"></button>';
	tag +=		'</div>';
	tag +=		'<ul class="essence-folder" data-id="'+uniqId+"-folder-"+$num+'">';
	tag	+=			'<li><div class="checkBox"></div><div class="forder-icon"></div><input class="folder-name" type="text" placeholder="'+name+'" readonly="readonly"><div class="btn-rename"></div></li>';
	tag	+=		'</ul>';
	tag +=		'<ul class="essence-list">';
	tag	+=		'</ul>';
	tag	+=	'</div>';

	$("#essence-left").append(tag);

	$(".essence-page").mCustomScrollbar({
		scrollInertia : 1,
		theme:"dark"
	});

	var subPageKey = "kifse-2021-01-essence-folder-"+$num+"/data";
	var _this = $(".essence-page");

	_this.find(".btn-rename").off("click").on("click",function(){
		if( $(this).hasClass("on") )
		{
			$(this).parent().removeClass("on");
			$(this).removeClass("on");
			$(this).parent().find("input").removeAttr("readonly").attr("readonly", "readonly");
		}
		else
		{
			$(this).parent().removeClass("on").addClass("on");
			$(this).removeClass("on").addClass("on");
			$(this).parent().find("input").removeAttr("readonly");
		}
	})

	_this.find("input").change(function(){
		var txt = $(this).val();
		localStorage.setItem(uniqId+"-folder-"+$num, txt);
	});

	_this.find("input").off("click").on("click",function(){
		if( $(this).attr("readonly") )
		{
			creaetRoot();
			_this.remove();
		}
		else
		{

		}
	})

	var loadData = localStorage.getItem(subPageKey);
	if(loadData)
	{
		loadData = JSON.parse(loadData);
		for(var j = 0; j<loadData.length; j++)
		{
			var id = loadData[j].split("*")[0];
			var unit = loadData[j].split("*")[1];
			var page = loadData[j].split("*")[2];
			var popID = loadData[j].split("*")[3];
			var title = loadData[j].split("*")[4];

			var dataId = uniqId2+id+"-"+page+"-"+popID;
			var folder = localStorage.getItem(dataId);

			var tag = "<li data-folder="+dataId+" data-id="+id+" data-unit="+unit+" data-page="+page+" data-pop="+popID+">";
			tag+= "<div class='checkBox'></div>";
			tag+= "<p class='unit-txt'>"+unit+"단원</p>";
			tag+= "<div class='input-pop-name'><p>"+title+"</p></div>";

			tag+= "<div class='pgae-ans-chk-box'><div class='pgae-ans-chk'></div></div>";
			tag+= "</li>"
			_this.find(".essence-list").append(tag);
		}
	}

	essenceResultDataID = new Array();
	essenceResultData = new Array();

	var essenceResultDataTemp = localStorage.getItem(uniqId+"-essenceResultDataID");
	if( essenceResultDataTemp )
	{
		essenceResultDataID = JSON.parse( essenceResultDataTemp );
		for( var i = 0; i<essenceResultDataID.length; i++ )
		{
			var tempId = essenceResultDataID[i];
			var tempData = localStorage.getItem(tempId);
			var listID = tempId.split("-essenceResultData")[0];

			$("#essence-left").find("[data-folder='"+listID+"']").find(".pgae-ans-chk").removeClass("ok").removeClass("no");
			$("#essence-left").find("[data-folder='"+listID+"']").find(".pgae-ans-chk").addClass(tempData);
		}
	}

	_this.find(".essence-list").sortable({
		start: function(event, ui) {
			dragObj = ui.item;
			dragObj.css("pointer-events","none");
		},
		beforeStop: function(event, ui) {
			dragObj.css("pointer-events","auto");
			dragObj = "";
		},
		stop: function( event, ui )
		{
			subPageDataSave(subPageKey);
		}
	})
	$('.essence-list').sortable("disable");

	_this.find(".essence-folder .checkBox").off("click").on("click",function(){
		if( $(this).hasClass("on") )
		{
			$(this).removeClass("on");
			_this.find(".essence-list").each(function(){
				$(this).find(".checkBox").removeClass("on");
			})
		}
		else
		{
			$(this).removeClass("on").addClass("on");
			_this.find(".essence-list").each(function(){
				$(this).find(".checkBox").removeClass("on").addClass("on");
			})

		}
	})

	_this.find(".essence-list .checkBox").off("click").on("click",function(){
		if( $(this).hasClass("on") )
		{
			$(this).removeClass("on");
		}
		else
		{
			$(this).removeClass("on").addClass("on");
		}

		var isAll = true;
		_this.find(".essence-list li").each(function(){
			if( !$(this).find(".checkBox").hasClass("on") ) isAll = false;
		})
		if( isAll )
		{
			_this.find(".essence-folder .checkBox").removeClass("on").addClass("on");
		}
		else
		{
			_this.find(".essence-folder .checkBox").removeClass("on");
		}
	})

	_this.find(".del-folder-btn").off("click").on("click",function(){
		delSubData();
	})
	_this.find(".prev-page-btn").off("click").on("click",function(){
		prevPageLoader();
	})
	_this.find(".list-move-btn").off("click").on("click",function(){
		listMoveEvent();
	})
	_this.find(".chk-reset-btn").off("click").on("click",function(){
		chkResetEvent();
	})
	_this.find(".guide-down-btn").off("click").on("click",function(){
		guideDownEvent();
	})

	_this.find(".essence-folder li").off("mouseup").on("mouseup",function(){
		if( dragObj )
		{
			localStorage.setItem( dragObj.data("folder") , "root" );

			var temp = uniqId;
			var arr = new Array();
			var data2 = localStorage.getItem(temp);
			if(data2) arr = JSON.parse(data2);

			var str = dragObj.data("id")+ "*" + dragObj.data("unit")+ "*" + dragObj.data("page")+ "*" + dragObj.data("pop")+ "*" + dragObj.find(".input-pop-name p").text();

			arr.push( str );

			localStorage.setItem(temp, JSON.stringify(arr));

			dragObj.remove();
		}
		else
		{
			//
		}
	})
	setPageLoadEvent();
}

function subPageDataSave($key)
{
	var arr = new Array();
	$('.essence-page .essence-list li').each(function(){
		var str = $(this).data("id")+ "*" + $(this).data("unit")+ "*" + $(this).data("page")+ "*" + $(this).data("pop")+ "*" + $(this).find(".input-pop-name p").text();
		arr.push( str );
	})
	localStorage.setItem($key, JSON.stringify(arr));
}
function delRootFolder()
{
	$("#essence-1 .essence-folder .checkBox.on").each(function(){
		var num = $(this).parent().attr("id").split("Folder-")[1];
		localStorage.removeItem(uniqId+"-folder-"+num);
		$(this).parent().remove();
	})
}
function delRootData()
{
	var storageData = window.localStorage;

	if(storageData)
	{
		var length = storageData.length;
		var keyArr = new Array();

		for(var i = 0; i<length; i++)
		{
			var keyStr = storageData.key(i);
			keyArr.push( keyStr );
		}
	}

	$("#essence-1 .essence-folder .checkBox.on").each(function(){
		var num = $(this).parent().attr("id").split("Folder-")[1];

		var temp = uniqId+"-folder-"+num+"/data";
		var arr = new Array();
		var data2 = localStorage.getItem(temp);
		if(data2) arr = JSON.parse(data2);

		if(arr.length > 0 )
		{
			for(var i = 0; i<arr.length; i++)
			{
				var id = arr[i].split("*")[0];
				var unit = arr[i].split("*")[1];
				var page = arr[i].split("*")[2];
				var popID = arr[i].split("*")[3];
				var title = arr[i].split("*")[4];

				var dataId = uniqId2+id+"-"+page+"-"+popID;
				localStorage.removeItem(dataId);
				if(storageData)
				{
					for(var j = 0; j<keyArr.length; j++)
					{
						var keyTemp = String(keyArr[j]);
						if( (keyTemp.indexOf( uniqId ) >= 0) && (keyTemp.indexOf( id ) >= 0) && (keyTemp.indexOf( page ) >= 0) && (keyTemp.indexOf("writedata") >= 0)  )
						{
							localStorage.removeItem(keyTemp);
						}
					}
				}
			}
		}

		localStorage.removeItem(uniqId+"-folder-"+num);
		localStorage.removeItem(uniqId+"-folder-"+num+"/data");
		$(this).parent().remove();
	})

	$("#essence-1 .essence-list .checkBox.on").each(function(){
		localStorage.removeItem($(this).parent().data("folder") );
		localStorage.removeItem( $(this).parent().data("folder")+"-essenceResultData" );
		$(this).parent().remove();
		rootDataSave();

		var id_temp = $(this).parent().attr("data-id");
		var html_temp = id_temp+"/"+$(this).parent().attr("data-page")+".html";
		var name_temp = $(this).parent().attr("data-pop");
		var delID = (id_temp+"*"+html_temp+"*"+name_temp+"*"+$(this).parent().data("folder"));
		var max = prevpageList.length;
		var isSplice = false;
		for(var i = 0; i<max; i++)
		{
			var search = prevpageList.indexOf(delID);
			if(search!=-1)
			{
				prevpageList.splice(prevpageList.indexOf(search),1);
				isSplice = true;
			}
		}
		if(storageData)
		{
			for(var j = 0; j<keyArr.length; j++)
			{
				var keyTemp = String(keyArr[j]);
				if( (keyTemp.indexOf( uniqId ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-id") ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-page") ) >= 0) && (keyTemp.indexOf("writedata") >= 0)  )
				{
					localStorage.removeItem(keyTemp);
				}
			}
		}
		if(isSplice) prevpageList.push(" ");
	})
}


function delSubData()
{
	var storageData = window.localStorage;

	if(storageData)
	{
		var length = storageData.length;
		var keyArr = new Array();

		for(var i = 0; i<length; i++)
		{
			var keyStr = storageData.key(i);
			keyArr.push( keyStr );
		}
	}


	var _this = $(".essence-page");
	var key = _this.find(".essence-folder").data("id");

	if( _this.find(".essence-folder .checkBox").hasClass("on") )
	{
		var temp = key+"/data";
		var arr = new Array();
		var data2 = localStorage.getItem(temp);
		if(data2) arr = JSON.parse(data2);
		if(arr.length > 0 )
		{
			var isSplice = false;
			_this.find(".essence-list .checkBox.on").each(function(i){
				var id = $(this).parent().data("folder");
				localStorage.removeItem(id);
				$(this).parent().remove();
				localStorage.removeItem(id+"-essenceResultData");

				var id_temp = $(this).parent().attr("data-id");
				var html_temp = id_temp+"/"+$(this).parent().attr("data-page")+".html";
				var name_temp = $(this).parent().attr("data-pop");
				var delID = (id_temp+"*"+html_temp+"*"+name_temp+"*"+$(this).parent().data("folder"));
				var max = prevpageList.length;

				for(var i = 0; i<max; i++)
				{
					var search = prevpageList.indexOf(delID);
					if(search!=-1)
					{
						prevpageList.splice(prevpageList.indexOf(search),1);
						isSplice = true;
					}
				}

				if(storageData)
				{
					for(var j = 0; j<keyArr.length; j++)
					{
						var keyTemp = String(keyArr[j]);
						if( (keyTemp.indexOf( uniqId ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-id") ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-page") ) >= 0) && (keyTemp.indexOf("writedata") >= 0)  )
						{
							localStorage.removeItem(keyTemp);
						}
					}
				}
			})
			if(isSplice) prevpageList.push(" ");
		}
		localStorage.removeItem(key+"/data");
	}
	else
	{
		var temp = key+"/data";
		var arr = new Array();
		var data2 = localStorage.getItem(temp);
		if(data2) arr = JSON.parse(data2);
		if(arr.length > 0 )
		{
			var isSplice = false;
			_this.find(".essence-list .checkBox.on").each(function(i){
				var id = $(this).parent().data("folder");
				localStorage.removeItem(id);
				$(this).parent().remove();
				localStorage.removeItem(id+"-essenceResultData");

				var id_temp = $(this).parent().attr("data-id");
				var html_temp = id_temp+"/"+$(this).parent().attr("data-page")+".html";
				var name_temp = $(this).parent().attr("data-pop");
				var delID = (id_temp+"*"+html_temp+"*"+name_temp+"*"+$(this).parent().data("folder"));
				var max = prevpageList.length;

				for(var i = 0; i<max; i++)
				{
					var search = prevpageList.indexOf(delID);
					if(search!=-1)
					{
						prevpageList.splice(prevpageList.indexOf(search),1);
						isSplice = true;
					}
				}

				if(storageData)
				{
					for(var j = 0; j<keyArr.length; j++)
					{
						var keyTemp = String(keyArr[j]);
						if( (keyTemp.indexOf( uniqId ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-id") ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-page") ) >= 0) && (keyTemp.indexOf("writedata") >= 0)  )
						{
							localStorage.removeItem(keyTemp);
						}
					}
				}
			})
			if(isSplice) prevpageList.push(" ");
		}
		subPageDataSave( temp );
	}
}

function setPageLoadEvent()
{
	$(".essence-list li").off("click").on("click",function(){
		$("#essence-right #middle *").remove();

		bookId = $(this).data("id");
		var html = bookId +"/"+$(this).data("page")+".html";
		var name = $(this).data("pop");
		$("#essence-right #middle").removeClass();
		$("#essence-right #middle").addClass("page-box");
		$("#essence-right #middle").addClass("wrap-"+bookId);

		$("#essence-right #middle").removeAttr("data-essence");
		$("#essence-right #middle").attr("data-essence", $(this).data("folder") );

		/*$("#essence-right #middle").load(html + " .popup_view[data-popup-name='"+name+"']", function(){
			$(".popup_close_btn").remove();
			$(".popup_title").attr("tabIndex",5);
			$(".popup_view").css("visibility","visible").show().focus();

			pageAccessibilitySetting()
			setPageEvent();
		})*/
		prevpageList.push( (bookId+"*"+html+"*"+name+"*"+$(this).data("folder")) );

		$("#loader-temp").load(html, function(){
			$("#essence-right #middle").load(html + " .popup_view[data-popup-name='"+name+"']", function(){
				//$("#loader-temp *").remove(); //대체 활동 및 다른 활동 불러 오는 활동이 있어 삭제 불가
				$(".popup_close_btn").remove();
				$(".popup_title").attr("tabIndex",5);
				$(".popup_view").css("visibility","visible").show().focus();


				if( $("#essence-right #middle .research-btn").length > 0 )
				{
					var temp = $("#essence-right #middle .research-btn");
					var tempChkNum = 0;
					temp.each(function(){
						var tempName = $(this).attr("data-popup-target");
						$(this).attr("data-essence-sub", tempName)

						$("#essence-right #middle").append($('<div style="display:none;" id="'+tempName+'">').load(html + " .popup_view[data-popup-name='"+tempName+"']", function(){
							$(".popup_close_btn").remove();

							++tempChkNum;
							if(tempChkNum >= temp.length)
							{
								temp.show();
								pageAccessibilitySetting()
								setPageEvent(bookId+name+"-");
								temp.off("click").on("click",function(){
									var popName = $(this).attr("data-essence-sub");
									$("#"+popName).show();
								})
							}
						}));
					})
				}
				else
				{
					pageAccessibilitySetting()
					setPageEvent(bookId+name+"-");
				}
			})
		})

	})
}

function prevPageLoader()
{
	prevpageList.pop();
	var bool = true;
	if( prevpageList.length <= 0 ) bool = false;


	$("#essence-right #middle *").remove();
	if(bool)
	{
		var prevpageListTemp = prevpageList[prevpageList.length-1];
		bookId = prevpageListTemp.split("*")[0];
		var html = prevpageListTemp.split("*")[1];
		var name = prevpageListTemp.split("*")[2];
		var folder = prevpageListTemp.split("*")[3];

		$("#essence-right #middle").removeClass();
		$("#essence-right #middle").addClass("page-box");
		$("#essence-right #middle").addClass("wrap-"+bookId);

		$("#essence-right #middle").removeAttr("data-essence");
		$("#essence-right #middle").attr("data-essence", folder );


		$("#loader-temp").load(html, function(){
			$("#essence-right #middle").load(html + " .popup_view[data-popup-name='"+name+"']", function(){
				//$("#loader-temp *").remove(); //대체 활동 및 다른 활동 불러 오는 활동이 있어 삭제 불가
				$(".popup_close_btn").remove();
				$(".popup_title").attr("tabIndex",5);
				$(".popup_view").css("visibility","visible").show().focus();


				if( $("#essence-right #middle .research-btn").length > 0 )
				{
					var temp = $("#essence-right #middle .research-btn");
					var tempChkNum = 0;
					temp.each(function(){
						var tempName = $(this).attr("data-popup-target");
						$(this).attr("data-essence-sub", tempName)

						$("#essence-right #middle").append($('<div style="display:none;" id="'+tempName+'">').load(html + " .popup_view[data-popup-name='"+tempName+"']", function(){
							$(".popup_close_btn").remove();

							++tempChkNum;
							if(tempChkNum >= temp.length)
							{
								temp.show();
								pageAccessibilitySetting()
								setPageEvent(bookId+name+"-");
								temp.off("click").on("click",function(){
									var popName = $(this).attr("data-essence-sub");
									$("#"+popName).show();
								})
							}
						}));
					})
				}
				else
				{
					pageAccessibilitySetting()
					setPageEvent(bookId+name+"-");
				}
			})
		})
	}
}

function listMoveEvent()
{
	var btn = $("#essence-left .list-move-btn");
	if( btn.hasClass("on") )
	{
		$('.essence-list').sortable("disable");
	}
	else
	{
		btn.removeClass("on").addClass("on");
		$('.essence-list').sortable("enable");
	}
}

function chkResetEvent()
{
	var storageData = window.localStorage;

	if(storageData)
	{
		var length = storageData.length;
		var keyArr = new Array();

		for(var i = 0; i<length; i++)
		{
			var keyStr = storageData.key(i);
			keyArr.push( keyStr );
		}
	}

	$("#essence-left").find(".essence-list .checkBox.on").each(function(i){
		if(storageData)
		{
			for(var j = 0; j<keyArr.length; j++)
			{
				var keyTemp = String(keyArr[j]);
				if( (keyTemp.indexOf( uniqId ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-id") ) >= 0) && (keyTemp.indexOf( $(this).parent().attr("data-page") ) >= 0) && (keyTemp.indexOf("writedata") >= 0)  )
				{
					localStorage.removeItem(keyTemp);
				}
			}

			var resetArea = $("#middle input, #middle textarea");
			resetArea.val("");
		}

		var id = $(this).parent().data("folder");
		$(this).parent().find(".pgae-ans-chk").removeClass("ok").removeClass("no");
		localStorage.removeItem(id+"-essenceResultData");
	})
}

///////////////////////////////////////////////////////////
function resizeEvent()
{
	var wrapEle = $("#essence");
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

function guideDownEvent()
{
	window.open( "./down/guide_essence.zip", "_blank");
}