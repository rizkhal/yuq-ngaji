<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main
        class="flex overflow-hidden bg-gray-200"
      >
        <LeftBar />
        <Suspense>
          <template #default>
            <Playlists />
          </template>
          <template #fallback> Loading... </template>
        </Suspense>
      </main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layouts/Header.vue";
import LeftBar from "@/components/layouts/LeftBar.vue";
import Playlists from "@/components/layouts/Playlists.vue";

export default {
  components: {
    Header,
    LeftBar,
    Playlists,
  },
  name: "App",
};
</script>
