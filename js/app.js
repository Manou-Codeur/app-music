import "../sass/_main.scss";

import components from './bass';
import * as View from './view';
import * as Modal from './modal';
import {getSoundValue} from './soundReco';

const state = {};

components.input.addEventListener('keyup', liveSearch);
document.addEventListener('keypress', e => {
    if (e.keyCode === 13) { 
    whenEnter();
    document.addEventListener('click', playANDpause);  
    document.addEventListener('click', likeBtnClicked); 
    }
});
components.voiceIcon.addEventListener('click', soundReco); 
document.addEventListener('click', () => View.hideSuggestBox());
addEventListener('load', firstTimeToPage);
components.popularBtn.addEventListener('click', popularRequested);
components.favorisBtn.addEventListener('click', favorisRequested);

async function liveSearch () {
    //1. get the input from the view
    View.displayLoader();
    const inputValue = View.getInput();

    //2. ask the model to fetch and return a list of 5 els by passing the input gotten as param and display these els in the list of recomand in UI 
    if (inputValue.trim()) {
        state.searchh = new Modal.generateData(inputValue);
        try {
            await state.searchh.getData();
            View.displaySuggest(state.searchh.result);
            View.hideLoader();
            showResultUI();
        }catch (err) {
            console.log(err);
        }
    }else {
        View.hideSuggestBox();
        View.hideLoader();
    }
};

function showResultUI () {
    components.suggestBar.addEventListener('click', (e) => {
        components.input.value = e.target.childNodes[1].nodeValue;
        View.hideSuggestBox();
        whenEnter();
        document.addEventListener('click', playANDpause); 
        document.addEventListener('click', likeBtnClicked);
    });
}

async function whenEnter () {
    //1. get the input from the view then clear it
    const inputValue = View.getInput().trim();
    View.clearInput();
    View.hideLoader();
    View.clearUI();
    View.displayMainLoader();
    
    //2. pass this value as param to modal and return a list of els then display these els to the UI using function from the view
    if (inputValue.trim()) {
        state.searchh = new Modal.generateData(inputValue);
        try {
            await state.searchh.getData();
            View.hideMainLoader();
            View.addItemToUI(state.searchh.result);
        }catch (err) {
            console.log(err);
        }
    }else {
        alert('filled not accepted!')
    }
};

function soundReco () {
    getSoundValue();
    const timeIntrvl = setInterval(() => {
        if (components.input.value !== "") {
            whenEnter();
            clearInterval(timeIntrvl);
        }
    }, 1000);
    document.addEventListener('click', playANDpause);
};

function playANDpause (e) {
    const el = e.target;

    if (el.className === 'pause-btn') {
        if (el.parentNode.parentNode.childNodes[1].paused) {
            el.src = "./img/img/round_pause_circle_filled_white_18dp.png";
            el.parentNode.parentNode.childNodes[1].play();
        } 
        else {
            el.src = "./img/img/play_circle_filled-24px.png";
            el.parentNode.parentNode.childNodes[1].pause();
        } 
    }
};

function likeBtnClicked (e) {
    const el = e.target;
    if (el.classList.contains('like-btn')) {
        if (!state.likedItem) {
            state.likedItem = new Modal.likedSong();
            state.likedItem.readStorage();
        } 

        if (!el.classList.contains('clicked')) {
            el.classList.add('clicked');
            state.likedItem.addLiked(el.parentNode.parentNode.dataset.id, el.parentNode.parentNode.dataset.img, el.parentNode.parentNode.childNodes[1].currentSrc, el.parentNode.parentNode.nextElementSibling.textContent);
        }else {
            el.classList.remove('clicked');
            state.likedItem.dltFromStorage(el.parentNode.parentNode.dataset.id);
        }
    }
};

function favorisRequested () {
    components.popularBtn.classList.remove('selected');
    this.className = 'selected';
    View.clearUI();
    View.addItemToUI(JSON.parse(localStorage.getItem('likes')), 'clicked');
};

function popularRequested () {
    this.className = 'selected';
    components.favorisBtn.classList.remove('selected');
    firstTimeToPage();
};

function firstTimeToPage () {
    components.input.value = 'eminem';
    whenEnter();
    document.addEventListener('click', playANDpause); 
    document.addEventListener('click', likeBtnClicked);
};