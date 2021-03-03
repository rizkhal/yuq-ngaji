<template>
  <div class="w-full flex flex-col items-center md:relative">
    <div
      :key="item.number"
      :class="surah === item.number ? 'border-2 border-green-root' : ''"
      class="cursor-pointer bg-white w-full shadow border-2 border-white m-2 px-3 py-3 rounded-md"
    >
      <span
        class="w-6 h-6 md:absolute bg-green-root rounded-full text-white text-xs flex items-center justify-center"
        >{{ item.number }}</span
      >
      <div class="flex flex-col ml-10">
        <strong class="text-md"> {{ item.englishName }} </strong>
        <span class="text-xs text-gray-500">{{
          item.englishNameTranslation
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SurahCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
    surah: {
      type: Number,
      required: true,
    },
  },
};
</script>