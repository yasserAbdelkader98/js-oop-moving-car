class Engine {
  static counter = 0;
  constructor(source) {
    this.source = source;
    Engine.counter++;
    if (this.constructor.name == "Engine") {
      throw new Error("its an abstract class!");
    }
  }
  static countit() {
    console.log(this.counter);
  }
}

class Car extends Engine {
  img;
  constructor(source, top, left) {
    super(source);
    this.top = top;
    this.left = left;
  }
  printCar() {
    this.img = document.createElement("img");
    this.img.src = this.source;
    this.img.style.width = "150px";
    this.img.style.position = "absolute";
    document.body.append(this.img);
  }
  setTop(top) {
    this.top = top;
    this.img.style.top = this.top + "px";
  }
  setLeft(left) {
    this.left = left;
    this.img.style.left = this.left + "px";
  }
  moveLeft(left) {
    if (this.left - left > 0) {
      this.img.style.left = this.left - left + "px";
      this.left -= left;
    }
  }
  moveRight(right) {
    if (this.left + right < window.innerWidth - this.img.width) {
      this.img.style.left = this.left + right + "px";
      this.left += right;
    }
  }
  moveCar(direction) {
    if (direction == "right") {
      let start = 0;
      let speed = setInterval(() => {
        start += 4;
        if (start + this.left < window.innerWidth - this.img.width) {
          this.img.style.left = this.left + start;
        } else {
          this.left = window.innerWidth - this.img.width;
          clearInterval(speed);
        }
      }, 5);
    } else if (direction == "left") {
      let start = this.left;
      let speed = setInterval(() => {
        start -= 4;
        if (start > 0) {
          this.img.style.left = start;
        } else {
          this.left = 0;
          clearInterval(speed);
        }
      }, 5);
    }
  }
}
let myCar = new Car("images/thumbnailbg1-1.jpg", "20px", "20px");
myCar.printCar();
myCar.setTop(100);
myCar.setLeft(100);

const stepLeft = document.getElementById("stepLeft");
const stepRight = document.getElementById("stepRight");
const moveLeft = document.getElementById("moveLeft");
const moveRight = document.getElementById("moveRight");

stepLeft.addEventListener("click", () => {
  myCar.moveLeft("10");
});

stepRight.addEventListener("click", () => {
  myCar.moveLeft("-10");
});

moveLeft.addEventListener("click", () => {
  myCar.moveCar("left");
});

moveRight.addEventListener("click", () => {
  myCar.moveCar("right");
});
