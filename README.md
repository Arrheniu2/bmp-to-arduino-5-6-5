# bmp-to-arduino-5-6-5
Program to convert regular BMP into an array of bytes of 16Bit in RGB 5-6-5 to use in flash memory of an arduino program and display with Adafruit_ST7735 library


How to use:

npm install

node index.js

The program will take every bmp file in the current folder and convert it to an array of bytes in RGB 5-6-5 format, the output is a file called imagenes.h with each bmp as a variable called like the filename of the bmp

Example output:

static const uint16_t PROGMEM filename [] = {0x0 , 0x0 , 0x0 , 0x0 , 0x0 , 0x0 , 0$
0x0 , 0xffbf , 0xffbe , 0xffbe , 0xf7be , 0xef7e}

Then you can use the .h file in your arduino project, just add this line:

#include "imagenes.h"

and display it :

Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_RST);
tft.drawRGBBitmap(x,y,filename,sizex,sizey);
