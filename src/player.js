/**
 * Class for main character. This type of item is moving by user input (keyboard arrows).
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
	 * Constructor of class Player
	 *
	 * @param {number} width  Width of item in percents.
	 * @param {number} height Height of item in percents. 
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
	 * @param {Object} event Event.
	 */
	startUserAction(event) {
		switch (event.keyCode) {
			case 37: this.direction = Direction.LEFT; break;
			case 38: this.direction = Direction.UP; break;
			case 39: this.direction = Direction.RIGHT; break;
			case 40: this.direction = Direction.DOWN; break;
		}
	}

	/**
	 * User action event. Event is fired on keyup.
	 * @param {Object} event Event.
	 */
	endUserAction(event) {
		if (event.keyCode == 37 && this.direction == Direction.LEFT ||
			event.keyCode == 38 && this.direction == Direction.UP ||
			event.keyCode == 39 && this.direction == Direction.RIGHT ||
			event.keyCode == 40 && this.direction == Direction.DOWN) {
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

		this.x = dx >= 0 && dx + this.width <= 1 ? dx : this.x;
		this.y = dy >= 0 && dy + this.height <= 1 ? dy : this.y;
	}

	/**
	 * Places item in room.  It is called when we place
	 * item in room before first update call.
	 *
	 * @param {Room} room Room where item is located.
	 */
	place(room) {
		this.x = Math.random() * (1 - this.width);
		this.y = Math.random() * (1 - this.height);
	}
	
	/**
	 * Updates location and other properties of user.
	 * It is called on animation frame.
	 *
	 * @param {Room} room Room where item is located.
	 */
	update(room) {
		this.moveUser(this.direction);

		// Check doors. 
		var xCenter = (this.x + this.width / 2);
		var yCenter = (this.y + this.height / 2);
		var directions = Object.keys(room.rooms);
		directions.forEach(function(direction) {
			var doors = room.rooms[direction];
			var segmentLength = 1 / doors.length;

			for (var i = 0; i < doors.length; i++) {
				var center = (i * segmentLength) + (segmentLength / 2)  - DoorConstants.LENGTH / 2;

				var xInDoors = center < xCenter && xCenter < center + DoorConstants.LENGTH;
				var yInDoors =  center < yCenter && yCenter < center + DoorConstants.LENGTH;

				if (direction == Direction.UP) {
					yInDoors = this.y < DoorConstants.THICKNESS;
				} else if (direction == Direction.Down) {
					yInDoors = this.y + this.height > 1 - DoorConstants.THICKNESS;
				} else if (direction == Direction.RIGHT) {
					xInDoors = this.x + this.width > 1 - DoorConstants.THICKNESS;
				} else if (direction == Direction.LEFT) {
					xInDoors = this.x < DoorConstants.THICKNESS;
				}

				if (xInDoors && yInDoors) {
					mainGame.currentRoom.removeItem(this);
					mainGame.currentRoom = doors[i];
					mainGame.currentRoom.addItem(this);
				}
			}
		}.bind(this));
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