document.addEventListener("DOMContentLoaded", function () {

    const containers = document.querySelectorAll("[data-role='rating-container']"); /* A DIV DAS ESTRELAS  */

    containers.forEach((container) => {
        const stars = container.querySelectorAll("[data-role='star']"); /* Seleciona todas as estrelas dentro do contêiner */

        stars.forEach((star) => {
            star.addEventListener("click", () => { /* SEMPRE QUE HOUVER UM CLICK */
                const value = parseInt(star.getAttribute("data-value")); /* RECEBE A QUANTIDADE DE ESTRELAS */
                const containerId = container.getAttribute("data-image-id"); /* RECEBE O NOME DA RECEITA */

                stars.forEach((s) => s.classList.remove("active")); /* Remove a classe "active" de todas as estrelas */

                for (let i = 0; i < value; i++) {
                    stars[i].classList.add("active");  /* Adiciona a classe "active" às estrelas até a posição clicada, destacando-as */
                }

                localStorage.setItem(`selectedRating_${containerId}`, value); /* Armazena o valor da avaliação no Local Storage */
            });

            const containerId = container.getAttribute("data-image-id"); /* RECEBE O NOME DA RECEITA */
            const savedRating = localStorage.getItem(`selectedRating_${containerId}`); /* Obtém o valor da avaliação armazenada no Local Storage associada ao nome da receita */
            
            if (savedRating) { /* Verifica se há uma avaliação armazenada */
                const savedValue = parseInt(savedRating); 
                for (let i = 0; i < savedValue; i++) {
                    stars[i].classList.add("active"); /* Adiciona a classe "active" às estrelas correspondentes ao valor armazenado */
                }
            }
        });
    });
});



  


