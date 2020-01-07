$(document).ready(function(){
	
var objectCount = 18,
	winner = false;

var verbs = new Array("HELP","CARRYING","GO","N","S","W","E","U","D","GET","TAKE","OPEN","LOOK","READ","SAY","DIG","SWING","CLIMB","LIGHT","UNLIGHT","SPRAY","USE","UNLOCK","LEAVE","DROP","SCORE");

var rooms = new Array("DARK CORNER","OVERGROWN GARDEN","BY LARGE WOODPILE","YARD BY RUBBISH","WEED PATCH","FOREST","THICK FOREST","BLASTED TREE","CORNER OF HOUSE","ENTRANCE TO KITCHEN","KITCHEN & GRIMY COOKER","SCULLERY DOOR","ROOM WITH INCHES OF DUST","REAR TURRENT ROOM","CLEARING BY HOUSE","PATH","SIDE OF HOUSE","BACK OF HALLWAY","DARK ALCOVE","SMALL DARK ROOM","BOTTOM OF SPIRAL STAIRCASE","WIDE PASSAGE","SLIPPERY STEPS","CLIFFTOP","CRUMBLING WALL","GLOOMY PASSAGE","POOL OF LIGHT","IMPRESSIVE VALTED HALLWAY","HALL BY THICK WOODEN DOOR","TROPHY ROOM","CELLAR WITH BARDED WINDOW","CLIFF PATH","CUPBOARD WITH HANGING COAT","FRONT HALL","SITTING ROOM","SECRET ROOM","STEEP MARBLE STAIRS","DINING ROOM","DEEP CELLAR WITH COFFIN","CLIFF PATH","CLOSET","FRONT LOBBY","LIBRARY OF EVIL BOOKS","STUDY WITH DESKS AND HOLE IN WALL","WEIRD COBWEBBY ROOM","VERY COLD CHAMBER","SPOOKY ROOM","CLIFF PATH BY MARSH","RUBBLE-STREWN VERANDAH","FRONT PORCH","FRONT TOWER","SLOPING CORRIDOR","UPPER GALERY","MARSH BY WALL","MARSH","SOGGY PATH","BY TWISTED RAILING","PATH THROUGH IRON GATE","BY RAILINGS","BENEATH FRONT TOWER","DEBRIS FROM CRUMBLING FACADE","LARGE FALLEN BRICKWORK","ROTTING STONE ARCH","CRUMBLING CLIFFTOP");

var exits = new Array("SE","WE","WE","SWE","WE","WE","SWE","WS","NS","SE","WE","NW","SE","W","NE","NSW","NS","NS","SE","WE","NWUD","SE","WSUD","NS","N","NS","NSE","WE","WE","NSW","NS","NS","S","NSE","NSW","S","NSUD","N","N","NS","NE","NW","NE","W","NSE","WE","W","NS","SE","NSW","E","WE","NW","S","SW","NW","NE","NWE","WE","WE","WE","NWE","NWE","W");

var objects = new Array('',"PAINTING","RING","MAGIC SPELLS","GOBLET","SCROLL","COINS","STATUE","CANDLESTICK","MATCHES","VACUUM","BATTERIES","SHOVEL","AXE","ROPE","BOAT","AEROSOL","CANDLE","KEY","NORTH","SOUTH","WEST","EAST","UP","DOWN","DOOR","BATS","GHOSTS","DRAWER","DESK","COAT","RUBBISH","COFFIN","BOOKS","XZANFAR","WALL","SPELLS");


var objectLocations = [999,46,38,35,50,13,18,28,42,10,25,26,4,2,7,47,60,43,32]

var flags = new Array(objects.length);
flags[2] = 1;
flags[17] = 1;
flags[18] = 1;
flags[23] = 1;
flags[26] = 1;
flags[28] = 1;

var carrying = new Array(objectCount),
	lightLevel = 60, // LL
	room = 57, // RM 57
	message = "OK"; // M$

$display = $('#hh-output');

function display() {
	$display.empty();
	prnt("HAUNTED HOUSE");
	prnt("-------------");
	prnt("YOUR LOCATION");
	prnt(rooms[room]);
	prnt("EXITS: " + splitExits(exits[room]) + "<br />");
	objectLocations.map(function(obj,i) {
		if (objectLocations[i] ==  room && flags[i] != 1) {
			prnt("YOU CAN SEE " + objects[i] + " HERE.");
		}
	});
	prnt("=============");
	prnt(message.toUpperCase());
	if (winner) {
		$('#hh-input').hide();
	}
	message = "WHAT";
	$('#hh-userInput').focus();
}

function splitExits(e) { // Adds punctuation to the exits display string
	var newExits = "";
	for (i=0; i<e.length; i++) {
		if (i === e.length - 1) {
			newExits += e.substring(i,i+1);
		} else if (i === e.length - 2) {
			newExits += e.substring(i,i+1) + " & ";
		} else {
			newExits += e.substring(i,i+1) + ", ";
		}
	}
	return newExits;
}

function prnt(text) {
	$display.html( $display.html().toString() + text + "<br>");
}

function parseInput(myInput) {
	myInput = $.trim(myInput);
	var verb = null,
		noun = null;
	for (i=0;i<myInput.length;i++) { // Parse verb and noun from input
		if (myInput.substring(i,i+1) === " " && !verb) {
			verb = myInput.substring(0,i);
			noun = $.trim(myInput.substring(i+1,myInput.length));
			break;
		} else if (myInput.indexOf(' ') < 0) { // One word input
			verb = myInput;
			noun = null;
			break;
		}
	}
		
	var vb;
	verbs.map(function(obj,i){
		if (verb == obj) {
			vb = i;
		}
	});

	var ob;
	objects.map(function(obj,i){
		if (noun == obj) {
			ob = i;
		}
	});

	if (noun && !ob) { //360 IF W$ > "" AND OB = 0 THEN M$ = "THAT'S SILLY!"
		message = "THAT'S SILLY!";
	}

	if (!noun) { //380 IF W$ = "" THEN M$ = "I NEED TWO WORDS"
		message = "I NEED TWO WORDS";
	}

	if (!vb && ob>-1) { //390 IF VB > V AND OB > 0 THEN M$ = "YOU CAN'T '" + Q$ + "'"
		message = "YOU CAN'T '" + myInput + "'"	;
	}

	if (!vb && !ob) { //400 IF VB > V AND OB = 0 THEN M$ = "YOU DON'T MAKE SENSE"
		message = "YOU DON'T MAKE SENSE";	
	}
	if (vb>-1 && (ob>-1 && ob<objectCount) && !carrying[ob]) {
		message = "YOU DON'T HAVE '" + noun + "'";
	}
	if (flags[26] == 1 && room==13 && Math.random()*3 <= 2 && vb != 20) {
		message = "BATS ATTACKING!";
	}
	if (room == 44 && Math.random() < .5 && flags[24] != 1) {
		flags[27] = 1;	
	}
	if (flags[0] == 1) {
		lightLevel--;
	}
	if (lightLevel < 1) {
		flags[0] = 0;	
	}
	
	verbSubroutine(verb,noun,vb,ob);

	if (lightLevel == 10) {
		message += "\<br\>YOUR CANDLE IS WANING!";
	}
	if (lightLevel == 1) {
		message += "\<br\>YOUR CANDLE IS OUT!";
	}
	
	display();
}

function verbSubroutine(verb,noun,vb,ob) {

	if (verb == "HELP") { // "HELP"	
		message = "WORDS I KNOW:\<br\>" + verbs.toString().replace(/,/g ,", ");
	} else if (verb == "CARRYING") { // CARRYING
		var inventory = "";
		carrying.map(function(obj,i){
			if (obj) {
				if (inventory.length > 0) {
					inventory += ", " + objects[i];
				} else {
					inventory += objects[i];	
				}
			}
		});
		if (!inventory) inventory = "Nothing.";
		message = "YOU ARE CARRYING:\<br\>" + inventory;
	} else if (verb == "GO" || verb == "N" || verb == "W" || verb == "S" || verb== "E" || verb == "U" || verb == "D") { // Go
	
		//640 D = 0
		//650 IF OB = 0 THEN D = VB - 3
		
		var direction;
		if (verb == "N" || (verb == "GO" && noun == "NORTH")) { //660 IF OB = 19 THEN D = 1
			direction = "N";	
		}
		if (verb == "S" || (verb == "GO" && noun == "SOUTH")) { //670 IF OB = 20 THEN D = 2
			direction = "S";	
		}
		if (verb == "W" || (verb == "GO" && noun == "WEST")) { //680 IF OB = 21 THEN D = 3
			direction = "W";	
		}
		if (verb == "E" || (verb == "GO" && noun == "EAST")) { //690 IF OB = 22 THEN D = 4
			direction = "E";	
		}
		if (verb == "U" || (verb == "GO" && noun == "UP")) { //700 IF OB = 23 THEN D = 5 //up
			direction = "U";	
		}
		if (verb == "D" || (verb == "GO" && noun == "DOWN")) { //710 IF OB = 24 THEN D = 6 // down
			direction = "D";	
		}
		if (room == 20 &&  direction == "U") { //720 IF RM = 20 AND D = 5 THEN D = 1
			direction = "N";
		}
		if (room == 20 && direction == "D") { //730 IF RM = 20 AND D = 6 THEN D = 2
			direction = "S";
		}
		if (room == 22 && direction == "D") { //740 IF RM = 22 AND D = 6 THEN D = 2
			direction = "S";
		}
		if (room == 22 && direction == "U") { //750 IF RM = 22 AND D = 5 THEN D = 3
			direction = "W";
		}
		if (room == 36 && direction == "D") { //760 IF RM = 36 AND D = 6 THEN D = 1
			direction = "N";
		}
		if (room == 36 && direction == "U") { //770 IF RM=36 AND D = 5 THEN D = 2
			direction = "S"
		}
		if (flags[14] == 1) {
			message = "CRASH! YOU FELL OUT OF THE TREE!";
			flags[14] = 0;
			return;
		}
		if (flags[27] == 1 && room == 52) {
			message = "THE GHOSTS WON'T LET YOU MOVE!";
			return;
		}
		if (room == 45 && carrying[1] == 1 && !flags[34]) {
			message = "A MAGICAL BARRIER TO THE WEST";
			return;
		}
		if ((room == 26 && !flags[0]) && (direction == "N" || direction == "E")) {
			message = "YOU NEED A LIGHT";
			return;
		}
		if (room == 54 && !carrying[15]) {
			message = "YOU'RE STUCK!";
			return;
		}
		if (carrying[15] && (room != 53 && room != 54 && room != 55 && room != 47)) {
			message = "YOU CAN'T CARRY A BOAT!";
			return;
		}
		if ((room > 26 && room < 30) && !flags[0]) {
			message = "TOO DARK TO MOVE";
			return;
		}
		
		if (exits[room].indexOf(direction) > -1) {
			switch (direction) {
				case "N":
					room -= 8;
					break;
				case "S":
					room += 8;
					break;
				case "W":
					room--;
					break;
				case "E":
					room++;
					break;
			}
			message = "OK";
			if (room == 41 && flags[23]) {
				exits[49] = "SW";
				message = "THE DOOR SLAMS SHUT!";
				flags[23] = 0;
			}
		} else if (direction) {
			message = "YOU CAN'T GO THAT WAY!";
		} else {
			message = "GO WHERE?";
		}
	} else if (verb == "GET" || verb == "TAKE") { // TAKE || GET
		if (ob > objectCount) {
			message = "I CAN'T GET " + noun;
			return;
		}
		if (objectLocations[ob] != room) { //985 IF L(OB) < > RM THEN M$ = "IT ISN'T HERE"
			message = "IT ISN'T HERE";
			return;
		}
		if (flags[ob]) { //990 IF F(OB) < > 0 THEN M$ = "WHAT " + W$ + "?"
			message = "WHAT " + noun + "?";
		}
		if (carrying[ob]) { //1000 IF C(OB) = 1 THEN M$ = "YOU ALREADY HAVE IT!"
			message = "YOU ALREADY HAVE IT!";
		}
		if (ob > 0 && objectLocations[ob] == room && !flags[ob]) { //1010 IF OB > 0 AND L(OB) = RM AND F(OB) = 0 THEN C(OB) = 1:L(OB) = 65:M$ = "YOU HAVE THE " + W$
			carrying[ob] = 1;
			objectLocations[ob] = 65;
			message = "YOU HAVE THE " + noun
		}
	} else if (verb == "OPEN") {
		if (room == 43 && (noun == "DRAWER" || noun == "DESK")) { //1030 IF RM = 43 AND (OB = 28 OR OB = 29) THEN F(17) = 0:M$ = "DRAWER OPEN"
			flags[17] = 0;
			message = "DRAWER OPEN";
		}
		if (room == 28 && noun == "DOOR") { //1040 IF RM = 28 AND OB = 25 THEN M$ = "IT'S LOCKED"
			message = "IT'S LOCKED";
		}
		if (room == 38 && noun == "COFFIN") {
			message = "THAT'S CREEPY";
			flags[2] = 0;	
		}
	} else if (verb == "LOOK") {
		if (noun == "COAT") {//1070 IF OB = 30 THEN F(18) = 0:M$ = "SOMETHING HERE!"
			flags[18] = 0;
			message = "SOMETHING HERE!";
		}
		if (noun == "RUBBISH") { //1080 IF OB = 31 THEN M$ = "THAT'S VERY DISGUSTING!"
			message = "THAT'S VERY DISGUSTING!";
		}
		if (noun == "DRAWER" || noun == "DESK") { //1090 IF (OB = 28 OR OB = 29) THEN M$ = "THERE IS A DRAWER"
			message = "THERE IS A DRAWER";
		}
		if (noun == "BOOKS" || noun == "SCROLL") { //1100 IF OB = 33 OR OB = 5 THEN GOSUB 1140
			verbSubroutine("READ",noun,vb,ob);
		}
		if (room == 43 && noun == "WALL") { //1110 IF RM = 43 AND OB = 35 THEN M$ = "THERE IS SOMETHING BEYOND.."
			message = "THERE IS SOMETHING BEYOND..";
		}
		if (noun == "COFFIN" && room == 38) {//1120 IF OB = 32 THEN GOSUB 1030
			message = "THAT'S CREEPY";
			flags[2] = 0;
		}
	} else if (verb == "READ") {
		if (room == 42 && noun == "BOOKS") { //1140 IF RM = 42 AND OB = 33 THEN M$ = "THEY ARE DEMONIC WORKS"
			message = "THEY ARE DEMONIC WORKS";
		}
		if ((noun == "MAGIC SPELLS" || noun == "SPELLS") && carrying[3] && !flags[34]) { //1150 IF (OB = 3 OR OB = 36) AND C(3) = 1 AND F(34) = 0 THEN M$ = "USE THIS WORD WITH CARE 'XZANFAR'"
			message = "USE THIS WORD WITH CARE 'XZANFAR'";
		}
		if (carrying[5] && noun == "SCROLL") { //1160 IF C(5) = 1 AND OB = 5 THEN M$ = "THE SCRIPT IS IN ALIEN TONGUE"
			message = "THE SCRIPT IS IN ALIEN TONGUE";
		}
	} else if (verb == "SAY") {
		message = "OK '" + noun + "'";
		if (carrying[3] && noun == "XZANFAR") {
			message = "*MAGIC OCCURS*";
			if (room != 45) { //1190 IF C(3) = 1 AND OB = 34 THEN M$ = "*MAGIC OCCURS*": IF RM < > 45 THEN RM = INT (64 * RND (1))
				room = Math.round(Math.random() * 64);	
			}
		}
		if (carrying[3] && noun == "XZANFAR" && room == 45) {
			flags[34] = 1;
		}
	} else if (verb == "DIG") { 
		if (carrying[12]) { // 1220 IF C(12) = 1 THEN M$ = "YOU MADE A HOLE"
			message = "YOU MADE A HOLE";
		}
		if (carrying[12] && room == 30) { // 1230 IF C(12) = 1 AND RM = 30 THEN M$ = "DUG THE BARS OUT":D$(RM) = "HOLE IN WALL":R$(RM) = "NSE"
			message = "DUG THE BARS OUT";
			exits[room] = "NSE";
			rooms[room] = "HOLE IN WALL";
		}
	} else if (verb == "SWING") { //1250 IF C(14) < > 1 AND RM = 7 THEN M$ = "THIS IS NO TIME TO PLAY GAMES"
		if (!carrying[14] && room == 7) {
			message = "THIS IS NO TIME TO PLAY GAMES";
		}
		if (noun == "ROPE" && carrying[14]) { //1260 IF OB = 14 AND C(14) = 1 THEN M$ = "YOU SWUNG IT"
			message = "YOU SWUNG IT";
		}
		if (noun == "AXE" && carrying[13]) { //1270 IF OB = 13 AND C(13) = 1 THEN M$ = "WHOOSH!!!"
			message = "WHOOSH!!!";
		}
		if (noun == "AXE" && carrying[13] && room == 43) { //1280 IF OB = 13 AND C(13) = 1 AND RM = 43 THEN R$(RM) = "WN":D$(RM) = "STUDY WITH SECRET ROOM" : M$ = "YOU BROKE THE THIN WALL"
			exits[room] = "WN";
			rooms[room] = "STUDY WITH SECRET ROOM";
			message = "YOU BROKE THE THIN WALL";
		}
	} else if (verb == "CLIMB") {
		if (noun=="ROPE" && carrying[14]) { //1300 IF OB = 14 AND C(14) = 1 THEN M$ = "IT ISN'T ATTACHED TO ANYTHING!"
			message = "IT ISN'T ATTACHED TO ANYTHING!";
		}
		if (noun=="ROPE" && carrying[14] && room == 7 && !flags[14]) { //1310 IF OB = 14 AND C(14) < > 1 AND RM = 7 AND F(14) = 0 THEN M$ = "YOU SEE A THICK FOREST AN CLIFF SOUTH" : F(14)=l : RETURN
			message = "YOU SEE A THICK FOREST AN CLIFF SOUTH";
			flags[14] = 1;
			return;
		}
		if (noun=="ROPE" && carrying[14] && room == 7 && flags[14]) { //1320 IF OB = 14 AND C(14) < > 1 AND RM = 7 AND F(14) = 1 THEN M$ = "GOING DOWN" : F(14) = 0
			message = "GOING DOWN";
			flags[14] = 0;
		}
	} else if (verb == "LIGHT") {
		if (noun == "CANDLE" && carrying[17] && !carrying[8]) {
			message = "IT WILL BURN YOUR HANDS";
		}
		if (noun == "CANDLE" && carrying[17] && !carrying[9]) {
			message = "NOTHING TO LIGHT IT WITH";
		}
		if (noun == "CANDLE" && carrying[17] && carrying[9] && carrying[8]) {
			message = "IT CASTS A FLICKERING LIGHT";
			flags[0] = 1;
		}
	} else if (verb == "UNLIGHT") {
		if (flags[0] == 1) {
			flags[0] = 0;
			message = "EXTINGUISHED";
		}
	} else if (verb == "SPRAY") {
		if (noun == "AEROSOL" && carrying[16]) {
			message = "HISSSS";
		}
		if (noun == "AEROSOL" && carrying[16] && flags[26]) {
			flags[26] = 0;
			message = "PFFT! GOT THEM";
		}
	} else if (verb == "USE") {
		if (noun == "VACUUM" && carrying[10] && carrying[11]) {
			message = "SWICHTED ON";
			flags[24] = 1;
		}
		if (flags[27] && flags[24]) {
			message = "WHIZZ- VACUUMED THE GHOSTS UP!";
			flags[27] = 0;
		}
	} else if (verb == "UNLOCK") {
		if (room == 43 && (noun == "DRAWER" || noun == "DESK")) {
			verbSubroutine("OPEN",noun,vb,ob);
			return;
		}
		if (room == 28 && noun == "DOOR" && !flags[25] && carrying[18]) {
			flags[25] = 1;
			exits[room] = "SEW";
			rooms[room] = "HUGE OPEN DOOR";
			message = "THE KEY TURNS!";
		}
	} else if (verb == "LEAVE" || verb == "DROP") {
		if (carrying[ob]) {
			carrying[ob] = 0;
			objectLocations[ob] = room; // MY NEW LINE, puts object back in world
			message = "DONE";
		}
	} else if (verb == "SCORE") {
		score = 0;
		carrying.map(function(obj,i){
			if (obj) {
				score++	
			}
		});
		message = "YOUR SCORE IS " + score;
		if (score == 17 && !carrying[15] && room != 57) {
			message = "YOU HAVE EVERYTHING\<br\>RETURN TO GATE FOR FINAL SCORE";
		}
		if (score == 17 && room == 57) {
			score = score * 2;
			message = "DOUBLE YOUR SCORE FOR REACHING HERE\<br\>YOUR SCORE=" + score;
			if (score > 18) {
				message += "\<br\>WELL DONE,YOU FINISHED THE GAME!"	
			}
			winner = true;
		}

//1580 INPUT "PRESS RETURN TO CONTINUE";Q$
	}
}

function checkScore() {
	score = 0;
	carrying.map(function(obj,i){
		if (obj) {
			score++	
		}
	});
	if (score == 17 && room == 57) {
		score = score * 2;
		message = "DOUBLE YOUR SCORE FOR REACHING HERE\<br\>YOUR SCORE=" + score;
		if (score > 18) {
			message += "\<br\>WELL DONE,YOU FINISHED THE GAME!"	
		}
		winner = true;
	}
	return score;
}

function logData(verb,noun,vb,ob) {
	console.log('Room: ' + room);
	console.log('Verb: ' + verb + " #" + vb);
	console.log('Noun: ' + noun + " #" + ob);
	console.log('Object Location: ' + objectLocations[ob]);
	console.log('Objects: ' + objects[ob]);
	console.log('Object Number: ' + ob);
	console.log('Carrying: ' + carrying[ob]);
	console.log('Light: ' + flags[0]);
}

$('#hh-input form').submit(function(evt){
	parseInput($('#hh-userInput').val().toUpperCase());
	if (checkScore()>=17 && room == 57) {
		parseInput("SCORE");	
	}
	$('#hh-userInput').val('');
	evt.preventDefault();
});

display();

});