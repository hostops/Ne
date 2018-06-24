/**
 * Enum for all kind of directions. 
 * @enum {number}
 */
const Direction = Object.freeze({
	/** Direction left. */
	LEFT: 0,
	/** Direction up. */
	UP:	1,
	/** Direction right. */
	RIGHT: 2,
	/** Direction down. */
	DOWN: 3
});

/**
 * Main game object that controlls user, gameplay, rooms.
 *
 * @property {number} width       Width of canvas in percents.
 * @property {number} height      Height of canvas in percents.
 * @property {Room}   currentRoom Object of current displayed room.
 * @property {Object} canvas      Canvas where game is drawn.
 * @since 1.0.0
 */
class Game {
	
	/**
	 * Constructor for Game.
	 * 
	 * @param {Object} container Dom object where canvas should be placed. 
	 */
	constructor(container) {
		this.container = container;
		this.canvas = document.createElement("canvas");
		container.appendChild(this.canvas);
		this.context = this.canvas.getContext("2d");

		// Resize canvas to fit inside container
		this.resizeCanvas();

		// If the container is resized, resize canvas accordingly
		this.container.onresize = function() {
			this.resizeCanvas();
		}.bind(this);

		// Add main room
		this.currentRoom = new Room(0.4);
	}

	/**
	 * Resize canvas to fit inside this.container
	 */
	resizeCanvas() {
		var containerSize = this.container.getBoundingClientRect();
		this.canvas.width = containerSize.width;
		this.canvas.height = containerSize.height;
	}

	/**
	 * Change current room. This function is called when user leaves current room. 
	 *
	 * @param {Room} room New room to be shown.
	 */
	changeCurrentRoom(room) {
		this.currentRoom = room;
	}
	
	/**
	 * Updates current room and all of its objects. 
	 * Function is called on animation frame.
	 */
	update() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.currentRoom.draw(this.context, this.canvas.width, this.canvas.height);
		window.requestAnimationFrame(this.update.bind(this));
	}
}/**
 * Enum for moving type. 
 * @enum {number}
 */
const Moving = Object.freeze({
	/** Moving is changed by user request */
	FREE: 0,
	/** Random direction. */
	RANDOM:	1,
	/** Moving in vertical direction */
	VERTICAL: 2,
	/** Moving from in horizontal direction. */
	HORIZONTAL: 3,
	/** Following the user. */
	FOLLOWING: 4,
	/** Hiding from user, to be hard to catch. */
	HIDING: 5
});

/**
 * Interface for items that are placed in room. 
 *
 * @property {number} width  Width of item in percents.
 * @property {number} height Height of item in percents.
 * @property {number} x      X coordinate of item in percents.
 * @property {number} y      Y coordinate of item in percents.
 * @property {Moving} moving Moving type of item.
 * @since 1.0.0
 */
class Item {
	
	/**
	 * Constructor of class Item
	 *
	 * @param {number} width  Width of item in percents.
	 * @param {number} height Height of item in percents. 
	 */
	constructor(width, height) {
		this.moving = Moving.RANDOM;
		this.width = width;
		this.height = height;
		this.x = 0;
		this.y = 0;
	}
	
	/**
	 * Places item in room.  It is called when we place
	 * item in room before first update call.
	 *
	 * @param {Room} room Room where item is located.
	 */
	place(room) {
		this.x = Math.floor(Math.random());
		this.y = Math.floor(Math.random());
	}
	
	/**
	 * Updates location and other properties of item.
	 * It is called on animation frame.
	 *
	 * @param {Room} room Room where item is located.
	 */
	update(room) {
	}
	
	/**
	 * Draws object on canvas.
	 * 
	 * @param {Object} context  2D context of Canvas
	 * @param {number} width    Width of canvas in percents
	 * @param {number} height   Height of canvas in percents
	 */
	draw(context, size) {
		context.beginPath();
		context.fillRect(this.x * size, this.y * size, this.width * size, this.height * size)
		context.fill();
	}
}/**
 * Object factory for all kind of items.
 *
 * @since 1.0.0
 */
class Items {
	
	/**
	 * Creates instance of AngryRobot
	 * @returns {AngryRobot} Instance of AngryRobot
	 */
	static angryRobot() {
		return new AngryRobot();
	}
	
	/**
	 * Creates instance of Helper
	 *
	 * @returns {Helper} Instance of Helper
	 */
	static helper() {
		return new Helper();
	}
	
	/**
	 * Creates instance of Bonus
	 *
	 * @returns {Bonus} Instance of Bonus
	 */
	static bonus() {
		return new Bonus();
	}
}/** 
 * Holds instance of main game.
 * 
 * @global
 * @type {Game}
 */
var mainGame;

/** 
 * Holds instance of first room created
 * @global
 * @type {Room}
 */
var mainRoom;

/**
 * Creates new game in body of document.
 */
document.addEventListener("DOMContentLoaded", function() { 
	mainGame = new Game(document.body);
	mainRoom = mainGame.currentRoom;
	window.requestAnimationFrame(mainGame.update.bind(mainGame));
	start();
}, false);/**
 * Interface for items that are placed in room. 
 *
 * @property {number} width  Width of item in percents.
 * @property {number} height Height of item in percents.
 * @property {number} x      X coordinate of item in percents.
 * @property {number} y      Y coordinate of item in percents.
 * @property {Moving} moving Moving type of item.
 * @since 1.0.0
 */
class Player extends Item {
	
	/**
	 * Constructor of class Item
	 *
     * @property {number} width     Width of item in percents.
     * @property {number} height    Height of item in percents.
     * @property {number} x         X coordinate of item in percents.
     * @property {number} y         Y coordinate of item in percents.
     * @property {number} tempX     Temporary X coordinate of item in percents.
     * @property {number} tempY     Temporary Y coordinate of item in percents.
     * @property {Moving} moving    Moving type of item.
	 */
	constructor(width, height) {
		this.moving = Moving.RANDOM;
		this.width = width;
		this.height = height;
		this.x = 0;
        this.y = 0;
        this.tempX = 0;
        this.tempY = 0;
        window.addEventListener("keydown", this.userAction.bind(this));
	}
    
    /**
     * User action event. Event is fired on keydown.
     * @param {Object} e Event.
     */
    userAction(e){
        switch (e.keyCode()) {
            case 37: this.moveUser(Direction.LEFT);
            case 38: this.moveUser(Direction.UP);
            case 39: this.moveUser(Direction.RIGHT);
            case 40: this.moveUser(Direction.DOWN);
        }
    }

    /** 
     * Moves user in specified direction.
     * @param {Direction} direction Direction to move to.
     */
    moveUser(direction) {
        this.tempX -= (direction == Direction.LEFT) / 100;
        this.tempX += (direction == Direction.RIGHT) / 100;
        this.tempY -= (direction == Direction.DOWN) / 100;
        this.tempY += (direction == Direction.UP) / 100;
    }

	/**
	 * Places item in room.  It is called when we place
	 * item in room before first update call.
	 *
	 * @param {Room} room Room where item is located.
	 */
	place(room) {
		this.x = Math.floor((Math.random() * room.width));
        this.y = Math.floor((Math.random() * room.height));
        this.tempX = this.x;
        this.tempY = this.y;
	}
	
	/**
	 * Updates location and other properties of user.
	 * It is called on animation frame.
	 *
	 * @param {Room} room Room where item is located.
	 */
	update(room) {
        this.x = this.tempX > 0 && this.tempX + this.width < 1? this.tempX : this.Y;
        this.y = this.tempY > 0 && this.tempY + this.height < 1? this.tempY : this.Y;
	}
	
	/**
	 * Draws object on canvas.
	 * 
	 * @param {Object} context  2D context of Canvas
	 * @param {number} width    Width of canvas in percents
	 * @param {number} height   Height of canvas in percents
	 */
	draw(context, width, height) {
        context.fillStyle = "#000";
        context.beginPath();
		context.arc(this.x * size, this.y * size, this.width * size, 0, Math.PI * 2);
		context.fill();
	}
}/**
 * Room class is one of main entities of the game. It contains items 
 * and is place where user can do all of his work (fight monsters, collect items, ...).
 * User can leave room with entering anotherone. 
 * 
 * @property {number} size		Size of room in percents of container size.
 * @property {Item[]} items		Array of items in room.
 * @since 1.0.0
 */
class Room {
	
	/**
	 * Construction for Room.
	 *
	 * @param {number} size	Size of room in percents.
	 */
	constructor(size) {
		this.size = size;
		this.items = [];
		this.rooms = [];
	}
	
	/**
	 * Adds new item object in room. It places it in this.items array.
	 * 
	 * @param {Item} item Item to be placed in room.
	 */
	addItem(item) {
		this.items.push(item);
		item.place(this);
	}

	/**
	 * Draws room and all objects in the room.
	 * @param {context} context	Canvas context to draw on
	 * @param {number} width	Width of the canvas in pixels
	 * @param {number} height	Height of the canvas in pixels
	 */
	draw(context, width, height) {
		// Calculate room width
		var roomSize = Math.min(width, height) * this.size;
		
		var left = (width - roomSize) / 2;
		var top = (height - roomSize) / 2;

		// Draw room border
		context.lineWidth = 1;
		context.strokeRect(left, top, roomSize, roomSize);

		// Translate coordinate system, so that 0.0 in in top left corner of room
		context.translate(left, top);

		// Draw all items in room
		this.items.forEach(function(item) {
			item.update(this.currentRoom);
			item.draw(context, roomSize);
		}.bind(this));

		// Remove translation
		context.translate(-left, -top);
	}
}