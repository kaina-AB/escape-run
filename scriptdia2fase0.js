const bgMusic = document.getElementById('bgMusic');
const tutorialMusic = document.getElementById('tutorialMusic');
const soundToggle = document.getElementById('soundToggle');

const intro = document.getElementById('intro');
const menu = document.getElementById('menu');

const instructionsBtn = document.getElementById('instructionsBtn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

const startBtn = document.getElementById('startBtn');
const fadeOverlay = document.getElementById('fadeOverlay');

let soundOn = true;

// Quando clicar em "ESCAPE RUN", inicia música de fundo
intro.addEventListener('click', () => {
  bgMusic.volume = 1.0;
  bgMusic.play();
  window.location.href = 'jogodia2fase1.html';

  intro.classList.add('hidden');
  setTimeout(() => {
    menu.classList.remove('hidden');
  }, 1000);
});

// Botão de mute/unmute
soundToggle.addEventListener('click', () => {
  if (!bgMusic.paused) {
    bgMusic.pause();
    soundToggle.textContent = '🔇';
    soundToggle.classList.add('muted');
  } else {
    bgMusic.play().catch(e => console.log('Play prevented:', e));
    soundToggle.textContent = '🔊';
    soundToggle.classList.remove('muted');
  }
});



// Instruções: abaixa música de fundo e toca tutorial
instructionsBtn.addEventListener('click', () => {
  bgMusic.volume = 0.2;
  tutorialMusic.currentTime = 0;
  tutorialMusic.play();
  popup.classList.remove('hidden');
});

// Fechar instruções: para tutorial e volta volume da música de fundo
closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
  tutorialMusic.pause();
  bgMusic.volume = 1.0;
});

// Começar jogo: fade-out
startBtn.addEventListener('click', () => {
  let fade = 1.0;
  const fadeInterval = setInterval(() => {
    fade -= 0.05;
    if (fade <= 0) {
      fade = 0;
      clearInterval(fadeInterval);
      window.location.href = 'jogo.html';
    }
    bgMusic.volume = fade;
    fadeOverlay.style.opacity = 1 - fade;
  }, 100);


});
