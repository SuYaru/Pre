// 柱状图函数
function BarFunc(bardata){
    var svg=document.getElementById('svgCont');
    var text="";
    
    
    text += '<text font-size="20" x=220 y="30">'+"销售情况柱状图"+'</text>';   //设定标题
    svg.innerHTML=formingBar(bardata,text);         // 形成柱状图


}

// 构造柱状图
function formingBar(bardata,text){
    let max =getMax(bardata);
    let ratio =300/ max;

    // 坐标轴
    text += '<line x1="25"  x2="1000" y1="' + 360 + '" y2="' + 360 +
    '" stroke="black" stroke-width="2" />';
    text += '<line x1="25"  x2="25" y1="' + 360 + '" y2="' + 50 +
    '" stroke="black" stroke-width="2" />';
    
    // 参照线
    let y = 60;
    let num = 0;
    for (let i = 0; i <= 5; i++) {
        text += '<line x1="25" x2="1000" y1=' + y + ' y2=' + y + ' stroke="blue"' +
            'stroke-opacity="1" stroke-width="1"/>';
        text += '<text font-size="11" x=0 y=' +y+ '>' + (420 - num) + '</text>';
        y += 50; //坐标
        num += 70; //参照物数字
    }

    //数字为0
    text += '<text  font-size="11" x=0 y=360>' + 0 + '</text>';
    //绘制月份
    for(var k=0;k<bardata.length;k++){
        var color=barColor[bardata[k].product];
        let barX = 80;
        for (let i = 0; i < 12; i++) {
            if(k==0){
                let month = (i + 1) + '月';
                //柱状图的文字
                text += '<text fill="#277DF4" font-size="15" x=' + (barX - 20) + ' y=380>' + month + '</text>';
                //分隔线
                text += '<line x1=' + (barX+25) + ' x2=' + (barX+25) +
                    ' y1="350" y2="360" stroke-width="2" stroke="black"/>';
            }
            //数据
            text += '<rect id="rect" width=20' + ' height=' + parseInt(bardata[k].sale[i]*ratio) + ' x=' + (barX-k*25) + ' y='+(360-parseInt(bardata[k].sale[i]*ratio))+' fill="'+color+'"/>';
            barX += 80;
        }
        
    }
    text+='<text font-size="15" x=0 y=400>红色：手机；蓝色：笔记本；紫色：智能音箱</text>';
    return text;
}

// 获取最大值
function getMax(mappingData){
    var max=0;
    for(var i in mappingData){
        for(var k in mappingData[i].sale){
            if(mappingData[i].sale[k]>max){
                max=mappingData[i].sale[k];
            }
        }
    }
    return max;
}

// 折线图函数
function LineFunc(linedata){
    let ctx = canvasWrapper.getContext("2d");
    ctx.clearRect(0, 0, 800, 500);

    ctx.font="13px Georgia";
    ctx.fillText("销售情况折线图", 400,13);
    
    let max =getMax(linedata);
    let ratio =300/ max;

   formingline(ctx);
   picline(ctx,mappingData);

}

// 构造折线图
function formingline(ctx){
    //纵横初始坐标位置
    let startX = 20;
    let endX = 1000;
    let startY = 20;
    let endY = 450;

    let y = 30;
    let lineX = 60;
    let num = 0;

        ctx.beginPath();
        ctx.moveTo(startX, endY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.moveTo(startX + 5, startY);
        ctx.lineTo(startX + 5, endY + 5);
        ctx.stroke();

        for (let i = 0; i <= 5; i++) {
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(1000, y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'black';
            ctx.stroke();

            ctx.fillStyle = '#277DF4';
            ctx.fillText(720 - num, 0, y);
            y += 70; //坐标
            num += 120; //参照物数字
            
        }
        ctx.fillText('0', 0,450);
        //创建下标与月份
        for (let i = 0; i < 12; i++) {
            //折线的月份
            let month = (i + 1) + '月';
            ctx.fillStyle = '#277DF4';
            //文字
            ctx.fillText(month, (lineX - 5), (endY + 15));
        
            ctx.beginPath();
            ctx.moveTo(lineX, endY);
            ctx.lineTo(lineX, (endY + 5));
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
            lineX +=60;
        }
        
}
// 绘制折线图
function picline(ctx,mappingData){
    //最大值与比例
    let max = this.getMax(mappingData);
    let ratio =420/ max;

    
    for (let i = 0; i <mappingData.length; i++) {
        let lineX =60;
        let color=barColor[mappingData[i].product];
        for(let j=0;j<mappingData[i].sale.length;j++){
            //圆点
            ctx.beginPath();
            ctx.arc(lineX, ((max - mappingData[i].sale[j]) * ratio), 2.5, 0, 2 * Math.PI);
            ctx.fillStyle = '#277DF4';
            ctx.fill();
            if (j !== 0) {
                //绘制连线
                ctx.beginPath();
                ctx.moveTo((lineX -60), parseInt((max -  mappingData[i].sale[j-1]) * ratio));
                ctx.lineTo(lineX, parseInt((max -  mappingData[i].sale[j]) * ratio));
                ctx.strokeStyle =color;
                ctx.stroke();
            }
            lineX +=60;
        }
    }
    ctx.fillStyle="#CD8500";
    ctx.fillText("红色：手机；蓝色：笔记本；紫色：智能音箱",120,500);
}