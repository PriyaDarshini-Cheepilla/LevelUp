// src/openai.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getCareerAdvice(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",  // free & fast
    messages: [
      { role: "system", content: "You are a career guidance expert helping students plan their growth." },
      { role: "user", content: prompt }
    ]
  });
  return response.choices[0].message.content;
}
