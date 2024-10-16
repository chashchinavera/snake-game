const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/field.png";

const foodImg = new Image();
foodImg.src = "img/carrot.png";

let box = 32; //размер ячейки
let score = 0; //счет

//создаем еду
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = []; //создаем змейку

//создаем начальное положение змейки
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir = ""; //направление движения змейки

//движение змейки
function direction(event) {
  if (event.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if (event.keyCode == 38 && dir != "down") {
    dir = "up";
  } else if (event.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (event.keyCode == 40 && dir != "up") {
    dir = "down";
  }
}

//проверка на столкновение с хвостом
function eatTail(head, arr) {
  //перебираем массив со змейкой
  for (let i = 0; i < arr.length; i++) {
    //сравниваем координаты головы змейки с координатами хвоста
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game); //останавливаем игру
    }
  }
}

//рисуем игру
function drawGame() {
  ctx.drawImage(ground, 0, 0); //рисуем игровое поле

  ctx.drawImage(foodImg, food.x, food.y); //рисуем еду

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "darkgreen" : "green"; //задаем цвет змейки
    ctx.fillRect(snake[i].x, snake[i].y, box, box); //рисуем змейку
  }

  ctx.fillStyle = "white"; //рисуем счет
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x; //переменные координат головы змейки
  let snakeY = snake[0].y;

  //если голова змейки на еде
  if (snakeX == food.x && snakeY == food.y) {
    score++; //увеличиваем счет

    //создаем новую еду
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop(); //удаляем хвост
  }

  //столкновение змейки с границами
  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    clearInterval(game);
    alert("Игра окончена");
  }

  //движение змейки
  if (dir == "left") {
    snakeX -= box;
  }
  if (dir == "right") {
    snakeX += box;
  }
  if (dir == "up") {
    snakeY -= box;
  }
  if (dir == "down") {
    snakeY += box;
  }

  //создаем новую голову
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead); //передвигаем голову
}

let game = setInterval(drawGame, 150); //запускаем игру
