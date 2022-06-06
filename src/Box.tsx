import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { useOpacityFade } from './hooks/useOpacityFade'

interface Dot extends MeshProps{
  onDotHasFaded?: () => void;
}

export function Box({onDotHasFaded, ...props}: Dot) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const [startFade, stopFade, opacityFadeUpdateFn] = useOpacityFade(ref.current, 0.3, onOpacityFadeEnded);

  function onOpacityFadeEnded(){
    // console.log(console.log("OPACITY FADE ENDED"));
    if(onDotHasFaded)
      onDotHasFaded();
  }

  useEffect(() => {
    // console.log("BOX USE EFFECT CALLED");
    // window.setTimeout(() => {
      startFade();
    // }, 500);
  }, []);
  
  useFrame((state, delta) => {
      const time = state.clock.getElapsedTime();
      opacityFadeUpdateFn(state.clock);
      ref.current.rotation.x += 0.01;
      // console.log("delta", delta);
    
    })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} transparent/>
    </mesh>
  )
}