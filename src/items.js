/**
 * Helper and object factory for all kind of items that can be put in rooms.
 *
 * @since 1.0.0
 */
class Items {
	
	/**
	 * Creates instance of player.
	 * 
	 * @param {number} [width = 10]	Width of player in percents (form 0 % to 100 %).
	 * @param {number} [height = 10]	Height of player in percents (form 0 % to 100 %).
	 * @returns {Player} Instance of player.
	 */
	static player(width = 5, height = 5) {
		return new Player(width / 100, height / 100);
	}

	/**
	 * Creates instance of AngryRobot.
	 * 
	 * @returns {AngryRobot} Instance of AngryRobot.
	 */
	static angryRobot() {
		return new AngryRobot();
	}
	
	/**
	 * Creates instance of Helper.
	 *
	 * @returns {Helper} Instance of Helper.
	 */
	static helper() {
		return new Helper();
	}
	
	/**
	 * Creates instance of Bonus.
	 *
	 * @returns {Bonus} Instance of Bonus.
	 */
	static bonus() {
		return new Bonus();
	}
}