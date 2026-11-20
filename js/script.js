document.addEventListener("DOMContentLoaded", function () {

    // Animate the reasons cards
    const reasonCards = document.querySelectorAll(".reason-card");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        reasonCards.forEach((card) => observer.observe(card));
    } else {
        reasonCards.forEach((card) => card.classList.add("visible"));
    }

    // Music player
    const audio = new Audio("music/house.mp3");
    audio.loop = true;
    audio.volume = 0.35;

    const player = document.createElement("button");
    player.className = "music-player";
    player.innerHTML = "♫ <span>Play our song</span>";

    document.body.appendChild(player);

    let isPlaying = false;

    player.addEventListener("click", async function () {
        if (!isPlaying) {
            try {
                await audio.play();
                isPlaying = true;
                player.innerHTML = "Ⅱ <span>Pause music</span>";
            } catch (error) {
                console.error("Music playback failed:", error);
            }
        } else {
            audio.pause();
            isPlaying = false;
            player.innerHTML = "♫ <span>Play our song</span>";
        }
    });

});
