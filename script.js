let currentFolder = "songs/romantic/";
var songs = [];
let sf = 0;
let rp = 0;
let duration;
async function getSong(folder) {
    let response = await fetch(`http://127.0.0.1:3000/Projects/Spotify2.0/assets/${folder}`);
    let txt = await response.text();
    // console.log(typeof(txt));
    let div = document.createElement("div");
    div.innerHTML = txt;
    songs = [];
    let as = div.getElementsByTagName("a");
    // console.log(as);
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    let play_name = Array.from(currentFolder.split("/").slice(-2)[0])[0].toLocaleUpperCase() + Array.from(currentFolder.split("/").slice(-2)[0]).slice(1).join("");
    document.querySelector(".play_name").innerHTML = decodeURI(play_name);

    currentSong.src = songs[0];
    let songList = document.querySelector(".playlistBox").getElementsByTagName("ul")[0];
    // console.log(songList);
    songList.innerHTML = "";
    for (let index = 0; index < songs.length; index++) {
        let element = replaceExt(songs[index].split(currentFolder)[1]);
        // console.log(element.endsWith(".mp3"));
        songList.innerHTML = songList.innerHTML + `<li><div class="songCard">
                                <div class="img">
                                    <img style="height: 36px; width: 36px; border-radius: 35px;" src="http://127.0.0.1:3000/Projects/Spotify2.0/assets/${currentFolder}/cover.jpg"
                                        alt="pic"></div>
                                <div class="songname_author">
                                    <div class="song">${element}</div>
                                    <div class="author">Arijit Singh</div>
                                </div>
                                <div class="playBtn">
                                    <img src="assets/images/play.svg" style="width: 20px; height: 20px;" alt="pic">
                                </div>
                            </div></li>`;
    }
    Array.from(document.querySelector(".playlistBox").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", (event) => {
            // let track = "/Projects/Spotify2.0/assets/songs/" + e.children[1].children[0].innerHTML.trim() + ".mp3";
            // console.log(e.querySelector(".songname_author").firstElementChild.innerHTML);
            let track = `/Projects/Spotify2.0/assets/${currentFolder}` + e.querySelector(".songname_author").firstElementChild.innerHTML.trim() + ".mp3";
            if (currentSong.paused) {
                e.querySelector(".songCard").children[2].firstElementChild.src = "http://127.0.0.1:3000/Projects/Spotify2.0/assets/images/pause.svg";
                playMusic(track);
            } else {
                e.querySelector(".songCard").children[2].firstElementChild.src = "http://127.0.0.1:3000/Projects/Spotify2.0/assets/images/play.svg";
                currentSong.pause();
            }
        });
    });
    return songs;
}

function replaceExt(element) {
    if (element.endsWith(".mp3") || element.endsWith(".wav") || element.endsWith(".aac") || element.endsWith(".wma") || element.endsWith(".pcm") || element.endsWith(".aiff") || element.endsWith(".flac") || element.endsWith(".alac")) {
        element = element.replaceAll(".mp3", "");
        element = element.replaceAll(".wav", "");
        element = element.replaceAll(".aac", "");
        element = element.replaceAll(".wma", "");
        element = element.replaceAll(".pcm", "");
        element = element.replaceAll(".aiff", "");
        element = element.replaceAll(".flac", "");
        element = element.replaceAll(".alac", "");
        element = element.replaceAll("%20", " ");
    }
    return element;
}

const currentSong = new Audio();

function playMusic(track) {
    currentSong.src = track;
    currentSong.play();
    let pbtn = document.querySelector(".playBtns");
    // console.log("pbtn", pbtn.children[2]);
    pbtn.children[2].innerHTML = `<button class="playbtn" style="--button-size: 32px;"><svg style="height: 22px; width: 22px;" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg></button>`;
    let t = track.split("/");
    document.querySelector(".trackTitle").innerHTML = replaceExt(t[t.length - 1]);
    document.querySelector(".playTime").innerHTML = "00:00/00:00";
}

function secondsToMinuteSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input!";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function displayAlbums() {
    let response = await fetch(`http://127.0.0.1:3000/Projects/Spotify2.0/assets/songs/`);
    let txt = await response.text();
    // console.log(typeof(txt));
    let div = document.createElement("div");
    div.innerHTML = txt;
    let anchors = div.getElementsByTagName("a");
    // console.log(anchors);
    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // console.log(element.href);
        if (element.href.includes("/songs/")) {
            let foldername = element.href.split("/").slice(-2)[0];
            // console.log(foldername);
            let info = await fetch(`http://127.0.0.1:3000/Projects/Spotify2.0/assets/songs/${foldername}/metadata.json`);
            let response = await info.json();
            // console.log(response);
            let cardContainer = document.querySelector(".cards");
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${foldername}" class="card">
                            <img src="http://127.0.0.1:3000/Projects/Spotify2.0/assets/songs/${foldername}/cover.jpg" alt="pic">
                            <button class="playBtn">
                                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24">
                                    <path
                                        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                                    </path>
                                </svg>
                            </button>
                            <h4><a href="/">${response.title}</a></h4>
                            <h5><a href="/">${response.description}</a></h5>
                        </div>`;
        }
    }
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        // console.log(e, e.target);
        e.addEventListener("click", async item => {
            // console.log(item, item.currentTarget.dataset.folder);
            currentFolder = `songs/${item.currentTarget.dataset.folder}/`;
            songs = await getSong(currentFolder);
            currentSong.src = songs[0];
            
            play_name = Array.from(currentFolder.split("/").slice(-2)[0])[0].toLocaleUpperCase() + Array.from(currentFolder.split("/").slice(-2)[0]).slice(1).join("");
            // console.log(document.querySelector(".play_name").innerHTML, play_name);
            document.querySelector(".play_name").innerHTML = decodeURI(play_name);
            // console.log(songs[0], currentSong.src, currentSong.duration);
            let t = currentSong.src.split("/");
            document.querySelector(".trackTitle").innerHTML = replaceExt(t[t.length - 1]);
            playMusic(currentSong.src);
            
            currentSong.addEventListener("loadedmetadata", (e)=>{
                // console.log(currentSong.duration);
                // document.querySelector(".songName").innerHTML = currentSong.src
                document.querySelector(".playTime").innerHTML = `00:00/${secondsToMinuteSeconds(currentSong.duration)}`;
            });
        });
    });
}

async function main() {
    songs = await getSong(currentFolder);
    // console.log(songs[7]);

    displayAlbums();

    document.querySelector(".playBtns").getElementsByTagName("div")[2].addEventListener("click", (e) => {
        if (currentSong.paused) {
            currentSong.play();
            document.querySelector(".play").innerHTML = `<button class="playbtn"><svg style="height: 20px; width:20px;" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg></button>`;
        } else {
            currentSong.pause();
            document.querySelector(".play").innerHTML = `<button class="pausebtn" aria-label="Play" data-testid="control-button-playpause"><svg style="height: 20px; width: 20px;" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
                                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z">
                                </path>
                            </svg></button>`;
        }
    });

    currentSong.addEventListener("timeupdate", (e) => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".playTime").innerHTML = `${secondsToMinuteSeconds(currentSong.currentTime)} / ${secondsToMinuteSeconds(currentSong.duration)}`;
        document.querySelector(".seekball").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        // console.log(e.offsetX, e.target.getBoundingClientRect());
        let percent = e.offsetX / e.target.getBoundingClientRect().width * 100;
        document.querySelector(".seekball").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".back").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "-110%";
    });

    document.querySelector(".next").addEventListener("click", async (e) => {
        let response = await fetch(`http://127.0.0.1:3000/Projects/Spotify2.0/assets/${currentFolder}`);
        let txt = await response.text();
        let div = document.createElement("div");
        div.innerHTML = txt;
        let as = div.getElementsByTagName("a");
        let allsongs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                allsongs.push(decodeURI(element.href));
            }
        }
        let index = allsongs.indexOf(currentSong.src);
        // console.log(currentSong.src);
        if (index < allsongs.length - 1) {
            currentSong.src = allsongs[index+1];
            playMusic(allsongs[index + 1]);
        } else {
            currentSong.src = allsongs[0];
            playMusic(allsongs[0]);
        }
    });
    document.querySelector(".previous").addEventListener("click", async (e) => {
        let response = await fetch(`http://127.0.0.1:3000/Projects/Spotify2.0/assets/${currentFolder}`);
        let txt = await response.text();
        let div = document.createElement("div");
        div.innerHTML = txt;
        let as = div.getElementsByTagName("a");
        let allsongs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                allsongs.push(decodeURI(element.href));
            }
        }
        let index = allsongs.indexOf(currentSong.src);
        // console.log(currentSong.src);
        if (index > 0) {
            currentSong.src = allsongs[index-1];
            playMusic(allsongs[index - 1]);
        } else {
            currentSong.src = allsongs[allsongs.length - 1];
            playMusic(allsongs[allsongs.length - 1]);
        }
    });

    let range = document.querySelector(".timeVol").getElementsByTagName("input")[0];
    let speakers = document.querySelector(".timeVol").getElementsByTagName("img");
    range.addEventListener("change", (e) => {
        // console.log(e, e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100;
        speakers[0].style.display = "block";
        speakers[1].style.display = "none";
    });

    speakers[0].addEventListener("click", (e) => {
        // console.log(e, e.currentTarget.src);
        e.currentTarget.style.display = "none";
        speakers[1].style.display = "block";
        range.value = 0;
        currentSong.volume = 0.0;
    });
    speakers[1].addEventListener("click", (e) => {
        // console.log(e, e.currentTarget.src);
        e.currentTarget.style.display = "none";
        speakers[0].style.display = "block";
        range.value = 30;
        currentSong.volume = 0.30;
    });

    document.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        // console.log("start: ",startX, startY);
    });

    document.addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        // console.log("end: ", endX, endY);
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0 && (document.querySelector(".left").style.left == "-110%")) {
                document.querySelector(".left").style.left = "0";
            }
        }
    });

    let suffle = `<button style="--button-size: 32px;"><svg class="invert" style="height: 16px; width: 16px;" data-encore-id="icon" role="img"
                                    aria-hidden="true" viewBox="0 0 16 16">
                                    <path
                                        d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z">
                                    </path>
                                    <path
                                        d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z">
                                    </path>
                                </svg></button>`;
    let colorSuffle = `<button style="--button-size: 32px;"><svg stroke="red" class="invert" style="height: 16px; width: 16px;" data-encore-id="icon" role="img"
                                    aria-hidden="true" viewBox="0 0 16 16">
                                    <path
                                        d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z">
                                    </path>
                                    <path
                                        d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z">
                                    </path>
                                </svg></button>`;
    let repet = `<button style="--button-size: 32px;"><svg class="invert"
                                    style="height: 16px; width: 16px;" data-encore-id="icon" role="img"
                                    aria-hidden="true" viewBox="0 0 16 16">
                                    <path
                                        d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z">
                                    </path>
                                </svg></button>`;
    let colorRepet = `<button style="--button-size: 32px;"><svg class="invert" stroke="red"
                                    style="height: 16px; width: 16px;" data-encore-id="icon" role="img"
                                    aria-hidden="true" viewBox="0 0 16 16">
                                    <path
                                        d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z">
                                    </path>
                                </svg></button>`;

    document.querySelector(".shuffle").addEventListener("click", (e) => {
        // console.log("Shuffle is clicked", (document.querySelector(".shuffle").innerHTML==colorSuffle));
        if (sf == 0) {
            document.querySelector(".shuffle").innerHTML = colorSuffle;
            document.querySelector(".repeat").innerHTML = repet;
            sf = 1;
            rp = 0;
        } else {
            document.querySelector(".shuffle").innerHTML = suffle;
            sf = 0;
        }
    });
    document.querySelector(".repeat").addEventListener("click", (e) => {
        // console.log("Repeat is clicked", document.querySelector(".repeat").getElementsByTagName("svg"));
        if (rp == 0) {
            document.querySelector(".repeat").innerHTML = colorRepet;
            document.querySelector(".shuffle").innerHTML = suffle;
            sf = 0;
            rp = 1;
        } else {
            document.querySelector(".repeat").innerHTML = repet;
            rp = 0;
        }
    });

    currentSong.addEventListener("ended", async (e) => {
        // console.log(e, e.target);
        if (rp == 1) {
            let response = await fetch(`http://127.0.0.1:3000/Projects/Spotify2.0/assets/${currentFolder}`);
            let txt = await response.text();
            let div = document.createElement("div");
            div.innerHTML = txt;
            let as = div.getElementsByTagName("a");
            let allsongs = [];
            for (let index = 0; index < as.length; index++) {
                const element = as[index];
                if (element.href.endsWith(".mp3")) {
                    allsongs.push(decodeURI(element.href));
                }
            }
            let idx = allsongs.indexOf(currentSong.src);
            // console.log(allsongs.indexOf(currentSong.src));
            setTimeout(() => {
                if (idx == allsongs.length - 1) {
                    playMusic(allsongs[0]);
                } else {
                    playMusic(allsongs[idx + 1]);
                }
            }, 2000);
        }
        else if (sf == 1) {
            let response = await fetch(`http://127.0.0.1:3000/Projects/Spotify2.0/assets/${currentFolder}`);
            let txt = await response.text();
            let div = document.createElement("div");
            div.innerHTML = txt;
            let as = div.getElementsByTagName("a");
            let allsongs = [];
            for (let index = 0; index < as.length; index++) {
                const element = as[index];
                if (element.href.endsWith(".mp3")) {
                    allsongs.push(decodeURI(element.href));
                }
            }
            let idx = Math.floor(Math.random() * allsongs.length);
            // console.log(idx, allsongs.length);
            setTimeout(() => {
                playMusic(allsongs[idx]);
            }, 2000);
        }
    });

    // document.querySelector(".libPlus").getElementsByTagName("span").innerHTML = currentFolder.split("/").slice(-2)[0];

    // document.querySelector(".play").addEventListener("click", () => {
    //     console.log("play btn is clicked!");
    //     if (audio.paused) {
    //         document.querySelector(".play").innerHTML = `<button class="playbtn" style="--button-size: 32px;"><svg style="height: 22px; width: 22px;" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg></button>`;
    //         audio.play().catch((err) => {
    //             console.log("Unable to play song...", err);
    //         });
    //     } else {
    //         console.log("pause btn is clicked!");
    //         document.querySelector(".play").innerHTML = `<button class="pausebtn" aria-label="Play" data-testid="control-button-playpause"
    //                         style="--button-size: 32px;"><svg style="height: 22px; width: 22px;" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
    //                             <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z">
    //                             </path>
    //                         </svg></button>`;
    //         audio.pause();
    //     }
    // });

}

main();
