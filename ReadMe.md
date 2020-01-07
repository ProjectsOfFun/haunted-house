# Haunted House
This my JavaScript port of the game _Haunted House_ from the book _Write You Own Adventure Programs For Your Microcomputer_ by Jenny Tyler and Les Howarth

## Versions
The primary version of the game is `html/Haunted-House.html`. This is a re-imagined version of the original game. The basic structure and map remains the same but I have added more robust text descriptions and many gameplay enhancements.

The code is pre-compiled using the excellent Prepros.io app. If you want to torture yourself, the main JavaScript source files can probably be compiled with command line versions of Babel and Sass. The only Prepros specific bits are the includes at the top:

```
//@prepros-prepend ...
//@prepros-append ...
```
They are simply a means of concatenating all the .js files into a single file. You're clever. I'm sure you and your big command-line loving brain can figure out a workaround.

### Early Versions
In the `html/` directory I have also included two earlier versions of my code. Both completely playable and more accurately emulate the original program.

## Applesoft Source Code
There is also a folder called `Applesoft/` which contains the original Applesoft BASIC code of _Haunted House_. It's not exactly 100% accurate, as I made 1 or 2 modifications like changing "TAKE" to "GET". You can paste the code into an emulator if you are interested in playing it (SHIFT+INS in AppleWin). A disk image of the game is also included.

Robert Gomez
http://robertgomez.org