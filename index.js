//node v8.9.4 required
//do not use "wiring-pi", use "wiringpi-node"

//BUGS &  SOLUTIONS :
//Hardware problems > edit the package who use wiring-pi and put wiringpi-node in the require instead
//Build error > change node version to v8.9.4

//Developed on Linux raspberrypi 4.14.33-v7+ #1109 SMP Tue Apr 10 17:28:38 BST 2018 armv7l GNU/Linux (8 Jessie)


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
        openDoor();
    }
});



/////////////////////////////////////////////// SERVO CONTROL
var Gpio = require('pigpio').Gpio;
var motor = new Gpio(17, {mode: Gpio.OUTPUT});

function openDoor() {

    console.log('Opening door');
    motor.servoWrite(1000);

    setTimeout(function() {

        console.log('Closing door automatically after 3 sec (we will improve this later and close the door only after contact is made with the wall');
        closeDoor();
    },3000);
}


function closeDoor() {
    motor.servoWrite(2000);
}




/*
setInterval(function(){


    if(motor.getServoPulseWidth() == 1000) {
        motor.servoWrite(2000);
    }
    else {
        motor.servoWrite(1000);
    }

}, 1000);

*/


/////////////////////////////////////////////// RFID READER
//https://pimylifeup.com/raspberry-pi-rfid-rc522/

var allowedRFID = {
    '137,58,84,163':true
}

var mfrc522 = require("MFRC522-node");
var RFID = function(){

    this.onStart = function(){
        console.log('RFID started');
    };

    this.onUid = function(uid){
        console.log('RFID detected: ' + uid);

        if(allowedRFID[uid] != undefined && allowedRFID[uid]) {
            openDoor();
        }
        else{
            console.log('This RFID is not allowed in our database');
        }

    };

    this.onExit = function(){
        console.log('RFID exited');
    };
};

mfrc522.start( new RFID() );
