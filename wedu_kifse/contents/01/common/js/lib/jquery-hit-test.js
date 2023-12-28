/*$.fn.hitTestObject = function(obj){
	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();
	var compare = obj.offset();
	compare.right = compare.left + obj.outerWidth();
	compare.bottom = compare.top + obj.outerHeight();
	return (!(compare.right < bounds.left || compare.left > bounds.right || compare.bottom < bounds.top || compare.top > bounds.bottom));
}
*/
$.fn.hitTestObject = function(obj){
	var bounds = this.offset();
	bounds.right = dp2lp(bounds.left) + dp2lw( this.outerWidth() );
	bounds.bottom = dp2lp(bounds.top) + dp2lw( this.outerHeight() );
	var compare = obj.offset();
	compare.right = dp2lp(compare.left) + dp2lw( obj.outerWidth() );
	compare.bottom = dp2lp(compare.top) + dp2lw( obj.outerHeight() );
	return (!(compare.right < dp2lp(bounds.left) || dp2lp(compare.left) > bounds.right || compare.bottom < dp2lp(bounds.top) || dp2lp(compare.top) > bounds.bottom));
}

$.fn.hitTestPoint = function(px, py) {
	var mx = px;
	var my = py;

	var bounds = this.offset();
	var mT = bounds.top;
	var mB = bounds.top + this.outerHeight();
	var mL = bounds.left;
	var mR = bounds.left + this.outerWidth();

	return (mx <= mR && mx >= mL && my <= mB && my >= mT);
}