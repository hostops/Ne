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
		this.moving = Moving.RANDOM;
		this.width = width;
		this.height = height;
		this.x = 0;
        this.y = 0;
        this.tempX = 0;
        this.tempY = 0;
        window.addEventListener("keydown", this.userAction.bind(this));
	}
    
    /**
     * User action event. Event is fired on keydown.
     * @param {Object} e Event.
     */
    userAction(e){
        switch (e.keyCode()) {
            case 37: this.moveUser(Direction.LEFT);
            case 38: this.moveUser(Direction.UP);
            case 39: this.moveUser(Direction.RIGHT);
            case 40: this.moveUser(Direction.DOWN);
        }
    }

    /** 
     * Moves user in specified direction.
     * @param {Direction} direction Direction to move to.
     */
    moveUser(direction) {
        this.tempX -= (direction == Direction.LEFT) / 100;
        this.tempX += (direction == Direction.RIGHT) / 100;
        this.tempY -= (direction == Direction.DOWN) / 100;
        this.tempY += (direction == Direction.UP) / 100;
    }

	/**
	 * Places item in room.  It is called when we place
	 * item in room before first update call.
	 *
	 * @param {Room} room Room where item is located.
	 */
	place(room) {
		this.x = Math.floor((Math.random() * room.width));
        this.y = Math.floor((Math.random() * room.height));
        this.tempX = this.x;
        this.tempY = this.y;
	}
	
	/**
	 * Updates location and other properties of user.
	 * It is called on animation frame.
	 *
	 * @param {Room} room Room where item is located.
	 */
	update(room) {
        this.x = this.tempX > 0 && this.tempX + this.width < 1? this.tempX : this.Y;
        this.y = this.tempY > 0 && this.tempY + this.height < 1? this.tempY : this.Y;
	}
	
	
	/**
	 * Draws object on canvas.
	 * 
	 * @param {Object} context	2D context of Canvas
	 * @param {number} size		Size of canvas in pixels
	 */
	draw(context, size) {
        context.fillStyle = "#000";
        context.beginPath();
		context.arc(this.x * size, this.y * size, this.width * size, 0, Math.PI * 2);
		context.fill();
	}
}