function setKeyEvent()
{
	$(document).keydown(function(e){
		var keyCode = e.keyCode || e.which;
		//console.log(keyCode+"  "  +  $(':focus').attr("id")+"   " +  $(':focus').attr("class") +"  keycode" +keyCode );

		if( $('#wrap :focus').has("input") || $('#wrap :focus').has("textarea") )	//enter
		{
			if(  $(':focus').val() )
			{
				$(':focus').val( $(':focus').val().replace(/[^ㄱ-힣~!@\#$%^&*\()\-=+_'\;<>0-9\/.\`:\"\\,\[\]?|{}0-9\s]/gi,"") );
			}
		}

		if(keyCode == 9)	//tab
		{
			if(e.shiftKey || keyCode == 16)	//shiftKey , back focus
			{
				if( $(':focus').hasClass("icon-gobook-btn") )
				{
					$("#ui-sub-next-btn").focus();
					e.stopPropagation();
					e.preventDefault();
				}

				if( $(':focus').hasClass("popup_title") )
				{
					$(':focus').parent().find(".popup_close_btn").focus();
					e.stopPropagation();
					e.preventDefault();
				}

				if( $(':focus').hasClass("book-popup-title")  )
				{
					$(':focus').parent().find(".book-popup-close-btn").focus();
					e.stopPropagation();
					e.preventDefault();
				}
			}
			else
			{
				if( $(':focus').attr("id") == ("ui-sub-next-btn") )
				{
					$(".icon-gobook-btn").focus();
					e.stopPropagation();
					e.preventDefault();
				}
				if( $(':focus').hasClass("popup_close_btn")  )
				{
					$(':focus').parent().find(".popup_title").focus();
					clearPageTabIndex();
					e.stopPropagation();
					e.preventDefault();
				}
				if( $(':focus').hasClass("book-popup-close-btn")  )
				{
					$( $(':focus').data("main") ).focus();
					e.stopPropagation();
					e.preventDefault();
				}
			}
		}


		//alt + 1 => 내용찾기
		if(e.altKey && keyCode == 49) { $("#wrap .icon-search-btn").trigger("click");}
		if(e.altKey && keyCode == 97) { $("#wrap .icon-search-btn").trigger("click");}

		//alt + 2 => 학습 자료실
		if(e.altKey && keyCode == 50) { $("#wrap .icon-reference-btn").trigger("click");}
		if(e.altKey && keyCode == 98) { $("#wrap .icon-reference-btn").trigger("click");}

		//alt + 3 => 대체자료
		if(e.altKey && keyCode == 51) { $("#wrap .icon-am-btn").trigger("click");}
		if(e.altKey && keyCode == 99) { $("#wrap .icon-am-btn").trigger("click");}

		//alt + 4 => 인쇄하기
		if(e.altKey && keyCode == 52) { $("#wrap .icon-print-btn").trigger("click");}
		if(e.altKey && keyCode == 100) { $("#wrap .icon-print-btn").trigger("click");}

		//alt + 5 => 목차보기
		if(e.altKey && keyCode == 53) { $("#wrap .icon-list-btn").trigger("click");}
		if(e.altKey && keyCode == 101) { $("#wrap .icon-list-btn").trigger("click");}

		//alt + 6 => 수어보기
		if(e.altKey && keyCode == 54) { $("#wrap .icon-sign-lang-btn").trigger("click");}
		if(e.altKey && keyCode == 102) { $("#wrap .icon-sign-lang-btn").trigger("click");}

		//alt + 7 => 책갈피
		if( e.altKey && keyCode == 55 ) { $("#wrap .icon-bookmark-btn").trigger("click");}
		if( e.altKey && keyCode == 103 ) { $("#wrap .icon-bookmark-btn").trigger("click");}


		//<- -> 페이지 이동
		//if(keyCode == 37) {
		//	navi.prevPage();
		//}
		//if(keyCode == 39) {
		//	navi.nextPage();
		//}

		if(keyCode == 188 & $(':focus').hasClass("volume-progress-box"))
		{
			var temp = $(':focus').parent().parent().find("video")[0];
			if( temp == undefined) temp = $(':focus').parent().parent().find("audio")[0];
			var cur = temp.volume;
			cur -= 0.01;
			if( cur < 0 ) cur = 0;
			temp.volume = cur;
		}
		if(keyCode == 190 & $(':focus').hasClass("volume-progress-box"))
		{
			var temp = $(':focus').parent().parent().find("video")[0];
			if( temp == undefined) temp = $(':focus').parent().parent().find("audio")[0];
			var cur = temp.volume;
			cur += 0.01;
			if( cur > 1 ) cur = 1;
			temp.volume = cur;
		}

		//계산기
		if( $("#calculator-pop").css("display") == "block")
		{
			$("#calculator-pop").focus();
			if(keyCode>=96 && keyCode<=105) {
				$("#c_"+(keyCode-96)).trigger("click");
			}else if(keyCode>=48 && keyCode<=57) {
				$("#c_"+(keyCode-48)).trigger("click");
			}else if(keyCode == 106) {
				$("#c_mul").trigger("click");
			}else if(keyCode == 107) {
				$("#c_add").trigger("click");
			}else if(keyCode == 109) {
				$("#c_min").trigger("click");
			}else if(keyCode == 111) {
				$("#c_div").trigger("click");
			}else if(keyCode == 13) {
				$("#c_equ").trigger("click");
			}
		}
	})

	$(document).keyup(function(e){
		var keyCode = e.keyCode || e.which;
		//console.log(keyCode+"  "  +  $(':focus').attr("id")+"   " +  $(':focus').attr("class") +"  keycode" +keyCode );

		if( $('#wrap :focus').has("input") || $('#wrap :focus').has("textarea") )	//enter
		{
			if(  $(':focus').val() )
			{
				$(':focus').val( $(':focus').val().replace(/[^ㄱ-힣~!@\#$%^&*\()\-=+_'\;<>0-9\/.\`:\"\\,\[\]?|{}0-9\s]/gi,"") );
			}
		}

		//<- -> 페이지 이동
		if(keyCode == 37) {
			navi.prevPage();
		}
		if(keyCode == 39) {
			navi.nextPage();
		}

		if(keyCode == 13 && $(':focus').hasClass("js-player") )	//enter
		{
			$(':focus').trigger("click");
			e.stopPropagation();
			e.preventDefault();
		}

		if(keyCode == 9)	//tab
		{
			//if(e.shiftKey || keyCode == 16)	//shiftKey , back focus
			clearPageTabIndex();
		}

		if(keyCode == 32)
		{
			$(".popup_view").each(function(){
				//if( $(':focus').has("") )
				//
				if( $(':focus').prop("tagName") == "BUTTON" )
				{

				}
				else
				{
					$(this).find(".js-player").trigger("click");
				}
			})
		}

		if(keyCode == 188 & $(':focus').hasClass("volume-progress-box"))
		{
			var temp = $(':focus').parent().parent().find("video")[0];
			if( temp == undefined) temp = $(':focus').parent().parent().find("audio")[0];
			var cur = temp.volume;
			cur -= 0.01;
			if( cur < 0 ) cur = 0;
			temp.volume = cur;
		}
		if(keyCode == 190 & $(':focus').hasClass("volume-progress-box"))
		{
			var temp = $(':focus').parent().parent().find("video")[0];
			if( temp == undefined) temp = $(':focus').parent().parent().find("audio")[0];
			var cur = temp.volume;
			cur += 0.01;
			if( cur > 1 ) cur = 1;
			temp.volume = cur;
		}
	})
}

function clearPageTabIndex()
{
	$("#middle *").each(function(){
		if( $(this).hasClass("focusRemove") )
		{
			$(this).removeAttr("tabIndex");
		}
	})
}
