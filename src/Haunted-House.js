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

//var carrying = new Array(18);
let totalScore = 0;
let winner = false;
let lightLevel = 60; // LL
let currentRoom = rooms["pathThroughIronGate"]; // RM 57
//let currentRoom = rooms["study"];
let previousRoom = null;
let message = "OK"; // M$


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


//const flags = new Array(objects.length);

const flags = {
	frontDoorOpen: true, // flags[23]
	candleLit: false, // flags[0]
	ghostsAttacking: false, // flags[27]
	vacuumSwitchedOn: false, // flags[24]
	batsAttacking: false, // flags[26]
	magicalBarrier: true, //flags[34]
	hallDoorLocked: true,
	barsDug: false,
	ropeTiedToTree: true,
	studyWallBroken: false,
	inBoat: false,
	sinking: 0
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

	// may trigger ghosts in upper gallery
	if (isRoom("cobwebbyRoom") && Math.random() < .5 && !flags.vacuumSwitchedOn) {
		flags.ghostsAttacking = true;
	}
	
	// Candle slowly bruns down if lit
	if (flags.candleLit) {
		lightLevel--;
	}

	// RUN THE VERB SUBROUTINE
	if (!error) {
		verbSubroutine(verb,noun,vb,ob);
	}

	// POST VERB MESSAGES
	if (lightLevel > 1 && lightLevel < 11) {
		message += `<br>Your candle is waning!`;
	}
	if (lightLevel == 1) {
		message += `<br>Your candle has gone out!`;
		flags.candleLit = false;
		lightLevel = 0;
		objects["candle"].location = null;
	}
	if (isCarrying("vacuum") && isCarrying("batteries") && flags.vacuumSwitchedOn && isRoom("upperGallery") && flags.ghostsAttacking) {
		message += `<br>You've sucked up all the ghosts!`;
		flags.ghostsAttacking = false;
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
 * @param {string} objectName The name of the object
 * @returns boolean
 */
function isCarrying(objectName) {
	if (objects[objectName].location === "player") {
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

function cl(msg) {
	if (msg) {
		console.log(msg);
	} else {
		console.log("hit!");
	}
}

function debugInfo() {
	if (!debug) return;
	//console.log(currentRoom);
	cl("lightLevel: " + lightLevel);
	cl("score: " + totalScore);
	cl("sinking: " + flags.sinking);
}


// DEBUG STUFF
let debug = true;
if (debug) {
	currentRoom = rooms["crumblingWall"];
	//objects["boat"].location = currentRoom.rid;
	//objects["batteries"].location = currentRoom.rid;
	//objects["statue"].locked = true;
	//objects["statue"].key = "key";
	//flags.batsAttacking = true
}

// INITIALIZE GAME
display();
$userInput.focus();