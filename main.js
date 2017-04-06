function updateMouse(evt) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = evt.clientX - rect.left;
    mouse.y = evt.clientY - rect.top;
}

function timestamp() {
	return performance && performance.now ? performance.now() : null; //new Date().getTime();
}

var last = 0;
var accumulator = 0;
function loop() {
	var now = timestamp();
	var dt = Math.min(1, (now - last) / 1000);
	accumulator += dt;
	while(accumulator >= constants.step) {
		this.accumulator -= constants.step;
		update(constants.step);
	}
	draw();
	last = now;
	requestAnimationFrame(loop)
}

function update(dt) {
	ship.update(dt, mouse)
}

function draw() {
	g.clearRect(0, 0, constants.width, constants.height);
	ship.draw(g);
}


var mouse = new Vector(constants.width/2, constants.height/2);
var canvas = document.getElementById('canvas');
var g = canvas.getContext("2d")

addEventListener('load', function load(event) {
	canvas.width = constants.width;
	canvas.height = constants.height;
	mouse.x = constants.width/2;
	mouse.y = constants.height/2;

	addEventListener('mousedown', updateMouse, false);
	requestAnimationFrame(loop)
});
