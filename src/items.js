/**
 * Object factory for all kind of items.
 *
 * @since 1.0.0
 */
class Items {
	
	/**
	 * Creates instance of AngryRobot
	 * @returns {AngryRobot} Instance of AngryRobot
	 */
	static angryRobot() {
		return new AngryRobot();
	}
	
	/**
	 * Creates instance of Helper
	 *
	 * @returns {Helper} Instance of Helper
	 */
	static helper() {
		return new Helper();
	}
	
	/**
	 * Creates instance of Bonus
	 *
	 * @returns {Bonus} Instance of Bonus
	 */
	static bonus() {
		return new Bonus();
	}
}