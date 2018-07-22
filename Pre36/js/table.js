// 根据checkbox选项获取数据
function getSelected(){
    mappingData=[];
    selectRegion=[];                    // 地区类
    selectKind=[];                      // 商品类

   /* region  获取地区类所选属性*/
  
   for(var k=1;k<=regionRatio.children.length-1;k++){
       if(regionRatio.children[k].checked){
           selectRegion.unshift(regionRatio.children[k].value);
       }
   }

   /* 获取商品种类选项的值 */
   for(var k=1;k<=productRatio.children.length-1;k++){
       if(productRatio.children[k].checked){
           selectKind.unshift(productRatio.children[k].value);
       }
   }
   // 地区多选，商品没有时
   if(selectRegion.length>=1&&selectKind.length==0){
       judging=0;
        for(var i in sourceData){
            for(var p in selectRegion){
                if(sourceData[i].region==selectRegion[p]){
                    mappingData.unshift(sourceData[i]);
                }
                
            }
        }
   }
   // 商品多选，地区没有时
   if(selectKind.length>=1&&selectRegion.length==0){
       judging=0;
        for(var i in sourceData){
            for(var p in selectKind){
                if(sourceData[i].product==selectKind[p]){
                    mappingData.unshift(sourceData[i]);
                }
            }
        }
   }
   // 地区和商品都只有一个 
   if(selectRegion.length==1&&selectKind.length==1){
       judging=0;
        for(var i in sourceData){
            if(sourceData[i].region==selectRegion[0]&&sourceData[i].product==selectKind[0]){
                mappingData.unshift(sourceData[i]);
            }
        }
   }
   // 商品选择了一个，地区选择了多个的时候 :商品在前，地区在后
   if(selectRegion.length>1&&selectKind.length==1){
       judging=1;
        for(var i in sourceData){
            for(var p in selectRegion){
                if(sourceData[i].region==selectRegion[p]&&sourceData[i].product==selectKind[0]){
                    mappingData.unshift(sourceData[i]);
                }
                
            }
        }
   }
   // 当地区选择了一个，商品选择了多个的时候 ： 商品在后，地区在前
   if(selectRegion.length==1&&selectKind.length>1){
       judging=2;
        for(var i in sourceData){
            for(var p in selectKind){
                if(sourceData[i].region==selectRegion[0]&&sourceData[i].product==selectKind[p]){
                    mappingData.unshift(sourceData[i]);
                }
                
            }
        }
   }
   // 商品和地区都选择了多于一个的情况下:商品作为第一列，地区作为第二列
   if(selectRegion.length>1&&selectKind.length>1){
       judging=1;
        for(var i in sourceData){
            for(var p in selectRegion){
                for(var k in selectKind){
                    if(sourceData[i].region==selectRegion[p]&&sourceData[i].product==selectKind[k]){
                        mappingData.unshift(sourceData[i]);
                    }
                }
            }
        }
   }
    return mappingData;
}

// 渲染新的表格
function getNewForm(mappingData){
    BarFunc(mappingData);                   // 勾选以后才触发
    LineFunc(mappingData);
    
    // 若原来有table，则先删除
    while(tableWrapper.hasChildNodes()){
        tableWrapper.removeChild(tableWrapper.firstChild);
    }
    var table=document.createElement('table');
    var thead=document.createElement('thead');
    thead.appendChild(generateHead());
    table.appendChild(thead);                       // 遍历表头并存储
    
    var tbody=document.createElement('tbody');
    tbody.setAttribute('class','thebody');
    table.appendChild(tbody);                       // 创建表格体

    // 遍历数据
    for(var k in mappingData){
       var bodyTr=document.createElement('tr');
       if(k%selectRegion.length==0&&judging==1){
            var product=document.createElement('td');
            product.innerHTML=mappingData[k].product;
            product.setAttribute('rowspan',selectRegion.length);
            bodyTr.appendChild(product);
       }else if(k==0&&judging==2){
            var region=document.createElement('td');
            region.innerHTML=mappingData[k].region;
            region.setAttribute('rowspan',mappingData.length);
            bodyTr.appendChild(region);
       }
       bodyTr=loopAppend(bodyTr,mappingData[k]);
       tbody.appendChild(bodyTr);
        
        
    }
    tableWrapper.appendChild(table);
}

// 遍历生成新的表头
function generateHead(){
    var theTr=document.createElement('tr');
    theTr.setAttribute('class','list');
    var productName=document.createElement('td');
    productName.innerHTML="商品";
    var addr=document.createElement('td');
    addr.innerHTML="地区";
    if(judging==0||judging==1){
        theTr.appendChild(productName);
        theTr.appendChild(addr);
    }else{
        theTr.appendChild(addr);
        theTr.appendChild(productName);
    }
   
    for(var j=1;j<=12;j++){
        var month=document.createElement('td');
        month.innerHTML=j+"月";
        theTr.appendChild(month);
    }
    return theTr;
}

// 遍历数据
function loopAppend(bodyTr,mappingData){
    var region=document.createElement('td');
    region.innerHTML=mappingData.region;
    var product=document.createElement('td');
    product.innerHTML=mappingData.product;

    if(judging==1){
        bodyTr.appendChild(region);
    }else if(judging==2){
        bodyTr.appendChild(product);
    }else{
        bodyTr.appendChild(product);
        bodyTr.appendChild(region);
    }
    
    
    for(var i=0;i<12;i++){
        var monthContent=document.createElement('td');
        monthContent.innerHTML=mappingData.sale[i];
        bodyTr.appendChild(monthContent);
    }
    return bodyTr;
}