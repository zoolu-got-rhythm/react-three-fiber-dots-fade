import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { FadingDot } from './FadingDot';
import { removeElementsAndGetNewArr } from './utils/removeArrayElement';
import { useForceUpdate } from './hooks/useForceUpdate';

// curry this function
function getRandomNumberInRangeFunction(min: number, max: number) {
  return () => {
    let step1 = max - min;
    let step2 = Math.random() * step1;
    let result = step2 + min;
    return result;
  }
}

function DemoApp() {
  console.log("app component render");

  const forceUpdate = useForceUpdate();

  const getRand = getRandomNumberInRangeFunction(-1,1);

  let boxPositions = useRef<any[]>([]);
  let boxPositionsThatNeedRemoving = useRef<number[]>([]);

  const nTimesUseEffectCalledIsCalled = useRef<number>(0);

  useEffect(() => {
    console.log("app use effect called");
    if(nTimesUseEffectCalledIsCalled.current >= 1)
      return;

    nTimesUseEffectCalledIsCalled.current++; 

    window.setInterval(() => {
      if(boxPositionsThatNeedRemoving.current.length > 1){
        boxPositions.current = removeElementsAndGetNewArr(boxPositions.current, boxPositionsThatNeedRemoving.current);
        boxPositionsThatNeedRemoving.current = [];
      }
     
      boxPositions.current.push({x: getRand(), y: getRand(), z: getRand()});
      
      forceUpdate();
    }, 150);
  }, []);


  return (
    <div className="App">
        <h1> fade dot R3F component </h1>
        <div id="canvas-container">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {boxPositions.current.map((boxPos, i) => 
              {
                return <FadingDot key={JSON.stringify(boxPos)} // can i make this key even more unique?
                          scale={0.5}
                          color={"#0aff89"}
                          position={[boxPos.x, boxPos.y, boxPos.z]} 
                          dotFadeTimeInSeconds={2}
                          onDotHasFaded={() => {
                            console.log(`dot ${i} has faded`);
                            boxPositionsThatNeedRemoving.current.push(boxPos);
                          }}/>
              })}
          </Canvas>
        </div>
    </div>
  );
}

export default DemoApp;
