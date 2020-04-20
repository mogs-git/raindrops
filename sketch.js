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
		this.ripple_plop_size = 30;
	}

	draw() {
		stroke(this.colour);
		line(this.x, this.y, this.x, this.y + this.drop_length);
		if ((this.y + this.drop_length) == this.plop_height) {
			ripples.push(new Ripple(this.x, this.y, this.ripple_plop_size);
		}
	}

	update() {
		this.y += speed;
		this.speed += acceleration;
		this.draw();
	}
}

class Ripple {
	constructor(x, y, ripple_end_diameter) {
		this.x = x;
		this.y = y;
		this.radius = 2;
		this.growth_rate = 2;
		this.alpha = 1;
		this.ripple_shrink_rate = 3;
		this.ripple_end_diameter = ripple_end_diameter;
		this.ripple_rate = 3; // ripple every 3 frames
	}

	ripple() {
		ripples.push(new Ripple(this.x, this.y, this.ripple_end_diameter-this.ripple_shrink_rate))
	}

	draw() {
		stroke(`rgba(0, 0, 0, ${this.alpha}`)
		ellipse(this.x, this.y, this.radius)
	}

	update() {
		this.draw();
		this.radius += growth_rate;
		this.alpha -= this.growth_rate/this.ripple_end_diameter;
		if (frameCount % this.ripple_rate == 0) {
			ripple();
		}
	}
}

// class RippleGenerator { // makes calls to Ripple
// 	constructor(x, y, ripple_end_diameter, ripple_sets) {
// 		this.ripple_rate = fr; // 1 new ripple per second
// 		this.ripple_shrink_rate = 3;
// 		this.ripple_end_diameter = getRandomInt(25,35);
// 		this.ripple_sets = ripple_sets;
// 	}

// 	make_ripple() {
// 		if frameCount % ripple_rate == 0 {
// 			new Ripple(this.x, this.y)
// 		}
// 	}
// }

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

function setup() {
	createCanvas(400,400);
	frameRate(fr);
	raindrops.push(new Raindrop)
}

function draw() {
	background(0,0,0);
	raindrops.forEach((drop) => {
		drop.update()
	})

	ripples.forEach((ripple) => {
		ripple.update()
	})
}