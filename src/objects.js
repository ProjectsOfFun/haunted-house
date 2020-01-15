// Define the world's objects here.

const objects = {
	"aerosol": {
		"name": "a can of aerosol",
		"description": `The can reads, 'For the highest hair. Warning: do not spray on small animals.'`,
		"location": "debris",
		"portable": true,
		"flamable": true,
		"overrides": {
			"light": function() {
				if (objects['aerosol'].location == 'player' && objects['matches'].location == 'player') {
					message = "An explosive fireball sprays out of the can of aerosol! You can kiss your eyebrows goodbye.";
				} else if (objects['aerosol'].location == 'player') {
					message = "You have nothing to ignite the aerosol.";
				} else {
					message = "You are not holding any aerosol.";
				}
			}
		}
	},
	"air": {
		"description": "It can't be seen.",
		"omnipresence": true
	},
	"axe": {
		"name": "an axe",
		"description": "Although a bit rusty, the blade is sharp. Looks like one <em>swing</em> could do some serious damage.",
		"location": "byWoodpile",
		"portable": true
	},
	"barrier": {
		"name": "the magical barrier",
		"description": "It is a glowing wall of energy. Shocking to the touch and thoroughly impassable.",
		"location": "coldChamber"
	},
	"bats": {},
	"batteries": {
		"name": "some batteries",
		"description": "They are heavy duty power cells. Perfect for small appliances.",
		"location": "smallDarkRoom",
		"portable": true
	},
	"boat": {
		"name": "a boat",
		"description": "It's rickety and old, but it should float.",
		"location": "cliffPathByMarsh",
		"overrides": {
			"get": function() {
				if (objectInRange("boat")) {
					if (!flags.inBoat) {
						message = `It's too big to carry around. It will carry you if you board it.`;
					} else {
						message = `Um, you are sitting in the boat. Besides, it's too big to carry.`;
					}
					return;
				}
			}
		}
	},
	"books": {
		"description": "They are demonic works.",
		"readable": true,
		"readableText": "You are unable to make sense of the ancient writings.",
		"location": "library"
	},
	"can": {
		"synonym": "aerosol"
	},
	"candle": {
		"name": "a candle",
		"description": "It's a normal wax candle.",
		"location": "drawer",
		"portable": true
	},
	"candlestick": {
		"name": "a golden candlestick",
		"description": "It is ornamented with gold and various jewels. And it can also hold a candle, literally!",
		"location": "library",
		"portable": true,
		"score": 1
	},
	"coat": {
		"name": "a dusty old coat",
		"description": "It's a dusty old rancher's coat.",
		"location": "cupboard",
		"portable": true,
		"overrides": {
			"look": function() {
				const coat = objects['coat'];
				if (objects["key"].location === "coat" && (coat.location === "player" || currentRoom.rid === coat.location)) {
					message = "As you search through the old coat you find a key in the pocket.";
					sndKey.play();
					objects["key"].location = currentRoom.rid;
				} else {
					verbs["look"].action("coat", coat);	
				}
			}
		}
	},
	"coffin": {
		"location": "deepCellar",
		"overrides": {
			"open": function() {
				const coffin = objects["coffin"];
				if (currentRoom.rid === coffin.location) {
					if (objects["ring"].location === "coffin") {
						message = "You slowly raise the lid revealing... a ring!";
						objects["ring"].location = coffin.location;
					} else {
						message = "That's creepy!";
					}
				}
				//flags[2] = 0;	//???
			}
		}
	},
	"coins": {
		"description": "It's a sack of Seventeenth Century Spanish doubloons.",
		"location": "darkAlcove",
		"portable": true,
		"score": 1
	},
	"desk": {
		"location": "study",
		"description": "Most of the desks a littered with paper scraps and other unimportant items. However, one has an ornamented drawer."
	},
	"desks": {
		"synonym": "desk"
	},
	"door": {
		"location": "hallWithLockedDoor",
		"description": "It's made of a thick, unbreakable wood.",
		"locked": true,
		"open": false,
		"overrides": {
			"unlock": function() {
				const thisDoor = objects["door"];

				if (objectInRange(thisDoor)) {
					if (isCarrying("key") && thisDoor.locked === true) {
						message = "You slowly turn the key and unlock the door!";
						rooms["hallWithLockedDoor"].exits.s = "steepMarbleStairs";
						thisDoor.locked = false;
						thisDoor.open = true;
					} else if (thisDoor.locked === false) {
						message = "It's already unlocked.";
					} else {
						message = "This door requires a key!";
					}
					return;
				}

			},
			"open": function(){
				if (objects["door"].locked) {
					message = "It's locked!";
				} else {
					message = "It's already open.";
				}
			}
		}
	},
	"down": {},
	"drawer": {
		"location": "study",
		"description": "It's a small side drawer. It's closed.",
		"isOpen": false,
		"overrides": {
			"open": function() {
				const drawer = objects["drawer"];
				if (currentRoom.rid === drawer.location) {
					if (!drawer.isOpen && objects["candle"].location === "drawer") {
						message = "You slide the drawer open revealing a candle.";
						drawer.description = "The small side drawer is open and empty.";
						objects["candle"].location = "study";
						drawer.isOpen = true;
					} else if (!drawer.isOpen) {
						message = "You slide open the drawer.";
						drawer.description = "The small side drawer is open and empty.";
						drawer.isOpen = true;
					} else {
						message = "It's already open.";
					}
				}
			}
		}
	},
	"east": {},
	"ghosts": {
		"description": "The ghosts whirl about the room like so many clouds of dust!",
		"location": "upperGallery"
	},
	"goblet": {
		"name": "a jewelled goblet",
		"description": "It made of shiny metal and encrusted with sparkling jewels.",
		"location": "frontTower",
		"portable": true,
		"score": 1
	},
	"key": {
		"name": "a key",
		"description": "It's made of brass and it probably unlocks something, right?",
		"location": "coat",
		"portable": true
	},
	"magic spells": {
		"name": "a tome of magic spells",
		"description": "There is something written on it.",
		"readableText": "The text reads: Use this word with care, 'Xzanfar'.",
		"location": "secretRoom",
		"readable": true,
		"portable": true,
		"score":1
	},
	"magical barrier": {
		"synonym": "barrier"
	},
	"matches": {
		"name": "a box of matches",
		"location": "kitchen",
		"description": "The matches rattle around in the box.",
		"portable": true
	},
	"message": {
		"location": "sideOfHouse",
		"description": "It's written in blood!",
		"readable": true,
		"readableText": `It says, "Seek the word to dispell the barrier."`
	},
	"north": {},
	"painting": {
		"name": "a beautiful painting",
		"description": "It depicts a smiling, golden-haired child.",
		"location": "spookyRoom",
		"portable": true,
		"score": 1
	},
	"pocket": {
		"synonym": "coat"
	},
	"ring": {
		"name": "a golden ring",
		"location": "coffin",
		"portable": true,
		"score": 1
	},
	"rope": {
		"name": "a rope tied to a tree",
		"location": "blastedTree",
		"portable": true,
		"overrides": {
			"get": function() {
				if (flags.ropeTiedToTree) {
					verbs["get"].action("rope", objects["rope"]);
					objects["rope"].name = "a length of rope";
					flags.ropeTiedToTree = false;
				} else {
					verbs["get"].action("rope",objects["rope"]);
				}
			},
			"climb": function() {
				if (flags.ropeTiedToTree && isRoom("blastedTree")) {
					message = `You use the rope to climb the tree.`;
					objects["rope"].omnipresence = true;
					currentRoom = rooms["inTheTree"];
				} else if (flags.ropeTiedToTree && isRoom("inTheTree")) {
					message = `You use the rope to climb down.`;
					objects["rope"].omnipresence = false;
					currentRoom = rooms["blastedTree"];
				} else {
					message = `It isn't attached to anything!`;
				}
			}
		}
	},
	"rubbish": {
		"location": "yard",
		"description": "The garbage has decomposed into a heap of goo. That's very disgusting!"	
	},
	"scroll": {
		"location": "rearTurretRoom",
		"portable": true,
		"readable": true,
		"description": "The script is in an alien tongue.",
		"readableText": `It says "Klatu Borata Nickto."`,
		"score": 1
	},
	"shovel": {
		"name": "a shovel",
		"description": "It's a small garden shovel. Perfect for digging!",
		"location": "weedPatch",
		"portable": true
	},
	"south": {},
	"spells": {
		"synonym": "magic spells"
	},
	"statue": {
		"name": "an ebony statue",
		"description": "It looks African in origin and is most likely very valuable.",
		"location": "hallWithLockedDoor",
		"portable": true,
		"score": 1
	},
	"tome" : {
		"synonym": "magic spells"
	},
	"up": {},
	"vacuum": {
		"name": "a tiny vacuum",
		"description": "It's a tiny, battery-powered vacuum cleaner. Perfect for capturing dust and much more!",
		"location": "gloomyPassage",
		"portable": true,
		"insertBatteries": function() {
			this.description = `It's a tiny, battery-powered vacuum cleaner. Perfect for capturing dust and much more! It is fully powered and ready to <em>use</em>.`;
			this.name = "a fully powered vacuum";
		},
		"captureGhosts": function() {
			this.name = "a tiny vacuum filled with ghosts";
			this.description = `It's a tiny, battery-powered vacuum cleaner. It's filled with ghosts!`;
		}
	},
	"west": {},
	"xzanfar": {},

};