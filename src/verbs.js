// Define your game verbs here.

const verbs = {
	about: {
		action: function (noun, obj) {
			verbs["help"].action("about");
		},
		singleWord: true,
	},
	approach: {
		action: function (noun, obj) {
			if (noun === "wall" && isRoom("crumblingWall")) {
				message = `Despite my warnings, you inch towards the wall. FOOOMP! A block of cement just flew past your head! If this was a Sierra game you'd be dead.`;
				return;
			}
		},
	},
	blow: {
		action: function (noun, obj) {
			message = "You let out a puff of air.";

			if ((obj.id === "candle" && objectInRange("candle")) || flags.candleLit) {
				verbs["unlight"].action(noun, obj);
				return;
			}
		},
	},
	board: {
		synonym: "enter",
	},
	burn: {
		action: function (noun, obj) {
			message = `How are you going to summon fire?`;
			let objID = obj.id;
			if ((isCarrying("matches") || flags.candleLit) && nounCheck(objID, ["ghoul", "aerosol", "thicket", "rubbish"])) {
				verbs["light"].action(noun, obj);
				return;
			}
			if (isCarrying("matches") || flags.candleLit) {
				message = `You're a thief, not an arsonist.`;
				return;
			}
		},
	},
	carrying: {
		action: function (noun, obj) {
			if (noun) {
				return;
			}
			let inventory = "";
			for (let key in objects) {
				if (objects[key].location === "player") {
					if (inventory.length > 0) {
						inventory += ", ";
					}
					inventory += objects[key].name;
				}
			}
			if (!inventory) inventory = "Nothing.";
			message = `You are carrying: ${inventory}`;
			// displayOverlay(message);
			// message = '';
		},
		singleWord: true,
	},
	chop: {
		action: function (noun, obj) {
			message = "You don't need to chop that.";
			if (isCarrying("axe")) {
				verbSubroutine("swing", "axe", verbs["swing"], objects["axe"]);
			} else {
				message = "Not with your bare hands. Your karate skills aren't what they used to be.";
			}
		},
	},
	climb: {
		action: function (noun, obj) {
			message = "You can't climb that.";

			// Climbing up the Blasted Tree
			if ((noun === "tree" || obj.id === "rope") && flags.ropeTiedToTree && isRoom("blastedTree")) {
				message = `You use the rope to climb the tree.`;
				objects["rope"].omnipresence = true;
				currentRoom = rooms["inTheTree"];
				return;
			}

			// Climbing down the tree with rope
			if ((obj.id === "rope" || noun === "tree") && flags.ropeTiedToTree && isRoom("inTheTree")) {
				message = `You use the rope to climb down.`;
				obj.omnipresence = false;
				currentRoom = rooms["blastedTree"];
			}

			if (obj.id === "rope" && isCarrying("rope")) {
				message = `It isn't attached to anything!`;
				return;
			}

			if (isRoom("slipperySteps") && nounCheck(noun, ["stairs", "steps", "down", "staircase"])) {
				message = `The surface is slippery and damp. You would surely fall and hurt yourself.`;
				return;
			}
		},
	},
	close: {
		action: function (noun, obj) {
			message = "You can't close that.";

			// Drawer exception to put candle away if drawer closed
			if (obj.id === "drawer" && objectInRange(obj) && obj.isOpen && objects["candle"].location === "study") {
				message = obj.closeMessage;
				objects["candle"].location = "drawer";
				obj.closeAction();
				return;
			}

			// Coffin exception to play sound
			if (obj.id === "coffin" && obj.isOpen && objectInRange(obj)) {
				message = `You slam the coffin shut.`;
				obj.closeAction();
				snd.door.play();
				return;
			}

			if (obj.isOpen === false && objectInRange(obj)) {
				message = `It's already closed.`;
				return;
			}

			if (obj.isOpen && objectInRange(obj)) {
				message = obj.closeMessage ? obj.closeMessage : `You close it.`;
				if (obj.closeAction) {
					obj.closeAction();
				}
				if (obj.id === "door") {
					snd.door.play();
				}
				return;
			}
		},
	},
	d: {
		action: function (noun, obj) {
			if (noun) return;
			verbs["go"].action("down");
		},
		singleWord: true,
	},
	dig: {
		singleWord: true,
		action: function (noun, obj) {
			message = "You can't dig that.";

			if (!isCarrying("shovel")) {
				message = "You have nothing to dig with.";
				return;
			}

			if (!noun) {
				message = "Where do you want to dig?";
				return;
			}

			if ((isRoom("cellar") || isRoom("cliffPathByWindow")) && nounCheck(noun, ["bars", "window", "barred window", "brickwork", "bricks"])) {
				if (!flags.barsDug) {
					message = "After several minutes of work, you manage to dig the bars out. You can squeeze through the window now.";
					flags.barsDug = true;
					rooms["cellar"].digWindow();
					rooms["cliffPathByWindow"].digWindow();
					rooms["slipperySteps"].digWindow();
				} else {
					message = "You've already cleared the bars away from the window.";
				}
				return;
			}

			if (obj.id === "thicket" && objectInRange("thicket")) {
				message = `The roots are too deep. That would take days.`;
				return;
			}

			if (obj.id === "ghoul" && objectInRange(obj)) {
				verbs["swing"].action("shovel", getObject("shovel"));
				return;
			}
		},
	},
	down: {
		synonym: "d",
	},
	drop: {
		action: function (noun, obj) {
			// Don't allow dropping in marsh
			if (obj.location === "player" && (isRoom("marsh") || isRoom("soggyPath"))) {
				message = "You best not drop things into the marsh. They'll be lost forever.";
				return;
			}

			// Don't allow treasure to be dropped
			if (obj.score > 0 && isCarrying(obj)) {
				message = `The ${noun} is too valuable to drop.`;
				return;
			}

			// Unlight candle when dropped
			if (obj.id === "candle" && flags.candleLit && currentRoom.darkness === true) {
				message = `You drop the candle. It extinguishes itself as it rolls off into the darkness! That probably wasn't a good idea.`;
				flags.candleLit = false;
				obj.location = currentRoom.rid;
				return;
			}

			if (obj.id === "candle" && flags.candleLit) {
				message = `You drop the candle. It extinguishes itself as it falls to the ground.`;
				flags.candleLit = false;
				obj.location = currentRoom.rid;
				return;
			}

			// Default behavior
			if (obj.location === "player") {
				obj.location = currentRoom.rid;
				message = "Dropped.";
				return;
			}

			// Weird boat syntax
			if (noun === "boat" && flags.inBoat) {
				message = `You jump out of the boat.`;
				if (currentRoom.water) {
					message += ` SPLASH!<br>`;
					snd.splash.play();
				}
				flags.inBoat = false;
				return;
			}
		},
	},
	e: {
		action: function (noun, obj) {
			if (noun) return;
			verbs["go"].action("east");
		},
		singleWord: true,
	},
	east: {
		synonym: "e",
	},
	enter: {
		action: function (noun, obj) {
			message = `You can't enter that.`;

			if (noun === "boat" && objectInRange("boat") && !flags.inBoat) {
				message = `You board the boat.`;
				flags.sinking = 0;
				flags.inBoat = true;
				return;
			}

			if (noun === "boat" && objectInRange("boat") && flags.inBoat) {
				message = `You are already onboard.`;
				return;
			}

			if (noun === "boat") {
				message = `There is no boat here.`;
				return;
			}
		},
	},
	examine: {
		synonym: "look",
	},
	exit: {
		action: function (noun, obj) {
			message = `You can't exit that.`;

			if (noun === "boat") {
				verbs["drop"].action("boat", objects["boat"]);
				return;
			}
		},
	},
	extinguish: {
		synonym: "unlight",
	},
	get: {
		action: function (noun, obj) {
			message = `What "${noun.toUpperCase()}?"`;

			if (!flags.candleLit && currentRoom.darkness === true) {
				message = `You can't see anything!`;
				return;
			}

			// Check if noun is scenery
			if (!obj && currentRoom.scenery) {
				for (let key in currentRoom.scenery) {
					if (key.toLowerCase() == noun.toLowerCase()) {
						message = "You can't take that.";
						return;
					}
				}
			}

			if (obj.id === "boat" && objectInRange("boat")) {
				if (!flags.inBoat) {
					message = `It's too big to carry around. It will carry you if you board it.`;
				} else {
					message = `Um, you are sitting in the boat. Besides, it's too big to carry.`;
				}
				return;
			}

			// Dead bats
			if (obj.id === "bats" && !flags.batsAttacking && currentRoom.rid === objects["bats"].location) {
				message = `Ew! You don't want to touch the filthy bat carcasses!`;
				return;
			}

			// Statue zapped into marsh
			if (isRoom("marsh") && obj.id === "statue" && flags.inBoat && objectInRange("statue")) {
				message = `It's stuck in the muck. You're going to have to exit the boat to get to it.`;
				return;
			}

			if (isRoom("marsh") && obj.id === "statue" && !flags.inBoat && objectInRange("statue")) {
				message = obj.takeMessage;
				obj.takenFromMarsh();
				flags.sinkingStatue = 0;
				rooms["marsh"].onEnterTriggered = true;
				return;
			}

			if (obj.portable && objectInRange(obj)) {
				if (obj.location === currentRoom.rid) {
					message = obj.takeMessage ? obj.takeMessage : "Taken.";
					obj.location = "player";

					if (obj.score > 0) {
						if (checkScore() === getMaxScore() && flags.endGame === 0) {
							message += ` You feel the house shake and hear an angry howl in the distance. I think you've found all of the treasure.  Hurry, find your way back to the front gate to escape the mansion!`;
							shakeDisplay();
							snd.scream.play();
						} else {
							message += " You've found treasure!";
						}
						snd.pickup.play();
					}

					verbs["get"].combineObjects(noun, obj);
					return;
				}
				if (obj.location === "player") {
					message = "You already have it!";
					return;
				}
			}

			if (!obj.portable && objectInRange(obj)) {
				message = obj.takeMessage ? obj.takeMessage : "You don't need to take that.";
				return;
			}
		},
		combineObjects: function (noun, obj) {
			// Candle
			if (isCarrying("candlestick") && isCarrying("candle") && (obj.id === "candlestick" || obj.id === "candle")) {
				message += `<br>You place the candle in the candlestick.`;
				return;
			}

			// Vacuum
			if (isCarrying("batteries") && isCarrying("vacuum") && (obj.id === "batteries" || obj.id === "vacuum")) {
				objects["vacuum"].insertBatteries();
				objects["batteries"].location = "vacuum";
				flags.vacuumHasPower = true;
				message += `<br>The batteries are a perfect match for the vacuum. The vacuum is now powered.`;
				return;
			}
		},
	},
	go: {
		action: function (noun, obj) {
			let direction;

			switch (noun) {
				case "north":
					direction = "n";
					break;
				case "south":
					direction = "s";
					break;
				case "west":
					direction = "w";
					break;
				case "east":
					direction = "e";
					break;
				case "up":
					direction = "u";
					break;
				case "down":
					direction = "d";
					break;
				case "n":
					direction = "n";
					break;
				case "s":
					direction = "s";
					break;
				case "w":
					direction = "w";
					break;
				case "e":
					direction = "e";
					break;
				case "u":
					direction = "u";
					break;
				case "d":
					direction = "d";
					break;
				case "boat":
					verbs["enter"].action("boat", objects["boat"]);
					return;
				case "window":
					if ((isRoom("cliffPathByWindow") || isRoom("cellar")) && !flags.barsDug) {
						message = "The window is barred, blocking your passage.";
						return;
					} else if (isRoom("cliffPathByWindow") && flags.barsDug) {
						direction = "w";
					} else if (isRoom("cellar") && flags.barsDug) {
						direction = "e";
					}
					break;
				case "rope":
					if (isRoom("blastedTree")) {
						message = `Perhaps you should try to <em>climb</em> the rope.`;
						return;
					}
					break;
				default:
					message = `You need to specify a direction in which to&nbsp;<em>GO</em>.`;
					return;
			}

			// THINGS THAT HINDER MOVEMENT

			// Darkness
			if (currentRoom.darkness && !flags.candleLit) {
				message = `It's too dark to move!`;
				return;
			}

			// Bats attacking
			if (flags.batsAttacking && isRoom("mustyRoom") && direction === "e") {
				message = `The bats are blocking that direction.`;
				return;
			}

			// Ghosts in upper gallery
			if (flags.ghostsAttacking && isRoom("upperGallery") && direction === "w") {
				message = `The ghosts won't let you pass!`;
				snd.ghost.play();
				return;
			}

			// Magical barrier
			if (isRoom("coldChamber") && flags.magicalBarrier && direction === "e") {
				message = `A magical barrier is blocking your way.`;
				snd.shock.play();
				return;
			}

			// Water in room
			if (currentRoom.water && !flags.inBoat) {
				message = `The marshy ground prevents any movement.`;
				return;
			}

			// Force the player to "climb" because I'm a jerk.
			if (isRoom("blastedTree") && direction === "u") {
				message = `Is there something here you could <em>climb</em>?`;
				return;
			}

			// Thicket not surveyed
			if (isRoom("path") && direction === "s" && !flags.thicketSurveyed) {
				message = `You try to squeeze through the thicket but keep ending up where you started. Perhaps if you could get a birdseye view you could better navigate a route.`;
				return;
			}

			// Statue is sinking
			if (isRoom("marsh") && flags.sinkingStatue) {
				message = `You've come this far and you're not going leave without ALL the treasure. Get that statue before it's lost forever!`;
				return;
			}

			// Final "battle"
			if ((isRoom("finalRoom") && !currentRoom.exits.s) || (isRoom("finalRoom") && currentRoom.exits.s && direction !== "s")) {
				message = `The ghoul blocks your exit in that direction!`;
				snd.laugh.play();
				return;
			}

			// Get the room id of the chosen exit direction
			const chosenExit = currentRoom.exits[direction.toLowerCase()];

			// MOVEMENT ALLOWED
			if (direction && chosenExit) {
				let tempRoomHolder = previousRoom;

				//message = "OK";
				message = "";
				previousRoom = currentRoom;
				currentRoom = getRoom(chosenExit);

				// THINGS THAT BLOCK NEW ROOM, MOVEMENT NOT ALLOWED
				if (currentRoom.darkness && !flags.candleLit) {
					currentRoom = previousRoom;
					previousRoom = tempRoomHolder;
					message = `It's too dark in that direction. You'll need a light.`;
					return;
				}

				if ((currentRoom.water || currentRoom.shore) && flags.inBoat) {
					objects["boat"].location = currentRoom.rid;
					message = "Aye aye captain!";
				}

				if (currentRoom.water && !flags.inBoat) {
					currentRoom = previousRoom;
					previousRoom = tempRoomHolder;
					//message = `You are sinking in a bog!`;
					message = `You need a way to navigate the bog.`;
					return;
				}

				if (!currentRoom.water && !currentRoom.shore && flags.inBoat) {
					currentRoom = previousRoom;
					previousRoom = tempRoomHolder;
					message = `You need to exit the boat first.`;
					return;
				}

				if (isRoom("exit")) {
					flags.winner = true;
					return;
				}

				// Trigger on exit events for last room.
				if (previousRoom.onExit && previousRoom.onExitTriggered === false) {
					previousRoom.onExit();
				}

				// Initial room visit events
				if (currentRoom.onEnter && currentRoom.onEnterTriggered == false) {
					currentRoom.onEnter();
				}
			} else if (direction) {
				message = "You can't go that way!";
			} else {
				message = "Go where?";
			}
		},
	},
	help: {
		action: function (noun, obj) {
			message = `"God helps those who help themselves."`;
			let myHelp;

			if (!noun) {
				myHelp = `Haunted House is a text adventure. You perform actions by typing two word commands such as <em>TAKE RING</em> or <em>LOOK PAINTING</em>. Explore the house and try to find the treasures within. For clues, be sure to <em>LOOK</em> at everything!<br><br>When you've found all the treasure, make your way back to the <em>iron gate</em> to earn that last point and win the game.<br><br>View this screen at any time by typing <em>HELP</em>. For more instructions type the following:<br><em>HELP MOVEMENT</em> or <em>HELP COMMANDS</em><br><br>Save your progress by typing <em>SAVE</em> and load it later with <em>RESTORE</em>.<br><br>For more info about this program type <em>ABOUT</em>.`;
				displayOverlay(myHelp);
				message = "";
				incrementTurn = false;
				return;
			}

			if (noun === "movement") {
				myHelp = `You can move around the mansion by typing <em>GO NORTH</em>, <em>GO WEST</em>, <em>GO UP</em>, etc. Save keystrokes by simply entering a single initial of the direction you want to move: <em>N</em>,<em>S</em>,<em>E</em>,<em>W</em>,<em>U</em> and <em>D</em>.<br><br>Available exits are listed below the room description.<br><br>Occasionally you will find that your path is blocked by various obstacles. Your job is to find the right object or action to get past these impediments. Explore everywhere!`;
				displayOverlay(myHelp);
				message = "";
				incrementTurn = false;
				return;
			}

			if (noun === "commands") {
				myHelp = `There are several special commands in the game. <em>INVENTORY</em> or <em>I</em> will list the objects you are carrying. <em>SCORE</em> will reveal your current score. Some of the most useful verbs are <em>LOOK</em> and <em>TAKE</em>. <em>X</em> is a shortcut for <em>LOOK</em>/<em>EXAMINE</em>.<br><br>Using <em>IT</em> as your noun will reuse the last noun you entered. For example <em>LOOK LAMP</em> then, on your next turn, <em>TAKE IT</em>.<br><br>For a complete list of all the verbs I know type <em>HELP VERBS</em>. But wait until you a really stuck before resorting to that.<br><br>Bonus tips: You can also press the <em>ESC</em> or <em>SPACE</em> to close this screen. Numpad <em>+</em> and <em>-</em> resize the display and numpad <em>/</em> toggles the typeface.`;
				displayOverlay(myHelp);
				message = "";
				incrementTurn = false;
				return;
			}

			if (noun === "about") {
				myHelp = `<em>Haunted House</em> was originally written by Jenny Tyler and Les Howarth as the example program in their book <em>Write your own Adventure Programs for your Microcomputer</em> (&copy;1983 Usborne Publishing).<br><br>This "remastered" version was written by <em>Robert Wm. Gomez</em>. If you enjoy it drop me a line on Twitter <a href="https://twitter.com/robertgomez" target="blank" rel="noopener noreferrer"><em>@robertgomez</em></a> or visit my website <a href="http://robertgomez.org" target="blank" rel="noopener noreferrer"><em>robertgomez.org</em></a>.<br><br>Special thanks to <em>John Burgess</em> for early alpha testing and many helpful suggestions.<br><br>&copy;2020 Robert Wm. Gomez`;
				displayOverlay(myHelp);
				message = "";
				incrementTurn = false;
				return;
			}

			if (noun === "verbs") {
				const verb_array = [];
				let verblist = "";

				for (let verb in verbs) {
					if (verb.length > 1 && verbs[verb].hiddenVerb !== true) {
						verb_array.push(verb.toUpperCase());
					}
				}
				verb_array.sort();

				for (let verb in verb_array) {
					verblist += verb_array[verb] + ", ";
				}
				myHelp = `Tired of playing "Guess the verb?"<br><br><b>Verbs I know:</b>  ${verblist.substring(0, verblist.length - 2)}`;
				displayOverlay(myHelp);
				message = "";
				incrementTurn = false;
				return;
			}
		},
		singleWord: true,
	},
	i: {
		synonym: "carrying",
		singleWord: true,
	},
	inventory: {
		synonym: "carrying",
		singleWord: true,
	},
	jump: {
		action: function (noun, obj) {
			message = "You jump up and down like an idiot.";

			if (noun === "cliff" && (isRoom("crumblingClifftop") || isRoom("clifftop") || isRoom("cliffPathByWindow"))) {
				message = "Then the story would end in a cliffhanger.";
				return;
			}

			if (obj.id === "candlestick" && objectInRange("candlestick")) {
				message = "You be nimble, you be quick.";
				return;
			}

			if (isRoom("slipperySteps")) {
				message = `A jump from the top of the stairs would surely result in a broken ankle.`;
				return;
			}
		},
		singleWord: true,
	},
	kill: {
		action: function (noun, obj) {
			if (obj.id === "bats" && objectInRange("bats") && flags.batsAttacking) {
				message = `And how do you propose to do that?`;
				return;
			}

			if (obj.id === "bats" && objectInRange("bats") && !flags.batsAttacking) {
				message = `They are already dead.`;
				return;
			}

			if (obj.id === "ghosts" && objectInRange("ghosts") && flags.ghostsAttacking) {
				message = `You can't kill the undead!`;
				return;
			}

			if (obj.id === "ghoul" && objectInRange("ghoul")) {
				message = `You can't kill the undead! Your only chance for survival is to make your escape through the gate to the south!`;
				return;
			}

			if (nounCheck(noun, ["self", "me", "myself", "player"])) {
				message = `Cheer up buddy boy! No need to resort to that... yet.`;
				return;
			}
		},
	},
	leave: {
		synonym: "drop",
	},
	light: {
		action: function (noun, obj) {
			message = "You can't light that.";

			if (!isCarrying("matches")) {
				message = `You have nothing to light it with.`;
				return;
			}

			if (obj.id === "matches" || noun === "match") {
				message = `For a brief moment the match casts a tiny amount of light then fizzles out.`;
				return;
			}

			if (obj.id === "candle" && isCarrying("candle") && isCarrying("candlestick")) {
				if (flags.candleLit) {
					message = `It's already lit.`;
				} else {
					message = `It casts a flickering light.`;
					flags.candleLit = true;
				}
				return;
			}

			if (obj.id === "candle" && isCarrying("candle") && !isCarrying("candlestick")) {
				message = `It will burn your hands!`;
				return;
			}

			if (obj.id === "aerosol" && isCarrying("aerosol") && flags.batsAttacking && currentRoom.rid === objects["bats"].location) {
				flags.batsAttacking = false;
				message = `Whoosh! A fireball erupts towards the bats. They spiral to the ground in a smattering of thuds. They now lie motionless, smoldering on the ground.`;
				rooms["mustyRoom"].batsKilled();
				objects["bats"].batsKilled();
				flags.batsAttacking = false;
				return;
			}

			if (obj.id === "aerosol" && isCarrying("aerosol")) {
				message = `An explosive fireball sprays out of the can of paint! You can kiss your eyebrows goodbye.`;
				return;
			}

			if (nounCheck(noun, ["cooker", "stove"]) && isRoom("kitchen")) {
				message = `The cooker rusted out and is in no state to be lit.`;
				return;
			}

			if (noun === "rubbish" && isRoom("yard")) {
				message = `It's too damp to light.`;
				return;
			}

			if (obj.id === "thicket" && objectInRange("thicket")) {
				message = `It's too damp to ignite.`;
				return;
			}

			if (obj.id === "ghoul" && isRoom("finalRoom")) {
				message = `The gooey ooze from the ghoul prevents it from igniting. It knocks the matches out of your hands!`;
				objects["matches"].location = null;
				snd.laugh.play();
				return;
			}
		},
	},
	listen: {
		action: function (noun, obj) {
			if (noun === "owl" && isRoom("darkCorner")) {
				message = `Yup, that's an owl alright. Owl-right?`;
				snd.owl.play();
				return;
			}
			if (obj.id === "ghoul") {
				snd.laugh.play();
			}
			if (!noun && flags.endGame > 0) {
				message = `Deep within the recesses of the house you can hear ghostly cries of anger!`;
				snd.scream.play();
				return;
			}
			message = obj.listenMessage && objectInRange(obj) ? obj.listenMessage : `You don't hear anything unusual.`;
		},
		singleWord: true,
	},
	look: {
		action: function (noun, obj) {
			//message = "You see nothing special.";
			message = `${noun.toUpperCase()}? You see nothing special.`;

			if (noun === "nothing special") {
				message = `You stare blankly into space.`;
				return;
			}

			// Key in coat pocket
			if (obj.id === "coat" && objectInRange(obj) && objects["key"].location === "coat") {
				message = "As you search through the old coat you find a key in the pocket.";
				objects["key"].location = currentRoom.rid;
				snd.key.play();
				return;
			}

			// Weird exception so painting can be looked at further
			if (noun === "skull" && objectInRange("painting")) {
				message = `It's from a small animal with sharp fangs. Despite the frightening appearance, the boy is holding it lovingly.`;
				return;
			}

			// In the tree thicket is viewed
			if (isRoom("inTheTree") && obj.id === "thicket") {
				message = `From up here you are able visualize a clear path through the thicket. You should be able to wind your way through it now.`;
				rooms["path"].clearThicket();
				flags.thicketSurveyed = true;
				return;
			}

			// Default action if noun is scenery in room
			if (currentRoom.scenery) {
				for (let key in currentRoom.scenery) {
					if (key.toLowerCase() == noun.toLowerCase()) {
						message = currentRoom.scenery[key];
						return;
					}
				}
			}

			// Default action if obj has a description
			if (obj.description && objectInRange(obj)) {
				message = obj.description;
				return;
			}
		},
	},
	n: {
		action: function (noun, obj) {
			if (noun) return;
			verbs["go"].action("north");
		},
		singleWord: true,
	},
	north: {
		synonym: "n",
	},
	open: {
		action: function (noun, obj) {
			message = "You can't open that.";

			if (obj.id === "matches" && objectInRange(obj)) {
				message = "It contains plenty of matches to last you the entire night.";
				return;
			}

			if (obj.id === "drawer" && objectInRange(obj) && !obj.isOpen && objects["candle"].location === "drawer") {
				message = "You slide the drawer open, revealing a candle.";
				objects["candle"].location = "study";
				obj.openAction();
				return;
			}

			if (obj.id === "coffin" && objectInRange(obj)) {
				if (!obj.isOpen && objects["ring"].location === "coffin") {
					message = `You slowly raise the lid revealing... a ring!`;
					objects["ring"].location = obj.location;
					obj.isOpen = true;
					obj.openAction();
					snd.key.play();
					return;
				}

				if (!obj.isOpen) {
					message = "That's creepy!";
					obj.openAction();
					return;
				}
			}

			if (obj.locked && obj.isOpen === false && objectInRange(obj)) {
				message = "It's locked!";
				return;
			}

			if (obj.isOpen && objectInRange(obj)) {
				message = "It's already open.";
				return;
			}

			if (obj.isOpen === false && objectInRange(obj)) {
				message = obj.openMessage ? obj.openMessage : "You've opened it.";
				if (obj.openAction) {
					obj.openAction();
				}
				return;
			}
		},
	},
	paint: {
		action: function (noun, obj) {
			if (isCarrying("aerosol") && obj.id === "ghoul" && isRoom("finalRoom")) {
				message = "Now the ghoul is covered in ooze AND paint. It knocks the can out of your hands disintegrating into thin air!";
				snd.laugh.play();
				objects["aerosol"].location = null;
				return;
			}

			if (isCarrying("aerosol") && obj.id !== "bats") {
				message = "You're a thief, not a vandal.";
				return;
			}

			verbs["spray"].action(noun, obj);
		},
	},
	read: {
		action: function (noun, obj) {
			if (obj.readable && objectInRange(obj)) {
				message = obj.readableText;
				return;
			}
			message = "Nothing to read there.";
		},
	},
	remove: {
		action: function (noun, obj) {
			if (noun === "coat" && isCarrying("coat") && flags.wearingCoat) {
				message = `You remove the coat`;
				flags.wearingCoat = false;
				return;
			}
			if (noun === "coat" && isCarrying("coat") && !flags.wearingCoat) {
				message = `You are not wearing it.`;
				return;
			}
			if (obj.id === "ring" && obj.isWorn) {
				message = `You pull and twist, but the ring wont come off!`;
				return;
			}
		},
	},
	s: {
		action: function (noun, obj) {
			if (noun) return;
			verbs["go"].action("south");
		},
		singleWord: true,
	},
	say: {
		action: function (noun, obj) {
			message = `You say, "${noun.toUpperCase()}!" Nothing happens.`;

			// Saying the magic word to dispel the field
			if (obj.id === "xzanfar" && isCarrying("magic spells")) {
				message = `You say, "${noun.toUpperCase()}!"`;

				if (isRoom("coldChamber") && flags.magicalBarrier) {
					message += "<br><br>The air sizzles with energy and the magic field dissipates into nothingness.";
					flags.magicalBarrier = false;
					rooms["coldChamber"].dispelBarrier();
					objects["barrier"].location = null;
				} else if (isRoom("coldChamber")) {
					message += "<br><br>The magical field re-materializes!";
					flags.magicalBarrier = true;
					rooms["coldChamber"].createBarrier();
					objects["barrier"].location = "coldChamber";
				} else if (isRoom("finalRoom")) {
					message += ` The ghoul's mouth curls into a sinister smile and waves of dark energy crackle over its skin.`;
					snd.laugh.play();
					return;
				} else {
					message += "<br><br>*Magic Occurs*";
				}
				return;
			}

			if (noun === "klatu borata nickto" && isCarrying("scroll")) {
				message = `You say, "${noun.toUpperCase()}!"`;
				message += "<br><br>Nothing happens. This incantation must have been part of a larger ritual.";
				return;
			}

			// Saying naughty things
			if (nounCheck(noun, ["fuck", "shit", "cunt", "tits", "piss", "cocksucker", "motherfucker"])) {
				message += "<br><br>Relax. It's just a game.";
				return;
			}
		},
	},
	score: {
		action: function (noun, obj) {
			message = `Your score is <em>${checkScore()}/${getMaxScore() + 1}</em>.`;
			if (checkScore() === 0) {
				message += " You need to find some treasure!";
			}
			if (checkScore() === getMaxScore()) {
				message += ` That's all the treasure. Hurry, find your way back to the front gate to claim that <em>final point!</em>`;
			}
			message += `<br><br>So far you have taken <em>${turns} turns</em>.`;
			incrementTurn = false;
		},
		singleWord: true,
	},
	sit: {
		action: function (noun, obj) {
			message = `This is no time to lounge about.`;
		},
		hiddenVerb: true,
		singleWord: true,
	},
	smell: {
		action: function (noun, obj) {
			if (objectInRange(obj)) {
				message = obj.smellMessage ? obj.smellMessage : `You don't smell anything.`;
			}
		},
	},
	south: {
		synonym: "s",
	},
	spray: {
		action: function (noun, obj) {
			message = `You can't spray that!`;

			if ((obj.id === "aerosol" || obj.id === "bats") && isCarrying("aerosol") && flags.batsAttacking && currentRoom.rid === objects["bats"].location) {
				flags.batsAttacking = false;
				message = `Pfft! Got 'em! The bats spiral to the ground in a smattering of thuds. They now lie motionless on the ground.`;
				rooms["mustyRoom"].batsKilled();
				objects["bats"].batsKilled();
				flags.batsAttacking = false;
				return;
			}

			if (obj.id === "aerosol" && isRoom("finalRoom") && isCarrying("aerosol")) {
				verbs["paint"].action("ghoul", getObject("ghoul"));
				return;
			}

			if (obj.id === "aerosol" && isCarrying("aerosol")) {
				message = `Hisssss...`;
				return;
			}
		},
	},
	swing: {
		action: function (noun, obj) {
			message = "There's no reason to be swinging that.";

			if (obj.id === "rope" && flags.ropeTiedToTree && isRoom("blastedTree")) {
				message = `This is no time to be playing games.`;
				return;
			}

			if (obj.id === "rope" && isCarrying(["rope"])) {
				message = "You swung it. Yee haw, cowboy!";
				return;
			}

			if (obj.id === "axe" && isCarrying("axe") && isRoom("study") && !flags.studyWallBroken) {
				message = "With a powerful swing of the axe, you broke through the thin wall.";
				flags.studyWallBroken = true;
				currentRoom.wallBreak();
				return;
			}

			if (obj.id === "axe" && isCarrying("axe") && (isRoom("forest") || isRoom("thickForest") || isRoom("blastedTree"))) {
				message = "Don't chop the trees. You get the feeling it would anger the woodland spirits.";
				return;
			}

			if (obj.id === "axe" && isCarrying("axe") && isRoom("path")) {
				message = "There isn't enough room to take a proper swing at the thicket.";
				return;
			}

			if (obj.id === "axe" && isCarrying("axe") && isRoom("mustyRoom") && flags.batsAttacking) {
				message = `You swing the axe but he bats are just too quick for you.`;
				return;
			}

			if (obj.id === "axe" && isCarrying("axe") && isRoom("finalRoom")) {
				message = `The axe embeds itself in the chest of the ghoul! Within seconds the axe vaporizes into dust searing your hands in the process!`;
				obj.location = null;
				snd.laugh.play();
				return;
			}

			if (obj.id === "shovel" && isCarrying("shovel") && isRoom("finalRoom")) {
				message = `The blade embeds itself in the head of the ghoul! Within seconds the shovel vaporizes into dust searing your hands in the process!`;
				obj.location = null;
				snd.laugh.play();
				return;
			}

			if (obj.id === "candlestick" && isCarrying("candlestick")) {
				message = "You awkwardly swing the candlestick.";
				return;
			}

			if (obj.id === "axe" && isCarrying("axe")) {
				message = "Whoosh!!!";
				return;
			}
		},
	},
	take: {
		synonym: "get",
	},
	u: {
		action: function (noun, obj) {
			if (noun) return;
			verbs["go"].action("up");
		},
		singleWord: true,
	},
	unlight: {
		action: function (noun, obj) {
			//message = `You can't do that.`;

			if (obj.id === "candle" && flags.candleLit) {
				message = `You blow out the candle.`;
				flags.candleLit = false;
				return;
			}
		},
	},
	unlock: {
		action: function (noun, obj) {
			message = "You can't unlock that.";

			if (obj.locked && obj.key && objectInRange(obj) && isCarrying(obj.key)) {
				message = obj.unlockMessage ? obj.unlockMessage : `You've unlocked the ${noun}.`;
				obj.locked = false;

				// Heavy door exception
				if (obj.id === "door" && currentRoom.rid === obj.location) {
					rooms["hallWithLockedDoor"].doorUnlocked();
				}

				if (obj.unlockAction) {
					obj.unlockAction();
				}
				return;
			}

			if (obj.locked && obj.key && objectInRange(obj)) {
				message = `You don't have a means to unlock that.`;
				return;
			}

			if (obj.locked && objectInRange(obj)) {
				`You've unlocked the ${noun}.`;
				return;
			}
		},
	},
	untie: {
		action: function (noun, obj) {
			if ((obj.id = "rope" && objectInRange("rope"))) {
				verbs["get"].action(noun, obj);
				return;
			}
		},
	},
	up: {
		synonym: "u",
	},
	use: {
		action: function (noun, obj) {
			// Aerosol
			if (obj.id === "aerosol") {
				verbs["spray"].action(noun, obj);
				return;
			}

			// Using the tiny vacuum
			if (obj.id === "vacuum" && flags.vacuumHasPower && flags.ghostsAttacking && isRoom("upperGallery")) {
				message = `With a loud whoosh, the tiny vacuum revs up. You've sucked up all the ghosts!`;
				flags.ghostsAttacking = false;
				flags.vacuumHasPower = false;
				objects["ghosts"].location = "vacuum";
				rooms["upperGallery"].ghostsDispelled();
				objects["vacuum"].captureGhosts();
				return;
			}

			if (obj.id === "vacuum" && objects["ghosts"].location === "vacuum") {
				message = `It's filled with ghosts. You don't want to risk releasing them again.`;
				return;
			}

			if (obj.id === "vacuum" && isCarrying("vacuum") && flags.vacuumHasPower && isRoom("finalRoom")) {
				verbs["vacuum"].action("ghoul", getObject("ghoul"));
				return;
			}

			if (obj.id === "vacuum" && isCarrying("vacuum") && !flags.vacuumHasPower) {
				message = `This vacuum requires batteries.`;
				return;
			}

			if (obj.id === "xzanfar") {
				verbs["say"].action(noun, obj);
				return;
			}
		},
	},
	vacuum: {
		action: function (noun, obj) {
			if (noun === "books" && currentRoom.rid === "library") {
				message = `They are "musty" not "dusty!"`;
				return;
			}

			if (obj.id === "ghoul" && isRoom("finalRoom") && isCarrying("vacuum")) {
				message = `Your attempts to suck the ghoul into the vacuum fail. In the process it smashes the vacuum, releasing the ghosts!`;
				obj.location = null;
				objects["ghosts"].location = "finalRoom";
				(objects["ghosts"].description = "The ghosts whirl about the ghoul adding to its evil power!"), snd.ghost.play();
				snd.laugh.play();
				objects["vacuum"].location = null;
				return;
			}

			if (obj.id === "ghosts" && isRoom("finalRoom") && isCarrying("vacuum")) {
				message = `The ghosts are still inside the vacuum.`;
				return;
			}

			verbs["use"].action("vacuum", objects["vacuum"]);
			return;
		},
	},
	w: {
		action: function (noun, obj) {
			if (noun) return;
			verbs["go"].action("west");
		},
		singleWord: true,
	},
	wait: {
		action: function (noun, obj) {
			if (!noun) {
				message = "Time passes...";
				return;
			}
		},
		singleWord: true,
	},
	wear: {
		action: function (noun, obj) {
			message = `You can't wear that.`;

			if (obj.id === "coat" && isCarrying("coat") && !flags.wearingCoat) {
				message = `You put on the coat. Stylish.`;
				if (objects["key"].location === "coat") {
					message += ` Wait, there is something in the pocket!`;
				}
				flags.wearingCoat = true;
				return;
			}
			if (obj.id === "coat" && isCarrying("coat") && flags.wearingCoat) {
				message = `You are already wearing it.`;
				return;
			}
			if (obj.id === "coat" && !isCarrying("coat")) {
				message = `You don't have a coat.`;
				return;
			}

			if (obj.id === "ring" && isCarrying("ring") && !obj.isWorn) {
				message = "As you slide the ring on you finger you can feel evil coursing through your body.";
				obj.isWorn = true;
				return;
			}
		},
	},
	west: {
		synonym: "w",
	},
	x: {
		synonym: "look",
	},
	debug_get: {
		action: function (noun, obj) {
			debug = true;

			if (noun === "treasure") {
				for (let key in objects) {
					if (objects[key].score) {
						objects[key].location = "player";
					}
				}
				objects["candlestick"].location = currentRoom.rid;
				message = `You cheat and collect all the treasure.`;
				incrementTurn = false;
				return;
			}

			if (noun === "all") {
				for (let key in objects) {
					if (objects[key].portable) {
						objects[key].location = "player";
					}
				}
				message = `You cheat and collect all the objects, you filthy hoarder.`;
				incrementTurn = false;
				return;
			}

			if (obj) {
				obj.location = "player";
				message = `You cheat and ${obj.name} appears in your inventory.`;
				incrementTurn = false;
				return;
			}
		},
		singleWord: true,
		hiddenVerb: true,
	},
	debug_go: {
		action: function (noun, obj) {
			debug = true;

			if (noun === "list") {
				const room_array = [];
				let roomlist = "";

				for (let room in rooms) {
					room_array.push(room);
				}
				room_array.sort();

				for (let room in room_array) {
					roomlist += room_array[room] + ", ";
				}
				myHelp = `Here are the rooms: ${roomlist.substring(0, roomlist.length - 2)}`;
				displayOverlay(myHelp);
				message = "";
				incrementTurn = false;
				return;
			}

			if (noun) {
				for (let key in rooms) {
					if (noun === rooms[key].rid.toLowerCase()) {
						currentRoom = rooms[key];
					}
				}
				message = `You cheat and are teleported to ${currentRoom.name}`;
				incrementTurn = false;
				return;
			}
		},
		singleWord: true,
		hiddenVerb: true,
	},
	save: {
		action: function (noun) {
			incrementTurn = false;

			if (!noun || noun == "game") {
				const saveData = {
					currentRoom: currentRoom,
					turns: turns,
					flags: flags,
					objects: objects,
					rooms: rooms,
				};
				const hhSave = JSON.stringify(saveData);
				localStorage.setItem("hhSave", hhSave);
				message = `Your game is saved.`;
				return;
			}
		},
		singleWord: true,
	},
	restore: {
		action: function (noun) {
			incrementTurn = false;
			if (noun && noun != "game") {
				message = `<em>RESTORE</em> is only used to retrieve a previously saved game.`;
				return;
			}
			const savedGame = JSON.parse(localStorage.getItem("hhSave"));
			if (!savedGame) {
				message = `No game to restore.`;
				return;
			}
			currentRoom = rooms[savedGame.currentRoom.rid];
			turns = savedGame.turns;
			flags = savedGame.flags;
			for (let obj in objects) {
				for (let key in objects[obj]) {
					if (typeof objects[obj][key] != "function") {
						objects[obj][key] = savedGame.objects[obj][key];
					} else if (typeof objects[obj][key] == "function") {
						//
					} else if (!(key in savedGame.objects[obj])) {
						delete objects[obj][key];
					}
				}
			}
			for (let room in rooms) {
				for (let key in rooms[room]) {
					if (typeof rooms[room][key] != "function") {
						if (key == "exits" || key == "scenery") {
							delete rooms[room][key];
						}
						rooms[room][key] = savedGame.rooms[room][key];
					} else if (typeof rooms[room][key] == "function") {
						//
					} else if (!(key in savedGame.rooms[room])) {
						delete rooms[room][key];
					}
				}
			}
			message = `Welcome back.`;
			return;
		},
		singleWord: true,
	},
	delete: {
		action: function (noun) {
			incrementTurn = false;
			if (noun === "save") {
				if (!localStorage.getItem("hhSave")) {
					message = `You don't have game saved.`;
					return;
				}
				if (confirm("Delete your stored save game?")) {
					localStorage.removeItem("hhSave");
					savedGame = "";
					message = `Your saved game is deleted.`;
				}
				return;
			}
			if (!noun) {
				message = `To delete a saved game type <em>DELETE SAVE</em>`;
				return;
			}
		},
		singleWord: true,
	},
};
