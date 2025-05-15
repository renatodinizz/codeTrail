// ANIMAÇÃO DE FUNDO (canvas) — somente no desktop
if (window.matchMedia('(min-width: 1200px)').matches) {
    const canvas = document.querySelector('canvas.background');
    const ctx = canvas.getContext('2d');

    const symbols = ['{}', 'var', 'null', 'return', '[]', 'this', '#', 'for', '=>', '==', 'i++', '%', '//', '()', '/**/', '@', '$', '&&', '||', '!=', '?:', 'λ', 'ƒ', '</>'];

    let width, height;
    const particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = 14 + Math.random() * 20;
            this.alpha = 0.5 + Math.random() * 0.3;
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.font = `700 ${this.size}px monospace`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
                this.reset();
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }
        }

        draw(ctx) {
            ctx.globalAlpha = this.alpha;
            ctx.font = this.font;
            ctx.fillStyle = '#002352';
            ctx.fillText(this.symbol, this.x, this.y);
        }
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
            p.update();
            p.draw(ctx);
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ANIMAÇÃO DOS CARDS — funciona em qualquer tela
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.3
});