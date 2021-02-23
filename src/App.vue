<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main
        class="flex overflow-hidden bg-gray-200"
      >
        <Sidebar />

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
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Playlists from "@/components/Playlists.vue";

export default {
  components: {
    Header,
    Sidebar,
    Playlists,
  },
  name: "App",
};
</script>
