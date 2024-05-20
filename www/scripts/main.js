const nameMap = {
    'bolinhos': 'Bolinhos de Peixe',
    'arroz': 'Arroz Doce'
};
fetch('/receitas.json')
    .then(response => response.json())
    .then(data => {
        const pageName = window.location.pathname.split('/').pop().replace('.html', '');
        const recipeName = nameMap[pageName];

        if (recipeName){
            const selectedRecipe = data.find(receita => receita.name === recipeName);

            if (selectedRecipe) {
                const titleEl = document.querySelector('main');
                const sectionEl = document.querySelector('section');
                const titlePart = `
                <br>
                <h2>${selectedRecipe.name}</h2>
                `;
                titleEl.insertAdjacentHTML('beforebegin', titlePart);
                const firstRecipePart= `
                    <img src="${selectedRecipe.image}">
                    <h3>${selectedRecipe.name}</h3>
                    <p>${selectedRecipe.description}</p>
                    <div data-role="rating-container" data-image-id='${pageName}'>
                        <div data-role='rating' id="rating">
                        <span data-role='star' data-value="1">&#9733;</span> 
                        <span data-role='star' data-value="2">&#9733;</span>
                        <span data-role='star' data-value="3">&#9733;</span>
                        <span data-role='star' data-value="4">&#9733;</span>
                        <span data-role='star' data-value="5">&#9733;</span>
                        </div>
                    </div>
                    <br> <br>
                `;
                //fazer a correção dessa parte das estrelas e otimizar o sistema de ficheiros

                sectionEl.insertAdjacentHTML('afterbegin', firstRecipePart);

                const lastRecipePart = `
                <table>
                    <tr>
                        <th>Ingredientes para ${selectedRecipe.name}</th>
                    </tr>
                    <tr>
                        <td colspan="2">
                        <ul>
                            ${selectedRecipe.ingredients.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                        </ul>
                        </td>
                    </tr>
                </table>
                <h2>Passos para fazer ${selectedRecipe.name}</h2>
                <ol>
                    ${selectedRecipe.steps.map(passo => `<li>${passo}</li>`).join('')}
                </ol>
                `;
                sectionEl.insertAdjacentHTML('beforeend', lastRecipePart);

                } else {
                    console.error('Receita não encontrada.');
                }        
        }   
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
