# Haunted House: Remastered
This my JavaScript port/re-imagining of the game _Haunted House_ from the book _Write You Own Adventure Programs For Your Microcomputer_ by Jenny Tyler and Les Howarth. [Read the book online.](https://archive.org/details/Write_your_own_Adventure_Programs/mode/2up)

To simply play the game online and avoid all this source code nonsense, go to this url: http://projects.robertgomez.org/haunted-house

## Versions
The primary version of the game is `html/Haunted-House.html`. This is a re-mastered version of the original game from the book. The basic structure and map remains the same but I have added more robust text descriptions, game play enhancements and other surprises.

The JavaScript, CSS, and HTML is pre-compiled using the excellent Prepros.io app. If you want to torture yourself, the source files can probably be compiled with command line versions of Babel, Sass, and whatnot. The only Prepros specific bits in the code are the includes at the top of the JavaScript:

```
//@prepros-prepend ...
//@prepros-append ...
```
They are simply a means of concatenating all the .js files into a single file. You're clever. I'm sure you and your big command-line loving brain can figure out a workaround. For me, I'm Prepros all the way. Drop the root folder of this project into the Prepros app window and everything will just work with no extra set-up!

### Early Versions
In the `html/` directory I have also included two earlier versions of my code. Both completely playable and more accurately emulate the original program. Read the ReadMe.md files in those directories for details.

## Applesoft Source Code
There is also a folder called `Applesoft/` which contains the original Applesoft BASIC code of _Haunted House_. It's not exactly 100% accurate, as I made 1 or 2 modifications such as changing "TAKE" to "GET". You can paste the code into an emulator if you are interested in playing it (SHIFT+INS in AppleWin). A disk image of the game is also included to make your retro-computing life easier.

Robert Gomez  
web: http://robertgomez.org  
Twitter: @robertgomez