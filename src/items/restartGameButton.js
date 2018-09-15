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
class RestartGameButton extends Item {

    /**
     * Constructor of class Player
     *
     * @param {number} width  Width of item in percents.
     * @param {number} height Height of item in percents. 
     */
    constructor(width, height) {
        super(width, height);
        this.moving = Moving.FIXED;
    }
    /**
     * Places item in room.  It is called when we place
     * item in room before first update call. Item is placed in new room
     *
     * @param {Room} room Room where item is located.
     */
    place(room) {
        this.x = room.size / 2 - this.width / 2;
        this.y = room.size - this.height;
    }

    /**
     * Updates location and other properties of user.
     * It is called on animation frame.
     *
     * @param {Room} room Room where item is located.
     */
    update(room) {
        if (room.items.indexOf(mainPlayer) != -1) {
            if (this.x < mainPlayer.x + mainPlayer.width / 2 && mainPlayer.x + mainPlayer.width / 2 < this.x + this.width &&
                this.y < mainPlayer.y + mainPlayer.height / 2 && mainPlayer.x + mainPlayer.height / 2 < this.y + this.height) {
                // Remove old game.
                window.removeEventListener("keydown", mainPlayer.startUserAction);
                window.removeEventListener("keyup", mainPlayer.endUserAction);
                document.body.removeChild(document.querySelector("canvas"));
                // Start new game.
                startNewGame();
            }
        }
    }


	/**
	 * Draws button on canvas.
	 * 
	 * @param {Object} context	2D context of Canvas
	 * @param {number} size		Size of canvas in pixels
	 */
	draw(context, size) {
        //Draw button
        context.fillStyle="#080";
        context.beginPath();
		context.fillRect(this.x * size, this.y * size, this.width * size, this.height * size)
        context.fill();
        
        //Draw text
        context.font = "10px Tahoma";
        context.fillStyle="#000";
        context.fillText("Try again!", this.x * size + (this.width * size) / 2, this.y * size + (this.height * size) / 2); 
	}
}