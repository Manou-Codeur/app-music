import components from './bass';


export function getInput () {
    return components.input.value;
}

export function clearInput () {
    components.input.value = "";
}

export function addItemToUI (arr, like) {

    for (let i=0; i<16; i++) {
        const htmlContent = `
        <div class="content__songs__col__songContainner">
            <div class="song" data-img=${arr[i].album.cover_medium} data-id=${arr[i].id} style="background-image: url(${arr[i].album.cover_medium});">
                <audio src="${arr[i].preview}"></audio>
                <div class="icons">
                    <img class="pause-btn" src="./img/img/play_circle_filled-24px.png" alt="">
                    <img class="like-btn ${like}" src="./img/img/stars-24px.png" alt="">
                </div>
            </div>
            <div class="title">${arr[i].title}</div>
        </div>
        `;
        if (i < 4) components.colOne.insertAdjacentHTML('beforeend', htmlContent);
        else if (i>=4 && i<8) components.colTwo.insertAdjacentHTML('beforeend', htmlContent);
        else if (i>=8 && i<12) components.colThree.insertAdjacentHTML('beforeend', htmlContent);
        else if (i>=12 && i<16) components.colFour.insertAdjacentHTML('beforeend', htmlContent);
    }
    
    initPlayIcon();
}

export function clearUI () {
    const col1Items = document.querySelectorAll(`.one .content__songs__col__songContainner`);
    const col2Items = document.querySelectorAll(`.two .content__songs__col__songContainner`);
    const col3Items = document.querySelectorAll(`.three .content__songs__col__songContainner`);
    const col4Items = document.querySelectorAll(`.four .content__songs__col__songContainner`);
   
    for (let els of col1Items) els.parentNode.removeChild(els);
    for (let els of col2Items) els.parentNode.removeChild(els);
    for (let els of col3Items) els.parentNode.removeChild(els);
    for (let els of col4Items) els.parentNode.removeChild(els);
}

function initPlayIcon () {
    const myAudios = document.querySelectorAll('audio')
    for (let els of myAudios) {
        els.addEventListener('timeupdate', () => {
            if (els.currentTime === els.duration) els.nextElementSibling.childNodes[1].src = "./img/img/play_circle_filled-24px.png";
        })
    }
}

export function displaySuggest (arr) {
    const pSuggestion = document.querySelectorAll(`.search__recomand p`);
    for (let els of pSuggestion) els.parentNode.removeChild(els);

    components.suggestBar.style.display = 'inline-block';  
    
    // console.log(arr)
    for (let i=0; i<7; i++) {    
        if (i >= arr.length) break;    
        components.suggestBar.insertAdjacentHTML('beforeend', `<p><span class="arrow">></span> ${arr[i].title}</p>`);
    }
}

export function displayLoader () {
    components.loader.style.display = 'initial';
}

export function hideLoader () {
    components.loader.style.display = 'none';
}
 
export function hideSuggestBox () {
    components.suggestBar.style.display = 'none';
}

export function displayMainLoader () {
    components.mainLoader.style.display = 'initial';
}

export function hideMainLoader () {
    components.mainLoader.style.display = 'none';
}

