import { reactive, toRefs } from "vue";

const state = reactive({
  isOpen: false,
});

const useState = () => {
  return {
    ...toRefs(state),
  };
};

export { useState };
