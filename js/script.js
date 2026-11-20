document.addEventListener("DOMContentLoaded", () {

    const audio = new Audio("music/house.mp3");
    audio.loop = true;
    audio.volume = 0.35;

    const player = document.createElement("button");

    player.className = "music-player";
    player.innerHTML = "♫ <span>Play our song</span>";

    document.body.appendChild(player);

    let isPlaying = false;

    player.addEventListener("click", async () => {

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
const audio = new Audio("music/house.mp3");
audio.loop = true;
audio.volume = 0.35;

const player = document.createElement("button");
player.className = "music-player";
player.innerHTML = "♫ <span>Play our song</span>";

document.body.appendChild(player);

let isPlaying = false;

player.addEventListener("click", async () => {
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
