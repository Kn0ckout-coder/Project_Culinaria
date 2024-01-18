document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".rating-container");

    containers.forEach((container) => {
        const stars = container.querySelectorAll(".star");

        stars.forEach((star) => {
            star.addEventListener("click", () => {
                const value = parseInt(star.getAttribute("data-value"));
                const containerId = container.getAttribute("id");

                // Reset all stars within the same container
                stars.forEach((s) => s.classList.remove("active"));

                // Highlight selected stars within the same container
                for (let i = 0; i < value; i++) {
                    stars[i].classList.add("active");
                }
            });
        });
    });
});

/* function search() {
    let input = document.getElementById('searchInput').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('recipe');
 
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
        }
        else {
        x[i].style.display = "list-item";
        }
    }
} */

function search() {
    let filter = document.getElementById('searchInput').value.toUpperCase();
    let item = document.querySelectorAll('.divrecipe');
    let l = document.getElementsByTagName('h3');

    for(var i = 0;i <= l.length;i++){
        let a = item[i].getElementsByTagName('h3')[0];
        let value = a.innerHTML || a.innerText || a.textContent;
        if(value.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        }
        else
        {
            item[i].style.display = "none";
        }
    }
}

  


