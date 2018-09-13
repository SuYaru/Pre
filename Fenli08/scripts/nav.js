//导航效果（兼容IE6）
$(function(){
	   $("#navigation ul li:has(ul)").hover(function(){
		   // stop(true,true) 第一个true，立马停止现在的动画，第二个true 当前正在执行的动画立马完成
			$(this).children("ul").stop(true,true).slideDown(400);
        },function(){
		    $(this).children("ul").stop(true,true).slideUp("fast");
		});
		// $("#navigation ul li:has(ul)")  此时的 $(this) 指向的是 li 
})