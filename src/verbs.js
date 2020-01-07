// Define your game verbs here.

var verbs = {
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
					verblist += verb + ", ";
				}
				message = `<b>Words I know:</b><br> ${verblist.substring(0,verblist.length - 2)}`;
				return;
			}

			if (noun) {
				message = verbs["help"].default;
				return;
			}
		},
		"singleWord": true
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
	"inventory": {
		"synonym": "carrying",
		"singleWord": true
	},
	"i": {
		"synonym": "carrying",
		"singleWord": true
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
			if (flags.ghostsAttacking && isRoom("upperGallery")) {
				message = `The ghosts won't let you move!`;
				return;
			}

			if (currentRoom.darkness && !flags.candleLit) {
				message = `It's too dark to move!`;
				return;
			}

			if (flags.batsAttacking && isRoom("rearTurretRoom")) {
				message = `The bats are preventing your movement.`;
				return;
			}

			if (isRoom("coldChamber") && flags.magicalBarrier && direction === "w") {
				message = `A magical barrier is blocking your way to the west.`;
				return;
			}

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
				message = "GO WHERE?";
			}

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
	"s": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("south");
		},
		"singleWord": true
	},
	"south": {
		"synonym": "s"
	},
	"w": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("west");
		},
		"singleWord": true
	},
	"west": {
		"synonym": "w"
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
	"u": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("up");
		},
		"singleWord": true
	},
	"up": {
		"synonym": "u"
	},
	"d": {
		"action": function(noun,obj) {
			if (noun) return;
			verbs["go"].action("down");
		},
		"singleWord": true
	},
	"down": {
		"synonym": "d"
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
		}
	},
	"take": {
		synonym : "get"
	},
	"open": {
		"action": function(noun,obj) {
			message = "You can't open that.";
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
	"examine": {
		synonym : "look"
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
	"say": {
		"action": function(noun,obj) {
			message = "You say, &quot;" + noun.toUpperCase() + "!&quot;";

			// Saying the magic word to dispell the field
			if (noun === "xzanfar" && isCarrying("magic spells")) {
				if (isRoom("coldChamber") && flags.magicalBarrier) {
					message += "<br><br>The air sizzles with energy and the magic field dissipates into nothingness.";
					flags.magicalBarrier = false;
				} else if (isRoom("coldChamber")) {
					message += "<br><br>The magical field re-materializes!";
					flags.magicalBarrier = true;
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
			if (obj.id === "axe" && isCarrying("axe") && !isRoom("study")) {
				message = "Whoosh!!!";
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
		}
	},
	"chop": {
		"action": function(noun,obj) {
			message = "You don't need to chop that.";
			if (isCarrying("axe")) {
				verbSubroutine("swing","axe",verbs["swing"],objects["axe"]);
			} else {
				message = "Not with your bare hands. You're karate skills aren't what they used to be.";
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

		}
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
	"extinguish": {
		"synonym": "unlight"
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
	"use": {
		"default": `You are going to need to be more specific.`,
		"action": function(noun,obj) {
			//message = verbs["use"].default;

			if (obj.id === "aerosol") {
				verbs["spray"].action(noun,obj);
				return;	
			}

			if (obj.id === "vacuum" && isCarrying("vacuum") && isCarrying("batteries") && !flags.vacuumSwitchedOn) {
				message = `The vacuum is switched on.`;
				flags.vacuumSwitchedOn = true;
				return;
			}

			if (obj.id === "vacuum" && isCarrying("vacuum") && isCarrying("batteries") && flags.vacuumSwitchedOn) {
				message = `The vacuum is switched off.`;
				flags.vacuumSwitchedOn = false;
				return;
			}

			if (obj.id === "vacuum" && isCarrying("vacuum") && !isCarrying("batteries")) {
				message = `This vacuum requires batteries.`;
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
	"drop": {
		"action": function(noun,obj) {
			if (obj.location === "player") {
				obj.location = currentRoom.rid;
				message = "Dropped.";
				return;
			}

			if (noun === "boat" && flags.inBoat) {
				message = `You jump out of the boat.`;
				if (currentRoom.water) {
					message += ` SPLASH!<br>`;
				}
				flags.inBoat = false;
				return;
			}
		}
	},
	"leave": {
		"synonym": "drop"	
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
	"board": {
		"synonym": "enter"
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
	"score": {
		"action": function(noun,obj) {
			message = `Your score is ${checkScore()}/${getMaxScore()}.`;
		},
		"singleWord": true
	}
};