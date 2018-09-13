/*衣服颜色切换*/
$(function(){
	$(".color_change ul li img").click(function(){           
		  var imgSrc = $(this).attr("src");
		  var i = imgSrc.lastIndexOf(".");
		  var unit = imgSrc.substring(i);
		  imgSrc = imgSrc.substring(0,i);
		  var imgSrc_small = imgSrc + "_one_small"+ unit;
		  var imgSrc_big = imgSrc + "_one_big"+ unit;
		  $("#bigImg").attr({"src": imgSrc_small ,"jqimg": imgSrc_big });
		  $("#thickImg").attr("href", imgSrc_big);
		  var alt = $(this).attr("alt");
		  $(".color_change strong").text(alt);
		  var url = imgSrc+".html";	// images/pro_img/yellow.html
		  // 如果 chrome 报错，修改 chrome 启动参数
		  // chrome快捷方式–右键“属性”–快捷方式–目标 
		  // --args
		  // --allow-file-access-from-files : 允许本地Ajax请求，也叫file协议下的Ajax请求 
		  // --enable-file-cookies : 允许chrome保存本地设置cookie
		  // 加载 html 里的内容 切换<li> 里的显示 
		  $(".pro_detail_left ul.imgList")
				.empty()
				.load(url);
	});
});