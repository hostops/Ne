/**
 * Room class is one of main entities of the game. It contains items 
 * and is place where user can do all of his work (fight monsters, collect items, ...).
 * User can leave room with entering anotherone. 
 * 
 * @property {number} 						size	Size of room in percents of container size.
 * @property {Item[]} 						items	Array of items in room.
 * @property {Object.<Direction, Room[]>}	rooms	Rooms arranged by directions of current room.
 * @since 1.0.0
 */
class Room {
	
	/**
	 * Construction for Room.
	 *
	 * @param {number} [size = 1]	Size of room in percents.
	 */
	constructor(size = 1) {
		this.size = size;
		this.items = [];

		// Create array for each direction
		this.rooms = {};
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

	removeItem(item) {
		this.items.splice(this.items.indexOf(item), 1);
	}

	/**
	 * Connects this room with another room in specified direction.
	 * The room is placed in this.rooms object
	 * @param {Room} room				The room we want to connect to this room.
	 * @param {Direction} direction		The direction where we want to place the room.
	 * @param {function} checkFunction	Function that checks if player can move in room.
	 */
	addRoom(room, direction, checkFunction) {
		var inversedDirection = Direction.inverse(direction);
		// Exit if the rooms are already connected.
		if (direction in this.rooms && this.rooms[direction].indexOf(room) != -1) {
			Logger.info("Room already added.", room);
			return;
		}

		// If the direction or inversedDirection is not already in rooms, insert new empty array
		if (!(direction in this.rooms)) {
			this.rooms[direction] = [];
		}
		if (!(inversedDirection in room.rooms)) {
			room.rooms[inversedDirection] = [];
		}

		if (this.rooms[direction].length >= DoorConstants.MAX_NUMBER) {
			Logger.info("Too many doors in direction", direction);
		}
		if (room.rooms[inversedDirection].length >= DoorConstants.MAX_NUMBER) {
			Logger.info("Too many doors in direction", inversedDirection);
		}

		// Add room to array and add link to this room to other room too
		this.rooms[direction].push(room);
		room.rooms[inversedDirection].push(this);
		
	}

	/**
	 * Draws doors to other rooms specified in this.rooms
	 * @param {context} context	Canvas context to draw on
	 * @param {number} size		Size of canvas in pixels
	 */
	drawDoors(context, size) {
		// Draw doors
		var directions = Object.keys(this.rooms);
		directions.forEach(function(direction) {
			
			var doors = this.rooms[direction];
			var segmentLength = size / doors.length;

			var doorLength = DoorConstants.LENGTH * size;
			var doorThickness = DoorConstants.THICKNESS * size;

			for (var i = 0; i < doors.length; i++) {
				var centerOfSegment = (i * segmentLength) + (segmentLength / 2);

				var x, y, doorWidth, doorHeight;
				if (direction == Direction.UP || direction == Direction.DOWN) {
					x = centerOfSegment - doorLength / 2;
					y = (direction == Direction.DOWN) * (size - doorThickness);
					doorWidth = doorLength;
					doorHeight = doorThickness;
				} else {
					x = (direction == Direction.RIGHT) * (size - doorThickness);
					y = centerOfSegment - doorLength / 2;
					doorWidth = doorThickness;
					doorHeight = doorLength;
				}

				context.fillRect(x, y, doorWidth, doorHeight);
			}
		}.bind(this));
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

		// Draw doors to other connected rooms
		this.drawDoors(context, roomSize);

		// Draw all items in room
		this.items.forEach(function(item) {
			item.update(this);
			item.draw(context, width < height ? widht : height);
		}.bind(this));

		// Remove translation
		context.translate(-left, -top);
	}

}