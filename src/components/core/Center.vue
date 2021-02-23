<template>
  <div
    v-for="(item, index) in 10"
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
    <div class="mt-3">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, iste.
      </p>
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
</template>
<script>
const asyncSetTimeout = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default {
  name: "Center",
  async setup() {
    await asyncSetTimeout(3000);
  },
};
</script>