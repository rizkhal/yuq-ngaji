<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex overflow-hidden bg-gray-200 mt-20">
        <Sidebar />

        <Suspense>
          <template #default>
            <div class="pb-96 w-1/4 flex-auto md:overflow-auto hidden lg:block">
              <LeftAsync @set="surah" />
            </div>
          </template>
          <template #fallback>
            <div class="w-1/4 flex-auto md:overflow-auto hidden lg:block">
              <Loading :card="true" />
            </div>
          </template>
        </Suspense>

        <Suspense>
          <template #default>
            <div class="pb-96 w-3/6 flex-auto overflow-auto">
              <div class="p-4">
                <CenterAsync :surah="numberOfSurah" />
              </div>
            </div>
          </template>
          <template #fallback>
            <div class="w-3/6 flex-auto md:overflow-auto">
              <Loading :box="true" />
            </div>
          </template>
        </Suspense>

        <div
          :class="
            isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
          "
          class="lg:hidden block absolute z-0 bottom-0 top-20 left-0 w-full transition duration-300 transform bg-gray-200 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
        >
          <Suspense>
            <template #default>
              <MobileLeftAsync @set="surah" />
            </template>
            <template #fallback>
              <Loading :card="true" />
            </template>
          </Suspense>
        </div>
      </main>

      <button
        class="fixed right-5 bottom-5 bg-gray-900 p-2 rounded-full block lg:hidden"
        @click="isOpen = !isOpen"
      >
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white w-6 h-6 feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white w-6 h-6 feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onErrorCaptured, defineAsyncComponent } from "vue";

import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Loading from "./components/Loading.vue";
import { useState } from "@/lib/state";

const LeftAsync = defineAsyncComponent(() =>
  import("./components/Left.vue" /* webpackChunkName: "surah" */)
);

const CenterAsync = defineAsyncComponent(() =>
  import("./components/Center.vue" /* webpackChunkName: "ayah" */)
);

const MobileLeftAsync = defineAsyncComponent(() =>
  import("./components/MobileLeft.vue" /* webpackChunkName: "surah-mobile" */)
);

export default {
  components: {
    Header,
    Sidebar,
    Loading,
    LeftAsync,
    CenterAsync,
    MobileLeftAsync,
  },
  name: "App",
  setup() {
    const error = ref(1);
    const numberOfSurah = ref(1);
    const { isOpen } = useState();

    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });

    const surah = async (number) => {
      numberOfSurah.value = await number;
      document
        .getElementById("top")
        .scrollIntoView({ behavior: "smooth", block: "center" });

      isOpen.value = false;
    };

    return { error, surah, numberOfSurah, isOpen };
  },
};
</script>
