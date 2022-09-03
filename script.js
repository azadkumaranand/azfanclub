let songlists = document.querySelector('.songlists');
const mainAudio = document.getElementById('mainAudio'),
back = document.getElementById('back'),
play_pause = document.getElementById('play_pause'),
next = document.getElementById('next'),
gifstart = document.querySelector('.gifstart'),
playlist = document.getElementById('playlist'),
hidelist = document.querySelector('.hidelist');
let gleary = document.querySelector('.gleary'),
showquotes = document.querySelector('#showquotes');
const audioImg = document.querySelector('.songlistimg img'),
songduration = document.querySelector('.songduration'),
songcurrenttime = document.querySelector('.songcurrenttime'),
myProgressBar = document.querySelector('.myProgressBar'),
progressArea = document.querySelector('.progress-area');
tool = document.querySelector('.fa-play');
let musicIndex = Math.floor((Math.random()*songs.length)+1);
window.addEventListener('load',()=>{
    loadmusic(musicIndex);
    playingSong();
})
function loadmusic(indexNum){
    audioImg.src = `${songs[indexNum-1].coverPath}`;
    mainAudio.src = `${songs[indexNum-1].filePath}`;
}

playlist.addEventListener('click',()=>{
    songlists.style.display = "flex";
    playlist.innerText = "";

})

hidelist.addEventListener('click',()=>{
    songlists.style.display = "none";
    playlist.innerHTML = `<img src="covers/list.jpg" alt="">`;
})

function playMusic(){
    play_pause.classList.remove('fa-play');
    play_pause.classList.add('fa-pause');
    mainAudio.play();
}

function pauseMusic(){
    play_pause.classList.remove('fa-pause');
    play_pause.classList.add('fa-play');
    loadmusic(musicIndex);
    mainAudio.pause();
}

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    myProgressBar.style.width = `${progressWidth}%`;
  
    // let musicCurrentTime = wrapper.querySelector(".current-time"),
    // musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = mainAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      songduration.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }
    songcurrenttime.innerText = `${currentMin}:${currentSec}`;
})

mainAudio.addEventListener('ended', ()=>{
    nextMusic();
})

progressArea.addEventListener('click',(e)=>{
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration
    //console.log(songDuration);
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    let progressWidth1 = (mainAudio.currentTime / songDuration) * 100;
    myProgressBar.style.width = `${progressWidth1}%`
    playMusic(); //calling playMusic function
    playingSong();
    gifstart.style.opacity = '1'
})

function nextMusic(){
    musicIndex++;
    musicIndex > songs.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadmusic(musicIndex)
    playMusic();
    playingSong();
    gifstart.style.opacity = '1'
}

function backMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = songs.length : musicIndex = musicIndex;
    loadmusic(musicIndex);
    playMusic();
    playingSong();
    gifstart.style.opacity = '1'
}

back.addEventListener('click',()=>{backMusic();});
next.addEventListener('click',()=>{nextMusic();});
play_pause.addEventListener('click',()=>{
    if(mainAudio.paused || mainAudio.currentTime<=0){
        play_pause.classList.remove('fa-play');
        play_pause.classList.add('fa-pause');
        mainAudio.play();
        gifstart.style.opacity = '1'
    }
    else{
        play_pause.classList.remove('fa-pause');
        play_pause.classList.add('fa-play');
        mainAudio.pause();
        gifstart.style.opacity = '0'
    }
    playingSong();
});
window.addEventListener('load',()=>{
    songs.forEach((element, i) => {
        let listelement = `
            <div class="songlist" val="${i+1}">
                <span class="songimg"><img src="${element.coverPath}"></span>
                <span class="songname">${element.songName}</span>
                <span id="${element.id}" class="audio-duration">3:00</span>
                <audio class="${element.id}" src="${element.filePath}"></audio>
            </div>
        `
        songlists.insertAdjacentHTML('beforeend', listelement);
        let lsDuration = songlists.querySelector(`#${element.id}`);
        let audioTag = songlists.querySelector(`.${element.id}`);
        
        audioTag.addEventListener('loadeddata', ()=>{
            let setLsDuration = audioTag.duration;
            
            let totalmin = Math.floor(setLsDuration/60);
            let totalsec = Math.floor(setLsDuration%60);
            lsDuration.innerText = `${totalmin}:${totalsec}`;
            lsDuration.setAttribute("t-duration", `${totalmin}:${totalsec}`);
        })
        
    })
})

function playingSong(){
    const allLiTag = songlists.querySelectorAll(".songlist");
    
    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".audio-duration");
      
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }
      let test = allLiTag[j].getAttribute("val");
      //if the li tag index is equal to the musicIndex then add playing class in it
      if(allLiTag[j].getAttribute("val") == musicIndex){
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "Playing";
      }
  
      allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
  }

function clicked(element){
    let getLiIndex = element.getAttribute("val");
    musicIndex = getLiIndex; //updating current song index with clicked li index
    loadmusic(musicIndex);
    playMusic();
    playingSong();
    gifstart.style.opacity = '1'
}

// write code for gleary
quotes.forEach((element)=>{
    let image = `
    <div class="quotes ${element.id}">
        <img src="${element.quotespath}" onclick="viewImg(i)" alt="quotes">
    </div>
        `
    gleary.insertAdjacentHTML('beforeend', image);
    
})

showquotes.addEventListener('click', ()=>{
    gleary.style.display = "flex";
})