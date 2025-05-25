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



// Esse funcionou com efeito de pinça é o mais completo
// const images = document.querySelectorAll('.lightbox-img');
//   const overlay = document.getElementById('lightbox-overlay');
//   const lightboxImage = document.getElementById('lightbox-image');
//   const closeBtn = document.getElementById('lightbox-close');

//   // Variáveis para pinch zoom
//   let initialDistance = null;
//   let currentScale = 1;

//   // Abrir lightbox
//   images.forEach(img => {
//     img.addEventListener('click', () => {
//       const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));
      
//       lightboxImage.src = img.src;
//       lightboxImage.alt = img.alt;
//       lightboxImage.className = '';
//       lightboxImage.removeAttribute('data-zoom');
//       lightboxImage.style.transform = ''; // reset zoom

//       if (zoomClass) {
//         lightboxImage.classList.add(zoomClass);
//         lightboxImage.setAttribute('data-zoom', '');
//       }

//       overlay.classList.add('active');
//     });
//   });

//   // Fechar lightbox com clique fora ou botão X
//   function closeLightbox() {
//     overlay.classList.remove('active');
//     setTimeout(() => {
//       overlay.style.display = 'none';
//       lightboxImage.src = '';
//       lightboxImage.style.transform = '';
//       currentScale = 1;
//     }, 500); // espera a transição terminar
//   }

//   overlay.addEventListener('click', (e) => {
//     if (e.target === overlay || e.target === closeBtn) {
//       closeLightbox();
//     }
//   });

//   closeBtn.addEventListener('click', closeLightbox);

//   // Ativar display flex antes da animação
//   const observer = new MutationObserver(() => {
//     if (overlay.classList.contains('active')) {
//       overlay.style.display = 'flex';
//     }
//   });
//   observer.observe(overlay, { attributes: true });

//   // 🔍 Gesto de pinça (zoom com dois dedos)
//   overlay.addEventListener('touchstart', (e) => {
//     if (e.touches.length === 2) {
//       initialDistance = getDistance(e.touches[0], e.touches[1]);
//     }
//   });

//   overlay.addEventListener('touchmove', (e) => {
//     if (e.touches.length === 2 && initialDistance) {
//       const currentDistance = getDistance(e.touches[0], e.touches[1]);
//       const scale = currentDistance / initialDistance;

//       currentScale = Math.min(Math.max(scale, 1), 3); // limita entre 1x e 3x
//       lightboxImage.style.transform = `scale(${currentScale})`;
//       e.preventDefault(); // evita scroll durante pinch
//     }
//   });

//   overlay.addEventListener('touchend', () => {
//     initialDistance = null;
//   });

//   function getDistance(touch1, touch2) {
//     const dx = touch2.clientX - touch1.clientX;
//     const dy = touch2.clientY - touch1.clientY;
//     return Math.sqrt(dx * dx + dy * dy);
//   }


// funcionando perfeito, com efeito de pinça e podendo arrastar
  // const images = document.querySelectorAll('.lightbox-img');
  // const overlay = document.getElementById('lightbox-overlay');
  // const lightboxImage = document.getElementById('lightbox-image');
  // const closeBtn = document.getElementById('lightbox-close');

  // let initialDistance = null;
  // let currentScale = 1;
  // let startX = 0, startY = 0;
  // let lastX = 0, lastY = 0;
  // let isDragging = false;

  // // Abrir lightbox
  // images.forEach(img => {
  //   img.addEventListener('click', () => {
  //     const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));

  //     lightboxImage.src = img.src;
  //     lightboxImage.alt = img.alt;
  //     lightboxImage.className = '';
  //     lightboxImage.removeAttribute('data-zoom');
  //     lightboxImage.style.transform = ''; // reset transform
  //     currentScale = 1;
  //     lastX = 0;
  //     lastY = 0;

  //     if (zoomClass) {
  //       lightboxImage.classList.add(zoomClass);
  //       lightboxImage.setAttribute('data-zoom', '');
  //     }

  //     overlay.classList.add('active');
  //   });
  // });

  // function closeLightbox() {
  //   overlay.classList.remove('active');
  //   setTimeout(() => {
  //     overlay.style.display = 'none';
  //     lightboxImage.src = '';
  //     lightboxImage.style.transform = '';
  //     currentScale = 1;
  //     lastX = 0;
  //     lastY = 0;
  //   }, 300);
  // }

  // overlay.addEventListener('click', (e) => {
  //   if (e.target === overlay || e.target === closeBtn) {
  //     closeLightbox();
  //   }
  // });

  // closeBtn.addEventListener('click', closeLightbox);

  // const observer = new MutationObserver(() => {
  //   if (overlay.classList.contains('active')) {
  //     overlay.style.display = 'flex';
  //   }
  // });
  // observer.observe(overlay, { attributes: true });

  // // -------- PINCH ZOOM --------
  // overlay.addEventListener('touchstart', (e) => {
  //   if (e.touches.length === 2) {
  //     initialDistance = getDistance(e.touches[0], e.touches[1]);
  //     isDragging = false;
  //   } else if (e.touches.length === 1 && currentScale > 1) {
  //     startX = e.touches[0].clientX - lastX;
  //     startY = e.touches[0].clientY - lastY;
  //     isDragging = true;
  //   }
  // });

  // overlay.addEventListener('touchmove', (e) => {
  //   if (e.touches.length === 2 && initialDistance) {
  //     const currentDistance = getDistance(e.touches[0], e.touches[1]);
  //     const scale = currentDistance / initialDistance;
  //     currentScale = Math.min(Math.max(scale, 1), 3);
  //     applyTransform();
  //     e.preventDefault();
  //   } else if (e.touches.length === 1 && isDragging) {
  //     lastX = e.touches[0].clientX - startX;
  //     lastY = e.touches[0].clientY - startY;
  //     applyTransform();
  //     e.preventDefault();
  //   }
  // });

  // overlay.addEventListener('touchend', (e) => {
  //   if (e.touches.length < 2) {
  //     initialDistance = null;
  //     isDragging = false;
  //   }
  // });

  // function getDistance(touch1, touch2) {
  //   const dx = touch2.clientX - touch1.clientX;
  //   const dy = touch2.clientY - touch1.clientY;
  //   return Math.sqrt(dx * dx + dy * dy);
  // }

  // function applyTransform() {
  //   lightboxImage.style.transform = `translate(${lastX}px, ${lastY}px) scale(${currentScale})`;
  // }



// Funcionando muito bem
// // ------------------------------
//   // Seleciona todas as imagens com a classe "lightbox-img"
//   const images = document.querySelectorAll('.lightbox-img');

//   // Seleciona os elementos principais do lightbox
//   const overlay = document.getElementById('lightbox-overlay');
//   const lightboxImage = document.getElementById('lightbox-image');
//   const closeBtn = document.getElementById('lightbox-close');

//   // Variáveis para zoom com pinça e arrastar a imagem
//   let initialDistance = null; // distância inicial entre dois dedos
//   let currentScale = 1;       // escala atual (zoom)
//   let startX = 0, startY = 0; // posição inicial do toque
//   let lastX = 0, lastY = 0;   // último deslocamento da imagem
//   let isDragging = false;    // se está arrastando a imagem

//   // Quando uma imagem é clicada, abre o lightbox
//   images.forEach(img => {
//     img.addEventListener('click', () => {
//       // Verifica se a imagem tem alguma classe de zoom (zoom-1, zoom-2, etc)
//       const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));

//       // Define a imagem no lightbox
//       lightboxImage.src = img.src;
//       lightboxImage.alt = img.alt;

//       // Limpa transformações e classes anteriores
//       lightboxImage.className = '';
//       lightboxImage.removeAttribute('data-zoom');
//       lightboxImage.style.transform = '';
//       currentScale = 1;
//       lastX = 0;
//       lastY = 0;

//       // Se houver classe de zoom, aplica na imagem do lightbox
//       if (zoomClass) {
//         lightboxImage.classList.add(zoomClass);
//         lightboxImage.setAttribute('data-zoom', '');
//       }

//       // Exibe o lightbox
//       overlay.classList.add('active');
//     });
//   });

//   // Função que fecha o lightbox
//   function closeLightbox() {
//     overlay.classList.remove('active');

//     // Espera a animação de fade-out terminar (0.3s)
//     setTimeout(() => {
//       overlay.style.display = 'none';
//       lightboxImage.src = '';
//       lightboxImage.style.transform = '';
//       currentScale = 1;
//       lastX = 0;
//       lastY = 0;
//     }, 300);
//   }

//   // Fecha o lightbox ao clicar fora da imagem ou no botão "X"
//   overlay.addEventListener('click', (e) => {
//     if (e.target === overlay || e.target === closeBtn) {
//       closeLightbox();
//     }
//   });

//   // Também fecha ao clicar diretamente no botão "X"
//   closeBtn.addEventListener('click', closeLightbox);

//   // Observer que garante que o display seja "flex" quando ativar o lightbox
//   const observer = new MutationObserver(() => {
//     if (overlay.classList.contains('active')) {
//       overlay.style.display = 'flex';
//     }
//   });
//   observer.observe(overlay, { attributes: true });

//   // ------------------------------
//   // SUPORTE A PINÇA (PINCH ZOOM)
//   // ------------------------------

//   // Quando o toque começa (1 ou 2 dedos)
//   overlay.addEventListener('touchstart', (e) => {
//     if (e.touches.length === 2) {
//       // Dois dedos: inicia gesto de pinça
//       initialDistance = getDistance(e.touches[0], e.touches[1]);
//       isDragging = false;
//     } else if (e.touches.length === 1 && currentScale > 1) {
//       // Um dedo e imagem ampliada: inicia arraste
//       startX = e.touches[0].clientX - lastX;
//       startY = e.touches[0].clientY - lastY;
//       isDragging = true;
//     }
//   });

//   // Quando o dedo(s) se move(m)
//   overlay.addEventListener('touchmove', (e) => {
//     if (e.touches.length === 2 && initialDistance) {
//       // Pinça: calcula nova escala
//       const currentDistance = getDistance(e.touches[0], e.touches[1]);
//       const scale = currentDistance / initialDistance;

//       // Limita a escala entre 1x e 3x
//       currentScale = Math.min(Math.max(scale, 1), 3);
//       applyTransform();
//       e.preventDefault(); // evita scroll na página
//     } else if (e.touches.length === 1 && isDragging) {
//       // Arrastando com 1 dedo
//       lastX = e.touches[0].clientX - startX;
//       lastY = e.touches[0].clientY - startY;
//       applyTransform();
//       e.preventDefault();
//     }
//   });

//   // Quando o toque termina (tira o dedo da tela)
//   overlay.addEventListener('touchend', (e) => {
//     if (e.touches.length < 2) {
//       initialDistance = null;
//       isDragging = false;
//     }
//   });

//   // Função para calcular a distância entre dois dedos (pinça)
//   function getDistance(touch1, touch2) {
//     const dx = touch2.clientX - touch1.clientX;
//     const dy = touch2.clientY - touch1.clientY;
//     return Math.sqrt(dx * dx + dy * dy);
//   }

//   // Aplica o zoom e o deslocamento (transformações CSS)
//   function applyTransform() {
//     lightboxImage.style.transform = `translate(${lastX}px, ${lastY}px) scale(${currentScale})`;
//   }




// Seleciona elementos principais
const images = document.querySelectorAll('.lightbox-img');
const overlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('lightbox-close');
const zoomHint = document.getElementById('zoom-hint');

// Variáveis para zoom e panorama
let initialDistance = null;
let currentScale = 1;
let startX = 0, startY = 0;
let lastX = 0, lastY = 0;
let isDragging = false;
const maxOverflow = 32; // 2rem em px

// Abre o lightbox ao clicar numa imagem
images.forEach(img => {
  img.addEventListener('click', () => {
    // Define a imagem
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;

    // Limpa estado anterior
    lightboxImage.className = '';
    lightboxImage.removeAttribute('data-zoom');
    lightboxImage.style.transform = '';
    currentScale = 1;
    lastX = 0;
    lastY = 0;

    // Se tiver classe de zoom, aplica
    const zoomClass = Array.from(img.classList).find(cls => cls.startsWith('zoom-'));
    if (zoomClass) {
      lightboxImage.classList.add(zoomClass);
      lightboxImage.setAttribute('data-zoom', '');
    }

    // Exibe o lightbox e a mensagem informativa
    overlay.classList.add('active');
    zoomHint.style.opacity = 1;
    setTimeout(() => zoomHint.style.opacity = 0, 3000); // Some após 3s
  });
});

// Fecha o lightbox
function closeLightbox() {
  overlay.classList.remove('active');
  setTimeout(() => {
    overlay.style.display = 'none';
    lightboxImage.src = '';
    lightboxImage.style.transform = '';
    currentScale = 1;
    lastX = 0;
    lastY = 0;
  }, 300);
}

// Fecha ao clicar fora da imagem ou no botão "X"
overlay.addEventListener('click', (e) => {
  if (e.target === overlay || e.target === closeBtn) {
    closeLightbox();
  }
});
closeBtn.addEventListener('click', closeLightbox);

// Observer para garantir "flex"
const observer = new MutationObserver(() => {
  if (overlay.classList.contains('active')) {
    overlay.style.display = 'flex';
  }
});
observer.observe(overlay, { attributes: true });

// ------------------------------
// SUPORTE A PINÇA (TOQUE)
// ------------------------------
overlay.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches[0], e.touches[1]);
    isDragging = false;
  } else if (e.touches.length === 1 && currentScale > 1) {
    startX = e.touches[0].clientX - lastX;
    startY = e.touches[0].clientY - lastY;
    isDragging = true;
    overlay.style.cursor = 'grabbing'; // Muda o cursor
  }
});
overlay.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2 && initialDistance) {
    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    const scale = currentDistance / initialDistance;
    currentScale = Math.min(Math.max(scale, 1), 3);
    applyTransform();
    e.preventDefault();
  } else if (e.touches.length === 1 && isDragging) {
    lastX = e.touches[0].clientX - startX;
    lastY = e.touches[0].clientY - startY;
    limitPan();
    applyTransform();
    e.preventDefault();
  }
});
overlay.addEventListener('touchend', () => {
  initialDistance = null;
  isDragging = false;
  overlay.style.cursor = 'grab'; // Mão aberta quando panorama ativado
});

// ------------------------------
// SUPORTE A SCROLL PARA ZOOM (mouse)
// ------------------------------
overlay.addEventListener('wheel', (e) => {
  // Ajusta a escala
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  currentScale = Math.min(Math.max(currentScale + delta, 1), 3);
  applyTransform();

  // Se houver zoom, ativa panorama
  if (currentScale > 1) {
    overlay.style.cursor = 'grab';
  } else {
    overlay.style.cursor = 'default';
    lastX = 0;
    lastY = 0;
  }
});

// ------------------------------
// SUPORTE A MOUSE (PANORAMA INTERATIVO)
// ------------------------------
overlay.addEventListener('mousedown', (e) => {
  if (currentScale > 1) {
    startX = e.clientX - lastX;
    startY = e.clientY - lastY;
    isDragging = true;
    overlay.style.cursor = 'grabbing';
    e.preventDefault();
  }
});
overlay.addEventListener('mousemove', (e) => {
  if (isDragging) {
    lastX = e.clientX - startX;
    lastY = e.clientY - startY;
    limitPan();
    applyTransform();
  }
});
overlay.addEventListener('mouseup', () => {
  isDragging = false;
  if (currentScale > 1) {
    overlay.style.cursor = 'grab'; // Mão aberta
  } else {
    overlay.style.cursor = 'default';
  }
});
overlay.addEventListener('mouseleave', () => {
  isDragging = false;
  if (currentScale > 1) {
    overlay.style.cursor = 'grab';
  } else {
    overlay.style.cursor = 'default';
  }
});

// ------------------------------
// FUNÇÕES AUXILIARES
// ------------------------------
// Calcula a distância da pinça
function getDistance(touch1, touch2) {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Aplica zoom e deslocamento
function applyTransform() {
  lightboxImage.style.transform = `translate(${lastX}px, ${lastY}px) scale(${currentScale})`;
}

// Limita o arrasto para no máximo 2rem além da imagem
function limitPan() {
  const imageWidth = lightboxImage.offsetWidth * currentScale;
  const imageHeight = lightboxImage.offsetHeight * currentScale;
  const containerWidth = overlay.offsetWidth;
  const containerHeight = overlay.offsetHeight;

  const maxX = (imageWidth - containerWidth) / 2 + maxOverflow;
  const maxY = (imageHeight - containerHeight) / 2 + maxOverflow;

  lastX = Math.max(Math.min(lastX, maxX), -maxX);
  lastY = Math.max(Math.min(lastY, maxY), -maxY);
}

