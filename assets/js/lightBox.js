// // lightBox.js
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

/**
 * Lightbox Personalizado - JavaScript
 * Funcionalidades básicas: abrir, fechar, eventos
 */

class CustomLightbox {
    constructor() {
        this.lightbox = null;
        this.lightboxImage = null;
        this.lightboxCaption = null;
        this.lightboxCloseBtn = null;
        this.isActive = false;
        
        // Variáveis para zoom e pan
        this.currentScale = 1;
        this.currentX = 0;
        this.currentY = 0;
        this.startX = 0;
        this.startY = 0;
        this.isDragging = false;
        this.initialDistance = 0;
        
        // Variáveis para swipe
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        // Aguarda o DOM estar carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLightbox());
        } else {
            this.setupLightbox();
        }
    }
    
    setupLightbox() {
        // Obtém referências dos elementos
        this.lightbox = document.getElementById('custom-lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
        this.lightboxCloseBtn = this.lightbox.querySelector('.lightbox-close-btn');
        
        // Adiciona event listeners
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Event listener para cliques em imagens com classe lightbox-trigger
        document.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target);
            if (e.target.classList.contains('lightbox-trigger')) {
                console.log('Lightbox trigger clicked!');
                e.preventDefault();
                this.openLightbox(e.target);
            }
        });
        
        // Event listener para fechar com botão X
        this.lightboxCloseBtn.addEventListener('click', () => {
            this.closeLightbox();
        });
        
        // Event listener para fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isActive) {
                this.closeLightbox();
            }
        });
        
        // Event listener para fechar clicando fora da imagem
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox || e.target.classList.contains('lightbox-overlay')) {
                this.closeLightbox();
            }
        });
        
        // Previne o fechamento quando clicar na imagem ou caption
        this.lightboxImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        this.lightboxCaption.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    openLightbox(imageElement) {
        console.log('Opening lightbox for:', imageElement);
        const fullSrc = imageElement.dataset.fullSrc || imageElement.src;
        const caption = imageElement.dataset.caption;
        
        console.log('Full src:', fullSrc);
        console.log('Caption:', caption);
        
        // Reset das variáveis de zoom e pan
        this.resetTransform();
        
        // Define a imagem e legenda
        this.lightboxImage.src = fullSrc;
        
        // Exibe ou oculta a legenda com base no conteúdo
        if (caption) {
            this.lightboxCaption.textContent = caption;
            this.lightboxCaption.style.display = 'block'; // Garante que a legenda seja visível
        } else {
            this.lightboxCaption.textContent = '';
            this.lightboxCaption.style.display = 'none'; // Oculta a legenda se não houver texto
        }
        
        // Ativa o lightbox
        this.lightbox.classList.remove('lightbox-hidden');
        this.lightbox.classList.add('lightbox-active');
        this.isActive = true;
        
        console.log('Lightbox activated, classes:', this.lightbox.className);
        
        // Desabilita a rolagem da página
        this.disablePageScroll();
        
        // Adiciona event listeners específicos do lightbox ativo
        this.addActiveEventListeners();
    }
    
    closeLightbox() {
        // Desativa o lightbox
        this.lightbox.classList.remove('lightbox-active');
        this.isActive = false;
        
        // Habilita a rolagem da página
        this.enablePageScroll();
        
        // Remove event listeners específicos do lightbox ativo
        this.removeActiveEventListeners();
        
        // Aguarda a transição terminar para esconder completamente
        setTimeout(() => {
            if (!this.isActive) {
                this.lightbox.classList.add('lightbox-hidden');
                this.lightboxImage.src = '';
                this.lightboxCaption.textContent = '';
                this.lightboxCaption.style.display = 'none'; // Garante que a legenda esteja oculta ao fechar
                this.resetTransform();
            }
        }, 400); // Tempo da transição CSS
    }
    
    disablePageScroll() {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden'; // Adicionado para desabilitar a rolagem da página
        document.body.classList.add('lightbox-active');
        document.documentElement.classList.add('lightbox-active'); // Adicionado para manter a barra de rolagem visível
        // Calcula e define a largura da barra de rolagem para compensar
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }
    
    enablePageScroll() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = ''; // Removido para habilitar a rolagem da página
        document.body.classList.remove('lightbox-active');
        document.documentElement.classList.remove('lightbox-active'); // Removido para remover o padding da barra de rolagem
        document.documentElement.style.removeProperty('--scrollbar-width');
    }
    
    resetTransform() {
        this.currentScale = 1;
        this.currentX = 0;
        this.currentY = 0;
        this.isDragging = false;
        this.updateImageTransform();
        this.updateCursor();
    }
    
    updateImageTransform() {
        this.lightboxImage.style.transform = `translate(${this.currentX}px, ${this.currentY}px) scale(${this.currentScale})`;
    }
    
    updateCursor() {
        if (this.currentScale > 1) {
            this.lightboxImage.classList.add('zoomable');
            this.lightboxImage.style.cursor = this.isDragging ? 'grabbing' : 'grab';
        } else {
            this.lightboxImage.classList.remove('zoomable');
            this.lightboxImage.style.cursor = 'zoom-in';
        }
    }
    
    addActiveEventListeners() {
        // Event listeners para zoom com scroll do mouse
        this.lightboxImage.addEventListener('wheel', this.handleWheel.bind(this));
        
        // Event listeners para arrastar com mouse
        this.lightboxImage.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // Event listeners para touch (mobile)
        this.lightboxImage.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.lightboxImage.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.lightboxImage.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Event listeners para swipe para fechar
        this.lightbox.addEventListener('touchstart', this.handleSwipeStart.bind(this));
        this.lightbox.addEventListener('touchmove', this.handleSwipeMove.bind(this));
        this.lightbox.addEventListener('touchend', this.handleSwipeEnd.bind(this));
    }
    
    removeActiveEventListeners() {
        // Remove todos os event listeners específicos do lightbox ativo
        this.lightboxImage.removeEventListener('wheel', this.handleWheel.bind(this));
        this.lightboxImage.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        this.lightboxImage.removeEventListener('touchstart', this.handleTouchStart.bind(this));
        this.lightboxImage.removeEventListener('touchmove', this.handleTouchMove.bind(this));
        this.lightboxImage.removeEventListener('touchend', this.handleTouchEnd.bind(this));
        this.lightbox.removeEventListener('touchstart', this.handleSwipeStart.bind(this));
        this.lightbox.removeEventListener('touchmove', this.handleSwipeMove.bind(this));
        this.lightbox.removeEventListener('touchend', this.handleSwipeEnd.bind(this));
    }
    
    // ===== FUNCIONALIDADES AVANÇADAS =====
    
    handleWheel(e) {
        e.preventDefault();
        
        const scaleAmount = 0.1;
        const rect = this.lightboxImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calcula a posição do mouse relativa ao centro da imagem
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const oldScale = this.currentScale;
        
        if (e.deltaY < 0) {
            // Zoom in
            this.currentScale = Math.min(3, this.currentScale + scaleAmount);
        } else {
            // Zoom out
            this.currentScale = Math.max(1, this.currentScale - scaleAmount);
        }
        
        // Ajusta a posição para manter o zoom centrado no cursor
        if (this.currentScale !== oldScale) {
            const scaleDiff = this.currentScale - oldScale;
            this.currentX -= mouseX * scaleDiff;
            this.currentY -= mouseY * scaleDiff;
            
            this.constrainPan();
            this.updateImageTransform();
            this.updateCursor();
        }
        
        // Reset da posição se voltou ao zoom original
        if (this.currentScale === 1) {
            this.currentX = 0;
            this.currentY = 0;
            this.updateImageTransform();
        }
    }
    
    handleMouseDown(e) {
        if (this.currentScale > 1) {
            this.isDragging = true;
            this.startX = e.clientX - this.currentX;
            this.startY = e.clientY - this.currentY;
            this.updateCursor();
            e.preventDefault();
        }
    }
    
    handleMouseMove(e) {
        if (this.isDragging && this.currentScale > 1) {
            this.currentX = e.clientX - this.startX;
            this.currentY = e.clientY - this.startY;
            this.constrainPan();
            this.updateImageTransform();
        }
    }
    
    handleMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.updateCursor();
        }
    }
    
    handleTouchStart(e) {
        if (e.touches.length === 2) {
            // Pinch-to-zoom
            this.initialDistance = this.getDistance(e.touches[0], e.touches[1]);
        } else if (e.touches.length === 1 && this.currentScale > 1) {
            // Pan
            this.isDragging = true;
            this.startX = e.touches[0].clientX - this.currentX;
            this.startY = e.touches[0].clientY - this.currentY;
        }
    }
    
    handleTouchMove(e) {
        if (e.touches.length === 2) {
            // Pinch-to-zoom
            e.preventDefault();
            const newDistance = this.getDistance(e.touches[0], e.touches[1]);
            const scaleFactor = newDistance / this.initialDistance;
            
            const oldScale = this.currentScale;
            this.currentScale = Math.max(1, Math.min(3, this.currentScale * scaleFactor));
            
            if (this.currentScale !== oldScale) {
                this.constrainPan();
                this.updateImageTransform();
                this.updateCursor();
            }
            
            this.initialDistance = newDistance;
            
            // Reset da posição se voltou ao zoom original
            if (this.currentScale === 1) {
                this.currentX = 0;
                this.currentY = 0;
                this.updateImageTransform();
            }
        } else if (e.touches.length === 1 && this.isDragging && this.currentScale > 1) {
            // Pan
            e.preventDefault();
            this.currentX = e.touches[0].clientX - this.startX;
            this.currentY = e.touches[0].clientY - this.startY;
            this.constrainPan();
            this.updateImageTransform();
        }
    }
    
    handleTouchEnd() {
        this.isDragging = false;
        this.updateCursor();
    }
    
    handleSwipeStart(e) {
        if (e.touches.length === 1) {
            this.touchStartY = e.touches[0].clientY;
            this.touchStartX = e.touches[0].clientX;
        }
    }
    
    handleSwipeMove(e) {
        if (e.touches.length === 1) {
            this.touchEndY = e.touches[0].clientY;
            this.touchEndX = e.touches[0].clientX;
        }
    }
    
    handleSwipeEnd() {
        const deltaY = this.touchEndY - this.touchStartY;
        const deltaX = Math.abs(this.touchEndX - this.touchStartX);
        
        // Verifica se é um swipe para baixo (vertical) e não horizontal
        if (deltaY > 50 && deltaX < 100 && this.currentScale === 1) {
            this.closeLightbox();
        }
        
        // Reset das variáveis de swipe
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;
    }
    
    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    constrainPan() {
        if (this.currentScale <= 1) {
            this.currentX = 0;
            this.currentY = 0;
            return;
        }
        
        const rect = this.lightboxImage.getBoundingClientRect();
        const imgWidth = rect.width * this.currentScale;
        const imgHeight = rect.height * this.currentScale;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Converte 2rem para pixels (assumindo 1rem = 16px por padrão)
        const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const limitPx = 2 * remToPx;
        
        const maxX = Math.max(0, (imgWidth - viewportWidth) / 2 + limitPx);
        const maxY = Math.max(0, (imgHeight - viewportHeight) / 2 + limitPx);
        
        this.currentX = Math.max(Math.min(this.currentX, maxX), -maxX);
        this.currentY = Math.max(Math.min(this.currentY, maxY), -maxY);
    }
}

// Inicializa o lightbox quando o script for carregado
const lightbox = new CustomLightbox();