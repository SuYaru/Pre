
    // 低调用函数小蛇
    (function(){
        var elements=[];    // 小蛇身体的每个部分
        // 小蛇构造函数
        function Snake(width,height,direction){
            this.width=width||20;
            this.height=height||20;
            this.body=[
                {x:3,y:2,color:"red"},      // 头
                {x:2,y:2,color:"yellow"},   // 身体
                {x:1,y:2,color:"yellow"}    // 身体
            ];
            this.direction=direction||"right";
        }
        // 初始化创建一个小蛇
        Snake.prototype.init=function(map){
            remove();
            // 循环Body ，创建身体部分
            for(var j=0;j<this.body.length;j++){
                var obj=this.body[j];
                var div=document.createElement("div");
                map.appendChild(div);
                div.style.position="absolute";
                div.style.width=this.width;
                div.style.height=this.height;
                div.style.left=obj.x*this.width+"px";
                div.style.top=obj.y*this.height+"px";
                div.style.backgroundColor=obj.color;
                elements.push(div);
            }
        }

        // 让小蛇动起来
        Snake.prototype.move=function(food,map){
            // 改变身体方向
           var i=this.body.length-1;
           for(;i>0;i--){
                this.body[i].x=this.body[i-1].x;
                this.body[i].y=this.body[i-1].y;
                
           }
           // 改变小蛇的头位置
           switch(this.direction){
               case "right":this.body[0].x+=1; break;
               case "left":this.body[0].x-=1; break;
               case "top":this.body[0].y-=1; break;
               case "bottom":this.body[0].y+=1; break;
           }
           // 判断有没有吃到食物
           // 小蛇的头坐标和食物的坐标一样
           var  headX=this.body[0].x*this.width;
           var  headY=this.body[0].y*this.height;
           // 食物的横纵坐标
           if(headX==food.x&&headY==food.y){
                // 获取小蛇的尾巴
                var last=this.body[this.body.length-1];
                this.body.push({
                    x:last.x,
                    y:last.y,
                    color:last.color
                });
                // 删掉食物，重新初始化
                food.init(map);
           }
        }
        function remove(){
            var i=elements.length-1;
            for(;i>=0;i--){
                // 从尾部删除
                var ele=elements[i];
                ele.parentNode.removeChild(ele);
                elements.splice(i,1);
            }
        }
        window.Snake=Snake;
    }());

