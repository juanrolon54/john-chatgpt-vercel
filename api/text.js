import { text } from './openai.js'

export default async (req, res) => {
  try {
    const { prompt } = req.body
    const response = await text(prompt)
    res.status(200).json({ response })
  } catch (e) {
    res.status(400).json(e)
  }
}
