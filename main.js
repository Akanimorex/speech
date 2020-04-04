

const speak = () =>{
    let form = document.querySelector('#voice-form');
    let speech = document.querySelector('#speech');
    const voiceSelect = document.querySelector('#voices');
    let voices;
    let currentVoice;
    const main = document.getElementsByTagName('main')[0];

    const populateVoices =()=>{
        const availableVoices = speechSynthesis.getVoices();
        voiceSelect.innerHTML='';
        availableVoices.forEach(voice=>{
            const option = document.createElement('option');
            let optionText = `${voice.name} (${voice.lang})`;
            if (voice.default){
                optionText +='[default]';
                if(typeof currentVoice == 'undefined'){
                    currentVoice= voice;
                    option.selected = true;
                }
            }
            if (currentVoice == voice){
                option.selected = true;
            }
            option.textContent = optionText;
            voiceSelect.appendChild(option);
        });
        voices = availableVoices;
    }

    populateVoices();
    speechSynthesis.onvoiceschanged = populateVoices;

    voiceSelect.addEventListener('change', event=>{
        const selectedIndex = event.target.selectedIndex;
        currentVoice = voices[selectedIndex];
    });


    form.addEventListener('submit', event =>{
        event.preventDefault();
        const toSay = speech.value.trim();
        const utterrance = new SpeechSynthesisUtterance(toSay);
        utterrance.voice = currentVoice;


        utterrance.addEventListener('start',()=>{
            main.classList.add('speaking');
        });
        utterrance.addEventListener('end', ()=>{

            main.addEventListener('animationiteration', ()=>{
                main.classList.remove('speaking'),
                {once:true}

        })
        speechSynthesis.speak(utterrance);
        speech.value = '';

    });
};




window.addEventListener('DOMContentLoaded',speak)