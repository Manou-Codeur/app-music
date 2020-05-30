import "../sass/_main.scss";
import "../sass/_nav-bar.scss";
import "../sass/_search-bar.scss";
import "../sass/_content.scss";

import components from './bass';
import * as View from './view';
import * as Modal from './modal';
import {getSoundValue} from './soundReco';


const state = {};
const popularBtn = document.getElementById(components.popular);
const favorisBtn = document.getElementById(components.favoris);


document.querySelector(components.input).addEventListener('input', liveSearch);
document.addEventListener('keypress', e => {if (e.keyCode === 13) { 
    whenEnter();
    document.addEventListener('click', playANDpause);  
    document.addEventListener('click', likeBtnClicked); 
}});
document.querySelector(components.voiceIcon).addEventListener('click', soundReco); 
document.addEventListener('click', () => View.hideSuggestBox());
addEventListener('load', firstTimeToPage);
popularBtn.addEventListener('click', popularRequested);
favorisBtn.addEventListener('click', favorisRequested);


async function liveSearch () {
    //1. get the input from the view
    let inputValue = View.getInput();
    View.displayLoader();

    //2. ask the model to fetch and return a list of 5 els by passing the input gotten as param and display these els in the list of recomand in UI 
    if (inputValue.trim()) {
        state.searchh = new Modal.generateData(inputValue);
        try {
            await state.searchh.getData();
            View.displaySuggest(state.searchh.result);
            View.hideLoader();
            document.querySelector(components.suggestBar).addEventListener('click', (e) => {
                document.querySelector(components.input).value = e.target.childNodes[1].nodeValue;
                View.hideSuggestBox();
                whenEnter();
                document.addEventListener('click', playANDpause); 
                document.addEventListener('click', likeBtnClicked);
            });
        }catch (err) {
            console.log(err);
        }
    }
};


async function whenEnter () {
    //1. get the input from the view then clear it
    let inputValue = View.getInput().trim();
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
    let timeIntrvl = setInterval(() => {
        if (document.querySelector(components.input).value !== "") {
            whenEnter();
            clearInterval(timeIntrvl);
        }
    }, 1000);
    document.addEventListener('click', playANDpause);
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
};


state.likedItem = new Modal.likedSong();
function likeBtnClicked (e) {
    const el = e.target;
    if (el.classList.contains('like-btn')) {
        if (!el.classList.contains('clicked')) {
            el.classList.add('clicked');
            state.likedItem.addLiked(el.parentNode.parentNode.dataset.id, el.parentNode.parentNode.dataset.img, el.parentNode.parentNode.childNodes[1].currentSrc, el.parentNode.parentNode.nextElementSibling.textContent);
        }else {
            el.classList.remove('clicked');
            state.likedItem.dltFromStorage(el.parentNode.parentNode.dataset.id);
        }
    }
}


function favorisRequested () {
    popularBtn.classList.remove('selected');
    this.className = 'selected';
    View.clearUI();
    View.addItemToUILike(JSON.parse(localStorage.getItem('likes')));
    
};


function firstTimeToPage () {
    document.querySelector(components.input).value = 'eminem';
    whenEnter();
    document.addEventListener('click', playANDpause); 
    document.addEventListener('click', likeBtnClicked);
};


function popularRequested () {
    this.className = 'selected';
    favorisBtn.classList.remove('selected');
    firstTimeToPage();
};

