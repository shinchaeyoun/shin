var version = "20.7";

var cssList = new Array();
cssList.push("../../css/viewer.css");
cssList.push("../../css/portrait.css");
cssList.push("../../css/landscape.css");
cssList.push("../../css/pagepop.css");

cssList.push("../../css/viewerList.css");
cssList.push("../../css/amList.css");
cssList.push("../../css/referenceList.css");
cssList.push("../../css/searchList.css");
cssList.push("../../css/bookMark.css");
cssList.push("../../css/thumnail.css");

var jsList = new Array();
jsList.push("../../01/common/plugin/spritespin.min.js");	//프레임 애니메이션
jsList.push("../../01/common/plugin/sketch.js");		//그림그리기
jsList.push("../../01/common/plugin/RecordRTC.js");		//녹음


jsList.push("../../js/utile.js");
jsList.push("../../js/uiEvent.js");
jsList.push("../../js/keyEvent.js");
jsList.push("../../01/common/js/common.js");
jsList.push("../../js/bookData.js");
jsList.push("../../js/bookloader.js");
jsList.push("../../js/booknavi.js");
jsList.push("../../01/common/js/uibutton.js");
jsList.push("../../js/pageEvent.js");
jsList.push("../../js/pageAccessibility.js");

jsList.push("../../js/quiz_video.js");
jsList.push("../../js/quiz_click.js");
jsList.push("../../js/quiz_calculator.js");
jsList.push("../../js/quiz_lineDrawing.js");
jsList.push("../../js/quiz_drawing.js");
jsList.push("../../js/quiz_dragdrop.js");
jsList.push("../../js/quiz_write.js");
jsList.push("../../js/quiz_ladder.js");
jsList.push("../../js/quiz_examin.js");
jsList.push("../../js/quiz_serch.js");

// jsList.push("raphael.min.js");
jsList.push("../../js/quiz_totheLine.js");
jsList.push("../../js/quiz_drawfull.js");
jsList.push("../../js/quiz_reco.js");
jsList.push("../../js/quiz_listening.js");
jsList.push("../../01/common/plugin/jquery.fullscreen.min.js");

/*
jsList.push("quiz_dragdrop.js");
jsList.push("quiz_img_count.js");
*/
jsList.push("../../01/common/plugin/three.min.js");
jsList.push("../../01/common/plugin/ObjectControls.js");
jsList.push("../../01/common/plugin/ObjectControls2.js");
jsList.push("../../01/common/plugin/Detector.js");

jsList.push("../../01/common/plugin/raphael.min.js");
jsList.push("../../01/common/plugin/raphael-animate-along.js");

var loadNum = cssList.length + jsList.length;
var cssChkNum = 0;
var jsChkNum = 0;
$(window).on("load",function(){
	cssLoader();
	jsLoader();
});

function cssLoader()
{
	var css = document.createElement('link');
	css.rel = "stylesheet";
	css.type = "text/css";
	css.href = "../common/css/"+cssList[cssChkNum]+"?"+version+Math.random();
	var done = false;
	css.onload = css.onreadystatechange = function(){
		if( !done )
		{
			done = true;
			++cssChkNum;
			linkLoadComplet();
		}
	}
	document.getElementsByTagName("head")[0].appendChild( css );

	function linkLoadComplet()
	{
		if( cssChkNum < cssList.length ) cssLoader();
		else loadComplte();
	}
}

function jsLoader()
{
	var script = document.createElement('script');
	script.src = "../common/js/"+jsList[jsChkNum]+"?"+version+Math.random();
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

			++jsChkNum;
			linkLoadComplet();
		}
	};
	document.getElementsByTagName( "head" )[0].appendChild(script);

	function linkLoadComplet()
	{

		if( jsChkNum < jsList.length )  jsLoader();
		else loadComplte();
	}
}

function loadComplte()
{
	if(cssChkNum == cssList.length && jsChkNum == jsList.length )
	{
		initialize();
	}
}
