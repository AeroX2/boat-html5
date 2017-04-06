var ship = {
	vectors: [new Vector(0,0), 
			  new Vector(20,20), 
			  new Vector(0,40),
			  new Vector(60,20)],

	p: new Vector(constants.width/2, constants.height/2),
	v: new Vector(),
	a: new Vector(),

	maxV: 5,
	maxA: 3,

	rotation: 0,
	maxRv: Math.PI/72.0,
	rv: 0,

	width: 60,
	height: 40,

	update: function(dt, mouse) {
		this.p.add(this.v);
		this.v.add(this.a);

		this.rotation += this.rv;
		this.rotation += (this.rotation>Math.PI) ? -2*Math.PI : (this.rotation<-Math.PI) ? 2*Math.PI : 0;

		var vector = mouse.clone().sub(this.p);
		var distance = vector.distance();

		var angle = Math.atan2(vector.y, vector.x);
		if (angle < 0) angle = 2*Math.PI + angle;
		var a = angle - this.rotation;
		a += (a>Math.PI) ? -2*Math.PI : (a<-Math.PI) ? 2*Math.PI : 0

		if (distance > 10) { // && (a < -0.01 || a > 0.01)) {
			var t = Math.abs(a/this.maxRv);
			var speed = 2*distance/t*t

			this.rv += a;
			if (this.rv > this.maxRv) this.rv = this.maxRv;
			if (this.rv < -this.maxRv) this.rv = -this.maxRv;

			this.a.x = Math.cos(this.rotation) * speed;
			this.a.y = Math.sin(this.rotation) * speed;
		} else {
			this.a.x = 0;
			this.a.y = 0;
			this.v.x = 0;
			this.v.y = 0;
		}

		//Max velocity and accelaration
		this.v.bound(this.maxV);
		this.a.bound(this.maxA);

		//Friction
		this.v.mul(constants.friction);
		this.v.clamp(0.01, 0);

		this.rv *= constants.friction;
		if (this.rv > -0.01 && this.rv < 0.01) this.rv = 0;

		//Boundary checks
		if (this.p.x < 0) {
			this.v.x = 0;
			this.p.x = 0;
		}
		if (this.p.x > constants.width) {
			this.v.x = 0;
			this.p.x = constants.width;
		}
		if (this.p.y < 0) {
			this.v.y = 0;
			this.p.y = 0;
		}
		if (this.p.y > constants.height) {
			this.v.y = 0;
			this.p.y = constants.height;
		}
	},

	draw: function(g) {
		g.beginPath();

		var vector = this.vectors[0].clone();
		vector.sub(this.width/2, this.height/2);
		vector.rotate(this.rotation);
		vector.add(this.p);
		g.moveTo(vector.x,vector.y);

		for (ttt of this.vectors.slice(1,this.vectors.length)) {
			vector = ttt.clone();
			vector.sub(this.width/2, this.height/2);
			vector.rotate(this.rotation);
			vector.add(this.p);
			g.lineTo(vector.x,vector.y)
		}

		vector = this.vectors[0].clone();
		vector.sub(this.width/2, this.height/2);
		vector.rotate(this.rotation);
		vector.add(this.p);
		g.lineTo(vector.x,vector.y);

		g.stroke();
	}
}
