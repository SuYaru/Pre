/*衣服尺寸选择*/
$(function(){
	$(".pro_size li span").click(function(){
		$(this).parents("ul").siblings("strong").text(  $(this).text() );
	})
})
/*数量和价格联动*/
$(function(){
    var $span = $("div.pro_price span");
	var price = $span.text();	// 获取的是页面的最初值
	$("#num_sort").change(function(){
		console.log(price);
	    var num = $(this).val();
		var amount = num * price;
		$span.text( amount );
	}).change();
})
