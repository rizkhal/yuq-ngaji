<template>
  <div id="top"></div>
  <Loading v-if="isLoading" :box="true" />
  <div
    v-else
    v-for="(item, i) in ayahs"
    :key="i"
    :id="`box-${i}`"
    class="bg-white max-w-2/4 m-2 border-2 border-white rounded-md p-6"
    :class="isActive[i] ? 'border-2 border-green-root' : ''"
  >
    <div class="flex justify-between">
      <span class="text-2xl font-medium text-green-root">{{ surah }}:{{ item.numberInSurah }}</span>
      <p class="text-2xl text-right pl-8 leading-loose">{{ item.text }}</p>
    </div>
    <div class="flex justify-start mt-12">
      <span class="text-green-root uppercase"
        >INDONESIA - {{ meta.translator }}</span
      >
      <!-- bellow in next release -->
      <!-- <span class="mx-2 text-gray-300">|</span>
      <span class="text-orange-300">SEE TAFSIR</span> -->
    </div>
    <div class="mt-3">
      <p v-if="!isReadMore[i]">
        {{ item.indonesianTranslation.slice(0, 290) }}
        <span v-if="item.indonesianTranslation.length > 289">...</span>
      </p>
      <p v-else>{{ item.indonesianTranslation }}</p>
      <span
        class="text-green-root cursor-pointer"
        @click="isReadMore[i] = !isReadMore[i]"
      >
        <span v-if="!isReadMore[i] && item.indonesianTranslation.length > 289"
          >Lanjutkan membaca</span
        >
        <span v-if="isReadMore[i]">Tutup</span>
      </span>
    </div>
    <div class="my-4 flex justify-center items-center">
      <span class="text-sm mr-2 text-gray-400">{{
        elapsedtime[i] === 0 || !elapsedtime[i] ? "00:00" : elapsedtime[i]
      }}</span>
      <input
        min="0"
        type="range"
        :max="totaltime[i]"
        v-model="timeframe[i]"
        class="cursor-pointer rounded-md appearance-none overflow-hidden bg-gray-300 h-2 w-full focus:outline-none"
      />
      <div class="ml-2">
        <svg
          @click="play(i)"
          v-if="!isActive[i]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-8 h-8 text-gray-400 cursor-pointer feather feather-play-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
        <svg
          v-if="isActive[i] && !isLoaded[i]"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="inline-flex justify-start animate-spin h-8 w-8 text-gray-400"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <svg
          @click="pause(i)"
          v-if="isActive[i] && isLoaded[i]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-8 h-8 text-gray-400 cursor-pointer feather feather-pause-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="10" y1="15" x2="10" y2="9"></line>
          <line x1="14" y1="15" x2="14" y2="9"></line>
        </svg>
      </div>
    </div>
    <div class="flex flex-wrap space-x-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="red"
        stroke="red"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 text-gray-400 cursor-pointer feather feather-heart"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 text-gray-400 cursor-pointer feather feather-share-2"
      >
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 text-gray-400 cursor-pointer feather feather-link"
      >
        <path
          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        ></path>
        <path
          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
import http from "@/api/http";
import { useStore } from "vuex";
import { watchEffect, ref } from "vue";
import Loading from "@/components/Loading.vue";

const timer = (seconds) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  var hours = seconds / 3600;
  var minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(":");
};

export default {
  name: "Center",
  components: {
    Loading,
  },
  props: {
    surah: {
      default: 1,
      type: Number,
      required: false,
    },
  },
  async setup(props) {
    const index = ref(0);
    const meta = ref(null);
    const surah = ref(null);
    const ayahs = ref(null);

    const isActive = ref([]);
    const isReadMore = ref([]);
    const isLoaded = ref([]);
    const isLoading = ref(true);

    const store = useStore();

    const duration = ref([]);
    const timeframe = ref([]);
    const totaltime = ref([]);
    const elapsedtime = ref([]);
    const playbacktime = ref([]);

    const player = new Audio();

    watchEffect(async () => {
      surah.value = props.surah;
      store.commit("setPayload", surah.value);

      try {
        isLoading.value = true;
        const response = await http(`/surah/${surah.value}?per_page=286`);
        meta.value = response.meta;
        ayahs.value = response.data.data;

        ayahs.value.forEach((v, k) => {
          totaltime.value[k] = 0;
          timeframe.value[k] = 0;
          elapsedtime.value[k] = 0;
          isLoaded.value[k] = false;
          isActive.value[k] = false;
        });

        if (player.played) {
          player.pause();
        }

        isLoading.value = false;
        totaltime.value[index.value] = 0;
        timeframe.value[index.value] = 0;
        elapsedtime.value[index.value] = 0;
      } catch (e) {
        console.error(e);
      }
    });

    const play = (i) => {
      index.value = i;

      ayahs.value.forEach((v, k) => {
        isLoaded.value[k] = false;
        isActive.value[k] = false;
      });

      if (player.played) {
        player.pause();
      }

      const { audio } = ayahs.value[index.value];
      player.src = audio;

      if (
        playbacktime.value[index.value] &&
        playbacktime.value[index.value] != 0
      ) {
        timeframe.value[index.value] = playbacktime.value[index.value];
        player.currentTime = playbacktime.value[index.value];
      } else {
        timeframe.value[index.value] = 0;
      }

      player.addEventListener("canplay", () => {
        isLoaded.value[i] = true;
      });

      player.play();

      isActive.value[index.value] = true;

      player.addEventListener("ended", ended);
    };

    const pause = (i) => {
      isActive.value[i] = false;
      playbacktime.value[i] = player.currentTime;
      player.pause();
    };

    const ended = () => {
      isActive.value[index.value] = false;

      let nextIndex = (index.value += 1);

      const nextPlay = ayahs.value[nextIndex];
      if (nextPlay) {
        const el = document.getElementById(`box-${nextIndex}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        player.src = nextPlay.audio;

        isLoaded.value[nextIndex] = false;
        player.addEventListener("canplay", () => {
          isLoaded.value[nextIndex] = true;
        });

        player.play();

        isActive.value[nextIndex] = true;
      }
    };

    watchEffect(() => {
      const state = isActive.value[index.value];
      if (state) {
        player.addEventListener("timeupdate", () => {
          totaltime.value[index.value] = Math.floor(player.duration);
          timeframe.value[index.value] = player.currentTime;
          elapsedtime.value[index.value] = timer(player.currentTime);
        });
      }
    });

    watchEffect(() => {
      let playback = timeframe.value[index.value];
      let diff = Math.abs(playback - player.currentTime);

      if (diff > 0.01) {
        player.currentTime = playback;
      }
    });

    return {
      meta,
      play,
      pause,
      ayahs,
      surah,
      index,
      isActive,
      isLoaded,
      isLoading,
      duration,
      timeframe,
      totaltime,
      isReadMore,
      elapsedtime,
    };
  },
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  width: 0;
  height: 15px;
  appearance: none;
  border-radius: 50%;
  background: #179f87;
  -webkit-appearance: none;
  box-shadow: -600px 0 0 600px #179f87;
}
</style>