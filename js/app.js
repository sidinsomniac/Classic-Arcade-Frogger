
const randomizer = x => Math.floor(Math.random()*x);

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x += this.speed * dt;
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x > 505) {
            this.x = -101;
            this.speed = randomizer(300)+100;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// Draw the enemy on the screen, required method for game


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


class Player {
    constructor(x=202.5, y=380) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-boy.png';
    }

    update() {
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

for (let index = 1; index <= 3; index++) {
    allEnemies.push(new Enemy(-101,index*85+40,randomizer(300)+100));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
