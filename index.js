//node v8.9.4 required
//do not use "wiring-pi", use "wiringpi-node"


/////////////////////////////////////////////// RFID READER
var mfrc522 = require("MFRC522-node");
var RFID = function(){

    this.onStart = function(){
        console.log('RFID started');
    };

    this.onUid = function(uid){
        console.log('RFID detected: ' + uid);
    };

    this.onExit = function(){
        console.log('RFID exited');
    };
};

mfrc522.start( new RFID() );



/////////////////////////////////////////////// MANUAL BUTTON
var wpi = require('wiringpi-node');

// GPIO pin of the button
var configPin = 7;

wpi.setup('wpi');
var started = false;
var clock = null;

wpi.pinMode(configPin, wpi.INPUT);
wpi.pullUpDnControl(configPin, wpi.PUD_UP);
wpi.wiringPiISR(configPin, wpi.INT_EDGE_BOTH, function() {

    if (wpi.digitalRead(configPin)) {
        console.log('Pushed');
    }
    /*
    if (wpi.digitalRead(configPin)) {
        if (started === false) {
            started = true;
            clock = setTimeout(handleButton, 500);
        }
    }
    else {
        started = false;
        clearTimeout(clock);
    }*/
});
/*
function handleButton() {
    if (wpi.digitalRead(configPin)) {
        console.log('Manual button pressed');
    }
}
*/


