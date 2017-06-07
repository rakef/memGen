'use strict';
console.log("main launched!");
var gElScreen ={elPickMeme:null, elGenMeme:null};
var gElInput = {bottomText:null, topText:null};

var gImgs =[{ url:'assets/img/memeGen/0.png', keywords:[ 'presice', 'determined' ] },
            { url:'assets/img/memeGen/1.png', keywords:[ 'doubtful', 'not sure' ] },
            { url:'assets/img/memeGen/2.png', keywords:[ 'humiliated', 'angry' ] },
            { url:'assets/img/memeGen/3.png', keywords:[ 'happy', 'stoned' ] },
            { url:'assets/img/memeGen/4.png', keywords:[ 'hopefull', 'scared' ] },
            { url:'assets/img/memeGen/5.png', keywords:[ 'dead', 'patient' ]},
            { url:'assets/img/memeGen/6.png', keywords:[ 'interested', 'determined' ] },
            { url:'assets/img/memeGen/7.png', keywords:[ 'happy', 'inviting' ] }
            ];


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
    renderSearchArray();
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
    var htmlCode = '';
    var keywords =[];
    gImgs.forEach( function(img){
        img.keywords.forEach( function(keyword){
            htmlCode += `<div>${keyword}</div>`;
            keywords.push(keyword);
        });
    });
    var elSearchArray = document.querySelector('.search-array');
    elSearchArray.innerHTML = htmlCode;
}
function changeAScreen(elImg){
    gElSavedImg = elImg;

    gElScreen.elGenMeme.classList.toggle('screen-active');
    
    gElScreen.elPickMeme.classList.toggle('screen-inactive');
    gElScreen.elPickMeme.classList.toggle('screen-active');  
    gElScreen.elGenMeme.classList.toggle('screen-inactive');   

   
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
  //gTextDrawn.top = true;
 // if( !gTextDrawn.bottom && gElInput.bottomText.value ) addBottomText();
}

function addBottomText(){
    drawText(gElMemeCanvas, gElInput.bottomText.value, gElMemeCanvas.width / 2 , gElMemeCanvas.height / 1.1 );
    //gTextDrawn.bottom = true;
   // if( !gTextDrawn.top && gElInput.topText.value ) addTopText();
}
function drawText(canvas, text, width,height){
    if(!gIsRecursing){
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
}