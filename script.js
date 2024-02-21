window.onload = function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playlist = document.getElementById('playlist');
    const playPauseButton = document.getElementById('playPauseButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const progressBar = document.getElementById('progressBar');
    const currentlyPlaying = document.getElementById('currentlyPlaying');
    const playAllButton = document.getElementById('playAllButton');

    let currentSongIndex = 0;
    let isPlayingAll = false;

    const songs = Array.from(playlist.querySelectorAll('button')).map(song => song.getAttribute('data-src'));

    function playSong(index) {
        audioPlayer.src = songs[index];
        audioPlayer.play();
        currentlyPlaying.textContent = `Reproduzindo: ${playlist.children[index].textContent}`;
        document.title = playlist.children[index].textContent; // Atualiza o título da página (aba do navegador) com o nome da música
        currentSongIndex = index;
    }

    function playNextSong() {
        if (isPlayingAll) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        playSong(currentSongIndex);
    }

    playPauseButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    prevButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    nextButton.addEventListener('click', function() {
        playNextSong();
    });

    playAllButton.addEventListener('click', function() {
        isPlayingAll = true;
        playNextSong();
    });

    audioPlayer.addEventListener('timeupdate', function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    });

    audioPlayer.addEventListener('ended', function() {
        playNextSong();
    });

    playlist.addEventListener('click', function(event) {
        if (event.target && event.target.tagName === 'BUTTON') {
            const index = Array.from(playlist.querySelectorAll('button')).indexOf(event.target);
            isPlayingAll = false;
            playSong(index);
        }
    });
};
