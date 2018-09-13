/*模块展开和关闭*/
$(function(){
	$(".module_up_down").toggle(function(){
			var $self = $(this);
			// slideToggle 切换显示与隐藏,之前的大 div 设定显示与隐藏
			$self.prev().slideToggle(600,function(){
				// 如果不指定 $(this),会将所有的 img 全部替换
				$("img",$self).attr("src","images/up.gif");
			});
		},function(){
			var $self = $(this);
			$self.prev().slideToggle(600,function(){
				$("img",$self).attr("src","images/down.gif");
			});
	});
		 
})