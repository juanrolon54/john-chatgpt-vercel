
import { useEffect, useMemo, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { AsciiEffect } from 'three-stdlib'

export default function ({
    renderIndex = 1,
    bgColor = 'black',
    fgColor = 'white',
    characters = ' .:-+*=%@#',
    invert = true,
    color = false,
    resolution = 0.15
}) {
    const { size, gl, scene, camera } = useThree()

    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, { invert, color, resolution })
        effect.domElement.style.position = 'absolute'
        effect.domElement.style.top = '0px'
        effect.domElement.style.left = '0px'
        effect.domElement.style.pointerEvents = 'none'
        return effect
    }, [characters, invert, color, resolution])

    useLayoutEffect(() => {
        effect.domElement.style.color = fgColor
        effect.domElement.style.backgroundColor = bgColor
    }, [fgColor, bgColor])

    useEffect(() => {
        gl.domElement.style.opacity = '0'
        //@ts-ignore
        gl.domElement.parentNode.appendChild(effect.domElement)
        return () => {
            gl.domElement.style.opacity = '1'
            //@ts-ignore
            gl.domElement.parentNode.removeChild(effect.domElement)
        }
    }, [effect])

    useEffect(() => {
        effect.setSize(size.width, size.height)
    }, [effect, size])

    useFrame((state) => {
        effect.render(scene, camera)
    }, renderIndex)

    // This component returns nothing, it is a purely logical
    return <></>
}