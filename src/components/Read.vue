<template>
  <div v-for="item in ayahs" :key="item.number">
    <Audio
      :file="item.audio"
      :player-id="`ayahs-${item.number}`"
    />
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import http from "@/api/http";
import Audio from "@/components/Audio.vue";

export default {
  name: "Read",
  components: {
    Audio,
  },
  async setup() {
    const ayahs = ref(null);
    const router = useRouter();
    const store = useStore();

    const { id } = router.currentRoute.value.params;

    window.scroll({
      top: -20,
      left: 0,
      behavior: "smooth",
    }); // scroll to the top of page

    try {
      const response = await http(`/surah/${id}`);
      store.commit("setMeta", response.meta);
      ayahs.value = response.data.data;
    } catch (e) {
      console.error(e);
    }

    console.log(ayahs);

    return { ayahs };
  },
};
</script>