import { deckManipulator, diceRoll, errorMessageSetter} from "./utilities.js"
import { deckData } from "./data.js"

const roundWinnerMessageEl = document.getElementById('round-winner-message')
const gameWinnerMessageEl = document.getElementById('game-winner-message')
const card1El = document.getElementById('card1')
const card2El = document.getElementById('card2')
const card1Outer = document.querySelector('.card-outer1')
const card2Outer = document.querySelector('.card-outer2')
const p1DeckEl = document.getElementById('p1Deck')
const p2DeckEl = document.getElementById('p2Deck')
const playerDetailsEl = document.getElementById('playerDetails')
const nextBtn = document.getElementById('nextBtn')
//const containerEl = document.querySelector('.card-container')
const diceBtn = document.getElementById('diceBtn')
const diceRollEl = document.getElementById('diceRollEl')
const letsPlayBtn = document.getElementById('letsPlayBtn')
const dice1El = document.getElementById('dice1El')
const dice2El = document.getElementById('dice2El')
const cardCreatorImageEl = document.getElementById('cardCreator-image')
const cardCreatorStatsEl = document.getElementById('cardCreator-stats')
const image_input = document.querySelector('#uploadImage')
const uploadedImageEl = document.getElementById('uploadedImage')
const nameCustomEl = document.getElementById('nameCustom')
const magicCustomEl = document.getElementById('magicCustom')
const cunningCustomEl = document.getElementById('cunningCustom')
const courageCustomEl = document.getElementById('courageCustom')
const wisdomCustomEl = document.getElementById('wisdomCustom')
const temperCustomEl = document.getElementById('temperCustom')
const customCardDisplayEl = document.getElementById('customCardDisplay')
const customCardQuestionEl =document.getElementById('customCardQuestion')
const turnIndicatorEl = document.getElementById('turnIndicator')
const customCardBtns =document.getElementById('customCardBtns')
const unequalDeckEl = document.getElementById('unequalDeckEl')
const deckChoiceContainerEl = document.querySelector('.deck-choice-container')

let player1Deck = []
let player2Deck = []
let battleArray = []
let currentTurn = true
let turn = ''
let winner = ''
let gameWinner = ''
player1Name.value = ''
player2Name.value = ''
let cardStats = [ magicCustomEl, cunningCustomEl, courageCustomEl, wisdomCustomEl,temperCustomEl, nameCustomEl]


//This code hides the main title smoothly and removes it from the flow of the document so it doesn't impact screen real estate further in
document.getElementById('letsGo').addEventListener('click', ()=>{
    const mainTitleEl = document.querySelector('.main-title')
    mainTitleEl.classList.add('hide-header')
    setTimeout(()=>{
        mainTitleEl.style.display = 'none'
    }, 500)
    document.getElementById('welcome').classList.remove('visible')
    playerDetailsEl.classList.add('visible')
})


//This takes the entered name values and sets them in localStorage. If left blank the players are simply designated Player 1 and 2
nextBtn.addEventListener('click', ()=>{
    player1Name.value ? localStorage.setItem('p1Name', player1Name.value) : localStorage.setItem('p1Name', 'Player 1')
    player2Name.value ? localStorage.setItem('p2Name', player2Name.value) : localStorage.setItem('p2Name', 'Player 2')
    playerDetailsEl.classList.remove('visible')
    deckChoiceContainerEl.classList.add('visible')
})

//This event listener calls deckManipulator which chooses the game deck(Harry Potter house colours) and sets off an animation to add a bit of whizz to the app
document.querySelector('.deck-grid').addEventListener('click', deckManipulator)

//This a navigation element transition
document.getElementById('ontoCustomCards').addEventListener('click', ()=>{
    deckChoiceContainerEl.classList.remove('visible')
    customCardQuestionEl.classList.add('visible')
})

// If user chooses to create a card it clears any previously uploaded image from localStorage and calls clearCardStats() to clear any previously stored card stats. This is done because this function is also called if the user creates a second custom card saving ther need for a second function.
document.getElementById('cardCreatorBtn').addEventListener('click', ()=>{
    localStorage.removeItem("uploaded image")
    clearCardStats()
    customCardQuestionEl.classList.remove('visible')
    diceRollEl.classList.remove('visible')
    cardCreatorImageEl.classList.add('visible')
})

//The below input listens for a "change" i.e when the selected file is uploaded. the FileReader allows us to "read! data submitted by the users device and marks the result as uploaded_image. We can then set the innerHTML with that variable and set it in localStorage to access at a later date i.e when we create the custom card.
image_input.addEventListener("change", function() {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result
      uploadedImageEl.innerHTML = `<img src="${uploaded_image}">`
      localStorage.setItem("uploaded image",uploaded_image)
    })
    reader.readAsDataURL(this.files[0])    
  })

//The below is a navigation element transition
document.getElementById('ontoStats').addEventListener('click', ()=>{
    cardCreatorImageEl.classList.remove('visible')
    cardCreatorStatsEl.classList.add('visible')
})

//The below forEach applies a random value between 1-100 to our custom card stats - except for the name field which it leaves blank
document.getElementById('randomiseBtn').addEventListener('click', ()=>{
    cardStats.forEach((stat)=>{
        if (stat != nameCustomEl)
        stat.value = Math.floor(Math.random() *100 +1)
    })
})

//This button simply starts the game by calling letsPlay()
letsPlayBtn.addEventListener('click', ()=>{
    letsPlay()
 })
 
 
 //letsPlay() removes the dice roll section, makes the card container visible, establishes which player won the dice roll and then sets the currentTurn boolean to the approriate setting (true for player 1's turn, false for player2). We use this boolean as an ongoing record of whose turn it is through the game.
 function letsPlay(){
     diceRollEl.classList.remove('visible')
     document.querySelector('.card-container').classList.add('visible')
     if (dice1El.innerHTML > dice2El.innerHTML) {
         currentTurn = true
     } else {
         currentTurn = false
     }
     gameStart()
 }
 

//gameStart() starts the actual game
function gameStart() {
    //This pushes the first card from each player deck into a battleArray
    battleArray.push(player1Deck[0], player2Deck[0])
    //We then shift() those cards from each player deck as if they have moved into the battle
    player1Deck.shift()
    player2Deck.shift()
    //If currentTurn is true (Player 1's turn) we render the battle array in the correct order calling cardRenderer()
    if (currentTurn) {
        battleArray[0].cardRenderer()
        battleArray[1].cardRenderer()
    //turnIndicator uses the previous round winner (or player taking the first turn here) to to display the turn indicator in game
        turnIndicator(card1El)
        //the below makes the active player visible and orders the cards correctly using the flexbox property, and also blurs the non-active card and disables its controls
        card1Outer.classList.add('active')
        card1Outer.classList.add('player-turn')
        card2Outer.classList.add('blurred')
        card2Outer.classList.add('disabled-controls')
        //cardsRemaining() and battleLogic() have full notes below
        cardsRemaining()
        battleLogic()
    } else {
        battleArray[1].cardRenderer()
        battleArray[0].cardRenderer()
        turnIndicator(card2El)
        card2Outer.classList.add('active')
        card2Outer.classList.add('player-turn')
        card1Outer.classList.add('blurred')
        card1Outer.classList.add('disabled-controls')
        cardsRemaining()
        battleLogic()
    }
}




class Character {
    constructor(data) {
       Object.assign(this, data)
    }
        cardRenderer() {    
              const {characterName, image, magic, cunning, courage, wisdom, temper} = this
           currentTurn? turn = card1El : turn = card2El

            turn.innerHTML =  
            `<p class="cheeky-hint">Swipe to peek at their card!</p>
            <h2>${characterName}</h2>
            <div class="image-container">
            <img src=${image} class="character-image"></>
            </div>
            
            <ul class="button-container" id="buttonContainer${turn.id}">
            <li id="magic" class="magic">Magic <span>&#10148;</span> ${magic} </li>
            <li id="cunning" class="cunning">Cunning <span>&#10148;</span> ${cunning} </li>
            <li id="courage" class="courage">Courage <span>&#10148;</span> ${courage} </li>
            <li id="wisdom" class="wisdom">Wisdom <span>&#10148;</span> ${wisdom} </li>
            <li id="temper" class="temper">Temper <span>&#10148;</span> ${temper} </li>
        </ul>`
        
            currentTurn = !currentTurn    
        };

    }

    //this takes the user past the custom card section and staright to the dice roll section
document.getElementById('skipBtn').addEventListener('click', ()=>{
    customCardQuestionEl.classList.remove('visible')
    diceRollEl.classList.add('visible')
    document.querySelector('.centered-h2P1').innerHTML = localStorage.getItem('p1Name')
    document.querySelector('.centered-h2P2').innerHTML = localStorage.getItem('p2Name')
    letsPlayBtn.style.display = 'none'
})


//when the dice is rolled
diceBtn.addEventListener('click', ()=>{
    //we disable the button to ensure the user doesn;t endlessly roll
    diceBtn.classList.add('disabled-controls')
    // we set a variable of diceCount to 0 as we'll be using this to track dicerolls
    let diceCount = 0
    //this communicates to the user that the dice is currently rolling
    rollWinner.innerHTML = `<h2 class="centered-h2">Rolling...</h2>`
    //we setInterval to run this function repeatedly
    let myInterval = setInterval(()=>{
        //diceRoll() returns a value of 1-6 which we can use as a filename which has an image with the corresponding number
        dice1El.innerHTML = `<img src="./images/${diceRoll()}.png" class="dice-image">`
        dice2El.innerHTML = `<img src="./images/${diceRoll()}.png" class="dice-image">`
        //diceCount is incremented
        diceCount = diceCount +1
        //once we've gone through this process enough times to get the diceCount up to 20 (and to give the illusion of rolling dice)we clearInterval
        if (diceCount === 20){
            
            clearInterval(myInterval)

        // if the two amounts don't match wew make the lets play button visible again and remove the dice button
            if (dice1El.innerHTML !== dice2El.innerHTML) {
                letsPlayBtn.style.display = 'block'
                diceBtn.style.display = 'none'
                
            //I communicate who won the roll ad they can click on
            dice1El.innerHTML > dice2El.innerHTML? rollWinner.innerHTML = `<h2 class="centered-h2">${localStorage.getItem('p1Name')} goes first!</h2>`: rollWinner.innerHTML = `<h2 class="centered-h2">${localStorage.getItem('p2Name')} goes first!</h2>`
            diceBtn.classList.remove('disabled-controls')
            //or its a draw and they have to roll again
        } else {
            rollWinner.innerHTML = `<h2 class="centered-h2">It's a draw.<br> Roll again!</h2>`
            diceBtn.classList.remove('disabled-controls')
        }
        }
    },200)
    })
    


//the below event listener checks if all input fields have an appropriate value - if they do it triggers cardCreator()

createCardBtn.addEventListener('click', ()=>{
    if (cardStats.every(stat => stat.value && stat.value< 101)) {
    cardCreator()

// if not we create a variable containing all input stats and cycles through them and adds an error class to the element to highlight it to the user (animation and colouring) and changes the text to instruct the user which removes itself after 2.5 seconds and resets back to the navigation message. Note all elements are set to text and a regular expression is set against the html element which only allows characters 0-9
} else {
    let customCardStats = document.getElementById('cardCreator-stats').childNodes
    for (const stat of customCardStats) {
        if (stat.value === '' && stat.type === 'text') {
            errorMessageSetter(stat)
            createCardBtn.innerHTML = `Please finish inputting your custom card details above.`
            return
        }
        else if (stat.value > 100){
            errorMessageSetter(stat)
            createCardBtn.innerHTML = `Please enter a number 100 or below.`
            return
        }
    }
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
        clearCardStats()
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
//clearCardStats() loops through the array of custom card inputs and clears them ready for a new card to be created
function clearCardStats (){
    cardStats.forEach((stat)=>{
        stat.value = ''
    })
        uploadedImageEl.innerHTML = ''
        image_input.value = ''
}

//cardsRemaining populates the onscreen player deck info with cards remaining with contextual animations
function cardsRemaining() {
    document.getElementById('p1DeckText').innerHTML = 
    //This displays the player name
    `<p class="cards-left">${localStorage.getItem('p1Name')}'s deck</p>`
    p1DeckEl.innerHTML = ''
    //the below provides contextual info on the player decks. If more than five it displays a mini card and a x12 for a deck of 12 cards
    if (player1Deck.length > 5) {
        p1DeckEl.innerHTML = `<div class="mini-card "></div> x <p class="cards-left">${player1Deck.length}</p>`
        // if more than 3 it displays individual mini cards
    } else if (player1Deck.length > 3) {
        player1Deck.forEach(() => {
            p1DeckEl.innerHTML += `<div class="mini-card"></div>`
        })
        //if more than one card it displays an urgent animation
    } else if (player1Deck.length > 1) {
        player1Deck.forEach(() => {
            p1DeckEl.innerHTML += `<div class="mini-card flaming-card"></div>`
        })
        //if exactly one card is left a more urgent animation is applied
    } else if (player1Deck.length === 1) {
        p1DeckEl.innerHTML += `<div class="mini-card mega-flaming-card"></div>`
    }
    //The below is a mirror for the above but for player 2's deck   
    document.getElementById('p2DeckText').innerHTML = 
    `<p class="cards-left">${localStorage.getItem('p2Name')}'s deck</p>`
    p2DeckEl.innerHTML = ''
    if (player2Deck.length > 5) {
        p2DeckEl.innerHTML = `<div class="mini-card "></div> x <p class="cards-left">${player2Deck.length}</p>`
    } else if (player2Deck.length > 3) {
        player2Deck.forEach(() => {
            p2DeckEl.innerHTML += `<div class="mini-card"></div>`
        })
    } else if (player2Deck.length > 1) {
        player2Deck.forEach(() => {
            p2DeckEl.innerHTML += `<div class="mini-card flaming-card"></div>`
        })
    } else if (player2Deck.length === 1) {
        p2DeckEl.innerHTML += `<div class="mini-card mega-flaming-card"></div>`
    }
}

//battleLogic() compares the chosen attribute to determine the round winner/ 
function battleLogic(){
    //buttonContainers is using querySelectorAll to create a node list which works as an array here
    const buttonContainers = document.querySelectorAll('.button-container')
        buttonContainers.forEach((buttonContainer, index)=> {  
                   //we forEach over every both button containers and pass the index as a parameter
            buttonContainer.addEventListener('click',(e)=>{  
                //we dynamically add an event listener and pass the event information as e in the initial if statement index === 0 will mean it's player ones turn we do this as players can have more than one turn in a row if they win and we have disabled the non-active player's card using CSS(pointer-events:none)
            if (index === 0) {
                //this compares the value of the chosen attribute (i.e Magic 65) and the if statements control the user journey
                if (battleArray[0][e.target.id] > battleArray[1][e.target.id] ) {
                    //this variable is a record of the winner for other functions to use
                    winner = card1El
                    //highlights is a nodelist of all elements that share the same class (i.e one in each button container) - I use the e.target.id to be the string in the querySelectorAll so they match
                    let highlights = document.querySelectorAll(`.${e.target.id}`)
                    //highlights is passed to choiceHighlighter() which adds a class that highlights the choice in each button container
                    choiceHighlighter(highlights)
                    //compareStats simply disables pointer events on both cards and un blurs them to see how the stats compare
                    compareStats()

                    displayRoundWinner()
                        } else {
                            
                    winner = card2El
                    let highlights = document.querySelectorAll(`.${e.target.id}`)
                    choiceHighlighter(highlights)
                    compareStats()
                    displayRoundWinner()
                        }
                        } else {
                            if (battleArray[1][e.target.id] > battleArray[0][e.target.id] ) {
                            winner = card2El          
                            let highlights = document.querySelectorAll(`.${e.target.id}`)            
                            choiceHighlighter(highlights)
                            compareStats()
                            displayRoundWinner()
                        } else {
                            winner = card1El
                            let highlights = document.querySelectorAll(`.${e.target.id}`)
                            choiceHighlighter(highlights)
                            compareStats()
                            displayRoundWinner()
                }
            }})
        } )}

//removes blur from both cards and disables controls as there is no player action to take
function compareStats(){
        card1Outer.classList.remove('blurred')
        card2Outer.classList.remove('blurred')
        card1Outer.classList.add('disabled-controls')
        card2Outer.classList.add('disabled-controls')
}   

//turnIndicator takes the winner and ensures the appropriate class is applied so the floating "Player Turn" message floats over the correct card(complete with custom name where entered)
    function turnIndicator (winner){
        turnIndicatorEl.classList.add('visible')
        turnIndicatorEl.innerHTML = `<h2 class="centered-h2 alignable"> ${winner === card1El? localStorage.getItem('p1Name') :localStorage.getItem('p2Name') }'s turn</h2>`
        if (winner === card1El) {
            turnIndicatorEl.classList.remove('ch2-right-aligned')
            turnIndicatorEl.classList.add('ch2-left-aligned')
        } else  {
            turnIndicatorEl.classList.add('ch2-right-aligned')
            turnIndicatorEl.classList.remove('ch2-left-aligned')
        }
    }
//highlights the attribute chosen by the player during battle and highilights it and the other players equivalent stat for comparison
    function choiceHighlighter(highlights){
                            highlights[0].classList.add('choice')
                            highlights[1].classList.add('choice')
    }
//roundStatusCheck() is invoked during the round complete function to establish if this is the last round of the game. If it is it invokes gameFinished
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


   //roundComplete() uses the winner variable as context, pushes the battle array contents to the winners array, runs roundStatusCheck() to check if that was the last round in the overall game and if not blanks the battleArray, pushes the next card from each player array for the next round and shifts out that card from the player decks
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
            }}
            
// squisher functions are to and and remove classes on card elements to communicate active round info to the user
function card1Squisher() {
    card1Outer.classList.remove('player-turn')
    card2Outer.classList.add('shifted') 
    document.getElementById('buttonContainercard1').classList.toggle('squished')
    document.getElementById('buttonContainercard2').classList.toggle('squished')
    setTimeout(()=>{document.getElementById('buttonContainercard1').classList.toggle('squished')},3000) 
    setTimeout(()=>{document.getElementById('buttonContainercard2').classList.toggle('squished')
    card2Outer.classList.remove('shifted') },3000) 
}

// squisher functions are to and and remove classes on card elements to communicate active round info to the user
function card2Squisher (){
    card2Outer.classList.remove('player-turn')
    card1Outer.classList.add('shifted') 
    document.getElementById('buttonContainercard1').classList.toggle('squished')
    document.getElementById('buttonContainercard2').classList.toggle('squished')
    setTimeout(()=>{document.getElementById('buttonContainercard1').classList.toggle('squished')
    card1Outer.classList.remove('shifted') },3000) 
    setTimeout(()=>{document.getElementById('buttonContainercard2').classList.toggle('squished')},3000) 
}

function displayRoundWinner() {
    //first we make the user message visible and disable the controls for 3 seconds to stop the user triggering the next round/event listener to early
    roundWinnerMessageEl.classList.add('visible')
    roundWinnerMessageEl.classList.add('disabled-controls')
    setTimeout(()=>{roundWinnerMessageEl.classList.remove('disabled-controls')
    roundWinnerMessageEl.innerHTML = "Next round"
},3000)
    //using the winner variable for context, the if statement applies the appropriate classes to shift the non-active player onto the screen, and also "squishes" the button container so that all the attribute details are visible on one mobile sized screen - I adjust the CSS on larger screen sizes to stop this action from happening as it isn't needed
    if (winner === card1El ) {
        if (card1Outer.classList.contains('active')) {
            card1Squisher()
        } else {
            card2Squisher()            
        }
        //player 1 beats player 2 message
        roundWinnerMessageEl.innerHTML = `<p>
        ${battleArray[0].characterName} beats ${battleArray[1].characterName}</p>`
    } else {
        if (card2Outer.classList.contains('active')) {
            card2Squisher()
        } else {
            card2Outer.classList.add('shifted')   
            card1Squisher() 
        }
        roundWinnerMessageEl.innerHTML = `
        ${battleArray[1].characterName} beats ${battleArray[0].characterName}`
    }
    //roundComplete() takes care of moving cards between arrays and checking the games overall status
    roundComplete()

    //once the user reads the message they can click to continue to remove the message and all classes so they cards are unun-squished and shiftedback to their usual positions
    roundWinnerMessageEl.addEventListener('click', () =>{
        roundWinnerMessageEl.classList.remove('visible')
        card1Outer.classList.remove('shifted')
        card2Outer.classList.remove('shifted')
        document.getElementById('buttonContainercard1').classList.toggle('squished')
        document.getElementById('buttonContainercard2').classList.toggle('squished') 
   
  if (currentTurn) {
        battleArray[0].cardRenderer()
        battleArray[1].cardRenderer()
        turnIndicator(winner)
        afterRoundClassSetter(winner)
  } else {
        battleArray[1].cardRenderer()
        battleArray[0].cardRenderer() 
        turnIndicator(winner)       
        afterRoundClassSetter(winner)
        }

        cardsRemaining()
        battleLogic()
})
}
//this applies all classes for displaying in game cards in the correct position, off-player card being blurred out and with controls disabled
function afterRoundClassSetter(winner){
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
}

//if the final round is played a message is displayed with the winner and asking if user would like to play again. If they do we reset global variables back to their start conditions, reshuffle the deck and trigger gameStart()
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
            
        })
        gameStart()
    })
}


const argusFilch = new Character (deckData[0])
const severusSnape = new Character (deckData[1])
const dracoMalfoy = new Character (deckData[2])
const rubeusHagrid = new Character (deckData[3])
const lunaLovegood = new Character (deckData[4])
const lordVoldemort = new Character (deckData[5])
const ginnyWeasley = new Character (deckData[6])
const alectoCarrow = new Character (deckData[7])
const hermioneGranger = new Character (deckData[8])
const bellatrixLestrange = new Character (deckData[9])
const griphook = new Character (deckData[10])
const aberforthDumbledore = new Character (deckData[11])
const feurirGreyback = new Character (deckData[12])
const minervaMcgonagall = new Character (deckData[13])
const percyWeasley = new Character (deckData[14])
const choChang = new Character (deckData[15])
const nevilleLongbottom = new Character (deckData[16])
const mrOllivander = new Character (deckData[17])
const ronWeasley = new Character (deckData[18])
const harryPotter = new Character (deckData[19])
const seamusFinnegan = new Character (deckData[20])
const sybillTrelawney = new Character (deckData[21])
const nagini = new Character (deckData[22])
const deanThomas = new Character (deckData[23])
const gregoryGoyle = new Character (deckData[24])
const amycusCarrow = new Character (deckData[25])


const characters = [argusFilch,severusSnape,dracoMalfoy,rubeusHagrid,lunaLovegood,lordVoldemort,ginnyWeasley,alectoCarrow,hermioneGranger,bellatrixLestrange,griphook,aberforthDumbledore,feurirGreyback,minervaMcgonagall,percyWeasley,choChang,nevilleLongbottom,mrOllivander,ronWeasley,harryPotter,seamusFinnegan,sybillTrelawney,nagini,deanThomas,gregoryGoyle,amycusCarrow]


characters.forEach((character)=>{
    character.ref%2 !== 0? player1Deck.push(character) : player2Deck.push(character);
    //character.ref === 1? player2Deck.push(character) : player1Deck.push(character);
})

//refactoring task
//change all charcetr creating to access data rather th\n the data being in the constructor calling. import and export will have to be set up too
// characters is only used by the shiffling foreach currenty. perhaps store the characters data in data.js and export to app.js, change the foreaches to a shuffle function and import that, when new constructor is called it should access the data rather than passing all info then the constructor can deconstruct that data.

//amending all those constructors into one big data file is a days 
//make stats container two divs that go from column to row
// make dice roll element grid 
//lets playbtn and unbalanced lets play  and lets play 2btn are a duplication of code - resolve
//732 lines of code before refactoring


