<template>
  <div class="w-full flex flex-col p-4 items-center md:relative">
    <div
      v-for="surah in data"
      :key="surah.number"
      class="bg-white w-full m-2 px-3 py-3 rounded-md"
    >
      <span
        class="w-6 h-6 md:absolute bg-green-root rounded-full text-white text-xs flex items-center justify-center"
        >{{ surah.number }}</span
      >
      <div class="flex flex-col ml-10">
        <strong class="text-md"> {{ surah.englishName }} </strong>
        <span class="text-xs text-gray-500">{{
          surah.englishNameTranslation
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/http";
import { ref } from "vue";

export default {
  name: "Left",
  async setup() {
    const error = ref(null);
    const data = ref(null);

    try {
      const response = await http("/surah?per_page=114");
      data.value = response.data.data;
    } catch (e) {
      error.value = e;
    }

    return { data, error };
  },
};
</script>