import { reactive, toRefs } from "vue";

const state = reactive({
  isOpen: false,
  modalOpen: false,
});

const useState = () => {
  return {
    ...toRefs(state),
  };
};

export { useState };
