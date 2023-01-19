import { useEffect } from "react"
import openai from "../api/openai"
import { useQuery } from 'react-query'

type UseOpenAI = [
    string,
    boolean,
    boolean,
]

export default (type: 'image' | 'text', prompt: string, enabled: boolean = true, id: string = ''): UseOpenAI => {
    const query = useQuery('openai-' + type + prompt + id, () => openai(type, prompt), { enabled, refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false, refetchInterval: false, retry: false })
    return [query?.data || '', query.isLoading, query.isError]
}