let displayScore = document.querySelector('.displayScore'),
    collisionCount = document.querySelector('.collisionCount'),
    collisions = 0,
    score = 0;

const Message = document.querySelector('.heading');

// A simple template for getting random outputs
const randomizer = x => Math.floor(Math.random() * x);


// **** CLASS IMPLEMENTATION ****

// Implements the Enemy class
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // Loads enemy image
        this.sprite = 'images/enemy-bug.png';
    }

    // This prototype method updates enemy location and handles collision between enemy and player
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -101;
            this.speed = randomizer(300) + 120;
        }
        this.enemyCollision(player);
    }

    // What happens when player collides with a bug/enemy
    enemyCollision(player) {
        if (player.y + 50 >= this.y
            && player.y <= this.y + 50
            && player.x <= this.x + 70
            && player.x + 70 >= this.x) {
            collisions++;
            collisionCount.innerHTML = collisions;
            player.resetPlayer();
            Message.innerHTML = 'Ouch!';
            Message.classList.add('messageCollide');
        }
    }

    // Renders the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Implements the Player class
class Player {
    constructor(x = 202.5, y = 350) {
        this.x = x;
        this.y = y;
        // Loads player image
        this.player = 'images/char-boy.png';
    }

    // checks for wall collision physics
    update() {
        this.preventOffScreen();
        this.ifWin();
    }

    // Resets player location and header message
    resetPlayer() {
        this.x = 202.5;
        this.y = 350;
        setTimeout(function () {
            Message.innerHTML = 'Can you beat the bugs?';
            Message.classList.remove('messageWin', 'messageCollide');
        }, 1000);
    }

    // checks for player moving offscreen
    preventOffScreen() {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 404) {
            this.x = 404;
        } else if (this.y > 435) {
            this.y = 435;
        }
    }

    // What happens when player moves to the water
    ifWin() {
        if (this.y < 50) {
            Message.innerHTML = 'Yes You Can!';
            Message.classList.add('messageWin');
            this.resetPlayer();
            score++;
            displayScore.innerHTML = score;
        }
    }

    // Receives user input, allowedKeys (the key which was pressed) and move the player according to that input
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

    // Renders the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }
}


// **** INSTANTIATION ****

// Storage for all the enemies
const allEnemies = [];

// Instantiating player
const player = new Player();

// Instantiating enemies and adding the to an array
for (let index = 1; index <= 3; index++) {
    allEnemies.push(new Enemy(-101, index * 85 + 40, randomizer(300) + 120));
}

// Instantiating a random positioned separate enemy
const varBug = new Enemy(-101, 210, 200);

// Updating fourth bug behavior
varBug.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
        // enemy will appear in random locations
        this.y = Math.ceil(Math.random() * 3) * 85 + 40;
        this.speed = randomizer(300) + 200;
    }
    this.enemyCollision(player);
}

allEnemies.push(varBug);

// Listens for when the arrow keys are pressed
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
