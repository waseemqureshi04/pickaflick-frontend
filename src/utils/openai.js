import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_URL,
  dangerouslyAllowBrowser: true,
});


export default openai;
