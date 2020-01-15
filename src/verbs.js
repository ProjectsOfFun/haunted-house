// Define your game verbs here.

const verbs = {
	"board": {
		"synonym": "enter"
	},
	"carrying": {
		"action": function(noun,obj) {
			if (noun) {
				return;
			}
			let inventory = "";
			for (let key in objects) {
				if (objects[key].location === "player") {
					if (inventory.length > 0) {
						inventory += ", "
					} else {
						inventory = "<br>"
					}
					inventory += objects[key].name;	
				}
			}
			if (!inventory) inventory = "Nothing.";
			message = `You are carrying: ${inventory}`;	
		},
		"singleWord": true
	},
	"chop": {
		"action": function(noun,obj) {
			message = "You don't need to chop that.";
			if (isCarrying("axe")) {
				verbSubroutine("swing","axe",verbs["swing"],objects["axe"]);
			} else {
				message = "Not with your bare hands. Your karate skills aren't what they used to be.";
			}
		}
	},
	"climb": {
		"default": "You can't climb that.",
		"action": function(noun,obj) {
			message = verbs["climb"].default;
			if (noun === "tree" && flags.ropeTiedToTree && isRoom("blastedTree")) {
				objects["rope"].overrides.climb();
				return;
			}
			if (noun === "tree" && flags.ropeTiedToTree && isRoom("inTheTree")) {
				verbs["go"].action("down");
				return;
			}
		}
	},
	"d": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("down");
		},
		"singleWord": true
	},
	"dig": {
		"singleWord": true,
		"action": function (noun,obj) {
			message = "You can't dig that.";

			if (!isCarrying("shovel")) {
				message = "You have nothing to dig with.";
				return;
			}
			if (!noun) {
				message = "Where do you want to dig?";
				return;
			}
			if (isRoom("cellar") && nounCheck(noun,["bars","window","barred window","brickwork","bricks"])) {
				if (!flags.barsDug) {
					message = "After several minutes of work, you manage to dig the bars out.";
					flags.barsDug = true;
					rooms["cellar"].exits.e = "cliffPath";
					rooms["cellar"].name = "Cellar with Hole in the Wall";
					rooms["cellar"].description = "The air in this cellar is damp with moisture. To the east, what once was a barred window is now a hole large enough to pass through."
					rooms["cliffPath"].exits.w = "cellar";
				} else {
					message = "You've already cleared the bars away from the window.";
				}
				return;
			}
		}
	},
	"down": {
		"synonym": "d"
	},
	"drop": {
		"action": function(noun,obj) {
			// Don't allow treasure to be dropped
			if (obj.score > 0 && isCarrying(obj)) {
				message = `The ${noun} is too valuable to drop.`;
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
					sndSplash.play();
				}
				flags.inBoat = false;
				return;
			}
		}
	},
	"e": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("east");
		},
		"singleWord": true
	},
	"east": {
		"synonym": "e"
	},
	"enter": {
		"action": function(noun,obj) {
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
		}
	},
	"examine": {
		synonym : "look"
	},
	"exit": {
		"action": function(noun,obj) {
			message = `You can't exit that.`;

			if (noun === "boat") {
				verbs["drop"].action("boat",objects["boat"]);
				return;
			}
		}
	},
	"extinguish": {
		"synonym": "unlight"
	},
	"get": {
		"action": function(noun,obj) {
			message = `What "${noun.toUpperCase()}?"`;
			if (!obj && currentRoom.scenery) {
				for (let key in currentRoom.scenery) {
					if (key.toLowerCase() == noun.toLowerCase()) {
						message = "You can't take that.";
						return;
					}
				}
			}
			if (obj.portable && objectInRange(obj)) {
				if (obj.location === currentRoom.rid) {
					message = "Taken.";
					obj.location = "player";
					if (obj.score > 0) {
						message = "You've found treasure!";
						sndPickup.play();
					}
					verbs["get"].combineObjects(noun,obj);
					return;
				}
				if (obj.location === "player") {
					message = "You already have it!";
					return;
				}
			}
			if (!obj.portable && objectInRange(obj)) {
				if (obj.location === currentRoom.rid) {
					message = "You don't need to take that.";
					return;
				}
			}
		},
		"combineObjects": function(noun,obj) {

			// Candle
			if ( (isCarrying("candlestick") && isCarrying("candle")) && (obj.id === "candlestick" || obj.id === "candle") ) {
				message += `<br>You place the candle in the candlestick.`;
				return;
			}

			// Vacuum
			if ( (isCarrying("batteries") && isCarrying("vacuum")) && (obj.id === "batteries" || obj.id === "vacuum") ) {
				objects["vacuum"].insertBatteries();
				objects["batteries"].location = "vacuum";
				flags.vacuumHasPower = true;
				message += `<br>The batteries are a perfect match for the vacuum. The vacuum is now powered.`;
				return;
			}
		}
	},
	"go": {
		"action": function(noun,obj) {
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
				case "boat":
					verbs["enter"].action("boat",objects["boat"]);
					return;
				default:
					message = `You need to specify a direction in which to&nbsp;<em>GO</em>.`;
					return;
			}

			// Get the room id of the chosen exit direction
			const chosenExit = currentRoom.exits[direction.toLowerCase()];

			// THINGS THAT HINDER MOVEMENT

			// Darkness
			if (currentRoom.darkness && !flags.candleLit) {
				message = `It's too dark to move!`;
				return;
			}

			if (flags.batsAttacking && isRoom("rearTurretRoom")) {
				message = `The bats are preventing your movement.`;
				return;
			}

			// Ghosts in upper gallery
			if (flags.ghostsAttacking && isRoom("upperGallery") && direction === "w") {
				message = `The ghosts won't let you pass!`;
				return;
			}

			// Magical barrier
			if (isRoom("coldChamber") && flags.magicalBarrier && direction === "e") {
				message = `A magical barrier is blocking your way to the west.`;
				sndShock.play();
				return;
			}

			// Water in room
			if (currentRoom.water && !flags.inBoat) {
				message = `The marshy ground prevents any movement.`;
				return;
			}

			// MOVEMENT ALLOWED
			if (direction && chosenExit) {
				let tempRoomHolder = previousRoom;

				message = "OK";
				previousRoom = currentRoom;
				currentRoom = getRoom(chosenExit);

				// THINGS THAT BLOCK NEW ROOM, MOVEMENT NOT ALLOWED
				if (currentRoom.darkness && !flags.candleLit)  {
					currentRoom = previousRoom;
					previousRoom = tempRoomHolder;
					message = `It's too dark in that direction. You'll need a light.`;
					return;
				}

				if ((currentRoom.water || currentRoom.shore) && flags.inBoat) {
					objects["boat"].location = currentRoom.rid;
					message = "Aye aye captain";
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

				// Trigger on exit events for last room.
				if (previousRoom.onExit) {
					previousRoom.onExit()
				}
	
				// Initial room visit events
				if (currentRoom.onEnter) {
					currentRoom.onEnter()
				}

			} else if (direction) {
				message = "You can't go that way!";
			} else {
				message = "Go where?";
			}

		}
		
	},
	"help": {
		"default": `"God helps those who help themselves."`,
		"action": function(noun,obj){
			message = `Haunted House is a text adventure. You perform actions by typing two word commands such as "TAKE RING" or "LOOK PAINTING". Explore the house and try to find the treasures within. For clues, be sure to "LOOK" at everything!<br><br>For more help type the following:<br>"HELP MOVEMENT" or "HELP COMMANDS"`;

			if (noun === "movement") {
				message = `You can move around the mansion by typing "GO NORTH", "GO WEST", "GO UP", etc. Save keystrokes by simply entering a single initial of the direction you want to move: "N","S","E","W","U" and "D".<br><br>Available exits are listed below the room description.`;
				return;
			}

			if (noun === "commands") {
				message = `There are several special commands in the game. "INVENTORY" or "I" will list the objects you are carrying. "SCORE" will reveal your current score. Some of the most useful verbs are "LOOK", "TAKE", and "DROP".<br><br>For a complete list of all the verbs I know type "HELP VERBS". But wait until you a really stuck before resorting to that.`;
				return;
			}

			if (noun === "verbs") {
				let verblist = "";
				for (let verb in verbs) {
					if (verb.length > 1) {
						verblist += verb + ", ";
					}
				}
				message = `<b>Words I know:</b>  ${verblist.substring(0,verblist.length - 2)}`;
				return;
			}

			if (noun) {
				message = verbs["help"].default;
				return;
			}
		},
		"singleWord": true
	},
	"i": {
		"synonym": "carrying",
		"singleWord": true
	},
	"inventory": {
		"synonym": "carrying",
		"singleWord": true
	},
	"leave": {
		"synonym": "drop"	
	},
	"light": {
		"default": "You can't light that.",
		"action": function(noun,obj) {
			message = verbs["light"].default;

			if (objects['matches'].location !== 'player') {
				message = `You have nothing to light it with.`;
				return;
			}

			if (noun === "candle" && isCarrying("candle") && isCarrying("candlestick")) {
				if (flags.candleLit) {
					message = `It's already lit.`;
				} else {
					message = `It casts a flickering light.`;
					flags.candleLit = true;
				}
				return;
			}

			if (noun === "candle" && isCarrying("candle") && !isCarrying("candlestick")) {
				message = `It will burn your hands!`;
				return;
			}

			if (noun === "aerosol" && isCarrying("aerosol")) {
				message = `An explosive fireball sprays out of the can of aerosol! You can kiss your eyebrows goodbye.`;
				return;
			}

			if ((noun === "cooker" || noun === "stove") && currentRoom.rid === "kitchen") {
				message = `The cooker is in no state to be lit.`;
				return;
			}

			if (noun === "rubbish" && currentRoom.rid === "yard") {
				message = `It's too damp to light.`;
				return;
			}

		}
	},
	"look": {
		"default": "You see nothing special.",
		"action": function(noun,obj) {
			if (!noun) {
				message = "You look around.";
				return;	
			}
			if (obj.description && objectInRange(obj)) {
				message = obj.description;
				return;
			} else if (obj.description) {
				message = "You do see that here.";
				return;
			}
			if (currentRoom.scenery) {
				for (let key in currentRoom.scenery) {
					if (key.toLowerCase() == noun.toLowerCase()) {
						message = currentRoom.scenery[key];
						return;
					}
				}	
			}
			message = "You see nothing special."
		}
	},
	"n": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("north");
		},
		"singleWord": true
	},
	"north": {
		"synonym": "n"
	},
	"open": {
		"action": function(noun,obj) {
			message = "You can't open that.";
		}
	},
	"read": {
		"action": function(noun,obj) {
			if (obj.readable && objectInRange(obj)) {
				message = obj.readableText;
				return;
			}
			message = "Nothing to read there."
		}
	},
	"remove": {
		"action": function(noun,obj) {
			if (noun === "coat" && isCarrying("coat") && flags.wearingCoat) {
				message = `You remove the coat`;
				flags.wearingCoat = false;
				return;
			}
			if (noun === "coat" && isCarrying("coat") && !flags.wearingCoat) {
				message = `You are not wearing it.`;
				return;
			}
		}
	},
	"s": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("south");
		},
		"singleWord": true
	},
	"say": {
		"action": function(noun,obj) {
			message = "You say, &quot;" + noun.toUpperCase() + "!&quot;";

			// Saying the magic word to dispell the field
			if (noun === "xzanfar" && isCarrying("magic spells")) {
				if (isRoom("coldChamber") && flags.magicalBarrier) {
					message += "<br><br>The air sizzles with energy and the magic field dissipates into nothingness.";
					flags.magicalBarrier = false;
					rooms["coldChamber"].dispellBarrier();
				} else if (isRoom("coldChamber")) {
					message += "<br><br>The magical field re-materializes!";
					flags.magicalBarrier = true;
					rooms["coldChamber"].createBarrier();
				} else {
					message += "<br><br>*Magic Occurs*"
				}
				return;
			}

			// Saying naughty things
			if (nounCheck(noun,["fuck","shit","cunt","tits"])) {
				message += "<br><br>Relax. It's just a game.";
				return;
			}
		}
	},
	"score": {
		"action": function(noun,obj) {
			message = `Your score is ${checkScore()}/${getMaxScore()}.`;
			if (checkScore() === 0) {
				message += " You need to find some treasure!"
			}
			if (checkScore() === getMaxScore()) {
				message += " That's everything. Hurry, find your way back to the front gate to escape.";
			}
		},
		"singleWord": true
	},
	"south": {
		"synonym": "s"
	},
	"spray": {
		"default": `You can't spray that!`,
		"action": function(noun,obj) {
			message = verbs["spray"].default;	

			if (obj.id === "aerosol" && isCarrying("aerosol") && flags.batsAttacking) {
				flags.batsAttacking = false;
				message = `Pfft! Got 'em!`;
				return;
			}	
			if (obj.id === "aerosol" && isCarrying("aerosol")) {
				message = `Hisssss...`;
				return;
			}
		}
	},
	"swing": {
		"default": "There's no reason to be swinging that.",
		"action": function(noun,obj) {
			message = verbs["swing"].default;
			if (obj.id === "rope" && flags.ropeTiedToTree && isRoom("blastedTree")) {
				message = `This is no time to be playing games.`;
				return;
			}
			if (obj.id === "rope" && isCarrying(["rope"])) {
				message = "You swung it. Yee haw, cowboy!";
				return;
			}
			if (obj.id === "axe" && isCarrying("axe") && isRoom("study") && !flags.studyWallBroken) {
				message = "You broke the thin wall.";
				flags.studyWallBroken = true;
				currentRoom.exits.n = "secretRoom";
				currentRoom.name = "Study with Secret Room";
				currentRoom.description = "This must be where mansion's owner spent many hours sitting at a one of the many desks researching the dark arts. In addition to the desks, to the north there is a passage leading to a secret room";
				currentRoom.scenery.hole = "The hole is much bigger now.";
				currentRoom.scenery.wall = "The wall is no more. A secret room lies to the north.";
				currentRoom.scenery.passage ="It leads north to a secret room.";
				return;
			}
			if (obj.id === "axe" && isCarrying("axe") && (isRoom("forest") || isRoom("thickForest") || isRoom("blastedTree"))) {
				message = "Don't chop the trees. You get the feeling it would anger the woodland spirits.";
				return;
			}
			if (obj.id === "axe" && isCarrying("axe")) {
				message = "Whoosh!!!";
				return;
			}
		}
	},
	"take": {
		synonym : "get"
	},
	"u": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("up");
		},
		"singleWord": true
	},
	"unlight": {
		"default": `You can't do that.`,
		"action": function(noun,obj) {
			message = verbs["unlight"].default;

			if (noun === "candle" && flags.candleLit) {
				message = `You blow out the candle.`;
				flags.candleLit = false;
				return;
			}
		}
	},
	"unlock": {
		"default": "You can't unlock that.",
		"action": function(noun,obj){
			message = verbs["unlock"].default;

			if (obj.locked && obj.key && objectInRange(obj) && isCarrying(obj.key)) {
				message = `You've unlocked the ${noun}.`;
				obj.locked = false;
			} else if (obj.locked && obj.key && objectInRange(obj)) {
				message = `You don't have a means to unlock that.`;
			} else if (obj.locked && objectInRange(obj)) {
				`You've unlocked the ${noun}.`;
			}
		}
	},
	"up": {
		"synonym": "u"
	},
	"use": {
		"action": function(noun,obj) {

			// Aerosol
			if (obj.id === "aerosol") {
				verbs["spray"].action(noun,obj);
				return;	
			}

			// Using the tiny vacuum
			if (obj.id === "vacuum" && flags.vacuumHasPower && flags.ghostsAttacking && currentRoom.rid === "upperGallery") {
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

			if (obj.id === "vacuum" && isCarrying("vacuum") && !isCarrying("batteries")) {
				message = `This vacuum requires batteries.`;
				return;
			}

		}
	},
	"w": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("west");
		},
		"singleWord": true
	},
	"wear": {
		"action": function(noun,obj) {
			message = `You can't wear that.`;

			if (noun === "coat" && isCarrying("coat") && !flags.wearingCoat) {
				message = `You put on the coat. Stylish.`;
				if (objects["key"].location === "coat") {
					message += ` Wait, there is something in the pocket!`;
				}
				flags.wearingCoat = true;
				return;
			}
			if (noun === "coat" && isCarrying("coat") && flags.wearingCoat) {
				message = `You are already wearing it.`;
				return;
			}
			if (noun === "coat" && !isCarrying("coat")) {
				message = `You don't have a coat.`;
				return;
			}
		}
	},
	"west": {
		"synonym": "w"
	},
	"x": {
		"synonym": "look"
	}
};