document.addEventListener('DOMContentLoaded', () => {
    class RecipeLoader {
        constructor() {
            this.recipes = [];
            this.nameMap = {
                'arroz': 'Arroz Doce',
                'bolinhos': 'Bolinhos de Peixe',
                'bolodecarne': 'Bolo de Carne Moída',
                'caldo': 'Caldo de Peixe',
                'cebola': 'Cebola Frita Caramelizada',
                'cheese': 'Cheesecake com Dióspiro',
                'feijoada': 'Feijoada do Mar',
                'linguica': 'Linguiça Recheada na Airfryer',
                'mousse': 'Mousse de Cacau',
                'panquecas': 'Panquecas Americanas',
                'salmao': 'Pasta de Salmão',
                'strogonoff': 'Strogonoff'
            };
        }

        fetchRecipes() {
            fetch('/receitas.json')
                .then(response => response.json())
                .then(data => {
                    this.recipes = data;
                    this.loadRecipeByPage();
                })
                .catch(error => console.error('Erro ao carregar dados:', error));
        }

        getPageName() {
            return window.location.pathname.split('/').pop().replace('.html', '');
        }

        getRecipeName(pageName) {
            return this.nameMap[pageName];
        }

        loadRecipeByPage() {
            const pageName = this.getPageName();
            const recipeName = this.getRecipeName(pageName);

            if (recipeName) {
                const selectedRecipe = this.recipes.find(receita => receita.name === recipeName);

                if (selectedRecipe) {
                    this.displayRecipe(selectedRecipe);
                } else {
                    console.error('Receita não encontrada.');
                }
            }
        }

        displayRecipe(recipe) {
            const titleEl = document.querySelector('main');
            const sectionEl = document.querySelector('section');

            const titlePart = `
                <br>
                <h2>${recipe.name}</h2>
            `;
            titleEl.insertAdjacentHTML('beforebegin', titlePart);

            const firstRecipePart = `
                <img src="${recipe.image}">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
            `;

            sectionEl.insertAdjacentHTML('afterbegin', firstRecipePart);

            const lastRecipePart = `
                <br>
                <table>
                    <tr>
                        <th>Ingredientes para ${recipe.name}</th>
                    </tr>
                    <tr>
                        <td colspan="2">
                        <ul>
                            ${recipe.ingredients.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                        </ul>
                        </td>
                    </tr>
                </table>
                <h2>Passos para fazer ${recipe.name}</h2>
                <ol>
                    ${recipe.steps.map(passo => `<li>${passo}</li>`).join('')}
                </ol>
            `;
            sectionEl.insertAdjacentHTML('beforeend', lastRecipePart);
        }
    }
    const recipeLoader = new RecipeLoader();
    recipeLoader.fetchRecipes();
});
