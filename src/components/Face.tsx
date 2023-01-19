import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import { useFBX } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import AsciiRenderer from './AsciiRenderer'
// @ts-ignore  
import FaceFBX from '../assets/face.fbx'

function FaceMesh(props: ThreeElements['mesh']) {
    const mesh = useRef(null)
    const model = useFBX(FaceFBX)
    const [hovered, setHover] = useState(false)

    return (
        <mesh
            {...props}
            ref={mesh}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <OrbitControls autoRotate={true} />
            <primitive object={model} position={[-2, -2.75, 0]} scale={0.075} />
        </mesh>
    )
}

export default () => {
    return <Canvas className='w-full h-full border' >
        <color attach="background" args={['black']} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <ambientLight intensity={0.01} />
        <AsciiRenderer fgColor="white" bgColor="##24242400" resolution={0.2} />
        <FaceMesh scale={0.9} />
    </Canvas>
}

