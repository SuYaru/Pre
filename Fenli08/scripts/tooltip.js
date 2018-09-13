/*超链接文字提示*/
$(function(){
    var x = 10;  
	var y = 20;
	$("a.tooltip").mouseover(function(e){
       	this.myTitle = this.title;
		this.title = "";	
	    var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>"; //创建 div 元素
		$("body").append(tooltip);	//把它追加到文档中
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",
				"left": (e.pageX+x)  + "px"
			}).show("fast");	  //设置x坐标和y坐标，并且显示
    }).mouseout(function(){		
		this.title = this.myTitle;
		$("#tooltip").remove();   //移除 
    }).mousemove(function(e){
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",
				"left": (e.pageX+x)  + "px"
			});
	});

	// 获取当前超链接的 title	考虑鼠标 放入、移出、移动 三个情况
	/* $(".tooltip").mouseenter(function(e){
		// 获取到 当前的 title
		this.mytitle=this.title;
		this.title="";	// 显示自定义的 提示内容时，确保原有的 title 不会显示
		// 标注为 id='tooltip ' 也是为了之后使用
		var tip="<div id='tooltip'>"+this.mytitle+"</div>";
		$("body").append(tip);
		tip.css({
			"top":(e.pageY+y)+"px",
			"left":(e.pageX+x)+"px"
		}).show(normal);
	}).mouseleave(function(){
		this.title=this.mytitle;
		$("#tooltip").remove();	// 移除自己这个新建元素
	}).mousemove(function(){
		$("#tooltip").css({
			"top":(e.pageY+y)+"px",
			"left":(e.pageX+x)+"px"
		});
	}); */
})