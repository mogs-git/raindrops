// Utility functions

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//


class Raindrop {
	constructor() {
		this.plop_height = getRandomInt(height / 2, height);
		this.x = getRandomInt(0, width)
		this.y = 0;
		this.drop_length = 3;
		this.speed = 1 + (Math.random() * 2)
		this.acceleration = 1
		this.colour = "rgb(255,255,255)"
		this.ripple_plop_size = 50;
	}

	draw() {
		stroke(this.colour);
		line(this.x, this.y, this.x, this.y + this.drop_length);
		if ((this.y + this.drop_length) <= this.plop_height) {
			ripple_generators.push(new RippleGenerator(this.x, this.y, this.ripple_plop_size));
		}
	}

	update() {
		this.y += this.speed;
		this.speed += this.acceleration;
		this.draw();
	}
}

class Ripple {
	constructor(x, y, ripple_end_radius) {
		this.x = x;
		this.y = y;
		this.ripple_end_radius = ripple_end_radius;
		this.radius = 2;
		this.growth_rate = 2;
		this.alpha = 1;
	}

	draw() {
		stroke(`rgba(0, 0, 0, ${this.alpha}`)
		ellipse(this.x, this.y, this.radius)
	}

	update() {
		this.draw();
		this.radius += this.growth_rate;
		//this.alpha -= this.growth_rate/this.ripple_end_radius;
	}
}

class RippleGenerator { // makes calls to Ripple
	constructor(x, y, ripple_end_radius) {
		this.x = x;
		this.y = y;
		this.ripple_shrink_rate = 3;
		this.ripple_end_radius = ripple_end_radius;
		this.ripple_rate = 3; // ripple every 3 frames
	}

	make_ripple() {
		ripples.push(new Ripple(this.x, this.y, this.ripple_end_radius));
	}

	update() {
		if ((frameCount % this.ripple_rate) == 0) {
			this.make_ripple();
			this.ripple_end_radius -= this.ripple_shrink_rate
		}
	}
}

// class Artist {

// 	check_for_plop() {

// 	}

// 	remove_raindrop() {

// 	}

// 	make_ripple(x, y) {

// 	}

// }

// global tings
fr = 30;
raindrops = [];
ripples = [];
ripple_generators = [];

function setup() {
	createCanvas(400,400);
	frameRate(fr);
	raindrops.push(new Raindrop)
}

function draw() {
	background(0,0,0);
	clear();
	raindrops.forEach((raindrop, index) => {
		raindrop.update();
		if (raindrop.y+raindrop.drop_length >= raindrop.plop_height) {
			raindrops.splice(index, 1)
		}
	})

	ripple_generators.forEach((generator, index) => {
		generator.update();
		if (generator.ripple_end_radius <= 1) {
			ripple_generators.splice(index, 1)
		}
	})

	ripples.forEach((ripple, index) => {
		ripple.update();
		if (ripple.radius >= ripple.ripple_end_radius) {
			ripples.slice(index, 1)
		}
	})
}