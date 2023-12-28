function setBugaEvent()
{
	var gobookBtn = $(".icon-gobook-btn");
	var listBtn = $(".icon-list-btn");
	var sBtn = $(".icon-sign-lang-btn");
	var amBtn = $(".icon-am-btn");
	var referenceBtn = $(".icon-reference-btn");
	//var zoomBtn = $(".icon-zoom-btn");
	var libraryBtn = $(".icon-library-btn");
	var printBtn = $(".icon-print-btn");
	var searchBtn = $(".icon-search-btn");
	var bookmarkBtn = $(".icon-bookmark-btn");
	var popResetBtn = $(".icon-reset-btn");


	setViewerList();
	setAmList();
	setReferenceList();
	setSearchList()
	setBookMarkList();
	boomarkList_update();
	setThumnail();

	$(".book-popup-close-btn").off("click").on("click", function(){
		var _target =  $( $(this).data("target") )
		_target.focus();
		$(".book-popup").hide();
	});


	gobookBtn.off("click").on("click", goPageFocus);
	listBtn.off("click").on("click", function(){
		$("#viewerList-box").show()
		$("#viewerList-box #viewerList-top-title").focus();
	});
	sBtn.off("click").on("click", function(){
		if( $(this).hasClass("on") )
		{
			isSua = false;
			$(this).removeClass("on");
		}
		else
		{
			isSua = true;
			$(this).addClass("on");
		}
	})
	amBtn.off("click").on("click", function(){
		$("#amList-box").show()
		$("#amList-box #amList-top-title").focus();
	});
	referenceBtn.off("click").on("click", function(){
		$("#referenceList-box").show()
		$("#referenceList-box #referenceList-top-title").focus();
	});

	printBtn.off("click").on("click",function(){
		pagePrint();
	})

	searchBtn.off("click").on("click",function(){
		$("#searchList-box").show()
 		$("#searchList-box #searchList-top-title").focus();
	})
	bookmarkBtn.off("click").on("click",function(){
		$("#bookMark-box").show()
		$("#bookMark-box #bookMark-top-title").focus();
	})
	libraryBtn.off("click").on("click",function(){
		window.open("https://ko.dict.naver.com/#/main");
	})
	popResetBtn.off("click").on("click",function(){
		setPopPageList();
	})

	$(".essence-open-btn").off("click").on("click",function(){
		window.open("./essence.html");
	})
	$(".pack-open-btn").off("click").on("click",function(){
		window.open("./pack.html");
	})
	$(".examin-link-btn").off("click").on("click",function(){
		window.open("https://www.nise.go.kr/examine/info.do?m=090101&s=nise", "_blank");
	})
	$(".serch-upload-btn").off("click").on("click",function(){
		//window.open("./pack.html");
		//alert("준비중 입니다.")
	})
}

function goPageFocus()
{
	if( $("#left-page").css("visibility") == "visible"  )
	{
		setTimeout(function () { $("#left-page .s_reader-num").focus(); }, 500);

	}
	else
	{
		setTimeout(function () { $("#right-page .s_reader-num").focus(); }, 500);
	}
}

function setViewerList()
{
	var thisTit = bookData.data.listDB;
	var childrenHtml = "";

	for(var i=0; i<thisTit.children.length; i++)
	{
		childrenHtml +=	'<div class="unit-con-box">';
		childrenHtml +=		'<button data-btn="ui-btn" class="unit-con-title" role="button" tabindex="5001" data-page="'+thisTit.children[i].page+'" title="'+thisTit.children[i].title+' '+thisTit.children[i].page+'쪽" aria-label="'+thisTit.children[i].title+' '+thisTit.children[i].page+'쪽">';
		childrenHtml +=			'<div class="unit-con-title-txt"><p>'+thisTit.children[i].title+'</p></div>';
		childrenHtml +=			'<div class="unit-con-title-page"><p>'+thisTit.children[i].page+'쪽</p></div>';
		childrenHtml +=		'</button>';
		childrenHtml +=		'<div class="unit-con-txt-box">';

		if(thisTit.children[i].children)
		{
			for(var j=0; j<thisTit.children[i].children.length; j++)
			{
				var temp = thisTit.children[i].children[j].title;
				temp = temp.replace("<span style='display:inline-block; color:red; transform: rotate(-90deg);'>&#60;</span>", "쐐기");
				temp = temp.replace("<span style='display:inline-block; color:red;transform: rotate(-90deg);'>&#171;</span>", "겹쐐기");

				childrenHtml += 	'<button data-btn="ui-btn" class="unit-con-txt" data-page="'+thisTit.children[i].children[j].page+'" tabindex="5001" title="'+temp+' '+thisTit.children[i].children[j].page+'쪽" aria-label="'+temp+' '+thisTit.children[i].children[j].page+'쪽">';
				childrenHtml += 		'<div class="unit-con-txt-txt">';
				childrenHtml += 			'<p>'+thisTit.children[i].children[j].title+'</p>';
				childrenHtml += 		'</div>';
				childrenHtml += 		'<div class="unit-con-txt-page">';
				childrenHtml += 			'<p>'+thisTit.children[i].children[j].page+'쪽</p>';
				childrenHtml += 		'</div>';
				childrenHtml += 	'</button>';
			}
		}
		childrenHtml += '</div>';
		childrenHtml += '</div>';
	}

	var tag = '';
	tag +=	'<div id="viewerList-box" class="book-popup">';
	tag +=		'<div id="viewerList-box-wrap">';
	tag +=			'<div id="viewerList-top-box">';
	tag +=				'<div id="viewerList-top-title" class="book-popup-title" tabIndex="5001" title="목차 이동 페이지"></div>';
	tag +=				'<button data-btn="ui-btn" class="book-popup-close-btn" tabIndex="5003" role="button" title="닫기" data-main="#viewerList-top-title" data-target=".icon-list-btn"></button>';
	tag +=			'</div>';

	tag +=			'<div id="viewerList-con-box">';
	tag +=				'<div class="unit-box">';
	tag +=					'<button data-btn="ui-btn" class="unit-title" data-page="'+thisTit.page+'" tabIndex="5001" title="'+thisTit.title+' '+thisTit.page+'쪽" aria-label="'+thisTit.title+' '+thisTit.page+'쪽">';
	tag +=						'<div class="unit-title-txt">'+thisTit.title+'</div>';
	tag +=						'<div class="unit-title-page"><p>'+thisTit.page+'쪽</p></div>';
	tag +=					'</button>';
	tag +=					childrenHtml;
	tag +=				'</div>'
	tag +=			'</div>';
	tag +=		'</div>';
	tag +=	'</div>';

	$("#wrap").append(tag);

	var btn = $("#viewerList-box [data-btn='ui-btn']").not(".book-popup-close-btn");

	btn.off("click").on("click",function(){
		var pageNum = Number( $(this).data("page") );
		navi.movePage( pageNum, ".icon-list-btn");
	})
}


function setAmList()
{
	var bookIdArr = bookId.split("_")
	var amListunitTtl="";
	var fileName="";
	var accTxt = "";
	if(Number(bookIdArr[0]) == 1)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(unitId) <= 2)
			{
				amListunitTtl = "초등 창의적 체험활동 Ⅰ"
				fileName = "01_01";
				accTxt = "초등 창의적 체험활동 일";
			}
			else
			{
				amListunitTtl = "초등 창의적 체험활동 Ⅱ"
				fileName = "01_01";
				accTxt = "초등 창의적 체험활동 이";
			}
		}
		else
		{
			if(Number(unitId) <= 4)
			{
				amListunitTtl = "초등 창의적 체험활동 Ⅲ"
				fileName = "01_02";
				accTxt = "초등 창의적 체험활동 삼";
			}
			else
			{
				amListunitTtl = "초등 창의적 체험활동 Ⅳ"
				fileName = "01_02";
				accTxt = "초등 창의적 체험활동 사";
			}
		}
	}
	else if(Number(bookIdArr[0]) == 2)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "중등국어-가(1)";
			fileName = "02_01";
			accTxt = "중등 국어 가 1";
		}
		else
		{
			amListunitTtl += "중등국어-가(2)";
			fileName = "02_02";
			accTxt = "중등 국어 가 2";
		}
	}
	else if(Number(bookIdArr[0]) == 3)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "중등국어-나(1)";
			fileName = "03_01";
			accTxt = "중등 국어 나 1";
		}
		else
		{
			amListunitTtl += "중등국어-나(2)";
			fileName = "03_02";
			accTxt = "중등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 4)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "고등국어-가(1)";
			fileName = "04_01";
			accTxt = "고등 국어 가 1";
		}
		else
		{
			amListunitTtl += "고등국어-가(2)";
			fileName = "04_02";
			accTxt = "고등 국어 가 2";
		}
	}
	else if(Number(bookIdArr[0]) == 5)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "고등국어-나(1)";
			fileName = "04_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "고등국어-나(2)";
			fileName = "04_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 6)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "초등 3~4학년 사회(가)";
			fileName = "06_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "초등 3~4학년 사회(나)";
			fileName = "06_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 7)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "초등 5~6학년 사회(가)";
			fileName = "07_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "초등 5~6학년 사회(나)";
			fileName = "07_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 8)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "중등 사회(가)-1";
			fileName = "08_01";
			accTxt = "고등 국어 나 1";
		}
		else if(Number(bookIdArr[2]) == 2)
		{
			amListunitTtl += "중등 사회(가)-2";
			fileName = "08_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "중등 사회(나)";
			fileName = "08_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 9)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "고등 사회(가)-1";
			fileName = "09_01";
			accTxt = "고등 국어 나 1";
		}
		else if(Number(bookIdArr[2]) == 2)
		{
			amListunitTtl += "고등 사회(가)-2";
			fileName = "09_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "고등 사회(나)";
			fileName = "09_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 10)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "초등 3~4학년 과학(가)";
			fileName = "10_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "초등 3~4학년 과학(나)";
			fileName = "10_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 11)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "초등 5~6학년 과학(가)";
			fileName = "11_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "초등 5~6학년 과학(나)";
			fileName = "11_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 12)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "중등 과학(가)";
			fileName = "12_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "중등 과학(나)";
			fileName = "12_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 13)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "고등 과학(가)";
			fileName = "13_01";
			accTxt = "고등 국어 나 1";
		}
		else
		{
			amListunitTtl += "고등 과학(나)";
			fileName = "13_02";
			accTxt = "고등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 14)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			amListunitTtl += "창체 1.자율활동";
			fileName = "14_01";
			accTxt = "창체 1.자율활동";
		}
		else if(Number(bookIdArr[1]) == 2)
		{
			amListunitTtl += "창체 2.동아리활동";
			fileName = "14_02";
			accTxt = "창체 2.동아리활동";
		}
		else if(Number(bookIdArr[1]) == 3)
		{
			amListunitTtl += "창체 3.봉사활동";
			fileName = "14_03";
			accTxt = "창체 3.봉사활동";
		}
		else
		{
			amListunitTtl += "창체 4.진로활동";
			fileName = "14_04";
			accTxt = "창체 4.진로활동";
		}
	}
	else if(Number(bookIdArr[0]) == 15)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			fileName = "15_01";
			if(Number(bookIdArr[2]) == 1)
			{
				amListunitTtl += "중학교 진로와직업(가)-1";
				accTxt = "중학교 진로와 직업 가 1";
			}
			else
			{
				amListunitTtl += "중학교 진로와직업(가)-2";
				accTxt = "중학교 진로와 직업 가 2";
			}
		}
		else
		{
			fileName = "15_02";
			if(Number(bookIdArr[2]) == 1)
			{
				amListunitTtl += "중학교 진로와직업(나)-1";
				accTxt = "중학교 진로와 직업 나 1";
			}
			else
			{
				amListunitTtl += "중학교 진로와직업(나)-2";
				accTxt = "중학교 진로와 직업 나 2";
			}
		}
	}
	else if(Number(bookIdArr[0]) == 16)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			fileName = "16_01";
			if(Number(bookIdArr[2]) == 1)
			{
				amListunitTtl += "고등학교 진로와직업(가)-1";
				accTxt = "고등학교 진로와 직업 가 1";
			}
			else
			{
				amListunitTtl += "고등학교 진로와직업(가)-2";
				accTxt = "고등학교 진로와 직업 가 2";
			}
		}
		else
		{
			fileName = "16_02";
			if(Number(bookIdArr[2]) == 1)
			{
				amListunitTtl += "고등학교 진로와직업(나)-1";
				accTxt = "고등학교 진로와 직업 나 1";
			}
			else
			{
				amListunitTtl += "고등학교 진로와직업(나)-2";
				accTxt = "고등학교 진로와 직업 나 2";
			}
		}
	}
	else if(Number(bookIdArr[0]) == 86)
	{
		fileName = "86";
		if(bookIdArr[1] == "01")
		{
			amListunitTtl += "초등 3~4학년군 사회(가)";
			fileName = "86_01";
			accTxt = "초등 3~4학년군 사회(가)";
		}
		else
		{
			amListunitTtl += "초등 3~4학년군 사회(나)";
			fileName = "86_02";
			accTxt = "초등 3~4학년군 사회(나)";
		}
	}
	else if(Number(bookIdArr[0]) == 93)
	{
		fileName = "93";
		if(bookIdArr[1] == "01")
		{
			amListunitTtl += "고등 과학(가)";
			fileName = "93_01";
			accTxt = "고등 과학(가)";
		}
		else
		{
			amListunitTtl += "고등 과학(나)";
			fileName = "93_02";
			accTxt = "고등 과학(나)";
		}
	}
	else if(Number(bookIdArr[0]) == 94)
	{
		fileName = "94";
		if(bookIdArr[1] == "01")
		{
			amListunitTtl += "자율활동";
			fileName = "94_01";
			accTxt = "자율활동";
		}
		else
		{
			amListunitTtl += "동아리 활동";
			fileName = "94_02";
			accTxt = "동아리 활동";
		}
	}

	var fileName2 = "";
	if(Number(bookIdArr[0]) == 1)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "1_2_"+unitId;
		}
		else
		{
			fileName2 += "1_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 2)
	{
		{
			if(Number(bookIdArr[1]) == 2)
			{
				//fileName2 += "2_1_"+(unitId+6);
				fileName2 += "2_2_"+unitId;
			}
			else
			{
				fileName2 += "2_1_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 3)
	{
		{
			if(Number(bookIdArr[1]) == 2)
			{
				//fileName2 += "2_1_"+(unitId+6);
				fileName2 += "3_2_"+unitId;
			}
			else
			{
				fileName2 += "3_1_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 4)
	{
		{
			if(Number(bookIdArr[1]) == 2)
			{
				fileName2 += "4_2_"+unitId;
			}
			else
			{
				fileName2 += "4_1_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 5)
	{
		{
			if(Number(bookIdArr[1]) == 2)
			{
				fileName2 += "5_2_"+unitId;
			}
			else
			{
				fileName2 += "5_1_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 6)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "6_2_"+unitId;}
		else{			      fileName2 += "6_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 7)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "7_2_"+unitId;}
		else{			      fileName2 += "7_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 8)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "8_2_"+unitId;}
		else if(Number(bookIdArr[2]) == 2){fileName2 += "8_1_2_"+unitId;}
		else{			      fileName2 += "8_1_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 9)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "9_2_"+unitId;}
		else if(Number(bookIdArr[2]) == 2){fileName2 += "9_1_2_"+unitId;}
		else{			      fileName2 += "9_1_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 10)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "10_2_"+unitId;}
		else{			      fileName2 += "10_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 11)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "11_2_"+unitId;}
		else{			      fileName2 += "11_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 12)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "12_2_"+unitId;}
		else{			      fileName2 += "12_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 13)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "13_2_"+unitId;}
		else{			      fileName2 += "13_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 14)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "14_2_"+unitId;}
		else if(Number(bookIdArr[1]) == 3){fileName2 += "14_3_"+unitId;}
		else if(Number(bookIdArr[1]) == 4){fileName2 += "14_4_"+unitId;}
		else{			      fileName2 += "14_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 15)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "15_1_1_"+unitId;
			}
			else
			{
				fileName2 += "15_1_2_"+unitId;
			}
		}
		else
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "15_2_1_"+unitId;
			}
			else
			{
				fileName2 += "15_2_2_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 16)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "16_1_1_"+unitId;
			}
			else
			{
				fileName2 += "16_1_2_"+unitId;
			}
		}
		else
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "16_2_1_"+unitId;
			}
			else
			{
				fileName2 += "16_2_2_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 86)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "86_2_"+unitId;
		}
		else
		{
			fileName2 += "86_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 93)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "93_2_"+unitId;
		}
		else
		{
			fileName2 += "93_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 94)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "94_2_"+unitId;
		}
		else
		{
			fileName2 += "94_1_"+unitId;
		}
	}

	var tag = '';
	tag +=	 '<div id="amList-box" class="book-popup">';
	tag +=		'<div id="amList-box-wrap">';
	tag +=			'<div id="amList-top-box">';
	tag +=				'<div id="amList-top-title" class="book-popup-title" tabindex="5001" title="대체 자료 페이지"></div>';
	tag +=				'<button data-btn="ui-btn" class="book-popup-close-btn" tabIndex="5003" role="button" title="닫기" data-main="#amList-top-title" data-target=".icon-am-btn"></button>';
	tag +=			'</div>';
	tag +=			'<div id="amList-con-box">';
	tag +=				'<div class="unit-box">';
	tag +=					'<div class="unit-title" tabindex="5001" title="'+accTxt+'" aria-label="'+accTxt+'">';
	tag +=						'<div class="unit-title-txt txt">'+amListunitTtl+'</div>';
	tag +=					'</div>';
	tag +=					'<div class="unit-con-box">';
	//tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="전자 점자 자료 (점자 정보 단말기 필요)" aria-label="전자 점자 자료 (점자 정보 단말기 필요)" data-down="'+bookId+"/down/"+fileName+'.zip">';
	//tag +=							'<div class="unit-con-title-txt txt">';
	//tag +=								'<p>전자 점자 자료 (점자 정보 단말기 필요)</p>';
	//tag +=							'</div>';
	//tag +=							'<div class="unit-con-title-page"></div>';
	//tag +=						'</button>';


	//tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="'+bookData.data.listDB.title+'" aria-label="'+bookData.data.listDB.title+'" data-down="'+bookId+'/down/'+fileName2+'.zip">';
	//tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="'+bookData.data.listDB.title+'" aria-label="'+bookData.data.listDB.title+'" data-down="./down/'+fileName2+'.zip">';
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="일. 대체텍스트 한글 파일 다운로드 버튼" aria-label="일. 대체텍스트 한글 파일 다운로드 버튼" data-down="./down/'+fileName2+'.zip">';
	tag +=							'<div class="unit-con-title-txt txt">';
	//tag +=								'<p>'+bookData.data.listDB.title+'</p>';
	tag +=								'<p>1. 대체텍스트 한글 파일</p>';

	tag +=							'</div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	//if( !(bookId=="94_02_01" && unitId == 1) )
	if(
		!(bookId=="06_01_01") &&
		!(bookId=="06_02_01") &&
		!(bookId=="07_01_01") &&
		!(bookId=="07_02_01") &&
		!(bookId=="08_01_01") &&
		!(bookId=="08_01_02") &&
		!(bookId=="08_02_01") &&
		!(bookId=="09_01_01") &&
		!(bookId=="09_01_02") &&
		!(bookId=="09_02_01") &&
		!(bookId=="10_01_01") &&
		!(bookId=="10_02_01") &&
		!(bookId=="11_01_01") &&
		!(bookId=="11_02_01") &&
		!(bookId=="12_01_01") &&
		!(bookId=="12_02_01") &&
		!(bookId=="13_01_01") &&
		!(bookId=="13_02_01") &&
		!(bookId=="14_01_01") &&
		!(bookId=="14_02_01") &&
		!(bookId=="14_03_01") &&
		!(bookId=="14_04_01") &&
		!(bookId=="15_01_01") &&
		!(bookId=="15_01_02") &&
		!(bookId=="15_02_01") &&
		!(bookId=="15_02_02") &&
		!(bookId=="16_01_01") &&
		!(bookId=="16_01_02") &&
		!(bookId=="16_02_01") &&
		!(bookId=="16_02_02")
	)
	{
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="이. 점자 파일 다운로드 버튼" aria-label="이. 점자 파일 다운로드 버튼" data-down="./down/'+fileName2+'_brf.zip">';
	tag +=							'<div class="unit-con-title-txt txt">';
	tag +=								'<p>2. 점자 파일</p>';
	tag +=							'</div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	}

	if(
		!(bookId=="06_01_01") &&
		!(bookId=="06_02_01") &&
		!(bookId=="07_01_01") &&
		!(bookId=="07_02_01") &&
		!(bookId=="08_01_01") &&
		!(bookId=="08_01_02") &&
		!(bookId=="08_02_01") &&
		!(bookId=="09_01_01") &&
		!(bookId=="09_01_02") &&
		!(bookId=="09_02_01") &&
		!(bookId=="10_01_01") &&
		!(bookId=="10_02_01") &&
		!(bookId=="11_01_01") &&
		!(bookId=="11_02_01") &&
		!(bookId=="12_01_01") &&
		!(bookId=="12_02_01") &&
		!(bookId=="13_01_01") &&
		!(bookId=="13_02_01") &&
		!(bookId=="14_01_01") &&
		!(bookId=="14_02_01") &&
		!(bookId=="14_03_01") &&
		!(bookId=="14_04_01") &&
		!(bookId=="15_01_01") &&
		!(bookId=="15_01_02") &&
		!(bookId=="15_02_01") &&
		!(bookId=="15_02_02") &&
		!(bookId=="16_01_01") &&
		!(bookId=="16_01_02") &&
		!(bookId=="16_02_01") &&
		!(bookId=="16_02_02")
	)
	{
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="삼. 음성도서 파일 다운로드 버튼" aria-label="삼. 음성도서 파일 다운로드 버튼" data-down="./down/'+fileName2+'_daisy.zip">';
	tag +=							'<div class="unit-con-title-txt txt">';
	tag +=								'<p>3. 음성도서 파일</p>';
	tag +=							'</div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	}
	if(
		(bookId=="15_01_01") || (bookId=="15_01_02") || (bookId=="15_02_01") || (bookId=="15_02_02") ||
		(bookId=="16_01_01") || (bookId=="16_01_02") || (bookId=="16_02_01") || (bookId=="16_02_02")
	)
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="이. 요약 노트 다운로드 버튼" aria-label="이. 요약 노트 다운로드 버튼" data-down="./down/'+fileName2+'_summary_hwp.zip">';
	tag +=							'<div class="unit-con-title-txt txt">';
	tag +=								'<p>2. 요약 노트</p>';
	tag +=							'</div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';

	tag +=					'</div>';
	tag +=				'</div>';
	tag +=			'</div>';
	tag +=		'</div>';
	tag +=	 '</div>';
	$("#wrap").append(tag);

	var btn = $("#amList-box [data-btn='ui-btn']").not(".book-popup-close-btn");

	btn.off("click").on("click",function(){
		var downLoadFile = ( $(this).data("down") );
		window.open( "./"+downLoadFile, "_blank");
	})
}

function setReferenceList()
{
	var bookIdArr = bookId.split("_")
	var fileName = "";
	var titleTxt = "";
	if(Number(bookIdArr[0]) == 1)
	{
		fileName = "01";

		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(unitId) <= 2)
			{

				titleTxt = "초등 창의적 체험활동 Ⅰ"
			}
			else
			{
				titleTxt = "초등 창의적 체험활동 Ⅱ"
			}
		}
		else
		{
			if(Number(unitId) <= 4)
			{
				titleTxt = "초등 창의적 체험활동 Ⅲ";
			}
			else
			{
				titleTxt = "초등 창의적 체험활동 Ⅳ"
			}
		}
	}
	else if(Number(bookIdArr[0]) == 2)
	{
		fileName = "02";
		if(bookIdArr[1] == "01")
		{
			titleTxt = "중등 국어 가 1";
		}
		else
		{
			titleTxt = "중등 국어 가 2";
		}
	}
	else if(Number(bookIdArr[0]) == 3)
	{
		fileName = "03";
		if(bookIdArr[2] == "01")
		{
			titleTxt = "중등 국어 나 1";
		}
		else
		{
			titleTxt = "중등 국어 나 2";
		}
	}
	else if(Number(bookIdArr[0]) == 4)
	{
		fileName = "04";
		if(bookIdArr[1] == "01")
		{
			titleTxt = "고등국어-가(1)";
		}
		else
		{
			titleTxt = "고등국어-가(2)";
		}
	}
	else if(Number(bookIdArr[0]) == 5)
	{
		fileName = "05";
		if(bookIdArr[1] == "01")
		{
			titleTxt = "고등국어-나(1)";
		}
		else
		{
			titleTxt = "고등국어-나(2)";
		}
	}

	else if(Number(bookIdArr[0]) == 6)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "초등 3~4학년 사회(가)";
			fileName = "06_01";
		}
		else
		{
			titleTxt += "초등 3~4학년 사회(나)";
			fileName = "06_02";
		}
	}
	else if(Number(bookIdArr[0]) == 7)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "초등 5~6학년 사회(가)";
			fileName = "07_01";
		}
		else
		{
			titleTxt += "초등 5~6학년 사회(나)";
			fileName = "07_02";
		}
	}
	else if(Number(bookIdArr[0]) == 8)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "중등 사회(가)-1";
			fileName = "08_01";
		}
		else if(Number(bookIdArr[2]) == 2)
		{
			titleTxt += "중등 사회(가)-2";
			fileName = "08_01";
		}
		else
		{
			titleTxt += "중등 사회(나)";
			fileName = "08_02";
		}
	}
	else if(Number(bookIdArr[0]) == 9)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "고등 사회(가)-1";
			fileName = "09_01";
		}
		else if(Number(bookIdArr[2]) == 2)
		{
			titleTxt += "고등 사회(가)-2";
			fileName = "09_01";
		}
		else
		{
			titleTxt += "고등 사회(나)";
			fileName = "09_02";
		}
	}
	else if(Number(bookIdArr[0]) == 10)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "초등 3~4학년 과학(가)";
			fileName = "10_01";
		}
		else
		{
			titleTxt += "초등 3~4학년 과학(나)";
			fileName = "10_02";
		}
	}
	else if(Number(bookIdArr[0]) == 11)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "초등 5~6학년 과학(가)";
			fileName = "11_01";
		}
		else
		{
			titleTxt += "초등 5~6학년 과학(나)";
			fileName = "11_02";
		}
	}
	else if(Number(bookIdArr[0]) == 12)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "중등 과학(가)";
			fileName = "12_01";
		}
		else
		{
			titleTxt += "중등 과학(나)";
			fileName = "12_02";
		}
	}
	else if(Number(bookIdArr[0]) == 13)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "고등 과학(가)";
			fileName = "13_01";
		}
		else
		{
			titleTxt += "고등 과학(나)";
			fileName = "13_02";
		}
	}
	else if(Number(bookIdArr[0]) == 14)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			titleTxt += "창체 1.자율활동";
			fileName = "14_01";
		}
		else if(Number(bookIdArr[1]) == 2)
		{
			titleTxt += "창체 2.동아리활동";
			fileName = "14_02";
		}
		else if(Number(bookIdArr[1]) == 3)
		{
			titleTxt += "창체 3.봉사활동";
			fileName = "14_03";
		}
		else
		{
			titleTxt += "창체 4.진로활동";
			fileName = "14_04";
		}
	}
	else if(Number(bookIdArr[0]) == 15)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(bookIdArr[2]) == 1)
			{
				titleTxt += "중학교 진로와직업(가)-1";
				fileName = "15_1_1";
			}
			else
			{
				titleTxt += "중학교 진로와직업(가)-2";
				fileName = "15_1_2";
			}
		}
		else
		{
			if(Number(bookIdArr[2]) == 1)
			{
				titleTxt += "중학교 진로와직업(나)-1";
				fileName = "15_2_1";
			}
			else
			{
				titleTxt += "중학교 진로와직업(나)-2";
				fileName = "15_2_2";
			}
		}
	}
	else if(Number(bookIdArr[0]) == 16)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(bookIdArr[2]) == 1)
			{
				titleTxt += "고등학교 진로와직업(가)-1";
				fileName = "16_1_1";
			}
			else
			{
				titleTxt += "고등학교 진로와직업(가)-2";
				fileName = "16_1_2";
			}
		}
		else
		{
			if(Number(bookIdArr[2]) == 1)
			{
				titleTxt += "고등학교 진로와직업(나)-1";
				fileName = "16_2_1";
			}
			else
			{
				titleTxt += "고등학교 진로와직업(나)-2";
				fileName = "16_2_2";
			}
		}
	}

	else if(Number(bookIdArr[0]) == 86)
	{
		fileName = "86";
		if(bookIdArr[1] == "01")
		{
			titleTxt = "초등 3~4학년군 사회(가)";
		}
		else
		{
			titleTxt = "초등 3~4학년군 사회(나)";
		}
	}
	else if(Number(bookIdArr[0]) == 93)
	{
		fileName = "93";
		if(bookIdArr[1] == "01")
		{
			titleTxt = "고등 과학(가)";
		}
		else
		{
			titleTxt = "고등 과학(나)";
		}
	}
	else if(Number(bookIdArr[0]) == 94)
	{
		fileName = "94";
		if(bookIdArr[1] == "01")
		{
			titleTxt = "자율활동";
		}
		else
		{
			titleTxt = "동아리 활동";
		}
	}

	var fileName2 = "";
	if(Number(bookIdArr[0]) == 1)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "1_2_"+unitId;
		}
		else
		{
			fileName2 += "1_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 2)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			//fileName2 += "2_1_"+(unitId+6);
			fileName2 += "2_2_"+unitId;
		}
		else
		{
			fileName2 += "2_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 3)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "3_2_"+unitId;
		}
		else
		{
			fileName2 += "3_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 4)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "4_2_"+unitId;
		}
		else
		{
			fileName2 += "4_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 5)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "5_2_"+unitId;
		}
		else
		{
			fileName2 += "5_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 6)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "6_2_"+unitId;}
		else{			      fileName2 += "6_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 7)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "7_2_"+unitId;}
		else{			      fileName2 += "7_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 8)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "8_2_"+unitId;}
		else if(Number(bookIdArr[2]) == 2){fileName2 += "8_1_2_"+unitId;}
		else{			      fileName2 += "8_1_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 9)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "9_2_"+unitId;}
		else if(Number(bookIdArr[2]) == 2){fileName2 += "9_1_2_"+unitId;}
		else{			      fileName2 += "9_1_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 10)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "10_2_"+unitId;}
		else{			      fileName2 += "10_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 11)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "11_2_"+unitId;}
		else{			      fileName2 += "11_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 12)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "12_2_"+unitId;}
		else{			      fileName2 += "12_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 13)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "13_2_"+unitId;}
		else{			      fileName2 += "13_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 14)
	{
		if(Number(bookIdArr[1]) == 2){fileName2 += "14_2_"+unitId;}
		else if(Number(bookIdArr[1]) == 3){fileName2 += "14_3_"+unitId;}
		else if(Number(bookIdArr[1]) == 4){fileName2 += "14_4_"+unitId;}
		else{			      fileName2 += "14_1_"+unitId;}
	}
	else if(Number(bookIdArr[0]) == 15)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "15_1_1_"+unitId;
			}
			else
			{
				fileName2 += "15_1_2_"+unitId;
			}
		}
		else
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "15_2_1_"+unitId;
			}
			else
			{
				fileName2 += "15_2_2_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 16)
	{
		if(Number(bookIdArr[1]) == 1)
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "16_1_1_"+unitId;
			}
			else
			{
				fileName2 += "16_1_2_"+unitId;
			}
		}
		else
		{
			if(Number(bookIdArr[2]) == 1)
			{
				fileName2 += "16_2_1_"+unitId;
			}
			else
			{
				fileName2 += "16_2_2_"+unitId;
			}
		}
	}
	else if(Number(bookIdArr[0]) == 86)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "86_2_"+unitId;
		}
		else
		{
			fileName2 += "86_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 93)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "93_2_"+unitId;
		}
		else
		{
			fileName2 += "93_1_"+unitId;
		}
	}
	else if(Number(bookIdArr[0]) == 94)
	{
		if(Number(bookIdArr[1]) == 2)
		{
			fileName2 += "94_2_"+unitId;
		}
		else
		{
			fileName2 += "94_1_"+unitId;
		}
	}

	var tag = '';
	tag +=	'<div id="referenceList-box" class="book-popup">';
	tag +=		'<div id="referenceList-box-wrap">';
	tag +=			'<div class="referenceList-top-box">';
	tag +=				'<div id="referenceList-top-title" class="book-popup-title" tabindex="5001" title="학습 자료실 페이지"></div>';
	tag +=				'<button data-btn="ui-btn" class="book-popup-close-btn" tabIndex="5003" role="button" title="닫기" data-main="#referenceList-top-title" data-target=".icon-reference-btn"></button>';
	tag +=			'</div>';
	tag +=			'<div id="referenceList-con-box">';

	if( !(bookId=="02_01_01" && unitId == 1) && !(bookId=="02_01_01" && unitId == 2) && !(bookId=="02_01_01" && unitId == 3) && !(bookId=="02_01_01" && unitId == 4) &&
		!(bookId=="02_02_01" && unitId == 1) && !(bookId=="02_02_01" && unitId == 2) && !(bookId=="02_02_01" && unitId == 4) && !(bookId=="02_02_01" && unitId == 5) && !(bookId=="02_02_01" && unitId == 6) &&
		!(bookId=="03_01_01" && unitId == 6) &&
		!(bookId=="03_02_01" && unitId == 2) && !(bookId=="03_02_01" && unitId == 3) && !(bookId=="03_02_01" && unitId == 6) &&
		!(bookId=="04_01_01" && unitId == 4) &&
		!(bookId=="04_02_01" && unitId == 2) && !(bookId=="04_02_01" && unitId == 5) &&
		!(bookId=="05_01_01" && unitId == 1) && !(bookId=="05_01_01" && unitId == 2) && !(bookId=="05_01_01" && unitId == 3)  && !(bookId=="05_01_01" && unitId == 5) && !(bookId=="05_01_01" && unitId == 6) &&
		!(bookId=="05_02_01" && unitId == 1) && !(bookId=="05_02_01" && unitId == 2) && !(bookId=="05_02_01" && unitId == 3)  && !(bookId=="05_02_01" && unitId == 4)
	)
	{

	tag +=				'<div class="unit-box">';
	tag +=					'<div class="unit-title" tabindex="5001" title="용어 사전">';
	tag +=						'<div class="unit-title-txt">용어 사전</div>';
	//tag +=						'<div class="unit-title-txt">학습 자료</div>';
	tag +=					'</div>';
	tag +=					'<div class="unit-con-box">';
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="용어 사전 다운로드 버튼" aria-label="용어 사전 다운로드 버튼" data-term="not" data-down="./down/'+fileName2+'_term.zip">';
	tag +=							'<div class="unit-con-title-txt"><p>'+titleTxt+'</p></div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	tag +=					'</div>';
	tag +=				'</div>';
	}



	else if( (bookId != "01_01_01") && (bookId != "01_02_01") &&
		!(bookId=="02_01_01" && unitId == 1) && !(bookId=="02_01_01" && unitId == 2) && !(bookId=="02_01_01" && unitId == 3) && !(bookId=="02_01_01" && unitId == 4) && !(bookId=="02_01_01" && unitId == 6) &&
		(bookId != "02_02_01") &&
		!(bookId=="03_01_01" && unitId == 1) && !(bookId=="03_01_01" && unitId == 4) && !(bookId=="03_01_01" && unitId == 6) &&
		(bookId != "03_02_01") &&
		!(bookId=="04_01_01" && unitId == 4) && !(bookId=="04_01_01" && unitId == 6) &&
		!(bookId=="04_02_01" && unitId == 1) && !(bookId=="04_02_01" && unitId == 2) && !(bookId=="04_02_01" && unitId == 3) && !(bookId=="04_02_01" && unitId == 5) && !(bookId=="04_02_01" && unitId == 6) &&
		!(bookId=="05_01_01" && unitId == 1) && !(bookId=="05_01_01" && unitId == 2) && !(bookId=="05_01_01" && unitId == 3)  && !(bookId=="05_01_01" && unitId == 5) && !(bookId=="05_01_01" && unitId == 6) &&
		!(bookId=="05_02_01" && unitId == 1) && !(bookId=="05_02_01" && unitId == 2) && !(bookId=="05_02_01" && unitId == 3)  && !(bookId=="05_02_01" && unitId == 4) &&
		!(bookId=="86_01_01" && unitId == 5) &&
		!(bookId=="93_01_01" && unitId == 3) &&
		!(bookId=="94_02_01" && unitId == 1) &&
		!(bookId=="06_01_01") && !(bookId=="06_02_01") && !(bookId=="07_01_01") && !(bookId=="07_02_01") &&
		!(bookId=="08_01_01") && !(bookId=="08_01_02") && !(bookId=="08_02_01") && !(bookId=="09_01_01") &&
		!(bookId=="09_01_02") && !(bookId=="09_02_01") && !(bookId=="10_01_01") && !(bookId=="10_02_01") &&
		!(bookId=="11_01_01") && !(bookId=="11_02_01") && !(bookId=="12_01_01") && !(bookId=="12_02_01") &&
		!(bookId=="13_01_01") && !(bookId=="13_02_01") && !(bookId=="14_01_01") && !(bookId=="14_02_01") &&
		!(bookId=="14_03_01") && !(bookId=="14_04_01")
	)
	{
	tag +=				'<div class="unit-box">';
	tag +=					'<div class="unit-title" tabindex="5001" title="낱말 카드">';
	tag +=						'<div class="unit-title-txt">낱말 카드</div>';
	//tag +=						'<div class="unit-title-txt">학습 자료</div>';
	tag +=					'</div>';
	tag +=					'<div class="unit-con-box">';
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="낱말 카드 다운로드 버튼" aria-label="낱말 카드 다운로드 버튼" data-down="./down/'+fileName2+'_card.zip">';
	tag +=							'<div class="unit-con-title-txt"><p>'+titleTxt+'</p></div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	tag +=					'</div>';
	tag +=				'</div>';
	}


	if( !(bookId=="01_01_01" && unitId == 4) && !(bookId=="01_01_01" && unitId == 5) &&
		!(bookId=="02_01_01" && unitId == 2) &&
		!(bookId=="02_02_01" && unitId == 4) &&
		!(bookId=="03_02_01" && unitId == 2) &&
		!(bookId=="04_01_01" && unitId == 4) &&
		!(bookId=="04_02_01" && unitId == 6) &&
		!(bookId=="05_01_01" && unitId == 2)
	)
	{
	tag +=				'<div class="unit-box">';
	tag +=					'<div class="unit-title" tabindex="5001" title="수어 사전">';
	tag +=						'<div class="unit-title-txt">수어 사전</div>';
	//tag +=						'<div class="unit-title-txt">학습 자료</div>';
	tag +=					'</div>';
	tag +=					'<div class="unit-con-box">';
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="수어 사전 다운로드 버튼" aria-label="수어 사전 다운로드 버튼" data-sua="not" data-down="./down/'+fileName2+'_sua.zip">';
	tag +=							'<div class="unit-con-title-txt"><p>'+titleTxt+'</p></div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	tag +=					'</div>';
	tag +=				'</div>';
	}



	if( (bookId=="06_01_01") || (bookId=="06_02_01") || (bookId=="07_01_01") || (bookId=="07_02_01") ||
		(bookId=="08_01_01") || (bookId=="08_01_02") || (bookId=="08_02_01") || (bookId=="09_01_01") ||
		(bookId=="09_01_02") || (bookId=="09_02_01") || (bookId=="10_01_01") || (bookId=="10_02_01") ||
		(bookId=="11_01_01") || (bookId=="11_02_01") || (bookId=="12_01_01") || (bookId=="12_02_01") ||
		(bookId=="13_01_01") || (bookId=="13_02_01") || (bookId=="14_01_01") || (bookId=="14_02_01") ||
		(bookId=="14_03_01") || (bookId=="14_04_01")
		//(bookId=="15_01_01") || (bookId=="15_01_02") || (bookId=="15_02_01") || (bookId=="15_02_02") ||
		//(bookId=="16_01_01") || (bookId=="16_01_02") || (bookId=="16_02_01") || (bookId=="16_02_02")
	)
	{
	tag +=				'<div class="unit-box">';
	tag +=					'<div class="unit-title" tabindex="5001" title="요약 노트">';
	tag +=						'<div class="unit-title-txt">요약 노트</div>';
	//tag +=						'<div class="unit-title-txt">학습 자료</div>';
	tag +=					'</div>';
	tag +=					'<div class="unit-con-box">';
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="요약 노트 다운로드 버튼" aria-label="요약 노트 다운로드 버튼" data-down="./down/'+fileName2+'_summary_hwp.zip">';
	tag +=							'<div class="unit-con-title-txt"><p>'+titleTxt+'</p></div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	tag +=					'</div>';
	tag +=				'</div>';
	}

	if( (bookId=="15_01_01") || (bookId=="15_01_02") || (bookId=="15_02_01") || (bookId=="15_02_02") ||
		(bookId=="16_01_01") || (bookId=="16_01_02") ||
		(bookId=="16_02_01" && unitId == 2) || (bookId=="16_02_01" && unitId == 5) || (bookId=="16_02_01" && unitId == 6) ||
		(bookId=="16_02_02" && unitId == 1) || (bookId=="16_02_02" && unitId == 2) || (bookId=="16_02_02" && unitId == 3)
	)
	{
	tag +=				'<div class="unit-box">';
	tag +=					'<div class="unit-title" tabindex="5001" title="직업 사전">';
	tag +=						'<div class="unit-title-txt">직업 사전</div>';
	//tag +=						'<div class="unit-title-txt">학습 자료</div>';
	tag +=					'</div>';
	tag +=					'<div class="unit-con-box">';
	tag +=						'<button data-btn="ui-btn" class="unit-con-title" tabindex="5001" title="직업 사전 다운로드 버튼" aria-label="직업 사전 다운로드 버튼" data-down="./down/'+fileName2+'_oc.zip">';
	tag +=							'<div class="unit-con-title-txt"><p>'+titleTxt+'</p></div>';
	tag +=							'<div class="unit-con-title-page"></div>';
	tag +=						'</button>';
	tag +=					'</div>';
	tag +=				'</div>';
	}

	tag +=			'</div>';
	tag +=		'</div>';
	tag +=	'</div>';
	 $("#wrap").append(tag);

	 var btn = $("#referenceList-box [data-btn='ui-btn']").not(".book-popup-close-btn");

 	btn.off("click").on("click",function(){
 		var downLoadFile = ( $(this).data("down") );
		if(
			( ($(this).data("sua") == "not") && (bookId=="06_01_01") && (unitId==6 || unitId==7) ) ||
			( ($(this).data("sua") == "not") && (bookId=="06_02_01") && (unitId==1 || unitId==2 || unitId==8) ) ||

			( ($(this).data("sua") == "not") && (bookId=="07_01_01") && (unitId==3 || unitId==5|| unitId==8|| unitId==10|| unitId==13|| unitId==15|| unitId==16) ) ||
			( ($(this).data("sua") == "not") && (bookId=="07_02_01") && (unitId==2 || unitId==5|| unitId==7|| unitId== 8|| unitId==10|| unitId==13|| unitId==15|| unitId==16) ) ||

			( ($(this).data("sua") == "not") && (bookId=="08_01_01") && (unitId==3) ) ||
			( ($(this).data("sua") == "not") && (bookId=="08_01_02") && (unitId==1 || unitId==2) ) ||
			( ($(this).data("sua") == "not") && (bookId=="08_02_01") && (unitId==1 || unitId==2) ) ||

			( ($(this).data("sua") == "not") && (bookId=="10_01_01") && (unitId==2 || unitId==3 || unitId==4 || unitId==5 || unitId==6|| unitId==8) )  ||
			( ($(this).data("sua") == "not") && (bookId=="10_02_01") && (unitId==1 || unitId==3 || unitId==4 || unitId==5 || unitId==6) )  ||

			( ($(this).data("sua") == "not") && (bookId=="12_01_01") && (unitId==5 || unitId==6) )  ||
			( ($(this).data("sua") == "not") && (bookId=="12_02_01") && (unitId==5 || unitId==6) )  ||

			( ($(this).data("sua") == "not") && (bookId=="13_02_01") && (unitId==8 ) ) ||


			( ($(this).data("term") == "not") && (bookId=="10_01_01") && (unitId==2 || unitId==3 || unitId==4|| unitId==8) )  ||
			( ($(this).data("term") == "not") && (bookId=="10_02_01") && (unitId==1 || unitId==3|| unitId==4|| unitId==6) ) ||
			( ($(this).data("term") == "not") && (bookId=="13_02_01") && (unitId==8 ) ) ||

			( ($(this).data("sua") == "not") && (bookId=="14_01_01") && (unitId==2) ) ||
			( ($(this).data("sua") == "not") && (bookId=="14_03_01") && (unitId==2|| unitId==3) ) ||
			( ($(this).data("sua") == "not") && (bookId=="14_04_01") && (unitId==3) )
		)
		{
			alert("본 단원에서는 선택하신 부가자료가 제공되지 않습니다.");
		}
		else
		{
			window.open( "./"+downLoadFile, "_blank");
		}
 	})
}

function setSearchList()
{
	var tag = '';
	tag += '<div id="searchList-box" class="book-popup">';
	tag += '	<div id="searchList-box-wrap">';
	tag += '		<div class="searchList-top-box">';
	tag += '			<div id="searchList-top-title" class="book-popup-title" tabindex="5001" title="내용찾기 페이지"></div>';
	tag +=				'<button data-btn="ui-btn" class="book-popup-close-btn" tabIndex="5003" role="button" title="닫기" data-main="#searchList-top-title" data-target=".icon-search-btn"></button>';
	tag += '		</div>';
	tag += '		<div id="searchList-con-box">';
	tag += '			<div id="search-wrap">';
	tag += '				<label for="search-area">찾을 내용</label>';
	tag += '				<input name="search-area" id="search-area" class="search-area" type="text" tabindex="5001" title="검색어를 입력해주세요."/>';
	tag += '				<button data-btn="ui-btn" class="search-btn" tabindex="5001" title="검색하기" aria-label="검색하기"></button>';
	tag += '			</div>';
	tag += '			<div class="unit-box"></div>';
	tag += '		</div>';
	tag += '	</div>';
	tag += '</div>';
	$("#wrap").append(tag);

	$("#searchList-box .search-btn").off("click").on("click",searchList_update);
}

function searchList_update()
{
	var thisSearch = $("#searchList-box .search-area").val();
	var allHtml = "";
	var searchNum = 0;

	if(thisSearch != "")
	{
		var thisUintData = bookData.data.listDB;
		for(var i=0; i<thisUintData.children.length; i++)
		{
			var mtitle = thisUintData.children[i].title;
			if(mtitle.indexOf(thisSearch) != -1)
			{
				searchNum += 1;
				allHtml += '<button data-btn="ui-btn" class="unit-con-txt" data-page="'+thisUintData.children[i].page+'" tabindex="5001" role="button" title="'+mtitle+'" aria-label="'+mtitle+'">';
				allHtml += 	'<div class="unit-con-txt-txt">';
				allHtml +=		'<p>' + mtitle + '</p>';
				allHtml +=	'</div>';
				allHtml +=	'<div class="unit-con-txt-page"><p>' +thisUintData.children[i].page+ '쪽</p></div>';
				allHtml +='</button>';
			}

			if(thisUintData.children[i].children)
			{
				for(var j=0; j<thisUintData.children[i].children.length; j++)
				{
					var ltitle = thisUintData.children[i].children[j].title;
					if(ltitle.indexOf(thisSearch) != -1)
					{
						searchNum += 1;
						allHtml += '<button data-btn="ui-btn" class="unit-con-txt" data-page="'+thisUintData.children[i].children[j].page+'" tabindex="5001" role="button" title="'+ltitle+'" aria-label="'+ltitle+'">';
						allHtml += 	'<div class="unit-con-txt-txt">';
						allHtml += 		'<p>' + ltitle + '</p>';
						allHtml += 	'</div>';
						allHtml += 	'<div class="unit-con-txt-page"><p>' +thisUintData.children[i].children[j].page+ '쪽</p></div>';
						allHtml += '</button>';
					}
				}
			}
		}


		if(searchNum>0)
		{
			$("#searchList-box #searchList-box-wrap").addClass("searchA");
			$("#searchList-box .unit-box").html(allHtml);
		}
	}

	var btn = $("#searchList-box [data-btn='ui-btn']").not(".book-popup-close-btn, .search-btn");

	btn.off("click").on("click",function(){
		var pageNum = Number( $(this).data("page") );
		navi.movePage( pageNum, ".icon-search-btn");
	})
}

function setBookMarkList()
{
	var tag = '';
	tag += '<div id="bookMark-box" class="book-popup">';
	tag += '	<div id="bookMark-box-wrap">';
	tag += '		<div class="bookMark-top-box">';
	tag += '			<div id="bookMark-top-title" class="book-popup-title"  tabindex="5001" title="저장된 책갈피 페이지"></div>';
	tag +=				'<button data-btn="ui-btn" class="book-popup-close-btn" tabIndex="5003" role="button" title="닫기" data-main="#bookMark-top-title" data-target=".icon-bookmark-btn"></button>';
	tag += '		</div>';
	tag += '		<div id="bookMark-con-box"></div>';
	tag += '	</div>';
	tag += '</div>';
	$("#wrap").append(tag);
}

function boomarkList_update()
{
	$("#bookMark-box .unit-con-box, #bookMark-box .unit-con-txt").remove();
	var childrenHtml="";

	var minUnit = bookData.minUnit;
	var maxUint = bookData.maxUint;
	var bookmarkTrueArr;

	var thisTit = bookData.data.listDB;

	bookmarkTrueArr = new Array();
	for( var i = Number(bookData.data.info.pageStart); i<=Number(bookData.data.info.pageEnd); i++)
	{
		if(localStorage.getItem(uniqId+"-"+i+"-bookmark") == "true")
		{
			bookmarkTrueArr.push(i);
		}
	}

	if( bookmarkTrueArr.length >= 1)
	{
		for(var i=0; i<thisTit.children.length; i++)
		{
			var isView = false;
			if( thisTit.children[i].children )
			{
				var pageTempNum = thisTit.children[i].page;
				for( var j=0; j<bookmarkTrueArr.length; j++)
				{
					if( pageTempNum==bookmarkTrueArr[j])
					{
						childrenHtml += '<div class="unit-con-box">';
						childrenHtml +=		'<button data-btn="ui-btn" class="unit-con-title" data-page="'+thisTit.children[i].page+'" tabindex="5001" title="'+thisTit.children[i].title+' '+thisTit.children[i].page+'쪽" aria-label="'+thisTit.children[i].title+' '+thisTit.children[i].page+'쪽">';
						childrenHtml +=			'<div class="unit-con-title-txt"><p>'+thisTit.children[i].title+'</p></div>';
						childrenHtml +=			'<div class="unit-con-title-page"><p>'+thisTit.children[i].page+'쪽</p></div>';
						childrenHtml +=		'</button>';
						childrenHtml +=	'<div class="unit-con-txt-box">';
					}
				}

				for(var j=0; j<thisTit.children[i].children.length; j++)
				{
					var pageTempNum = thisTit.children[i].children[j].page;
					for( var k=0; k<bookmarkTrueArr.length; k++)
					{
						if( pageTempNum==bookmarkTrueArr[k])
						{
							childrenHtml += '<button data-btn="ui-btn" class="unit-con-txt" data-page="'+thisTit.children[i].children[j].page+'" tabindex="5001" title="'+thisTit.children[i].children[j].title+' '+thisTit.children[i].children[j].page+'쪽" aria-label="'+thisTit.children[i].children[j].title+' '+thisTit.children[i].children[j].page+'쪽">';
							childrenHtml += 	'<div class="unit-con-txt-txt">';
							childrenHtml += 		'<p>'+thisTit.children[i].children[j].title+'</p>';
							childrenHtml += 	'</div>';
							childrenHtml += 	'<div class="unit-con-txt-page"><p>'+thisTit.children[i].children[j].page+'쪽</p></div>';
							childrenHtml += '</button>';
						}
					}
				}
				childrenHtml += '</div></div>';
			}
			else
			{
				var pageTempNum = thisTit.children[i].page;
				var pageTempNum2;
				var bool = false;

				if( i != thisTit.children.length-1 )
				{
					pageTempNum2 = thisTit.children[i+1].page;

				}
				else
				{
					pageTempNum2 = Number(bookData.data.info.pageEnd)+1;
				}

				for( var j=0; j<bookmarkTrueArr.length; j++)
				{
					if(pageTempNum <= bookmarkTrueArr[j] && bookmarkTrueArr[j] < pageTempNum2)
					{
						childrenHtml += '<div class="unit-con-box">';
						childrenHtml +=		'<button data-btn="ui-btn" class="unit-con-title" data-page="'+(bookmarkTrueArr[j])+'" tabindex="5001" title="'+thisTit.children[i].title+' '+(bookmarkTrueArr[j])+'쪽" aria-label="'+thisTit.children[i].title+' '+(bookmarkTrueArr[j])+'쪽">';
						childrenHtml +=			'<div class="unit-con-title-txt"><p>'+thisTit.children[i].title+'</p></div>';
						childrenHtml +=			'<div class="unit-con-title-page"><p>'+(bookmarkTrueArr[j])+'쪽</p></div>';
						childrenHtml +=		'</button>';
						childrenHtml += '</div>';

					}
				}

			}
		 }
	 }


	$("#bookMark-con-box").append(childrenHtml);

	var btn = $("#bookMark-box [data-btn='ui-btn']").not(".book-popup-close-btn");

	btn.off("click").on("click",function(){
		var pageNum = Number( $(this).data("page") );
		navi.movePage( pageNum, ".icon-bookmark-btn");
	})
}

function setPopPageList()
{
	var storageData = window.localStorage;
	if(storageData)
	{
		var length = storageData.length;
		var keyArr = new Array();

		for(var i = 0; i<length; i++)
		{
			var keyStr = storageData.key(i);
			if( (keyStr.indexOf("pack") < 0) && (keyStr.indexOf("essence") < 0)  )
			{
				keyArr.push( keyStr );
			}
		}

		for(var i = 0; i<keyArr.length; i++)
		{
			localStorage.removeItem(keyArr[i]);
		}
	}

	var resetArea = $("#middle input, #middle textarea");
	resetArea.val("");

	bookLoaer.pageLoad(bookData.curPage);
}

function setThumnail()
{
	var tag = '';
	tag += '<div id="book-thumnail" class="book-popup">';
	tag += '	<div id="book-thumnail-top">'
	tag += '		<div id="book-thumnail-top-title" class="book-popup-title" tabindex="5001" title="페이지 모아보기 페이지"></div>';
	tag +=			'<button data-btn="ui-btn" class="book-popup-close-btn" tabIndex="5003" role="button" title="닫기" data-main="#book-thumnail" data-target=".thumnail-btn"></button>';
	tag += '	</div>'

	tag += '	<div id="book-thumnail-middle">'
	tag += '		<div id="book-thumnail-obj-box">'

	for( var i = Number(bookData.minPage); i<=Number(bookData.maxPage); i++)
	{
		var txt = i+"페이지 이동";
		tag +=  '<button data-btn="ui-btn" aria-label="'+txt+'" title="'+txt+'" role="button" tabindex="5001" class="book-thumnail-obj" data-page="'+i+'">';
		tag += 		'<div class="book-thumnail-obj-img" style="background-image:url(./'+bookId+'/thumbnails/'+(i)+'.png)"></div>';
		tag += 		'<p>'+i+'</p>';
		tag +=	'</button>';
	}

	tag += '		</div>'
	tag += '	</div>'
	tag += '</div>'
	$("#wrap").append(tag);



	$("#wrap #bottom .thumnail-btn").off("click").on("click",function(){
		$("#book-thumnail").show();
		$("#book-thumnail #book-thumnail-top-title").focus();
	})

	var btn = $("#book-thumnail [data-btn='ui-btn']").not(".book-popup-close-btn");

	btn.off("click").on("click",function(){
		var pageNum = Number( $(this).data("page") );
		navi.movePage( pageNum, ".thumnail-btn");
	})
}

function pagePrint()
{
	$("#wrap").removeClass("even").removeClass("odd").addClass(pageType);
	window.print();
}
function setZoomEvent()
{
	$(".contents-box").append('<div class="zoom_overlay"></div>');

	var zoomObj = new setPanZoom();
	var zoomOverlay = $(".zoom_overlay");

	var referenceBtn = $(".icon-zoom-btn");
	referenceBtn.off("click").on("click", function(){
		zoomObj.isZoom = !zoomObj.isZoom;
		if(zoomObj.isZoom)
		{
			referenceBtn.removeClass("on").addClass("on");
			zoomObj.panzoom("enable");
			zoomOverlay.show();
		}
		else
		{
			referenceBtn.removeClass("on");
			zoomOverlay.hide();
			zoomObj.panzoom("reset");
			zoomObj.panzoom("disable");
			$(".contents-box").css("transform","none");
		}
	});
}

function setPanZoom()
{
	var _this = this;
	_this.isZoom = false;

	var target = $(".contents-box");
	target.each(function(){
		$(this).panzoom({
			minScale: 1,
			maxScale: 4,
		});

		$(this).on('click touchstart', function($e) {
			//$e.stopPropagation(); //모바일 오류남.
			//$e.preventDefault();  //모바일 오류남.

			if ($e.originalEvent && $e.originalEvent.targetTouches && $e.type!="touchend")
			{
				$e.pageX = $e.originalEvent.targetTouches[0].pageX;
				$e.pageY = $e.originalEvent.targetTouches[0].pageY;
			}
			var parentOffset = $(this).offset();
			var x = dp2lp($e.pageX - parentOffset.left);
			var y = dp2lp($e.pageY - parentOffset.top);

			//$clickedon = document.elementFromPoint($e.pageX, $e.pageY);
			$(this).panzoom(
				'zoom',
				3,
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
