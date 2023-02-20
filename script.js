'use strict';

const player1Element = document.querySelector('.player1');
const player2Element = document.querySelector('.player2');

const newGameBtn = document.querySelector('.new-game--btn');
const rollDiceBtn = document.querySelector('.roll-dice--btn');
const holdBtn = document.querySelector('.hold--btn');

const dieImage = document.querySelector('.die-img');

let activePlayer = 1;
let currentScore = 0;

const generateNumber = () => Math.trunc(Math.random() * 6 + 1);
const getActivePlayer = () => document.querySelector('.player' + activePlayer);

const finishTheGame = function () {
   document.querySelector('body').style.filter = 'blur(3px)';
   document.querySelector('body').style.opacity = '0.5';

   newGameBtn.removeEventListener('click', reset);
   rollDiceBtn.removeEventListener('click', roll);
   holdBtn.removeEventListener('click', transfer);
}

const transfer = function (hold = true) {
   dieImage.src = '';
   const player = getActivePlayer();
   player.querySelector('.score').textContent = +player.querySelector('.score').textContent + (hold ? currentScore : 0);
   if (hold && +player.querySelector('.score').textContent >= 100) {
      finishTheGame();
      return;
   }
   player.querySelector('.current-score').textContent = 0;

   currentScore = 0;
   activePlayer = activePlayer === 1 ? 2 : 1;

   player1Element.classList.toggle('inactive');
   player2Element.classList.toggle('inactive');
}

const roll = function () {
   const dieValue = generateNumber();

   if (dieValue === 1 && currentScore > 0)
      transfer(false);
   else {
      dieImage.src = `dice-${dieValue}.png`;
      currentScore += dieValue;
      document.querySelectorAll('.current-score')[activePlayer - 1].textContent = currentScore;
   }
}

const reset = function () {
   [player1Element, player2Element].forEach(playerElement => {
      playerElement.querySelector('.score').textContent = 0;
      playerElement.querySelector('.current-score').textContent = 0;
   });

   player1Element.classList.remove('inactive');
   player2Element.classList.add('inactive');

   dieImage.src = `dice-${score}.png`;
}

newGameBtn.addEventListener('click', reset);
rollDiceBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', transfer);


