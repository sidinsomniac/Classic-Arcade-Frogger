const Message = document.querySelector('.heading');
let displayScore = document.querySelector('.displayScore');
let collisionCount = document.querySelector('.collisionCount');
let score = 0;
let collisions = 0;

const randomizer = x => Math.floor(Math.random() * x);

const resetPlayer = () => {
    player.x = 202.5;
    player.y = 350;
    setTimeout(function () {
        Message.innerHTML = 'Can you beat the bugs?';
        Message.classList.remove('messageWin', 'messageCollide');
    }, 1000);
}

const winMessage = (me) => {
    if (me.y < 50) {
        Message.innerHTML = 'Yes You Can!';
        Message.classList.add('messageWin');
        resetPlayer();
        score++;
        displayScore.innerHTML = score;
    }
}

const checkWallCollision = (me) => {
    if (me.x < 0) {
        me.x = 0;
    } else if (me.x > 404) {
        me.x = 404;
    } else if (me.y > 435) {
        me.y = 435;
    }
    winMessage(me);
}

const checkCollision = (enemy, me) => {
    if (
        me.y + 50 >= enemy.y
        && me.x <= enemy.x + 50
        && me.y <= enemy.y + 50
        && me.x + 50 >= enemy.x) {
        collisions++;
        collisionCount.innerHTML = collisions;
        resetPlayer();
        Message.innerHTML = 'Ouch!';
        Message.classList.add('messageCollide');
    }
}

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -101;
            this.speed = randomizer(300) + 200;
        }
        checkCollision.apply(this, [this, player]);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x = 202.5, y = 350) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-boy.png';
    }

    update() {
        checkWallCollision.call(this, this);
    }

    handleInput(key) {
        if (key === 'left') {
            this.x += -101;
        } else if (key === 'up') {
            this.y += -85;
        } else if (key === 'right') {
            this.x += 101;
        } else if (key === 'down') {
            this.y += 85;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }
}

const allEnemies = [];

const player = new Player();

for (let index = 1; index <= 3; index++) {
    allEnemies.push(new Enemy(-101, index * 85 + 40, randomizer(150) + 150));
}

const varBug = new Enemy(-101, 210, 200);

varBug.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
        this.y = Math.ceil(Math.random() * 3) * 85 + 40;
        this.speed = randomizer(300) + 200;
    }
    checkCollision.call(this, this, player);
}

allEnemies.push(varBug);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
