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
		super(width, height);
		this.moving = Moving.FREE;

		// Direction in which the player is moving
		this.direction = Direction.NOWHERE;

		// Event listeners for key 
		window.addEventListener("keydown", this.startUserAction.bind(this));
		window.addEventListener("keyup", this.endUserAction.bind(this));
	}

	/**
	 * User action event. Event is fired on keydown.
	 * @param {Object} e Event.
	 */
	startUserAction(e) {
		switch (e.keyCode) {
			case 37: this.direction = Direction.LEFT; break;
			case 38: this.direction = Direction.UP; break;
			case 39: this.direction = Direction.RIGHT; break;
			case 40: this.direction = Direction.DOWN; break;
		}
	}

	/**
	 * User action event. Event is fired on keyup.
	 * @param {Object} e Event.
	 */
	endUserAction(e) {
		if (e.keyCode == 37 && this.direction == Direction.LEFT ||
			e.keyCode == 38 && this.direction == Direction.UP ||
			e.keyCode == 39 && this.direction == Direction.RIGHT ||
			e.keyCode == 40 && this.direction == Direction.DOWN) {
			this.direction = Direction.NOWHERE;
		}
	}

	/** 
	 * Moves user in specified direction.
	 * @param {Direction} direction Direction to move to.
	 */
	moveUser(direction) {
		var dx = this.x;
		var dy = this.y;

		dx -= (direction == Direction.LEFT) / 100;
		dx += (direction == Direction.RIGHT) / 100;
		dy += (direction == Direction.DOWN) / 100;
		dy -= (direction == Direction.UP) / 100;

		this.x = dx > 0 && dx + this.width < 1 ? dx : this.x;
		this.y = dy > 0 && dy + this.height < 1 ? dy : this.y;
	}

	/**
	 * Places item in room.  It is called when we place
	 * item in room before first update call.
	 *
	 * @param {Room} room Room where item is located.
	 */
	place(room) {
		this.x = Math.random();
		this.y = Math.random();
	}
	
	/**
	 * Updates location and other properties of user.
	 * It is called on animation frame.
	 *
	 * @param {Room} room Room where item is located.
	 */
	update(room) {
		this.moveUser(this.direction);
	}
	
	
	/**
	 * Draws object on canvas.
	 * 
	 * @param {Object} context	2D context of Canvas
	 * @param {number} size		Size of canvas in pixels
	 */
	draw(context, size) {
		super.draw(context, size);
	}
}