<template>
  <div class="overflow-auto flex-auto">
    <div class="w-full flex p-4 relative items-center flex-col">
      <div
        v-for="surah in data"
        :key="surah.number"
        class="bg-white w-full m-2 px-3 py-3 rounded-md"
      >
        <span
          class="w-6 h-6 absolute bg-green-root rounded-full text-white text-xs flex items-center justify-center"
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
  </div>
  <div class="mr-3 overflow-auto flex-auto">
    <div class="p-4">
      <div
        v-for="(item, index) in 100"
        :key="index"
        class="bg-white m-2 rounded-md p-6"
      >
        <div class="flex justify-between">
          <span>1:1</span>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div class="flex justify-start mt-12">
          <span class="text-green-root">ENGLISH - SAHIH INTERNATIONAL</span>
          <span class="mx-2 text-gray-300">|</span>
          <span class="text-orange-300">SEE TAFSIR</span>
        </div>
        <p class="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          iste.
        </p>
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
            class="w-4 h-4 text-gray-400 feather feather-heart"
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
            class="w-4 h-4 text-gray-400 feather feather-share-2"
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
            class="w-4 h-4 text-gray-400 feather feather-play-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4 text-gray-400 feather feather-link"
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
    </div>
  </div>
  <div class="w-1/4 mt-4 mr-2 flex-auto">
    <div class="bg-white m-2 rounded-md px-3 py-3">
      <div class="flex mb-6 relative items-center">
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
          class="absolute top-0 feather text-gray-700 feather-book-open"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
        <h1 class="ml-8 text-gray-700">Settings</h1>
      </div>
      <div class="flex flex-col">
        <label class="text-green-root uppercase">language</label>
        <select
          class="appearance-none rounded-sm text-gray-400 bg-white border-2 border-gray-200 h-10 pl-2 rounded-md mt-1 focus:outline-none"
        >
          <option>English</option>
          <option>Indonesia</option>
        </select>
      </div>
      <div class="flex flex-col mt-4">
        <label class="text-green-root uppercase">translation</label>
        <select
          class="appearance-none rounded-sm text-gray-400 bg-white border-2 border-gray-200 h-10 pl-2 rounded-md mt-1 focus:outline-none"
        >
          <option>Quraisihab</option>
          <option>Buya Hamka</option>
        </select>
      </div>
      <div class="flex flex-col mt-4">
        <label class="text-green-root uppercase">script</label>
        <select
          class="appearance-none rounded-sm text-gray-400 bg-white border-2 border-gray-200 h-10 pl-2 rounded-md mt-1 focus:outline-none"
        >
          <option>Uthmani</option>
        </select>
      </div>
      <div class="flex flex-col mt-4">
        <label class="text-green-root uppercase">tafseer</label>
        <select
          class="appearance-none rounded-sm text-gray-400 bg-white border-2 border-gray-200 h-10 pl-2 rounded-md mt-1 focus:outline-none"
        >
          <option>Ibnu Kathir</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/http";
import { ref } from "vue";
export default {
  name: "Playlists",
  async setup() {
    const data = ref(null);

    try {
      const response = await http("/surah?per_page=114");
      data.value = response.data.data;
    } catch (e) {
      console.error(e);
    }

    return { data };
  },
};
</script>