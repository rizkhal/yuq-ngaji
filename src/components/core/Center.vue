<template>
  <div id="top"></div>
  <Loading v-if="!loading" :box="true" />
  <div
    v-else
    v-for="(item, i) in ayahs"
    :key="i"
    :id="`box-${i}`"
    class="bg-white max-w-2/4 m-2 border-2 border-white rounded-md p-6"
    :class="isActive[i] ? 'border-2 border-green-root' : ''"
  >
    <div class="flex justify-between">
      <span>{{ surah }}:{{ item.numberInSurah }}</span>
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
      <p>{{ item.indonesianTranslation.slice(0, 291) }} ...</p>
    </div>
    <hr class="my-4" />
    <div class="flex flex-wrap space-x-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
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
        v-if="!isActive[i]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 text-gray-400 cursor-pointer feather feather-play-circle"
        @click="play(i)"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 text-gray-400 cursor-pointer feather feather-pause-circle"
        @click="pause(i)"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="10" y1="15" x2="10" y2="9"></line>
        <line x1="14" y1="15" x2="14" y2="9"></line>
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
    const meta = ref(null);
    const surah = ref(null);
    const ayahs = ref(null);
    const loading = ref(false);
    const store = useStore();
    const index = ref(0);
    const player = new Audio();
    const isActive = ref([]);
    const timeframe = ref([]);

    watchEffect(async () => {
      const s = props.surah;
      surah.value = s;
      loading.value = false;

      store.commit("setPayload", s);

      try {
        const response = await http(`/surah/${s}?per_page=2000`);
        meta.value = response.meta;
        ayahs.value = response.data.data;

        ayahs.value.forEach((v, k) => {
          timeframe.value[k] = 0;
          isActive.value[k] = false;
        });

        if (player.played) {
          player.pause();
        }

        loading.value = true;
      } catch (e) {
        console.error(e);
      }
    });

    const play = (i) => {
      index.value = i;

      ayahs.value.forEach((v, k) => {
        isActive.value[k] = false;
      });

      const { audio } = ayahs.value[i];
      player.src = audio;

      if (timeframe.value[i] && timeframe.value[i] != 0) {
        player.currentTime = timeframe.value[i];
      }

      player.play();

      isActive.value[i] = true;
      player.addEventListener("ended", ended);
    };

    const pause = (i) => {
      isActive.value[i] = false;
      timeframe.value[i] = player.currentTime;
      player.pause();
    };

    const ended = () => {
      isActive.value[index.value] = false;
      let nextIndex = (index.value += 1);

      const nextPlay = ayahs.value[nextIndex];
      if (nextPlay) {
        document
          .getElementById(`box-${nextIndex}`)
          .scrollIntoView({ behavior: "smooth", block: "center" });
        player.src = nextPlay.audio;
        player.play();
        isActive.value[nextIndex] = true;
      }
    };

    return {
      meta,
      play,
      pause,
      ayahs,
      surah,
      index,
      loading,
      isActive,
    };
  },
};
</script>