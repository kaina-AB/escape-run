const intro = document.getElementById('intro');
const introText = document.getElementById('intro-text');
const game = document.getElementById('game');
const phraseDisplay = document.getElementById('phrase-display');
const submitBtn = document.getElementById('submit');
const gameover = document.getElementById('gameover');
const timerDisplay = document.getElementById('timer');

let timer = 420; 
let interval;

const originalPhrase = "eu gosto de morango";
const cipheredPhrase = "eu gosto de (+[&0*+";

let userInputs = [];
let attempts = 7;

const attemptsDisplay = document.createElement('div');
attemptsDisplay.id = 'attempts';
game.appendChild(attemptsDisplay);

function updateAttempts() {
  attemptsDisplay.textContent = `Tentativas restantes: ${attempts}`;
}

// 🎵 SONS
const clickSound = new Audio('click.mp3');
const errorSound = new Audio('error.mp3');
const gameoverSound = new Audio('gameover.mp3');
const bgMusic = new Audio('jogo.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

const timerSound = new Audio('timer.mp3'); // ou 'tick.mp3'

function startIntro() {
  setTimeout(() => {
    introText.textContent = "Primeira frase";
    setTimeout(() => {
      intro.classList.add('hidden');
      game.classList.remove('hidden');
      startTimer();
      renderPhrase();
      updateAttempts();
      bgMusic.play();
    }, 2000);
  }, 2000);
}

function renderPhrase() {
  phraseDisplay.innerHTML = "";
  cipheredPhrase.split('').forEach((char, i) => {
    const input = document.createElement('input');
    input.classList.add('letter-box');
    input.maxLength = 1;
    input.value = userInputs[i] || char;
    phraseDisplay.appendChild(input);
  });
}

submitBtn.addEventListener('click', () => {
  clickSound.play();

  if (attempts <= 0) {
    alert("Você perdeu todas as tentativas!");
    clearInterval(interval);
    bgMusic.pause();
    gameoverSound.play();
    gameover.classList.remove('hidden');
    return;
  }

  const inputs = document.querySelectorAll('.letter-box');
  let correctSoFar = "";

  inputs.forEach((input, i) => {
    if (input.value.toLowerCase() === originalPhrase[i]) {
      correctSoFar += originalPhrase[i];
      input.value = originalPhrase[i]; 
    } else {
      input.value = cipheredPhrase[i]; 
    }
  });

  userInputs = Array.from(inputs).map(input => input.value);

  if (correctSoFar === originalPhrase) {
    alert("Parabéns! Frase completa!");
    clearInterval(interval);
    bgMusic.pause();
    window.location.href = 'jogofrase2.html';
  } else {
    attempts--;
    errorSound.play();
    updateAttempts();
    if (attempts <= 0) {
      alert("Você perdeu todas as tentativas!");
      clearInterval(interval);
      bgMusic.pause();
      gameoverSound.play();
      gameover.classList.remove('hidden');
    }
  }
});

function startTimer() {
  interval = setInterval(() => {
    let min = Math.floor(timer / 60);
    let sec = timer % 60;
    timerDisplay.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    timerSound.play();
    timer--;

    if (timer < 0) {
      clearInterval(interval);
      bgMusic.pause();
      gameoverSound.play();
      gameover.classList.remove('hidden');
    }
  }, 1000);
}

startIntro();
