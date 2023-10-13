const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const image = document.querySelector('img');
const songTitle = document.getElementById('title');
const artist = document.getElementById('artist');
let backgroundImg = document.getElementById('background-img')

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timeDuration = document.getElementById('duration-time');
const timeCurrent = document.getElementById('current-time')


//music
const songs = [
    {
        title: 'Here Today', 
        artist: 'Fretbound',
        name: 'fretbound - Here Today',
        image: 'image1'
    },
    {
        title: 'Peaceful', 
        artist: 'Corporate',
        name: 'Peaceful Corporate',
        image: 'image2'
    },
    {
        title: 'Inspiring', 
        artist: 'Wavecont',
        name: 'Wavecont-Inspiring',
        image: 'image3'
    }
]


//check if the song is playing
let isPlaying = false; 

//play
function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//play or pause listener
playBtn.addEventListener('click',() => (isPlaying ? pauseMusic():playMusic()));

//Load song DOM
function loadSong(song){
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.image}.jpg`;
    backgroundImg.style.backgroundImage = `url(img/${song.image}.jpg)`;
}

//random songs on load 
let songIndex = Math.floor(Math.random() * songs.length);

//buttons functions
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        const toPercent = (currentTime / duration) * 100;
        progress.style.width = `${toPercent}%`;
    //calculate duration to Minutes
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
   
    //calculate current time to Minutes
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`;
    }
    timeCurrent.textContent = `${currentMinutes}:${currentSeconds}`;

    //NaN duration display fix
    if(durationMinutes){
        timeDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    }
}

function setPregressBar(e){
    const width = this.clientWidth;
    const click = e.offsetX;
    console.log(click)
    const{duration} = music;
    music.currentTime = (click / width) * duration;
}
//Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setPregressBar);