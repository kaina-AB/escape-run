const verificarBtn = document.getElementById("verificar");
const respostaInput = document.getElementById("resposta");
const feedback = document.getElementById("feedback");
const timerDisplay = document.getElementById("timer");
const vitoria = document.getElementById("vitoria");
const nomeInput = document.getElementById("nome");
const salvarNomeBtn = document.getElementById("salvarNome");
const salvoFeedback = document.getElementById("salvoFeedback");

let tempo = 180; // 3 minutos
let intervalo;

// Substitua por sua criptografia correta
const respostaCorreta = "<&(+] ?&[& & ?+]!#+ 42"; 

function atualizarTimer() {
  const min = String(Math.floor(tempo / 60)).padStart(2, '0');
  const sec = String(tempo % 60).padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  tempo--;

  if (tempo < 0) {
    clearInterval(intervalo);
    feedback.textContent = "⏰ Tempo esgotado! Tente novamente depois.";
    verificarBtn.disabled = true;
    respostaInput.disabled = true;
  }
}

intervalo = setInterval(atualizarTimer, 1000);

verificarBtn.addEventListener("click", () => {
  if (respostaInput.value.trim() === respostaCorreta) {
    clearInterval(intervalo);
    vitoria.classList.remove("hidden");
    feedback.textContent = "";
  } else {
    feedback.textContent = "❌ Criptografia incorreta. Tente novamente.";
  }
});
