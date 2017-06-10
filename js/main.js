'use strict';
console.log("main launched!");
var gElScreen ={elPickMeme:null, elGenMeme:null};
var gElInput = {bottomText:null, topText:null};
var gKeywordSearchCount;
var gTottalSearchCount = 0;

var gImgs =[{ url:'assets/img/memeGen/0.png', keywords:[ 'presice', 'determined' ] },
            { url:'assets/img/memeGen/1.png', keywords:[ 'doubtful', 'not sure' ] },
            { url:'assets/img/memeGen/2.png', keywords:[ 'humiliated', 'angry' ] },
            { url:'assets/img/memeGen/3.png', keywords:[ 'happy', 'stoned' ] },
            { url:'assets/img/memeGen/4.png', keywords:[ 'hopefull', 'scared' ] },
            { url:'assets/img/memeGen/5.png', keywords:[ 'dead', 'patient' ]},
            { url:'assets/img/memeGen/6.png', keywords:[ 'interested', 'determined' ] },
            { url:'assets/img/memeGen/7.png', keywords:[ 'happy', 'inviting' ] }
            ];
var gImgState ={
    textAlign:'center',
    textSize:2.5,
    fontColor:'white',
    fontStroke:'black',
    fontStyle:'Arial'
};


var gIsRecursing = false;

var gElSavedImg;
var gElMemeCanvas;
var gElSearchInput;

function init(){
    gElScreen.elPickMeme = document.querySelector( '#screen-pick-meme' );
    gElScreen.elGenMeme = document.querySelector( '#screen-meme-gen' );
    gElMemeCanvas = document.querySelector( '#canvas-meme-gen' );

    gElInput.topText = document.querySelector( '[name="top-text"]' );
    gElInput.bottomText = document.querySelector( '[name="bottom-text"]' );

    gElSearchInput = document.querySelector( '[name="search-text"]' );

    gElInput.topText.oninput = addTopText;
    gElInput.bottomText.oninput = addBottomText;
    gElSearchInput.oninput = search;
    renderMemeTable(gImgs);
    gKeywordSearchCount = buildSearchCount();
}
function buildSearchCount(){
    var htmlCode = '';
    var keywordsCount = localStorage.getItem("keywordsCount");
    var fontSize = 1;
    if(gTottalSearchCount !== "undefined" && gTottalSearchCount)
    {
        gTottalSearchCount = JSON.parse(gTottalSearchCount);
    } else  gTottalSearchCount = 0;
    if(keywordsCount !== "undefined" && keywordsCount)
    {
        keywordsCount = JSON.parse(keywordsCount);
    } else  keywordsCount = {};
    var keywords =[];
    gImgs.forEach( function(img){
        img.keywords.forEach( function getKeywords(keyword){
            keywords.push(keyword);
        });
    });
    keywords.sort();
    var singledOutKeyWords = keywords.filter( function removeDuplicates(keyword,idx){
        if(keyword !== keywords[idx+1]){
            if( !keywordsCount[keyword] ){  
                keywordsCount[keyword] = 0;
            } else  gTottalSearchCount += keywordsCount[keyword];
            return 1;
        }
    });
    singledOutKeyWords.forEach( function(keyword,idx){
        fontSize = ((8+keywordsCount[keyword]) / gTottalSearchCount)*4;
        fontSize = (fontSize < 0.7)? 0.7 : fontSize;
        htmlCode += `<div class = "keyword" onclick = "addTagSearch(this)" style = "font-size:${fontSize}em">${keyword}</div>`;
    })

    var elSearchArray = document.querySelector('.search-array');
    elSearchArray.innerHTML = htmlCode;


    return keywordsCount;

}   
function renderMemeTable(imgs){
    var htmlCode = "";
    imgs.forEach( function(img){
        htmlCode += `<div class="image"><img src="${img.url}" onclick="changeAScreen(this)"></div>`
    });
    var elImages = document.querySelector('.images');
    elImages.innerHTML = htmlCode;
    

}
function renderSearchArray(){

}
function addTagSearch(elTag){
   //debugger;
    gKeywordSearchCount[elTag.innerText] = ++gKeywordSearchCount[elTag.innerText];
    gElSearchInput.value = elTag.innerText; 
    gTottalSearchCount ++;
    search();
}
function changeAScreen(elImg){
    gElSavedImg = elImg;

    gElScreen.elGenMeme.classList.toggle('screen-active');
    
    gElScreen.elPickMeme.classList.toggle('screen-inactive');
    gElScreen.elPickMeme.classList.toggle('screen-active');  
    gElScreen.elGenMeme.classList.toggle('screen-inactive');   

    clearAllElValues();
    drawAMeme(elImg);
}
function drawAMeme(elImg){ 
    
    var ctx = gElMemeCanvas.getContext("2d");
    if(!elImg)  return;
    ctx.clearRect(0, 0, gElMemeCanvas.width, gElMemeCanvas.height);
    ctx.drawImage(elImg,(gElMemeCanvas.width - elImg.width) / 2,(gElMemeCanvas.height - elImg.height) /2);
}

function addTopText(){
  drawText(gElMemeCanvas, gElInput.topText.value, gElMemeCanvas.width / 2 , 50);
}

function addBottomText(){
    drawText(gElMemeCanvas, gElInput.bottomText.value, gElMemeCanvas.width / 2 , gElMemeCanvas.height / 1.1 );
}
function drawText(canvas, text, width,height){
    if(!gIsRecursing){
        gIsRecursing = true;
        drawMemeWithText();
        gIsRecursing = false;
        return;   
    }
    var ctx = canvas.getContext("2d");
    ctx.font = `${gImgState.textSize}em ${gImgState.fontStyle}`;
    ctx.fillStyle = gImgState.fontColor;
    ctx.strokeStyle = gImgState.fontStroke;
    ctx.textAlign = gImgState.textAlign;

    ctx.fillText(text,width, height);
    ctx.strokeText(text,width, height);
}
function drawMemeWithText(){
    drawAMeme(gElSavedImg);
    addTopText();
    addBottomText();

}
function search(){
    var matchingImgs = gImgs.filter( function(img){
        var returnValue = false;
        img.keywords.forEach(function(keyword){
            if(keyword.search(gElSearchInput.value) !== -1){
                returnValue = true;
            }
            
        });
        return returnValue;  
    });
    renderMemeTable(matchingImgs);

}
window.onbeforeunload = function(e) {
    gElInput.bottomText.value = null;
    gElInput.topText.value = null;
    gElSearchInput.value = null;
    localStorage.setItem("keywordsCount",JSON.stringify(gKeywordSearchCount));
}
function clearAllElValues(){
    gElInput.bottomText.value = null;
    gElInput.topText.value = null;
}



function sendUserInfo() {
    document.querySelector('#clickedButton').classList.add('clicked-button');
    console.log('sup');
}



function hideElement(){
    document.querySelector('.devs-info-container').classList.add('hide-element')
    document.querySelector('.contact-us').classList.add('hide-element')
}

function displayMainPage(){
    document.querySelector('.contact-us').classList.remove('hide-element');
    document.querySelector('.devs-info-container').classList.remove('hide-element');

}
 function alignText(side){
    gImgState.textAlign = side;
    drawMemeWithText();
 }
 function changeTextSize(cond){
     switch (cond){
         case 'GROW':
            gImgState.textSize += 0.1;
            break;
        case 'SHRINK':
            gImgState.textSize -= 0.1;
            break;
     }
     drawMemeWithText();
 }
 function deleteTxt(){
     clearAllElValues();
     drawMemeWithText();
 }