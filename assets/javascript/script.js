window.addEventListener("load", initPlayer);

var audio;
var togglePlay = false;
var togglePlayButton;
var slider;
var toggleadd;
function initPlayer(){
    audio = document.getElementById("audio");
    var ul = document.getElementById("songs");
    slider = document.getElementById("slider");
    slider.addEventListener("click", seekSong);
    togglePlayButton = document.getElementById("playPause");
    togglePlayButton.addEventListener("click", toggleSong);
    document.getElementById("nextSong").addEventListener("click", nextSong);
    document.getElementById("previousSong").addEventListener("click", previousSong);
    document.getElementById("searchbar").addEventListener("keyup", searchSong);
    document.getElementById("savelist").addEventListener("click",savePlayList);
    
    for(var i = 0; i < latestsongArray.length; i++) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        var img = document.createElement("img");
        var playIcon = document.createElement("img");
        var playlistspan = document.createElement("span");
        span.className="songn";
        span.innerHTML = latestsongArray[i].songName;
        span.setAttribute('title', latestsongArray[i].id);
        span.innerHTML=latestsongArray[i].songname;
        span.style.cursor="pointer";
        img.setAttribute('src', latestsongArray[i].songImage);
        img.className = "cover";
        playIcon.setAttribute('src',"assets/images/whitePlayButton2.png");
        playIcon.className="playicon";
        playlistspan.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
        playlistspan.className = "t3-dot";
        playIcon.className = 'playIcon';
        li.className = 'dsong';
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(playlistspan);
        li.appendChild(playIcon);
        span.addEventListener("click", setSongName);
        playIcon.addEventListener("click", setSongName);
        ul.appendChild(li);
        toggleadd=true;
        playlistspan.addEventListener("click", showPlaylistOption);
    }
    loadPlayList();
}

function searchSong() {
    var toSearch = event.srcElement.value;
    if(toSearch == "") {
        loadPlayList();
    }
    obj.searchSong(toSearch);
    showPlayList();
}
function setSongName(){
    songName = event.srcElement.parentElement.childNodes[1].innerText;
    playSong(songName);
}

function playSong(songName){
    var songURL;
    var spasteImg;
    var simg=document.getElementById("simg");
    var sname=document.getElementById("sname");
    simg.innerHTML="";
    sname.innerHTML="";
    for(var i = 0; i < latestsongArray.length; i++){
        if(latestsongArray[i].songname == songName){
            songURL = latestsongArray[i].songurl;
            audio.title = latestsongArray[i].id;
            spasteImg = latestsongArray[i].songImage;
        }
    }
    var img=document.createElement("img");
    img.setAttribute("src",spasteImg);
    img.className="pcover";
    simg.appendChild(img);
    var span=document.createElement("span");
    span.innerHTML=songName;
    span.className="songn";
    sname.appendChild(span);
    togglePlayButton.innerHTML = '<i class="fas fa-pause"></i>';
    audio.src = songURL;
    audio.play();
    setInterval(function(){
        slider.value = audio.currentTime;
    },500);
    setTimeout(function(){
        var duration = audio.duration;
        slider.max = duration;
    },200);
    }

   function updateTrackTime(track){
    var currTimeDiv = document.getElementById('currentTime');
    var durationDiv = document.getElementById('totalTime');
  
    var currTime = Math.floor(track.currentTime).toString(); 
    var duration = Math.floor(track.duration).toString();
  
    currTimeDiv.innerHTML = formatSecondsAsTime(currTime);
  
    if (isNaN(duration)){
      durationDiv.innerHTML = '00:00';
    } 
    else{
      durationDiv.innerHTML = formatSecondsAsTime(duration);
    }
  }
  function formatSecondsAsTime(secs, format) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  
    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }
  
    return min + ':' + sec;
  }

function seekSong(){
    audio.currentTime = slider.value;
}

function nextSong(){
    var songId = audio.title;
    var n_song = parseInt(songId)+1;
    var songName;
    if(songId==latestsongArray.length){
        songName=latestsongArray[0].songname;
    }
    else{
        for(var i = 0; i < latestsongArray.length; i++){
           if(latestsongArray[i].id == n_song) {
            songName = latestsongArray[i].songname;
            }
        }
    }
    playSong(songName);
}

function previousSong(){
    var songId = audio.title;
    var n_song = parseInt(songId)-1;
    var songName;
    var lst=latestsongArray.length-1;
    if(songId==1){
        songName=latestsongArray[lst].songname;
    }
    else{
        for(var i = 0; i < latestsongArray.length; i++){
           if(latestsongArray[i].id == n_song) {
            songName = latestsongArray[i].songname;
            // console.log(n_song, songName);
           }
        }
    }
    playSong(songName);
}

function toggleSong(){
    if(togglePlay) {
        audio.play();
        togglePlayButton.innerHTML = '<i class="fas fa-pause"></i>';
        togglePlay = false;
    }
    else {
        audio.pause();
        togglePlayButton.innerHTML = '<i class="fas fa-play"></i>';
        togglePlay = true;
    }
}

function stopSong(){
    audio.currentTime = 0;
    audio.pause();
}

function showPlaylistOption(){
    var con=event.srcElement.parentElement;
    var btn=document.createElement("div");
   if(toggleadd){
        btn.innerHTML="add to playlist";
        btn.className="addplaylist";
        con.appendChild(btn);
        toggleadd=false;   
    }
    else if(toggleadd==false){
        con.lastChild.style.display="none";
        toggleadd=true;
    }
    btn.addEventListener("click",addToPlaylist);
}
function addToPlaylist(){
    var songId = event.srcElement.parentNode.parentElement.childNodes[1].title;
    console.log(songId);
    for(var i = 0; i < latestsongArray.length; i++){
        if(latestsongArray[i].id == songId) {
            obj.addSong(latestsongArray[i].id,
                latestsongArray[i].songname,
                latestsongArray[i].songurl,
                latestsongArray[i].songImage);
        }
    }
    showPlayList();
}
function loadPlayList() {
    if(localStorage.myPlayList) {
        var data = localStorage.getItem('myPlayList')
        obj.playList = JSON.parse(data);
    }
    showPlayList();
}

function savePlayList(){
    if(window.localStorage) {
        var json = JSON.stringify(obj.playList);
        // console.log(json);
        localStorage.setItem('myPlayList', json);
    }
    else{
        alert("Localstorage not supported...");
    }
}
function showPlayList(){
    var ul = document.getElementById("playList");
    ul.innerHTML = "";
    // console.log("playlist function");
    obj.playList.forEach(function(s){
        // console.log("Creating playlist");
        var li = document.createElement("li");
        var span = document.createElement("span");
        var img = document.createElement("img");
        var playIcon = document.createElement("button");
        var btn = document.createElement("button");
        span.innerHTML = s.name;
        span.setAttribute('title', s.id);
        span.className="playlsongname";
        img.setAttribute('src', s.songimage);
        img.className = "pcover";
        btn.innerHTML = '<i class="fas fa-trash"></i>';
        btn.className = "btn btn-primary deleteBtn";
        playIcon.className = 'playlIcon';
        playIcon.innerHTML='<img src="assets/images/play1.png" alt="playIcon">'
        li.className = "list-group-item listsong";
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(btn);
        li.appendChild(playIcon);
        span.addEventListener("click", setSongName);
        playIcon.addEventListener("click", psetSongName);
        ul.appendChild(li);
        btn.addEventListener("click", deleteSong);
    })   
}

function psetSongName(){
    songName = event.srcElement.parentElement.parentElement.childNodes[1].innerText;
    playSong(songName);  
}

function deleteSong(){
    var songId = event.srcElement.parentElement.parentElement.childNodes[1].title;
    obj.deleteSong(songId);
    showPlayList();
}
