var mainRoom;
var mainGame;
document.addEventListener("DOMContentLoaded", function() { 
    mainGame = new Game(document.body);
    mainRoom = new Room();
    mainGame.addItem(mainRoom);
}, false);