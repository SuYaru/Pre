// 游戏
(function(){
    var that=null;
    function Game(map){ 
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;  
    }
    Game.prototype.init=function(){
       // var map=document.querySelector(".map");
        this.food.init(this.map);
        this.snake.init(this.map);

        // 自动调用小蛇
        this.runSnake(this.food,this.map);

        // 监听按键
        this.bindkey();
        /* setInterval(function(){
            that.snake.move(that.food,that.map);
            that.snake.init(that.map);        // 重新画一条蛇
        },200); */
       /*  this.snake.move(this.food,this.map);
        this.snake.init(this.map); */
    }
    // 设置小蛇可以自动跑起来
    Game.prototype.runSnake=function(food,map){
        var timeId=setInterval(function(){
            // snake 默认This  是 window  ----> .bind  改变了this 的指向
            this.snake.move(food,map);
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;     // 横坐标最大值
            var maxY=map.offsetHeight/this.snake.height;   // 纵坐标最大值
            var headX=this.snake.body[0].x;                 // 得到蛇头的坐标
            var headY=this.snake.body[0].y;
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("游戏结束");
            }
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束");
            }

        }.bind(that),200);
    }

    // 添加用户事件：设置用户按键，改变小蛇的移动方向  bindkey 绑定键
    Game.prototype.bindkey=function(){
        document.addEventListener("keydown",function(e){
            // 获取按键的值
            // 这里的this 指向document
            switch(e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }

        }.bind(that),false);
    }
    window.Game=Game;
}()); 