<template>
  <div class="w-full">
    <div>
      <h2 class="text-2xl font-semibold text-gray-700">
        Surah {{ meta.surahNameEnglishName }}
      </h2>
      <p class="text-md text-gray-700">
        Audio By
        <span class="font-semibold">{{ meta.audio }}</span>
      </p>
    </div>
    <Suspense>
      <template #default>
        <AsyncReadComponent />
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
import { useStore } from "vuex";
import { ref, defineAsyncComponent, watchEffect } from "vue";

const AsyncReadComponent = defineAsyncComponent(() =>
  import("../components/Read.vue" /* webpackChunkName: "read" */)
);

export default {
  name: "Surah",
  components: {
    AsyncReadComponent,
  },
  setup() {
    const meta = ref({});
    const store = useStore();

    watchEffect(() => {
      meta.value = store.getters.meta;
    });

    return { meta };
  },
};
</script>