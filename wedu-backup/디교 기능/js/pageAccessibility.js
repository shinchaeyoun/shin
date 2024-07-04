function pageAccessibilitySetting()
{
	//tabindex가 미리 다 입력 되어 있지 않고 도중에 추가 되면 ie에서 순서가 꼬임
	var leftTabIndex = 1;
	var reftTabIndex = 1001;
	var mainTarget = $("#middle");
	var leftTarget = mainTarget.find("#left-box");
	var rightTarget = mainTarget.find("#right-box");

	setPageAccessibility(leftTarget, leftTabIndex);
	setPageAccessibility(rightTarget, reftTabIndex);
}

function setPageAccessibility($target, $index)
{
	var target = $target;
	var index = $index;

	target.find(".t").each(function(){
		$(this).attr("aria-hidden","true");
	});

	target.find(".s_reader-num").each(function(){
		$(this).attr("aria-hidden", "false");
		var tabIndexNum = index+2;
		$(this).attr("tabIndex",tabIndexNum);

		$(this).attr("role","text");
		if( $(this).attr("title") )
		{
			$(this).attr("title", $(this).attr("title")+" 페이지");
			$(this).attr("aria-label", $(this).attr("title") );
		}
		else
		{
			$(this).attr("title", $(this).text()+" 페이지");
			$(this).attr("aria-label", $(this).text()+" 페이지");
		}
	});

	target.find(".s_reader-txt").each(function(){
		$(this).attr("aria-hidden", "false");
		var tabIndexNum = index+3;
		$(this).attr("tabIndex",tabIndexNum);

		$(this).attr("role","text");
		if($(this).attr("title") == undefined) $(this).attr("title",$(this).text().replace(/\n/g, '').replace(/mL/g, "밀리리터").replace(/L/g, "리터"));
		$(this).attr("aria-label", $(this).attr("title").replace(/mL/g, "밀리리터").replace(/L/g, "리터") );
	});


	target.find("[data-btn='page-btn']").each(function(){
		$(this).removeData("btn");
		$(this).removeAttr("data-btn");

		var tabIndexNum = index+3;
		var title = $(this).attr("title");

		if( $(this).attr("tabIndex") )
		{
			//직접입력한 경우 공통코드 미적용.
		}
		else
		{
			$(this).attr("tabIndex",tabIndexNum);
		}
		$(this).attr("role","button");
		$(this).attr("aria-label", title);
	});

	target.find(".popup_view").each(function(){
		var tabIndexNum = index+4;

		$(this).attr("tabIndex",tabIndexNum);
		$(this).attr("title", "팝업 영역");
		$(this).attr("aria-label", "팝업 영역" );
		// $(this).attr("role","text");
	})

	target.find(".popup_title").each(function(){
		var tabIndexNum = index+5;

		$(this).attr("tabIndex",tabIndexNum);
		if( $(this).attr("title") )
		{
			$(this).attr("aria-label", $(this).attr("title") );
		}
		else
		{
			$(this).attr("title", $(this).text().replace(/\n/g, '').replace(/mL/g, "밀리리터").replace(/L/g, "리터")  );

			$(this).attr("aria-label", $(this).attr("title") );
		}
		$(this).attr("role","text");
	})
	target.find(".speaker_rubric").each(function(){
		if( $(this).attr("tabIndex") )
		{
			//직접입력한 경우 공통코드 미적용.
		}
		else
		{
			var tabIndexNum = index+5;
			$(this).attr("tabIndex",tabIndexNum);
		}

		$(this).attr("title", $(this).text()  );
		$(this).attr("aria-label", $(this).text() );
		$(this).attr("role","text");
	})

	target.find("[data-btn='event-btn']").each(function(){
		$(this).removeData("btn");
		$(this).removeAttr("data-btn");

		var tabIndexNum = index+10;
		if($(this).attr("title") == undefined) $(this).attr("title", "대체텍스트 없음");
		var title = $(this).attr("title");

		if( $(this).attr("tabIndex") )
		{
			//직접입력한 경우 공통코드 미적용.
		}
		else
		{
			$(this).attr("tabIndex",tabIndexNum);
		}
		$(this).attr("role","button");
		$(this).attr("aria-label", title);
	});
	target.find(".essence-btn").each(function(){
		$(this).attr("title", "에센스 버튼");
		$(this).attr("aria-label", "에센스 버튼");
	})


	target.find(".prev_paging_btn").each(function(){
		var tabIndexNum = index+997;
		$(this).attr("tabIndex",tabIndexNum);
		$(this).attr("title","이전 활동으로 돌아가기");
		$(this).attr("aria-label","이전 활동으로 돌아가기");
		$(this).attr("role","button");
	})
	target.find(".next_paging_btn").each(function(){
		var tabIndexNum = index+998;
		$(this).attr("tabIndex",tabIndexNum);
		$(this).attr("title","다음 활동으로 넘어가기");
		$(this).attr("aria-label","다음 활동으로 넘어가기");
		$(this).attr("role","button");
	})

	target.find(".popup_close_btn").each(function(){
		var tabIndexNum = index+999;
		var title = $(this).attr("title");

		$(this).attr("tabIndex",tabIndexNum);
		if( $(this).attr("title") )
		{
			$(this).attr("aria-label", $(this).attr("title") );
		}
		else
		{
			$(this).attr("title","활동창 닫기");
			$(this).attr("aria-label","활동창 닫기");
		}
		$(this).attr("role","button");
	});
	target.find("img").each(function()
	{
		if($(this).attr("alt") == undefined) $(this).attr("alt", "대체텍스트 없음");

		if( $(this).attr("alt") != "대체텍스트 없음" && $(this).attr("title") == undefined ) $(this).attr("title", $(this).attr("alt") );
	})
}
