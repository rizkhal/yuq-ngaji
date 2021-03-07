import { timer } from "@/lib/helper";
import store from "@/stores/index";
import { reactive, ref, toRefs, watch, watchEffect } from "vue";

const player = new Audio();

const playlists = ref([]);
const playlistIndex = ref(0);
const state = reactive({
  active: [],
  loaded: [],
  timeframe: [],
  totaltime: [],
  elapsedtime: [],
  playbacktime: [],
});

watch(
  () => store.getters.payload,
  (prev, next) => {
    playlists.value = prev;
    if (next) {
      if (player.played) {
        player.pause();
        playlists.value.forEach((v, k) => {
          state.active[k] = false;
          state.loaded[k] = false;
          state.timeframe[k] = 0;
          state.totaltime[k] = 0;
          state.elapsedtime[k] = 0;
          state.playbacktime[k] = 0;
        });
      }
    }
  }
);

watch(
  () => state.timeframe[playlistIndex.value],
  (prev, next) => {
    let diff = Math.abs(prev - player.currentTime);

    if (diff > 0.01) {
      player.currentTime = prev;
    }
  }
);

watchEffect(() => {
  const active = state.active[playlistIndex.value];
  if (active) {
    player.addEventListener("timeupdate", () => {
      state.totaltime[playlistIndex.value] = Math.floor(player.duration);
      state.timeframe[playlistIndex.value] = player.currentTime;
      state.elapsedtime[playlistIndex.value] = timer(player.currentTime);
    });
  }
});

/**
 * Play media player
 *
 * @param {Number} index index of playlists array
 */
const onPlay = (index) => {
  const toPlay = playlists.value[index];

  if (toPlay) {
    playlists.value.forEach((v, k) => {
      state.active[k] = false;
      state.loaded[k] = false;
    });

    if (player.played) {
      player.pause();
      player.currentTime = 0;
    }

    player.src = toPlay.audio;

    const el = document.getElementById(`box-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (state.playbacktime[index] && state.playbacktime[index] != 0) {
      state.timeframe[index] = state.playbacktime[index];
      player.currentTime = state.playbacktime[index];
    } else {
      state.timeframe[index] = 0;
    }

    player.addEventListener("canplay", () => {
      state.loaded[index] = true;
    });

    player.play();
    state.active[index] = true;
    playlistIndex.value = index;
    player.addEventListener("ended", onEnded);
  }
};

/**
 * Pause media player
 *
 * @param {Number} index index of playlists array
 */
const onPause = (index) => {
  state.active[index] = false;
  state.playbacktime[index] = player.currentTime;
  player.pause();
};

/**
 * Handle audio on ended
 * if audio ended, check the next audio and play if exists
 */
const onEnded = () => {
  state.active[playlistIndex.value] = false;

  let nextIndex = (playlistIndex.value += 1);
  const nextPlay = playlists.value[nextIndex];

  if (nextPlay) {
    player.src = nextPlay.audio;

    const el = document.getElementById(`box-${nextIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    state.loaded[nextIndex] = false;
    player.addEventListener("canplay", () => {
      state.loaded[nextIndex] = true;
    });

    player.play();
    state.active[nextIndex] = true;
  }
};

if ("mediaSession" in navigator) {
  watch(
    () => store.getters.surah,
    (prev, next) => {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: prev.surahNameEnglishName,
        artist: prev.audio,
        album: prev.quran,
        artwork: [
          {
            src:
              "https://i2.wp.com/cdn.iconscout.com/icon/free/png-512/quran-1698954-1457546.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src:
              "https://i2.wp.com/cdn.iconscout.com/icon/free/png-512/quran-1698954-1457546.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src:
              "https://i2.wp.com/cdn.iconscout.com/icon/free/png-512/quran-1698954-1457546.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src:
              "https://i2.wp.com/cdn.iconscout.com/icon/free/png-512/quran-1698954-1457546.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src:
              "https://i2.wp.com/cdn.iconscout.com/icon/free/png-512/quran-1698954-1457546.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src:
              "https://i2.wp.com/cdn.iconscout.com/icon/free/png-512/quran-1698954-1457546.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", function() {
        onPlay(playlistIndex.value);
      });
      navigator.mediaSession.setActionHandler("pause", function() {
        onPause(playlistIndex.value);
      });
      navigator.mediaSession.setActionHandler("stop", function() {
        if (player.played) {
          player.pause();
          playlists.value.forEach((v, k) => {
            state.active[k] = false;
            state.loaded[k] = false;
            state.timeframe[k] = 0;
            state.totaltime[k] = 0;
            state.elapsedtime[k] = 0;
            state.playbacktime[k] = 0;
          });
        }
      });
      navigator.mediaSession.setActionHandler("previoustrack", function() {
        let index = playlistIndex.value;
        onPause(playlistIndex.value);
        onPlay((index -= 1));
      });
      navigator.mediaSession.setActionHandler("nexttrack", function() {
        let index = playlistIndex.value;
        onPause(playlistIndex.value);
        onPlay((index += 1));
      });
    }
  );
}

const useMediaPlayer = () => {
  return {
    onPlay,
    onPause,
  };
};

const useMediaPlayerMeta = () => {
  return {
    ...toRefs(state),
  };
};

export { useMediaPlayer, useMediaPlayerMeta };
