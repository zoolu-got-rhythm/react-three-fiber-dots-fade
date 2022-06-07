import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Dot } from './Dot';

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

function removeAndGetNewArr(arr: any[], index: number){
  return arr.slice(0, index).concat(arr.slice(index+1, arr.length));
}



function App() {

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
      // boxPositions.current.shift();


      boxPositions.current.push({x: getRand(), y: getRand(), z: getRand()});
      
      console.log("box positions marked for removal");
      console.log(boxPositionsThatNeedRemoving.current);

      // [...boxPositionsThatNeedRemoving.current].forEach((boxPos) => {
      //   const newArr = removeAndGetNewArr(boxPositions.current, boxPositions.current.indexOf(boxPos));
      //   console.log("new arr with removed boxPos");

      //   boxPositionsThatNeedRemoving.current = 
      //     removeAndGetNewArr(boxPositionsThatNeedRemoving.current, boxPositionsThatNeedRemoving.current.indexOf(boxPos));

      //   boxPositions.current = newArr;
      //   console.log("boxPositions new", boxPositions.current);

      //   console.log("box pos's that need removing array")
      //   console.log(boxPositionsThatNeedRemoving.current);

      //   // console.log(boxPositions.current.indexOf(boxPos));
        
      // });


      
      forceUpdate();
    }, 150);
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
            {boxPositions.current.map((boxPos, i) => 
              {
                return <Dot key={i}
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

export default App;
