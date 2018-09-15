/**
 * Game over room or game over screen is type of room without exit and with big title game over and try again door. 
 * 
 * @property {number} size	Size of room in percents of container size.
 * @property {Item[]} items	Array of items in room.
 * @property {Object.<Direction, Room[]>} rooms	Rooms arranged by directions of current room.
 * @extends {Room}
 * @since 1.0.0
 */
class GameOverRoom extends Room {
	
	/**
	 * Construction for Room.
	 *
	 * @param {number} [size = 1]	Size of room in percents.
	 */
	constructor(size = 1) {
		super(size);
		this.addItem(Items.restartGameButton());
	}

	/**
	 * Draws room and all objects in the room.
	 * @param {context} context	Canvas context to draw on
	 * @param {number} width	Width of the canvas in pixels
	 * @param {number} height	Height of the canvas in pixels
	 */
	draw(context, width, height) {
		this.rooms = {}; // There is no escape from this room. 
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

		context.font = "30px Tahoma";
		context.fillStyle="#800";
		context.textAlign = 'center';
		context.fillText("GAME OVER!", roomSize/2, roomSize/2); 
		context.fillStyle="#000";

		// Remove translation
		context.translate(-left, -top);
	}

}