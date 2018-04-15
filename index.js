//node v8.9.4 required
//do not use "wiring-pi", use "wiringpi-node"


var mfrc522 = require("MFRC522-node");

var Callback = function(){

    this.onStart = function(){
        console.log('onStart');
    };

    this.onUid = function(uid){
        console.log('onUid');
        console.log(uid);
    };

    this.onExit = function(){
        console.log('onExit');
    };
};
mfrc522.start( new Callback() );




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
        if (started === false) {
            started = true;
            clock = setTimeout(handleButton, 500);
        }
    }
    else {
        started = false;
        clearTimeout(clock);
    }
});

function handleButton() {
    if (wpi.digitalRead(configPin)) {
        console.log('OK');
    }
}



