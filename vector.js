function Vector(x,y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.add = function(other, y) {
	y = y || other;
	if (typeof other === 'number') {
		this.x += other;
		this.y += other;
	} else {
		this.x += other.x;
		this.y += other.y;
	}
	return this;
}

Vector.prototype.sub = function(other, y) {
	y = y || other;
	if (typeof other === 'number') {
		this.x -= other;
		this.y -= other;
	} else {
		this.x -= other.x;
		this.y -= other.y;
	}
	return this;
}

Vector.prototype.mul = function(other, y) {
	y = y || other;
	if (typeof other === 'number') {
		this.x *= other;
		this.y *= other;
	} else {
		this.x *= other.x;
		this.y *= other.y;
	}
	return this;
}

Vector.prototype.div = function(other, y) {
	y = y || other;
	if (typeof other === 'number') {
		this.x /= other;
		this.y /= other;
	} else {
		this.x /= other.x;
		this.y /= other.y;
	}
	return this;
}

Vector.prototype.rotate = function(rotation) {
	var tmp = this.x;
	this.x = this.x*Math.cos(rotation) - this.y*Math.sin(rotation)
	this.y = tmp*Math.sin(rotation) + this.y*Math.cos(rotation)
	return this;
}

Vector.prototype.distance = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
}

Vector.prototype.clamp = function(value, newValue) {
	if (this.x > -value && this.x < value) this.x = newValue;
	if (this.y > -value && this.y < value) this.y = newValue;
	return this
}

Vector.prototype.bound = function(max) {
	var distance = this.distance();
	if (distance > max) this.div(distance).mul(max);
	return this;
}

Vector.prototype.clone = function() {
	return new Vector(this.x, this.y);
}
