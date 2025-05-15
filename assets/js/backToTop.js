// Botão voltar ao topo
const btnTopo = document.getElementById('btnTopo');

// Mostrar botão quando rolar 100px
window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

// Ao clicar, volta ao topo
btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});