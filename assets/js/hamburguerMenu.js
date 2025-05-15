const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('side-menu');

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // impede que o clique no botão feche o menu
    menu.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    toggleBtn.classList.toggle('fixed');
});

document.addEventListener('click', (e) => {
    // Se o menu estiver aberto e o clique for fora do menu e do botão:
    if (
        menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        !toggleBtn.contains(e.target)
    ) {
        menu.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.classList.remove('fixed');
    }
});