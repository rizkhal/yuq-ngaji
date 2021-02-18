const http = async (url) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${process.env.VUE_APP_API_URL + url}`, options);
  return await response.json();
};

export default http;
