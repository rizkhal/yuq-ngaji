<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex overflow-hidden bg-gray-200">
        <Sidebar />

        <Suspense>
          <template #default>
            <div class="pb-36 w-1/4 flex-auto md:overflow-auto">
              <LeftAsync @set="surah" />
            </div>
          </template>
          <template #fallback>
            <div class="w-1/4 flex-auto md:overflow-auto">
              <Loading :card="true" />
            </div>
          </template>
        </Suspense>
        <Suspense>
          <template #default>
            <div class="pb-36 w-3/6 flex-auto md:overflow-auto">
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
      </main>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onErrorCaptured, defineAsyncComponent } from "vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Loading from "./components/Loading.vue";

const LeftAsync = defineAsyncComponent(() =>
  import("./components/core/Left.vue" /* webpackChunkName: "surah" */)
);

const CenterAsync = defineAsyncComponent(() =>
  import("./components/core/Center.vue" /* webpackChunkName: "ayah" */)
);

export default {
  components: {
    Header,
    Sidebar,
    Loading,
    LeftAsync,
    CenterAsync,
  },
  name: "App",
  setup() {
    const error = ref(1);
    const numberOfSurah = ref(1);

    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });

    const surah = async (number) => {
      numberOfSurah.value = await number;
    };

    return { error, surah, numberOfSurah };
  },
};
</script>
