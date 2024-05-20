function receita(request, response) {
    var recipe = request.body.recipe;
    var model = {
    recipe: recipe,
    };
    sendRecipe(response, model);
}
module.exports.recipe = this.recipe;

function sendRecipe(response, model) {
    response.send(`<!DOCTYPE html>
    <html lang="pt">
    <head>
    <meta charset="utf-8" />
    <title>Calculadora</title>
    </head>
    <body>
    <form action="/calculadora.html" method="get">
    ${model.recipe} 
    <input type="submit" value="Calcular" />
    </form>
    </body>
    </html>`);
}