// lightBox.js
// ------------------------------
  // Seleciona todas as imagens com a classe "lightbox-img"
  const images = document.querySelectorAll('.lightbox-img');

  // Seleciona os elementos principais do lightbox
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');

  // Variáveis para zoom com pinça e arrastar a imagem
  let initialDistance = null; // distância inicial entre dois dedos
  let currentScale = 1;       // escala atual (zoom)
  let startX = 0, startY = 0; // posição inicial do toque
  let lastX = 0, lastY = 0;   // último deslocamento da imagem
  let isDragging = false;    // se está arrastando a imagem

  // Quando uma imagem é clicada, abre o lightbox
  images.forEach(img => {
    img.addEventListener('click', () => {
      // Verifica se a imagem tem alguma classe de zoom (zoom-1, zoom-2, etc)
      const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));

      // Define a imagem no lightbox
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;

      // Limpa transformações e classes anteriores
      lightboxImage.className = '';
      lightboxImage.removeAttribute('data-zoom');
      lightboxImage.style.transform = '';
      currentScale = 1;
      lastX = 0;
      lastY = 0;

      // Se houver classe de zoom, aplica na imagem do lightbox
      if (zoomClass) {
        lightboxImage.classList.add(zoomClass);
        lightboxImage.setAttribute('data-zoom', '');
      }

      // Exibe o lightbox
      overlay.classList.add('active');
    });
  });

  // Função que fecha o lightbox
  function closeLightbox() {
    overlay.classList.remove('active');

    // Espera a animação de fade-out terminar (0.3s)
    setTimeout(() => {
      overlay.style.display = 'none';
      lightboxImage.src = '';
      lightboxImage.style.transform = '';
      currentScale = 1;
      lastX = 0;
      lastY = 0;
    }, 300);
  }

  // Fecha o lightbox ao clicar fora da imagem ou no botão "X"
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox();
    }
  });

  // Também fecha ao clicar diretamente no botão "X"
  closeBtn.addEventListener('click', closeLightbox);

  // Observer que garante que o display seja "flex" quando ativar o lightbox
  const observer = new MutationObserver(() => {
    if (overlay.classList.contains('active')) {
      overlay.style.display = 'flex';
    }
  });
  observer.observe(overlay, { attributes: true });

  // ------------------------------
  // SUPORTE A PINÇA (PINCH ZOOM)
  // ------------------------------

  // Quando o toque começa (1 ou 2 dedos)
  overlay.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // Dois dedos: inicia gesto de pinça
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      isDragging = false;
    } else if (e.touches.length === 1 && currentScale > 1) {
      // Um dedo e imagem ampliada: inicia arraste
      startX = e.touches[0].clientX - lastX;
      startY = e.touches[0].clientY - lastY;
      isDragging = true;
    }
  });

  // Quando o dedo(s) se move(m)
  overlay.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDistance) {
      // Pinça: calcula nova escala
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistance;

      // Limita a escala entre 1x e 3x
      currentScale = Math.min(Math.max(scale, 1), 3);
      applyTransform();
      e.preventDefault(); // evita scroll na página
    } else if (e.touches.length === 1 && isDragging) {
      // Arrastando com 1 dedo
      lastX = e.touches[0].clientX - startX;
      lastY = e.touches[0].clientY - startY;
      applyTransform();
      e.preventDefault();
    }
  });

  // Quando o toque termina (tira o dedo da tela)
  overlay.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialDistance = null;
      isDragging = false;
    }
  });

  // Função para calcular a distância entre dois dedos (pinça)
  function getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Aplica o zoom e o deslocamento (transformações CSS)
  function applyTransform() {
    lightboxImage.style.transform = `translate(${lastX}px, ${lastY}px) scale(${currentScale})`;
  }