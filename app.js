let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 0;

let playGame = true;

if(playGame){
    submit.addEventListener('click' , (e)=>{
        e.preventDefault();
        const guess = parseInt(userInput.value)
        console.log(guess)
        validateGuess(guess)
    })
}


function validateGuess(guess){
    const error = document.querySelector('.error')
    if(isNaN(guess)){
        error.innerHTML = `Enter a Valid Number`
    } else if (guess < 1){
        error.innerHTML = `Enter a Number greater than 1`
    }else if (guess > 100){
        error.innerHTML = `Enter a Number Less than 100`
    }
    else{
        error.innerHTML = ""
        prevGuess.push(guess)
        if(numGuess === 9){
            displayGuess(guess)
            displayMessage(`Game Over | Random Number is ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
    
}


function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You Guessed the right Number ${randomNumber}`)
        endGame()
    } else if(guess < randomNumber){
        displayMessage(`Your Number is too Low`)
    } else if(guess > randomNumber){
        displayMessage(`Your Number is is too High`)
    }

}


function displayGuess(guess){
    userInput.value = ""
    guessSlot.innerHTML += `${guess},  `
    numGuess++;
    remaining.innerHTML = `${10 - numGuess}`
}

function displayMessage(message){
    lowOrHi.innerHTML = `${message}`
}

function endGame() {
    userInput.value = ""
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<button id="newgame" class="guessSubmit">New Game</button>`
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newgame')
    newGameButton.addEventListener('click' , (e)=>{
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = []
        numGuess = 0;
        guessSlot.innerHTML = ""
        remaining.innerHTML = `${10 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        lowOrHi.innerHTML = ""
        playGame = true

    })
}
