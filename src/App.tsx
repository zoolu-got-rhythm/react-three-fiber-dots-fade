import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Box } from './Box';

// curry
function getRandomNumberInRangeFunction(min: number, max: number) {
  return () => {
    let step1 = max - min;
    let step2 = Math.random() * step1;
    let result = step2 + min;
    return result;
  }
}

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}



function App() {

  console.log("app component render")

  const forceUpdate = useForceUpdate();

  const getRand = getRandomNumberInRangeFunction(-1,1);

  const boxPositions = useRef<any[]>([]);

  const nTimesUseEffectCalledIsCalled = useRef<number>(0);

  useEffect(() => {
    console.log("app use effect called");
    if(nTimesUseEffectCalledIsCalled.current >= 1)
      return;
    nTimesUseEffectCalledIsCalled.current++; 
    window.setInterval(() => {
      boxPositions.current.push({x: getRand(), y: getRand(), z: getRand()});
      console.log(boxPositions.current);
      forceUpdate();
    }, 1000);
  }, []);


  useEffect(() => {
    // window.setTimeout(() => {
    //   console.log("box positions");
    //   console.log(boxPositions);
    // }, 5000);
  }, [boxPositions]);

  return (
    <div className="App">
        <h1> fade dot R3F component </h1>
        <div id="canvas-container">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {boxPositions.current.map(boxPos => <Box position={[boxPos.x, boxPos.y, boxPos.z]} />)}
          </Canvas>
        </div>
    </div>
  );
}

export default App;
