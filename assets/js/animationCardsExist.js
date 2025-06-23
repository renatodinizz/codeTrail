const cards = document.querySelectorAll('.card')

cards.forEach(card => {
    card.addEventListener('click', function (ev) {
        ev.preventDefault()

        // Aplica opacidade baixa em todos os outros cards
        cards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('fadeOthers')
            }
        })

        // Aplica o efeito de zoom no card clicado
        card.classList.add('zoomOut')


        // Redireciona após a animação (ajuste a URL conforme o card)
        setTimeout(() => {
            const url = card.getAttribute('data-url')
            if (url) window.location.href = url
        }, 350)
    })
})