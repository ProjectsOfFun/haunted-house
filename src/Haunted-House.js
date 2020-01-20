//@prepros-prepend objects.js
//@prepros-prepend rooms.js
//@prepros-prepend verbs.js
//@prepros-append interface.js

import snd from './sounds.js';


// Initialize DOM items as JS variables
const $container = document.getElementById('hh-container');
const $display = document.getElementById('hh-output');
const $inputZone = document.getElementById('hh-input');
const $inputForm = document.getElementById('hh-input-form');
const $userInput = document.getElementById('hh-userInput');
const $restartBtn = document.getElementById('hh-reload');
const $displayOverlay = document.getElementById('hh-output-overlay');
const $continueBtn = document.getElementById('hh-continue');

// Global Variables
let currentRoom = {}; // RM 57
let message = ''; // M$
let previousObj = null;
let previousRoom = null;
let totalScore = 0;
let turns = 0;

// Game state variables
const flags = {
	barsDug: false,
	batsAttacking: true, // flags[26]
	candleLit: false, // flags[0]
	encroachingDarkness: 0,
	frontDoorOpen: true, // flags[23]
	ghostsAttacking: true, // flags[27]
	hallDoorLocked: true,
	inBoat: false,
	lightLevel: 60,
	magicalBarrier: true, //flags[34]
	ropeTiedToTree: true,
	sinking: 0,
	studyWallBroken: false,
	vacuumHasPower: false,
	vacuumSwitchedOn: false, // flags[24]
	wearingCoat: false,
	winner: false
}



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

	if (currentRoom.darkness && !flags.candleLit) {
		prnt(`<br>It's pitch black and you can't see anything!`);
	}	else if (extraInfo && currentRoom.description) {
		prnt(`<br>${currentRoom.description} ${extraInfo}`);
	} else if (extraInfo) {
		prnt(`<br>${extraInfo}`);
	} else if (currentRoom.description) {
		prnt(`<br>${currentRoom.description}`);
	}

	if ((currentRoom.darkness && flags.candleLit) || !currentRoom.darkness) {
		prnt(`<br><span class="exits">Exits:</span>${splitExits(currentRoom.exits)}`)
		if (roomItems) prnt(roomItems);
	}


	prnt(`<br>---------------------------------------------`);
	if (message.length > 0) {
		prnt(`<br><span class="message">${message}</span>`);
	}

	if (flags.winner) {
		victory();
	}

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
 * Displays the "cutscene" overlay display
 * @param {string} text The block of text to display
 */
function displayOverlay(text) {
	$displayOverlay.innerHTML = "";
	$displayOverlay.innerHTML += `<span class="message">${text}</span>`;
	$container.classList.add('overlay');
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
	if (exitListing == "") return " No exits!";
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
		message = `You can't "${myInput.toUpperCase()}."`;
	}
	if (!vb && !ob) {
		message = "You don't make sense.";
	}
	if (vb && ob.portable && ob.location != "player") {
		message = `You don't have "${noun.toUpperCase()}."`;
	}
	
	
	// RUN THE VERB SUBROUTINE
	if (!error) {

		// Candle slowly burns down if lit
		if (flags.candleLit) {
			flags.lightLevel--;
		}

		verbSubroutine(verb,noun,vb,ob);
	}

	// POST VERB MESSAGES

	// Candle power
	if (flags.candleLit && flags.lightLevel > 1 && flags.lightLevel < 11) {
		message += `<br>Your candle is waning!`;
	}
	if (flags.lightLevel == 1) {
		message += `<br>Your candle has gone out!`;
		flags.candleLit = false;
		flags.lightLevel = 0;
		objects["candle"].location = null;
	}

	// Darkness effects
	if (currentRoom.darkness && !flags.candleLit) {
		flags.encroachingDarkness++
		if (flags.encroachingDarkness > 1 && flags.encroachingDarkness < 4) {
			message += `<br>You hear something in the darkness!`;
		}
		if (flags.encroachingDarkness >= 4 && flags.encroachingDarkness < 6) {
			message += `<br>You hear a terrifying growl. There is definitely something in the room with you!`;
		}
		if (flags.encroachingDarkness >= 6) {
			death(`A slimy appendage grabs you from out of the darkness and wraps itself around your neck!<br><br>You are helpless and filled with a sense of unspeakable terror as the creature squeezes the life out of you.`);
			return;
		}
	}
	if (currentRoom.darkness && flags.candleLit) {
		flags.encroachingDarkness = 0;
	}

	// Water effects
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

	// Increment turns
	turns++;
	
	if (getMaxScore() === checkScore()) {
		triggerEndGame();
	}

	// Fade the helper placeholder text after a few turns
	switch (turns) {
		case 4:
			$userInput.classList.add('fading-1');
			break;
		case 6:
			$userInput.classList.remove('fading-1');
			$userInput.classList.add('fading-2');
			break;
		case 8:
			$userInput.classList.remove('fading-2');
			$userInput.classList.add('fading-3');
			break;
		case 10:
			$userInput.classList.remove('fading-3');
			$userInput.placeholder = '';
			break;
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


/**
 * Process the user input after parsing.
 * @param {string} verb The user typed in verb.
 * @param {string} noun The user typed in noun
 * @param {object} vb The verb object
 * @param {object} ob The noun object
 */
function verbSubroutine(verb,noun,vb,ob) {

	// Does the object contain unique actions?
	if (ob.hasOwnProperty('overrides')) {
		// Does the current verb match any of the overriddes?
		if (objectInRange(ob)) {
			if (ob['overrides'].hasOwnProperty(verb)) {
				ob.overrides[verb]();
				return;
			}
		}

	}

	if (!vb) return;
	vb.action(noun,ob);
}



// ===== CHECKING OBJECT/ROOM STATUSES =====

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



// ===== SCORING =====

/**
 * Counts all the scorable objects held by the player.
 * @returns {number}
 */
function checkScore() {
	let score = 0;
	for (let key in objects) {
		if (objects[key].location == "player" && objects[key].score) {
			score += objects[key].score;
		}
	}
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



// ===== END GAME FUNCTIONS ======

/**
 * Any actions that happen after all treasure is collected
 * go here.
 */
function triggerEndGame() {
	rooms["pathThroughIronGate"].endingTrigger();
}

/**
 * Player death, game ending routine
 * @param {string} message HTML message to be displayed to player on death
 */
function death(message) {
	$inputZone.remove();
	cls();
	prnt(`HAUNTED HOUSE`);
	prnt(`---------------------------------------------<br>`);
	prnt(`<span class="message">${message}</span>`);
	prnt(`<br><span class="room-name">You Have Died!</span>`);
	prnt(`<br>---------------------------------------------<br>`);
	prnt(`You took <em>${turns}</em> turns before meeting your demise.<br>`);
	prnt(`Your final score is: <em>${checkScore()}/${getMaxScore() + 1}</em>`);

	$restartBtn.classList.remove('is-hidden');
}


/**
 * Game end routine if player wins.
 */
function victory() {
	$inputZone.remove();
	cls();
	prnt(`HAUNTED HOUSE`);
	prnt(`---------------------------------------------<br>`);
	prnt(`<span class="message">Congratulations, you've won the game!</span><br>`);
	prnt(`Your final score is: <em>${checkScore() + 1}/${getMaxScore() + 1}</em><br>`);
	
	const messages = [`Bask in the glory of your victory, you've earned it!`,`Report thy feat to Lord British. After which, Lord British will probably report you to the local authorities.`,`So many points! Don't spend them all in one place.`,`As you run away from the mansion, treasures in hand, you can't help but think of all the Antique's Roadshow fame you will soon accrue!`];
	let rnd = Math.floor(Math.random() * messages.length);
	prnt(`${messages[rnd]}`);
	prnt(`<br>---------------------------------------------<br>`);
	prnt(`You took <em>${turns}</em> turns to complete the adventure.<br>`);

	prnt(`<span class="message">This "remastered" version of <em>Haunted House</em> was written by <em>Robert Wm. Gomez</em>. If you enjoy it drop me a line on Twitter <a href="https://twitter.com/robertgomez" target="blank" rel="noopener noreferrer"><em>@robertgomez</em></a> or visit my website <a href="http://robertgomez.org" target="blank" rel="noopener noreferrer"><em>robertgomez.org</em></a>.</span>`);
	

	$restartBtn.classList.remove('is-hidden');
}



// ===== EVENT LISTENERS =====

/**
 * Trigger user input parsing
 */
$inputForm.addEventListener('submit', function(evt){
	evt.preventDefault();

	if ($userInput.value.length > 0) {
		parseInput($userInput.value);
	}

	$userInput.value = '';
});

/**
 * Reset button event
 */
$restartBtn.addEventListener('click', function(evt){
	location.reload();
	evt.preventDefault();
});

/**
 * Overlay close button
 */
$continueBtn.addEventListener('click', function(evt){
	$container.classList.remove('overlay');
	$userInput.focus();
	$userInput.select();
});


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
	//cl("Turns: " + turns);
	// cl("flags.lightLevel: " + flags.lightLevel);
	//cl("score: " + totalScore);
	// cl("sinking: " + flags.sinking);
	//cl("Terror: " + flags.encroachingDarkness);
}

/**
 * Initialize the game
 * @param {string} startRoom Starting room id
 * @param {array} carrying List of strings of objects player is carrying
 * @param {array} inRoom Objects to be placed in the starting room
 */
function init(startRoom,carrying,inRoom) {

	// Initialize game data objects
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

	currentRoom = rooms[startRoom];

	if (carrying) {
		for (let index in carrying) {
			objects[carrying[index]].location = "player";
		}
	}

	if (inRoom) {
		for (let index in inRoom) {
			objects[inRoom[index]].location = startRoom;
		}
	}

	display();
	$userInput.focus();
	$userInput.select();

}

// INITIALIZE GAME
let debug = false;
init("pathThroughIronGate",[],[]);