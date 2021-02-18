<template>
  <div class="relative mx-4 lg:mx-0">
    <!-- search icon -->
    <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
      <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <!-- search input -->
    <input
      type="text"
      @input="onTyping"
      placeholder="Search"
      class="form-input w-full sm:w-full xl:w-full rounded-md pl-10 px-4 focus:border-green-600 focus:outline-none focus:ring"
    />
  </div>
</template>
<script>
import { useStore } from "vuex";

export default {
  name: "Search",
  setup() {
    const store = useStore();

    const onTyping = (e) => {
      store.commit("search", e.target.value);
    };

    return { onTyping };
  },
};
</script>