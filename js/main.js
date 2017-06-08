'use strict';
console.log("main launched!");
var gElScreen = { elPickMeme: null, elGenMeme: null };
var gElInput = { bottomText: null, topText: null };

var gImgs = [{ url: 'assets/img/memeGen/0.png', keywords: ['presice', 'determined'] },
{ url: 'assets/img/memeGen/1.png', keywords: ['doubtful', 'not sure'] },
{ url: 'assets/img/memeGen/2.png', keywords: ['humiliated', 'angry'] },
{ url: 'assets/img/memeGen/3.png', keywords: ['happy', 'stoned'] },
{ url: 'assets/img/memeGen/4.png', keywords: ['hopefull', 'scared'] },
{ url: 'assets/img/memeGen/5.png', keywords: ['dead', 'patient'] },
{ url: 'assets/img/memeGen/6.png', keywords: ['interested', 'determined'] },
{ url: 'assets/img/memeGen/7.png', keywords: ['happy', 'inviting'] }
];


var gIsRecursing = false;

var gElSavedImg;
var gElMemeCanvas;
var gElSearchInput;

function init() {
    gElScreen.elPickMeme = document.querySelector('#screen-pick-meme');
    gElScreen.elGenMeme = document.querySelector('#screen-meme-gen');
    gElMemeCanvas = document.querySelector('#canvas-meme-gen');

    gElInput.topText = document.querySelector('[name="top-text"]');
    gElInput.bottomText = document.querySelector('[name="bottom-text"]');

    gElSearchInput = document.querySelector('[name="search-text"]');

    gElInput.topText.oninput = addTopText;
    gElInput.bottomText.oninput = addBottomText;
    gElSearchInput.oninput = search;
    renderMemeTable(gImgs);
    renderSearchArray();
}
function renderMemeTable(imgs) {
    var htmlCode = "";
    imgs.forEach(function (img) {
        htmlCode += `<div class="image"><img src="${img.url}" onclick="changeAScreen(this)"></div>`
    });
    var elImages = document.querySelector('.images');
    elImages.innerHTML = htmlCode;

}
function renderSearchArray() {
    var htmlCode = '';
    var keywords = [];
    gImgs.forEach(function (img) {
        img.keywords.forEach(function (keyword) {
            keywords.push(keyword);
        });
    });
    keywords.sort();
    var singledOutKeyWords = keywords.filter(function (keyword, idx) {
        if (keyword !== keywords[idx + 1]) {
            return 1;
        }
    });
    singledOutKeyWords.sort(function (a, b) {
        return localStorage(a) - localStorage(b);
    });
    singledOutKeyWords.forEach(function (keyword, idx) {

    })

    var elSearchArray = document.querySelector('.search-array');
    elSearchArray.innerHTML = htmlCode;
}
function addTagSearch(elTag) {
    var searchCount = localStorage.getItem(elTag.innerText);
    searchCount++;
    // debugger;
    //if(!searchCount)    searchCount++;
    gElSearchInput.value = elTag.innerText;
    localStorage.setItem(elTag.innerText, (searchCount++));
    search();
}
function changeAScreen(elImg) {
    gElSavedImg = elImg;

    gElScreen.elGenMeme.classList.toggle('screen-active');

    gElScreen.elPickMeme.classList.toggle('screen-inactive');
    gElScreen.elPickMeme.classList.toggle('screen-active');
    gElScreen.elGenMeme.classList.toggle('screen-inactive');

    clearAllElValues();
    drawAMeme(elImg);
}
function drawAMeme(elImg) {
    var ctx = gElMemeCanvas.getContext("2d");
    if (!elImg) return;
    ctx.clearRect(0, 0, gElMemeCanvas.width, gElMemeCanvas.height);
    ctx.drawImage(elImg, (gElMemeCanvas.width - elImg.width) / 2, (gElMemeCanvas.height - elImg.height) / 2);
}

function addTopText() {
    drawText(gElMemeCanvas, gElInput.topText.value, gElMemeCanvas.width / 2, 50);
}

function addBottomText() {
    drawText(gElMemeCanvas, gElInput.bottomText.value, gElMemeCanvas.width / 2, gElMemeCanvas.height / 1.1);
}
function drawText(canvas, text, width, height) {
    if (!gIsRecursing) {
        gIsRecursing = true;
        drawMemeWithText();
        gIsRecursing = false;
        return;
    }
    var ctx = canvas.getContext("2d");
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";

    ctx.fillText(text, width, height);
    ctx.strokeText(text, width, height);
}
function drawMemeWithText() {
    drawAMeme(gElSavedImg);
    addTopText();
    addBottomText();

}
function search() {
    var matchingImgs = gImgs.filter(function (img) {
        var returnValue = false;
        img.keywords.forEach(function (keyword) {
            if (keyword.search(gElSearchInput.value) !== -1) {
                returnValue = true;
            }

        });
        return returnValue;
    });
    renderMemeTable(matchingImgs);

}
window.onbeforeunload = function (e) {
    gElInput.bottomText.value = null;
    gElInput.topText.value = null;
    gElSearchInput.value = null;
}
function clearAllElValues() {
    gElInput.bottomText.value = null;
    gElInput.topText.value = null;
    gElSearchInput.value = null;
}




// Rakefet begins
function sendUserInfo() {
    document.querySelector('#clickedButton').classList.add('clicked-button');
    console.log('sup');
}

// Rakeft ends