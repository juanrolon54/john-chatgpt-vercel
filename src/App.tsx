import { Chat, Img, Face, Contact, Instructions } from './components'

export default () => {
    return <div className="p-4 lg:p-8 gap-4 h-screen grid grid-cols-1 lg:grid-rows-2  lg:grid-cols-2">
        <div className='relative w-full h-[80vh] lg:h-full lg:col-start-2 lg:row-start-1 lg:row-end-3'>
            <Face />
            <Contact />
            <div className='absolute bottom-24 lg:bottom-32 left-0 w-full grid place-items-center -z-50'><br /><br /><span className='p-2 text-4xl border-2 border-black font-black bg-white text-black z-50 select-none'>Chat GPT</span></div>
            <Instructions />
        </div >
        <Img />
        <Chat />
    </div>
}