function showFooter() {
    var x = document.getElementById("now-playing");
    if (x.style.display == "flex") {
    } else {
        x.style.display = "flex";
        x.style.position = "fixed";
        x.style.opacity = "1";
    }
}

const music = document.querySelector("audio");
const play = document.getElementById("icon-play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("icon-prev");
const next = document.getElementById("icon-next");
const progress_div = document.getElementById("pb-box");

let progress = document.getElementById("np-bar");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current-time");

const songs = [
    {
        name: "toosieslide",
        title: "Toosie Slide",
        artist: "Drake",
    },
    {
        name: "trigger",
        title: "Trigger",
        artist: "Major Lazer",
    },
    {
        name: "control",
        title: "Control",
        artist: "Armaan Malik",
    },
];

let isPlaying = false;

// for play
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
};

// for pause
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
};

play.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

// Changing music
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "songs/" + songs.name + ".mp3";
};

songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// Progress Bar
music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // duration update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    if (sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }
    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    // current time update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
});

// seek
progress_div.addEventListener("click", (event) => {
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    music.currentTime = move_progress;
});

// next song on end
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

// For Volume
let volume = document.querySelector("#volume-bar");
volume.addEventListener("change", function(e) {
music.volume = e.currentTarget.value / 100;
})