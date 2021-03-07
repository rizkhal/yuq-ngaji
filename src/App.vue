<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <!-- search modal -->
      <Modal :open="modalOpen" :close-btn="true">
        <template #content>
          <div class="bg-white fixed top-10 inset-x-10 h-5/6 rounded-md">
            <div class="sticky p-2">
              <span class="absolute top-0 inset-y-0 left-6 flex items-center">
                <svg
                  class="h-6 w-6 text-green-root"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>

              <input
                type="text"
                @keydown="typing"
                placeholder="Search here for surah, ayah"
                class="w-full h-20 text-lg pl-14 text-gray-400 focus:border-green-600 focus:outline-none focus:ring"
              />
              <hr />
            </div>
            <div class="px-6 pt-0 w-full overflow-y-auto h-3/4">
              <p
                class="p-4 text-sm text-gray-600 text-center"
                v-if="!loading && !keyword"
              >
                Type for search 👆
              </p>
              <p
                v-if="!loading && keyword && !items"
                class="p-4 text-sm text-gray-600 text-center"
              >
                Hasil tidak ditemukan 🧐
              </p>
              <div
                class="flex flex-col"
                v-if="!loading && items && items.length > 0"
              >
                <p class="text-sm text-gray-500">
                  About {{ count }} results ({{ time }} seconds)
                </p>
                <div
                  v-for="(item, index) in items"
                  :key="index"
                  class="w-full bg-green-shadow p-4 mt-2 rounded-md cursor-pointer"
                  @click="setSurah(item.surah.number)"
                >
                  <p class="text-white font-medium">
                    Surah {{ item.surah.englishName }} ({{
                      item.surah.englishNameTranslation
                    }}) ayah {{ item.number }}
                  </p>
                </div>
              </div>
              <div
                v-if="loading"
                class="mt-20 flex justify-center items-center"
              >
                <svg
                  class="animate-spin h-16 w-16 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </template>
      </Modal>

      <main class="flex overflow-hidden bg-gray-200 mt-20">
        <Sidebar />

        <Suspense v-if="screen >= breakpoints.lg">
          <template #default>
            <div class="pb-96 w-1/4 flex-auto md:overflow-auto hidden lg:block">
              <SurahAsync @set="surah" />
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
                <AyahAsync :surah="numberOfSurah" />
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
          v-if="
            screen <= breakpoints.sm ||
            (screen >= breakpoints.sm && screen < breakpoints.lg)
          "
          :class="
            isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
          "
          class="lg:hidden block absolute z-0 bottom-0 top-20 left-0 w-full transition duration-300 transform bg-gray-200 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
        >
          <Suspense>
            <template #default>
              <SurahAsync @set="surah" />
            </template>
            <template #fallback>
              <Loading :card="true" />
            </template>
          </Suspense>
        </div>
      </main>

      <div
        class="fixed right-5 bottom-5 bg-gray-900 p-2 rounded-full block lg:hidden cursor-pointer"
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
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { useStore } from "vuex";
import { setNull } from "@/lib/helper";
import { useState } from "@/hooks/state";
import { useSearchSurah } from "@/hooks/quran";
import Modal from "@/components/layouts/Modal.vue";
import Header from "./components/layouts/Header.vue";
import Sidebar from "./components/layouts/Sidebar.vue";
import Loading from "./components/layouts/Loading.vue";
import { ref, toRefs, reactive, defineAsyncComponent, onMounted } from "vue";

const SurahAsync = defineAsyncComponent(() =>
  import("./components/quran/Surah.vue" /* webpackChunkName: "surah" */)
);

const AyahAsync = defineAsyncComponent(() =>
  import("./components/quran/Ayah.vue" /* webpackChunkName: "ayah" */)
);

export default {
  components: {
    Modal,
    Header,
    Sidebar,
    Loading,
    SurahAsync,
    AyahAsync,
  },
  name: "App",
  setup() {
    const screen = ref(0);
    const store = useStore();
    const loading = ref(false);
    const keyword = ref(false);
    const numberOfSurah = ref(1);
    const { modalOpen, isOpen } = useState();

    const result = reactive({
      time: 0,
      count: 0,
      items: [],
    });

    const breakpoints = {
      lg: 1024,
      sm: 640,
    };

    onMounted(() => {
      screen.value = window.innerWidth;
    });

    const typing = _.debounce(async (e) => {
      keyword.value = e.target.value;
      loading.value = true;

      try {
        const response = await useSearchSurah(keyword.value);
        if (response) {
          const {
            data: { count, duration, matches },
          } = response.search.value;

          result.count = count;
          result.time = duration;
          result.items = matches;
        } else {
          setNull(result);
        }
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
        store.dispatch("search", keyword.value);
      }
    }, 600);

    const surah = async (number) => {
      numberOfSurah.value = await number;
      const el = document.getElementById("top");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      isOpen.value = false;
    };

    const setSurah = (surah) => {
      const el = document.getElementById(`surah-${surah}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      numberOfSurah.value = surah;
      modalOpen.value = false;
    };

    return {
      surah,
      screen,
      isOpen,
      typing,
      loading,
      keyword,
      setSurah,
      modalOpen,
      breakpoints,
      numberOfSurah,
      ...toRefs(result),
    };
  },
};
</script>
