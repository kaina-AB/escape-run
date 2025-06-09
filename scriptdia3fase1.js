const intro = document.getElementById('intro');
const introText = document.getElementById('intro-text');
const game = document.getElementById('game');
const phraseDisplay = document.getElementById('phrase-display');
const submitBtn = document.getElementById('submit');
const gameover = document.getElementById('gameover');
const timerDisplay = document.getElementById('timer');

let timer = 420; 
let interval;

const originalPhrase = "O professor explicou";
const cipheredPhrase = "O 0?(@#//(? explicou";

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
    introText.textContent = "O 0?(@#//(? explicou";
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
  let allCorrect = true;

  inputs.forEach((input, i) => {
    const userChar = input.value.toLowerCase();
    const correctChar = originalPhrase[i].toLowerCase();

    if (userChar === correctChar) {
      input.value = originalPhrase[i];  // mantém o formato correto (maius/minus)
    } else if (originalPhrase[i] !== ' ') {
      input.value = cipheredPhrase[i];  // esconde a letra se for incorreta
      allCorrect = false;
    }
  });

  userInputs = Array.from(inputs).map(input => input.value);

  if (userInputs.join('') === originalPhrase) {
    alert("Parabéns! Frase completa!");
    clearInterval(interval);
    bgMusic.pause();
    window.location.href = 'indexdia2fase0.html';
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
