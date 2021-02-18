<template>
  <div class="flex h-screen bg-gray-200">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="mx-auto px-6 py-8">
          <router-view />
        </div>
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  name: "App",
};
</script>
