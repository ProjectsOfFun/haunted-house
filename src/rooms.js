// Define your rooms here

const rooms = {
	darkCorner: {
		"name": "Dark Corner",
		"exits": {
			"e": "overgrownGarden",
			"s": "cornerOfHouse"
		}
	},
	overgrownGarden: {
		"name": "Overgrown Garden",
		"exits": {
			"w": "darkCorner",
			"e": "byWoodpile"
		}
	},
	byWoodpile: {
		"name": "Large Wood Pile",
		"exits": {
			"w": "overgrownGarden",
			"e": "yard"
		}
	},
	yard: {
		"name": "Yard by Rubbish",
		"exits": {
			"w": "byWoodpile",
			"e": "weedPatch",
			"s": "sculleryDoor"
		}
	},
	weedPatch: {
		"name": "Weed Patch",
		"exits": {
			"w": "yard",
			"e": "forest"
		}
	},
	forest: {
		"name": "Forest",
		"exits": {
			"w": "weedPatch",
			"e": "thickForest"
		}
	},
	thickForest: {
		"name": "Thick Forest",
		"exits": {
			"w": "weedPatch",
			"e": "blastedTree",
			"s": "clearing"
		}
	},
	"blastedTree": {
		"name": "Blasted Tree",
		"description": "This corner of the property is eerily dim. Looming above is an ominous tree. It's leafless branches crackle in the breeze.",
		"exits": {
			"w": "thickForest",
			"s": "path"
		},
		"onEnter": function() {
			objects["rope"].omnipresence = false;
		},
		"scenery": {
			"tree": "The tree is devoid of leaves and has an almost demon-like appearance.",
			"branches": "The branches are devoid of leaves."
		}
	},
	cornerOfHouse: {
		"name": "Corner of the House",
		"exits": {
			"n": "darkCorner",
			"s": "sideOfHouse"
		}
	},
	entranceToKitchen: {
		"name": "Entrance to Kitchen",
		"exits": {
			"s": "backOfHallway",
			"e": "kitchen"
		}
	},
	kitchen: {
		"name": "Kitchen and Grimy Cooker",
		"exits": {
			"w": "entranceToKitchen",
			"e": "sculleryDoor"
		}
	},
	sculleryDoor: {
		"name": "Scullery Door",
		"exits": {
			"n": "yard",
			"w": "kitchen"
		}
	},
	dustyRoom: {
		"name": "Dusty Room",
		"description": "Room with Inches of Dust",
		"exits": {
			"s": "spiralStaircase",
			"e": "rearTurretRoom"
		}
	},
	"rearTurretRoom": {
		"name": "Rear Turret Room",
		"exits": {
			"w": "dustyRoom"
		}
	},
	clearing: {
		"name": "Clearing by House",
		"exits": {
			"n": "thickForest",
			"e": "path"
		}
	},
	path: {
		"name": "Path",
		"exits": {
			"n": "blastedTree",
			"s": "clifftop",
			"w": "clearing"
		}
	},
	sideOfHouse: {
		"name": "Side of House",
		"exits": {
			"n": "sideOfHouse",
			"s": "crumblingWall"
		}
	},
	backOfHallway: {
		"name": "Back Hallway",
		"description": "The hallway appears to be coming to an end here. There is a portrait hanging on the wall.",
		"exits": {
			"n": "entranceToKitchen",
			"s": "gloomyPassage"
		},
		"scenery": {
			"portrait": "It depicts a sad elderly woman in a black dress. She stands aside an old tree.",
			"painting": "It depicts a sad elderly woman in a black dress. She stands aside an old tree.",
			"woman": "I think her eyes just moved!",
			"eyes": "They seem to follow you around the room.",
			"tree": "The tree is barren and looks like there is a rope tied to one of the branches.",
			"rope": "Maybe it's just a vine? The artist was not that keen on details.",
			"dress": "It's a lacy number like they used to wear in the nineteenth century."
		}
	},
	darkAlcove: {
		"name": "Dark Alcove",
		"exits": {
			"s": "poolOfLight",
			"e": "smallDarkRoom"
		},
		darkness : true
	},
	smallDarkRoom: {
		"name": "Small Dark Room",
		"exits": {
			"w": "darkAlcove",
			"e": "spiralStaircase"
		}
	},
	spiralStaircase: {
		"name": "Spiral Staircase",
		"description": "Bottom of Spiral Staircase",
		"exits": {
			"n": "dustyRoom",
			"w": "smallDarkRoom",
			u: "dustyRoom",
			d: "smallDarkRoom"
		}
	},
	widePassage: {
		"name": "Wide Passage",
		"exits": {
			"s": "trophyRoom",
			"e": "slipperySteps"
		}
	},
	slipperySteps: {
		"name": "Slippery Steps",
		"exits": {
			"w": "widePassage",
			"s": "cellar",
			u: "widePassage",
			d: "cellar"
		}
	},
	clifftop: {
		"name": "Clifftop",
		"exits": {
			"n": "path",
			"s": "cliffPath"
		}
	},
	crumblingWall: {
		"name": "Crumbling Wall",
		"exits": {
			"n": "sideOfHouse"
		}
	},
	gloomyPassage: {
		"name": "Gloomy Passage",
		"description": "This long, gloomy section of hallway continues north and south.",
		"exits": {
			"n": "backOfHallway",
			"s": "frontHall"
		}
	},
	poolOfLight: {
		"name": "Pool of Light",
		"exits": {
			"n": "darkAlcove",
			"e": "vaultedHall",
			"s": "sittingRoom"
		}
	},
	vaultedHall: {
		"name": "Impressive Vaulted Hallway",
		"exits": {
			"w": "darkAlcove",
			"e": "hallWithLockedDoor"	
		},
		darkness : true
	},
	"hallWithLockedDoor": {
		"name": "Hall by Thick Wooden Door",
		"exits": {
			"w": "vaultedHall",
			"e": "trophyRoom"
		},
		"darkness" : true
	},
	trophyRoom: {
		"name": "Trophy Room",
		"exits": {
			"n": "widePassage",
			"s": "diningRoom",
			"w": "hallWithLockedDoor"
		},
		darkness : true
	},
	cellar: {
		"name": "Cellar With Barred Window",
		"description": "The air in this cellar is damp with moisture. There is a barred window on the east wall.",
		"exits": {
			"n": "slipperySteps",
			"s": "deepCellar"
		},
		"scenery": {
			"window": "The window has long since been smashed open, but there are bars blocking your exit.",
			"bars": "The bars are planted in front of the window. However, the moisture appears to have softened the brickwork around the frame.",
			"bricks": "They aren't as rigid as they once were.",
			"brickwork": "It isn't as rigid as it once was."
		}
	},
	cliffPathByWindow: {
		"name": "Cliff Path by Window",
		"exits": {
			"n": "clifftop",
			"s": "cliffPath"
		}
	},
	cupboard: {
		"name": "Cupboard With Hanging Coats",
		"description": "This tiny side room off of the main closet is where old garments are stored.",
		"exits": {
			"s": "closet"
		}
	},
	frontHall: {
		"name": "Front Hall",
		"description": "The entranceway ends here. To the north is a long hallway leading towards the back of the house. To the east are the main rooms of the mansion",
		"exits": {
			"n": "gloomyPassage",
			"e": "sittingRoom",
			"s": "frontLobby"
		}
	},
	sittingRoom: {
		"name": "Sitting Room",
		"exits": {
			"n": "poolOfLight",
			"w": "frontHall",
			"s": "library"
		}
	},
	secretRoom: {
		"name": "Secret Room",
		"exits": {
			"s": "study"
		}
	},
	steepMarbleStairs: {
		"name": "Steep Marble Stairs",
		"exits": {
			"n": "hallWithLockedDoor",
			"s": "cobwebbyRoom",
			u: "hallWithLockedDoor",
			d: "cobwebbyRoom"
		}
	},
	diningRoom: {
		"name": "Dining Room",
		"exits": {
			"n": "trophyRoom"
		}
	},
	deepCellar: {
		"name": "Deep Cellar with Coffin",
		"exits": {
			"n": "cellar"
		}
	},
	cliffPath: {
		"name": "Cliff Path",
		"exits": {
			"n": "cliffPathByWindow",
			"s": "cliffPathByMarsh"
		}
	},
	closet: {
		"name": "Closet",
		"description": "The front closet is large and mosty empty. You notice a small opening to the north that leads to the cupboard.",
		"exits": {
			"n": "cupboard",
			"e": "frontLobby"
		},
		"scenery": {
			"opening": "I think you can squeeze through."
		}
	},
	frontLobby: {
		"name": "Front Lobby",
		"description": "The entrance to the old mansion is cold and your footsteps echo off the marbled floor. The door through which you entered is sealed shut.",
		"exits": {
			"n": "frontHall",
			"w": "closet"
		},
		onEnter: function() {
			if (flags.frontDoorOpen) {
				message = "With a tremendous &quot;BANG!&quot; the door slams shut behind you.";
				flags.frontDoorOpen = false;
				delete rooms["frontPorch"].exits.n;
			}
		},
		"scenery": {
			"door": "No matter how much you try, it won't open. You'll need to find another way out.",
			"floor": "The floor is in surprisingly good shape considering its age."
		}
	},
	library: {
		"name": "Library of Evil Books",
		"exits": {
			"n": "sittingRoom",
			"e": "study"
		}
	},
	"study": {
		"name": "The Study",
		"exits": {
			"w": "library"
		},
		"description": "This must be where mansion's owner spent many hours sitting at a one of the many desks researching the dark arts. In addition to the desks you notice a small hole in the wall.",
		"scenery": {
			"wall" : "I seems brittle. You may be able to chop your way through.",
			"hole" : "There's something beyond..."	
		}
	},
	cobwebbyRoom: {
		"name": "Weird Cobwebby Room",
		"exits": {
			"n": "steepMarbleStairs",
			"e": "coldChamber",
			"s": "upperGallery"
		}
	},
	coldChamber: {
		"name": "Very Cold Chamber",
		"exits": {
			"w": "cobwebbyRoom",
			"e": "spookyRoom"
		}
	},
	spookyRoom: {
		"name": "Spooky Room",
		"exits": {
			"w": "coldChamber"
		}
	},
	"cliffPathByMarsh": {
		"name": "Cliff Path by Marsh",
		"description": "The path ends here at the edge of a boggy marsh. Travelling south could be very dangerous.",
		"exits": {
			"n": "cliffPath",
			"s": "soggyPath"
		},
		"shore": true
	},
	"verandah": {
		"name": "Rubble-Strewn Verandah",
		"description": "Here the mansion's verandah ends. Like the rest of the house it is strewn with rubble.",
		"exits": {
			"s": "twistedRailings",
			"e": "frontPorch"
		},
		"scenery": {
			"rubble" : "The rubble is comprised of various bits and pieces that have fallen from the structure of the house."
		}
	},
	"frontPorch": {
		"name": "Front Porch",
		"description": "The front porch of the mansion is weather worn and rotting. To the north, the ornately carved front doorway of the mansion beckons.",
		"exits": {
			"n": "frontLobby",
			"w": "verandah",
			"s": "pathThroughIronGate"
		},
		"scenery": {
			"doorway": "The carvings depict various sinister creatures.",
			"carvings": "The carvings depict various sinister creatures."
		}
	},
	frontTower: {
		"name": "Front Tower",
		"exits": {
			"e": "slopingCorridor"
		}
	},
	"slopingCorridor": {
		"name": "Sloping Corridor",
		"exits": {
			"w": "frontTower",
			"e": "upperGallery"
		}
	},
	"upperGallery": {
		"name": "Upper Gallery",
		"description": "The relative calm of this room feels wrong.",
		"exits": {
			"n": "cobwebbyRoom",
			"w": "slopingCorridor"
		},
		onEnter:  function() {
			if (flags.ghostsAttacking) {
				this.description = "You shudder with fear as flurry of ghosts circles you, blocking your movement.";
			} else {
				this.description = "The relative calm of this room feels wrong.";
			}
		},
		onExit:  function() {
			if (flags.ghostsAttacking) {
				this.description = "You shudder with fear as flurry of ghosts circles you, blocking your movement.";
			} else {
				this.description = "The relative calm of this room feels wrong.";
			}
		}
	},
	"marshByWall": {
		"name": "Marsh by Wall",
		"description": "The ground here beneath the south wall is wet and muddy. To the east it becomes marshland-sticky and impassable by foot.",
		"exits": {
			"s": "fallenBrickwork",
			"e": "marsh"
		},
		"shore": true
	},
	"marsh": {
		"name": "Marsh",
		"description": "This boggy marsh looks deep and forboding. Clouds of tiny bugs flitter around your head and bite at your flesh. Best not linger here too long.",
		"exits": {
			"e": "soggyPath",
			"w": "marshByWall",
			//"s": "stoneArch"
		},
		"scenery":{
			"bugs": "They are too small too really hurt you but provide a constant annoyance.",
			"clouds": "Not quite a swarm, but enough to make you want to move on.",
			"marsh": "The water is dark and you can't see the bottom."
		},
		"water": true
	},
	"soggyPath": {
		"name": "Soggy Path",
		"description": "The path here has been flooded by the ever-encroaching marshlands to the west. Steep cliff blocks your passage to the south.",
		"exits": {
			"n": "cliffPathByMarsh",
			"w": "marsh"
		},
		"scenery": {
			"cliff": "There is no way to climb it."
		},
		"water": true
	},
	"twistedRailings": {
		"name": "The Twisted Railing",
		"description": "The fence ends here in a twisted mass of barbs and rusty edges.",
		"exits": {
			"n": "verandah",
			"e": "pathThroughIronGate"
		},
		"scenery": {
			"fence" : "It's just an ordinary haunted fence. There is no way around it.",
			"barbs" : "The barbs look sharp and dangerous, best not mess with them.",
			"mass" : "The barbs look sharp and dangerous, best not mess with them."
		}
	},

	"pathThroughIronGate": {
		"name": "Path Through Iron Gate",
		"description": "The wind howls as you make your way to the entrance of the property. The old mansion looms ahead of you silhouetted against a full moon.",
		"exits": {
			"n": "frontPorch",
			"w": "twistedRailings",
			"e": "pathByRailings"
		},
		"scenery": {
			"gate": "The gate is old and rusted.",
			"mansion": "You wonder what treasures await you inside.",
			"moon": "The moon provides just enough light to make your way visible."
		},
		"onExit": function() {
			message = "And so you begin your adventure...";
			delete this.onExit;
		}
	},

	"pathByRailings": {
		"name": "Path by Railings",
		"description": "Here the path runs west towards the entrance and continues east towards the base of the front tower.",
		"exits": {
			"w": "pathThroughIronGate",
			"e": "beneathTower"
		},
		"scenery": {
			"railings": "The metal railings block your exit to the south.",
			"path": "The path is muddy and overgrown with vegetation."
		}
	},

	"beneathTower": {
		"name": "Beneath the Front Tower",
		"description": "Above you looms the dark front tower of the mansion. Who knows what horrors lurk up there.",
		"exits": {
			"w": "pathByRailings",
			"e": "debris"
		},
		"scenery": {
			"tower" : "The menacing tower rises above you into the moonlit sky."	
		}
	},

	"debris": {
		"name": "Pile of Debris",
		"description": "Here the facade of the mansion has crumbled and all that remains is a pile of broken debris.",
		"exits": {
			"w": "beneathTower",
			"e": "fallenBrickwork"
		},
		"scenery": {
			"debris": "It's just a messy pile of building materials.",
			"pile": "The pile of building materials is impassable.",
			"facade": "It must have been stunning when it was new."
		}
	},

	"fallenBrickwork": {
		"name": "Large Fallen Brickwork",
		"description": "All around lies the remnants of decayed brickwork. The ground towards the north looks marshy and dangerous.",
		"exits": {
			"n": "marshByWall",
			"w": "debris",
			"e": "stoneArch"
		},
		"scenery": {
			"brickwork" : "The nineteenth century masonry could not withstand this stormy climate."	
		}
	},
	"stoneArch": {
		"name": "Rotting Stone Arch",
		"description": "Here you pass under a decaying stone arch. To the east the path leads upwards towards a clifftop. To the north you see a murky bog.",
		"exits": {
			//"n": "marsh",
			"w": "fallenBrickwork",
			"e": "crumblingClifftop"
		},
		"scenery":{
			"arch": "In happier times the owners must have strolled here regularly.",
			"bog": "It looks impassable on foot."
		}
	},
	"crumblingClifftop": {
		"name": "Crumbling Clifftop",
		"description": "You are standing at the top of a cliff. Below you to the north you see the marshy, impassable wetlands.",
		"exits": {
			"w": "stoneArch"
		},
		"scenery": {
			"cliff" : "Your stomach begins to flutter as you peer over the edge.",
			"wetlands" : "You don't want to get caught in there without a boat."	
		}
	},
	"inTheTree": {
		"name": "In the Blasted Tree",
		"description": "From up in the tree you see a thick forest and a cliff to the south.",
		"exits": {
			"d":"blastedTree"
		},
		"onEnter": function(){
			message = `You use the rope to climb the tree.`;
		}
	}
};
