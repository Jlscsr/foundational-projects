const buttons = document.querySelectorAll('.button-container > button');
// CHANGE COLOR DEPENDING ON THEIR COLOR NAME
buttons.forEach(button => {
    if(button.textContent.includes('RED')){
        button.style.color = 'red';
    }

    if(button.textContent.includes('BLUE')){
        button.style.color = 'blue';
    }

    if(button.textContent.includes('GREEN')){
        button.style.color = 'green';
    }

    if(button.textContent.includes('YELLOW')){
        button.style.color = 'yellow';
    }

    if(button.textContent.includes('ORANGE')){
        button.style.color = 'orange';
    }

    if(button.textContent.includes('PINK')){
        button.style.color = 'pink';
    }

    if(button.textContent.includes('GRAY')){
        button.style.color = 'gray';
    }

    if(button.textContent.includes('WHITE')){
        button.style.color = 'white';
    }

    if(button.textContent.includes('BLACK')){
        button.style.color = 'black';
    }


})

const colorDisplayer = document.querySelector('#color-diplay');
const colorNameDisplayer = document.querySelector('p');

const redColorPanel = () =>{
    colorDisplayer.style.background = 'red';
    colorNameDisplayer.innerText = 'RED';
    colorNameDisplayer.style.color = 'black';

};

const blueColorPanel = () =>{
    colorDisplayer.style.background = 'blue';
    colorNameDisplayer.innerText = 'BLUE';
    colorNameDisplayer.style.color = 'black';

};

const greenColorPanel = () =>{
    colorDisplayer.style.background = 'green';
    colorNameDisplayer.innerText = 'GREEN';
    colorNameDisplayer.style.color = 'black';

};

const yellowColorPanel = () =>{
    colorDisplayer.style.background = 'yellow';
    colorNameDisplayer.innerText = 'YELLOW';
    colorNameDisplayer.style.color = 'black';

};

const orangeColorPanel = () =>{
    colorDisplayer.style.background = 'orange';
    colorNameDisplayer.innerText = 'ORANGE';
    colorNameDisplayer.style.color = 'black';

};

const pinkColorPanel = () =>{
    colorDisplayer.style.background = 'pink';
    colorNameDisplayer.innerText = 'PINK';
    colorNameDisplayer.style.color = 'black';

};

const grayColorPanel = () =>{
    colorDisplayer.style.background = 'gray';
    colorNameDisplayer.innerText = 'GRAY';
    colorNameDisplayer.style.color = 'black';

};

const whiteColorPanel = () =>{
    colorDisplayer.style.background = 'white';
    colorNameDisplayer.innerText = 'WHITE';
    colorNameDisplayer.style.color = 'black';

};

const blackColorPanel = () =>{
    colorDisplayer.style.background = 'black';
    colorNameDisplayer.innerText = 'BLACK';
    colorNameDisplayer.style.color = 'white';

};

