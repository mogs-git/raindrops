// Utility functions

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//


class Raindrop {
	constructor() {
		this.plop_height = getRandomInt(height / 10, height);
		this.x = getRandomInt(0, width)
		this.y = 0;
		this.drop_length = 3;
		this.speed = 1 + (Math.random() * 2)
		this.acceleration = 1
		this.colour = "rgb(255,255,255)"
		this.ripple_plop_size = 200;
	}

	draw() {
		stroke(this.colour);
		line(this.x, this.y, this.x, this.y + this.drop_length);
		if ((this.y + this.drop_length) >= this.plop_height) {
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
		this.growth_rate = 0.8;
		this.alpha = 1;
	}

	draw() {
		noFill();
		strokeWeight(1.5);
		stroke(`rgba(255, 255, 255, ${this.alpha})`)
		ellipse(this.x, this.y, this.radius, this.radius/2.5)
	}

	update() {
		this.draw();
		this.radius += this.growth_rate;
		this.alpha = 1-(this.radius/this.ripple_end_radius);
	}
}

class RippleGenerator { // makes calls to Ripple
	constructor(x, y, ripple_end_radius) {
		this.x = x;
		this.y = y;
		this.ripple_shrink_rate = 3;
		this.ripple_end_radius = ripple_end_radius;
		this.ripple_start_rate = 15; 
		this.ripple_sequence_rate = 23;
		this.n_ripples = 0;
		this.frames_since_birth = 0;
		this.ripple_sequence = [15,18,21,28,37,50,70,90,125,160].map(x => Math.floor(x*0.6))
	}

	make_ripple() {
		ripples.push(new Ripple(this.x, this.y, this.ripple_end_radius));
		//this.ripple_rate += this.ripple_sequence_rate
		this.n_ripples += 1;
	}

	update() {
		if ((this.ripple_sequence.includes(this.frames_since_birth))) {
			console.log("new ripple")
			this.make_ripple();
		}
		this.frames_since_birth+=1
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
n_raindrops = 20
chance_of_rain = 0.05;
raindrops = [];
ripples = [];
ripple_generators = [];
//let song;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(fr);
	raindrops.push(new Raindrop)
}

function draw() {
	//drawingContext.clearRect(0, 0, width, height);

	background(0,0,0);
	if (Math.random(1) < chance_of_rain) {
		raindrops.push(new Raindrop);
	}

	raindrops.forEach((raindrop, index) => {
		raindrop.update();
		if (raindrop.y+raindrop.drop_length >= raindrop.plop_height) {
			raindrops.splice(index, 1)
		}
	})

	ripple_generators.forEach((generator, index) => {
		generator.update();
		if (generator.n_ripples == 10) {
			ripple_generators.splice(index, 1)
		}
	})

	ripples.forEach((ripple, index) => {
		ripple.update();
		if (ripple.radius > ripple.ripple_end_radius) {
			//console.log(`${ripple.radius} versus ${ripple.ripple_end_radius}`)
			ripples.splice(index, 1)
		}
	})
}