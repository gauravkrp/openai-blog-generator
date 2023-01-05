import { Router } from 'express';

import { wordpress } from '../wordpress';
import OpenAI, { openai } from './index';

const router = Router();

router.get('/models', async (_req, res) => {
  const models = await OpenAI.listModels();
  return res.status(200).send({ data: models });
});

router.post('/createWordpressPost', async (req, res) => {
  const { body } = req;
  const { title, content } = body;
  // reject with 400 if body is not valid or empty
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    return res.status(400).send({ error: 'Bad Request, request body missing!' });
  } else if (!body.title) {
    return res.status(400).send({ error: 'title missing!' });
  } else if (!body.content) {
    return res.status(400).send({ error: 'content missing!' });
  }

  try {
    const { data } = await wordpress.createPost({
      title,
      content,
    });
    console.log({ data });
    return res.status(200).send({ data });
  } catch (error) {
    console.error('Error', error?.response?.data || error?.message || error);
    return res.status(500).send({ error });
  }
});

router.post('/createBlogPost', async (req, res) => {
  const { body } = req;
  const { prompt, model, max_tokens, postToWP = true } = body;
  // reject with 400 if body is not valid or empty
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    return res.status(400).send({ error: 'Bad Request, request body missing!' });
  } else if (!body.prompt) {
    return res.status(400).send({ error: 'prompt missing!' });
  }

  try {
    let wp: unknown;
    const result = await openai.writeArticle({ prompt, model, max_tokens });

    if (postToWP) {
      const { data } = await wordpress.createPost({
        title: prompt,
        content: result.choices[0].text,
      });
      wp = data;
    }

    return res.status(200).send({ result, wp });
  } catch (error) {
    console.error('Error', error?.response?.data || error?.message || error);
    return res.status(500).send({ error });
  }
});

router.post('/generate', async (req, res) => {
  const { body } = req;
  const { prompt, model, max_tokens } = body;
  // reject with 400 if body is not valid or empty
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    return res.status(400).send({ error: 'Bad Request, request body missing!' });
  } else if (!body.prompt) {
    return res.status(400).send({ error: 'prompt missing!' });
  }

  try {
    const result = await openai.complete({ prompt, model, max_tokens });
    return res.status(200).send({ result });
  } catch (error) {
    console.error('Error', error?.response?.data || error?.message || error);
    return res.status(500).send({ error });
  }
});

export default {
  router,
};
