const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        btnTopo.style.display = 'block';
        btnTopo.classList.add('hover-ativo'); // ativa o hover
    } else {
        btnTopo.style.display = 'none';
        btnTopo.classList.remove('hover-ativo'); // desativa o hover
    }
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    btnTopo.blur(); // remove o foco
    btnTopo.classList.remove('hover-ativo'); // impede hover "travado"
});
