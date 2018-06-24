/**
 * Room class is one of main entities of the game. It contains items 
 * and is place where user can do all of his work (fight monsters, collect items, ...).
 * User can leave room with entering anotherone. 
 * 
 * @property {number} width  Width of room in tiles.
 * @property {number} height Height of room in tiles.
 * @property {Item[]} items  Array of items in room.
 * @since 1.0.0
 */
class Room {
	
	/**
	 * Construction for Room.
	 *
	 * @param {number} widht  Width of the room in tiles.
	 * @param {number} height Height of the room in tiles.
	 */
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.items = [];
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
}