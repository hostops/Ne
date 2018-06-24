/**
 * Enum for all kind of directions. 
 * @enum {number}
 */
const Direction = Object.freeze({
	/** Direction up. */
    UP:	0,
	/** Direction right. */
    RIGHT: 1,
	/** Direction down. */
    DOWN: 2,
	/** Direction left. */
	LEFT: 3
});

/**
 * Main game object that controlls user, gameplay, rooms.
 *
 * @property {number} width       Width of canvas in tiles.
 * @property {number} height      Height of canvas in tiles.
 * @property {number} tileSize    Size of tile in pixels.
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
		this.canvas = document.createElement("canvas");
		container.appendChild(this.canvas);
		// Canvas Parameters
		this.canvas.style.width = "90vw"
		this.canvas.style.height = "60vh";
		this.tileSize = 10;
		this.width = 5;
		this.height = 5;
		// Add main room
		this.currentRoom = new Room(10, 10);
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
		this.currentRoom.items.forEach(function(item) {
			item.update(this.currentRoom);
			item.draw(this.canvas.getContext("2d"), this.tileSize, this.width, this.height);
		}.bind(this));
		window.requestAnimationFrame(this.update.bind(this));
	}
}/**
 * Enum for moving type. 
 * @enum {number}
 */
const Moving = Object.freeze({
	/** Random direction. */
    RANDOM:	0,
	/** Moving in vertical direction */
    VERTICAL: 1,
	/** Moving from in horizontal direction. */
    HORIZONTAL: 2,
	/** Following the user. */
	FOLLOWING: 3,
	/** Hiding from user, to be hard to catch. */
	HIDING: 4
});

/**
 * Interface for items that are placed in room. 
 *
 * @property {number} width  Width of item in tiles.
 * @property {number} height Height of item in tiles.
 * @property {number} x      X coordinate of item in tiles.
 * @property {number} y      Y coordinate of item in tiles.
 * @property {Moving} moving Moving type of item.
 * @since 1.0.0
 */
class Item {
	
	/**
	 * Constructor of class Item
	 *
	 * @param {number} width  Width of item in tiles.
	 * @param {number} height Height of item in tiles. 
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
		this.x = Math.floor((Math.random() * room.width));
		this.y = Math.floor((Math.random() * room.height));
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
	 * @param {number} tileSize Size of tile in pixels
	 * @param {number} width    Width of canvas in tiles
	 * @param {number} height   Height of canvas in tiles
	 */
	draw(context, tileSize, width, height) {
		context.beginPath();
		context.arc(this.x, this.y, this.width, Math.PI * 1 / 4, Math.PI * 7 / 4);
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
 * Room class is one of main entities of the game. It contains items 
 * and is place where user can do all of his work (fight monsters, collect items, ...).
 * User can leave room with entering anotherone. 
 * 
 * @property {number} width  Width of room in tiles.
 * @property {number} height Height of room in tiles.
 * @property {Item[]} items  Array of items in room.
 * @since 1.0.0
 */
class Room {
	
	/**
	 * Construction for Room.
	 *
	 * @param {number} width  Width of the room in tiles.
	 * @param {number} height Height of the room in tiles.
	 */
	constructor(width, height) {
		this.width = width;
		this.height = height;
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
}