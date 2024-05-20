document.addEventListener('DOMContentLoaded', () => {
    class RecipeLoader {
        constructor() {
            this.recipes = [];
            this.nameMap = {
                'arroz': 'Arroz Doce',
                'bolinhos': 'Bolinhos de Peixe',
                'bolodecarne': 'Bolo de Carne',
                'caldo': 'Caldo de Peixe',
                'cebola': 'Cebola Frita Caramelizada',
                'cheese': 'Cheesecake com Dióspiro',
                'feijoada': 'Feijoada do Mar',
                'linguica': 'Linguiça Recheada na AirFryer',
                'mousse': 'Mousse de Cacau',
                'panquecas': 'Panquecas Americanas',
                'salmao': 'Pasta de Salmao',
                'strogonoff': 'Strogonoff'
            };
        }

        fetchRecipes() {
            fetch('/receitas.json')
                .then(response => response.json())
                .then(data => {
                    this.recipes = data;
                    this.loadRecipesByCategory();
                })
                .catch(error => console.error('Erro ao carregar dados:', error));
        }

        getCategoryFromPage() {
            const pageName = window.location.pathname.split('/').pop().replace('.html', '');
            switch (pageName) {
                case 'peixes':
                    return 'peixes';
                case 'carnes':
                    return 'Carnes';
                case 'sobremesas':
                    return 'Sobremesas';
                case 'index':
                    return 'Receitas em Destaque';
                default:
                    console.error('Categoria desconhecida.');
                    return null;
            }
        }

        loadRecipesByCategory() {
            const category = this.getCategoryFromPage();
            if (!category) return;

            const filteredRecipes = this.recipes.filter(receita => receita.category === category);
            if (filteredRecipes.length > 0) {
                this.displayRecipes(filteredRecipes);
            } else {
                console.error('Nenhuma receita encontrada para esta categoria.');
            }
        }

        displayRecipes(recipes) {
            const mainEl = document.querySelector('main');
            mainEl.innerHTML = ''; // Limpa o conteúdo existente, se necessário

            recipes.forEach(recipe => {
                const recipeHTML = `
                    <section>
                        <a href="./${recipe.name.toLowerCase().replace(/\s+/g, '')}.html">
                            <img src="${recipe.image}" alt="${recipe.name}">
                        </a>
                        <a href="./${recipe.name.toLowerCase().replace(/\s+/g, '')}.html">
                            <h3>${recipe.name}</h3>
                        </a>
                        <a href="./${recipe.name.toLowerCase().replace(/\s+/g, '')}.html">
                            <p>${recipe.description}</p>
                        </a>
                        <div data-role="rating-container" data-image-id='${recipe.name.toLowerCase().replace(/\s+/g, '')}'>
                            <div data-role='rating' id="rating">
                                <span data-role='star' data-value="1">&#9733;</span> 
                                <span data-role='star' data-value="2">&#9733;</span>
                                <span data-role='star' data-value="3">&#9733;</span>
                                <span data-role='star' data-value="4">&#9733;</span>
                                <span data-role='star' data-value="5">&#9733;</span>
                            </div>
                        </div>
                    </section>
                `;
                mainEl.insertAdjacentHTML('beforeend', recipeHTML);
            });
        }
    }

    const recipeLoader = new RecipeLoader();
    recipeLoader.fetchRecipes();
});
