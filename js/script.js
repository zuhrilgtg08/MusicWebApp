let allMusic = [{
        name: "Gyutto - Mosawo",
        artist: "Harutya",
        img: "music1",
        src: "music1"
    },

    {
        name: "Akuma No Ko - Attack on Titan",
        artist: "Ai Higuchi",
        img: "music2",
        src: "music2"
    },

    {
        name: "Belive In You - Re: Zero Kara Hajimeru Isekai Seikatsu",
        artist: "Nonoc",
        img: "music3",
        src: "music3"
    },

    {
        name: "Neko - Dish",
        artist: "Harutya",
        img: "music4",
        src: "music4"
    },

    {
        name: "Tabun - Yoasobi",
        artist: "Yoasobi",
        img: "music5",
        src: "music5"
    },

    {
        name: "Mimpi Itu - Yoasobi",
        artist: "Yoasobi",
        img: "music6",
        src: "music6"
    }
];

const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".music-details .name"),
    musicArtist = wrapper.querySelector(".music-details .artis"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progres-area"),
    progressBar = progressArea.querySelector(".progres-bar"),
    musicList = wrapper.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;
}

// putar music function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// pause music function
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// prev function
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// next function
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// play & pause btn event
playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

// prev btn event
prevBtn.addEventListener("click", () => {
    prevMusic();
});

// next btn event
nextBtn.addEventListener("click", () => {
    nextMusic();
});

// update progres bar
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", () => {
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin} : ${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin} : ${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
    playingSong();
});

const repeatBtn = wrapper.querySelector("#repeat");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Music looped");
            break;

        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Music Shuffled");
            break;

        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "All looped");
            break;
    }
});

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            nextMusic();
            break;

        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;

        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);

            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});

moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <span id="${allMusic[i].src}" class="audio-duration">
                        3:40
                    </span>
                    <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
                </li>`;

    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        };

        liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}

function playingSong() {
    const allLiTag = ulTag.querySelector("li");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "playing";
        }

        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;

    loadMusic(musicIndex);
    playMusic();
    playingSong();
}