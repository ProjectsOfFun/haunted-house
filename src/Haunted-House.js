//@prepros-prepend objects.js
//@prepros-prepend rooms.js
//@prepros-prepend verbs.js
//@prepros-append interface.js


// Initialize DOM items as JS variables
const $display = document.getElementById('hh-output');
const $inputZone = document.getElementById('hh-input');
const $userInput = document.getElementById('hh-userInput');
const $inputForm = document.getElementById('hh-input-form');
const $restartBtn = document.getElementById('hh-reload');

let totalScore = 0;
let winner = false;
let lightLevel = 60; // LL
let currentRoom = rooms["pathThroughIronGate"]; // RM 57
let previousRoom = null;
let message = "OK"; // M$
let previousObj = null;


// Set the machine name of all the rooms to .rid for easy reference
for (let room in rooms) {
	rooms[room].rid = room;
}

for (let key in verbs) {
	verbs[key].name = key;
}

for (let key in objects) {
	objects[key].id = key;
	if (!objects[key].name) {
		objects[key].name = key;
	}
}


// Set the game flags object
const flags = {
	frontDoorOpen: true, // flags[23]
	candleLit: false, // flags[0]
	ghostsAttacking: true, // flags[27]
	vacuumSwitchedOn: false, // flags[24]
	vacuumHasPower: false,
	batsAttacking: false, // flags[26]
	magicalBarrier: true, //flags[34]
	hallDoorLocked: true,
	barsDug: false,
	ropeTiedToTree: true,
	studyWallBroken: false,
	inBoat: false,
	sinking: 0,
	wearingCoat: false
}

//flags[2] = 1; // RING
//flags[17] = 1; // Candle - Drawer open
//flags[28] = 1; // ?????
//flags[35] // Set to 1 if you can move
//flags[14] // IN TREE



/**
 * Primary loop for rendering the screen.
 */
function display() {
	const extraInfo = getExtraDescription(currentRoom);
	const roomItems = getObjectsInRoom(currentRoom);

	cls(); // Clear the screen

	prnt(`HAUNTED HOUSE`);
	prnt(`---------------------------------------------<br>`);
	prnt(`<span class="room-name">${currentRoom.name}</span>`);

	if (extraInfo && currentRoom.description) {
		prnt(`<br>${currentRoom.description} ${extraInfo}`);
	} else if (extraInfo) {
		prnt(`<br>${extraInfo}`);
	} else if (currentRoom.description) {
		prnt(`<br>${currentRoom.description}`);
	}

	prnt(`<br><span class="exits">Exits:</span>${splitExits(currentRoom.exits)}`)

	if (roomItems) prnt(roomItems);

	prnt(`<br>---------------------------------------------<br>`);
	prnt(`<span class="message">${message}</span>`);

	// if (winner) {
	// 	$inputZone.style.display = 'none';
	// }

	message = "What?";
	debugInfo();
}


/**
 * Gets additional description text to be added based on flags.
 * @param {object} roomObject The room to be analyzed
 * @returns {string|false} Additional flavor text or false if so extra text
 */
function getExtraDescription(roomObject) {
	let output = "";
	if (objects["boat"].location === roomObject.rid) {
		if (flags.inBoat) {
			output += `You are in the boat.`;
		} else {
			output += `There is a boat here.`;
		}
	}
	if (output === "") output = false;
	return output;
}


/**
 * List any objects that are in view.
 * @param {object} roomObject The room to be analyzed
 * @returns {string|false} A list of object names, or false if nothing in room
 */
function getObjectsInRoom(roomObject) {
	let output = "";
	for (let obj in objects) { // Look for objects in room
		if (objects[obj].location == roomObject.rid && objects[obj].portable) {	
			output += `<br/><span class="message objects-in-room">You can see ${objects[obj].name} here.</span>`;
		}
	}
	if (output === "") output = false;
	return output;
}


/**
 * Outputs HTML to the display with a line feed at the end.
 * @param {string} text The line to be printed
 */
function prnt(text) {
	$display.innerHTML += text + "<br>";
}


/**
 * A quick helper to clear the screen!
 */
function cls() {
	$display.innerHTML = '';
}


/**
 * Renders a room's exits as a comma separated list
 * @param {object} exits The sub object of exits
 * @returns {string} A list of exits
 */
function splitExits(exits) {
	if (!exits) return "No exits!";
	let exitListing = "";
	for (let exit in exits) {
		exitListing += exit.toUpperCase() + ", ";
	}
	// Replace last ocurrance of ", "
	exitListing = exitListing.replace(new RegExp(", " + '$'), '');
	// Replace last comma with ampersand
	let n = exitListing.lastIndexOf(", ");
	exitListing = exitListing.slice(0, n) + exitListing.slice(n).replace(", ", " &amp; ");
	if (exitListing == "") return "No exits!";
	return exitListing;
}


/**
 * Parses the user input into a verb and a noun
 * @param {string} myInput The value of the input field
 */
function parseInput(myInput) {

	myInput = myInput.trim().toLowerCase();

	let verb = null;
	let noun = null;

	for (let i = 0; i < myInput.length;i++) { // Parse verb and noun from input
		if (myInput.substring(i,i+1) === " " && !verb) {
			verb = myInput.substring(0,i);
			noun = myInput.substring(i+1,myInput.length).trim();
			break;
		} else if (myInput.indexOf(' ') < 0) { // One word input
			verb = myInput.trim();
			noun = null;
			break;
		}
	}

	// Check if words exist as objects
	let vb = getVerb(verb);
	let ob = getNoun(noun);

	// If verb has a synonym, change the verb to synonym
	if (vb.synonym) {
		verb = vb.synonym;
		vb = getVerb(verb);
	}

	// If noun has a synonym, change the object to synonym
	if (ob.synonym) {
		noun = ob.synonym;
		ob = getNoun(noun);
	}

	// Save keystrokes by reusing object from last parse
	if (noun === "it" && previousObj) {
		ob = previousObj;
		noun = ob.id;
	}

	let error = false;

	if (noun && !ob) {
		message = "That's silly!";
	}
	if (!noun && !vb.singleWord) {
		message = "I need two words.";
		error = true;
	}
	if (!vb && ob) {
		message = "You can't &quot;" + myInput + ".&quot;"	;
	}
	if (!vb && !ob) {
		message = "You don't make sense.";
	}
	if (vb && ob.portable && ob.location != "player") {
		message = "You don't have '" + noun + "'";
	}
	
	// if (flags[26] == 1 && room==13 && Math.random()*3 <= 2 && vb != 20) {
	// 	message = "BATS ATTACKING!";
	// }
	
	// Candle slowly bruns down if lit
	if (flags.candleLit) {
		lightLevel--;
	}

	// RUN THE VERB SUBROUTINE
	if (!error) {
		verbSubroutine(verb,noun,vb,ob);
	}

	// POST VERB MESSAGES
	if (flags.candleLit && lightLevel > 1 && lightLevel < 11) {
		message += `<br>Your candle is waning!`;
	}
	if (lightLevel == 1) {
		message += `<br>Your candle has gone out!`;
		flags.candleLit = false;
		lightLevel = 0;
		objects["candle"].location = null;
	}

	if (flags.batsAttacking) {
		message += `<br>Bats attacking!`;
	}
	if (currentRoom.water && !flags.inBoat) {
		flags.sinking++;
		message += `<br>You are sinking in the bog!`;
		if (flags.sinking > 3) {
			death(`Flailing and struggling, you sink deeper and deeper into the sticky bog. Despite your efforts, the water envelops you.`);
			return
		} if (flags.sinking === 3) {
			message += ` Do something, quick!`;
		}
	}

	previousObj = ob;
	display();
}


/**
 * Searches verb object and returns object of verb if matches.
 * @param {string} verb The verb as parsed from the input
 * @returns {object}
 */
function getVerb(verb) {
	for (let obj in verbs) {
		if (obj == verb) {
			return verbs[obj];	
		}
	}
	return false;
}


/**
 * Searches the objects object for item passed as noun
 * @param {string} noun The key value of the object
 * @returns {object}
 */
function getNoun(noun) {
	for (let obj in objects) {
		if (obj == noun) {
			return objects[obj];	
		}
	}
	return false;
}


/**
 * Process the user input.
 * @param {string} verb The user typed in verb.
 * @param {string} noun The user typed in noun
 * @param {object} vb The verb object
 * @param {object} ob The noun object
 */
function verbSubroutine(verb,noun,vb,ob) {

	// Does the object contain unique actions?
	if (ob.hasOwnProperty('overrides')) {
		// Does the current verb match any of the overriddes?
		if (objectInRange(ob) || ob.omnipresence) {
			if (ob['overrides'].hasOwnProperty(verb)) {
				ob.overrides[verb]();
				return;
			}
		}

	}

	if (!vb) return;
	vb.action(noun,ob);
}


/**
 * Counts all the scorable objects held by the player.
 * @returns {number}
 */
function checkScore() {
	let score = 0;
	score = 0;
	for (let key in objects) {
		if (objects[key].location == "player" && objects[key].score) {
			score += objects[key].score;
		}
	}
	// carrying.map(function(obj,i){
	// 	if (obj) {
	// 		score++	
	// 	}
	// });
	// if (score == 17 && room == 57) {
	// 	score = score * 2;
	// 	message = "DOUBLE YOUR SCORE FOR REACHING HERE\<br\>YOUR SCORE=" + score;
	// 	if (score > 18) {
	// 		message += "\<br\>WELL DONE,YOU FINISHED THE GAME!"	
	// 	}
	// 	winner = true;
	// }
	return score;
}


/**
 * Tallies all the scorable objects to get total possible score.
 * @returns {number}
 */
function getMaxScore() {
	let maxScore = 0;
	for (let key in objects) {
		if (objects[key].score) {
			maxScore += objects[key].score;
		}
	}
	return maxScore;
}


/**
 * Gets the room object of specified room.
 * @param {string} room The machine name of the room you want to get 
 */
function getRoom(room) {
	return rooms[room];
}


/**
 * Gets the "object" object of specified noun.
 * @param {string} noun The machine name of the object you want to get 
 */
function getObject(noun) {
	return objects[noun];
}


function death(message) {
	$inputZone.remove();
	cls();
	prnt(`HAUNTED HOUSE`);
	prnt(`---------------------------------------------<br>`);
	prnt(`<span class="message">${message}</span>`);
	prnt(`<br><span class="room-name">You Have Died!</span>`);
	prnt(`<br>---------------------------------------------<br>`);
	prnt(`Your final score is: ${score}.`);

	$restartBtn.classList.remove('is-hidden');
}


/**
 * Check if the object is in room or with player
 * @param {object|string} obj The objects{} item to be anaylized
 * @returns boolean
 */
function objectInRange(obj) {
	if (typeof obj === "string") {
		obj = getObject(obj);
	}
	if  (obj.location == currentRoom.rid || obj.location == "player" || obj.omnipresence) {
		return true;
	}
	return false;
}


/**
 * Detects if the player is carrying an object
 * @param {object|string} objectName The name of the object
 * @returns boolean
 */
function isCarrying(obj) {
	if (typeof obj === "string") {
		obj = getObject(obj);
	}
	if (obj.location === "player") {
		return true;
	}
	return false;
}


/**
 * Detects if current room matches name passed
 * @param {string} roomString The machine name of the room
 * @returns boolean
 */
function isRoom(roomString) {
	if (currentRoom.rid === roomString) {
		return true;
	}
	return false;
}


/**
 * Check if the user's noun is one of a list of possibilities
 * @param {string} noun The user's input
 * @param {array} nounArray A list of possible nouns to match
 * @returns {boolean}
 */
function nounCheck(noun,nounArray) {
	return nounArray.includes(noun);
}

/**
 * Parse user input event
 */
$inputForm.addEventListener('submit', function(evt){
	parseInput($userInput.value.toUpperCase());

	if (checkScore()>=17 && room == 57) {
		parseInput("SCORE");	
	}

	$userInput.value = '';
	evt.preventDefault();
});

/**
 * Reset button event
 */
$restartBtn.addEventListener('click', function(evt){
	location.reload();
	evt.preventDefault();
});

// SOUNDS

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
const sndOwl = new Sound("audio/owl.mp3");
const sndDoor = new Sound("audio/door.mp3");
const sndKey = new Sound("audio/key.mp3");
const sndPickup = new Sound("audio/treasure_pickup.mp3");
const sndShock = new Sound("audio/shock.mp3");
const sndSplash = new Sound("audio/splash.mp3");


/**
 * Console Log shortcut
 * @param {string} msg String to display in console
 */
function cl(msg) {
	if (msg) {
		console.log(msg);
	} else {
		console.log("hit!");
	}
}

function debugInfo() {
	if (!debug) return;
	//console.clear();
	//console.log(currentRoom);
	cl("lightLevel: " + lightLevel);
	cl("score: " + totalScore);
	cl("sinking: " + flags.sinking);
}


// DEBUG STUFF
let debug = true;
if (debug) {
	currentRoom = rooms["upperGallery"];
	objects["vacuum"].location = currentRoom.rid;
	objects["batteries"].location = currentRoom.rid;
	//objects["statue"].locked = true;
	//objects["statue"].key = "key";
	//flags.batsAttacking = true
}

// INITIALIZE GAME
display();
$userInput.focus();