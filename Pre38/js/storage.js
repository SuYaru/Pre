
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
    
    
    /* mutex: function () {
        let tableWrapper = document.getElementById('table-wrapper');
        let input = tableWrapper.getElementsByTagName('input');
        if (input.length !== 0) {
            return false
        } else {
            return true;
        }
    } */

