// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
// （ctx）是一个对象，直接代指 canvas 上的一块允许我们绘制 2D 图形的区域。

// 宽高等于浏览器的宽高
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
// 小球模型化
function Ball(x, y, velX, velY, color, size) {
    this.x = x;             // 起始 xy 坐标范围从 0 （左上角）到浏览器视窗的宽和高（右下角）
    this.y = y;
    this.velX = velX;       // 水平和竖直速度
    this.velY = velY;
    this.color = color;
    this.size = size;       // 小球的半径，以像素为单位。
}
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
    Ball.prototype.collisionDetect = function() {
        for (var j = 0; j < balls.length; j++) {
          if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
      
            if (distance < this.size + balls[j].size) {
              balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
          }
        }
    }
}
var balls = [];
function loop() {
    //  将整个画布的颜色设置成半透明的黑色
    // 用来填充的颜色设置成半透明的，
    // rgba(0,0,0,0.25)，也就是让之前的视图留下来一点点，从而你可以看到小球运动时的尾巴
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    // 第一次没有创建时，创建25个小球，然后就一直调用 draw和update，进行动画
    while (balls.length < 250) {
      var ball = new Ball(
        random(0,width),
        random(0,height),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        random(10,20)
      );
      balls.push(ball);
    }
  
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    // 每次运行都会调用自己
    requestAnimationFrame(loop);
}

loop();