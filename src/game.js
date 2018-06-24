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
		this.canvas = document.createElement("canvas");
		container.appendChild(this.canvas);
		// Canvas Parameters
		this.context = this.canvas.getContext("2d");
		this.canvas.style.width = "90vw"
		this.canvas.style.height = "60vh";
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
		this.currentRoom.draw(this.context, this.width, this.height);
		window.requestAnimationFrame(this.update.bind(this));
	}
}