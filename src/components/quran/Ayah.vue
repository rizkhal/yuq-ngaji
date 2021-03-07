<template>
  <div id="top"></div>
  <Loading v-if="loading" :box="true" />
  <div
    v-for="(item, i) in ayahs"
    :key="i"
    :id="`box-${i}`"
    class="bg-white shadow max-w-2/4 m-2 border-2 border-white rounded-md p-6"
    :class="active[i] ? 'border-2 border-green-root' : ''"
  >
    <div class="flex justify-between">
      <span class="text-2xl font-medium text-green-root"
        >{{ surah }}:{{ item.numberInSurah }}</span
      >
      <p class="text-2xl text-right pl-8 leading-loose">{{ item.text }}</p>
    </div>
    <div class="flex justify-start mt-12">
      <span class="text-green-root uppercase"
        >INDONESIA - {{ info.translator }}</span
      >
      <!-- bellow in next release -->
      <!-- <span class="mx-2 text-gray-300">|</span>
      <span class="text-orange-300">SEE TAFSIR</span> -->
    </div>
    <div class="mt-3" v-if="keyword">
      <div v-if="!isReadMore[i]">
        <p
          v-html="highlight(item.indonesianTranslation.slice(0, 290), keyword)"
        ></p>
      </div>
      <div v-else>
        <p v-html="highlight(item.indonesianTranslation, keyword)"></p>
      </div>
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
    <div class="mt-3" v-else>
      <p v-if="!isReadMore[i]">
        {{ item.indonesianTranslation.slice(0, 290) }}
        <span v-if="item.indonesianTranslation.length > 289">...</span>
      </p>
      <div v-else>
        <p>{{ item.indonesianTranslation }}</p>
      </div>
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
      <label class="text-sm mr-2 text-gray-700">{{
        elapsedtime[i] === 0 || !elapsedtime[i] ? "00:00" : elapsedtime[i]
      }}</label>
      <input
        min="0"
        type="range"
        v-model="timeframe[i]"
        :max="totaltime[i] === 0 || !totaltime[i] ? 0 : totaltime[i]"
        class="cursor-pointer rounded-md appearance-none overflow-hidden bg-gray-300 h-2 w-full focus:outline-none"
      />
      <div class="ml-2">
        <svg
          @click="playToggle(i)"
          v-if="!active[i]"
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
          v-if="active[i] && !loaded[i]"
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
          @click="pauseToggle(i)"
          v-if="active[i] && loaded[i]"
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
import { highlight } from "@/lib/helper";
import { ref, watch, watchEffect } from "vue";
import Loading from "@/components/layouts/Loading.vue";
import { useMediaPlayer, useMediaPlayerMeta } from "@/hooks/player";

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
    const info = ref(null);
    const surah = ref(1);
    const ayahs = ref(null);
    const loading = ref(false);
    const store = useStore();
    const isReadMore = ref([]);
    const keyword = ref(null);
    const { onPlay, onPause } = useMediaPlayer();

    const {
      active,
      loaded,
      timeframe,
      totaltime,
      elapsedtime,
      playbacktime,
    } = useMediaPlayerMeta();

    watchEffect(async () => {
      loading.value = true;
      surah.value = props.surah;

      try {
        const surahInLocal = JSON.parse(
          window.localStorage.getItem(`surah-${surah.value}`)
        );

        if (!surahInLocal) {
          const response = await http(`/surah/${surah.value}?per_page=286`);
          const result = await response;

          info.value = result.meta;
          ayahs.value = result.data.data;

          window.localStorage.setItem(
            `surah-${surah.value}`,
            JSON.stringify(result)
          );
        } else {
          info.value = surahInLocal.meta;
          ayahs.value = surahInLocal.data.data;
        }

        store.dispatch("setSurah", info.value);
        store.dispatch("setPayload", ayahs.value);
        store.dispatch("setNumberOfSurah", surah.value);
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    });

    const playToggle = (index) => {
      onPlay(index);
    };

    const pauseToggle = (index) => {
      onPause(index);
    };

    watch(
      () => store.getters.query,
      (prev, next) => {
        keyword.value = prev;
      }
    );

    return {
      info,
      ayahs,
      active,
      loaded,
      loading,
      keyword,
      highlight,
      timeframe,
      totaltime,
      isReadMore,
      playToggle,
      pauseToggle,
      elapsedtime,
      playbacktime,
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