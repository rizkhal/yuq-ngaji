<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex overflow-hidden bg-gray-200">
        <Sidebar />

        <Suspense>
          <template #default>
            <div class="flex-auto md:overflow-auto">
              <LeftAsync />
            </div>
          </template>
          <template #fallback>
            <div class="flex-auto md:overflow-auto">
              <Loading :card="true" />
            </div>
          </template>
        </Suspense>
        <Suspense>
          <template #default>
            <div class="md:overflow-auto flex-auto">
              <div class="p-4">
                <CenterAsync />
              </div>
            </div>
          </template>
          <template #fallback>
            <div class="w-3/6 flex-auto md:overflow-auto">
              <Loading :box="true" />
            </div>
          </template>
        </Suspense>
        <Suspense>
          <template #default>
            <div class="p-4 flex-auto hidden xl:block">
              <RightAsync />
            </div>
          </template>
          <template #fallback>
            <div class="w-1/3 flex-auto md:overflow-auto">
              <Loading :form="true" />
            </div>
          </template>
        </Suspense>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, onErrorCaptured } from "vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Loading from "./components/Loading.vue";

const LeftAsync = defineAsyncComponent(() =>
  import("./components/core/Left.vue" /* webpackChunkName: "surah" */)
);

const CenterAsync = defineAsyncComponent(() =>
  import("./components/core/Center.vue" /* webpackChunkName: "ayah" */)
);

const RightAsync = defineAsyncComponent(() =>
  import("./components/core/Right.vue" /* webpackChunkName: "setting" */)
);

export default {
  components: {
    Header,
    Sidebar,
    Loading,
    LeftAsync,
    CenterAsync,
    RightAsync,
  },
  name: "App",
  setup() {
    const error = ref(null);

    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });

    return { error };
  },
};
</script>
