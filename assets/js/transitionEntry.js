// Espera o DOM carregar para aplicar o efeito de entrada
window.addEventListener("DOMContentLoaded", () => {
  const transitionEl = document.querySelector(".page-transition");

  // Aplica o "fade out" da tela escura após o carregamento
  setTimeout(() => {
    transitionEl.classList.add("hide");
  }, 200); // Pequeno atraso para garantir a transição
});