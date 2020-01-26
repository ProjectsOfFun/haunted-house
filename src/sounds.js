/**
 * sounds.js
 */

class Sound {
	constructor(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
	}

	play() {
		this.sound.play();
	}

	stop() {
		this.sound.pause();
	}
}

const snd = {};

// Link your sound files here

snd.owl = new Sound("audio/owl.mp3");
snd.door = new Sound("audio/door.mp3");
snd.key = new Sound("audio/key.mp3");
snd.pickup = new Sound("audio/treasure_pickup.mp3");
snd.shock = new Sound("audio/shock.mp3");
snd.splash = new Sound("audio/splash.mp3");
snd.ghost = new Sound("audio/ghost.mp3");
snd.falling = new Sound("audio/falling.mp3");
snd.laugh = new Sound("audio/laugh.mp3");
snd.groan = new Sound("audio/groan.mp3");
snd.scream = new Sound("audio/scream.mp3");
snd.fanfare = new Sound("audio/fanfare.mp3");
snd.dog = new Sound("audio/dog.mp3");

//export default snd;