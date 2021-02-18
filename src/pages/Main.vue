<template>
  <div class="w-full">
    <h2 class="text-2xl font-semibold text-gray-700">Daftar Surah</h2>
    <Suspense>
      <template #default>
        <AsyncSurahComponent />
      </template>
      <template #fallback>
        <div class="text-center mt-28 min-h-screen">
          <p>Loading...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";

const AsyncSurahComponent = defineAsyncComponent(() =>
  import("../components/Surah.vue" /* webpackChunkName: "surah" */)
);

export default {
  name: "Main",
  components: {
    AsyncSurahComponent,
  },
  setup() {
    //
  },
};
</script>