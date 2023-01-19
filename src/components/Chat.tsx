import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import useOpenAI from "../hooks/useOpenAI"
import { useAutoAnimate } from '@formkit/auto-animate/react'

type ChatBubble = {
  content: string,
  error: boolean,
  from: 'me' | 'it',
  id: string
  time: Date
}


function App() {
  const [autoAnimateRef] = useAutoAnimate<HTMLDivElement>()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState('')
  const [prompt, setPrompt] = useState('')
  const [response, isLoading, isError] = useOpenAI('text', prompt, prompt !== '')
  const [chat, setChat] = useState<ChatBubble[]>([])

  const addBubble = (content: string, from: 'me' | 'it', error: boolean = false) => {
    setChat(prev => [...prev, { content, from, error, id: String(Math.random()) + from, time: new Date() }])
  }

  useEffect(() => {
    if (isError || response !== '') addBubble(response, 'it', isError)
  }, [response])

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [chat])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim().length > 0) {
      setPrompt(input)
      addBubble(input, 'me', false)
    }
    setInput('')
  }
  return (
    <div className="border border-white flex flex-col lg:h-full w-full h-[80vh] ">
      <div className="flex-1 overflow-y-scroll flex flex-col p-2" ref={autoAnimateRef}>
        {chat.map(({ content, from, id, time, error }) =>
          <div className="flex flex-col hover:bg-slate-600 p-2" key={id}>
            <div key={id} className={`p-2 border flex flex-col border-white max-w-[80%] w-fit ${from === 'it' ? 'self-start bg-white text-black' : 'self-end'} ${error ? 'bg-red-500 text-black' : ''}`}>{error ? 'ERROR' : content}<br /><small>{time.toLocaleTimeString()}</small></div>
          </div>)
        }
        {isLoading && <div>...</div>}
        <div ref={scrollRef} /></div>
      <div>
        <form onSubmit={handleSubmit} >
          <input onChange={handleChange} placeholder="> ask anything" className="w-full px-2 outline-none" value={input} />
        </form>
      </div>
    </div>
  )
}

export default App
