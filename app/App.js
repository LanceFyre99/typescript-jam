var startx = 20;
var starty = 20;
var speed = 10;
var deltax = speed;
var deltay = 0;
var score = 0;
var snake = [];
var gameloop = null;
var KEY = {
    D: 'KeyD',
    W: 'KeyW',
    A: 'KeyA',
    S: 'KeyS',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    LEFT: 'ArrowLeft',
    DOWN: 'ArrowDown',
    SPACE: 'Space'
};
var input = {
    right: false,
    up: false,
    left: false,
    down: false
};
var food = {
    exists: false,
    x: null,
    y: null
};
var segment = /** @class */ (function () {
    function segment(x, y, head) {
        if (head === void 0) { head = false; }
        this.x = x;
        this.y = y;
        this.head = head;
    }
    return segment;
}());
document.addEventListener('DOMContentLoaded', domloaded, false);
function domloaded() {
    init();
}
window.addEventListener("keydown", function (event) {
    var code = event.code;
    switch (code) {
        case KEY.RIGHT:
        case KEY.D:
            input.right = true;
            break;
        case KEY.UP:
        case KEY.W:
            input.up = true;
            break;
        case KEY.LEFT:
        case KEY.A:
            input.left = true;
            break;
        case KEY.DOWN:
        case KEY.S:
            input.down = true;
            break;
    }
}, true);
document.addEventListener("keyup", function (event) {
    var code = event.code;
    switch (code) {
        case KEY.RIGHT:
        case KEY.D:
            input.right = false;
            break;
        case KEY.UP:
        case KEY.W:
            input.up = false;
            break;
        case KEY.LEFT:
        case KEY.A:
            input.left = false;
            break;
        case KEY.DOWN:
        case KEY.S:
            input.down = false;
            break;
        case KEY.SPACE:
            if (gameloop == null) {
                init();
            }
            ;
            break;
    }
}, true);
//Initialize animation and game
function init() {
    document.getElementById('score').innerHTML = '0';
    snake.push(new segment(startx, starty, true));
    gameloop = setInterval(snek, 75);
}
function snek() {
    //If this gets set to true, it's a game over
    var death = false;
    //Spawn food if none exists
    if (food.exists == false) {
        food.exists = true;
        food.x = Math.floor(Math.random() * 22.9) * 10 + 10;
        food.y = Math.floor(Math.random() * 22.9) * 10 + 10;
    }
    //Get canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    //Draw border and play area
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 250, 250);
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillRect(10, 10, 230, 230);
    //Check for input, adjust movement direction accordingly
    switch (true) {
        case input.up:
            deltax = 0;
            deltay = -speed;
            break;
        case input.down:
            deltax = 0;
            deltay = speed;
            break;
        case input.right:
            deltax = speed;
            deltay = 0;
            break;
        case input.left:
            deltax = -speed;
            deltay = 0;
            break;
    }
    var lastx = 0;
    var lasty = 0;
    for (var _i = 0, snake_1 = snake; _i < snake_1.length; _i++) {
        var part = snake_1[_i];
        //if the head is touching another part of the snake, gameover
        if (part.head == false) {
            if (part.x == snake[0].x && part.y == snake[0].y) {
                death = true;
            }
        }
        //Delete old parts
        ctx.save();
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.translate(part.x, part.y);
        ctx.fillRect(0, 0, 10, 10);
        ctx.restore();
        //Adjust position
        if (part.head) {
            lastx = part.x;
            lasty = part.y;
            part.x += deltax;
            part.y += deltay;
        }
        else {
            var myx = part.x;
            var myy = part.y;
            part.x = lastx;
            part.y = lasty;
            lastx = myx;
            lasty = myy;
        }
        //Draw new part
        ctx.save();
        ctx.translate(part.x, part.y);
        if (part.head) {
            ctx.fillStyle = 'rgb(0, 150, 0)';
        }
        else {
            ctx.fillStyle = 'rgb(0, 200, 0)';
        }
        ctx.fillRect(0, 0, 10, 10);
        ctx.restore();
    }
    //score a point and add a new segment if head overlaps food
    if (snake[0].x == food.x && snake[0].y == food.y) {
        food.exists = false;
        score += 1;
        document.getElementById('score').innerHTML = String(score);
        snake.push(new segment(lastx, lasty, false));
    }
    //draw food if not eaten
    if (food.exists) {
        ctx.save();
        ctx.translate(food.x, food.y);
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(0, 0, 10, 10);
        ctx.restore();
    }
    //gameover if moving into border
    if (snake[0].x > 230) {
        death = true;
    }
    else if (snake[0].y > 230) {
        death = true;
    }
    else if (snake[0].x < 10) {
        death = true;
    }
    else if (snake[0].y < 10) {
        death = true;
    }
    //gameover. reset globals, end the gameloop, draw over play area
    if (death) {
        snake = [];
        food.exists = false;
        deltax = speed;
        deltay = 0;
        score = 0;
        clearInterval(gameloop);
        gameloop = null;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
        ctx.fillRect(0, 0, 250, 250);
        return;
    }
}
//# sourceMappingURL=App.js.map