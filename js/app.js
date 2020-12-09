const STEP_X = 101;
const STEP_Y = 85;
const BUGS_START = -100;
const BUGS_END = 500;
const MIN_SPEED = 5100;
const MAX_SPEED = 8000;
const INITIAL_POSITION_X = 202;
const INITIAL_POSITION_Y = 400;
const BUG_SIZE = 75;
const FIELD_WIDTH = 404;
const FIELD_HEIGHT = 400;
const allEnemies = [];

let Enemy = function (x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > BUGS_END) {
        this.x = BUGS_START;
        this.speed = (Math.floor(Math.random() * MIN_SPEED) + MAX_SPEED) * dt;
    }
    if (this.Collision()) player.resetPosition();
};

Enemy.prototype.Collision = function () {
    if (player.y == this.y &&
        player.x < this.x + BUG_SIZE &&
        this.x < player.x + BUG_SIZE) {
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = ('images/char-cat-girl.png');
};

Player.prototype.update = function () {
    if (this.y == 0) {
        this.y = INITIAL_POSITION_Y;
    }
};

Player.prototype.resetPosition = function () {
    player.x = INITIAL_POSITION_X;
    player.y = INITIAL_POSITION_Y;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key == 'left' && this.x > 0) {
        this.x -= STEP_X;
    }
    if (key == 'up' && this.y > 0) {
        this.y -= STEP_Y;
    }
    if (key == 'right' && this.x < FIELD_WIDTH) {
        this.x += STEP_X;
    }
    if (key == 'down' && this.y < FIELD_HEIGHT) {
        this.y += STEP_Y;
    }
    if (this.y < 0) {
        setTimeout(function () {
            player.x = INITIAL_POSITION_X;
            player.y = INITIAL_POSITION_Y;
        }, 200)
    }
};

let bugLocation = [60, 145, 230];

bugLocation.forEach(function (bugY) {
    let enemy = new Enemy(BUGS_START, bugY, 200);
    allEnemies.push(enemy);
});

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(INITIAL_POSITION_X, INITIAL_POSITION_Y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
