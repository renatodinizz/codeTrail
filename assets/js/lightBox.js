// Efeito lightbox
const overlay = document.getElementById("zoom-overlay");
const zoomedImg = document.getElementById("zoomed-img");
const closeBtn = document.getElementById("zoom-close");

document.querySelectorAll(".zoomable").forEach(img => {
    // Quando o mause passa por cima da imagem, muda o cursor para o zoom-in
    img.style.cursor = 'zoom-in';
    // Quando uma imagem do conteúdo for clicada
    img.addEventListener("click", () => {
        const src = img.getAttribute("src");
        const zoomClass = [...img.classList].find(cls => cls.startsWith("zoom-"));

        overlay.className = "zoom-overlay"; // remove hidden
        overlay.classList.add(zoomClass);   // aplica a classe do tamanho do zoom.
        zoomedImg.src = src;
    });
});

//Fecha o zoom ao clicar no botão X
closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    overlay.className = "zoom-overlay hidden";
    zoomedImg.src = "";
});

//Fecha o zoom ao clicar fora da imagem
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.add("hidden");
        overlay.className = "zoom-overlay hidden";
        zoomedImg.src = "";
    }
}); 