class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0

    this.bg = new Background(ctx)
    this.helicopter = new Helicopter(ctx)
    this.obstacles = []
  }

  start() {
    // TODO: loop. clear, draw, move, addObstacle, checkCollisions, clearObstacles
    this.intervalId = setInterval(()=>{
      this.clear()
      this.move()
      this.draw()
  

    }, 1000 / 60)
  }

  clearObstacles() {
    // TODO: filter only visible obstacles (call o.isVisible())
  }

  addObstacle() {
    // TODO: add new Obstacle every 100 ticks
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.bg.draw()
    this.helicopter.draw()
  }

  move() {
    this.bg.move()
  }

  checkCollisions() {
    // TODO: check helicopter on floor?
    // TODO: iterate obstacles. check colX and colY
  }

  onKeyEvent(event) {
    // TODO
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