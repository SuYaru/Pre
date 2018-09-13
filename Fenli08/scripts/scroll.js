/*新闻滚动*/
$(function(){
        var $this = $(".scrollNews");
	var scrollTimer;
	// 当鼠标 hover 时，清除 scroll 滚动
	// hover 对应的是 mouseenter mouseleave
	$this.hover(function(){
			clearInterval(scrollTimer);
	},function(){
	// setInterval(function(){ 定义函数 },间隔时间)
	scrollTimer = setInterval(function(){
					scrollNews( $this );
			}, 1000);
	}).trigger("mouseleave");	// 进入页面时就会触发第二个函数
						// 当然不可能一进页面就是mouseleave
						// 默认触发 mouseleave
});
function scrollNews(obj){
   var $self = obj.find("ul:first"); 
   var lineHeight = $self.find("li:first").height(); //获取行高
   $self.animate({ "marginTop" : -lineHeight +"px" }, 600 , function(){
	   $self.css({marginTop:0});	// 不再缩进，顶部显示第二条内容，否则 第二条也会被缩进
	   $self.find("li:first").appendTo($self); //appendTo能直接移动元素
	   							// 找到指定元素，并移动到目标元素的末尾
   })
}