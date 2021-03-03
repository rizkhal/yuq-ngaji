<template>
  <div class="p-4">
    <AsyncSurahCard
      v-for="item in data"
      :key="item.number"
      :item="item"
      :surah="surah"
      @click="$emit('set', item.number)"
    />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { getAllSurah } from "@/services/surah";
import { ref, watchEffect, defineAsyncComponent } from "vue";

const AsyncSurahCard = defineAsyncComponent(() =>
  import("./SurahCard.vue" /* webpackChunkName: "surah-card" */)
);

export default {
  name: "MobileLeft",
  components: {
    AsyncSurahCard,
  },
  async setup() {
    const data = ref(null);
    const error = ref(null);
    const surah = ref(null);
    const store = useStore();

    watchEffect(() => {
      const { payload } = store.getters;
      surah.value = payload;
    });

    try {
      const response = await getAllSurah();
      data.value = response.data.data;
    } catch (e) {
      console.error(e);
    }

    return { data, error, surah };
  },
};
</script>