function storage(newData) {
    if (window.localStorage) {
        let storage = window.localStorage;
        if (storage.getItem("newData")){
            let storeData = storage.getItem("newData");
            let da = JSON.parse(storeData);
            for (let i=0;i<da.length;i++) {
                if (newData.product == da[i].product && newData.region === da[i].region){
                    da[i].sale = newData.sale;
                    let d2 = JSON.stringify(da);
                    storage.setItem("newData",d2);
                    return true; //结束函数
                }
            }
            da.push(newData);
            let d2 = JSON.stringify(da);
            storage.setItem("newData",d2);
        } else{
            let newSourceData = [];
            newSourceData.push(newData);
            let d = JSON.stringify(newSourceData);
            storage.setItem("newData",d);
        }
    }
}