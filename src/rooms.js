// Define your rooms here

const rooms = {
	"darkCorner": {
		"name": "Dark Corner",
		"description": "The far corner of the yard is covered in dark shadow. The property continues to the south around the west side of the mansion.",
		"exits": {
			"e": "overgrownGarden",
			"s": "cornerOfHouse"
		},
		"onEnter": function() {
			if (Math.random() > .4) {
				message = "You hear an owl hooting off in the distance.";
				snd.owl.play();
				this.scenery.owl = "You can't see it in the dusk."
			} else {
				this.scenery.owl = "There is no owl here."
			}
		},
		"scenery": {
			"owl": "There is no owl here."
		}
	},
	"overgrownGarden": {
		"name": "Overgrown Garden",
		"description": "This once was a fertile garden full of vegetables and herbs. Now it has been choked and overtaken by prickly weeds.",
		"exits": {
			"w": "darkCorner",
			"e": "byWoodpile"
		},
		"scenery": {
			"weeds": "They have grown almost to waist level and are covered in sharp thorns.",
			"thorns": "They're very sharp. Best not get too close."
		}
	},
	"byWoodpile": {
		"name": "Large Wood Pile",
		"description": "A large stack of wood is haphazardly piled against the side of the mansion.",
		"exits": {
			"w": "overgrownGarden",
			"e": "yard"
		},
		"scenery": {
			"pile": "The wood is stacked about a meter high.",
			"wood": "It's damp, mossy, and probably no longer useful."
		}
	},
	"yard": {
		"name": "Yard by Rubbish",
		"description": "Despite being years since anyone lived here, the rubbish bins still emit a sour stench. The back entrance to the house lies to the south.",
		"exits": {
			"w": "byWoodpile",
			"e": "weedPatch",
			"s": "sculleryDoor"
		},
		"scenery": {
			"bins": "They are filled with rubbish. Small bones are scattered around their base.",
			"bones": "Racoons perhaps?"
		}
	},
	"weedPatch": {
		"name": "Weed Patch",
		"description": "This area doesn't look like it has ever been anything but the overgrown weed patch you see before you.",
		"exits": {
			"w": "yard",
			"e": "forest"
		},
		"scenery": {
			"weeds": "They look itchy.",
			"patch": "It would take an industrial grade mower to clear this area.",
			"weed patch": "It would take an industrial grade mower to clear this area."
		}
	},
	"forest": {
		"name": "Forest",
		"description": "This area of sparse forest grows right up to the north side of the house. Most of the trees' branches are bereft of leaves.",
		"exits": {
			"w": "weedPatch",
			"e": "thickForest"
		},
		"scenery": {
			"trees": "They are tall and barren.",
			"branches": "All the leaves are gone."
		}
	},
	"thickForest": {
		"name": "Thick Forest",
		"description": "Here your progress is slowed considerably by the dense trees in this area of the forest.",
		"exits": {
			"w": "forest",
			"e": "blastedTree",
			"s": "clearing"
		},
		"scenery": {
			"trees": "They are tall, barren, and growing very close to each other."
		}
	},
	"blastedTree": {
		"name": "Blasted Tree",
		"description": "This corner of the property is eerily dim. Looming above is an ominous tree. It's leafless branches crackle in the breeze. There is a rope tied to one of the branches.",
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
	"cornerOfHouse": {
		"name": "Corner of the House",
		"description": "The moonlight is obscured by the mansion to the east as you make your way around the back corner of the house.",
		"exits": {
			"n": "darkCorner",
			"s": "sideOfHouse"
		}
	},
	"entranceToKitchen": {
		"name": "Entrance to the Kitchen",
		"description": "The kitchen entrance must have also served as a dining area at one time. There is a table in the middle of the space and the floor is riddled with broken dishes.",
		"exits": {
			"s": "backOfHallway",
			"e": "kitchen"
		},
		"scenery":{
			"table":"The surface is scarred with knife marks and reddish brown stains, as though a large carcass was butchered here.",
			"stains":"Blood? Let's hope it's just ketchup. Unless they were preparing hotdogs, because only a monster would put ketchup on a hotdog.",
			"gore": "It has vanished leaving only the dried stains on the table.",
			"son": "The apparition has vanished.",
			"father": "The apparition has vanished.",
			"mother": "The apparition has vanished.",
			"family": "The apparitions have vanished."
		},
		"onEnter": function() {
			message = `The translucent glowing forms of a family of three stand around the table. The mother cries while the father and son stare at a pile of gore festering on the table. Moments later the vision fades away.`;
			snd.ghost.play();
			delete this.onEnter;
		}
	},
	"kitchen": {
		"name": "Kitchen and Grimy Cooker",
		"description": "A grimy iron cooker fills most of the space of the kitchen. A few pots lie scattered about but most of the cookware and cutlery has long since been looted.",
		"exits": {
			"w": "entranceToKitchen",
			"e": "sculleryDoor"
		},
		"scenery": {
			"cooker": "It is unusable. Covered in grime and rust from years of neglect.",
			"grime": "Yuck!",
			"muck": "Gross!"
		}
	},
	"sculleryDoor": {
		"name": "Scullery Door",
		"description": "A dented old washbasin is all that remains here in the scullery. To the north an exit leads to the backyard.",
		"exits": {
			"n": "yard",
			"w": "kitchen"
		},
		"scenery": {
			"washbasin": "You doubt it can still hold water."
		}
	},
	"mustyRoom": {
		"name": "Musty Room",
		"description": "There is a nasty swarm of bats attacking you! Their fluttering wings stir up a putrid, musty stench.",
		"exits": {
			"e": "rearTurretRoom",
			"d": "spiralStaircase"
		},
		"batsKilled": function(){
			this.description = "This quiet corner room is filled with the musty stench of rabid, wild animals. The floor is covered with bat carcasses."
		}
	},
	"rearTurretRoom": {
		"name": "Rear Turret Room",
		"description": "This round chamber's slim windows look out on to the dense forest to the north of the mansion. There is a strange bench in the middle of the room.",
		"exits": {
			"w": "mustyRoom"
		},
		"scenery": {
			"bench": `Upon closer inspection, you realize that this is "bench" is actually a torture device complete with locks and chains.`,
			"device": `It's what they called "The Rack" back in the dark ages.`,
			"locks": "They hold a victim's arms and legs in place.",
			"chains": "Heavy enough to bruise and cut flesh.",
			"form": "It has vanished.",
			"forms": "They have vanished. All that remains is the bench.",
			"ghosts": "They have vanished. All that remains is the bench.",
			"man": "He looked older and had a roughly cut beard. But he's gone now.",
			"child": "It was a young boy from what you could tell. But he's gone now.",
			"windows": "They overlook the forest below.",
			"window": "The windows overlook the forest below."
		},
		"onEnter": function() {
			message = `You see the ghostly form of a screaming child chained to the bench! A man holds a scroll and is reciting demonic incantations to the child. As the screams crescendo, both forms dissipate to nothingness.`;
			snd.ghost.play();
			delete this.onEnter;
		}
	},
	"clearing": {
		"name": "Clearing by House",
		"description": "Next to house, the forest edge opens up into a large clearing.",
		"exits": {
			"n": "thickForest",
			"e": "path"
		}
	},
	"path": {
		"name": "Path",
		"description": "A path leads south along the clifftop but it is blocked by an overgrown thicket. In the distance to the north you see the forboding outline of a large blasted tree.",
		"exits": {
			"n": "blastedTree",
			"s": "clifftop",
			"w": "clearing"
		},
		"scenery": {
			"tree": "If you head north you can get a closer look.",
			"path": "It's composed of loose gravel. Watch your step as you traverse along the edge of the cliff.",
			"clifftop": "You are just high enough to cause some serious injury should you fall."
		},
		"clearThicket": function() {
			//this.exits.s = "clifftop";
			this.description = "A path leads south along the clifftop but it is hindered by an overgrown thicket. Having surveyed the area, you are confident that you can navigate it. In the distance to the north you see the forboding outline of a large blasted tree."
		}
	},
	"sideOfHouse": {
		"name": "Side of House",
		"description": "As you make your way down the side of the house, you notice a message hastily scrawled on the siding here.",
		"exits": {
			"n": "cornerOfHouse",
			"s": "crumblingWall"
		},
		"scenery": {
			"siding": "There's a message scrawled on it.",
			"scrawl": "It's a message of some sort."
		}
	},
	"backOfHallway": {
		"name": "Back Hallway",
		"description": "The hallway appears to be coming to an end here. There is a portrait hanging on the wall. The cased opening to the north leads to the kitchen.",
		"exits": {
			"n": "entranceToKitchen",
			"s": "gloomyPassage"
		},
		"scenery": {
			"portrait": "The tapestry depicts an elderly woman in a black dress. She stands aside an old tree.",
			"picture": "The tapestry depicts an elderly woman in a black dress. She stands aside an old tree.",
			"tapestry": "It depicts an elderly woman in a black dress. She stands aside an old tree.",
			"woman": "I think her eyes just moved!",
			"eyes": "They seem to follow you around the room.",
			"tree": "The tree is barren and looks like there is a rope tied to one of the branches.",
			"rope": "Maybe it's just a vine? The artist was not that keen on details.",
			"dress": "It's a lacy number like they used to wear in the nineteenth century.",
			"vine": "No, maybe it's a rope after all?"
		}
	},
	"darkAlcove": {
		"name": "Dark Alcove",
		"description": "<em>You candle's light is just enough</em> to make out the darkened alcove here at the end of the hallway. There is another shadowy room to the east.",
		"exits": {
			"s": "poolOfLight",
			"e": "smallDarkRoom"
		},
		"darkness" : true
	},
	"smallDarkRoom": {
		"name": "Small Dark Room",
		"description": "<em>Using your candle</em>, you see that shelves line the walls of this tiny utility room. A stairway leads up to the upper rooms at the back of the house.",
		"exits": {
			"w": "darkAlcove",
			"u": "spiralStaircase"
		},
		"darkness" : true,
		"scenery": {
			"shelves": "A one time they were filled with tools. Now it's mostly empty jars and a few nails and bolts.",
			"nails": "They are small, rusty and not very useful.",
			"bolts": "They are small, rusty and not very useful.",
			"jars": "Probably for organizing loose items.",
			"wall": "They are mostly covered with shelves."
		}
	},
	"spiralStaircase": {
		"name": "Spiral Staircase",
		"description": "A round skylight illuminates this spiral staircase as it winds its way up to the mansion's rear turret room.",
		"exits": {
			"u": "mustyRoom",
			"d": "smallDarkRoom"
		},
		"scenery": {
			"skylight": "It floods the stairwell with moonlight.",
			"moonlight": "It's kinda like sunlight, but more moonish.",
			"stairs": "Like any spiral staircase, the steps near the center can be pretty treacherous."
		}
	},
	"widePassage": {
		"name": "Wide Passage",
		"description": "The corridor widens into large passage. There is enough light here to see without the aid of your candle. Downwards from here are the cellar stairs.",
		"exits": {
			"s": "trophyRoom",
			"d": "slipperySteps"
		}
	},
	"slipperySteps": {
		"name": "Slippery Steps",
		"description": "These damp and slippery wooden stairs lead down to the mansion's cellar. The bottom half of the staircase has crumbled and rotted away making your further decent impossible. As you peer downwards, you can see a window in the room below. Another way in?",
		"exits": {
			"u": "widePassage",
			//"d": "cellar"
		},
		"scenery": {
			"window": "It's barred, but from this angle you can see that the bars could easily be dug out from the other side with the right tool.",
			"bars": "They block the window and are embedded in the decaying brickwork of the foundation.",
			"brickwork": "The foundation is mostly solid, but here it looks particularly decayed.",
			"foundation": "The foundation is mostly solid, but here it looks particularly decayed."
		},
		"digWindow": function() {
			this.scenery.window = "The bars are gone and it looks like you could pass through from the other side.";
			this.scenery.bars = "You've dug them out.";
		}
	},
	"clifftop": {
		"name": "Clifftop",
		"description": "Here the path continues along the edge of a steep cliff.",
		"exits": {
			"n": "path",
			"s": "cliffPathByWindow"
		},
		"scenery": {
			"cliff": "This is the highest point of the cliff. A fall will surely result in your demise."
		}
	},
	"crumblingWall": {
		"name": "Crumbling Wall",
		"description": "Here further progress is blocked by a crumbling wall.",
		"exits": {
			"n": "sideOfHouse"
		},
		"scenery":{
			"wall": "You dare not approach it for fear of being hit by a falling piece of masonry."
		}
	},
	"gloomyPassage": {
		"name": "Gloomy Passage",
		"description": "This long, gloomy section of hallway continues north and south.",
		"exits": {
			"n": "backOfHallway",
			"s": "frontHall"
		}
	},
	"poolOfLight": {
		"name": "Pool of Light",
		"description": "What little light fills the rooms of the mansion ends here. The ways to the north and east are masked in darkness.",
		"exits": {
			"n": "darkAlcove",
			"e": "vaultedHall",
			"s": "sittingRoom"
		},
		"scenery": {
			"darkness": "It can be none blacker."
		}
	},
	"vaultedHall": {
		"name": "Impressive Vaulted Hallway",
		"description": "This magnificent hallway boasts an impressive vaulted ceiling. <em>Your candle lights the way.</em>",
		"exits": {
			"w": "poolOfLight",
			"e": "hallWithLockedDoor"	
		},
		"darkness" : true,
		"scenery": {
			"ceiling": "Such craftsmanship is unheard of these days."
		}
	},
	"hallWithLockedDoor": {
		"name": "Hall by Thick Wooden Door",
		"description": "The vaulted hall ends here with an archway to the east and a large, locked door to the south. <em>Your candle is illuminating the room.</em>",
		"exits": {
			"w": "vaultedHall",
			"e": "trophyRoom"
		},
		"darkness": true,
		"doorUnlocked": function() {
			this.description = `The vaulted hall ends here with an archway to the east and a thick wooden door to the south behind which a staircase is leading up. <em>Your candle is illuminating the room.</em>`;
			this.exits.u = "steepMarbleStairs";
		}
	},
	"trophyRoom": {
		"name": "Trophy Room",
		"description": "<em>You hold your candle out in front of you.</em> What little light it provides illuminates various hunting trophies adorning the walls.",
		"exits": {
			"n": "widePassage",
			"s": "diningRoom",
			"w": "hallWithLockedDoor"
		},
		"darkness" : true,
		"scenery": {
			"walls": "They are adorned with trophies.",
			"trophies": "The mounted heads of a deer, a lioness and... a squirrel?",
			"trophy": "The mounted heads of a deer, a lioness and... a squirrel?",
			"deer": "A buck with a magnificent set of antlers.",
			"antlers": "A twelve pointer!",
			"lion": "Its mouth is frozen in a menacing snarl.",
			"lioness": "It's mouth is frozen in a menacing snarl.",
			"squirrel": "A terrifying beast if ever there was one."
		}
	},
	"cellar": {
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
		},
		"digWindow": function() {
			this.exits.e = "cliffPathByWindow";
			this.name = "Cellar with Hole in the Wall";
			this.description = "The air in this cellar is damp with moisture. To the east, what once was a barred window is now a hole large enough to pass through.",
			this.scenery.window = "The window is no longer blocked. You can squeeze through it to the east.",
			this.scenery.bars = "The bars have been dug out allowing passage to the east."
		}
	},
	"cliffPathByWindow": {
		"name": "Cliff Path by Window",
		"description": "The cliff path runs north and south here. To the west you see a barred window that looks into the mansion's cellar. To the east, a precipitous cliff.",
		"exits": {
			"n": "clifftop",
			"s": "cliffPath"
		},
		"scenery": {
			"window": "It's large enough to squeeze through. You can see the cellar on the other side.",
			"bars": "They block your way through the window.",
			"cliff": "It drops into nothingness.",
			"cellar": "Peering through the window you can see that there are more rooms to explore down there."
		},
		"digWindow": function() {
			this.exits.w = "cellar";
			this.name = "Cliff Path by Opened Window";
			this.description = "The cliff path runs north and south here. To the west you see a window with its bars dug out. It leads to the mansion's cellar.";
			this.scenery.window = "The bars have been dug out and it's large enough to squeeze through. You can see the cellar on the other side.",
			this.scenery.bars = "You've dug them out, clearing your passage to the west."
		}
	},
	"cupboard": {
		"name": "Cupboard With Hanging Coats",
		"description": "This tiny side room off of the main closet is where old garments are stored.",
		"exits": {
			"s": "closet"
		}
	},
	"frontHall": {
		"name": "Front Hall",
		"description": "The entranceway ends here. To the north is a long hallway leading towards the back of the house. To the east are the main rooms of the mansion",
		"exits": {
			"n": "gloomyPassage",
			"e": "sittingRoom",
			"s": "frontLobby"
		},
		"scenery": {
			"door": "It's sealed shut with no perceivable means of opening it."
		}
	},
	"sittingRoom": {
		"name": "Sitting Room",
		"description": "A tattered sofa and a couple of rickety chairs are arranged in the center of this sitting room.",
		"exits": {
			"n": "poolOfLight",
			"w": "frontHall",
			"s": "library"
		},
		"scenery": {
			"chairs": "I think these hard wooden chairs were far from the most uncomfortable thing during the conversations held here.",
			"chair": "I think the hard wooden chair was far from the most uncomfortable thing during the conversations held here.",
			"sofa": "The stuffing is bursting through the seams.",
			"stuffing": "You think it's horse hair.",
			"apparition": "It has vanished into thin air!"
		},
		"onEnter": function(){
			message = `A ghostly apparition drifts by you muttering what sounds like, "The boy must hang! The boy must hang!" It fades away as quickly as it appeared.`;
			snd.ghost.play();
			delete this.onEnter;
		}
	},
	"secretRoom": {
		"name": "Secret Room",
		"description": "Except for fragments of the false wall that are scattered about the floor, this secret room is rather sparse. They certainly went through great lengths to keep whatever is here hidden.",
		"exits": {
			"s": "study"
		},
		"scenery": {
			"fragments": "Bits of plaster and wood."
		}
	},
	"steepMarbleStairs": {
		"name": "Steep Marble Stairs",
		"description": "These marble stairs lead up towards the more private areas of the house.",
		"exits": {
			"u": "cobwebbyRoom",
			"d": "hallWithLockedDoor",
		},
		"scenery": {
			"stairs": "The marble surface is quite slippery. Be careful!"
		}
	},
	"diningRoom": {
		"name": "Dining Room",
		"description": "From out of the darkness you enter a room in which a large dining table fills the space. It is surrounded by a matching accoutrement of chairs. In the center of the table are the skeletal remains of some poor creature.",
		"exits": {
			"n": "trophyRoom"
		},
		"scenery": {
			"table": "Inscribed below the remains is the circled pentagram of satan.",
			"pentagram": "The symbol of evil. Horrible rites must have taken place here.",
			"chairs": "They seat six. An appropriate number.",
			"creature": "It's a set of long decomposed skeletal remains."
		}
	},
	"deepCellar": {
		"name": "Deep Cellar with Coffin",
		"description": "This is the deepest, darkest corner of the cellar. There is enough light to make out s decrepit coffin resting in the center of the room upon a stone pedestal.",
		"exits": {
			"n": "cellar"
		},
		"scenery": {
			"pedestal": "It's made of stone. There once was writing on it but text has been chiseled off.",
			"ghosts": "They are no longer here.",
			"ghost": "It has vanished.",
			"child": "You recall it the twisted look of hatred on its face.",
			"body": "It appeared to be a older, bearded man.",
			"specter": "It appeared to be a older, bearded man.",
			"neck": "Blood oozed from it as the blade penetrated."
		},
		"onEnter": function() {
			message = `Horrors! You see two ghostly forms. A child is violently stabbing another specter in the neck then dragging the body away! Moments later, the apparitions vanish.`;
			snd.laugh.play();
			delete this.onEnter;
		}
	},
	"cliffPath": {
		"name": "Cliff Path",
		"description": "To the south, the path decends towards a marsh. North leads up the clifftop towards the back of the mansion.",
		"exits": {
			"n": "cliffPathByWindow",
			"s": "cliffPathByMarsh"
		}
	},
	"closet": {
		"name": "Closet",
		"description": "The front closet is large and mostly empty. You notice a small opening to the north that leads to the cupboard.",
		"exits": {
			"n": "cupboard",
			"e": "frontLobby"
		},
		"scenery": {
			"opening": "I think you can squeeze through."
		}
	},
	"frontLobby": {
		"name": "Front Lobby",
		"description": "The entrance to the old mansion is cold and your footsteps echo off the marbled floor. The door through which you entered is sealed shut.",
		"exits": {
			"n": "frontHall",
			"w": "closet"
		},
		"onEnter": function() {
			if (flags.frontDoorOpen) {
				message = `With a tremendous "BANG!" the door slams shut behind you.`;
				snd.door.play();
				flags.frontDoorOpen = false;
				delete rooms["frontPorch"].exits.n;
			}
		},
		"scenery": {
			"door": "No matter how much you try, it won't open. You'll need to find another way out.",
			"floor": "The floor is in surprisingly good shape considering its age."
		}
	},
	"library": {
		"name": "Library of Evil Books",
		"description": "Shelves of musty books fill this room. A brief glance shows that topics range from witchcraft to demonic possession.",
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
		"description": "This is where mansion's owner spent hours sitting at one of the many desks researching the dark arts. In addition to the desks you notice a small hole in the wall.",
		"scenery": {
			"wall" : "It seems brittle. You may be able to chop your way through.",
			"hole" : "There's something beyond..."	
		},
		"wallBreak": function() {
			this.exits.n = "secretRoom";
			this.name = "Study with Secret Room";
			this.description = "This must be where mansion's owner spent hours sitting at a one of the many desks researching the dark arts. In addition to the desks, to the north there is a passage leading to a secret room.";
			this.scenery.hole = "The hole is much bigger now.";
			this.scenery.wall = "The wall is no more. A secret room lies to the north.";
			this.scenery.passage ="It leads north to a secret room.";
		}
	},
	"cobwebbyRoom": {
		"name": "Weird Cobwebby Room",
		"description": "The angles of this room seem off kilter. The design may not be to your liking but the spiders seem to enjoy it. As such, the room is filled with cobwebs.",
		"exits": {
			"d": "steepMarbleStairs",
			"e": "coldChamber",
			"s": "upperGallery"
		},
		"scenery": {
			"cobwebs": "They stretch from ceiling to floor and brush against your face as you move through the room.",
			"webs": "They stretch from ceiling to floor and brush against your face as you move through the room.",
			"angles": "The architect must have had a sense of humor.",
			"angle": "Trigonometry was never your best subject.",
			"spiders": "If you leave them alone they won't bother you."
		}
	},
	"coldChamber": {
		"name": "Very Cold Chamber",
		"description": "The air in this room is bitingly cold. An icy frost covers the walls. A translucent, glowing barrier blocks your exit to the east.",
		"exits": {
			"w": "cobwebbyRoom",
			"e": "spookyRoom"
		},
		"scenery": {
			"frost": "Ice? There are unnatural forces at work.",
			"walls": "The walls are stone and are coated in a thin sheen of frost."
		},
		"dispelBarrier": function() {
			this.description = "The air in this room is bitingly cold. An icy frost covers the walls. The exit to the east is now clear.";
		},
		"createBarrier": function() {
			this.description = "The air in this room is bitingly cold. An icy frost covers the walls. A translucent, glowing barrier blocks your exit to the east.";
		}
	},
	"spookyRoom": {
		"name": "Spooky Room",
		"description": "The walls of this room are covered in cryptic drawings. As you look down you see that floor is littered with burnt remnants of clothing. A chill wafts through the doorway to the west. ",
		"exits": {
			"w": "coldChamber"
		},
		"scenery": {
			"floor": "It's covered in pieces of what appears to be burnt clothing",
			"wall": "Drawings fill the bottom half of the walls.",
			"walls": "Drawings fill the bottom half of the walls.",
			"drawings": "They are child-like representations of tiny figures, each surrounded by menacing dark shapes.",
			"shapes": "They are monstrous shadows with tentacles and teeth.",
			"clothing": "Barely recognizable, but it's clear that these garments were made for a child."
		},
		"onEnter": function() {
			snd.laugh.play();
			delete this.onEnter;
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
			"carvings": "The carvings depict various sinister creatures.",
			"creatures": "Evil wolves, evil spiders, evil bats, and evil squirrels."
		}
	},
	"frontTower": {
		"name": "Front Tower",
		"description": "This tower overlooks the front of the property. The windows have been barred and nailed shut.",
		"exits": {
			"e": "slopingCorridor"
		},
		"scenery": {
			"windows": "It was rumored they heiress plunged to her death from here.",
			"window": "It was rumored they heiress plunged to her death from here.",
			"bars": "They look like they were meant to keep things in.",
			"nails": "Bars AND nails. They needed to be sure no one was getting out.",
			"woman": "It was just an apparition.",
			"form": "It was just an apparition.",
			"specter": "You must be seeing things."
		},
		"onEnter": function() {
			message = `As you enter you see the spectral form of a woman throwing herself out the window. She lets out a blood curdling scream as she falls to her doom.`;
			snd.falling.play();
			delete this.onEnter;
		}
	},
	"slopingCorridor": {
		"name": "Sloping Corridor",
		"description": "This corridor slopes upwards on its way towards the front tower.",
		"exits": {
			"w": "frontTower",
			"e": "upperGallery"
		}
	},
	"upperGallery": {
		"name": "Upper Gallery",
		"description": "The upper gallery is filled with artifacts from many travels abroad. You shudder with fear as flurry of ghosts encircles you, blocking your movement to the west.",
		"exits": {
			"n": "cobwebbyRoom",
			"w": "slopingCorridor"
		},
		"scenery": {
			"artifacts": "Odd items from around the globe but nothing of any particular value."
		},
		"ghostsDispelled": function() {
			this.description = "The upper gallery is filled with artifacts from many travels abroad. The relative calm of this room is unsettling.";
		},
		"onEnter": function() {
			snd.ghost.play();
			delete this.onEnter;
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
			"marsh": "The water is dark and you can't see the bottom.",
			"muck": "It's sticky and brown but you could probably manage to wade in it for a few minutes."
		},
		"water": true,
		"onEnter": function() {
			if (flags.endGame) {
				objects["statue"].droppedInMarsh();
				message = "All of the sudden there is loud ZAP! Beams of energy shoot out of the ebony statue causing you to drop it overboard!";
				flags.sinkingStatue++;
				snd.shock.play();
			}
		}
	},
	"soggyPath": {
		"name": "Soggy Path",
		"description": "The path here has been flooded by the ever-encroaching marshlands to the west. A steep cliff blocks your passage to the south.",
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
		"description": "The wind howls as you make your way to the entrance of the property. To the north the old mansion looms, silhouetted against a full moon.",
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
		},
		"endingTrigger": function() {
			this.exits.s = "exit";
			this.description = `The old mansion looms ahead of you silhouetted against a full moon. Now's your chance to make your escape through the gate to the south!`;
			this.scenery.gate = `Hurry, head south to win the game!`;
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
		"description": "Above you looms the front tower of the mansion. Who knows what horrors lurk in there.",
		"exits": {
			"w": "pathByRailings",
			"e": "debris"
		},
		"scenery": {
			"tower" : "The menacing tower rises above you against the moonlit sky."	
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
			"brickwork" : "The nineteenth century masonry could not withstand this stormy climate.",
			"bricks" : "The nineteenth century masonry could not withstand this stormy climate.",
			"ground": "The ground starts to become muddy and wet to the north."
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
		"description": "You are standing at the edge of a crumbling cliff. Below you to the north you see the marshy, impassable wetlands. To the east the cliff drops off into darkness.",
		"exits": {
			"w": "stoneArch"
		},
		"scenery": {
			"cliff" : "Your stomach begins to flutter as you peer over the edge.",
			"wetlands" : "You don't want to get caught in there without a boat.",
			"child": "The vision is no longer visible.",
			"ghost": "The vision is no longer visible.",
			"dog": "The vision is no longer visible."
		},
		"onEnter": function() {
			message = `For a split second you see a ghostly vision of a small child chasing a dog around the clifftop. In a flash the scene disappears.`;
			snd.dog.play();
			delete this.onEnter;
		}
	},
	"inTheTree": {
		"name": "In the Blasted Tree",
		"description": "From up in the tree you see a dense forest west. To the southwest looms the mansion in all its sinister glory. Directly south you see a path which appears to be blocked by a thicket.",
		"exits": {
			"d":"blastedTree"
		},
		"onEnter": function(){
			message = `You use the rope to climb the tree.`;
		},
		"scenery": {
			"rope": "From up here you can see what appear to be fingernails wedged in the fibers of the rope.",
			"fingernails": "Someone was desperately trying to untie this.",
			"nails": "Someone was desperately trying to untie this.",
			"fibers": "It's made of a very strong material.",
			"forest": "Despite the barren branches, you can't see very far beyond the trees.",
			"mansion": "It's the largest feature in view and yet it is hard to make out any details. It is as though the structure is veiled in an unnatural darkness.",
			"path": "It leads south into a dense thicket.",
			"tree": "The knotty surface gives the tree almost face-like features.",
			"surface": "The bark is cracked and rough."
		}
	},
	"exit": {
		"name": "The Winner's Circle"
	},
	"finalRoom": {
		"name": "Path Through Iron Gate",
		"description": `As you reach the iron gate a rotting ghoul hobbles onto the path! It is blocking all exits except your escape route to the south.`,
		"exits": {
			"s": "exit"
		},
		"scenery": {
			"ooze": "It's thick and black.",
			"maggots": "The tiny white creatures writhe and squirm.",
			"worms": "The worms crawl in and out of every hole on the ghoul's rotting body.",
			"mouth": "The ooze dribbles out over sharp, tiny teeth.",
			"teeth": "Don't let it bite you!"
		},
		"onEnter": function() {
			snd.groan.play();
		}
	}
};
