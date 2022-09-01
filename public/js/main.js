class TypeWriter {
    constructor(textElement, words, wait = '2000', speed = '200') {
        this.element = textElement;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.speed = parseInt(speed, 10);
        this.text = '';
        this.wordIndex = 0;
        this.type();
        this.isDeleting = false;
    }

    type(){
        let current = this.wordIndex % this.words.length;
        let fullText = this.words[current];

        if(this.isDeleting){
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        let typeSpeed = this.speed;
        if(this.isDeleting && this.text.length !== fullText.length - 1){
            typeSpeed /= 2;
        } else if (this.isDeleting && this.text.length === fullText.length - 1){
            let deleteWaitSpeed = 300;
            typeSpeed = deleteWaitSpeed;
        }

        if(!this.isDeleting && this.text === fullText){
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.text === ''){
            typeSpeed = this.speed * 3;
            this.isDeleting = false;
            this.wordIndex++;
        }

        this.element.innerText = this.text;

        setTimeout(() => this.type(), typeSpeed);
    }
}


document.addEventListener('DOMContentLoaded', init, false);
window.addEventListener('load', init, false);

function init() {
    let typingElement = document.getElementById('hero_greeting');
    let words = JSON.parse(typingElement.getAttribute('data-words'));
    let wait = JSON.parse(typingElement.getAttribute('data-wait'));
    let speed = JSON.parse(typingElement.getAttribute('data-speed'));

    new TypeWriter(typingElement, words, wait, speed);
}