var canvas = document.getElementById('canvas');

function update(dt) {
	ship.update(dt, mouse)
}

function draw() {
	g.clearRect(0, 0, canvas.width, canvas.height);
	ship.draw(g);
}

var mouse = {x: canvas.width/2, y: canvas.height/2};
function updateMouse(evt) {
    var rect = canvas.getBoundingClientRect();
    mouse = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function timestamp() {
	return performance && performance.now ? performance.now() : null; //new Date().getTime();
}

var dt = 0;
var last = 0;
var step = 1/60;

function loop() {
	var now = timestamp();
	dt += Math.min(1, (now - last) / 1000);
	while(dt > step) {
		dt = dt - step;
		update(step);
	}
	draw();
	last = now;
	requestAnimationFrame(loop)
}

var g = canvas.getContext("2d")
addEventListener('mousedown', updateMouse, false);
requestAnimationFrame(loop)
