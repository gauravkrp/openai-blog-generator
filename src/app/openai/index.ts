import { openAiInstance } from '@config/openai';

interface IOpenAICreateCompletion {
  prompt: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string[];
  model?: string;
}

class OpenAI {
  public static async listModels() {
    const { data } = await openAiInstance.listModels();
    return data;
  }

  public async complete({
    prompt,
    max_tokens = 2048,
    temperature = 0.8,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0,
    stop,
    model,
  }: IOpenAICreateCompletion) {
    const { data } = await openAiInstance.createCompletion({
      model: model || 'text-davinci-003', //'text-babbage-001' || model, //"text-davinci-002", 'davinci',
      prompt,
      max_tokens,
      temperature,
      top_p,
      frequency_penalty,
      presence_penalty,
      stop,
    });

    return data;
  }

  public async writeArticle({
    prompt,
    max_tokens = 2048,
    temperature = 0.8,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0,
    stop,
    model,
  }: IOpenAICreateCompletion) {
    const { data } = await openAiInstance.createCompletion({
      model: model || 'text-davinci-003', //'text-babbage-001' || model, //"text-davinci-002", 'davinci',
      prompt: `Write a detailed article of 1500 words with excerpt and blog sections on: ${prompt}`,
      max_tokens,
      temperature,
      top_p,
      frequency_penalty,
      presence_penalty,
      stop,
    });

    return data;
  }
}

export default OpenAI;
export const openai = new OpenAI();
