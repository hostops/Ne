/**
 * Static object for logging data and errors.
 * It supports multiple levels of error logging.
 *
 * @since 1.0.0
 */
class Logger {

	/**
	 * Logs arguments received to console separated by spaces.
	 *
	 * @param {Array} args	Arguments to log to console
	 */
	static log(...args) {
		console.log("[LOG] " + args.join(" "));
	}

	/**
	 * Logs arguments received to console separated by spaces.
	 *
	 * @param {Array} args	Arguments to log to console
	 */
	static error(...args) {
		console.log("[ERROR] " + args.join(" "));
	}

	/**
	 * Logs arguments received to console separated by spaces.
	 *
	 * @param {Array} args	Arguments to log to console
	 */
	static debug(...args) {
		console.log("[DEBUG] " + args.join(" "));
	}

	/**
	 * Logs arguments received to console separated by spaces.
	 *
	 * @param {Array} args	Arguments to log to console
	 */
	static info(...args) {
		console.log("[INFO] " + args.join(" "));
	}

	/**
	 * Logs arguments received to console separated by spaces.
	 *
	 * @param {Array} args	Arguments to log to console
	 */
	static warn(...args) {
		console.log("[WARNING] " + args.join(" "));
	}

}