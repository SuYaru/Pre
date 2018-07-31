function gethover(){
    tableWrapper.onmouseover = function (e) {
        if (e.target.nodeName === 'TD') {
            let data = [];
            var tds = e.target.parentElement.getElementsByTagName('td');
            let tr = e.target.parentElement;
            var fistContent="";                     // 得到当前行的第一个值
            var secondContent="";                   // 第二个值
            
            
            if(tds[0].innerHTML!="商品"&&tds[1].innerHTML!="地区"){
                fistContent=tds[0].innerHTML;        
                secondContent=tds[1].innerHTML;
                
                while(!(isNaN(tds[0].innerHTML)&&isNaN(tds[1].innerHTML))){     //当其中一个为数字时，false ，寻找它之前的兄弟节点
                    tr=tr.previousSibling;
                    tds=tr.children;
                    secondContent=tds[0].innerHTML;
                }
            }
            for (let i = 0; i < sourceData.length; i++) {
                if ((sourceData[i]['region'] === fistContent&&sourceData[i]['product'] ===secondContent)||(sourceData[i]['product'] === fistContent&&sourceData[i]['region'] ===secondContent)) {
                    data.unshift(sourceData[i]);
                }
            }
            
            

            LineFunc(data);
            BarFunc(data);
        }
    }
    tableWrapper.onmouseout = function (e) {
        if (e.target.nodeName != 'TD') {
            LineFunc(mappingData);
            BarFunc(mappingData);
        }
    }
}
