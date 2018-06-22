class Game {
	constructor(container) {
		this.canvas = document.createElement("canvas");
		this.canvas.style.width = "90vw"
		this.canvas.style.height = "60vh";
		container.appendChild(this.canvas);
		this.items = [];
	}
	addItem(item) {
		this.items.push(item);
	}
}