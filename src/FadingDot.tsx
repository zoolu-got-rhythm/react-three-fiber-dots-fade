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

interface FadingDotProps extends MeshProps{
  onDotHasFaded?: () => void;
  dotFadeTimeInSeconds: number;
  color: string;
}

export function FadingDot({dotFadeTimeInSeconds, onDotHasFaded, color, ...props}: FadingDotProps) {

  let innerGeom = getRoundedGeom(1, 1, 0.5);

  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const [startFade, stopFade, opacityFadeUpdateFn] = useOpacityFade(ref.current, dotFadeTimeInSeconds, onOpacityFadeEnded);

  function onOpacityFadeEnded(){
    if(onDotHasFaded)
      onDotHasFaded();
  }

  useEffect(() => {
      startFade();
  }, []);
  
  useFrame((state, delta) => {
      const time = state.clock.getElapsedTime();
      opacityFadeUpdateFn(state.clock);
  });

  return (
    <mesh {...props} ref={ref} geometry={innerGeom}>
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  )
}