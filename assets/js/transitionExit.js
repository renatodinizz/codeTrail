document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  const transitionEl = document.querySelector(".page-transition");

  if (
    link &&
    link.href &&
    link.origin === location.origin &&
    !link.href.includes("#") &&
    !link.target
  ) {
    e.preventDefault(); // Interrompe a navegação padrão

    // Remove a classe hide (caso ainda esteja ativa)
    transitionEl.classList.remove("hide");

    // Força reflow para reiniciar a animação
    transitionEl.offsetHeight;

    // Ativa a transição de saída
    transitionEl.classList.add("active");

    // Aguarda a animação e redireciona
    setTimeout(() => {
      window.location.href = link.href;
    }, 1500); // Igual à duração da transição CSS
  }
});

// Suporte ao botão Voltar do navegador (entrada novamente)
window.addEventListener("pageshow", (event) => {
  const transitionEl = document.querySelector(".page-transition");

  // Só aplica o efeito se não estiver vindo do cache
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
    transitionEl.classList.remove("hide");
    setTimeout(() => {
      transitionEl.classList.add("hide");
    }, 100);
  }
});
