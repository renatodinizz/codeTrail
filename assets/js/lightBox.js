  //esseu deu muito certo
  // const images = document.querySelectorAll('.lightbox-img');
  // const overlay = document.getElementById('lightbox-overlay');
  // const lightboxImage = document.getElementById('lightbox-image');
  // const closeBtn = document.getElementById('lightbox-close');

  // images.forEach(img => {
  //   img.addEventListener('click', () => {
  //     const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));
      
  //     lightboxImage.src = img.src;
  //     lightboxImage.alt = img.alt;
      
  //     // Remove classes anteriores de zoom
  //     lightboxImage.className = '';
  //     lightboxImage.removeAttribute('data-zoom');

  //     if (zoomClass) {
  //       lightboxImage.classList.add(zoomClass);
  //       lightboxImage.setAttribute('data-zoom', '');
  //     }

  //     overlay.style.display = 'flex';
  //   });
  // });

  // // Fechar clicando fora da imagem
  // overlay.addEventListener('click', (e) => {
  //   if (e.target === overlay || e.target === closeBtn) {
  //     overlay.style.display = 'none';
  //     lightboxImage.src = '';
  //   }
  // });

  // // Fechar clicando no botão X
  // closeBtn.addEventListener('click', () => {
  //   overlay.style.display = 'none';
  //   lightboxImage.src = '';
  // });







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




const images = document.querySelectorAll('.lightbox-img');
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');

  // Variáveis para pinch zoom
  let initialDistance = null;
  let currentScale = 1;

  // Abrir lightbox
  images.forEach(img => {
    img.addEventListener('click', () => {
      const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));
      
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxImage.className = '';
      lightboxImage.removeAttribute('data-zoom');
      lightboxImage.style.transform = ''; // reset zoom

      if (zoomClass) {
        lightboxImage.classList.add(zoomClass);
        lightboxImage.setAttribute('data-zoom', '');
      }

      overlay.classList.add('active');
    });
  });

  // Fechar lightbox com clique fora ou botão X
  function closeLightbox() {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
      lightboxImage.src = '';
      lightboxImage.style.transform = '';
      currentScale = 1;
    }, 300); // espera a transição terminar
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Ativar display flex antes da animação
  const observer = new MutationObserver(() => {
    if (overlay.classList.contains('active')) {
      overlay.style.display = 'flex';
    }
  });
  observer.observe(overlay, { attributes: true });

  // 🔍 Gesto de pinça (zoom com dois dedos)
  overlay.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initialDistance = getDistance(e.touches[0], e.touches[1]);
    }
  });

  overlay.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistance;

      currentScale = Math.min(Math.max(scale, 1), 3); // limita entre 1x e 3x
      lightboxImage.style.transform = `scale(${currentScale})`;
      e.preventDefault(); // evita scroll durante pinch
    }
  });

  overlay.addEventListener('touchend', () => {
    initialDistance = null;
  });

  function getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
