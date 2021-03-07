import { reactive, toRefs } from "vue";
import http from "@/api/http";

const state = reactive({
  surahs: [],
  search: [],
  error: null,
});

const useSurah = async () => {
  try {
    const response = await http("/surah?per_page=114");
    state.surahs = await response.data.data;

    return {
      ...toRefs(state),
    };
  } catch (e) {
    state.error = e;
  }
};

const useSearchSurah = async (keyword) => {
  try {
    const response = await http(`/search?query=${keyword}`);
    state.search = await response;
    return {
      ...toRefs(state),
    };
  } catch (e) {
    state.error = e;
  }
};

export { useSurah, useSearchSurah };
