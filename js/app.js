import media from './media.js';

const APP = {
  audio: new Audio(), //the Audio Element that will play every track
  currentTrack: 0, //the integer representing the index in the MEDIA array
  tracks: media,
  init: () => {
    //called when DOMContentLoaded is triggered
    APP.addListeners();
    APP.buildPlaylist();
    APP.loadCurrentTrack();
  },
  addListeners: () => {
    //add event listeners for interface elements
    document.getElementById('btnPlay').addEventListener('click', APP.playStopAction)
    //add event listeners for APP.audio
    APP.audio.addEventListener('timeupdate', APP.timeHandler); 
    APP.audio.addEventListener('durationchange', APP.durationchange);
    APP.audio.addEventListener('error', APP.errorHandler);
  },
  durationchange: (ev) => {
    //value for duration has changed
    document.querySelector('.total-time').innerHTML = APP.convertTimeDisplay(APP.audio.duration);
  },
  buildPlaylist: () => {
    //read the contents of MEDIA and create the playlist
    // APP.trackTimes();
    const playlist = document.querySelector('.playlist > ul');
    playlist.innerHTML = APP.tracks.map((song) => {
      return `<li class="track__item" id="${song.track}">
                        <a>
                            <div class="track__thumb">
                                <img src="./img/${song.thumbnail}" alt="artist album art thumbnail" />
                            </div>
                            <div class="track__details">
                                <p class="track__title">${song.title}</p>
                                <p class="track__artist">${song.artist}</p>
                            </div>
                            <div class="track__time">
                                <time datetime="">00:00</time>
                            </div>
                        </a>
                    </li>`
    }).join('')
  },
  playStopAction: (ev) => {
    if (ev.target.innerHTML == '<i class="material-symbols-rounded">play_arrow</i>' || ev.target.innerHTML == 'play_arrow') {
      APP.play();
    } else if (ev.target.innerHTML == '<i class="material-symbols-rounded">pause</i>' || ev.target.innerHTML == 'pause'){
      APP.pause();
    }
  },
  loadCurrentTrack: () => {
    //use the currentTrack value to set the src of the APP.audio element
    APP.audio.src = `./media/${APP.tracks[APP.currentTrack].track}`
    let album = document.querySelector('.album_art__full>img');
    album.setAttribute('src', `./img/${APP.tracks[APP.currentTrack].large}` )
  },
  timeHandler: () => {
    const currentTime = APP.convertTimeDisplay(APP.audio.currentTime);
    document.querySelector('.current-time').innerHTML = currentTime;
  },
  play: () => {
    console.log(media[APP.currentTrack].track)
    document.getElementById(`${media[APP.currentTrack].track}`).classList.add('actual');
    //start the track loaded into APP.audio playing
    if (APP.audio.src) {
      //something is loaded
      APP.audio.play();
      document.getElementById('btnPlay').innerHTML = '<i class="material-symbols-rounded">pause</i>'
    } else {
      console.warn('You need to load a track first');
    }
  },
  pause: () => {
    //pause the track loaded into APP.audio playing
    APP.audio && APP.audio.pause();
    document.getElementById('btnPlay').innerHTML = '<i class="material-symbols-rounded">play_arrow</i>'
  },
  convertTimeDisplay: (seconds) => {
    //convert the seconds parameter to `00:00` style display
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  },
  errorHandler: () => {
    console.warn('Error loading: ', APP.audio.src);
  }
  // trackTimes: () => {
  //   APP.tracks.forEach((song) => {
  //     //create a temporary audio element to open the audio file
  //     let tempAudio = new Audio(`./media/${song.track}`);
  //     //listen for the event
  //     tempAudio.addEventListener('durationchange', (ev) => {
  //       //`tempAudio` and `track` are both accessible from inside this function
  //       //update the array item with the duration value
  //       let duration = ev.target.duration;
  //       song['duration'] = duration;
  //       //update the display by finding the playlist item with the matching img src
  //       //or track title or track id...
  //       let thumbnails = document.querySelectorAll('.track__item img');
  //       console.log(thumbnails)
  //       thumbnails.forEach((thumb) => {
  //         if (thumb.src.includes(song.thumbnail)) {
  //           //convert the duration in seconds to a 00:00 string
  //           let timeString = APP.convertTimeDisplay(duration);
  //           //update the playlist display for the matching item
  //           console.log(thumb.closest('.track__item').querySelector('time'))
  //           thumb.closest('.track__item').querySelector('time').innerHTML = timeString;
  //         }
  //       });
  //     });
  //   });
  // }
};

document.addEventListener('DOMContentLoaded', APP.init)