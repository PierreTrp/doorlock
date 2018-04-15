//node v8.9.4 required
//do not use "wiring-pi", use "wiringpi-node"

//Developed on Linux raspberrypi 4.14.33-v7+ #1109 SMP Tue Apr 10 17:28:38 BST 2018 armv7l GNU/Linux (8 Jessie)


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
wpi.pinMode(configPin, wpi.INPUT);
wpi.pullUpDnControl(configPin, wpi.PUD_UP);
wpi.wiringPiISR(configPin, wpi.INT_EDGE_BOTH, function() {
    if (wpi.digitalRead(configPin)) {
        console.log('Manual button pushed');
    }
});


