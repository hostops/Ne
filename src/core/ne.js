/** 
 * Holds instance of main game.
 * 
 * @global
 * @type {Game}
 */
var mainGame;

/** 
 * Holds instance of first room created
 * @global
 * @type {Room}
 */
var mainRoom;

/**
 * Creates new game in body of document.
 */
document.addEventListener("DOMContentLoaded", startNewGame, false);

function startNewGame() {
	mainPlayer = Items.player();
	mainGame = new Game(document.body);
	mainRoom = mainGame.currentRoom;
	mainRoom.addItem(mainPlayer);
	window.requestAnimationFrame(mainGame.update.bind(mainGame));
	start();
}