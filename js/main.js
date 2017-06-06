'use strict';
console.log("main launched!");
var elScreen ={elPickMeme:null, elGenMeme:null};
var elSavedImg;

function init(){
    elScreen.elPickMeme = document.querySelector('#screen-pick-meme');
    elScreen.elGenMeme = document.querySelector('#screen-meme-gen');
    // elScreen.elMemeGen = document.querySelector();
}   
function pickAMeme(elImg){
    elSavedImg = elImg;
    elScreen.elPickMeme.classList.toggle('screen-inactive');
    elScreen.elPickMeme.classList.toggle('screen-active');

    elScreen.elGenMeme.classList.toggle('screen-inactive');
    elScreen.elGenMeme.classList.toggle('screen-active');
    //elScreen.elMemeGen.left = '10000px';
    drawAMeme(elImg);
}
function drawAMeme(elImg, elCanvas){
    
    var ctx=c.getContext("2d");
}
