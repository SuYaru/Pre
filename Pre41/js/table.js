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

   // 只有地区一个，商品多个时，地区在前。其他都是商品在前
   if(selectRegion.length==1&&selectKind.length>1){
        judging=2;
        for(var i in sourceData){
            for(var p in selectKind){
                if(sourceData[i].region==selectRegion[0]&&sourceData[i].product==selectKind[p]){
                    mappingData.unshift(sourceData[i]);
                }
            }
        }
   }else{
        judging=0;
        for(var i in sourceData){
            if(selectKind==""){         // 地区多选，商品没有  
                for(var p in selectRegion){
                    if(sourceData[i].region==selectRegion[p]){
                        mappingData.unshift(sourceData[i]);
                    }
                }
            }
            if(selectRegion==""){     // 商品多选，地区没有
                for(var p in selectKind){
                    if(sourceData[i].product==selectKind[p]){
                        mappingData.unshift(sourceData[i]);
                    }
                }
            }
            if(selectRegion.length==1&&selectKind.length==1){   // 商品地区只有一个
                if(sourceData[i].region==selectRegion[0]&&sourceData[i].product==selectKind[0]){
                    mappingData.unshift(sourceData[i]);
                }
            } 
            if(selectRegion.length>1&&selectKind.length==1){    // 商品一个，地区多个
                for(var p in selectRegion){
                    if(sourceData[i].region==selectRegion[p]&&sourceData[i].product==selectKind[0]){
                        mappingData.unshift(sourceData[i]);
                    }
                    
                }
            }

            if(selectRegion.length>1&&selectKind.length>1){     //商品和地区都是多个
                for(var p in selectRegion){
                    for(var k in selectKind){
                        if(sourceData[i].region==selectRegion[p]&&sourceData[i].product==selectKind[k]){
                            mappingData.unshift(sourceData[i]);
                        }
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
       bodyTr.setAttribute('id','data'+k);
       var length=0;
       // 商品数量为0时，mappingData/3=地区数，每个地区划分为一组
       if(mappingData.length/selectKind.length==Infinity){                  
            length=mappingData.length/3;
       }else if(mappingData.length/selectRegion.length==Infinity){  // 地区为0时，固定按3个地区为一组
            length=3;
       }else if(selectRegion.length==1||selectKind.length==1){
            // 包含商品==1，地区==1；商品>=1,地区==1；商品==1，地区>=1  只是商区/区商 的区别，由judging 判别     
            length=mappingData.length;
       }else{                                       // 商>=1,区>=1  区.length为一个商品
           length=selectRegion.length;
       }
    
        if(k%length==0&&judging==2){
            var region=document.createElement('td');
            region.setAttribute('rowspan',mappingData.length);
            region.innerHTML=mappingData[k].region;
            bodyTr.appendChild(region);
        }else if(k%length==0){
            var product=document.createElement('td');
            product.setAttribute('rowspan',length);
            product.innerHTML=mappingData[k].product;
            bodyTr.appendChild(product);
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
function loopAppend(bodyTr,currentData){
    var region=document.createElement('td');
    region.innerHTML=currentData.region;

    var product=document.createElement('td');
    product.innerHTML=currentData.product;
    
    if(judging==2){
        bodyTr.appendChild(product);
    }else{
        bodyTr.appendChild(region);
    }
    
    
    for(var i=0;i<12;i++){
        /* monthContent.appendChild(img); */
       
        bodyTr.appendChild(formThetd(currentData.sale[i]));
       /*  bodyTr.appendChild(); */
    }
    return bodyTr;
}

// 生成编辑的两个按钮
function formThetd(change){
    /* console.log("内容值"+change); */
    let td = document.createElement('td');
        let img = document.createElement('img'),
            inputData = document.createElement('input'),
            inputConfirm = document.createElement('input'),
            inputCancel = document.createElement('input'),
            textCont = document.createTextNode(change);

        img.setAttribute('src','pen.svg');
        inputData.setAttribute('type','text');
        inputData.setAttribute('value',change);
        inputConfirm.setAttribute('type','button');
        inputConfirm.setAttribute('value','确认');
        inputConfirm.setAttribute('class','sure');
        inputCancel.setAttribute('type','button');
        inputCancel.setAttribute('value','取消');
        inputCancel.setAttribute('class','cancel');

        td.appendChild(inputData);
        td.appendChild(inputConfirm);
        td.appendChild(inputCancel);
        td.appendChild(img);
        td.appendChild(textCont);
        /* bodyTr.appendChild(td); */

        img.onclick = function (event) {
            let e = event || window.event,
                target = e.target;
            target.parentNode.children[0].setAttribute("style", "display:block");
            target.parentNode.children[0].focus();
            target.parentNode.children[0].select();
            target.parentNode.children[1].setAttribute("style", "display:block");
            target.parentNode.children[2].setAttribute("style", "display:block");
            target.parentNode.children[3].setAttribute("style", "display:none");

            target.parentNode.style.textAlign = "";

        };
        inputConfirm.onclick = function(event){
            let e = event || window.event,
                target = e.target;
            let val = target.parentNode.children[0].value,
                temp = target.parentNode.textContent;
                parent=target.parentNode;
                grandparent=target.parentNode.parentNode;
            if (isNaN(val)){
                alert("请输入数字！");
                target.parentNode.children[0].value = temp;
            }else if(val === temp){
                alert("未作修改！");
            }else {
                /* let changeData = {},
                sales = [];
                console.log(val+"_______^^^^^___&&&&"+temp);
                target.parentNode.children[0].value=val; */
                
                console.log(target.parentNode.textContent);
                
                
                while(parent.hasChildNodes()){
                    parent.removeChild(parent.childNodes[0]);
                }
                
                console.log(parent);
                change=val;
                var tp=formThetd(change);
                console.log(tp);
                parent.appendChild(tp);

                
            }
           /*  getNewForm(getSelected()); */
        };
        inputCancel.onclick = function(){
            let e = event || window.event,
                target = e.target;
            target.parentNode.childNodes[0].value = target.parentNode.textContent;
        }
        inputData.onkeyup = function(event){
            let e = event || window.event,
                target = e.target;
            if (e.keyCode === 13){
                inputConfirm.onclick();
            }else if (e.keyCode === 27){
                inputCancel.onclick();
                target.parentNode.children[0].setAttribute("style", "display:none");
                target.parentNode.children[1].setAttribute("style", "display:none");
                target.parentNode.children[2].setAttribute("style", "display:none");
                target.parentNode.children[3].setAttribute("style", "display:block");
                target.parentNode.style.textAlign = "center";
            }
        };
        inputData.onblur = function (event) {
            let e = event || window.event,
                target = e.target;
            setTimeout(function () {
                target.parentNode.children[0].setAttribute("style", "display:none");
                target.parentNode.children[1].setAttribute("style", "display:none");
                target.parentNode.children[2].setAttribute("style", "display:none");
                target.parentNode.children[3].setAttribute("style", "display:block");
                target.parentNode.style.textAlign = "center";
            },150);
        };
    return td;
}
function buttonClick(ttt) {
    // addEventListener 不是一个函数
    var theTd=ttt.parentElement;
    var siblingValue=theTd.firstChild.value;
    if(!isNaN(siblingValue)){
        theTd.firstChild.outerHTML='<input type="text" onblur="blurFunc(this.value)" onmousedown="getGlobal(this.value)" value="'+siblingValue+'"></input>';
    }else{
        currentTd.firstChild.outerHTML='<input type="text" onblur="blurFunc(this.value)" onmousedown="getGlobal(this.value)" value="'+globalValue+'"></input>';
        alert("该编辑的内容不是数字！");
    }
    console.log(globalValue+"___&&&"+ttt.parentElement.previousSibling.value);


    /* inputs.addEventListener('click',function(){
        var sure = document.getElementsByClassName('sure');
        var cancel = document.getElementsByClassName('cancel');
        console.log(sure.nodeName);
    }); */
    /* let currentTd = sure.parentElement.parentElement;
    let input = parsent.firstChild;
    let value = input.value;
    sure.addEventListener('click', function () {
        if(!isNaN(input.value)){
            currentTd.firstChild.value =input.value;
        }else{
            currentTd.firstChild.value =value;
            alert("该编辑的内容不是数字！");
        }
    });
    cancel.addEventListener('click', function () {
        currentTd.firstChild.value =value;
    });
    body.addEventListener('click', function (e) {
        if (e.target.nodeName !== 'TD' && e.target.id !== "inputNum" && e.target.nodeName !== "BUTTON" && e.target.nodeName !== 'I') {

            if (LocalStorage.mutex()) {
                parsent.innerHTML = '<td>' + parsent.textContent + '</td>';

            } else {
                parsent.innerHTML = '<td>' + value + '</td>';
            }
        }
    }); 
    input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {         // 回车键
            currentTd.firstChild.value =input.value;

        } else if (e.keyCode === 27) {  // esc 键
            currentTd.firstChild.value =value;

        }

    }); */
}
