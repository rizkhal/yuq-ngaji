<template>
  <div class="p-4">
    <AsyncSurahCard
      v-for="item in surahs"
      :key="item.number"
      :item="item"
      :surah="surah"
      :id="`surah-${surah}`"
      @click="$emit('set', item.number)"
    />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useSurah } from "@/hooks/quran";
import { ref, watchEffect, defineAsyncComponent } from "vue";

const AsyncSurahCard = defineAsyncComponent(() =>
  import("../layouts/Card.vue" /* webpackChunkName: "surah-card" */)
);

export default {
  name: "Left",
  components: {
    AsyncSurahCard,
  },
  async setup() {
    const surah = ref(null);
    const store = useStore();
    const { surahs } = await useSurah();

    watchEffect(() => {
      const { numberOfSurah } = store.getters;
      surah.value = numberOfSurah;
    });

    return { surah, surahs };
  },
};
</script>