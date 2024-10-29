import getWord from './word.js';

let chosenWord;
let guessedLetters = [];
let wrongLetters = [];

const newGameBtn = document.querySelector('.new-game');
const guessWordContainer = document.querySelector('.guess-word');
const clueContainer = document.querySelector('.clue');
const wrongLettersContainer = document.querySelector('.wrong-letters-list');
const letterButtons = document.querySelectorAll('.letter-buttons button');

function startNewGame() {
  const { word, clue } = getWord();
  chosenWord = word.toUpperCase();
  guessedLetters = Array(chosenWord.length).fill('_');
  wrongLetters = [];
  clueContainer.textContent = `Dica: ${clue}`;
  renderWord();
  wrongLettersContainer.textContent = '';
  enableButtons();
}

function renderWord() {
  guessWordContainer.innerHTML = guessedLetters.map(letter => `<span>${letter}</span>`).join('');
}

function enableButtons() {
  letterButtons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', handleGuess);
  });
}

function handleGuess(event) {
  const guessedLetter = event.target.textContent;
  event.target.disabled = true;

  if (chosenWord.includes(guessedLetter)) {
    chosenWord.split('').forEach((letter, index) => {
      if (letter === guessedLetter) guessedLetters[index] = guessedLetter;
    });
    renderWord();

    if (!guessedLetters.includes('_')) alert('Parabéns! Você venceu!');
  } else {
    wrongLetters.push(guessedLetter);
    wrongLettersContainer.textContent = wrongLetters.join(', ');

    if (wrongLetters.length >= 6) alert(`Você perdeu! A palavra era: ${chosenWord}`);
  }
}

newGameBtn.addEventListener('click', startNewGame);
startNewGame();
