import axios from "axios"

export type TextResponse = {
    response: string,
    error: boolean
}

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

const openAI = async (type: 'image' | 'text', prompt: string) => {
    const response = await API.post('/' + type, { prompt })
    return response.data.response
}
export const openAICurry = (type: 'image' | 'text', prompt: string) => async () => openAI(type, prompt)
export default openAI