<template>
  <div class="w-full flex flex-col p-4 items-center md:relative">
    <div
      v-for="item in data"
      :key="item.number"
      :class="surah === item.number ? 'border-2 border-green-root' : ''"
      class="cursor-pointer bg-white w-full shadow border-2 border-white m-2 px-3 py-3 rounded-md"
      @click="$emit('set', item.number)"
    >
      <span
        class="w-6 h-6 md:absolute bg-green-root rounded-full text-white text-xs flex items-center justify-center"
        >{{ item.number }}</span
      >
      <div class="flex flex-col ml-10">
        <strong class="text-md"> {{ item.englishName }} </strong>
        <span class="text-xs text-gray-500">{{
          item.englishNameTranslation
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/http";
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";

export default {
  name: "Left",
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
      const response = await http("/surah?per_page=114");
      data.value = response.data.data;
    } catch (e) {
      console.error(e);
    }

    return { data, error, surah };
  },
};
</script>