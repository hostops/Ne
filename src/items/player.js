/**
 * Class for main character. This type of item is moving by user input (keyboard arrows).
 *
 * @property {number} width  		Width of item in percents.
 * @property {number} height 		Height of item in percents.
 * @property {number} x      		X coordinate of item in percents.
 * @property {number} y      		Y coordinate of item in percents.
 * @property {Moving} moving 		Moving type of item.
 * @property {Direction} direction	Current direction of moving.
 * @extends {Item}
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
		this.lastRoom = null;
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
	 * @param {Room} room Room where item is located.
	 */
	moveUser(direction, room) {
		this.x -= (direction == Direction.LEFT) / 100;
		this.x += (direction == Direction.RIGHT) / 100;
		this.y += (direction == Direction.DOWN) / 100;
		this.y -= (direction == Direction.UP) / 100;

		// Limit with border of item.
		this.x = Math.min(room.size - this.width, Math.max(0, this.x));
		this.y = Math.min(room.size - this.height, Math.max(0, this.y));
	}

	/**
	 * Places item in room.  It is called when we place
	 * item in room before first update call. Item is placed in new room
	 *
	 * @param {Room} room Room where item is located.
	 */
	place(room) {
		if (mainGame.lastRoom == null) {
			super.place(room);
			return;
		}
		// Find doors of last room in new room.
		Object.keys(room.rooms).forEach(function(direction) {
			for (var i = 0; i < room.rooms[direction].length; i++) {
				if (room.rooms[direction][i] == mainGame.lastRoom){
					// Place it at the right position if user changes room
					var doorsCenter = room.getDoorsCenter(direction, i);
					if (direction == Direction.LEFT) {
						this.x = (DoorConstants.THICKNESS) * (room.size) + 0.01;
						this.y = doorsCenter * room.size; 
					} else if (direction == Direction.UP) {
						this.y = (DoorConstants.THICKNESS) * (room.size) + 0.01;
						this.x = doorsCenter * room.size; 
					} else if (direction == Direction.RIGHT) {
						this.x = (1 - DoorConstants.THICKNESS) * (room.size - this.width) - 0.01;
						this.y = doorsCenter * room.size; 
					} else if (direction == Direction.DOWN) {
						this.y = (1 - DoorConstants.THICKNESS) * (room.size - this.height) - 0.01;
						this.x = doorsCenter * room.size; 
					}  
					return;
				}
			}
		}.bind(this));
		
	}
	
	/**
	 * Updates location and other properties of user.
	 * It is called on animation frame.
	 *
	 * @param {Room} room Room where item is located.
	 */
	update(room) {
		this.moveUser(this.direction, room);

		// Check doors. 
		var xCenter = (this.x + this.width / 2);
		var yCenter = (this.y + this.height / 2);
		var directions = Object.keys(room.rooms);
		directions.forEach(function(direction) {
			var doors = room.rooms[direction];
			for (var i = 0; i < doors.length; i++) {
				var center = room.getDoorsCenter(direction, i);

				var xInDoors = center * room.size < xCenter && xCenter < (center + DoorConstants.LENGTH) * room.size;
				var yInDoors =  center * room.size < yCenter && yCenter < (center + DoorConstants.LENGTH) * room.size;

				if (direction == Direction.UP) {
					yInDoors = this.y < DoorConstants.THICKNESS;
				} else if (direction == Direction.DOWN) {
					yInDoors = this.y + this.height > room.size - DoorConstants.THICKNESS;
				} else if (direction == Direction.RIGHT) {
					xInDoors = this.x + this.width > room.size - DoorConstants.THICKNESS;
				} else if (direction == Direction.LEFT) {
					xInDoors = this.x < DoorConstants.THICKNESS;
				}

				if (xInDoors && yInDoors) {
					// Change room
					mainGame.currentRoom.removeItem(this);
					mainGame.changeCurrentRoom(doors[i]);
					
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