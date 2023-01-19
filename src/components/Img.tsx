import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import useOpenAI from "../hooks/useOpenAI"
import { useAutoAnimate } from '@formkit/auto-animate/react'


function App() {
    const [autoAnimateRef] = useAutoAnimate<HTMLDivElement>()
    const [autoAnimateRef2] = useAutoAnimate<HTMLDivElement>()
    const [id, setId] = useState(String(new Date().getMilliseconds()))

    const [chat, setChat] = useState<string[]>([])
    const [input, setInput] = useState('')
    const [prompt, setPrompt] = useState('')
    const [response, isLoading, isError] = useOpenAI('image', prompt, prompt !== '', id)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input.trim().length > 0) {
            setPrompt(input)
            if (!chat.some(item => item === input)) setChat(prev => [...prev, input])
        }
        setInput('')
    }
    return (
        <div className="border border-white lg:flex h-full w-full">
            <div ref={autoAnimateRef} className="justify-right aspect-square grid place-items-center bg-slate-800">
                {isLoading && <div className="animate-pulse">loading...</div>}
                {isError && <div className=" bg-red-500  text-4xl font-black">Error</div>}
                {!isError && !isLoading && <img src={response} loading="lazy" />}
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex-1 lg:overflow-y-scroll" ref={autoAnimateRef2}>
                    {chat.map((item) => <div key={item} onClick={() => {
                        setPrompt(item)
                        setId(String(new Date().getMilliseconds()))
                    }} className={`${prompt === item ? 'bg-white text-black font-semibold' : ''} border-b gap-2 border-b-white flex justify-between px-4 hover:text-black hover:bg-white max-h-6 hover:max-h-fit transition-all overflow-hidden items-start`}>
                        <div className="flex-1">{item}</div>
                        <button className="font-black" onClick={(e) => {
                            e.stopPropagation()
                            setInput(item)
                        }}>&#x270E;</button>
                        <button className="text-red-500 font-black" onClick={(e) => {
                            e.stopPropagation()
                            setChat(prev => prev.filter(prev => prev !== item))
                        }}>&#x2326;</button>
                    </div>)}
                </div>
                <form onSubmit={handleSubmit} >
                    <input onChange={handleChange} placeholder="> request anything" className="w-full px-2 outline-none" value={input} />
                </form>
            </div>
        </div>
    )
}

export default App
