/*首页广告效果*/
$(function(){
     var len  = $(".num > li").length;
	 var index = 0;
	 var adTimer;
	 $(".num li").mouseover(function(){
		index  =   $(".num li").index(this);
		showImg(index);
	 }).eq(0).mouseover();	
	 //滑入 停止动画，滑出开始动画.
	 $('.ad').hover(function(){
			 clearInterval(adTimer);
		 },function(){
			adTimer = setInterval(function(){
			    showImg(index)
				index++;
				if(index==len){
					index=0;
				}
			} , 3000);
	 }).trigger("mouseleave");
})
// 通过控制top ，来显示不同的幻灯片
// 如果换成向左滑动，会造成一段背景色的空白
// 而图片会突然显示出来
function showImg(index){	
        var adW = $(".content_right .ad").width();
		$(".slider").stop(true,false).animate({left : -adW*index},1000);
		$(".num li").removeClass("on")
			.eq(index).addClass("on");
}