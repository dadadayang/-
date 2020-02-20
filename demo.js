window.addEventListener('load', function () {

  let canvas = document.querySelector('canvas')
  let fr_red = this.document.querySelector('.fr_red')
  let fr_yellow = this.document.querySelector('.fr_yellow')
  let frs_red = this.document.querySelector('.frs_red')
  let i = this.document.querySelector('.i')
  let over1 = this.document.querySelector('.over1')
  let over2 = this.document.querySelector('.over2')
  let fir_bgm = this.document.querySelector('.fir_bgm')
  let over_bgm = this.document.querySelector('.over_bgm')
  let home_bgm = this.document.querySelector('.home_bgm')
  
  let sn_head = this.document.querySelector('.sn_head')  //蛇头
  let Joint = this.document.querySelector('.Joint')  //关节
  // 设置画布大小
  canvas.width = 600;
  canvas.height = 600;

  //拿到canvas的上下文
  var tools = canvas.getContext('2d');   //2d

  // 每次移动的距离
  let rect = 30

  //分数
  let fet = 1
  //食物的随机坐标和样式
  let listfr = [fr_red, fr_yellow, frs_red]
  let sum = Math.floor(Math.random() * (listfr.length) + 0)
  let num = Math.floor(Math.random() * 19 + 1)
  let numto = Math.floor(Math.random() * 19 + 1)

  let isE = false //食物是否被吃掉

  //蛇的默认坐标
  let snake = [{ x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }]
  let dirctionX = 1 //蛇的默认方向
  let dirctionY = 0 //蛇的默认方向


  //判断游戏是否结束
  let isGameOver = false



  //创建定时器
  this.setInterval(function () {
    //判断游戏是否结束
    if (isGameOver) {
      return
    }
    //清除
    tools.clearRect(0, 0, 600, 600)
    //重绘


    //绘制新的蛇
    let oldHead = snake[0]  //删除旧的
    let newHead = {
      x: oldHead.x + dirctionX,
      y: oldHead.y + dirctionY
    }

    for (let i = 0; i < snake.length - 1; i++) {
      if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
        isGameOver = true
        over_bgm.src="Sound/over_bgm.mp3"
        home_bgm.src=" "
        
        over2.style.display = 'block'
      }
    }
    //提前判断蛇头下一个坐标是否到边界
    if (newHead.y < 0 || newHead.x < 0 || newHead.x * 30 >= 600 ||
      newHead.y * 30 >= 600) {
      //游戏结束
      isGameOver = true
      over_bgm.src="Sound/over_bgm.mp3"
      home_bgm.src=" "

      over1.style.display = 'block'
    } else {
      //正常运行
      snake.unshift(newHead)  //添加新的蛇
      //蛇吃到食物
      if (snake[0].x * 30 === num * rect && snake[0].y * 30 === numto * rect) {
        //蛇吃到食物，就不执行pop，不删除最后一节也就相当于增加一节了
        isE = true
        fir_bgm.src="Sound/fir_bgm.mp3"

        i.innerHTML = fet
        fet++
      } else {
        //没有吃到
        isE = false
        snake.pop()
      }
    }

    if (isE) {
      listfr = [fr_red, fr_yellow, frs_red]
      sum = Math.floor(Math.random() * (listfr.length) + 0)
      num = Math.floor(Math.random() * 19 + 1)
      numto = Math.floor(Math.random() * 19 + 1)
    }
    //绘制食物
    tools.drawImage(listfr[sum], num * rect, numto * rect, 30, 30)



    //蛇头
    let sn_ro = tools.drawImage(sn_head, snake[0].x * rect, snake[0].y * rect, 30, 30)
    //蛇关节
    for (let i = 1; i < snake.length; i++) {
      tools.drawImage(Joint, snake[i].x * rect, snake[i].y * rect, 30, 30)
    }

    //键盘监听
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 87 && dirctionY != 1) {//上
        dirctionX = 0
        dirctionY = -1
        sn_head.src = "img/蛇头_top.png"
      } else if (event.keyCode === 83 && dirctionY != -1) {//下
        dirctionX = 0
        dirctionY = 1
        sn_head.src = "img/蛇头_botton.png"
      } else if (event.keyCode === 65 && dirctionX != 1) {//左
        dirctionX = -1
        dirctionY = 0
        sn_head.src = "img/蛇头_left.png"
      } else if (event.keyCode === 68 && dirctionX != -1) {//右
        dirctionX = 1
        dirctionY = 0
        sn_head.src = "img/蛇头_right.png"

      }
    })
    //绘制地图
    // for (let i = 0; i < canvas.width / rect + rect; i++) {
    //   //横线
    //   tools.moveTo(0, i * rect)
    //   tools.lineTo(canvas.width, i * rect)
    //   // 竖线
    //   tools.moveTo(i * rect, 0)
    //   tools.lineTo(i * rect, canvas.height)
    // }
    tools.strokeStyle = "#00a8cc"   //线色
    tools.stroke()
  }, 300)

})