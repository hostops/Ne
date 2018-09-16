/**
 * Game over room or game over screen is type of room without exit and with big title game over and try again door. 
 * 
 * @property {number} size	Size of room in percents of container size.
 * @property {Item[]} items	Array of items in room.
 * @property {Object.<Direction, Room[]>} rooms	Rooms arranged by directions of current room.
 * @extends {Room}
 * @since 1.0.0
 */
class FinalRoom extends Room {

	/**
	 * Adds new item object in room. It places it in this.items array. When player is added there are removed all doors.
	 * 
	 * @param {Item} item Item to be placed in room.
	 */
	addItem(item) {
		if (item == mainPlayer) {
			this.rooms = {}; // There is no escape from this room. 
		}
		super.addItem(item);
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

		
		context.fillStyle="#080";
		context.textAlign = 'center';
		context.font = "20px Tahoma";
		context.fillText("Congratulations!", roomSize/2, roomSize/2); 
		context.fillText("You finished the game!", roomSize/2, roomSize/2+30); 
		context.fillStyle="#000";

		// Remove translation
		context.translate(-left, -top);
	}

}