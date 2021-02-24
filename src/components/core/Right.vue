<template>
  <div class="bg-white m-2 rounded-md p-6">
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
</template>
<script>
const asyncSetTimeout = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default {
  name: "Right",
  async setup() {
    await asyncSetTimeout(1000);
  },
};
</script>