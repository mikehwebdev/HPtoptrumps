

//deckManipulator() makes a nodeList of all elements using a querySelectorAll. We can then iterate over that as we do any array using a forEach where we can apply classes to make non-clicked decks vanish and the clicked deck grow larger and make itself obvious to the user as the confirmed deck.

function deckManipulator(e) {
    const deckChoiceArray = document.querySelectorAll('.deck-choice')
    deckChoiceArray.forEach((choice) => {
        if (e.target.id != choice.id) {
            choice.classList.add('shrink-deck')
        } else {
            choice.classList.add(`${choice.id}-translate`)
            deckChoiceSetter(choice.id)
        }
    })
}
// deckChoiceSetter() takes the id passed from deckManipulator() and uses it to decide which palette to apply to the card to match the chosen house colour
function deckChoiceSetter(id){
    let rootEl = document.querySelector(':root')
    if (id === 'gryffindorDeck') {
        rootEl.style.setProperty('--card-text','#AE0001')
        rootEl.style.setProperty('--card-background-color-1','#D3A625')
        rootEl.style.setProperty('--card-background-color-2','white')
        rootEl.style.setProperty('--card-button-color-1','#EEBA30')
        rootEl.style.setProperty('--card-button-color-2','white')
    } else if (id === 'slytherinDeck') {
        rootEl.style.setProperty('--card-text','#000000')
        rootEl.style.setProperty('--card-background-color-1','#1A472A')
        rootEl.style.setProperty('--card-background-color-2','white')
        rootEl.style.setProperty('--card-button-color-1','#AAAAAA')
        rootEl.style.setProperty('--card-button-color-2','white')
    } else if (id === 'ravenclawDeck') {
        rootEl.style.setProperty('--card-text','#000000')
        rootEl.style.setProperty('--card-background-color-1','#222F5B')
        rootEl.style.setProperty('--card-background-color-2','white')
        rootEl.style.setProperty('--card-button-color-1','#946B2D')
        rootEl.style.setProperty('--card-button-color-2','white')
    } else if (id === 'hufflepuffDeck') {
        rootEl.style.setProperty('--card-text','#000000')
        rootEl.style.setProperty('--card-background-color-1','#60605C')
        rootEl.style.setProperty('--card-background-color-2','white')
        rootEl.style.setProperty('--card-button-color-1','#FFED86')
        rootEl.style.setProperty('--card-button-color-2','white')
    }
}
//returns a value between 1 and 6 to represent dice rolls
function diceRoll () {
    return Math.floor(Math.random() *6 +1)
}

//While creating a custom card the below function helps manage error message and calls to action for the user
function errorMessageSetter (stat) {
    stat.classList.add('error')
    stat.classList.add('boing')
    createCardBtn.classList.toggle('boing')
    setTimeout(()=>{
        stat.classList.remove('boing')
        stat.classList.remove('error')
        createCardBtn.innerHTML = 'Create my card'
        createCardBtn.classList.toggle('boing')
    },2500)
}

export {deckManipulator, diceRoll, errorMessageSetter}