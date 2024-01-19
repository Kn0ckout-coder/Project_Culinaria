document.addEventListener("DOMContentLoaded", function () {

    const containers = document.querySelectorAll(".rating-container"); /* A DIV DAS ESTRELAS  */

    containers.forEach((container) => {
        const stars = container.querySelectorAll(".star"); /* CADA ESTRELA */

        stars.forEach((star) => {
            star.addEventListener("click", () => { /* SEMPRE QUE HOUVER UM CLICK */
                const value = parseInt(star.getAttribute("data-value")); /* RECEBE A QUANTIDADE DE ESTRELAS */
                const containerId = container.getAttribute("data-image-id"); /* RECEBE O NOME DA RECEITA */

                stars.forEach((s) => s.classList.remove("active")); /* O ATRIBUTO DO CSS */

                for (let i = 0; i < value; i++) {
                    stars[i].classList.add("active");  /* Adiciona a classe "active" às estrelas até a posição clicada, destacando-as. */
                }

                localStorage.setItem(`selectedRating_${containerId}`, value); /* O LOCAL STORAGE PARA O RATING SELECIONADO */
            });

            const containerId = container.getAttribute("data-image-id"); /* RECEBE O NOME DA RECEITA */
            const savedRating = localStorage.getItem(`selectedRating_${containerId}`); /* Obtém o valor da avaliação armazenada no Local Storage associada ao nome da receita. */
            
            if (savedRating) { /* Verifica se há uma avaliação armazenada. */
                const savedValue = parseInt(savedRating); 
                for (let i = 0; i < savedValue; i++) {
                    stars[i].classList.add("active"); /* ATRIBUTO CSS PARA FICAREM ATIVAS AS ESTRELAS */
                }
            }
        });
    });
});



function search() {
    // Obtém o valor inserido no campo de pesquisa e converte para maiúsculas
    let filter = document.getElementById('searchInput').value.toUpperCase();

    // Seleciona todas as divs com a classe 'divrecipe'
    let item = document.querySelectorAll('.divrecipe');

    // Obtém todos os elementos h3 dentro das divs 'divrecipe'
    let l = document.getElementsByTagName('h3');

    // Itera sobre cada elemento h3
    for(var i = 0; i < l.length; i++){
        // Obtém o primeiro elemento h3 dentro da div 'divrecipe'
        let a = item[i].getElementsByTagName('h3')[0];

        // Obtém o texto do elemento h3
        let value = a.innerHTML || a.innerText || a.textContent;

        // Verifica se o texto do h3 contém a string de pesquisa
        if(value.toUpperCase().indexOf(filter) > -1) {
            // Se encontrou, exibe a div
            item[i].style.display = "";
        } else {
            // Se não encontrou, oculta a div
            item[i].style.display = "none";
        }
    }
}


  


