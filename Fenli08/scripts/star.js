/*商品评分效果*/
$(function(){
	//通过修改样式来显示不同的星级
	// ul>li*6.one>a[title=$星]
    $("ul.rating li a").click(function(){
	     var title = $(this).attr("title");
	     alert("您给此商品的评分是："+title);
		 var cl = $(this).parent().attr("class");
		 // rating 后有空格，表明与之后是两个类
		 $(this).parent().parent().removeClass().addClass("rating "+cl+"star");	
		 //$(this).blur();//去掉超链接的虚线框
		 return false;
	})
})