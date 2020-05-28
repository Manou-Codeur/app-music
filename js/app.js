import "../sass/_main.scss";
import "../sass/_nav-bar.scss";
import "../sass/_search-bar.scss";
import "../sass/_content.scss";

import components from './bass';
import * as View from './view';
import * as Modal from './modal';

const state = {};

document.querySelector(components.input).addEventListener('input', liveSearch);
document.addEventListener('keypress', e => {if (e.keyCode === 13) {
    whenEnter();
    document.addEventListener('click', playANDpause);   
}})
document.querySelector(components.voiceIcon).addEventListener('click', soundReco); 


async function liveSearch () {
    //1. get the input from the view
    let inputValue = View.getInput();
    
    //2. ask the model to fetch and return a list of 5 els by passing the input gotten as param and display these els in the list of recomand in UI 


    //4. get the value chosen by the user (use another function that handle an click event in all that recomand els displayed)
    //5. pass this value as param to modal and return a list of els 
    //6. display these els to the UI using function from the view 
};

async function whenEnter () {
 
    //1. get the input from the view then clear it
    let inputValue = View.getInput().trim();
    View.clearInput();
    
    //clear the page
    View.clearUI();
    
    //2. pass this value as param to modal and return a list of els then display these els to the UI using function from the view
    if (inputValue.trim()) {
        state.search = new Modal.generateData(inputValue);
        try {
            await state.search.getData();
            View.addItemToUI(state.search.result);
        }catch (err) {
            console.log(err);
        }
    }else {
        alert('filled not accepted!')
    }
};


function soundReco () {
    //1. get the input from the view (use another module then import here)
    //2. pass this value as param to modal and return a list of els 
    //3. display these els to the UI using function from the view 
};


function playANDpause (e) {
    let el = e.target;

    if (el.className === 'pause-btn') {
        if (el.parentNode.parentNode.childNodes[1].paused) {
            el.src = "./img/round_pause_circle_filled_white_18dp.png";
            el.parentNode.parentNode.childNodes[1].play();
        } 
        else {
            el.src = "./img/play_circle_filled-24px.png";
            el.parentNode.parentNode.childNodes[1].pause();
        } 
    }
}