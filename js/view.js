import components from './bass';

export function getInput () {
    return document.querySelector(components.input).value;
}

export function clearInput () {
    document.querySelector(components.input).value = "";
}

export function addItemToUI (arr, like) {
    const col1 = document.querySelector(components.colOne);
    const col2 = document.querySelector(components.colTwo);
    const col3 = document.querySelector(components.colThree);
    const col4 = document.querySelector(components.colFour);

    for (let i=0; i<16; i++) {
        let htmlContent = `
        <div class="content__songs__col__songContainner">
            <div class="song" data-img=${arr[i].album.cover_medium} data-id=${arr[i].id} style="background-image: url(${arr[i].album.cover_medium});">
                <audio src="${arr[i].preview}"></audio>
                <div class="icons">
                    <img class="pause-btn" src="./img/play_circle_filled-24px.png" alt="">
                    <img class="like-btn ${like}" src="./img/stars-24px.png" alt="">
                </div>
            </div>
            <div class="title">${arr[i].title}</div>
        </div>
        `;
        if (i < 4) col1.insertAdjacentHTML('beforeend', htmlContent);
        else if (i>=4 && i<8) col2.insertAdjacentHTML('beforeend', htmlContent);
        else if (i>=8 && i<12) col3.insertAdjacentHTML('beforeend', htmlContent);
        else if (i>=12 && i<16) col4.insertAdjacentHTML('beforeend', htmlContent);
    }
    
    initPlayIcon();
}

export function clearUI () {
    const col1Items = document.querySelectorAll(`${components.colOne} .content__songs__col__songContainner`);
    const col2Items = document.querySelectorAll(`${components.colTwo} .content__songs__col__songContainner`);
    const col3Items = document.querySelectorAll(`${components.colThree} .content__songs__col__songContainner`);
    const col4Items = document.querySelectorAll(`${components.colFour} .content__songs__col__songContainner`);
   
    for (let els of col1Items) els.parentNode.removeChild(els);
    for (let els of col2Items) els.parentNode.removeChild(els);
    for (let els of col3Items) els.parentNode.removeChild(els);
    for (let els of col4Items) els.parentNode.removeChild(els);
}

function initPlayIcon () {
    let myAudiuos = document.querySelectorAll('audio');
    for (let els of myAudiuos) {
        els.addEventListener('timeupdate', () => {
            if (els.currentTime === els.duration) els.nextElementSibling.childNodes[1].src = "./img/play_circle_filled-24px.png";
        })
    }
}

export function displaySuggest (arr) {
    const pSuggestion = document.querySelectorAll(`${components.suggestBar} p`);
    for (let els of pSuggestion) els.parentNode.removeChild(els);

    const suggestContainner = document.querySelector(components.suggestBar);
    suggestContainner.style.display = 'inline-block';  
    
    // console.log(arr)
    for (let i=0; i<7; i++) {    
        if (i >= arr.length) break;    
        suggestContainner.insertAdjacentHTML('beforeend', `<p><span class="arrow">></span> ${arr[i].title}</p>`);
    }
}

export function displayLoader () {
    document.querySelector(components.loader).style.display = 'initial';
}

export function hideLoader () {
    document.querySelector(components.loader).style.display = 'none';
}
 
export function hideSuggestBox () {
    const suggestContainner = document.querySelector(components.suggestBar);
    suggestContainner.style.display = 'none';
}

export function displayMainLoader () {
    document.querySelector(components.mainLoader).style.display = 'initial';
}

export function hideMainLoader () {
    document.querySelector(components.mainLoader).style.display = 'none';
}

