/*滑过图片出现放大镜效果*/
$(function(){
      $(".content_right .prolist ul li").each(function(index){
				// 相对于父辈元素(position 为 absolute 或者relative)的 left 和 top 属性
				// 每个 li 的位移都不一样
			  var position = $(this).position();	
			  var li_left = position.left;
				var li_top = position.top;
			  var img_width = $(this).find("img").width();
				var img_height = $(this).find("img").height();
				// 设定 spanHtml 位置与 li 相符，高度宽度 与 img 相同
				var spanHtml = '<span style="position: absolute; top: '+li_top+'px; left: '+li_left
					+'px; width:'+img_width+'px; height: '+img_height+'px; cursor: pointer;" class=""></span>';
			  $(spanHtml).hover(function(){
						$(this).addClass("imageOver");	// 这里的 $(this) 是 $(spanHtml)
				 },function(){
						$(this).removeClass("imageOver");
				 }).appendTo( $(this).find("a") );	// 这里的 $(this) 是 li
				 																		// 将 $(spanHtml) 加到 a 标签尾部
		 })
		 /* $(".prolist .prolist_content ul li").each(function(){
				 // 得到 li的位置
				 var position =$(this).position();
				 var li_left=position.left;
				 var li_top=position.top;
				 // 得到 img 的大小
				 var img_height=$(this).find("img").height();
				 var img_width=$(this).find("img").width();
				 var span='<span style="position:absolute;top:'+li_top+'px;left:'+li_left
				 +'px;width:'+img_width+'px;height:'+img_height+'px;cursor:pointer;" class=""></span>';
				 $(span).hover(function(){
					 $(this).addClass("imageOver");
				 },function(){
					$(this).removeClass("imageOver");
				 }).appendTo($(this).find("a"));
		 }); */

})