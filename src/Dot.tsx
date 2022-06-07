import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { useOpacityFade } from './hooks/useOpacityFade'


//Rounded geom
function getRoundedGeom(width: number, height: number, radius: number) {
  let CheckedWidth = width;
  if (width < radius * 2) {
    CheckedWidth = radius * 2;
  }
  let x = 0;
  let y = 0;
  let shape = new THREE.Shape();

  shape.moveTo(x - CheckedWidth / 2, y);
  shape.quadraticCurveTo(
    x - CheckedWidth / 2,
    y + height / 2,
    x - CheckedWidth / 2 + radius,
    y + height / 2
  );
  shape.lineTo(x + CheckedWidth / 2 - radius, y + height / 2);
  shape.quadraticCurveTo(
    x + CheckedWidth / 2,
    y + height / 2,
    x + CheckedWidth / 2,
    y
  );
  shape.quadraticCurveTo(
    x + CheckedWidth / 2,
    y - height / 2,
    x + CheckedWidth / 2 - radius,
    y - height / 2
  );
  shape.lineTo(x - CheckedWidth / 2 + radius, y - height / 2);
  shape.quadraticCurveTo(
    x - CheckedWidth / 2,
    y - height / 2,
    x - CheckedWidth / 2,
    y
  );
  let geometry = new THREE.ShapeBufferGeometry(shape);

  return geometry;
}

interface Dot extends MeshProps{
  onDotHasFaded?: () => void;
  dotFadeTimeInSeconds: number;
  color: string;
}

export function Dot({dotFadeTimeInSeconds, onDotHasFaded, color, ...props}: Dot) {

  let innerGeom = getRoundedGeom(1, 1, 0.5);


  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const [startFade, stopFade, opacityFadeUpdateFn] = useOpacityFade(ref.current, dotFadeTimeInSeconds, onOpacityFadeEnded);

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
      // ref.current.rotation.x += 0.01;
      // console.log("delta", delta);
    
    })

  return (
    // <mesh
    //   {...props}
    //   ref={ref}
    //   scale={clicked ? 1.5 : 1}
    //   onClick={(event) => click(!clicked)}
    //   onPointerOver={(event) => hover(true)}
    //   onPointerOut={(event) => hover(false)}>
    //   <boxGeometry args={[1, 1, 1]} />
    //   <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} transparent/>
    // </mesh>

    <mesh {...props} ref={ref} geometry={innerGeom}>
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  )
}