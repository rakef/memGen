'use strict';
console.log("main launched!");
var gElScreen ={elPickMeme:null, elGenMeme:null};
var gElInput = {bottomText:null, topText:null};
//var gTextDrawn = {top:false, bottom:false};

var gIsRecursing = false;

var elSavedImg;
var gElMemeCanvas;

function init(){
    gElScreen.elPickMeme = document.querySelector('#screen-pick-meme');
    gElScreen.elGenMeme = document.querySelector('#screen-meme-gen');
    gElMemeCanvas = document.querySelector('#canvas-meme-gen');

    gElInput.topText = document.querySelector('[name="top-text"]');
    gElInput.bottomText = document.querySelector('[name="bottom-text"]');

    gElInput.topText.oninput = addTopText;
    gElInput.bottomText.oninput = addBottomText;
}   
function pickAMeme(elImg){
    elSavedImg = elImg;
    gElScreen.elPickMeme.classList.toggle('screen-inactive');
    gElScreen.elPickMeme.classList.toggle('screen-active');

    gElScreen.elGenMeme.classList.toggle('screen-inactive');
    gElScreen.elGenMeme.classList.toggle('screen-active');
    drawAMeme(elImg);
}
function drawAMeme(elImg){ 
    var ctx = gElMemeCanvas.getContext("2d");
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
    drawAMeme(elSavedImg);
    addTopText();
    addBottomText();

}
window.onbeforeunload = function(e) {
    gElInput.bottomText.value = null;
    gElInput.topText.value = null;
}