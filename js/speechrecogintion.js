const grammar = '#JSGF V1.0; grammar colors; public <color> = haut | bas | gauche | droite | droit ;'
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');

document.body.onclick = () => {
    recognition.start();
    console.log('Ready to receive a color command.');
}

recognition.onresult = (event) => {
    const color = event.results[0][0].transcript;
    diagnostic.textContent = `Result received: ${color}`;
    bg.style.backgroundColor = color;
}
