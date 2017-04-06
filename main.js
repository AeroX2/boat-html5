var canvas = document.getElementById('canvas');

var player = {
	vectors: [[0,0], [20,20], [0,40], [60,20]],

	x: canvas.width/2,
	y: canvas.height/2,

	maxV: 5,
	vx: 0,
	vy: 0,

	maxA: 3,
	ax: 0,
	ay: 0,

	rotation: 0,
	maxRv: Math.PI/72.0,
	rv: 0,

	width: 60,
	height: 40,

	update: function(delta, mouse) {
		this.x += this.vx // * delta;
		this.y += this.vy // * delta;
		this.vx += this.ax// * delta;
		this.vy += this.ay// * delta;
		this.rotation += this.rv;

		var distance = Math.sqrt(Math.pow(mouse.y - this.y,2) + Math.pow(mouse.x - this.x,2))

		var angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
		if (angle < 0) angle = 2*Math.PI + angle;
		var a = angle - this.rotation;
		a += (a>Math.PI) ? -2*Math.PI : (a<-Math.PI) ? 2*Math.PI : 0

		if (distance > 3 ) { //&& (a < -0.01 || a > 0.01)) {
			var t = Math.abs(a/this.maxRv);
			var speed = 2*distance/t*t

			this.rv += a;
			if (this.rv > this.maxRv) this.rv = this.maxRv;
			if (this.rv < -this.maxRv) this.rv = -this.maxRv;

			this.ax = Math.cos(this.rotation) * speed;
			this.ay = Math.sin(this.rotation) * speed;
		} else {
			this.ax = 0;
			this.ay = 0;
			this.vx = 0;
			this.vy = 0;
		}

		var v = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy,2));
		if (v > this.maxV) {
			this.vx = this.vx / v * this.maxV;
			this.vy = this.vy / v * this.maxV;
		}

		var a = Math.sqrt(Math.pow(this.ax, 2) + Math.pow(this.ay,2));
		if (a > this.maxA) {
			this.ax = this.ax / a * this.maxA;
			this.ay = this.ay / a * this.maxA;
		}

		//Friction
		this.vx *= 0.98;
		this.vy *= 0.98;
		this.rv *= 0.98;
		if (this.vx > -0.01 && this.vx < 0.01) this.vx = 0;
		if (this.vy > -0.01 && this.vy < 0.01) this.vy = 0;
		if (this.rv > -0.01 && this.rv < 0.01) this.rv = 0;

		//Boundary checks
		if (this.x < 0) {
			this.vx = 0;
			this.x = 0;
		}
		if (this.x > canvas.width) {
			this.vx = 0;
			this.x = canvas.width;
		}
		if (this.y < 0) {
			this.vy = 0;
			this.y = 0;
		}
		if (this.y > canvas.height) {
			this.vy = 0;
			this.y = canvas.height;
		}
	},

	draw: function(g) {
		g.beginPath();
		var x = this.vectors[0][0]-this.width/2;
		var y = this.vectors[0][1]-this.height/2;
		var tmp = x;
		x = x*Math.cos(this.rotation) - y*Math.sin(this.rotation)
		y = tmp*Math.sin(this.rotation) + y*Math.cos(this.rotation)
		x += this.x;
		y += this.y;

		g.moveTo(x,y);
		for (let vector of this.vectors.slice(1,this.vectors.length)) {
			x = vector[0]-this.width/2;
			y = vector[1]-this.height/2;

			var tmp = x;
			x = x*Math.cos(this.rotation) - y*Math.sin(this.rotation)
			y = tmp*Math.sin(this.rotation) + y*Math.cos(this.rotation)
			x += this.x;
			y += this.y;

			g.lineTo(x,y)
		}

		x = this.vectors[0][0]-this.width/2;
		y = this.vectors[0][1]-this.height/2;
		var tmp = x;
		x = x*Math.cos(this.rotation) - y*Math.sin(this.rotation)
		y = tmp*Math.sin(this.rotation) + y*Math.cos(this.rotation)
		x += this.x;
		y += this.y;

		g.lineTo(x,y);
		g.stroke();
	}
}

var mouse = {x: canvas.width/2, y: canvas.height/2};
function updateMouse(evt) {
    var rect = canvas.getBoundingClientRect();
    mouse = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
	//console.log('Mouse click at', mouse.x, mouse.y)
}

function update(delta) {
	player.update(delta, mouse)
}

function draw() {
	g.clearRect(0, 0, canvas.width, canvas.height);
	player.draw(g);
}

function loop(timestamp) {
	var delta = timestamp - lastTimestamp
	update(delta)
	draw()

	lastTimestamp = timestamp
	window.requestAnimationFrame(loop)
}

var g = canvas.getContext("2d")
window.addEventListener('mousedown', updateMouse, false);

//Start gameloop
var lastTimestamp = 0
window.requestAnimationFrame(loop)
