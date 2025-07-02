/// <reference types="vite/client" />

export * from '../lib/ai/gemini';

export interface AIRecipeRequest {
  ingredients: string[];
  preferences?: string;
  onDebug?: (info: any) => void;
}

export interface AIRecipeResponse {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: string;
  cuisine: string;
}

export async function generateAIRecipe({ ingredients, preferences, onDebug }: AIRecipeRequest): Promise<AIRecipeResponse | null> {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing AI API key');
  }

  const prompt = `Create a unique recipe using these ingredients: ${ingredients.join(", ")}. ${preferences ? `Preferences: ${preferences}.` : ''} Return the result as a JSON object with fields: name, description, ingredients (array), instructions (array), cookingTime, servings, difficulty, cuisine.`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (onDebug) onDebug({ data, text });
    if (!text) return null;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) return null;
    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString) as AIRecipeResponse;
  } catch (error) {
    if (onDebug) onDebug({ error });
    console.error('AI API error:', error);
    return null;
  }
} 