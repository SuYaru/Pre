// 创建食物，食物属性 长宽高、颜色、位置
    // ()();    (function(){ ... }());更好
    
    (function(){
        var elements=[];    // 存放食物对象的集合
        // var map=document.querySelector(".map");
        function Food(x,y,width,height,color){   
            this.width=width||20;
            this.height=height||20;
            this.color=color||"green";
            this.x=x;
            this.y=y;
        }
        Food.prototype.init=function(map){
            // 创建div ，把 div 加到 map 了
            // remove 外部无法访问
            remove();
            var div=document.createElement("div");
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.backgroundColor=this.color;
            div.style.position="absolute";
            this.x=Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width;
            this.y=Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height;
            div.style.top=this.y+"px";
            div.style.left=this.x+"px";
            map.appendChild(div);
            elements.push(div);
        }   
        // 先将食物存到数组，再从数组里删除原来的食物
        // 私有的方法
        function remove(){
            for(var i=0;i<elements.length;i++){
                var ele=elements[i];
                ele.parentNode.removeChild(ele);
                elements.splice(i,1);
            }
        }
        window.Food=Food;
    }());