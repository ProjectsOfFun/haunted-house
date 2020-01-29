/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Define the world's objects here.
var objects = {
  "aerosol": {
    "name": "a can of spray paint",
    "description": "The can reads, \"Simply the best paint for all your vandalism needs. Warning: do not spray on small animals.\"",
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
    "batsKilled": function batsKilled() {
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
    "location": "cliffPathByMarsh"
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
    "openAction": function openAction() {
      this.description = "It's a child-sized pine box with tarnished brass hinges. The coffin's lid is open, revealing its velvety, padded interior... but no body!";
      this.isOpen = true;
    },
    "closeAction": function closeAction() {
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
    "description": "They crunch under your feet.",
    "takeMessage": "You might cut yourself."
  },
  "door": {
    "location": "hallWithLockedDoor",
    "description": "It's made of a thick, unbreakable wood.",
    "locked": true,
    "key": "key",
    "unlockMessage": "You slowly turn the key and unlock the door!",
    "unlockAction": function unlockAction() {
      this.description = "It's made of a thick, unbreakable wood. It's open.";
      this.isOpen = true;
    },
    "isOpen": false,
    "closeAction": function closeAction() {
      this.description = "It's made of a thick, unbreakable wood. It's closed.";
      this.isOpen = false;
    },
    "openAction": function openAction() {
      this.description = "It's made of a thick, unbreakable wood. It's open.";
      this.isOpen = true;
    }
  },
  "drawer": {
    "location": "study",
    "description": "It's a small side drawer. It's closed.",
    "isOpen": false,
    "openMessage": "You slide the drawer open.",
    "openAction": function openAction() {
      this.description = "The small side drawer is open.";
      this.isOpen = true;
    },
    "closeMessage": "You slide the drawer closed.",
    "closeAction": function closeAction() {
      this.description = "It's a small side drawer. It's closed.";
      this.isOpen = false;
    }
  },
  "egg": {
    "name": "a jewel encrusted egg",
    "description": "It's a finely crafted jeweled egg. You get the feeling that you've seen it before.",
    "location": null,
    //"inTheTree",
    "portable": true //"score": 1

  },
  "ghost": {
    "synonym": "ghosts"
  },
  "ghosts": {
    "description": "The ghosts whirl about the room like so many clouds of dust!",
    "location": "upperGallery",
    "takeMessage": "You try to grab the ghosts, but your hands pass through their ephemeral bodies.",
    "listenMessage": "The ghosts howls and cry as they zing around the room."
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
    "readableText": "The text reads: Say this word with care, \"Xzanfar.\"",
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
    "readableText": "It says, \"Seek the word to dispell the barrier.\""
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
    "takeMessage": "As you grasp the ring, a devilish voice in your head whispers, \"I am yours, wear me, wear me...\""
  },
  "rope": {
    "name": "a rope tied to a tree",
    "description": "It's a length of rope tied to a branch of the tree. You can just reach it.",
    "location": "blastedTree",
    "portable": false,
    "takeMessage": "You can't undo the knot. Besides, it's probably tied there for a (not-so-good) reason.",
    "removeFromTree": function removeFromTree() {
      this.name = "a length of rope";
      this.description = "It's a normal length of rope.";
    },
    "tieToTree": function tieToTree() {
      this.name = "a rope tied to a tree";
      this.description = "It's a normal length of rope and it's currently tied to an upper branch of the tree.";
    }
  },
  "rubbish": {
    "location": "yard",
    "description": "The garbage has decomposed into a heap of goo. That's very disgusting!",
    "takeMessage": "I know you miss your youthful days of dumpster diving, but let's not mess with the rubbish heap.",
    "smellMessage": "The rubbish smells as if it were the first day of spring and it just so happens that the World Vomit Championship was being held on that day."
  },
  "scroll": {
    "name": "a scroll",
    "location": "rearTurretRoom",
    "portable": true,
    "readable": true,
    "description": "It is decorated with gold leaf and medieval illustrations. The text is written is in an alien tongue.",
    "readableText": "It reads, \"Klatu Borata Nickto.\"",
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
    "takeMessage": "As you pick up the statue you feel a prickle of dark energy race through your fingertips.",
    "droppedInMarsh": function droppedInMarsh() {
      this.location = "marsh", this.name = "a sinking ebony statue", this.description = "Oh no! The statue is slowly sinking in the bog!", this.takeMessage = "With a loud \"schloop!\" pull the statue out of the bog. It no longer emits energy.";
    },
    "takenFromMarsh": function takenFromMarsh() {
      this.location = "player", this.name = "an ebony statue", this.description = "It looks African in origin and is most likely very valuable.";
    }
  },
  "thicket": {
    "location": "path",
    "description": "It's a maze of densely packed vegetation.",
    "smellMessage": "It smells shrubby."
  },
  "tome": {
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
    "insertBatteries": function insertBatteries() {
      this.description = "It's a tiny, battery-powered vacuum cleaner. Perfect for capturing dust and much more! It is fully powered and ready to <em>use</em>.";
      this.name = "a fully powered vacuum";
    },
    "captureGhosts": function captureGhosts() {
      this.name = "a tiny vacuum filled with ghosts";
      this.description = "It's a tiny, battery-powered vacuum cleaner. It's filled with ghosts!";
    }
  },
  "vase": {
    "name": "a vase in the muck",
    "description": "It's mostly submerged in the muck, but it looks like a valuable antique.",
    "location": null,
    //"marsh",
    "portable": true,
    //"score": 1,
    "takeMessage": "With a loud \"schloop!\" pull the vase out of the bog.",
    "takeVase": function takeVase() {
      this.name = "an antique Chinese vase";
      this.description = "The vase is Chinese in orgin. It is covered with images of spirits amoungst warriors.";
    }
  },
  "xzanfar": {}
}; // Define your rooms here

var rooms = {
  "darkCorner": {
    "name": "Dark Corner",
    "description": "The far corner of the yard is covered in dark shadow. The property continues to the south around the west side of the mansion.",
    "exits": {
      "e": "overgrownGarden",
      "s": "cornerOfHouse"
    },
    "onEnter": function onEnter() {
      if (Math.random() > .4) {
        message = "You hear an owl hooting off in the distance.";
        snd.owl.play();
        this.scenery.owl = "You can't see it in the dusk.";
      } else {
        this.scenery.owl = "There is no owl here.";
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
    "onEnter": function onEnter() {
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
    "scenery": {
      "table": "The surface is scarred with knife marks and reddish brown stains, as though a large carcass was butchered here.",
      "stains": "Blood? Let's hope it's just ketchup. Unless they were preparing hotdogs, because only a monster would put ketchup on a hotdog.",
      "gore": "It has vanished leaving only the dried stains on the table.",
      "son": "The apparition has vanished.",
      "father": "The apparition has vanished.",
      "mother": "The apparition has vanished.",
      "family": "The apparitions have vanished."
    },
    "onEnter": function onEnter() {
      message = "The translucent glowing forms of a family of three stand around the table. The mother cries while the father and son stare at a pile of gore festering on the table. Moments later the vision fades away.";
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
    "batsKilled": function batsKilled() {
      this.description = "This quiet corner room is filled with the musty stench of rabid, wild animals. The floor is covered with bat carcasses.";
    }
  },
  "rearTurretRoom": {
    "name": "Rear Turret Room",
    "description": "This round chamber's slim windows look out on to the dense forest to the north of the mansion. There is a strange bench in the middle of the room.",
    "exits": {
      "w": "mustyRoom"
    },
    "scenery": {
      "bench": "Upon closer inspection, you realize that this is \"bench\" is actually a torture device complete with locks and chains.",
      "device": "It's what they called \"The Rack\" back in the dark ages.",
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
    "onEnter": function onEnter() {
      message = "You see the ghostly form of a screaming child chained to the bench! A man holds a scroll and is reciting demonic incantations to the child. As the screams crescendo, both forms dissipate to nothingness.";
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
    "clearThicket": function clearThicket() {
      //this.exits.s = "clifftop";
      this.description = "A path leads south along the clifftop but it is hindered by an overgrown thicket. Having surveyed the area, you are confident that you can navigate it. In the distance to the north you see the forboding outline of a large blasted tree.";
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
    "darkness": true
  },
  "smallDarkRoom": {
    "name": "Small Dark Room",
    "description": "<em>Using your candle</em>, you see that shelves line the walls of this tiny utility room. A stairway leads up to the upper rooms at the back of the house.",
    "exits": {
      "w": "darkAlcove",
      "u": "spiralStaircase"
    },
    "darkness": true,
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
      "u": "widePassage" //"d": "cellar"

    },
    "scenery": {
      "window": "It's barred, but from this angle you can see that the bars could easily be dug out from the other side with the right tool.",
      "bars": "They block the window and are embedded in the decaying brickwork of the foundation.",
      "brickwork": "The foundation is mostly solid, but here it looks particularly decayed.",
      "foundation": "The foundation is mostly solid, but here it looks particularly decayed."
    },
    "digWindow": function digWindow() {
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
    "scenery": {
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
    "darkness": true,
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
    "doorUnlocked": function doorUnlocked() {
      this.description = "The vaulted hall ends here with an archway to the east and a thick wooden door to the south behind which a staircase is leading up. <em>Your candle is illuminating the room.</em>";
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
    "darkness": true,
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
    "digWindow": function digWindow() {
      this.exits.e = "cliffPathByWindow";
      this.name = "Cellar with Hole in the Wall";
      this.description = "The air in this cellar is damp with moisture. To the east, what once was a barred window is now a hole large enough to pass through.", this.scenery.window = "The window is no longer blocked. You can squeeze through it to the east.", this.scenery.bars = "The bars have been dug out allowing passage to the east.";
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
    "digWindow": function digWindow() {
      this.exits.w = "cellar";
      this.name = "Cliff Path by Opened Window";
      this.description = "The cliff path runs north and south here. To the west you see a window with its bars dug out. It leads to the mansion's cellar.";
      this.scenery.window = "The bars have been dug out and it's large enough to squeeze through. You can see the cellar on the other side.", this.scenery.bars = "You've dug them out, clearing your passage to the west.";
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
    "onEnter": function onEnter() {
      message = "A ghostly apparition drifts by you muttering what sounds like, \"The boy must hang! The boy must hang!\" It fades away as quickly as it appeared.";
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
      "d": "hallWithLockedDoor"
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
    "onEnter": function onEnter() {
      message = "Horrors! You see two ghostly forms. A child is violently stabbing another specter in the neck then dragging the body away! Moments later, the apparitions vanish.";
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
    "onEnter": function onEnter() {
      if (flags.frontDoorOpen) {
        message = "With a tremendous \"BANG!\" the door slams shut behind you.";
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
      "wall": "It seems brittle. You may be able to chop your way through.",
      "hole": "There's something beyond..."
    },
    "wallBreak": function wallBreak() {
      this.exits.n = "secretRoom";
      this.name = "Study with Secret Room";
      this.description = "This must be where mansion's owner spent hours sitting at a one of the many desks researching the dark arts. In addition to the desks, to the north there is a passage leading to a secret room.";
      this.scenery.hole = "The hole is much bigger now.";
      this.scenery.wall = "The wall is no more. A secret room lies to the north.";
      this.scenery.passage = "It leads north to a secret room.";
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
    "dispelBarrier": function dispelBarrier() {
      this.description = "The air in this room is bitingly cold. An icy frost covers the walls. The exit to the east is now clear.";
    },
    "createBarrier": function createBarrier() {
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
    "onEnter": function onEnter() {
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
      "rubble": "The rubble is comprised of various bits and pieces that have fallen from the structure of the house."
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
    "onEnter": function onEnter() {
      message = "As you enter you see the spectral form of a woman throwing herself out the window. She lets out a blood curdling scream as she falls to her doom.";
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
    "ghostsDispelled": function ghostsDispelled() {
      this.description = "The upper gallery is filled with artifacts from many travels abroad. The relative calm of this room is unsettling.";
    },
    "onEnter": function onEnter() {
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
      "w": "marshByWall" //"s": "stoneArch"

    },
    "scenery": {
      "bugs": "They are too small too really hurt you but provide a constant annoyance.",
      "clouds": "Not quite a swarm, but enough to make you want to move on.",
      "marsh": "The water is dark and you can't see the bottom.",
      "muck": "It's sticky and brown but you could probably manage to wade in it for a few minutes."
    },
    "water": true,
    "onEnter": function onEnter() {
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
      "fence": "It's just an ordinary haunted fence. There is no way around it.",
      "barbs": "The barbs look sharp and dangerous, best not mess with them.",
      "mass": "The barbs look sharp and dangerous, best not mess with them."
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
    "onExit": function onExit() {
      message = "And so you begin your adventure...";
      delete this.onExit;
    },
    "endingTrigger": function endingTrigger() {
      this.exits.s = "exit";
      this.description = "The old mansion looms ahead of you silhouetted against a full moon. Now's your chance to make your escape through the gate to the south!";
      this.scenery.gate = "Hurry, head south to win the game!";
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
      "tower": "The menacing tower rises above you against the moonlit sky."
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
      "brickwork": "The nineteenth century masonry could not withstand this stormy climate.",
      "bricks": "The nineteenth century masonry could not withstand this stormy climate.",
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
    "scenery": {
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
      "cliff": "Your stomach begins to flutter as you peer over the edge.",
      "wetlands": "You don't want to get caught in there without a boat.",
      "child": "The vision is no longer visible.",
      "ghost": "The vision is no longer visible.",
      "dog": "The vision is no longer visible."
    },
    "onEnter": function onEnter() {
      message = "For a split second you see a ghostly vision of a small child chasing a dog around the clifftop. In a flash the scene disappears.";
      snd.dog.play();
      delete this.onEnter;
    }
  },
  "inTheTree": {
    "name": "In the Blasted Tree",
    "description": "From up in the tree you see a dense forest west. To the southwest looms the mansion in all its sinister glory. Directly south you see a path which appears to be blocked by a thicket.",
    "exits": {
      "d": "blastedTree"
    },
    "onEnter": function onEnter() {
      message = "You use the rope to climb the tree.";
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
    "description": "As you reach the iron gate, a rotting, child-sized ghoul hobbles onto the path. Its sunken eyes immediately focus on you and it starts to amble forward. You stumble and your heart races with terror. The ghoul is blocking all your possible exits.",
    "exits": {//"s": "exit"
    },
    "scenery": {
      "ooze": "It's thick and black.",
      "maggots": "The tiny white creatures writhe and squirm.",
      "worms": "The worms crawl in and out of every hole on the ghoul's rotting body.",
      "mouth": "The ooze dribbles out over sharp, tiny teeth.",
      "teeth": "Don't let it bite you!",
      "gate": "It is your way out!",
      "iron gate": "It is your way out!",
      "eyes": "They seem to glow with a sickening yellow hue."
    },
    "onEnter": function onEnter() {
      snd.groan.play();
      snd.music.play();
    }
  }
}; // Define your game verbs here.

var verbs = {
  "about": {
    "action": function action(noun, obj) {
      verbs["help"].action("about");
    },
    "singleWord": true
  },
  "approach": {
    "action": function action(noun, obj) {
      if (noun === "wall" && isRoom("crumblingWall")) {
        message = "Despite my warnings, you inch towards the wall. FOOOMP! A block of cement just flew past your head! If this was a Sierra game you'd be dead.";
        return;
      }
    }
  },
  "blow": {
    "action": function action(noun, obj) {
      message = "You let out a puff of air.";

      if (obj.id === "candle" && objectInRange("candle") || flags.candleLit) {
        verbs["unlight"].action(noun, obj);
        return;
      }
    }
  },
  "board": {
    "synonym": "enter"
  },
  "carrying": {
    "action": function action(noun, obj) {
      if (noun) {
        return;
      }

      var inventory = "";

      for (var key in objects) {
        if (objects[key].location === "player") {
          if (inventory.length > 0) {
            inventory += ", ";
          }

          inventory += objects[key].name;
        }
      }

      if (!inventory) inventory = "Nothing.";
      message = "You are carrying: ".concat(inventory); // displayOverlay(message);
      // message = '';
    },
    "singleWord": true
  },
  "chop": {
    "action": function action(noun, obj) {
      message = "You don't need to chop that.";

      if (isCarrying("axe")) {
        verbSubroutine("swing", "axe", verbs["swing"], objects["axe"]);
      } else {
        message = "Not with your bare hands. Your karate skills aren't what they used to be.";
      }
    }
  },
  "climb": {
    "action": function action(noun, obj) {
      message = "You can't climb that.";
      cl(obj.id);

      if ((noun === "tree" || obj.id === "rope") && flags.ropeTiedToTree && isRoom("blastedTree")) {
        message = "You use the rope to climb the tree.";
        objects["rope"].omnipresence = true;
        currentRoom = rooms["inTheTree"];
        return;
      }

      if (noun === "tree" && flags.ropeTiedToTree && isRoom("inTheTree")) {
        verbs["go"].action("down");
        return;
      }

      if (obj.id === "rope" && isRoom("inTheTree")) {
        message = "You use the rope to climb down.";
        obj.omnipresence = false;
        currentRoom = rooms["blastedTree"];
      }

      if (obj.id === "rope" && isCarrying("rope")) {
        message = "It isn't attached to anything!";
        return;
      }

      if (isRoom("slipperySteps") && nounCheck(noun, ["stairs", "steps", "down", "staircase"])) {
        message = "The surface is slippery and damp. You would surely fall and hurt yourself.";
        return;
      }
    }
  },
  "close": {
    "action": function action(noun, obj) {
      message = "You can't close that."; // Drawer exception to put candle away if drawer closed

      if (obj.id === "drawer" && objectInRange(obj) && obj.isOpen && objects["candle"].location === "study") {
        message = obj.closeMessage;
        objects["candle"].location = "drawer";
        obj.closeAction();
        return;
      } // Coffin exception to play sound


      if (obj.id === "coffin" && obj.isOpen && objectInRange(obj)) {
        message = "You slam the coffin shut.";
        obj.closeAction();
        snd.door.play();
        return;
      }

      if (obj.isOpen === false && objectInRange(obj)) {
        message = "It's already closed.";
        return;
      }

      if (obj.isOpen && objectInRange(obj)) {
        message = obj.closeMessage ? obj.closeMessage : "You close it.";

        if (obj.closeAction) {
          obj.closeAction();
        }

        if (obj.id === "door") {
          snd.door.play();
        }

        return;
      }
    }
  },
  "d": {
    "action": function action(noun, obj) {
      if (noun) return;
      verbs["go"].action("down");
    },
    "singleWord": true
  },
  "dig": {
    "singleWord": true,
    "action": function action(noun, obj) {
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
        message = "The roots are too deep. That would take days.";
        return;
      }

      if (obj.id === "ghoul" && objectInRange(obj)) {
        verbs["swing"].action("shovel", getObject("shovel"));
        return;
      }
    }
  },
  "down": {
    "synonym": "d"
  },
  "drop": {
    "action": function action(noun, obj) {
      // Don't allow dropping in marsh
      if (obj.location === "player" && (isRoom("marsh") || isRoom("soggyPath"))) {
        message = "You best not drop things into the marsh. They'll be lost forever.";
        return;
      } // Don't allow treasure to be dropped


      if (obj.score > 0 && isCarrying(obj)) {
        message = "The ".concat(noun, " is too valuable to drop.");
        return;
      } // Unlight candle when dropped


      if (obj.id === "candle" && flags.candleLit && currentRoom.darkness === true) {
        message = "You drop the candle. It extinguishes itself as it rolls off into the darkness! That probably wasn't a good idea.";
        flags.candleLit = false;
        obj.location = currentRoom.rid;
        return;
      }

      if (obj.id === "candle" && flags.candleLit) {
        message = "You drop the candle. It extinguishes itself as it falls to the ground.";
        flags.candleLit = false;
        obj.location = currentRoom.rid;
        return;
      } // Default behavior


      if (obj.location === "player") {
        obj.location = currentRoom.rid;
        message = "Dropped.";
        return;
      } // Weird boat syntax


      if (noun === "boat" && flags.inBoat) {
        message = "You jump out of the boat.";

        if (currentRoom.water) {
          message += " SPLASH!<br>";
          snd.splash.play();
        }

        flags.inBoat = false;
        return;
      }
    }
  },
  "e": {
    "action": function action(noun, obj) {
      if (noun) return;
      verbs["go"].action("east");
    },
    "singleWord": true
  },
  "east": {
    "synonym": "e"
  },
  "enter": {
    "action": function action(noun, obj) {
      message = "You can't enter that.";

      if (noun === "boat" && objectInRange("boat") && !flags.inBoat) {
        message = "You board the boat.";
        flags.sinking = 0;
        flags.inBoat = true;
        return;
      }

      if (noun === "boat" && objectInRange("boat") && flags.inBoat) {
        message = "You are already onboard.";
        return;
      }

      if (noun === "boat") {
        message = "There is no boat here.";
        return;
      }
    }
  },
  "examine": {
    synonym: "look"
  },
  "exit": {
    "action": function action(noun, obj) {
      message = "You can't exit that.";

      if (noun === "boat") {
        verbs["drop"].action("boat", objects["boat"]);
        return;
      }
    }
  },
  "extinguish": {
    "synonym": "unlight"
  },
  "get": {
    "action": function action(noun, obj) {
      message = "What \"".concat(noun.toUpperCase(), "?\"");

      if (!flags.candleLit && currentRoom.darkness === true) {
        message = "You can't see anything!";
        return;
      } // Check if noun is scenery


      if (!obj && currentRoom.scenery) {
        for (var key in currentRoom.scenery) {
          if (key.toLowerCase() == noun.toLowerCase()) {
            message = "You can't take that.";
            return;
          }
        }
      }

      if (obj.id === "boat" && objectInRange("boat")) {
        if (!flags.inBoat) {
          message = "It's too big to carry around. It will carry you if you board it.";
        } else {
          message = "Um, you are sitting in the boat. Besides, it's too big to carry.";
        }

        return;
      } // Dead bats


      if (obj.id === "bats" && !flags.batsAttacking && currentRoom.rid === objects["bats"].location) {
        message = "Ew! You don't want to touch the filthy bat carcasses!";
        return;
      } // Statue zapped into marsh


      if (isRoom("marsh") && obj.id === "statue" && flags.inBoat && objectInRange("statue")) {
        message = "It's stuck in the muck. You're going to have to exit the boat to get to it.";
        return;
      }

      if (isRoom("marsh") && obj.id === "statue" && !flags.inBoat && objectInRange("statue")) {
        message = obj.takeMessage;
        obj.takenFromMarsh();
        flags.sinkingStatue = 0;
        delete rooms["marsh"].onEnter;
        return;
      }

      if (obj.portable && objectInRange(obj)) {
        if (obj.location === currentRoom.rid) {
          message = obj.takeMessage ? obj.takeMessage : "Taken.";
          obj.location = "player";

          if (obj.score > 0) {
            if (checkScore() === getMaxScore() && flags.endGame === 0) {
              message += " You feel the house shake and hear an angry howl in the distance. I think you've found all of the treasure.  Hurry, find your way back to the front gate to escape the mansion!";
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
    "combineObjects": function combineObjects(noun, obj) {
      // Candle
      if (isCarrying("candlestick") && isCarrying("candle") && (obj.id === "candlestick" || obj.id === "candle")) {
        message += "<br>You place the candle in the candlestick.";
        return;
      } // Vacuum


      if (isCarrying("batteries") && isCarrying("vacuum") && (obj.id === "batteries" || obj.id === "vacuum")) {
        objects["vacuum"].insertBatteries();
        objects["batteries"].location = "vacuum";
        flags.vacuumHasPower = true;
        message += "<br>The batteries are a perfect match for the vacuum. The vacuum is now powered.";
        return;
      }
    }
  },
  "go": {
    "action": function action(noun, obj) {
      var direction;

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

        default:
          message = "You need to specify a direction in which to&nbsp;<em>GO</em>.";
          return;
      } // THINGS THAT HINDER MOVEMENT
      // Darkness


      if (currentRoom.darkness && !flags.candleLit) {
        message = "It's too dark to move!";
        return;
      } // Bats attacking


      if (flags.batsAttacking && isRoom("mustyRoom") && direction === "e") {
        message = "The bats are blocking that direction.";
        return;
      } // Ghosts in upper gallery


      if (flags.ghostsAttacking && isRoom("upperGallery") && direction === "w") {
        message = "The ghosts won't let you pass!";
        snd.ghost.play();
        return;
      } // Magical barrier


      if (isRoom("coldChamber") && flags.magicalBarrier && direction === "e") {
        message = "A magical barrier is blocking your way.";
        snd.shock.play();
        return;
      } // Water in room


      if (currentRoom.water && !flags.inBoat) {
        message = "The marshy ground prevents any movement.";
        return;
      } // Thicket not surveyed


      if (isRoom("path") && direction === "s" && !flags.thicketSurveyed) {
        message = "You try to squeeze through the thicket but keep ending up where you started. Perhaps if you could get a birdseye view you could better navigate a route.";
        return;
      } // Statue is sinking


      if (isRoom("marsh") && flags.sinkingStatue) {
        message = "You've come this far and you're not going leave without ALL the treasure. Get that statue before it's lost forever!";
        return;
      } // Final "battle"


      if (isRoom("finalRoom") && !currentRoom.exits.s || isRoom("finalRoom") && currentRoom.exits.s && direction !== "s") {
        message = "The ghoul blocks your exit in that direction!";
        snd.laugh.play();
        return;
      } // Get the room id of the chosen exit direction


      var chosenExit = currentRoom.exits[direction.toLowerCase()]; // MOVEMENT ALLOWED

      if (direction && chosenExit) {
        var tempRoomHolder = previousRoom; //message = "OK";

        message = "";
        previousRoom = currentRoom;
        currentRoom = getRoom(chosenExit); // THINGS THAT BLOCK NEW ROOM, MOVEMENT NOT ALLOWED

        if (currentRoom.darkness && !flags.candleLit) {
          currentRoom = previousRoom;
          previousRoom = tempRoomHolder;
          message = "It's too dark in that direction. You'll need a light.";
          return;
        }

        if ((currentRoom.water || currentRoom.shore) && flags.inBoat) {
          objects["boat"].location = currentRoom.rid;
          message = "Aye aye captain!";
        }

        if (currentRoom.water && !flags.inBoat) {
          currentRoom = previousRoom;
          previousRoom = tempRoomHolder; //message = `You are sinking in a bog!`;

          message = "You need a way to navigate the bog.";
          return;
        }

        if (!currentRoom.water && !currentRoom.shore && flags.inBoat) {
          currentRoom = previousRoom;
          previousRoom = tempRoomHolder;
          message = "You need to exit the boat first.";
          return;
        }

        if (isRoom("exit")) {
          flags.winner = true;
          return;
        } // Trigger on exit events for last room.


        if (previousRoom.onExit) {
          previousRoom.onExit();
        } // Initial room visit events


        if (currentRoom.onEnter) {
          currentRoom.onEnter();
        }
      } else if (direction) {
        message = "You can't go that way!";
      } else {
        message = "Go where?";
      }
    }
  },
  "help": {
    "action": function action(noun, obj) {
      message = "\"God helps those who help themselves.\"";
      var myHelp;

      if (!noun) {
        myHelp = "Haunted House is a text adventure. You perform actions by typing two word commands such as <em>TAKE RING</em> or <em>LOOK PAINTING</em>. Explore the house and try to find the treasures within. For clues, be sure to <em>LOOK</em> at everything!<br><br>When you've found all the treasure, make your way back to the <em>iron gate</em> to earn that last point and win the game.<br><br>View this screen at any time by typing <em>HELP</em>. For more instructions type the following:<br><em>HELP MOVEMENT</em> or <em>HELP COMMANDS</em><br><br>For more info about this program type <em>ABOUT</em>.";
        displayOverlay(myHelp);
        message = '';
        incrementTurn = false;
        return;
      }

      if (noun === "movement") {
        myHelp = "You can move around the mansion by typing <em>GO NORTH</em>, <em>GO WEST</em>, <em>GO UP</em>, etc. Save keystrokes by simply entering a single initial of the direction you want to move: <em>N</em>,<em>S</em>,<em>E</em>,<em>W</em>,<em>U</em> and <em>D</em>.<br><br>Available exits are listed below the room description.<br><br>Occasionally you will find that your path is blocked by various obstacles. Your job is to find the right object or action to get past these impediments. Explore everywhere!";
        displayOverlay(myHelp);
        message = '';
        incrementTurn = false;
        return;
      }

      if (noun === "commands") {
        myHelp = "There are several special commands in the game. <em>INVENTORY</em> or <em>I</em> will list the objects you are carrying. <em>SCORE</em> will reveal your current score. Some of the most useful verbs are <em>LOOK</em> and <em>TAKE</em>. <em>X</em> is a shortcut for <em>LOOK</em>/<em>EXAMINE</em>.<br><br>Using <em>IT</em> as your noun will reuse the last noun you entered. For example <em>LOOK LAMP</em> then, on your next turn, <em>TAKE IT</em>.<br><br>For a complete list of all the verbs I know type <em>HELP VERBS</em>. But wait until you a really stuck before resorting to that.<br><br>Bonus tips: You can also press the <em>ESC</em> or <em>SPACE</em> to close this screen. Numpad <em>+</em> and <em>-</em> resize the display and numpad <em>/</em> toggles the typeface.";
        displayOverlay(myHelp);
        message = '';
        incrementTurn = false;
        return;
      }

      if (noun === "about") {
        myHelp = "<em>Haunted House</em> was originally written by Jenny Tyler and Les Howarth as the example program in their book <em>Write your own Adventure Programs for your Microcomputer</em> (&copy;1983 Usborne Publishing).<br><br>This \"remastered\" version was written by <em>Robert Wm. Gomez</em>. If you enjoy it drop me a line on Twitter <a href=\"https://twitter.com/robertgomez\" target=\"blank\" rel=\"noopener noreferrer\"><em>@robertgomez</em></a> or visit my website <a href=\"http://robertgomez.org\" target=\"blank\" rel=\"noopener noreferrer\"><em>robertgomez.org</em></a>.<br><br>Special thanks to <em>John Burgess</em> for early alpha testing and many helpful suggestions.<br><br>&copy;2020 Robert Wm. Gomez";
        displayOverlay(myHelp);
        message = '';
        incrementTurn = false;
        return;
      }

      if (noun === "verbs") {
        var verb_array = [];
        var verblist = "";

        for (var verb in verbs) {
          if (verb.length > 1 && verbs[verb].hiddenVerb !== true) {
            verb_array.push(verb.toUpperCase());
          }
        }

        verb_array.sort();

        for (var _verb in verb_array) {
          verblist += verb_array[_verb] + ", ";
        }

        myHelp = "Tired of playing \"Guess the verb?\"<br><br><b>Verbs I know:</b>  ".concat(verblist.substring(0, verblist.length - 2));
        displayOverlay(myHelp);
        message = '';
        incrementTurn = false;
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
  "jump": {
    "action": function action(noun, obj) {
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
        message = "A jump from the top of the stairs would surely result in a broken ankle.";
        return;
      }
    },
    "singleWord": true
  },
  "kill": {
    "action": function action(noun, obj) {
      if (obj.id === "bats" && objectInRange("bats") && flags.batsAttacking) {
        message = "And how do you propose to do that?";
        return;
      }

      if (obj.id === "bats" && objectInRange("bats") && !flags.batsAttacking) {
        message = "They are already dead.";
        return;
      }

      if (obj.id === "ghosts" && objectInRange("ghosts") && flags.ghostsAttacking) {
        message = "You can't kill the undead!";
        return;
      }

      if (obj.id === "ghoul" && objectInRange("ghoul")) {
        message = "You can't kill the undead! Your only chance for survival is to make your escape through the gate to the south!";
        return;
      }

      if (nounCheck(noun, ["self", "me", "myself", "player"])) {
        message = "Cheer up buddy boy! No need to resort to that... yet.";
        return;
      }
    }
  },
  "leave": {
    "synonym": "drop"
  },
  "light": {
    "action": function action(noun, obj) {
      message = "You can't light that.";

      if (!isCarrying("matches")) {
        message = "You have nothing to light it with.";
        return;
      }

      if (obj.id === "matches" || noun === "match") {
        message = "For a brief moment the match casts a tiny amount of light then fizzles out.";
        return;
      }

      if (obj.id === "candle" && isCarrying("candle") && isCarrying("candlestick")) {
        if (flags.candleLit) {
          message = "It's already lit.";
        } else {
          message = "It casts a flickering light.";
          flags.candleLit = true;
        }

        return;
      }

      if (obj.id === "candle" && isCarrying("candle") && !isCarrying("candlestick")) {
        message = "It will burn your hands!";
        return;
      }

      if (obj.id === "aerosol" && isCarrying("aerosol") && flags.batsAttacking && currentRoom.rid === objects["bats"].location) {
        flags.batsAttacking = false;
        message = "Whoosh! A fireball erupts towards the bats. They spiral to the ground in a smattering of thuds. They now lie motionless, smoldering on the ground.";
        rooms["mustyRoom"].batsKilled();
        objects["bats"].batsKilled();
        flags.batsAttacking = false;
        return;
      }

      if (obj.id === "aerosol" && isCarrying("aerosol")) {
        message = "An explosive fireball sprays out of the can of paint! You can kiss your eyebrows goodbye.";
        return;
      }

      if (nounCheck(noun, ["cooker", "stove"]) && isRoom("kitchen")) {
        message = "The cooker rusted out and is in no state to be lit.";
        return;
      }

      if (noun === "rubbish" && isRoom("yard")) {
        message = "It's too damp to light.";
        return;
      }

      if (obj.id === "thicket" && objectInRange("thicket")) {
        message = "It's too damp to ignite.";
        return;
      }

      if (obj.id === "ghoul" && isRoom("finalRoom")) {
        message = "The gooey ooze from the ghoul prevents it from igniting. It knocks the matches out of your hands!";
        objects["matches"].location = null;
        snd.laugh.play();
        return;
      }
    }
  },
  "listen": {
    "action": function action(noun, obj) {
      if (noun === "owl" && isRoom("darkCorner")) {
        message = "Yup, that's an owl alright.";
        snd.owl.play();
        return;
      }

      if (obj.id === "ghoul") {
        snd.laugh.play();
      }

      message = obj.listenMessage && objectInRange(obj) ? obj.listenMessage : "You don't hear anything unusual.";
    },
    "singleWord": true
  },
  "look": {
    "action": function action(noun, obj) {
      //message = "You see nothing special.";
      message = "".concat(noun.toUpperCase(), "? You see nothing special.");

      if (noun === "nothing special") {
        message = "You stare blankly into space.";
        return;
      } // Key in coat pocket


      if (obj.id === "coat" && objectInRange(obj) && objects["key"].location === "coat") {
        message = "As you search through the old coat you find a key in the pocket.";
        objects["key"].location = currentRoom.rid;
        snd.key.play();
        return;
      } // Weird exception so painting can be looked at further


      if (noun === "skull" && objectInRange("painting")) {
        message = "It's from a small animal with sharp fangs. Despite the frightening appearance, the boy is holding it lovingly.";
        return;
      } // In the tree thicket is viewed


      if (isRoom("inTheTree") && obj.id === "thicket") {
        message = "From up here you are able visualize a clear path through the thicket. You should be able to wind your way through it now.";
        rooms["path"].clearThicket();
        flags.thicketSurveyed = true;
        return;
      } // Default action if noun is scenery in room


      if (currentRoom.scenery) {
        for (var key in currentRoom.scenery) {
          if (key.toLowerCase() == noun.toLowerCase()) {
            message = currentRoom.scenery[key];
            return;
          }
        }
      } // Default action if obj has a description


      if (obj.description && objectInRange(obj)) {
        message = obj.description;
        return;
      }
    }
  },
  "n": {
    "action": function action(noun, obj) {
      if (noun) return;
      verbs["go"].action("north");
    },
    "singleWord": true
  },
  "north": {
    "synonym": "n"
  },
  "open": {
    "action": function action(noun, obj) {
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
          message = "You slowly raise the lid revealing... a ring!";
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
    }
  },
  "paint": {
    "action": function action(noun, obj) {
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
    }
  },
  "read": {
    "action": function action(noun, obj) {
      if (obj.readable && objectInRange(obj)) {
        message = obj.readableText;
        return;
      }

      message = "Nothing to read there.";
    }
  },
  "remove": {
    "action": function action(noun, obj) {
      if (noun === "coat" && isCarrying("coat") && flags.wearingCoat) {
        message = "You remove the coat";
        flags.wearingCoat = false;
        return;
      }

      if (noun === "coat" && isCarrying("coat") && !flags.wearingCoat) {
        message = "You are not wearing it.";
        return;
      }

      if (obj.id === "ring" && obj.isWorn) {
        message = "You pull and twist, but the ring wont come off!";
        return;
      }
    }
  },
  "s": {
    "action": function action(noun, obj) {
      if (noun) return;
      verbs["go"].action("south");
    },
    "singleWord": true
  },
  "say": {
    "action": function action(noun, obj) {
      message = "You say, \"".concat(noun.toUpperCase(), "!\" Nothing happens."); // Saying the magic word to dispel the field

      if (obj.id === "xzanfar" && isCarrying("magic spells")) {
        message = "You say, \"".concat(noun.toUpperCase(), "!\"");

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
          message += " The ghoul's mouth curls into a sinister smile and waves of dark energy crackle over its skin.";
          snd.laugh.play();
          return;
        } else {
          message += "<br><br>*Magic Occurs*";
        }

        return;
      }

      if (noun === "klatu borata nickto" && isCarrying("scroll")) {
        message = "You say, \"".concat(noun.toUpperCase(), "!\"");
        message += "<br><br>Nothing happens. This incantation must have been part of a larger ritual.";
        return;
      } // Saying naughty things


      if (nounCheck(noun, ["fuck", "shit", "cunt", "tits", "piss", "cocksucker", "motherfucker"])) {
        message += "<br><br>Relax. It's just a game.";
        return;
      }
    }
  },
  "score": {
    "action": function action(noun, obj) {
      message = "Your score is <em>".concat(checkScore(), "/").concat(getMaxScore() + 1, "</em>.");

      if (checkScore() === 0) {
        message += " You need to find some treasure!";
      }

      if (checkScore() === getMaxScore()) {
        message += " That's all the treasure. Hurry, find your way back to the front gate to claim that <em>final point!</em>";
      }

      message += "<br><br>So far you have taken <em>".concat(turns, " turns</em>.");
      incrementTurn = false;
    },
    "singleWord": true
  },
  "smell": {
    "action": function action(noun, obj) {
      if (objectInRange(obj)) {
        message = obj.smellMessage ? obj.smellMessage : "You don't smell anything.";
      }
    }
  },
  "south": {
    "synonym": "s"
  },
  "spray": {
    "action": function action(noun, obj) {
      message = "You can't spray that!";

      if ((obj.id === "aerosol" || obj.id === "bats") && isCarrying("aerosol") && flags.batsAttacking && currentRoom.rid === objects["bats"].location) {
        flags.batsAttacking = false;
        message = "Pfft! Got 'em! The bats spiral to the ground in a smattering of thuds. They now lie motionless on the ground.";
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
        message = "Hisssss...";
        return;
      }
    }
  },
  "swing": {
    "action": function action(noun, obj) {
      message = "There's no reason to be swinging that.";

      if (obj.id === "rope" && flags.ropeTiedToTree && isRoom("blastedTree")) {
        message = "This is no time to be playing games.";
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
        message = "You swing the axe but he bats are just too quick for you.";
        return;
      }

      if (obj.id === "axe" && isCarrying("axe") && isRoom("finalRoom")) {
        message = "The axe embeds itself in the chest of the ghoul! Within seconds the axe vaporizes into dust searing your hands in the process!";
        obj.location = null;
        snd.laugh.play();
        return;
      }

      if (obj.id === "shovel" && isCarrying("shovel") && isRoom("finalRoom")) {
        message = "The blade embeds itself in the head of the ghoul! Within seconds the shovel vaporizes into dust searing your hands in the process!";
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
    }
  },
  "take": {
    synonym: "get"
  },
  "u": {
    "action": function action(noun, obj) {
      if (noun) return;
      verbs["go"].action("up");
    },
    "singleWord": true
  },
  "unlight": {
    "action": function action(noun, obj) {
      //message = `You can't do that.`;
      if (obj.id === "candle" && flags.candleLit) {
        message = "You blow out the candle.";
        flags.candleLit = false;
        return;
      }
    }
  },
  "unlock": {
    "action": function action(noun, obj) {
      message = "You can't unlock that.";

      if (obj.locked && obj.key && objectInRange(obj) && isCarrying(obj.key)) {
        message = obj.unlockMessage ? obj.unlockMessage : "You've unlocked the ".concat(noun, ".");
        obj.locked = false; // Heavy door exception

        if (obj.id === "door" && currentRoom.rid === obj.location) {
          rooms["hallWithLockedDoor"].doorUnlocked();
        }

        if (obj.unlockAction) {
          obj.unlockAction();
        }

        return;
      }

      if (obj.locked && obj.key && objectInRange(obj)) {
        message = "You don't have a means to unlock that.";
        return;
      }

      if (obj.locked && objectInRange(obj)) {
        "You've unlocked the ".concat(noun, ".");
        return;
      }
    }
  },
  "untie": {
    "action": function action(noun, obj) {
      if (obj.id =  true && objectInRange("rope")) {
        verbs["get"].action(noun, obj);
        return;
      }
    }
  },
  "up": {
    "synonym": "u"
  },
  "use": {
    "action": function action(noun, obj) {
      // Aerosol
      if (obj.id === "aerosol") {
        verbs["spray"].action(noun, obj);
        return;
      } // Using the tiny vacuum


      if (obj.id === "vacuum" && flags.vacuumHasPower && flags.ghostsAttacking && isRoom("upperGallery")) {
        message = "With a loud whoosh, the tiny vacuum revs up. You've sucked up all the ghosts!";
        flags.ghostsAttacking = false;
        flags.vacuumHasPower = false;
        objects["ghosts"].location = "vacuum";
        rooms["upperGallery"].ghostsDispelled();
        objects["vacuum"].captureGhosts();
        return;
      }

      if (obj.id === "vacuum" && objects["ghosts"].location === "vacuum") {
        message = "It's filled with ghosts. You don't want to risk releasing them again.";
        return;
      }

      if (obj.id === "vacuum" && isCarrying("vacuum") && flags.vacuumHasPower && isRoom("finalRoom")) {
        verbs["vacuum"].action("ghoul", getObject("ghoul"));
        return;
      }

      if (obj.id === "vacuum" && isCarrying("vacuum") && !flags.vacuumHasPower) {
        message = "This vacuum requires batteries.";
        return;
      }

      if (obj.id === "xzanfar") {
        verbs["say"].action(noun, obj);
        return;
      }
    }
  },
  "vacuum": {
    "action": function action(noun, obj) {
      if (noun === "books" && currentRoom.rid === "library") {
        message = "They are \"musty\" not \"dusty!\"";
        return;
      }

      if (obj.id === "ghoul" && isRoom("finalRoom") && isCarrying("vacuum")) {
        message = "Your attempts to suck the ghoul into the vacuum fail. In the process it smashes the vacuum, releasing the ghosts!";
        obj.location = null;
        objects["ghosts"].location = "finalRoom";
        objects["ghosts"].description = "The ghosts whirl about the ghoul adding to its evil power!", snd.ghost.play();
        snd.laugh.play();
        objects["vacuum"].location = null;
        return;
      }

      if (obj.id === "ghosts" && isRoom("finalRoom") && isCarrying("vacuum")) {
        message = "The ghosts are still inside the vacuum.";
        return;
      }

      verbs["use"].action("vacuum", objects["vacuum"]);
      return;
    }
  },
  "w": {
    "action": function action(noun, obj) {
      if (noun) return;
      verbs["go"].action("west");
    },
    "singleWord": true
  },
  "wait": {
    "action": function action(noun, obj) {
      if (!noun) {
        message = "Time passes...";
        return;
      }
    },
    "singleWord": true
  },
  "wear": {
    "action": function action(noun, obj) {
      message = "You can't wear that.";

      if (obj.id === "coat" && isCarrying("coat") && !flags.wearingCoat) {
        message = "You put on the coat. Stylish.";

        if (objects["key"].location === "coat") {
          message += " Wait, there is something in the pocket!";
        }

        flags.wearingCoat = true;
        return;
      }

      if (obj.id === "coat" && isCarrying("coat") && flags.wearingCoat) {
        message = "You are already wearing it.";
        return;
      }

      if (obj.id === "coat" && !isCarrying("coat")) {
        message = "You don't have a coat.";
        return;
      }

      if (obj.id === "ring" && isCarrying("ring") && !obj.isWorn) {
        message = "As you slide the ring on you finger you can feel evil coursing through your body.";
        obj.isWorn = true;
        return;
      }
    }
  },
  "west": {
    "synonym": "w"
  },
  "x": {
    "synonym": "look"
  },
  "debug_get": {
    "action": function action(noun, obj) {
      debug = true;

      if (noun === "treasure") {
        for (var key in objects) {
          if (objects[key].score) {
            objects[key].location = "player";
          }

          ;
        }

        objects["candlestick"].location = currentRoom.rid;
        message = "You cheat and collect all the treasure.";
        incrementTurn = false;
        return;
      }

      if (noun === "all") {
        for (var _key in objects) {
          if (objects[_key].portable) {
            objects[_key].location = "player";
          }

          ;
        }

        message = "You cheat and collect all the objects, you filthy hoarder.";
        incrementTurn = false;
        return;
      }

      if (obj) {
        obj.location = "player";
        message = "You cheat and ".concat(obj.name, " appears in your inventory.");
        incrementTurn = false;
        return;
      }
    },
    "singleWord": true,
    "hiddenVerb": true
  },
  "debug_go": {
    "action": function action(noun, obj) {
      debug = true;

      if (noun === "list") {
        var room_array = [];
        var roomlist = "";

        for (var room in rooms) {
          room_array.push(room);
        }

        room_array.sort();

        for (var _room in room_array) {
          roomlist += room_array[_room] + ", ";
        }

        myHelp = "Here are the rooms: ".concat(roomlist.substring(0, roomlist.length - 2));
        displayOverlay(myHelp);
        message = '';
        incrementTurn = false;
        return;
      }

      if (noun) {
        for (var key in rooms) {
          if (noun === rooms[key].rid.toLowerCase()) {
            currentRoom = rooms[key];
          }
        }

        message = "You cheat and are teleported to ".concat(currentRoom.name);
        incrementTurn = false;
        return;
      }
    },
    "singleWord": true,
    "hiddenVerb": true
  }
};
/**
 * sounds.js
 */

var Sound =
/*#__PURE__*/
function () {
  function Sound(src, loop) {
    _classCallCheck(this, Sound);

    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");

    if (loop) {
      this.sound.setAttribute("loop", true);
    }

    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  _createClass(Sound, [{
    key: "play",
    value: function play() {
      this.sound.play();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.sound.pause();
    }
  }]);

  return Sound;
}();

var snd = {}; // Link your sound files here

snd.owl = new Sound("audio/owl.mp3");
snd.door = new Sound("audio/door.mp3");
snd.key = new Sound("audio/key.mp3");
snd.pickup = new Sound("audio/treasure_pickup.mp3");
snd.shock = new Sound("audio/shock.mp3");
snd.splash = new Sound("audio/splash.mp3");
snd.ghost = new Sound("audio/ghost.mp3");
snd.falling = new Sound("audio/falling.mp3");
snd.laugh = new Sound("audio/laugh.mp3");
snd.groan = new Sound("audio/groan.mp3");
snd.scream = new Sound("audio/scream.mp3");
snd.fanfare = new Sound("audio/fanfare.mp3");
snd.dog = new Sound("audio/dog.mp3");
snd.music = new Sound("audio/plan9.mp3", true); //export default snd;

/**
 * This file contains scripts that enhance the layout display.
 * This code does not affect the game play.
 */

var $btnSmaller = document.getElementById('btnSmaller');
var $btnBigger = document.getElementById('btnBigger');
var $btnFontToggle = document.getElementById('btnFonts');
var $html = document.querySelector('html');
var htmlFontSize = 16; //$html.style.fontSize = htmlFontSize + "px";

$btnSmaller.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (--htmlFontSize < 8) {
    htmlFontSize = 8;
  }

  $html.style.fontSize = htmlFontSize + "px";
});
$btnBigger.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (++htmlFontSize > 36) {
    htmlFontSize = 36;
  }

  $html.style.fontSize = htmlFontSize + "px";
});
$btnFontToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  document.querySelector('body').classList.toggle('alt-font');
}); // Eventually all these prepends will be imports (if I can learn ES6)
//import snd from './sounds.js';
// Initialize DOM items as JS variables

var $container = document.getElementById('hh-container');
var $screen = document.getElementById('hh-display');
var $display = document.getElementById('hh-output');
var $inputZone = document.getElementById('hh-input');
var $inputForm = document.getElementById('hh-input-form');
var $userInput = document.getElementById('hh-userInput');
var $restartBtn = document.getElementById('hh-reload');
var $displayOverlay = document.getElementById('hh-output-overlay');
var $continueBtn = document.getElementById('hh-continue'); // Global Variables

var currentRoom = {}; // RM 57

var message = ''; // M$

var previousObj = null;
var previousRoom = null;
var totalScore = 0;
var turns = 0;
var incrementTurn = true;
var history = ["help"];
var historyCarat = 0; // Game state variables

var flags = {
  barsDug: false,
  batsAttacking: true,
  // flags[26]
  candleLit: false,
  // flags[0]
  endGame: 0,
  encroachingDarkness: 0,
  frontDoorOpen: true,
  // flags[23]
  ghoulProgress: 0,
  ghostsAttacking: true,
  // flags[27]
  hallDoorLocked: true,
  inBoat: false,
  lightLevel: 60,
  magicalBarrier: true,
  //flags[34]
  ropeTiedToTree: true,
  screamVolume: .25,
  sinking: 0,
  sinkingStatue: 0,
  studyWallBroken: false,
  thicketSurveyed: false,
  vacuumHasPower: false,
  vacuumSwitchedOn: false,
  // flags[24]
  wearingCoat: false,
  winner: false
};
/**
 * Primary loop for rendering the screen.
 */

function display() {
  var extraInfo = getExtraDescription(currentRoom);
  var roomItems = getObjectsInRoom(currentRoom);
  cls(); // Clear the screen

  prnt("HAUNTED HOUSE: REMASTERED");
  prnt("<span class=\"hh-divider\">---------------------------------------------<br></span>");
  prnt("<span class=\"room-name\">".concat(currentRoom.name, "</span>"));

  if (currentRoom.darkness && !flags.candleLit) {
    prnt("<br>It's pitch black and you can't see anything!");
  } else if (extraInfo && currentRoom.description) {
    prnt("<br>".concat(currentRoom.description, " ").concat(extraInfo));
  } else if (extraInfo) {
    prnt("<br>".concat(extraInfo));
  } else if (currentRoom.description) {
    prnt("<br>".concat(currentRoom.description));
  }

  if (currentRoom.darkness && flags.candleLit || !currentRoom.darkness) {
    prnt("<br><span class=\"exits\">Exits:</span>".concat(splitExits(currentRoom.exits)));
    if (roomItems) prnt(roomItems);
  }

  prnt("<span class=\"hh-divider\"><br>---------------------------------------------</span>");

  if (message.length > 0) {
    prnt("<br><span class=\"message\">".concat(message, "</span>"));
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
  var output = "";

  if (objects["boat"].location === roomObject.rid) {
    if (flags.inBoat) {
      output += "You are in the boat.";
    } else {
      output += "There's a boat here.";
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
  var output = "";

  for (var obj in objects) {
    // Look for objects in room
    if (objects[obj].location == roomObject.rid && objects[obj].portable) {
      output += "<br/><span class=\"message objects-in-room\">You can see ".concat(objects[obj].name, " here.</span>");
    }
  }

  if (output === "") output = false;
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
  $displayOverlay.innerHTML += "<span class=\"message\">".concat(text, "</span>");
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
  var exitListing = "";

  for (var exit in exits) {
    exitListing += exit.toUpperCase() + ", ";
  } // Replace last ocurrance of ", "


  exitListing = exitListing.replace(new RegExp(", " + '$'), ''); // Replace last comma with ampersand

  var n = exitListing.lastIndexOf(", ");
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
  var verb = null;
  var noun = null;

  for (var i = 0; i < myInput.length; i++) {
    // Parse verb and noun from input
    if (myInput.substring(i, i + 1) === " " && !verb) {
      verb = myInput.substring(0, i);
      noun = myInput.substring(i + 1, myInput.length).trim();
      break;
    } else if (myInput.indexOf(' ') < 0) {
      // One word input
      verb = myInput.trim();
      noun = null;
      break;
    }
  } // Check if words exist as objects


  var vb = getVerb(verb);
  var ob = getNoun(noun); // If verb has a synonym, change the verb to synonym

  if (vb.synonym) {
    verb = vb.synonym;
    vb = getVerb(verb);
  } // If noun has a synonym, change the object to synonym


  if (ob.synonym) {
    noun = ob.synonym;
    ob = getNoun(noun);
  } // Save keystrokes by reusing object from last parse


  if (noun === "it" && previousObj) {
    ob = previousObj;
    noun = ob.id;
  }

  var error = false;

  if (noun && !ob) {
    message = "That's silly!";
  }

  if (!noun && !vb.singleWord) {
    message = "I need two words.";
    error = true;
  }

  if (!vb && ob) {
    message = "You can't \"".concat(myInput.toUpperCase(), ".\"");
  }

  if (!vb && !ob) {
    message = "You don't make sense.";
  }

  if (vb && ob.portable && ob.location != "player") {
    message = "You don't have \"".concat(noun.toUpperCase(), ".\"");
  } // RUN THE VERB SUBROUTINE


  if (!error) {
    // Candle slowly burns down if lit
    if (flags.candleLit) {
      flags.lightLevel--;
    }

    verbSubroutine(verb, noun, vb, ob);
  } // POST VERB MESSAGES
  // Candle power


  if (flags.candleLit && flags.lightLevel === 30) {
    message += "<br>Your candle has melted down to half its original size.";
  }

  if (flags.candleLit && flags.lightLevel > 1 && flags.lightLevel < 13) {
    message += "<br>Your candle is waning!";
  }

  if (flags.candleLit && flags.lightLevel > 9 && flags.lightLevel < 13) {
    message += " <em>Extinguish</em> it if you want to save it for later.";
  }

  if (flags.lightLevel == 1) {
    message += "<br>Your candle has gone out!";
    flags.candleLit = false;
    flags.lightLevel = 0;
    objects["candle"].location = null;
  } // Darkness effects


  if (currentRoom.darkness && !flags.candleLit) {
    flags.encroachingDarkness++;

    if (flags.encroachingDarkness > 1 && flags.encroachingDarkness < 4) {
      message += "<br>You hear something in the darkness!";
    }

    if (flags.encroachingDarkness >= 4 && flags.encroachingDarkness < 6) {
      message += "<br>You hear a terrifying groan. There is definitely something in the room with you!";
      snd.groan.play();
    }

    if (flags.encroachingDarkness >= 6) {
      death("A slimy appendage grabs you from out of the darkness and wraps itself around your neck!<br><br>You are helpless and filled with a sense of unspeakable terror as the creature squeezes the life out of you.");
      return;
    }
  }

  if (currentRoom.darkness && flags.candleLit) {
    flags.encroachingDarkness = 0;
  } // Water effects


  if (currentRoom.water && !flags.inBoat) {
    flags.sinking++;
    message += "<br>You are sinking in the bog!";

    if (flags.sinking > 3) {
      death("Flailing and struggling, you sink deeper and deeper into the sticky bog. Despite your efforts, the water envelops you.");
      return;
    }

    if (flags.sinking === 3) {
      message += " Do something, quick!";
    }
  } // Sinking statue


  if (flags.sinkingStatue) {
    flags.sinkingStatue++;
  }

  if (flags.sinkingStatue < 8 && flags.sinkingStatue > 5) {
    message += " Hurry, get the statue!";
  }

  if (flags.sinkingStatue >= 8) {
    death("The statue finally sinks below the surface. Moments later a huge blast of energy from deep under the water overturns the boat. During the ruckus, something hard slams you in the head. You regain consciousness only to find yourself pinned under the water by a sinister ghoul.");
    return;
  } // House is in endGame mode


  if (flags.endGame > 0 && !isRoom("finalRoom") && !isRoom("exit")) {
    flags.endGame = flags.endGame + 1;

    if (flags.endGame % 7 === 0) {
      shakeDisplay();
      flags.screamVolume = flags.screamVolume + .07 < 1 ? flags.screamVolume + .07 : 1;
      snd.scream.sound.volume = flags.screamVolume;
      snd.scream.play();
      var endGameMessages = ["Anger emanates from the mansion.", "You think you are being followed!", "You feel a sinister presence."];
      var endGameMessage = endGameMessages[Math.floor(Math.random() * endGameMessages.length)];
      message += " ".concat(endGameMessage);
    }
  } // Ghoul Effects


  if (currentRoom.rid === "finalRoom") {
    flags.ghoulProgress++;

    switch (flags.ghoulProgress) {
      case 3:
        message += "<br><br>The ghoul lumbers towards you!";
        break;

      case 4:
        message += "<br><br>The ghoul continues to move towards you!";
        break;

      case 5:
        message += "<br><br>The ghoul attacks but you manage to jump out of the way, positioning yourself between the monster and the gate. <em>The gate is clear!</em>";
        rooms["finalRoom"].exits.s = "exit";
        rooms["finalRoom"].description = "As you reach the iron gate, a rotting, child-sized ghoul hobbles onto the path. Its sunken eyes immediately focus on you and it starts to amble forward. You stumble and your heart races with terror. The ghoul is blocking all exits except through the gate to the south!";
        break;

      case 6:
        message += "<br><br>The ghoul hisses and takes a swipe at your face!";
        break;

      case 7:
        message += "<br><br>The ghoul spits a dark spray of ooze towards your face. You dodge it just in the nick of time. That was too close, get out of here, quick!!";
        break;

      case 8:
        snd.laugh.play();
        death("Moving much quicker than you thought possible, the ghoul tackles you to the ground. You struggle and fight but it's too little, too late. Teeth sink into your flesh and your veins fill with the dark ooze. The last thing you see before your life is completely drained is the ghoulish child stumbling away carrying all your treasures with him back into the mansion.");
        return;
    }
  } // Increment turns


  if (incrementTurn) {
    turns++;
  }

  if (getMaxScore() === checkScore() && flags.endGame === 0) {
    triggerEndGame();
  } // Fade the helper placeholder text after a few turns


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
  for (var obj in verbs) {
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
  for (var obj in objects) {
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


function verbSubroutine(verb, noun, vb, ob) {
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
  vb.action(noun, ob);
} // ===== CHECKING OBJECT/ROOM STATUSES =====

/**
 * Check if the object is in room or with player
 * @param {object|string} obj The objects{} item to be anaylized
 * @returns boolean
 */


function objectInRange(obj) {
  if (typeof obj === "string") {
    obj = getObject(obj);
  }

  if (obj.location == currentRoom.rid || obj.location == "player" || obj.omnipresence) {
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


function nounCheck(noun, nounArray) {
  return nounArray.includes(noun);
} // ===== SCORING =====

/**
 * Counts all the scorable objects held by the player.
 * @returns {number}
 */


function checkScore() {
  var score = 0;

  for (var key in objects) {
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
  var maxScore = 0;

  for (var key in objects) {
    if (objects[key].score) {
      maxScore += objects[key].score;
    }
  }

  return maxScore;
}

function introText() {
  var myIntro = "\"Ghastly cries and blood curdling screams.\" Yeah, right. They were just a couple two-bit vandals bragging about spraying painting their nonsense on that old abandoned house at the edge of the forest. What would they know about spirits and ghosts?<br><br>Whatever it actually was that frightened them away, you didn't care. You were more interested in what they had to say about the shiny things they spied through the windows.<br><br>A deserted mansion left untouched for decades filled with goodness knows how many unclaimed treasures. That was all you needed. So here you are under the cover of darkness, making your way up the walkway towards the iron gate at the front of the mansion...";
  displayOverlay(myIntro);
  $continueBtn.classList.remove('is-first-screen');
  $continueBtn.innerHTML = "[ Click to Continue ]";
} // ===== END GAME FUNCTIONS ======

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
  prnt("HAUNTED HOUSE: REMASTERED");
  prnt("<span class=\"hh-divider\">---------------------------------------------<br></span>");
  prnt("<span class=\"message\">".concat(message, "</span>"));
  prnt("<br><span class=\"room-name\">You Have Died!</span>");
  prnt("<br><span class=\"hh-divider\">---------------------------------------------<br></span>");
  prnt("You took <em>".concat(turns, "</em> turns before meeting your demise.<br>"));
  prnt("Your final score is: <em>".concat(checkScore(), "/").concat(getMaxScore() + 1, "</em>"));
  $restartBtn.classList.remove('is-hidden');
}
/**
 * Game end routine if player wins.
 */


function victory() {
  $inputZone.remove();
  cls();
  prnt("HAUNTED HOUSE");
  prnt("<span class=\"hh-divider\">---------------------------------------------<br></span>");
  prnt("<span class=\"message\">You race through the gate and down the path with treasures in hand! The hissing cries of the ghoul fade in the distance and you promise yourself never to return again. Congratulations, you've won the game!</span><br>");
  prnt("Your final score is: <em>".concat(checkScore() + 1, "/").concat(getMaxScore() + 1, "</em><br>"));
  var messages = ["Bask in the glory of your victory, you've earned it!", "Report thy feat to Lord British. After which, Lord British will probably report YOU to the local authorities.", "You've earned so many points! Don't spend them all in one place.", "So many treasures, you can't help but think of all the Antiques Roadshow fame you will soon accrue!", "All in a day's work for a master treasure hunter!"];
  var rnd = Math.floor(Math.random() * messages.length);
  prnt("".concat(messages[rnd]));
  prnt("<br>---------------------------------------------<br>");
  prnt("You took <em>".concat(turns, "</em> turns to complete the adventure.<br>"));
  prnt("<span class=\"message\">This \"remastered\" version of <em>Haunted House</em> was written by <em>Robert Wm. Gomez</em>. If you enjoy it drop me a line on Twitter <a href=\"https://twitter.com/robertgomez\" target=\"blank\" rel=\"noopener noreferrer\"><em>@robertgomez</em></a> or visit my website <a href=\"http://robertgomez.org\" target=\"blank\" rel=\"noopener noreferrer\"><em>robertgomez.org</em></a>.</span>");
  snd.music.stop();
  snd.fanfare.play();
  $restartBtn.classList.remove('is-hidden');
} // ===== EVENT LISTENERS =====

/**
 * Trigger user input parsing
 */


$inputForm.addEventListener('submit', function (evt) {
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
  $screen.classList.add('shake'); // void $screen.offsetWidth is a hack to reset CSS animation

  setTimeout(function () {
    $screen.classList.remove('shake');
    void $screen.offsetWidth;
  }, 1000);
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
    if (evt.keyCode == '27' || evt.keyCode == '13' || evt.keyCode == '32') {
      // ESC or Return
      if ($continueBtn.classList.contains('is-first-screen')) {
        introText();
        return false;
      }

      hideOverlay();
    }

    return false;
  }

  if (evt.keyCode == '38') {
    // Up arrow
    if (++historyCarat > history.length) {
      historyCarat = history.length;
    }

    $userInput.value = history[history.length - historyCarat];
  }

  if (evt.keyCode == '40') {
    // Down arrow
    if (--historyCarat < 1) {
      historyCarat = 1;
    }

    $userInput.value = history[history.length - historyCarat];
  }
}
/**
 * Reset button event
 */


$restartBtn.addEventListener('click', function (evt) {
  location.reload();
  evt.preventDefault();
});
/**
 * Overlay close button
 */

$continueBtn.addEventListener('click', function (evt) {
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
  if (!debug) return; //console.clear();

  console.log(currentRoom);
  cl("Turns: " + turns);
  cl("flags.lightLevel: " + flags.lightLevel);
  cl("score: " + totalScore);
  cl("sinking: " + flags.sinking);
  cl("Terror: " + flags.encroachingDarkness);
  cl("endGame: ".concat(flags.endGame));
}
/**
 * Initialize the game
 * @param {string} startRoom Starting room id
 * @param {array} carrying List of strings of objects player is carrying
 * @param {array} inRoom Objects to be placed in the starting room
 */


function init(startRoom, carrying, inRoom) {
  // Initialize game data objects
  // Set the machine name of all the rooms to .rid for easy reference
  for (var room in rooms) {
    rooms[room].rid = room;
  }

  for (var key in verbs) {
    verbs[key].name = key;
  }

  for (var _key2 in objects) {
    objects[_key2].id = _key2;

    if (!objects[_key2].name) {
      objects[_key2].name = _key2;
    }
  }

  currentRoom = rooms[startRoom];

  if (carrying) {
    for (var index in carrying) {
      objects[carrying[index]].location = "player";
    }
  }

  if (inRoom) {
    for (var _index in inRoom) {
      objects[inRoom[_index]].location = startRoom;
    }
  }

  display();
  $userInput.focus();
  $userInput.select();
} // INITIALIZE GAME


var debug = false;
verbs["help"].action();
init("pathThroughIronGate", [], []);

/***/ })
/******/ ]);
//# sourceMappingURL=Haunted-House-dist.js.map