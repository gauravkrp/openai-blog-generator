import * as dotenv from 'dotenv';
import * as openAi from 'openai';

dotenv.config();

const { Configuration, OpenAIApi } = openAi;

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

export const openAiInstance = new OpenAIApi(configuration);
