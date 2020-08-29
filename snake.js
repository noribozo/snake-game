const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const message = document.getElementById("message")
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
  for (let i = 0; i < width*width; i++){
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square)
  }
}
createGrid()
currentSnake.forEach(index =>squares[index].classList.add('snake'))

function startGame() {
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  squares[appleIndex].classList.remove('apple')
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  score = 0
  scoreDisplay.textContent = score
  direction = 1
  intervalTime = 1000
  generateApple()
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  timerId = setInterval(move, intervalTime)
  message.textContent = ""
}


function move() {
   /*How the snake moves*/
  const tail = currentSnake.pop()
  squares[tail].classList.remove('snake')
  currentSnake.unshift(currentSnake[0] + direction)
  squares[currentSnake[0]].classList.add('snake')
  
  /*deal with snake head gets the apple*/
  if(squares[currentSnake[0]].classList.contains('apple')){
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail) /* the snake grows*/
    generateApple()
    score++
    scoreDisplay.textContent = score
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
  }
 
  
  /*if the snake hits the wall, game stops*/
  if(currentSnake[0] + width >= width * width && direction === width ||
     currentSnake[0] % width === 0 && direction === -1 ||
     currentSnake[0] - width < 0 && direction === -width ||
     currentSnake[0] % width === width-1 && direction === 1 ||
     squares[currentSnake[0] + direction].classList.contains('snake')
    ){
 message.textContent = "Game over!" 
    return clearInterval(timerId)
       
	}
	squares[currentSnake[0]].classList.add('snake')
 	
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApple()

/*how to contol snake movement*/

function control(event) {
  if(event.keyCode === 39){
    direction = 1
  }else if(event.keyCode === 38){
    direction = -width
  }else if(event.keyCode === 40){
    direction = width
  }else if(event.keyCode === 37){
    direction = -1
  }
}

document.addEventListener('keyup', control)
document.addEventListener('click', startGame)
