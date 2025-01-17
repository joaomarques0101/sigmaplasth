document.addEventListener("DOMContentLoaded", () => {
    const carrosselContainers = document.querySelectorAll(".carrossel");

    carrosselContainers.forEach((carrossel) => {
        const carrosselConteudo = carrossel.querySelector(".carrossel-conteudo");
        const prevBtn = carrossel.querySelector(".prev-btn");
        const nextBtn = carrossel.querySelector(".next-btn");
        const items = carrossel.querySelectorAll(".item");

        let itemWidth = items[0].offsetWidth; // Largura de um item
        let currentIndex = 0;

        // Ajusta a quantidade de itens visíveis com base no tamanho da tela
        const updateItemWidth = () => {
            itemWidth = items[0].offsetWidth;
            moveToIndex(currentIndex);
        };

        // Move o carrossel para o índice específico
        const moveToIndex = (index) => {
            const maxIndex = Math.max(items.length - Math.floor(carrossel.offsetWidth / itemWidth), 0);
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            carrosselConteudo.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        };

        // Evento para o botão "Próximo"
        nextBtn.addEventListener("click", () => {
            moveToIndex(currentIndex + 1);
        });

        // Evento para o botão "Anterior"
        prevBtn.addEventListener("click", () => {
            moveToIndex(currentIndex - 1);
        });

        // Ajusta o carrossel ao redimensionar a janela
        window.addEventListener("resize", updateItemWidth);

        // Configura inicial
        updateItemWidth();
    });
});
let currentIndex = 0;
const banners = document.querySelectorAll('.banner-item');
const totalBanners = banners.length;

function trocaBanner() {
    const bannerConteudo = document.getElementById('bannerConteudo');
    currentIndex = (currentIndex + 1) % totalBanners; // Próximo índice
    bannerConteudo.style.transform = `translateX(-${currentIndex * 100}%)`; // Desloca o carrossel
}

// Troca o banner a cada 2 segundos
setInterval(trocaBanner, 2000);
