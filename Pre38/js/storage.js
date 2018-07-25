
     save.onclick = function () {
        let data = [];
        let tableWrapper = document.getElementById('table-wrapper');
        let k = 0;
        for (let i = 0; i < inputs.length; i++) {
            
            if (isNaN(inputs[i].value) == false) {
                data.push(inputs[i].value);

            }
        }
        for(var i=0;i<data.length/12;i++){
            for(var j=0;j<12;j++){
                if(k<data.length){
                    console.log(i+"___"+j+"^^^^^"+data[k]);
                    localStorage["data" + i + j]=data[k++];
                }
            }
        }
    }

    function blurFunc(sor){
        if(isNaN(sor)){
            alert('当前值'+sor+"不是数值");
        }   
    }
    function getGlobal(transmmition){
        globalValue=transmmition;
    }
    function buttonClick(ttt) {
        // addEventListener 不是一个函数
        var theTd=ttt.parentElement.parentElement;
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
    
    /* mutex: function () {
        let tableWrapper = document.getElementById('table-wrapper');
        let input = tableWrapper.getElementsByTagName('input');
        if (input.length !== 0) {
            return false
        } else {
            return true;
        }
    } */

