(function ($) {
$.bookUtils =
{
	getURLParam: function(strParamName)
	{
		var strReturn = "";
		var strHref = window.location.href;
		var bFound=false;
		var cmpstring = strParamName + "=";
		var cmplen = cmpstring.length;
		if ( strHref.indexOf("?") > -1 )
		{
			var strQueryString = strHref.substr(strHref.indexOf("?")+1);
			var aQueryString = strQueryString.split("&");

			for ( var iParam = 0; iParam < aQueryString.length; iParam++ )
			{
				if (aQueryString[iParam].substr(0,cmplen)==cmpstring)
				{
					var aParam = aQueryString[iParam].split("=");
					strReturn = aParam[1];
					bFound=true;
					break;
				}
			}
		}
		if (bFound==false) return null;
		return strReturn;
	},

	itostr: function($num)
	{
		if( $num < 10 ) return "0"+$num;
		else return $num;
	},

	pageChk: function($page)
	{
		var pageChk = ( ($page%2) != 0 ) ? "left" : "right";
		return pageChk;
	},

	numToKorean: function(num)
	{
		//고민중...
		var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
		var danA = new Array("","십","백");
		var result = "";
		for(i=0; i<num.length; i++)
		{
			str = "";
			han = hanA[num.charAt(num.length-(i+1))];

			if(han != "") str += han+danA[i];

			result = str + result;
		}
		return result ;
	},

	getSecToTime:function ( $num )
	{
		var minute = 0;
		var second = Math.floor( $num );

		minute = Math.floor( second / 60 );
		second = Math.floor( second % 60 );

		return $.bookUtils.itostr( minute ) + ":" + $.bookUtils.itostr( second );
	}
}
})(jQuery);
