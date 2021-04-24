class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0

    this.bg = new Background(ctx)
    this.helicopter = new Helicopter(ctx)
    this.obstacles = [
      new Obstacle(ctx)
    ]
    this.score = new Score(ctx)
    
  }

  start() {
    // muchos TODOs: loop. clear, draw, move, addObstacle, checkCollisions, clearObstacles
    this.intervalId = setInterval(()=>{
      this.clear()
      this.move()
      this.draw()
      this.checkCollisions()
      this.clearObstacles()
      if(this.tick > 100){
        this.tick = 0;
        this.addObstacle()
      }
      
    }, 1000 / 60)
  }

  updateScore() {
    this.score.value += 20
  }

  clearObstacles() {
    // TODO: filter only visible obstacles (call o.isVisible())
    this.obstacles = this.obstacles.filter((o) => {
      if (o.isVisible()) {
        return true
      } else {
        this.updateScore()
      }
    })
  }

  addObstacle() {
    // TODO: add new Obstacle every 100 ticks
    const newObstacle = new Obstacle(this.ctx)
    this.obstacles.push(newObstacle)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.tick++
    this.bg.draw()
    this.helicopter.draw()
    this.obstacles.forEach(o => o.draw())
    this.score.draw()
  }

  move() {
    this.bg.move()
    this.helicopter.move()
    this.obstacles.forEach(o => o.move())
  }

  checkCollisions() {
    // TODO: check helicopter on floor?
    // TODO: iterate obstacles. check colX and colY


    const collision = this.obstacles.some(obstacle => {
      const colX = (
        this.helicopter.x + this.helicopter.w >= obstacle.x &&
        this.helicopter.x <= obstacle.x + obstacle.w
      )

      const colY = (
        this.helicopter.y + this.helicopter.h >= obstacle.y &&
        this.helicopter.y <= obstacle.y + obstacle.h
      )

      return colX && colY
    })

    const crashFloor = this.helicopter.isFloor()
    const crashTop = this.helicopter.isTop()

    if (collision || crashFloor || crashTop) {
      this.gameOver()
    
    }
  }

  onKeyEvent(event) {
    this.helicopter.onKeyEvent(event)
  }

  gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}