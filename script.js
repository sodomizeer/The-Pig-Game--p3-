'use strict';

//Defining Functionalities
const swithPlayer = function () {
  //reset previous scores
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  //Switch the player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //Changing CSS
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

const rollD = function () {
  if (playing) {
    let d = Math.trunc(Math.random() * 6) + 1;

    console.log(d);

    //Display Dice and manipulate the image src content
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${d}.png`;

    if (d !== 1) {
      //Adding Score
      currentScore += d;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // player0El.classList.toggle('player--active');
    } else {
      swithPlayer();
    }
  }
};

//Defining Global DOM variable by ID and CLASSES
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //Let's us select DOM elements by ID [Without the hashtag]

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentScoreEl1 = document.getElementById('current--0');
const currentScoreEl2 = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//State Variables
let activePlayer = 0;
const scores = [0, 0];
let currentScore = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', rollD);

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score first
    scores[activePlayer] += currentScore;

    //determine the activeP and Display it on the scoreboard
    activePlayer === 0
      ? (score0El.textContent = scores[activePlayer])
      : (score1El.textContent = scores[activePlayer]);

    //resetting Current Score

    //Check if score >= 100
    if (scores[activePlayer] >= 10) {
      //Now to update CSS for winnnn
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //Display Winner text
      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Won`;
      document.querySelector(`#name--${activePlayer}`).style.fontSize = '3rem';
      document.querySelector(`#name--${activePlayer}`).style.fontWeight = '900';

      //Remove the active players
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //Remove the Dice image
      // diceEl.src = `celeb.gif`;
      diceEl.classList.add('hidden');
      console.log();

      //Set playing to false
      playing = false;
    } else {
      swithPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  document.getElementById(`current--${activePlayer}`).textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
  document.querySelector(`#name--${activePlayer}`).style.fontSize = '4rem';

  activePlayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');

  playing = true;
  // player1El.classList.toggle('player--active');
  // player0El.classList.toggle('player--active');

  // playing = true;
});
