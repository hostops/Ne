/**
 * Room class is one of main entities of the game. It contains items 
 * and is place where user can do all of his work (fight monsters, collect items, ...).
 * User can leave room with entering anotherone. 
 * 
 * @property {number} width  Width of room in percents.
 * @property {number} height Height of room in percents.
 * @property {Item[]} items  Array of items in room.
 * @since 1.0.0
 */
class Room {
	
	/**
	 * Construction for Room.
	 *
	 * @param {number} width  Width of the room in percents.
	 * @param {number} height Height of the room in percents.
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

	draw(context, width, height) {
		
	}
}