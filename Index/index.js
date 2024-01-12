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


