/*产品树展开和关闭*/
$(function(){
	   $(".m-treeview > li > span").click(function(){ // 注意用的是 子选择器 (  >  )
			    var $ul = $(this).siblings("ul");
				if($ul.is(":visible")){
					// 更换背景图标
					$(this).parent().attr("class","m-collapsed");
					$ul.hide();
				}else{
					$(this).parent().attr("class","m-expanded");
					$ul.show();
				}
				return false;
	   })
	   // 找到当前的 span，1、为父节点更换 class 2、兄弟 Ul 显示与隐藏
	   /* $(".procatalog>ul>li>span").click(function(){
		   var $ul=$(this).siblings("ul");
		   if($ul.is(":visible")){
				$(this).parent().attr("class","m-collapsed");
				$ul.hide();
		   }else{
				$(this).parent().attr("class","m-expanded");
				$ul.show();
		   }
	   }); */
})