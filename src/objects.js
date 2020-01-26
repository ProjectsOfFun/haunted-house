// Define the world's objects here.

const objects = {
	"aerosol": {
		"name": "a can of aerosol",
		"description": `The can reads, "For the highest, most colorful hair. Warning: do not spray on small animals."`,
		"location": "frontPorch",
		"portable": true,
		"flamable": true
	},
	"spray paint": {
		"synonym": "aerosol"
	},
	"paint": {
		"synonym": "aerosol"
	},
	"air": {
		"description": "It can't be seen.",
		"omnipresence": true,
		"smellMessage": "The air smells of fear."
	},
	"axe": {
		"name": "an axe",
		"description": "Although a bit rusty, the blade is sharp. Looks like one <em>swing</em> could do some serious damage.",
		"location": "byWoodpile",
		"takeMessage": "As you pick up the axe you notice that there is dried blood on the handle.",
		"portable": true
	},
	"ax": {
		"synonym": "axe"
	},
	"barrier": {
		"name": "the magical barrier",
		"description": "It is a glowing wall of energy. Shocking to the touch and thoroughly impassable.",
		"location": "coldChamber"
	},
	"basin": {
		"synonym": "washbasin"
	},
	"bats": {
		"location": "mustyRoom",
		"description": "They are fluttering all around you. Occasionally, one will swoop down and attempt to take a bite!",
		"batsKilled": function() {
			this.description = "The bat carcasses lie motionless on the ground in tiny puddles of their own filth and blood.";
		},
		"takeMessage": "No way, you'll get bit!",
		"listenMessage": "The hear the bats' wings flapping amidst the incessant squeaking.",
		"smellMessage": "They smell of disease and filth."
	},
	"batteries": {
		"name": "some batteries",
		"description": "They are heavy duty power cells. Perfect for small appliances.",
		"location": "smallDarkRoom",
		"portable": true
	},
	"bins": {
		"synonym": "rubbish"
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
		"location": "library",
		"takeMessage": "Cursed books are not your idea of a fun read. Just leave them alone.",
		"smellMessage": "Odd, they reek of burning hair."
	},
	"box": {
		"synonym": "matches"
	},
	"can": {
		"synonym": "aerosol"
	},
	"candle": {
		"name": "a candle",
		"description": "It's a normal wax candle, but thin and tapered so it may  not last long once lit.",
		"location": "drawer",
		"portable": true,
		"smellMessage": "It smells waxy."
	},
	"candlestick": {
		"name": "a golden candlestick",
		"description": "It's gold and ornamented with various jewels. And it can also hold a candle, literally!",
		"location": "library",
		"portable": true,
		"score": 1,
		"takeMessage": "It's oddly warm to the touch, as if it had been held recently."
	},
	"coat": {
		"name": "a dusty old coat",
		"description": "It's a dusty old rancher's coat.",
		"location": "cupboard",
		"portable": true
	},
	"coffin": {
		"description": "It's a child-sized pine box with tarnished brass hinges. The lid is closed.",
		"location": "deepCellar",
		"isOpen": false,
		"openAction": function() {
			this.description = "It's a child-sized pine box with tarnished brass hinges. The coffin's lid is open, revealing its velvety, padded interior... but no body!";
			this.isOpen = true;
		},
		"closeAction": function() {
			this.description = "It's a child-sized pine box with tarnished brass hinges. The lid is closed.";
			this.isOpen = false;
		},
		"takeMessage": "It's far to heavy to carry."
	},
	"coins": {
		"description": "It's a sack of Seventeenth Century Spanish doubloons.",
		"location": "darkAlcove",
		"portable": true,
		"score": 1,
		"takeMessage": "As you pick up the sack of coins a number of tiny roaches emerge from underneath, darting away in all directions."
	},
	"roaches": {
		"location": "darkAlcove",
		"description": "They have scurried off into the darkness."
	},
	"debris": {
		"location": "debris",
		"description": "It's just a messy pile of building materials.",
		"takeMessage": "Sold out. Try de chedda!"
	},
	"desk": {
		"location": "study",
		"description": "Most of the desks are littered with paper scraps and other unimportant items. However, one has conspicuous drawer.",
		"takeMessage": "Your job is finding treasure, not moving furniture!"
	},
	"desks": {
		"synonym": "desk"
	},
	"dishes": {
		"location": "entranceToKitchen",
		"description": `They crunch under your feet.`,
		"takeMessage": "You might cut yourself."
	},
	"door": {
		"location": "hallWithLockedDoor",
		"description": "It's made of a thick, unbreakable wood.",
		"locked": true,
		"key": "key",
		"unlockMessage": "You slowly turn the key and unlock the door!",
		"unlockAction": function() {
			this.description = "It's made of a thick, unbreakable wood. It's open.";
			this.isOpen = true;
		},
		"isOpen": false,
		"closeAction": function() {
			this.description = "It's made of a thick, unbreakable wood. It's closed.";
			this.isOpen = false;
		},
		"openAction": function() {
			this.description = "It's made of a thick, unbreakable wood. It's open.";
			this.isOpen = true;
		}
	},
	"drawer": {
		"location": "study",
		"description": "It's a small side drawer. It's closed.",
		"isOpen": false,
		"openMessage": "You slide the drawer open.",
		"openAction": function() {
			this.description = "The small side drawer is open.";
			this.isOpen = true;
		},
		"closeMessage": "You slide the drawer closed.",
		"closeAction": function() {
			this.description = "It's a small side drawer. It's closed.";
			this.isOpen = false;
		}
	},
	"egg": {
		"name": "a jewel encrusted egg",
		"description": "It's a finely crafted jeweled egg. You get the feeling that you've seen it before.",
		"location": "inTheTree",
		"portable": true,
		"score": 1
	},
	"ghost": {
		"synonym": "ghosts"
	},
	"ghosts": {
		"description": "The ghosts whirl about the room like so many clouds of dust!",
		"location": "upperGallery",
		"takeMessage": "You try to grab the ghosts, but your hands pass through their ephemeral bodies.",
		"listenMessage": `The ghosts howls and cry as they zing around the room.`
	},
	"ghoul": {
		"location": "finalRoom",
		"description": "The ghoul is the size of a child. Worms and maggots slither over its flesh as a dark ooze dribbles from its mouth.",
		"smellMessage": "It smells of rotting death.",
		"takeMessage": "The ghoul scratches and claws at you. Best to stay clear of it.",
		"listenMessage": "The ghoul chuckles a sinister child-like laugh."
	},
	"goblet": {
		"name": "a jeweled goblet",
		"description": "It made of shiny metal and encrusted with sparkling jewels. However, you notice traces of what appears to be nightshade lining the interior.",
		"location": "frontTower",
		"portable": true,
		"score": 1,
		"takeMessage": "As you pick up the goblet notice an odd smell.",
		"smellMessage": "You recognize the scent. That's definitely nightshade."
	},
	"key": {
		"name": "a key",
		"description": "It's made of brass and it probably unlocks something, right?",
		"location": "coat",
		"portable": true,
		"takeMessage": "You take the key and wonder what it unlocks."
	},
	"magic spells": {
		"name": "a tome of magic spells",
		"description": "There is something written on it.",
		"readableText": `The text reads: Say this word with care, "Xzanfar."`,
		"location": "secretRoom",
		"readable": true,
		"portable": true,
		"score": 1,
		"takeMessage": "The tome vibrates with energy as you pick it up."
	},
	"magical barrier": {
		"synonym": "barrier"
	},
	"matches": {
		"name": "a box of matches",
		"location": "kitchen",
		"description": "A large number of matches rattle around in the box.",
		"portable": true
	},
	"message": {
		"location": "sideOfHouse",
		"description": "It's written in blood! Do you dare <em>read</em> it?",
		"readable": true,
		"readableText": `It says, "Seek the word to dispell the barrier."`
	},
	"painting": {
		"name": "a beautiful painting",
		"description": "It depicts a smiling, golden-haired child. He is grasping a tiny animal skull.",
		"location": "spookyRoom",
		"portable": true,
		"score": 1,
		"takeMessage": "As you pick it up, you swear you hear the cries of a child from somewhere in the house."
	},
	"pocket": {
		"synonym": "coat"
	},
	"pots": {
		"location": "kitchen",
		"description": "They are rusty and covered in muck.",
		"takeMessage": "They are rusty and covered in muck."
	},
	"remains": {
		"name": "skeletal remains",
		"location": "diningRoom",
		"description": "They look to be the remains of a small mammal. A dog perhaps?",
		"takeMessage": "The idea of carrying around those bones disgusts you.",
		"smellMessage": "You consider sniffing the bones and then stop yourself."
	},
	"ring": {
		"name": "a golden ring",
		"description": "The ring is marked with and engraved pentagram.",
		"location": "coffin",
		"portable": true,
		"score": 1,
		"isWorn": false,
		"takeMessage": `As you grasp the ring, a devilish voice in your head whispers, "I am yours, wear me, wear me..."`
	},
	"rope": {
		"name": "a rope tied to a tree",
		"description": `It's a length of rope tied to a branch of the tree. You can just reach it.`,
		"location": "blastedTree",
		"portable": false,
		"takeMessage": "You can't undo the knot. Besides, it's probably tied there for a (not-so-good) reason.",
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
		"description": "The garbage has decomposed into a heap of goo. That's very disgusting!",
		"takeMessage": "I know you miss your youthful days of dumpster diving, but let's not mess with the rubbish heap.",
		"smellMessage": `The rubbish smells as if it were the first day of spring and it just so happens that the World Vomit Championship was being held on that day.`
	},
	"scroll": {
		"name": "a scroll",
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
	"skeleton": {
		"synonym": "remains"
	},
	"spells": {
		"synonym": "magic spells"
	},
	"statue": {
		"name": "an ebony statue",
		"description": "It looks African in origin and is most likely very valuable.",
		"location": "hallWithLockedDoor",
		"portable": true,
		"score": 1,
		"takeMessage": "As you pick up the statue you feel a prickle of dark energy race through your fingertips."
	},
	"tome" : {
		"synonym": "magic spells"
	},
	"trash": {
		"synonym": "rubbish"
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
	"vase": {
		"name": "a vase in the muck",
		"description": "It's mostly submerged in the muck, but it looks like a valuable antique.",
		"location": "marsh",
		"portable": true,
		"score": 1,
		"takeMessage": `With a loud "schloop!" pull the vase out of the bog.`,
		"takeVase": function() {
			this.name = "an antique Chinese vase";
			this.description = "The vase is Chinese in orgin. It is covered with images of spirits amoungst warriors.";
		}
	},
	"xzanfar": {},

};