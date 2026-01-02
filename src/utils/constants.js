import customBg from "../assets/my-background.jpg";

export const LOGO =
  "https://github.com/MohammedGhouseuddinQureshi/Logo/blob/main/pickaflick.png?raw=true";

export const USER_AVATAR =
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

export const DEV_AVATAR =
  "https://avatars.githubusercontent.com/u/183459071?v=4"

export const API_BASE_URL = process.env.REACT_APP_API_URL;

export const API_OPTIONS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BG_URL = customBg;

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
  { identifier: "french", name: "French" },
  { identifier: "german", name: "German" },
  { identifier: "japanese", name: "Japanese" },
  { identifier: "chinese", name: "Chinese" },
];