<template>
  <div v-if="!data.value.length" class="text-center mt-28 min-h-screen">
    <p>Result is empty.</p>
  </div>
  <div
    v-for="item in data.value"
    :key="item.number"
    class="p-6 mx-auto mt-4 bg-white rounded-md shadow-md"
  >
    <div class="flex justify-between items-center">
      <div class="flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-12 w-12 text-green-500 feather feather-book-open"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      </div>
      <div class="text-right">
        <div
          :class="item.number == 1 ? 'font-semibold' : ''"
          class="text-xl font-medium text-gray-800"
        >
          {{ item.name }}
        </div>
        <p class="text-gray-500 mt-2">
          {{ item.englishNameTranslation }} ({{ item.englishName }})
        </p>
      </div>
    </div>
  </div>

  <div v-if="!keyword" class="flex justify-center flex-wrap">
    <button
      :disabled="page === 1 ? true : false"
      :class="page === 1 ? 'cursor-not-allowed opacity-25' : ''"
      class="focus:outline-none text-sm mt-4 px-4 py-2 mr-2 bg-green-400 text-white rounded-md"
      @click="prevPage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="inline w-4 h-4 feather feather-chevron-left"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      Back
    </button>
    <button
      :disabled="perPage < lastPage || lastPage < 1 ? true : false"
      :class="
        perPage < lastPage || lastPage < 1
          ? 'cursor-not-allowed opacity-25'
          : ''
      "
      class="focus:outline-none text-sm mt-4 px-4 py-2 mr-2 bg-green-400 text-white rounded-md"
      @click="nextPage"
    >
      Next
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="inline w-4 h-4 feather feather-chevron-right"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>
<script>
import http from "@/api/http";
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
  name: "Surah",
  async setup() {
    const store = useStore();

    let tmp = [];
    const page = ref(1);
    const data = ref(null);
    const perPage = ref(10);
    const lastPage = ref(1);
    const keyword = ref(null);

    try {
      const response = await http(`/surah?per_page=114`);
      tmp = await response.data.data;
    } catch (e) {
      console.error(e);
    }

    data.value = computed(() => {
      let start = (page.value - 1) * perPage.value;
      let end = start + perPage.value;

      if (keyword.value) {
        return tmp.filter((item) => {
          return keyword.value
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.englishName.toLowerCase().includes(v) ||
                item.englishNameTranslation.toLowerCase().includes(v)
            );
        });
      } else {
        return tmp.slice(start, end);
      }
    });

    watchEffect(() => {
      keyword.value = store.state.search.keyword;
    });

    const calculateLastPage = () => {
      lastPage.value = data.value.value.length / perPage.value;
    };

    const nextPage = () => {
      page.value++;
      calculateLastPage();
    };

    const prevPage = () => {
      page.value--;
      calculateLastPage();
    };

    return {
      data,
      page,
      perPage,
      nextPage,
      prevPage,
      lastPage,
      keyword,
    };
  },
};
</script>