// 生成一组CheckBox
function generateCheckBoxs(ratioBox,data){
    ratioBox=genCheckBox(ratioBox,data);
    var childrens=ratioBox.children;
    var length=childrens.length-1;
    childrens[0].onclick=function(){
          setAllTrue(childrens);
          getNewForm(getSelected());
    }
    for(var k=1;k<=length;k++){
        childrens[k].onclick=function(){
            var count=0;
            for(var p=1;p<=length;p++){
                if(childrens[p].checked){
                    count++;
                }
            }
            if(count==length){
                  setAllTrue(childrens);
            }else if(count>0){
                setFalse(childrens);
            }else{
               this.checked=true;
            }
            getNewForm(getSelected());
        }
    }
}
// 生成CheckBox appendChild 
function genCheckBox(RatioBox,data){
    var all=document.createElement('input');
    all.setAttribute('type','checkbox');
    all.setAttribute('value','1');
    RatioBox.appendChild(all);
    var temp=document.createTextNode("全选");
    RatioBox.appendChild(temp);

    for(var d=0; d<data.length;d++){
        var choosing=document.createElement('input');
        choosing.setAttribute('type','checkbox');
        choosing.setAttribute('value',data[d].text);
        /* choosing.setAttribute('oninput',"childrenFunc()"); */
        var p=document.createTextNode(data[d].text);
        RatioBox.appendChild(choosing);
        RatioBox.appendChild(p);
    }
    return RatioBox;
}
// 点击全选时，如果单个选项中只要有一个不是被选上的状态，则进行全选操作
function setAllTrue(childrens){
    for(var p in childrens){
        childrens[p].checked=true;
    }
    return childrens;
}

// 其中一个取消勾选时，全选按钮取消勾选
function setFalse(childrens){
     childrens[0].checked=false;
}

