document.addEventListener("DOMContentLoaded", function () {

    // Smooth reveal for the reasons cards
    const reasonCards = document.querySelectorAll(".reason-card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.1
        });

        reasonCards.forEach((card) => {
            observer.observe(card);
        });

    } else {

        reasonCards.forEach((card) => {
            card.classList.add("visible");
        });

    }

});
