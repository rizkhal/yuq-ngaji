<template>
  <div class="w-full mt-2">
    <!-- default audio tag in HTML5 -->
    <ul>
      <li>isPlaying: {{ isPlaying }}</li>
      <li>Playtime: {{ playBackTime }}</li>
      <li>Loaded: {{ audioLoaded }}</li>
      <li>Duration: {{ audioDuration }}</li>
    </ul>
    <audio ref="players" :id="playerId" class="hidden">
      <source :src="file" type="audio/mpeg" />
    </audio>
    <div class="flex items-center justify-center bg-red-lightest">
      <div
        class="bg-white shadow-lg rounded-lg"
        style="width: 45rem !important"
      >
        <div class="flex">
          <div>
            <img
              class="w-full rounded hidden md:block"
              src="https://tailwindcss.com/img/card-top.jpg"
              alt="Album Pic"
            />
          </div>
          <div class="w-full p-8">
            <div class="flex justify-between">
              <div>
                <h3 class="text-2xl text-grey-darkest font-medium">
                  A Sky Full of Stars
                </h3>
                <p class="text-sm text-grey mt-1">Ghost Stories</p>
              </div>
              <div class="text-red-lighter">
                <!-- i love you icon 3000 -->
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex justify-between items-center mt-8">
              <div
                class="text-gray-700 p-2 rounded-full bg-green-200 shadow-lg"
              >
                <!-- prev icon -->
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                </svg>
              </div>
              <div class="text-white p-8 rounded-full bg-green-200 shadow-lg">
                <!-- play icon -->
                <svg
                  @click="playerToggle"
                  v-if="!isPlaying || !audioLoaded"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-800 w-6 h-6 feather feather-play"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <!-- pause icon -->
                <svg
                  @click="playerToggle"
                  v-if="isPlaying"
                  class="text-gray-800 w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                </svg>
              </div>
              <div
                class="text-gray-700 p-2 rounded-full bg-green-200 shadow-lg"
              >
                <!-- next icon -->
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-8 pt-2 pb-3">
          <div class="mt-1">
            <input
              min="0"
              type="range"
              name="position"
              :max="audioDuration"
              v-model="playBackTime"
              class="w-full rounded-lg overflow-hidden appearance-none bg-green-200 h-2"
            />
          </div>
          <div class="flex justify-between text-sm text-gray-800">
            <p>{{ elapsedTime }}</p>
            <p>{{ totalTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, toRefs, watchEffect } from "vue";

const timer = (seconds) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);

  var hours = seconds / 3600;
  var minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(":");
};

export default {
  name: "Audio",
  props: {
    file: {
      type: String,
      required: true,
    },
    playerId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const players = ref(0);
    const meta = reactive({
      totalTime: "00:00",
      elapsedTime: "00:00",
    });
    const data = reactive({
      playBackTime: 0,
      audioDuration: 0,
      isPlaying: false,
      audioLoaded: false,
    });

    onMounted(() => {
      const audio = players.value;

      audio.addEventListener("loadedmetadata", (e) => {
        const seconds = Math.floor(audio.duration);
        meta.totalTime = timer(seconds);
        data.audioDuration = seconds;
      });

      audio.addEventListener("canplay", (e) => {
        data.audioLoaded = true;
      });
    });

    const playerToggle = () => {
      let audio = players.value;
      console.log(audio)

      if (audio.paused) {
        audio.play();
        data.isPlaying = true;
      } else {
        audio.pause();
        data.isPlaying = false;
      }
    };

    const onPlayEventListener = () => {
      const audio = players.value;
      const timeFrame = audio.currentTime;

      meta.elapsedTime = timer(timeFrame);
      data.playBackTime = timeFrame;
    };

    const onEndEventListener = () => {
      const audio = players.value;
      data.playBackTime = 0;
      data.isPlaying = false;
      audio.removeEventListener("timeupdate", onPlayEventListener);
    };

    watchEffect(() => {
      const playerState = data.isPlaying;
      const audio = players.value;

      if (playerState) {
        audio.addEventListener("timeupdate", onPlayEventListener);
        audio.addEventListener("ended", onEndEventListener);
      }

      let different = Math.abs(data.playBackTime - audio.currentTime);

      if (different > 0.01) {
        audio.currentTime = data.playBackTime;
      }
    });

    return {
      players,
      playerToggle,
      ...toRefs(data),
      ...toRefs(meta),
    };
  },
};
</script>
<style lang="css" scoped>
input[type="range"]::-webkit-slider-thumb {
  width: 15px;
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  cursor: ew-resize;
  background: #ffffff;
  box-shadow: -405px 0 0 400px #31c48d;
  border-radius: 50%;
}
</style>