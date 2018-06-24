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
		this.container = container;
		this.canvas = document.createElement("canvas");
		container.appendChild(this.canvas);

		// Resize canvas to fit inside container
		this.resizeCanvas();

		// If the container is resized, resize canvas accordingly
		this.container.onresize = function() {
			this.resizeCanvas();
		}.bind(this);

		// Add main room
		this.currentRoom = new Room(100, 100);
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
		this.currentRoom.items.forEach(function(item) {
			item.update(this.currentRoom);
			item.draw(this.canvas.getContext("2d"), this.tileSize, this.width, this.height);
		}.bind(this));
		window.requestAnimationFrame(this.update.bind(this));
	}
}