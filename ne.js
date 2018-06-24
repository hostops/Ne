const Way = Object.freeze({
    UP:	0,
    RIGHT: 1,
    DOWN: 2,
	LEFT: 3
});

class Game {
	constructor(container) {
		this.canvas = document.createElement("canvas");
		this.canvas.style.width = "90vw"
		this.canvas.style.height = "60vh";
		container.appendChild(this.canvas);
		this.items = [];
	}
	addItem(item) {
		this.items.push(item);
	}
}const Moving = Object.freeze({
    RANDOM:	0,
    UP_DOWN: 1,
    LEFT_RIGHT: 2
});

class Item {
	
	constructor() {
		this.moving = Moving.RANDOM;
		this.widht = 10;
		this.height = 10;
		this.x = Math.floor((Math.random() * 10) + 1);
		this.z = Math.floor((Math.random() * 10) + 1);
	}
	update(room) {
		
	}
	draw(context, tileSize, width, height) {
		context.beginPath();
		context.arc(this.x, this.y, this.width, Math.PI * 1 / 4, Math.PI * 7 / 4)
	}
}class Items {
	static angryRobot() {
		return new AngryRobot();
	}
	static helper() {
		return new Helper();
	}
	static bonus() {
		return new Bonus();
	}
}var mainRoom;
var mainGame;
document.addEventListener("DOMContentLoaded", function() { 
    mainGame = new Game(document.body);
    mainRoom = new Room();
    mainGame.addItem(mainRoom);
}, false);class Room {
	constructor() {
		this.items = [];
	}
	addItem(item) {
		this.items.push(item);
	}
}