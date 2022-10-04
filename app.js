//import {Character} from "../data.js"
const roundWinnerMessageEl = document.getElementById('round-winner-message')
const gameWinnerMessageEl = document.getElementById('game-winner-message')
const card1El = document.getElementById('card1')
const card2El = document.getElementById('card2')
const card1Outer = document.querySelector('.card-outer1')
const card2Outer = document.querySelector('.card-outer2')
const p1DeckEl = document.getElementById('p1Deck')
const p2DeckEl = document.getElementById('p2Deck')
const letsGoBtn = document.getElementById('letsGo')
const welcomeEl = document.getElementById('welcome')
const playerDetailsEl = document.getElementById('playerDetails')
const nextBtn = document.getElementById('nextBtn')
const containerEl = document.querySelector('.card-container')
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
const customCardQuestionEl =document.getElementById('customCardQuestion')
const continueBtn = document.getElementById('continueBtn')
const turnIndicatorEl = document.getElementById('turnIndicator')
const customCardBtns =document.getElementById('customCardBtns')
const unequalDeckEl = document.getElementById('unequalDeckEl')
const p1DeckFlexEl = document.getElementById('p1DeckFlex')
const p2DeckFlexEl = document.getElementById('p2DeckFlex')
const p1DeckTextEl = document.getElementById('p1DeckText')
const p2DeckTextEl = document.getElementById('p2DeckText')
const gryffindorDeckEl = document.getElementById('gryffindorDeck')
const slytherinDeckEl = document.getElementById('slytherinDeck')
const ravenclawDeckEl = document.getElementById('ravenclawDeck')
const hufflepuffDeckEl = document.getElementById('hufflepuffDeck')
const deckChoiceContainerEl = document.querySelector('.deck-choice-container')
const ontoCustomCardsBtn = document.getElementById('ontoCustomCards')
const innerDiceFlex1h2P1 = document.querySelector('.centered-h2P1')
const innerDiceFlex1h2P2 = document.querySelector('.centered-h2P2')
const deckFlexEl = document.querySelector('.deck-flex')
const mainTitleEl = document.querySelector('.main-title')

function deckManipulator(e){
    console.log(e.target)
    for (let i=0; i < deckFlexEl.childNodes.length;i++) {
        if (deckFlexEl.childNodes[i].id === e.target.parentElement.offsetParent.id){
            //console.log(deckFlexEl.childNodes[i].id)
            console.log(e.target)
            //console.log(e.target.parentElement.offsetParent.id)
            //console.log(1)
            deckFlexEl.childNodes[i].classList.add('expanded-deck')
            } else if (deckFlexEl.childNodes[i].id !== e.target.parentElement.offsetParent.id && deckFlexEl.childNodes[i].id!== undefined) {
                // console.log(deckFlexEl.childNodes[i].id)
                // console.log(e.target.id)
                // console.log(2)
            deckFlexEl.childNodes[i].classList.add('shrunk-deck')
        
    }
}

}



gryffindorDeckEl.addEventListener('click', (e)=>{
    let rootEl = document.querySelector(':root')
    deckManipulator(e)
    gryffindorDeckEl.classList.add('gr-translate')
    rootEl.style.setProperty('--card-text','#AE0001')
    rootEl.style.setProperty('--card-background-color-1','#D3A625')
    rootEl.style.setProperty('--card-background-color-2','white')
    rootEl.style.setProperty('--card-button-color-1','#EEBA30')
    rootEl.style.setProperty('--card-button-color-2','white')
})

slytherinDeckEl.addEventListener('click', (e)=>{
    let rootEl = document.querySelector(':root')
    deckManipulator(e)
    slytherinDeckEl.classList.add('sl-translate')
    rootEl.style.setProperty('--card-text','#000000')
    rootEl.style.setProperty('--card-background-color-1','#1A472A')
    rootEl.style.setProperty('--card-background-color-2','white')
    rootEl.style.setProperty('--card-button-color-1','#AAAAAA')
    rootEl.style.setProperty('--card-button-color-2','white')
})

ravenclawDeckEl.addEventListener('click', (e)=>{
    let rootEl = document.querySelector(':root')
    deckManipulator(e)
    ravenclawDeckEl.classList.add('rc-translate')
    rootEl.style.setProperty('--card-text','#000000')
    rootEl.style.setProperty('--card-background-color-1','#222F5B')
    rootEl.style.setProperty('--card-background-color-2','white')
    rootEl.style.setProperty('--card-button-color-1','#946B2D')
    rootEl.style.setProperty('--card-button-color-2','white')
})

hufflepuffDeckEl.addEventListener('click', (e)=>{
    let rootEl = document.querySelector(':root')
    deckManipulator(e)
    hufflepuffDeckEl.classList.add('hp-translate')
    rootEl.style.setProperty('--card-text','#000000')
    rootEl.style.setProperty('--card-background-color-1','#60605C')
    rootEl.style.setProperty('--card-background-color-2','white')
    rootEl.style.setProperty('--card-button-color-1','#FFED86')
    rootEl.style.setProperty('--card-button-color-2','white')
})

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
        turnCalculator(card1El)
        card1Outer.classList.add('active')
        card1Outer.classList.add('player-turn')
        card2Outer.classList.add('blurred')
        card2Outer.classList.add('disabled-controls') 
        gamelogic()
    } else {
    battleArray[1].cardRenderer()
    battleArray[0].cardRenderer()  
    turnCalculator(card2El)     
    card2Outer.classList.add('active') 
    card2Outer.classList.add('player-turn')
    card1Outer.classList.add('blurred')
    card1Outer.classList.add('disabled-controls')    
    gamelogic()
}

}

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
            `<p class="cheeky-hint">Swipe to peek at their card!</p>
            <h2>${this.characterName}</h2>
            <div class="image-container">
            <img src=${this.image} class="character-image"></>
            </div>
            
            <ul class="button-container" id="buttonContainer${turn.id}">
            <li id="magic" class="magic">Magic <span>&#10148;</span> ${this.magic} </li>
            <li id="cunning" class="cunning">Cunning <span>&#10148;</span> ${this.cunning} </li>
            <li id="courage" class="courage">Courage <span>&#10148;</span> ${this.courage} </li>
            <li id="wisdom" class="wisdom">Wisdom <span>&#10148;</span> ${this.wisdom} </li>
            <li id="temper" class="temper">Temper <span>&#10148;</span> ${this.temper} </li>
        </ul>`
        
            currentTurn = !currentTurn    
        };

    }

letsGoBtn.addEventListener('click', ()=>{
    mainTitleEl.classList.add('hide-header')
    setTimeout(()=>{
        mainTitleEl.style.display = 'none'
    }, 500)
    //document.querySelector('.main-title').classList.remove('visible')
    welcomeEl.classList.remove('visible')
    playerDetailsEl.classList.add('visible')
})
    
nextBtn.addEventListener('click', ()=>{
    player1Name.value? localStorage.setItem('p1Name', player1Name.value) : localStorage.setItem('p1Name', 'Player 1')
    player2Name.value? localStorage.setItem('p2Name', player2Name.value) : localStorage.setItem('p2Name', 'Player 2')
    playerDetailsEl.classList.remove('visible')
    deckChoiceContainerEl.classList.add('visible')
})

ontoCustomCardsBtn.addEventListener('click',()=>{
    deckChoiceContainerEl.classList.remove('visible')
    customCardQuestionEl.classList.add('visible')
})

continueBtn.addEventListener('click', ()=>{
    customCardQuestionEl.classList.remove('visible')
    diceRollEl.classList.add('visible')
    innerDiceFlex1h2P1.innerHTML = localStorage.getItem('p1Name')
    innerDiceFlex1h2P2.innerHTML = localStorage.getItem('p2Name')
    letsPlayBtn.style.display = 'none'
    //letsPlayBtn.disabled = true
})

diceBtn.addEventListener('click', ()=>{
    diceBtn.classList.add('disabled-controls')
    let diceCount = 0
    rollWinner.innerHTML = `<h2 class="centered-h2">Rolling...</h2>`
    let myInterval = setInterval(()=>{
        dice1El.innerHTML = `<img src="./images/${diceRoll()}.png" class="dice-image">`
        dice2El.innerHTML = `<img src="./images/${diceRoll()}.png" class="dice-image">`
        diceCount = diceCount +1
        
        if (diceCount === 20){
            
            clearInterval(myInterval)
            if (dice1El.innerHTML !== dice2El.innerHTML) {
                letsPlayBtn.style.display = 'block'
                diceBtn.style.display = 'none'
                

            dice1El.innerHTML > dice2El.innerHTML? rollWinner.innerHTML = `<h2 class="centered-h2">${localStorage.getItem('p1Name')} goes first!</h2>`: rollWinner.innerHTML = `<h2 class="centered-h2">${localStorage.getItem('p2Name')} goes first!</h2>`
            diceBtn.classList.remove('disabled-controls')
        } else {
            rollWinner.innerHTML = `<h2 class="centered-h2">It's a draw.<br> Roll again!</h2>`
            diceBtn.classList.remove('disabled-controls')
        }
        }
    },200)
    
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
    if (nameCustomEl.value && magicCustomEl.value && cunningCustomEl.value && courageCustomEl.value && wisdomCustomEl.value && temperCustomEl.value) {
    cardCreator()
    
} else {
    let customCardStats = document.getElementById('cardCreator-stats').childNodes
    for (const stat of customCardStats) {
        
        if (stat.value === '' && stat.type === 'text') {
            console.log(stat.value)
            stat.classList.add('error')
            stat.classList.add('boing')
            setTimeout(()=>{
                stat.classList.remove('boing')
                stat.classList.remove('error')
            },2500)
        }
    }
        createCardBtn.classList.toggle('boing')
        createCardBtn.innerHTML = `Please finish inputting your custom card details above.`
        setTimeout(()=>{
            createCardBtn.innerHTML = 'Create my card'
            createCardBtn.classList.toggle('boing')
        }, 2500)
    }
})

function cardCreator (){
    let playerCustomCard = new Character (98, `${nameCustomEl.value}`,`${magicCustomEl.value}`,`${cunningCustomEl.value}`,`${courageCustomEl.value}`,`${wisdomCustomEl.value}`,`${temperCustomEl.value}`, `${localStorage.getItem("uploaded image")}` )
    cardCreatorStatsEl.classList.remove('visible')
    customCardDisplayEl.classList.add('visible')
    customCardBtns.classList.add('visible')
    customCardDisplayEl.innerHTML =
   `
   <div class="card-outer-custom">
   <div class="card-inner">
   
   <h2>${nameCustomEl.value}</h2>
   <div class="image-container">
   <img src=${localStorage.getItem("uploaded image")} class="character-image"></>
   </div>
   <ul class="button-container disabled-controls">
   <li id="magic" class="magic">Magic <span>&#10148;</span> ${magicCustomEl.value} </li>
   <li id="cunning" class="cunning">Cunning <span>&#10148;</span> ${cunningCustomEl.value} </li>
   <li id="courage" class="courage">Courage <span>&#10148;</span> ${courageCustomEl.value} </li>
   <li id="wisdom" class="wisdom">Wisdom <span>&#10148;</span> ${wisdomCustomEl.value} </li>
   <li id="temper" class="temper">Temper <span>&#10148;</span> ${temperCustomEl.value} </li>
</ul>
</div>
</div>
`



if (player1Deck.length === player2Deck.length) {
    customCardBtns.innerHTML = `<button id="addToP1DeckBtn">Add to ${localStorage.getItem('p1Name')}'s deck</button>
    <button id="addToP2DeckBtn">Add to ${localStorage.getItem('p2Name')}'s deck</button>
    <button id="discardBtn">Discard</button>`
} else if (player1Deck.length > player2Deck.length) {
    player2Deck.push(playerCustomCard)
    customCardBtns.innerHTML =`<p class="alert boing">Your decks are now balanced!</p>
    <button id="customCardLetsPlay">Lets play!</button>`
    customCardLetsPlay.addEventListener('click', ()=>{
        customCardDisplayEl.classList.remove('visible')
        customCardBtns.classList.remove('visible')
        diceRollEl.classList.add('visible')
    })
} else if (player2Deck.length > player1Deck.length){
    player1Deck.push(playerCustomCard)
    customCardBtns.innerHTML =`<p class="alert">Your decks are now balanced!</p>
    <button id="customCardLetsPlay">Lets play!</button>`
    customCardLetsPlay.addEventListener('click', ()=>{
        customCardDisplayEl.classList.remove('visible')
        customCardBtns.classList.remove('visible')
        letsPlay()
})}

function unequalDeck() {
    unequalDeckEl.classList.add('visible')
    if (player1Deck.length > player2Deck.length) {
        
        unequalDeckEl.innerHTML =  
         `<p class="alert boing">${localStorage.getItem('p1Name')} now has more cards. </br></br> Do you want to create a card for ${localStorage.getItem('p2Name')} to balance the decks?</p>
         <button id="createCardBtn2">Yeah create another card</button>
         <button id="unbalancedLetsPlayBtn">Naah let's play!</button>
         `
        } else if (player1Deck.length < player2Deck.length) {
            
     unequalDeckEl.innerHTML = `<p class="alert boing">${localStorage.getItem('p2Name')} now has more cards. </br></br> Do you want to create a card for ${localStorage.getItem('p1Name')} to balance the decks?</p>
     <button id="createCardBtn2">Create another card</button>
     <button id="unbalancedLetsPlayBtn">Naah let's play!</button>`} else if (player1Deck.length === player2Deck.length){
        unequalDeckEl.innerHTML = `<button id="letsPlayBtn2">Let's play</button>`
        const letsPlayBtn2 = document.getElementById('letsPlayBtn2')
        letsPlayBtn2.addEventListener('click', ()=>{
            customCardDisplayEl.classList.remove('visible')
            diceRollEl.classList.add('visible')

         })
     }
     document.getElementById('createCardBtn2').addEventListener('click',()=>{
        localStorage.removeItem("uploaded image")
        unequalDeckEl.classList.remove('visible')
        customCardDisplayEl.classList.remove('visible')
        cardCreatorImageEl.classList.add('visible')
    })
    document.getElementById('unbalancedLetsPlayBtn').addEventListener('click', ()=>{
        unequalDeckEl.classList.remove('visible')
        customCardDisplayEl.classList.remove('visible')
        diceRollEl.classList.add('visible')
    })
}

document.getElementById('addToP1DeckBtn').addEventListener('click',()=>{
    player1Deck.push(playerCustomCard)
    customCardBtns.classList.remove('visible')
    unequalDeck()
})
document.getElementById('addToP2DeckBtn').addEventListener('click',()=>{
    player2Deck.push(playerCustomCard)
    customCardBtns.classList.remove('visible')
    unequalDeck()
})
document.getElementById('discardBtn').addEventListener('click', ()=>{
    customCardDisplayEl.classList.remove('visible')
    customCardBtns.classList.remove('visible')
    diceRollEl.classList.add('visible')
})



}
image_input.addEventListener("change", function() {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result
      
      uploadedImageEl.innerHTML = `<img src="${uploaded_image}">`
      localStorage.setItem("uploaded image",uploaded_image)
    })
    reader.readAsDataURL(this.files[0])    
  })

letsPlayBtn.addEventListener('click', ()=>{
   letsPlay()
})



function letsPlay(){
    containerEl.classList.add('visible')
    diceRollEl.classList.remove('visible')
    if (dice1El.innerHTML > dice2El.innerHTML) {
        currentTurn = true
    } else {
        currentTurn = false
    }
    containerEl.classList.remove('blurred')
    document.body.style.position = 'relative'
    gameStart()
}

cardCreatorBtn.addEventListener('click', ()=>{
    localStorage.removeItem("uploaded image")
    customCardQuestionEl.classList.remove('visible')
    diceRollEl.classList.remove('visible')
    cardCreatorImageEl.classList.add('visible')
   clearCardStats()
})

function clearCardStats (){
        nameCustomEl.value  = ''
        magicCustomEl.value = ''
        cunningCustomEl.value =''
        courageCustomEl.value = ''
        wisdomCustomEl.value = ''
        temperCustomEl.value =''
        uploadedImageEl.innerHTML = ''
        image_input.value = ''
}

ontoStatsBtn.addEventListener('click', ()=>{
    cardCreatorImageEl.classList.remove('visible')
    cardCreatorStatsEl.classList.add('visible')
})

function gamelogic(){
    
    p1DeckTextEl.innerHTML = `<p class="cards-left">${localStorage.getItem('p1Name')}'s deck</p>`
    p1DeckEl.innerHTML = ''
    if (player1Deck.length > 5) {
        p1DeckEl.innerHTML += `<div class="mini-card "></div> x <p class="cards-left">${player1Deck.length}</p>`
    } else if (player1Deck.length > 3) {
    player1Deck.forEach(()=>{
        p1DeckEl.innerHTML += `<div class="mini-card"></div>`
    } )} else if (player1Deck.length > 1) {
        player1Deck.forEach(()=>{
            p1DeckEl.innerHTML += `<div class="mini-card flaming-card"></div>`
        } )
    } else if (player1Deck.length === 1) {
        p1DeckEl.innerHTML += `<div class="mini-card mega-flaming-card"></div>`
    }

    p2DeckTextEl.innerHTML = `<p class="cards-left">${localStorage.getItem('p2Name')}'s deck</p>`
    p2DeckEl.innerHTML = ''
    if (player2Deck.length > 10) {
        p2DeckEl.innerHTML += `<div class="mini-card"></div> x <p class="cards-left">${player2Deck.length}</p>`
    } else {
    player2Deck.forEach(()=>{
        p2DeckEl.innerHTML += `<div class="mini-card"></div>`
    })}

    
    
    const buttonContainers = document.querySelectorAll('.button-container')
        buttonContainers.forEach((buttonContainer, index)=> {  
                   
            buttonContainer.addEventListener('click',(e)=>{  
            if (index === 0) {
                if (battleArray[0][e.target.id] > battleArray[1][e.target.id] ) {
                    
                    winner = card1El
                    let highlights = document.querySelectorAll(`.${e.target.id}`)
                    choiceHighlighter(highlights)
                    roundWinnerPlayer1()
                    displayRoundWinner()
                        } else {
                            
                    winner = card2El
                    let highlights = document.querySelectorAll(`.${e.target.id}`)
                    choiceHighlighter(highlights)
                    roundWinnerPlayer2()
                    displayRoundWinner()
                        }
                        } else {
                            if (battleArray[1][e.target.id] > battleArray[0][e.target.id] ) {
                            winner = card2El          
                            let highlights = document.querySelectorAll(`.${e.target.id}`)            
                            choiceHighlighter(highlights)
                            roundWinnerPlayer2()
                            displayRoundWinner()
                        } else {
                            winner = card1El
                            let highlights = document.querySelectorAll(`.${e.target.id}`)
                            choiceHighlighter(highlights)
                            roundWinnerPlayer1()
                            displayRoundWinner()
                }
            }})
        } )}

function roundWinnerPlayer1(){
    
    card1Outer.classList.remove('blurred')
    card2Outer.classList.remove('blurred')
    card1Outer.classList.add('disabled-controls')
    card2Outer.classList.add('disabled-controls')
    
}   

function roundWinnerPlayer2(){
    card1Outer.classList.remove('blurred')
    card2Outer.classList.remove('blurred')
    card1Outer.classList.add('disabled-controls')
    card2Outer.classList.add('disabled-controls')
    
}

    function turnCalculator (winner){
        turnIndicatorEl.classList.add('visible')
        turnIndicatorEl.innerHTML = `<h2 class="centered-h2 alignable"> ${winner === card1El? localStorage.getItem('p1Name') :localStorage.getItem('p2Name') }'s turn</h2>`
        const alignableH2 =  document.querySelector('.alignable')
        if (winner === card1El) {
            turnIndicatorEl.classList.remove('ch2-right-aligned')
            turnIndicatorEl.classList.add('ch2-left-aligned')
        } else if (winner === card2El) {
            turnIndicatorEl.classList.add('ch2-right-aligned')
            turnIndicatorEl.classList.remove('ch2-left-aligned')
        }
    }

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
    roundWinnerMessageEl.classList.add('disabled-controls')
    setTimeout(()=>{roundWinnerMessageEl.classList.remove('disabled-controls')
    roundWinnerMessageEl.innerHTML = "Next round"
},3000)
    if (winner === card1El ) {
        if (card1Outer.classList.contains('active')) {
            card1Outer.classList.remove('player-turn')
            card2Outer.classList.add('shifted') 
            document.getElementById('buttonContainercard1').classList.toggle('squished')
            document.getElementById('buttonContainercard2').classList.toggle('squished')
            setTimeout(()=>{document.getElementById('buttonContainercard1').classList.toggle('squished')},3000) 
            setTimeout(()=>{document.getElementById('buttonContainercard2').classList.toggle('squished')
            card2Outer.classList.remove('shifted') },3000) 
            
        } else {
            card2Outer.classList.remove('player-turn')
            card1Outer.classList.add('shifted') 
            document.getElementById('buttonContainercard1').classList.toggle('squished')
            document.getElementById('buttonContainercard2').classList.toggle('squished')
            setTimeout(()=>{document.getElementById('buttonContainercard1').classList.toggle('squished')
            card1Outer.classList.remove('shifted') },3000) 
            setTimeout(()=>{document.getElementById('buttonContainercard2').classList.toggle('squished')},3000) 
            
        }
        roundWinnerMessageEl.innerHTML = `<p>
        ${battleArray[0].characterName} beats ${battleArray[1].characterName}</p>`
    } else {
        if (card2Outer.classList.contains('active')) {
            card1Outer.classList.add('shifted') 
            card2Outer.classList.remove('player-turn') 
            document.getElementById('buttonContainercard1').classList.toggle('squished')
            document.getElementById('buttonContainercard2').classList.toggle('squished') 
            setTimeout(()=>{document.getElementById('buttonContainercard1').classList.toggle('squished')
            card1Outer.classList.remove('shifted') },3000) 
            setTimeout(()=>{document.getElementById('buttonContainercard2').classList.toggle('squished')},3000) 
             
        } else {
            card2Outer.classList.add('shifted')   
            card1Outer.classList.remove('player-turn')
            document.getElementById('buttonContainercard1').classList.toggle('squished')
            document.getElementById('buttonContainercard2').classList.toggle('squished')
            setTimeout(()=>{document.getElementById('buttonContainercard1').classList.toggle('squished')},3000) 
            setTimeout(()=>{document.getElementById('buttonContainercard2').classList.toggle('squished')
            card2Outer.classList.remove('shifted')  },3000) 
             
        }
        roundWinnerMessageEl.innerHTML = `
        ${battleArray[1].characterName} beats ${battleArray[0].characterName}`
    }
    roundComplete()
    roundWinnerMessageEl.addEventListener('click', () =>{
        roundWinnerMessageEl.classList.remove('visible')
        card1Outer.classList.remove('shifted')
        card2Outer.classList.remove('shifted')
        document.getElementById('buttonContainercard1').classList.toggle('squished')
        document.getElementById('buttonContainercard2').classList.toggle('squished') 
   
  if (currentTurn) {
        battleArray[0].cardRenderer()
        battleArray[1].cardRenderer()
        turnCalculator(winner)
  } else {
    
        battleArray[1].cardRenderer()
        battleArray[0].cardRenderer() 
        turnCalculator(winner)       
        }
    
        if (winner === card1El) {
            card1Outer.classList.add('active')
            card1Outer.classList.add('player-turn')     
            card2Outer.classList.remove('active')     
            card2Outer.classList.remove('player-turn')     
            card2Outer.classList.remove('shifted')
            card2Outer.classList.add('blurred') 
            card1Outer.classList.remove('disabled-controls')
            card2Outer.classList.add('disabled-controls')
        } else if (winner === card2El){
            card2Outer.classList.add('active')
            card2Outer.classList.add('player-turn')     
            card1Outer.classList.remove('active')   
            card1Outer.classList.remove('player-turn')     
            card2Outer.classList.remove('shifted')
            card1Outer.classList.add('blurred') 
            card2Outer.classList.remove('disabled-controls')
            card1Outer.classList.add('disabled-controls')
            }
        
        gamelogic()
})
}

function gameFinished (){
    roundWinnerMessageEl.classList.remove('visible')
    gameWinnerMessageEl.classList.add('visible')
    gameWinnerMessageEl.innerHTML = `
    ${gameWinner} is the winner!
    <button id="playAgain">Play again?</button>`

    document.getElementById('playAgain').addEventListener('click',()=>{
        currentTurn? card1El.classList.remove('disabled-controls') : card2El.classList.remove('disabled-controls')
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
const aberforthDumbledore = new Character (12,"Prof. Dumbledore",40,32,45,50,10,"/images/dumbledore.jpg")
const feurirGreyback = new Character (13,"Feurir Greyback",65,30,9,40,18,"/images/feurir.jpg")
const minervaMcgonagall = new Character (14,"Prof. McGonagall",107,36,45,85,20,"/images/mcgonagall.jpg")
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

//clear cached image and card stats when creating the second card
//make stats container two divs that go from column to row
//
//refactoing
//lets playbtn and unbalanced lets play  and lets play 2btn are a duplication of code - resolve




