import http from "@/api/http";

const getAllSurah = async () => {
  return await http("/surah?per_page=114");
};

export { getAllSurah };
