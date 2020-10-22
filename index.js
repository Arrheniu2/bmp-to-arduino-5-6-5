var fs = require('fs');
var bmp = require("bmp-js");
const path = require('path');


fs.readdir(".", function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        if(path.extname(file) == ".bmp"){
                console.log(obtenerCadenaDeFichero(file));
        }

    });
});

function obtenerCadenaDeFichero(f){
  var bmpBuffer = fs.readFileSync(f);
  var bmpData = bmp.decode(bmpBuffer);

  var buf = bmpData.data;
  var nombreImagen =  f.replace(".bmp","");
  return obtenerCadenaDeBuffer(buf,nombreImagen);
}

function pad(my_string, length) {

    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}

function  obtenerCadenaDeBuffer(buf, f){
  var pixel = {};
  var salida = "static const uint16_t PROGMEM "+f+" [] = {";
  var j=0;
  for(var i =0;i<buf.length;i=i+4){
        j++;
        pixel.A = buf.readUIntLE(i,1);
        pixel.B = buf.readUIntLE(i+1,1);
        pixel.G = buf.readUIntLE(i+2,1);
        pixel.R = buf.readUIntLE(i+3,1);
        salida+= colorArduino(pixel);
        if((i+4)<buf.length){
                salida+=" , ";
        }
        if(j>10){
                salida+="\n";
                   j=0;
        }
  }
  salida+=" };\n";
  return salida;
}


function colorArduino(pixel){
   var b = pad(pixel.R.toString(2),8).substring(0,5)+ pad(pixel.G.toString(2),8).s$
   var ret = "0x"+parseInt(b, 2).toString(16);
   return ret;

}

