const axios = require("axios");

exports.extractVideoData = async (url) => {
  if (url.includes("instagram.com")) {
    const res = await axios.get(url);
    const html = res.data;

    const image = html.match(/property="og:image" content="(.*?)"/)?.[1];

    return { image };
  }

  return { image: "https://via.placeholder.com/300" };
};