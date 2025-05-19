  const images = document.querySelectorAll('.lightbox-img');
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');

  images.forEach(img => {
    img.addEventListener('click', () => {
      const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));
      
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      
      // Remove classes anteriores de zoom
      lightboxImage.className = '';
      lightboxImage.removeAttribute('data-zoom');

      if (zoomClass) {
        lightboxImage.classList.add(zoomClass);
        lightboxImage.setAttribute('data-zoom', '');
      }

      overlay.style.display = 'flex';
    });
  });

  // Fechar clicando fora da imagem
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      overlay.style.display = 'none';
      lightboxImage.src = '';
    }
  });

  // Fechar clicando no botão X
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    lightboxImage.src = '';
  });



// // Efeito lightbox
// const overlay = document.getElementById("zoom-overlay");
// const zoomedImg = document.getElementById("zoomed-img");
// const closeBtn = document.getElementById("zoom-close");

// document.querySelectorAll(".zoomable").forEach(img => {
//     // Quando o mause passa por cima da imagem, muda o cursor para o zoom-in
//     img.style.cursor = 'zoom-in';
//     // Quando uma imagem do conteúdo for clicada
//     img.addEventListener("click", () => {
//         const src = img.getAttribute("src");
//         const zoomClass = [...img.classList].find(cls => cls.startsWith("zoom-"));

//         overlay.className = "zoom-overlay"; // remove hidden
//         overlay.classList.add(zoomClass);   // aplica a classe do tamanho do zoom.
//         zoomedImg.src = src;
//     });
// });

// //Fecha o zoom ao clicar no botão X
// closeBtn.addEventListener("click", () => {
//     overlay.classList.add("hidden");
//     overlay.className = "zoom-overlay hidden";
//     zoomedImg.src = "";
// });

// //Fecha o zoom ao clicar fora da imagem
// overlay.addEventListener("click", (e) => {
//     if (e.target === overlay) {
//         overlay.classList.add("hidden");
//         overlay.className = "zoom-overlay hidden";
//         zoomedImg.src = "";
//     }
// }); 