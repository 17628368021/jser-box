
  function randomNum(min,max){
    return Math.floor( Math.random()*(max-min)+min);
  }
  /**生成一个随机色**/
  function randomColor(min,max){
    var r = randomNum(min,max);
    var g = randomNum(min,max);
    var b = randomNum(min,max);
    return "rgb("+r+","+g+","+b+")";
  }

  /**绘制验证码图片**/
  function drawPic(id){
    var canvas=document.getElementById(id);
    var width=canvas.width;
    var height=canvas.height;
    var ctx = canvas.getContext('2d');
    
    // ctx.clearRect(20,20,100,50);
    ctx.textBaseline = 'bottom';

    /**绘制背景色**/
    ctx.fillStyle = randomColor(180,240); //颜色若太深可能导致看不清
    ctx.fillRect(0,0,width,height);
    /**绘制文字**/
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    var codeString = '';
    for(var i=0; i<4; i++){
      var txt = str[randomNum(0,str.length)];
      ctx.fillStyle = randomColor(50,150);  //随机生成字体颜色
      ctx.font = randomNum(24,40)+'px SimHei'; //随机生成字体大小
      var x = 10+i*20;
      var y = randomNum(30,40);
      var deg = randomNum(-45, 45);
      //修改坐标原点和旋转角度
      ctx.translate(x,y);
      // ctx.rotate(deg*Math.PI/135);
      ctx.fillText(txt, 0,0);
      //恢复坐标原点和旋转角度
      // ctx.rotate(-deg*Math.PI/180);
      ctx.translate(-x,-y);
      codeString += txt;
    }
    /**绘制干扰线**/
    for(var i=0; i<8; i++){
      ctx.strokeStyle = randomColor(80,180);
      ctx.beginPath();
      ctx.moveTo( randomNum(0,width), randomNum(0,height) );
      ctx.lineTo( randomNum(0,width), randomNum(0,height) );
      ctx.stroke();
    }
    /**绘制干扰点**/
    for(var i=0; i<100; i++){
      ctx.fillStyle = randomColor(100,255);
      ctx.beginPath();
      ctx.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
      ctx.fill();
    }

    return codeString;
  }
  export default drawPic;
  // </script>