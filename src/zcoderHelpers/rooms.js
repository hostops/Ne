/**
 * Helper and object factory for Rooms.
 *
 * @since 1.0.0
 */
class Rooms {
    
    /**
     * Creates new Room.
     * 
     * @param {number} [size = 100] Size of room in percents. 
     * @returns New instance of Room.
     */
    static room(size = 100){
        return new Room(size/100);
    }

    /**
     * Creates new game over room.
     * 
     * @param {number} [size = 100] Size of game over room in percents. 
     * @returns New instance of GameOverRoom.
     */
    static gameOverRoom(size = 100) {
        return new GameOverRoom(size/100);
    }

        /**
     * Creates new final room.
     * 
     * @param {number} [size = 100] Size of final room in percents. 
     * @returns New instance of FinalRoom.
     */
    static finalRoom(size = 100) {
        return new FinalRoom(size/100);
    }
}

/** Extention method for end user on class Room **/

/**
* Creates new room and moves it to the up of this room.
* 
* @param {number} [size = 100]	Size of room in percents (from 0% to 100%).
* @returns {Room} New room.
*/
Room.prototype.newUpRoom = function newUpRoom(size = 100) {
    var room = Rooms.room(size);
    this.addRoom(room, Direction.UP);
    return room;
 }

 /**
 * Creates new room and moves it to the right of this room.
 * 
 * @param {number} [size = 100]	Size of room in percents (from 0% to 100%).
 * @returns {Room} New room.
 */
Room.prototype.newRightRoom = function newRightRoom(size = 100) {
    var room = Rooms.room(size);
    this.addRoom(room, Direction.RIGHT);
    return room;
 }

 /**
 * Creates new room and moves it to the down of this room.
 * 
 * @param {number} [size = 100]	Size of room in percents (from 0% to 100%).
 * @returns {Room} New room.
 */
Room.prototype.newDownRoom = function newDownRoom(size = 100) {
    var room = Rooms.room(size);
    this.addRoom(room, Direction.DOWN);
    return room;
 }

/**
* Creates new room and moves it to the left of this room.  
* 
* @param {number} [size = 100]	Size of room in percents (from 0% to 100%).
* @returns {Room} New room.
*/
Room.prototype.newLeftRoom = function newLeftRoom(size = 100) {
    var room = Rooms.room(size);
    this.addRoom(room, Direction.LEFT);
    return room;
}   
