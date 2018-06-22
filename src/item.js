const Moving = Object.freeze({
    RANDOM:	0,
    UP_DOWN: 1,
    LEFT_RIGHT: 2
});

class Item {
	
	constructor() {
		this.moving = Moving.RANDOM;
		this.widht = 10;
		this.height = 10;
		this.x = Math.floor((Math.random() * 10) + 1);
		this.z = Math.floor((Math.random() * 10) + 1);
	}
	update(room) {
		
	}
	draw(context, tileSize, width, height) {

	}
}