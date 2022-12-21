import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const blogApiHost = process.env.WP_BLOG_URL || 'https://xplorai.com';
const blogApiBaseURL = `${blogApiHost}/wp-json/wp/v2`;

const base64 = (str: string) => Buffer.from(str).toString('base64');
const basicAuth = (username: string, password: string) => base64(`${username}:${password}`);
const basicAuthData = basicAuth(process.env.WP_APP_USER, process.env.WP_APP_PWD);

const COMMON_HEADERS = {
  'Accept': '*',
  'Content-Type': 'application/json',
  'Authorization': `Basic ${basicAuthData}`,
};

export const blogApiInstance = axios.create({
  baseURL: blogApiBaseURL,
  timeout: 15000,
  headers: COMMON_HEADERS,
});

export default class WordpressAPI {
  public async createPost({
    title,
    content,
  }) {
    const path = 'posts';
    return blogApiInstance({
      method: 'POST',
      url: path,
      data: {
        title,
        content,
        status: 'draft',
      },
    });
  }
}

export const wordpress = new WordpressAPI();
