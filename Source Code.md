# Guess Number Game 🎮

## 🔗 Source Code

`HTMl`

```HTML
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title> Guess Number Game</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="shortcut icon" href="/favicon.png" type="image/x-icon">
  </head>
  <body>
    <div id="wrap">
      <h1>Guess Number Game</h1>
      <p>Try and Guess a Random Number between 1 and 100.</p>
      <p>You have 10 attempts to Guess the Right Number.</p>
      <br />
      <form action="" class="form">
        <label for="guessField" id="guess">Guess a Number:</label>
        <input type="text" name="" id="guessField" class="guessField" />
        <div class="error"></div>
        <input
          type="submit"
          id="subt"
          class="guessSubmit"
          value="Submit Guess"
        />
      </form>
      <!-- Options -->
      <div class="resultParas">
        <p style="font-size: 1.3rem">
          Previous Guesses: <span class="guesses"></span>
        </p>
        <p style="font-size: 1.3rem">
          Guess Remaining: <span class="lastResult">10</span>
        </p>
        <p class="lowOrHi" style="font-size: 1.3rem"></p>
      </div>
    </div>
  </body>
  <script src="app.js"></script>
</html>

```

`CSS`

```CSS
    @import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Playwrite+NG+Modern:wght@100..400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Teko:wght@300..700&display=swap");

body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: "Teko", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

#wrap {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 400px;
  width: 90%;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

p {
  color: #666;
  margin: 10px 0;
  font-size: 1.3rem;
}

.form {
  margin: 20px 0;
}

#guess {
  display: block;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.guessField {
  width: calc(100% - 22px);
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.guessField:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}

.guessSubmit {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.guessSubmit:hover {
  background-color: #0056b3;
}

.resultParas p {
  margin: 10px 0;
  font-size: 16px;
}

.resultParas .guesses,
.resultParas .lastResult,
.resultParas .lowOrHi {
  font-weight: bold;
  color: #007bff;
}

.resultParas {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  #wrap {
    padding: 20px;
    max-width: 90%;
  }

  h1 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1.1rem;
  }

  #guess {
    font-size: 1rem;
  }

  .guessField,
  .guessSubmit {
    font-size: 14px;
    padding: 8px;
  }

  .resultParas {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  #wrap {
    padding: 15px;
    max-width: 100%;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  #guess {
    font-size: 0.9rem;
  }

  .guessField,
  .guessSubmit {
    font-size: 12px;
    padding: 6px;
  }

  .resultParas {
    font-size: 1rem;
  }
}
.error{
  font-size: 1.5rem;
}
```

`JS`

```JS
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

```
