/**
 * Helper and object factory for all kind of items that can be put in rooms.
 *
 * @since 1.0.0
 */
class Items {
	
	/**
	 * Creates instance of type player.
	 * 
	 * @param {number} [width = 10]	Width of player in percents (form 0 % to 100 %).
	 * @param {number} [height = 10]	Height of player in percents (form 0 % to 100 %).
	 * @returns {Player} Instance of player.
	 */
	static player(width = 5, height = 5) {
		return new Player(width / 100, height / 100);
	}

	/**
	 * Creates instance of type AngryRobot.
	 * 
	 * @returns {AngryRobot} Instance of AngryRobot.
	 */
	static angryRobot() {
		return new AngryRobot();
	}
	
	/**
	 * Creates instance of type Helper.
	 *
	 * @returns {Helper} Instance of Helper.
	 */
	static helper() {
		return new Helper();
	}
	
	/**
	 * Creates instance of type Bonus.
	 *
	 * @returns {Bonus} Instance of Bonus.
	 */
	static bonus() {
		return new Bonus();
	}

	/**
	 * Creates instance of RestartGameButton.
	 * @param {number} [width = 10]	Width of button in percents (form 0 % to 100 %).
	 * @param {number} [height = 10] Height of button in percents (form 0 % to 100 %).
	 * @returns {Bonus} Instance of RestartGameButton.
	 */
	static restartGameButton(width = 10, height = 5) {
		return new RestartGameButton(width / 100, height / 100);
	}
}