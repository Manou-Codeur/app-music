import components from './bass';
const myInput = document.querySelector(components.input);

export function getSoundValue () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;

        myInput.value = transcript;
        tst('You have just said' + transcript);
    }

    recognition.start();
}

function tst (msg) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 0.5;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
} 