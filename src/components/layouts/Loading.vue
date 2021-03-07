<template>
  <div v-if="card" class="flex flex-col w-full p-4 items-center md:relative">
    <div
      v-for="(x, i) in 10"
      :key="i"
      class="bg-white w-full m-2 px-3 py-3 rounded-md"
    >
      <span
        class="skeleton-box float-left inline-block w-6 h-6 md:absolute bg-green-root rounded-full text-white text-xs flex items-center"
      ></span>
      <div class="flex flex-col ml-10">
        <span class="skeleton-box h-5 w-full inline-block rounded-sm"></span>
        <span
          class="mt-2 skeleton-box h-5 w-1/2 inline-block rounded-sm"
        ></span>
      </div>
    </div>
  </div>

  <div v-if="box" class="flex flex-col w-full md:relative">
    <div
      v-for="(item, index) in 10"
      :key="index"
      class="bg-white m-2 rounded-md p-6"
    >
      <div class="flex justify-between">
        <span
          class="skeleton-box inline-block w-6 h-6 md:absolute bg-green-root rounded-full text-white text-xs flex items-center justify-center"
        ></span>
        <span class="skeleton-box h-5 w-1/2 inline-block rounded-sm"></span>
      </div>
      <div class="flex justify-start mt-12">
        <span class="skeleton-box h-5 w-1/2 inline-block rounded-sm"></span>
        <span
          class="skeleton-box h-5 ml-2 w-1/2 inline-block rounded-sm"
        ></span>
      </div>
      <div class="mt-3 flex flex-wrap">
        <span class="skeleton-box h-5 w-full inline-block rounded-sm"></span>
        <span
          class="skeleton-box mt-3 h-5 w-full inline-block rounded-sm"
        ></span>
      </div>
      <div class="flex my-4 flex-wrap space-x-6">
        <span
          v-for="(a, y) in 4"
          :key="y"
          class="skeleton-box inline-block w-6 h-6 md:absolute bg-green-root rounded-full text-white text-xs flex items-center justify-center"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    form: {
      type: Boolean,
      required: false,
    },
    box: {
      type: Boolean,
      required: false,
    },
    card: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
<style lang="css" scoped>
.skeleton-box {
  position: relative;
  overflow: hidden;
  background-color: #e2e8f0;
}

.skeleton-box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 3s infinite;
  content: "";
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>