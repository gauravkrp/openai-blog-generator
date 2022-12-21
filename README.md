# openai blog generator

Automate writing blog posts by [openai's API](https://openai.com/api/)

Get your API keys from the OpenAI dashboard and store as an enviroment variables in a .env file. See the .env.sample file for reference. Only the `OPENAI_API_KEY` is required.

Steps - 
1. Clone this repo
2. Install dependencies by running `npm i` or `yarn`
3. Run the server using `yarn dev`
4. Make a post request to `http://localhost:5005/api/openai/createBlogPost`. You need to provide a body also with the `prompt` string.
````json
{
  "prompt": "Should AI be writing blog articles"
}
````
