let puppy = document.getElementById("puppy");
let cheetah = document.getElementById("cheetah");
let panda = document.getElementById("panda");
let squirrel = document.getElementById("squirrel");
let meerkat = document.getElementById("meerkat");


var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'en-US';
recognition.interimResults = false;
// recognition.maxAlternatives = 5;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const button = document.getElementById("speakButton");

const speakMessage = () => {
    if (button.innerHTML === "Speak") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        recognition.start();
        // Change button value to "Stop" once clicked
        button.innerHTML = "Stop";

    } else if (button.innerHTML === "Stop") {
        recognition.stop();
        button.innerHTML = "Speak";
    }  
}

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

recognition.onresult = function(event) {
    var message = event.results[0][0].transcript;
    if (message === "puppy") {
        ctx.drawImage(puppy, 0, 0, 300, 200);

    } else if (message === "cheetah") {
        ctx.drawImage(cheetah, 0, 0, 300, 200);

    } else if (message === "panda") {
        ctx.drawImage(panda, 0, 0, 300, 200);
        
    } else if (message === "squirrel") {
        ctx.drawImage(squirrel, 0, 0, 300, 200);
        
    } else if (message === "meerkat") {
        ctx.drawImage(meerkat, 0, 0, 300, 200);
        
    }
    
    else if (message === "help") {
        speak("Say the name of the object to see the object on the screen.");
    } else if (message === "about") {
        speak("Abdul-Azeez Akinyele, Copyright 2022.");
    } else {
        // Write unknown on canvas
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Unknown', 70, 50); 

        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('You said: ' + event.results[0][0].transcript, 70, 110);
    }
    console.log('You said: ', event.results[0][0].transcript);
}
