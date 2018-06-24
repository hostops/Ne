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
document.addEventListener("DOMContentLoaded", function() { 
    mainGame = new Game(document.body);
    mainRoom = mainGame.currentRoom;
	window.requestAnimationFrame(mainGame.update);
}, false);