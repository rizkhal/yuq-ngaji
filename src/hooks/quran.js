import http from "@/api/http";
import { reactive, toRefs } from "vue";

const state = reactive({
  surahs: [],
  search: [],
  error: null,
});

const useSurah = async () => {
  try {
    const surahInLocal = JSON.parse(window.localStorage.getItem("surah-name"));

    if (!surahInLocal) {
      const response = await http("/surah?per_page=114");
      const results = await response.data.data;

      window.localStorage.setItem("surah-name", JSON.stringify(results));
      state.surahs = results;
    } else {
      state.surahs = surahInLocal;
    }

    return {
      ...toRefs(state),
    };
  } catch (e) {
    state.error = e;
  }
};

const useSearchSurah = async (keyword) => {
  const prefix = "search-";

  try {
    const searched = JSON.parse(window.localStorage.getItem(prefix + keyword));

    if (!searched) {
      const response = await http(`/search?query=${keyword}`);

      state.search = await response;
      window.localStorage.setItem(
        prefix + keyword,
        JSON.stringify(await response)
      );
    } else {
      state.search = searched;
    }

    return {
      ...toRefs(state),
    };
  } catch (e) {
    state.error = e;
  }
};

export { useSurah, useSearchSurah };
