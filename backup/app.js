//import {Character} from "../data.js"
const roundWinnerMessageEl = document.getElementById('round-winner-message')
const gameWinnerMessageEl = document.getElementById('game-winner-message')
const card1El = document.getElementById('card1')
const card2El = document.getElementById('card2')
const p1DeckEl = document.getElementById('p1Deck')
const p2DeckEl = document.getElementById('p2Deck')
const letsGoBtn = document.getElementById('letsGo')
const welcomeEl = document.getElementById('welcome')
const playerDetailsEl = document.getElementById('playerDetails')
const nextBtn = document.getElementById('nextBtn')
const containerEl = document.querySelector('.container')
const diceBtn = document.getElementById('diceBtn')
const diceRollEl = document.getElementById('diceRollEl')
const letsPlayBtn = document.getElementById('letsPlayBtn')
const dice1El = document.getElementById('dice1El')
const dice2El = document.getElementById('dice2El')
const gameWinnerEl = document.getElementById('gameWinner')
const cardCreatorBtn = document.getElementById('cardCreatorBtn')
const cardCreatorImageEl = document.getElementById('cardCreator-image')
const cardCreatorStatsEl = document.getElementById('cardCreator-stats')
const randomiseBtn = document.getElementById('randomiseBtn')
const image_input = document.querySelector('#uploadImage')
const uploadedImageEl = document.getElementById('uploadedImage')
const ontoStatsBtn = document.getElementById('ontoStats')
const nameCustomEl = document.getElementById('nameCustom')
const magicCustomEl = document.getElementById('magicCustom')
const cunningCustomEl = document.getElementById('cunningCustom')
const courageCustomEl = document.getElementById('courageCustom')
const wisdomCustomEl = document.getElementById('wisdomCustom')
const temperCustomEl = document.getElementById('temperCustom')
const customCardDisplayEl = document.getElementById('customCardDisplay')
const takePhotoBtnEl = document.getElementById('takePhotoBtn')

let player1Deck = []
let player2Deck = []
let battleArray = []
let currentTurn = true
let turn = ''
let winner = ''
let gameWinner = ''
player1Name.value = ''
player2Name.value = ''



function gameStart(){
    battleArray.push(player1Deck[0],player2Deck[0])
    player1Deck.shift()
    player2Deck.shift()
    if (currentTurn) {
        battleArray[0].cardRenderer()
        battleArray[1].cardRenderer()
        card2El.classList.add('blurred')
        card2El.classList.add('disabled-controls') 
        gamelogic()
    } else {
    battleArray[1].cardRenderer()
    battleArray[0].cardRenderer()        
    card1El.classList.add('blurred')
    card1El.classList.add('disabled-controls')    
    gamelogic()
}}

class Character {
    constructor(ref, characterName, magic, cunning, courage, wisdom, temper, image) {
        this.ref = ref
        this.characterName = characterName
        this.magic = magic
        this.cunning = cunning
        this.courage = courage
        this.wisdom = wisdom
        this.temper = temper
        this.image = image
    }
        cardRenderer() {    
              
           currentTurn? turn = card1El : turn = card2El
            turn.innerHTML =  
            `<h2> ${turn === card1El? localStorage.getItem('p1Name') :localStorage.getItem('p2Name') }'s deck</h2>
            <h3>${this.characterName}</h3>
            <div class="image-container">
            <img src=${this.image} class="character-image"></>
            </>
            <p>Description</p>
            <ul class="button-container">
            <li id="magic" class="magic">Magic${this.magic} </li>
            <li id="cunning" class="cunning">Cunning:${this.cunning} </li>
            <li id="courage" class="courage">Courage:${this.courage} </li>
            <li id="wisdom" class="wisdom">Wisdom:${this.wisdom} </li>
            <li id="temper" class="temper">Temper:${this.temper} </li>
        </ul>`
            currentTurn = !currentTurn    
        };

    }

letsGoBtn.addEventListener('click', ()=>{
    welcomeEl.classList.remove('visible')
    welcomeEl.classList.add('invisible')
    playerDetailsEl.classList.remove('invisible')
    playerDetailsEl.classList.add('visible')
})
    
nextBtn.addEventListener('click', ()=>{
    player1Name.value? localStorage.setItem('p1Name', player1Name.value) : localStorage.setItem('p1Name', 'Player 1')
    player2Name.value? localStorage.setItem('p2Name', player2Name.value) : localStorage.setItem('p2Name', 'Player 2')
    playerDetailsEl.classList.remove('visible')
    playerDetailsEl.classList.add('invisible')
    diceRollEl.classList.remove('invisible')
    diceRollEl.classList.add('visible')
})

diceBtn.addEventListener('click', ()=>{
    dice1El.innerHTML = diceRoll()
    dice2El.innerHTML = diceRoll()
})


function diceRoll () {
    return Math.floor(Math.random() *6 +1)
}


randomiseBtn.addEventListener('click', ()=>{
    magicCustomEl.value =  Math.floor(Math.random() *100 +1)
    cunningCustomEl.value =  Math.floor(Math.random() *100 +1)
    courageCustomEl.value =   Math.floor(Math.random() *100 +1)
    wisdomCustomEl.value =   Math.floor(Math.random() *100 +1)
    temperCustomEl.value =   Math.floor(Math.random() *100 +1)
})

createCardBtn.addEventListener('click', ()=>{
    cardCreator()
})



function cardCreator (){
    
    let playerCustomCard = new Character (98, `${nameCustomEl.value}`,`${magicCustomEl.value}`,`${cunningCustomEl.value}`,`${courageCustomEl.value}`,`${wisdomCustomEl.value}`,`${temperCustomEl.value}`, `${localStorage.getItem("uploaded image")}` )
    //why does test image not pull in the value defined in the reader function?
    cardCreatorStatsEl.classList.remove('visible')
    cardCreatorStatsEl.classList.add('invisible')
    customCardDisplayEl.classList.remove('invisible')
    customCardDisplayEl.classList.add('visible')
    
    customCardDisplayEl.innerHTML =

   `
   <h3>${nameCustomEl.value}</h3>
   <div class="image-container">
   <img src=${localStorage.getItem("uploaded image")} class="character-image"></>
   </>
   <p>Description</p>
   <ul class="button-container">
   <li id="magic" class="magic">Magic${magicCustomEl.value} </li>
   <li id="cunning" class="cunning">Cunning:${cunningCustomEl.value} </li>
   <li id="courage" class="courage">Courage:${courageCustomEl.value} </li>
   <li id="wisdom" class="wisdom">Wisdom:${wisdomCustomEl.value} </li>
   <li id="temper" class="temper">Temper:${temperCustomEl.value} </li>
</ul>
<div id="customCardBtns" class="centered visible">
    <button id="addToP1DeckBtn">Add to ${localStorage.getItem('p1Name')}'s deck</button>
    <button id="addToP2DeckBtn">Add to ${localStorage.getItem('p2Name')}'s deck</button>
    <button id="discardBtn">Discard</button>
</div>

<div id="unequalDeckEl"></div>`
const customCardBtns =document.getElementById('customCardBtns')
const unequalDeckEl = document.getElementById('unequalDeckEl')

function unequalDeck() {
    if (player1Deck.length > player2Deck.length) {
        unequalDeckEl.innerHTML =  
         `${localStorage.getItem('p1Name')} has a bigger deck. Do you want to create a card for ${localStorage.getItem('p2Name')}?
         <button id="createCardBtn2">Create another card</button>`
        } else if (player1Deck.length < player2Deck.length) {
     unequalDeckEl.innerHTML = `${localStorage.getItem('p2Name')} has a bigger deck. Do you want to create a card for ${localStorage.getItem('p1Name')}?
     <button id="createCardBtn2">Create another card</button>`} else if (player1Deck.length === player2Deck.length){
        unequalDeckEl.innerHTML = `<button id="letsPlayBtn2">Let's play</button>`
        const letsPlayBtn2 = document.getElementById('letsPlayBtn2')
        letsPlayBtn2.addEventListener('click', ()=>{
            customCardDisplayEl.classList.remove('visible')
        customCardDisplayEl.classList.add('invisible')
            letsPlay()
         })
     }
     document.getElementById('createCardBtn2').addEventListener('click',()=>{
        
        customCardDisplayEl.classList.remove('visible')
        customCardDisplayEl.classList.add('invisible')
        cardCreatorImageEl.classList.add('visible')
        cardCreatorImageEl.classList.remove('invisible')
    })
    document.getElementById('addToP1DeckBtn').addEventListener('click',()=>{
    player1Deck.push(playerCustomCard)
    customCardBtns.classList.remove('visible')
    customCardBtns.classList.add('invisible')
    unequalDeck()
})
document.getElementById('addToP2DeckBtn').addEventListener('click',()=>{
    player2Deck.push(playerCustomCard)
    customCardBtns.classList.remove('visible')
    customCardBtns.classList.add('invisible')
    unequalDeck()
})

document.getElementById('discardBtn').addEventListener('click', ()=>{
    customCardDisplayEl.classList.add('invisible')
    customCardDisplayEl.classList.remove('visible')
    diceRollEl.classList.remove('invisible')
    diceRollEl.classList.add('visible')
})
}
 
 

document.body.style.position = 'relative'



letsPlayBtn.addEventListener('click', ()=>{
   letsPlay()
})



function letsPlay(){
    diceRollEl.classList.remove('visible')
    diceRollEl.classList.add('invisible')
    if (dice1El.innerHTML > dice2El.innerHTML) {
        currentTurn = true
    } else if (dice1El.innerHTML === dice2El.innerHTML){
        currentTurn = true
    } else {
        currentTurn = false
    }
    containerEl.classList.remove('blurred')
    document.body.style.position = 'relative'
    gameStart()
}

cardCreatorBtn.addEventListener('click', ()=>{
    diceRollEl.classList.add('invisible')
    diceRollEl.classList.remove('visible')
    cardCreatorImageEl.classList.add('visible')
    cardCreatorImageEl.classList.remove('invisible')
   
})

ontoStatsBtn.addEventListener('click', ()=>{
    cardCreatorImageEl.classList.remove('visible')
    cardCreatorImageEl.classList.add('invisible')
    cardCreatorStatsEl.classList.add('visible')
    cardCreatorStatsEl.classList.remove('invisible')
})

function gamelogic(){
    p1DeckEl.innerHTML = player1Deck.length
    p2DeckEl.innerHTML = player2Deck.length
    const buttonContainers = document.querySelectorAll('.button-container')
        buttonContainers.forEach((buttonContainer, index)=> {  
                   
            buttonContainer.addEventListener('click',(e)=>{  
            if (index === 0) {
                console.log(0)
                if (battleArray[0][e.target.id] > battleArray[1][e.target.id] ) {
                    
                    winner = card1El
                    let highlights = document.querySelectorAll(`.${e.target.id}`)
                    choiceHighlighter(highlights)
                    card1El.classList.add('active')
                    card2El.classList.remove('active')
                    card1El.classList.remove('blurred')
                    card2El.classList.remove('blurred')
                    card1El.classList.add('disabled-controls')
                    card2El.classList.add('disabled-controls')
                    displayRoundWinner()
                        } else {
                            
                    winner = card2El
                    let highlights = document.querySelectorAll(`.${e.target.id}`)
                    choiceHighlighter(highlights)
                    card2El.classList.add('active')
                    card1El.classList.remove('active')
                    card1El.classList.remove('blurred')
                    card2El.classList.remove('blurred')
                    card1El.classList.add('disabled-controls')
                    card2El.classList.add('disabled-controls')
                    displayRoundWinner()
                        }
                        } else {
                            console.log(1)
                            if (battleArray[1][e.target.id] > battleArray[0][e.target.id] ) {
                                
                            winner = card2El          
                            let highlights = document.querySelectorAll(`.${e.target.id}`)            
                            choiceHighlighter(highlights)
                            card2El.classList.add('active')
                            card1El.classList.remove('active')
                            card1El.classList.remove('blurred')
                            card2El.classList.remove('blurred')
                            card1El.classList.add('disabled-controls')
                            card2El.classList.add('disabled-controls')
                            displayRoundWinner()
                        } else {
                            console.log('argh!!')
                            winner = card1El
                            let highlights = document.querySelectorAll(`.${e.target.id}`)
                            choiceHighlighter(highlights)
                            card1El.classList.add('active')
                            card2El.classList.remove('active')
                            card1El.classList.remove('blurred')
                            card2El.classList.remove('blurred')
                            card1El.classList.add('disabled-controls')
                            card2El.classList.add('disabled-controls')
                            displayRoundWinner()
                }
            }})
        } )}
        
    function choiceHighlighter(highlights){
                            highlights[0].classList.add('choice')
                            highlights[1].classList.add('choice')
    }

   function roundStatusCheck(){
    if (player1Deck.length === 0) {
        gameWinner = localStorage.getItem('p2Name')
        currentTurn = false
        gameFinished()
        return
    } else if (player2Deck.length === 0){
        gameWinner = localStorage.getItem('p1Name')
        currentTurn = true
        gameFinished()
        return
    }
   } 

function roundComplete () {
    if (winner === card1El) {
        player1Deck.push(battleArray[1],battleArray[0])
        roundStatusCheck()
        battleArray = []
        battleArray.push(player1Deck[0],player2Deck[0])
        player1Deck.shift()
        player2Deck.shift()
            } else {
                player2Deck.push(battleArray[0],battleArray[1])
                roundStatusCheck()
                battleArray = []
                battleArray.push(player1Deck[0],player2Deck[0])
                player1Deck.shift()
                player2Deck.shift()
            }
                
            }
function displayRoundWinner() {
    roundWinnerMessageEl.classList.add('visible')
    roundWinnerMessageEl.classList.remove('invisible')
    if (winner === card1El) {
        roundWinnerMessageEl.innerHTML = `
        ${battleArray[0].characterName} beats ${battleArray[1].characterName} - X
       `
    } else {
        roundWinnerMessageEl.innerHTML = `
        ${battleArray[1].characterName} beats ${battleArray[0].characterName}- X
        `
    }
    roundComplete()
    roundWinnerMessageEl.addEventListener('click', () =>{
        roundWinnerMessageEl.classList.add('invisible')
  if (currentTurn) {
        battleArray[0].cardRenderer()
    battleArray[1].cardRenderer()
  } else {
  battleArray[1].cardRenderer()
  battleArray[0].cardRenderer()        
        }
        if (winner === card1El) {
            card2El.classList.add('blurred') 
            card1El.classList.remove('disabled-controls')
            card2El.classList.add('disabled-controls')
        } else {
            card1El.classList.add('blurred') 
            card2El.classList.remove('disabled-controls')
            card1El.classList.add('disabled-controls')
            }
        gamelogic()
})
}

function gameFinished (){
    roundWinnerMessageEl.classList.remove('visible')
    roundWinnerMessageEl.classList.add('invisible')
    gameWinnerMessageEl.classList.add('visible')
    gameWinnerMessageEl.classList.remove('invisible')
    gameWinnerMessageEl.innerHTML = `
    ${gameWinner} is the winner!
    <button id="playAgain">Play again?</button>`

    document.getElementById('playAgain').addEventListener('click',()=>{
        currentTurn? card1El.classList.remove('disabled-controls') : card2El.classList.remove('disabled-controls')
        gameWinnerMessageEl.classList.add('invisible')
        gameWinnerMessageEl.classList.remove('visible')
        player1Deck = []
        player2Deck = []
        battleArray = []
        turn = ''
        winner = ''
        characters.forEach((character)=>{
            character.ref%2 !== 0? player1Deck.push(character) : player2Deck.push(character);
            //character.ref === 1? player2Deck.push(character) : player1Deck.push(character);
        })
        gameStart()
    })
}

const argusFilch = new Character (1,"Argus Filch",0,17,10,40,10,"/images/filch.jpg")
const severusSnape = new Character (2,"Severus Snape",120,45,80,76,9,"/images/snape.jpg")
const dracoMalfoy = new Character (3,"Draco Malfoy",60,35,30,28,21,"/images/draco.jpg")
const rubeusHagrid = new Character (4,"Rubeus Hagrid",12,13,45,15,12,"/images/hagrid.png")
const lunaLovegood = new Character (5,"Luna Lovegood",50,18,65,48,2,"/images/luna.jpg")
const lordVoldemort = new Character (6,"Lord Voldemort",120,42,0,60,25,"/images/voldemort.jpg")
const ginnyWeasley = new Character (7,"Ginny Weasley",50,22,65,45,11,"/images/ginny.jpg")
const alectoCarrow = new Character (8,"Alecto Carrow",60,30,20,44,18,"/images/alecto.png")
const hermioneGranger = new Character (9,"Hermione Granger",88,32,70,100,5,"/images/hermione.jpg")
const bellatrixLestrange = new Character (10,"Bellatrix Lestrange",112,36,4,55,25,"/images/bellatrix.jpg")
const griphook = new Character (11,"Griphook",40,30,30,40,10,"/images/griphook.jpg")
const aberforthDumbledore = new Character (12,"Aberforth Dumbledore",40,32,45,50,10,"/images/dumbledore.jpg")
const feurirGreyback = new Character (13,"Feurir Greyback",65,30,9,40,18,"/images/feurir.jpg")
const minervaMcgonagall = new Character (14,"Minerva McGonagall",107,36,45,85,20,"/images/mcgonagall.jpg")
const percyWeasley = new Character (15,"Percy Weasley",65,15,40,42,10,"/images/percy.jpg")
const choChang = new Character (16,"Cho Chang",50,12,55,40,3,"/images/cho.jpg")
const nevilleLongbottom = new Character (17,"Neville Longbottom",68,36,75,48,9,"/images/neville.jpg")
const mrOllivander = new Character (18,"Mr Ollivander",65,20,40,72,3,"/images/ollivander.jpg")
const ronWeasley = new Character (19,"Ron Weasley",80,25,70,60,10,"/images/ron.jpg")
const harryPotter = new Character (20,"Harry Potter",95,40,80,100,8,"/images/harry.jpg")
const seamusFinnegan = new Character (21,"Seamus Finnegan",45,20,50,21,3,"/images/seamus.jpg")
const sybillTrelawney = new Character (22,"Sybill Trelawney",50,11,40,45,3,"/images/sybill.jpg")
const nagini = new Character (23,"Nagini",0,40,1,10,25,"/images/nagini.jpg")
const deanThomas = new Character (24,"Dean Thomas",45,20,50,26,5,"/images/dean.jpg")
const gregoryGoyle = new Character (25,"Gregory Goyle",18,20,7,1,16,"/images/gregory.jpg")
const amycusCarrow = new Character (26,"Amycus Carrow",59,31,20,44,19,"/images/amycus.png")

const characters = [argusFilch,severusSnape,dracoMalfoy,rubeusHagrid,lunaLovegood,lordVoldemort,ginnyWeasley,alectoCarrow,hermioneGranger,bellatrixLestrange,griphook,aberforthDumbledore,feurirGreyback,minervaMcgonagall,percyWeasley,choChang,nevilleLongbottom,mrOllivander,ronWeasley,harryPotter,seamusFinnegan,sybillTrelawney,nagini,deanThomas,gregoryGoyle,amycusCarrow]

characters.forEach((character)=>{
    character.ref%2 !== 0? player1Deck.push(character) : player2Deck.push(character);
    //character.ref === 1? player2Deck.push(character) : player1Deck.push(character);
})


//
//create my own card - button, popup, add picture or take picture, choose name, set attirubutes or random attributes button, save button, warning messge that decks are unequal

//set howi want the card to look - get an actual top trump card
//deck should be little cards that overlay each other and wobble whn you mouse over
//draw how I want each screen size to look and plot out how i want ythe cards to move

//