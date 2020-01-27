/**
 * This file contains scripts that enhance the layout display.
 * This code does not affect the game play.
 */

const $btnSmaller = document.getElementById('btnSmaller');
const $btnBigger = document.getElementById('btnBigger');
const $btnFontToggle = document.getElementById('btnFonts');
const $html = document.querySelector('html');
let htmlFontSize = 16;

//$html.style.fontSize = htmlFontSize + "px";

$btnSmaller.addEventListener('click', function(evt){
	evt.preventDefault();
	if (--htmlFontSize < 8) {
		htmlFontSize = 8;
	}
	$html.style.fontSize = htmlFontSize + "px";
});

$btnBigger.addEventListener('click', function(evt){
	evt.preventDefault();
	if (++htmlFontSize > 36) {
		htmlFontSize = 36;
	}
	$html.style.fontSize = htmlFontSize + "px";
});

$btnFontToggle.addEventListener('click', function(evt){
	evt.preventDefault();
	document.querySelector('body').classList.toggle('alt-font');
});