document.addEventListener('DOMContentLoaded', () => {
    class RecipeLoader {
        constructor() {
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
            fetch('/api/recipes')
                .then(response => response.json())
                .then(data => {
                    this.recipes = data;
                    this.loadRecipeByPage();
                })
                .catch(error => console.error('Erro ao carregar os dados:', error));
        }

        getPageName() {
            //obter a janela, separar e returnar a ultima parte (nome) e substituir o "html" por ""
            return window.location.pathname.split('/').pop().replace('.html', '');
        }

        getRecipeName(pageName) {
            return this.nameMap[pageName];
        }

        loadRecipeByPage() {
            const pageName = this.getPageName();
            const recipeName = this.getRecipeName(pageName);

            if (recipeName) {
                const selectedRecipe = this.recipes.find(recipe => recipe.name === recipeName);

                if (selectedRecipe) {
                    // Rediricionar para EJS
                    window.location.href = `/recipe/${encodeURIComponent(selectedRecipe.name)}`;
                } else {
                    console.error('Receita não encontrada.');
                }
            }
        }
    }
    const recipeLoader = new RecipeLoader();
    recipeLoader.fetchRecipes();
});
