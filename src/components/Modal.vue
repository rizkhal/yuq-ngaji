<template>
  <div
    :class="`modal ${
      !open && 'opacity-0 pointer-events-none'
    } z-50 fixed p-10 w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container bg-white mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div
        v-if="closeBtn"
        @click="modalOpen = false"
        class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
      >
        <svg
          class="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
        <!-- <span class="text-sm">(Esc)</span> -->
      </div>

      <div class="modal-content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
import { useState } from "@/lib/state";

export default {
  name: "Modal",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    closeBtn: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup() {
    const { modalOpen } = useState();

    return { modalOpen };
  },
};
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>