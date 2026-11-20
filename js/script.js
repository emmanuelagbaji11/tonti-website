document.addEventListener("DOMContentLoaded", function () {

    // ONE MUSIC PLAYER THAT STAYS ALIVE
    const audio = new Audio("music/house.mp3");
    audio.loop = true;
    audio.volume = 0.35;

    const player = document.createElement("button");
    player.className = "music-player";
    player.type = "button";
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


    // REASONS PAGE ANIMATIONS
    function animateReasonCards() {
        const cards = document.querySelectorAll(".reason-card");

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach((card) => observer.observe(card));
        } else {
            cards.forEach((card) => card.classList.add("visible"));
        }
    }


    // CHANGE PAGES WITHOUT RESTARTING THE MUSIC
    async function loadPage(url, addHistory = true) {
        try {
            const response = await fetch(url.href);

            if (!response.ok) {
                throw new Error("Page could not be loaded");
            }

            const html = await response.text();
            const nextDocument = new DOMParser()
                .parseFromString(html, "text/html");

            const currentHeader = document.querySelector("header");
            const currentMain = document.querySelector("main");
            const currentFooter = document.querySelector("footer");

            const nextHeader = nextDocument.querySelector("header");
            const nextMain = nextDocument.querySelector("main");
            const nextFooter = nextDocument.querySelector("footer");

            if (!currentHeader || !currentMain || !nextHeader || !nextMain) {
                window.location.href = url.href;
                return;
            }

            currentHeader.replaceWith(
                document.importNode(nextHeader, true)
            );

            currentMain.replaceWith(
                document.importNode(nextMain, true)
            );

            if (currentFooter && nextFooter) {
                currentFooter.replaceWith(
                    document.importNode(nextFooter, true)
                );
            } else if (currentFooter) {
                currentFooter.remove();
            } else if (nextFooter) {
                document.body.appendChild(
                    document.importNode(nextFooter, true)
                );
            }

            document.title = nextDocument.title || document.title;

            if (addHistory) {
                history.pushState({}, "", url.href);
            }

            window.scrollTo(0, 0);
            animateReasonCards();

        } catch (error) {
            console.error("Navigation failed:", error);
            window.location.href = url.href;
        }
    }


    // HANDLE INTERNAL PAGE LINKS
    document.addEventListener("click", function (event) {
        const link = event.target.closest("a");

        if (!link) return;
        if (event.defaultPrevented || event.button !== 0) return;

        if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) return;

        if (link.target && link.target !== "_self") return;
        if (link.hasAttribute("download")) return;

        const url = new URL(link.href, window.location.href);

        if (url.origin !== window.location.origin) return;
        if (!/\.html$/i.test(url.pathname)) return;

        event.preventDefault();
        loadPage(url, true);
    });


    // SUPPORT THE BROWSER BACK AND FORWARD BUTTONS
    window.addEventListener("popstate", function () {
        loadPage(new URL(window.location.href), false);
    });


    animateReasonCards();

});
