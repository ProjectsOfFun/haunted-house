// Define the world's objects here.

const objects = {
	"aerosol": {
		"name": "a can of aerosol",
		"description": `The can reads, "For the highest hair. Warning: do not spray on small animals."`,
		"location": "debris",
		"portable": true,
		"flamable": true
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
	"bats": {
		"location": "mustyRoom",
		"description": "They are fluttering all around you. Occasionally, one will swoop down and attempt to take a bite!",
		"batsKilled": function() {
			this.description = "The bat carcasses lie motionless on the ground in tiny puddles of their own filth and blood.";
		}
	},
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
		"portable": true
	},
	"coffin": {
		"description": "The dark-stained pine box has tarnished brass hinges. The lid is closed.",
		"location": "deepCellar",
		"isOpen": false,
		"openCoffin": function() {
			this.description = "The dark-stained pine box has tarnished brass hinges. The coffin's lid is open, revealing its velvety, padded interior.";
		},
		"closeCoffin": function() {
			this.description = "The dark-stained pine box has tarnished brass hinges. The lid is closed.";
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
		"description": "Most of the desks a littered with paper scraps and other unimportant items. However, one has conspicuous drawer."
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
		"drawerOpen": function() {
			this.description = "The small side drawer is open.";
			this.isOpen = true;
		},
		"drawerClose": function() {
			this.description = "It's a small side drawer. It's closed.";
			this.isOpen = false;
		}
	},
	"east": {},
	"ghosts": {
		"description": "The ghosts whirl about the room like so many clouds of dust!",
		"location": "upperGallery"
	},
	"goblet": {
		"name": "a jeweled goblet",
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
		"description": `It's a normal length of rope and it's currently tied to an upper branch of the tree.`,
		"location": "blastedTree",
		"portable": true,
		"overrides": {
			"get": function() {
				const self = objects["rope"];
				if (flags.ropeTiedToTree) {
					verbs["get"].action("rope", self);
					self.removeFromTree();
					flags.ropeTiedToTree = false;
				} else {
					verbs["get"].action("rope", self);
				}
			},
			"climb": function() {
				const self = objects["rope"];
				if (flags.ropeTiedToTree && isRoom("blastedTree")) {
					message = `You use the rope to climb the tree.`;
					self.omnipresence = true;
					currentRoom = rooms["inTheTree"];
				} else if (flags.ropeTiedToTree && isRoom("inTheTree")) {
					message = `You use the rope to climb down.`;
					self.omnipresence = false;
					currentRoom = rooms["blastedTree"];
				} else {
					message = `It isn't attached to anything!`;
				}
			}
		},
		"removeFromTree": function() {
			this.name = "a length of rope";
			this.description = `It's a normal length of rope.`;
		},
		"tieToTree": function() {
			this.name = "a rope tied to a tree";
			this.description = `It's a normal length of rope and it's currently tied to an upper branch of the tree.`;
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
		"description": "It is decorated with gold leaf and medieval illustrations. The text is written is in an alien tongue.",
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