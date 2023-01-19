import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export const text = async (prompt) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.5,
    max_tokens: 2000,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0
  })
  return response.data.choices[0].text
}

export const image = async (prompt) => {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '512x512'
  })
  return response.data.data[0].url
}
