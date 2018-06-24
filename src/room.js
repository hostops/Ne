/**
 * Room class is one of main entities of the game. It contains items 
 * and is place where user can do all of his work (fight monsters, collect items, ...).
 * User can leave room with entering anotherone. 
 * 
<<<<<<< HEAD
 * @property {number} width  Width of room in percents.
 * @property {number} height Height of room in percents.
 * @property {Item[]} items  Array of items in room.
=======
 * @property {number} size		Size of room in percents of container size.
 * @property {Item[]} items		Array of items in room.
>>>>>>> 56e5f55d0c7216977c7203ed4905b48f7ca8e396
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