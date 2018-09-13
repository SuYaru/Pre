/*最终购买输出*/
$(function(){
    var $product = $(".pro_detail_right");
	$("#cart a").click(function(){
        var pro_name = $product.find("h4:first").text();			/* 产品名称 */
		var pro_size = $product.find(".pro_size strong").text();	/* 尺寸 */
		var pro_color =  $(".color_change strong").text();			/* 颜色 */
		var pro_num = $product.find("#num_sort").val();				/* 数量 */
	    var pro_price = $product.find(".pro_price span").text();	/* 总价 */
		var dialog="";
		if(pro_size=="未选择"){
			dialog="请选择尺寸！";
			confirm(dialog);
			return false;
		}
		dialog = " 感谢您的购买。\n您购买的\n"+
		        "产品是："+pro_name+"；\n"+
				"尺寸是："+pro_size+"；\n"+
				"颜色是："+pro_color+"；\n"+
				"数量是："+pro_num+"；\n"+
				"总价是："+pro_price +"元。";
		if( confirm(dialog) ){	/* 点击确认后的提示 */
			alert("您已经下单!");
		}
		return false;//避免页面跳转
	})
})