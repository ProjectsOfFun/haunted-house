//@prepros-prepend objects.js
//@prepros-prepend rooms.js
//@prepros-prepend verbs.js
//@prepros-prepend sounds.js
//@prepros-prepend interface.js

// Eventually all these prepends will be imports (if I can learn ES6)
//import snd from './sounds.js';


// Initialize DOM items as JS variables
const $container = document.getElementById('hh-container');
const $screen = document.getElementById('hh-display');
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
let incrementTurn = true;
let history = ["help"];
let historyCarat = 0;

// Game state variables
let flags = {
	barsDug: false,
	batsAttacking: true, // flags[26]
	candleLit: false, // flags[0]
	endGame: 0,
	encroachingDarkness: 0,
	frontDoorOpen: true, // flags[23]
	ghoulProgress: 0,
	ghostsAttacking: true, // flags[27]
	hallDoorLocked: true,
	inBoat: false,
	lightLevel: 60,
	magicalBarrier: true, //flags[34]
	ropeTiedToTree: true,
	screamVolume: .25,
	sinking: 0,
	sinkingStatue: 0,
	studyWallBroken: false,
	thicketSurveyed: false,
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

	prnt(`HAUNTED HOUSE: REMASTERED`);
	prnt(`<span class="hh-divider">---------------------------------------------<br></span>`);
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


	prnt(`<span class="hh-divider"><br>---------------------------------------------</span>`);
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
			output += `There's a boat here.`;
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
	let items = []; // An array of portable objects

	for (let obj in objects) {
		if (objects[obj].location === roomObject.rid && objects[obj].portable) {	
			items.push(objects[obj]);
		}
	}

	if (items.length === 0) return false;

	output += `<br><div class="objects-in-room">You can see `;
	for (let i = 0; i < items.length; i++) {
		output += `<em>${items[i].name}</em>`;
		if (items.length > 1 && i < items.length - 2) {
			output += `, `;
		} else if (items.length > 1 && i === items.length - 2) {
			output += ` and `;
		}
	}
	output += ` here.</div>`;

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
 * Hide the overlay
 */
function hideOverlay() {
	$container.classList.remove('overlay');
	$userInput.focus();
	$userInput.select();
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

	let input_array = myInput.split(" "); // Convert words to array items
	verb = input_array[0]; // First item is always a verb

	input_array.shift(); // Remove first item (verb)
	input_array = input_array.filter(function(word){ // Get rid of articles
		return (word != "the" && word != "a" && word != "an");
	});
	noun = input_array.join(' ');

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
	if (flags.candleLit && flags.lightLevel === 30) {
		message += `<br>Your candle has melted down to half its original size.`;
	}
	if (flags.candleLit && flags.lightLevel > 1 && flags.lightLevel < 13) {
		message += `<br>Your candle is waning!`;
	}
	if (flags.candleLit && flags.lightLevel > 9 && flags.lightLevel < 13) {
		message += ` <em>Extinguish</em> it if you want to save it for later.`;
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
			message += `<br>You hear a terrifying groan. There is definitely something in the room with you!`;
			snd.groan.play();
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
			return;
		} if (flags.sinking === 3) {
			message += ` Do something, quick!`;
		}
	}

	// Sinking statue
	if (flags.sinkingStatue) {
		flags.sinkingStatue++;
	}
	if (flags.sinkingStatue < 8 && flags.sinkingStatue > 5) {
		message += ` Hurry, get the statue!`;
	}
	if (flags.sinkingStatue >= 8) {
		death(`The statue finally sinks below the surface. Moments later a huge blast of energy from deep under the water overturns the boat. During the ruckus, something hard slams you in the head. You regain consciousness only to find yourself pinned under the water by a sinister ghoul.`);
		return;
	}

	// House is in endGame mode
	if (flags.endGame > 0 && !isRoom("finalRoom") && !isRoom("exit")) {
		flags.endGame = flags.endGame + 1;
		if (flags.endGame % 7 === 0) {
			shakeDisplay();
			flags.screamVolume = (flags.screamVolume + .07 < 1) ? flags.screamVolume + .07 : 1;
			snd.scream.sound.volume = flags.screamVolume;
			snd.scream.play();
			const endGameMessages = ["Anger emanates from the mansion.","You think you are being followed!","You feel a sinister presence."]
			const endGameMessage = endGameMessages[Math.floor(Math.random() * endGameMessages.length)];
			message += ` ${endGameMessage}`;
		}
	}

	// Ghoul Effects
	if (currentRoom.rid === "finalRoom") {
		flags.ghoulProgress++;

		switch (flags.ghoulProgress) {
			case 3:
				message += `<br><br>The ghoul lumbers towards you!`;
				break;
			case 4:
				message += `<br><br>The ghoul continues to move towards you!`;
				break;
			case 5:
				message += `<br><br>The ghoul attacks but you manage to jump out of the way, positioning yourself between the monster and the gate. <em>The gate is clear!</em>`;
				rooms["finalRoom"].exits.s = "exit";
				rooms["finalRoom"].description = `As you reach the iron gate, a rotting, child-sized ghoul hobbles onto the path. Its sunken eyes immediately focus on you and it starts to amble forward. You stumble and your heart races with terror. The ghoul is blocking all exits except through the gate to the south!`;
				break;
			case 6:
				message += `<br><br>The ghoul hisses and takes a swipe at your face!`;
				break;
			case 7:
				message += `<br><br>The ghoul spits a dark spray of ooze towards your face. You dodge it just in the nick of time. That was too close, get out of here, quick!!`;
				break;
			case 8:
				snd.laugh.play();
				death(`Moving much quicker than you thought possible, the ghoul tackles you to the ground. You struggle and fight but it's too little, too late. Teeth sink into your flesh and your veins fill with the dark ooze. The last thing you see before your life is completely drained is the ghoulish child stumbling away carrying all your treasures with him back into the mansion.`);
				return;
		}
	}

	// Increment turns
	if (incrementTurn) { turns++;}
	
	if (getMaxScore() === checkScore() && flags.endGame === 0) {
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
	incrementTurn = true;
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


function introText() {
	let myIntro = `"Ghastly cries and blood curdling screams!" Yeah, right. They were just a couple two-bit vandals bragging about spray painting their nonsense on that old abandoned house at the edge of the forest. What would they know about spirits and ghosts?<br><br>All you knew is that they were frightened. By what? You didn't care. You were more interested in what they had to say about the shiny things they spied through the windows.<br><br>A deserted mansion, left untouched for decades, filled with goodness knows how many unclaimed treasures. That was all you needed. So here you are under the cover of darkness, making your way up the walkway towards the iron gate at the front of the mansion...`
	displayOverlay(myIntro);
	$continueBtn.classList.remove('is-first-screen');
	$continueBtn.innerHTML = "[ SPACE to Continue ]";
}



// ===== END GAME FUNCTIONS ======

/**
 * Any actions that happen after all treasure is collected
 * go here.
 */
function triggerEndGame() {
	rooms["pathThroughIronGate"].endingTrigger();
	rooms["frontPorch"].exits.s = "finalRoom";
	rooms["twistedRailings"].exits.e = "finalRoom";
	rooms["pathByRailings"].exits.w = "finalRoom";
	flags.endGame = 1;
}

/**
 * Player death, game ending routine
 * @param {string} message HTML message to be displayed to player on death
 */
function death(message) {
	$inputZone.remove();
	cls();
	prnt(`HAUNTED HOUSE: REMASTERED`);
	prnt(`<span class="hh-divider">---------------------------------------------<br></span>`);
	prnt(`<span class="message">${message}</span>`);
	prnt(`<br><span class="room-name">You Have Died!</span>`);
	prnt(`<br><span class="hh-divider">---------------------------------------------<br></span>`);
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
	prnt(`HAUNTED HOUSE: REMASTERED`);
	prnt(`<span class="hh-divider">---------------------------------------------<br></span>`);
	prnt(`<span class="message">You race through the gate and down the path with treasures in hand! The hissing cries of the ghoul fade in the distance and you promise yourself never to return again. Congratulations, you've won the game!</span><br>`);
	prnt(`Your final score is: <em>${checkScore() + 1}/${getMaxScore() + 1}</em><br>`);
	
	const messages = [`Bask in the glory of your victory, you've earned it!`,`Report thy feat to Lord British. After which, Lord British will probably report YOU to the local authorities.`,`You've earned so many points! Don't spend them all in one place.`,`So many treasures, you can't help but think of all the Antiques Roadshow fame you will soon accrue!`,`All in a day's work for a master treasure hunter!`];
	let rnd = Math.floor(Math.random() * messages.length);
	prnt(`${messages[rnd]}`);
	prnt(`<br>---------------------------------------------<br>`);
	prnt(`You took <em>${turns}</em> turns to complete the adventure.<br>`);

	prnt(`<span class="message">This "remastered" version of <em>Haunted House</em> was written by <em>Robert Wm. Gomez</em>. If you enjoy it drop me a line on Twitter <a href="https://twitter.com/robertgomez" target="blank" rel="noopener noreferrer"><em>@robertgomez</em></a> or visit my website <a href="http://robertgomez.org" target="blank" rel="noopener noreferrer"><em>robertgomez.org</em></a>.</span>`);

	snd.music.stop();
	snd.fanfare.play();
	$restartBtn.classList.remove('is-hidden');
}



// ===== EVENT LISTENERS =====

/**
 * Trigger user input parsing
 */
$inputForm.addEventListener('submit', function(evt){
	evt.preventDefault();

	if ($userInput.value.length > 0) {
		if (history[history.length - 1] != $userInput.value) {
			history.push($userInput.value);
		}
		if (history.length > 15) {
			history.shift();
		}
		parseInput($userInput.value);
	}

	historyCarat = 0;
	$userInput.value = '';
});


/**
 * Shake display
 */
function shakeDisplay() {
	$screen.classList.add('shake');
	// void $screen.offsetWidth is a hack to reset CSS animation
	setTimeout(function() {$screen.classList.remove('shake');void $screen.offsetWidth;},1000)
}


/**
 * Read input history
 */
document.onkeydown = checkKey;
function checkKey(evt) {
	evt = evt || window.event;

	if (evt.keyCode == '107') {
		$btnBigger.click();
		return false;
	}

	if (evt.keyCode == '109') {
		$btnSmaller.click();
		return false;
	}

	if (evt.keyCode == '111') {
		$btnFontToggle.click();
		return false;
	}

	if ($container.classList.contains('overlay')) {
		if ((evt.keyCode == '27' || evt.keyCode == '13' || evt.keyCode == '32')) { // ESC or Return
			if ($continueBtn.classList.contains('is-first-screen')) {
				introText();
				return false;
			}
			hideOverlay();
		}
		return false;
	}

	// Clear input field on ESC
	if (evt.keyCode === 27 && $userInput === document.activeElement) {
		$userInput.value = '';
		return false;
	}

	if (evt.keyCode == '38') { // Up arrow
		if 	(++historyCarat > history.length) {
			historyCarat = history.length;
		}
		$userInput.value = history[history.length - historyCarat];
	}

	if (evt.keyCode == '40') { // Down arrow
		if 	(--historyCarat <= 0) {
			historyCarat = 0;
			$userInput.value = '';
		} else {
			$userInput.value = history[history.length - historyCarat];
		}
	}
}


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
	if ($continueBtn.classList.contains('is-first-screen')) {
		introText();
		return;
	}
	hideOverlay();
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
	console.log(currentRoom);
	cl("Turns: " + turns);
	cl("flags.lightLevel: " + flags.lightLevel);
	cl("score: " + totalScore);
	cl("sinking: " + flags.sinking);
	cl("Terror: " + flags.encroachingDarkness);
	cl(`endGame: ${flags.endGame}`);
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
verbs["help"].action();

//let savedGame = localStorage.getItem(hhSave);

let savedGame = localStorage.getItem('hhSave');
if (savedGame) {
	message = `You have a saved game ready. Type <em>RESTORE</em> to load it.`;
}

init("pathThroughIronGate",[],[]);