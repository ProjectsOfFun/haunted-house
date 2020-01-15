// Define the world's objects here.

const objects = {
	"painting": {
		"name": "a beautiful painting",
		"description": "It depicts a smiling, golden-haired child.",
		"location": "spookyRoom",
		"portable": true,
		"score": 1
	},
	"ring": {
		"name": "a golden ring",
		"location": "coffin",
		"portable": true,
		"score": 1
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
	"tome" : {
		"synonym": "magic spells"
	},
	"goblet": {
		"name": "a jewelled goblet",
		"description": "It made of shiny metal and encrusted with sparkling jewels.",
		"location": "frontTower",
		"portable": true,
		"score": 1
	},
	"scroll": {
		"location": "rearTurretRoom",
		"portable": true,
		"readable": true,
		"description": "The script is in an alien tongue.",
		"readableText": `It says "Klatu Borata Nickto."`,
		"score": 1
	},
	"coins": {
		"location": "darkAlcove",
		"portable": true,
		"score": 1
	},
	"statue": {
		"name": "an ebony statue",
		"description": "It looks African in origin and is most likely very valuable.",
		"location": "hallWithLockedDoor",
		"portable": true,
		"score": 1
	},
	"candlestick": {
		"name": "a golden candlestick",
		"description": "It is ornamented with gold and various jewels. And it can also hold a candle, literally!",
		"location": "library",
		"portable": true,
		"score": 1
	},
	"matches": {
		"name": "a box of matches",
		"location": "kitchen",
		"description": "The matches rattle around in the box.",
		"portable": true
	},
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
	"batteries": {
		"location": "poolOfLight",
		"portable": true
	},
	"shovel": {
		"name": "a shovel",
		"description": "It's a small garden shovel. Perfect for digging!",
		"location": "weedPatch",
		"portable": true
	},
	"axe": {
		"name": "an axe",
		"description": "Although a bit rusty, the blade is sharp. Looks like one <em>swing</em> could do some serious damage.",
		"location": "byWoodpile",
		"portable": true
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
	"can": {
		"synonym": "aerosol"
	},
	"candle": {
		"name": "a candle",
		"location": "drawer",
		"portable": true
	},
	"key": {
		"name": "a key",
		"description": "It's made of brass and it probably unlocks something, right?",
		"location": "coat",
		"portable": true
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

	"bats": {},

	"ghosts": {
		"description": "The ghosts whirl about the room like so many clouds of dust!",
		"location": "upperGallery"
	},

	"barrier": {
		"name": "the magical barrier",
		"description": "It is a glowing wall of energy. Shocking to the touch and thoroughly impassable.",
		"location": "coldChamber"
	},
	"magical barrier": {
		"synonym": "barrier"
	},
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
	"desk": {
		"location": "study",
		"description": "Most of the desks a littered with paper scraps and other unimportant items. However, one has an ornamented drawer."
	},
	"desks": {
		"synonym": "desk"
	},
	"coat": {
		"name": "a dusty old coat",
		"description": "It's a dusty old rancher's coat.",
		"location": "cupboard",
		"portable": true,
		"overrides": {
			"look": function() {
				const coat = objects['coat'];
				if (objects["key"].location == "coat" && (coat.location == "player" || currentRoom.rid == coat.location)) {
					message = "As you search through the old coat you find a key in the pocket.";
					sndKey.play();
					objects["key"].location = currentRoom.rid;
				} else {
					verbs["look"].action("coat", coat);	
				}
			}
		}
	},
	"pocket": {
		"synonym": "coat"
	},
	"rubbish": {
		"location": "yard",
		"description": "The garbage has decomposed into a heap of goo. That's very disgusting!"	
	},
	"message": {
		"location": "sideOfHouse",
		"description": "It's written in blood!",
		"readable": true,
		"readableText": `It says, "Seek the word to dispell the barrier."`
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
	"books": {
		"description": "They are demonic works.",
		"readable": true,
		"readableText": "You are unable to make sense of the ancient writings.",
		"location": "library"
	},
	"xzanfar": {},
	//"wall": {},
	"spells": {
		"synonym": "magic spells"
	},
	"north": {},
	"south": {},
	"west": {},
	"east": {},
	"up": {},
	"down": {},
	"air": {
		"description": "It can't be seen.",
		"omnipresence": true
	}
};