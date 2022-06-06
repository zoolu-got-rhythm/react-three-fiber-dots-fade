import { Console } from "console";
import { useEffect, useRef, useState } from "react";
import { Clock } from "three";

/**
 * @param {THREE.Mesh} meshRef - reference of mesh to fade
 * @param {number} durationInSeconds - fade duration in seconds 
 * @returns startFade function, stopFade function and update function as array
 */
export function useOpacityFade(meshRef: THREE.Mesh, durationInSeconds: number, onOpacityFadeFinished?: () => void): 
    [() => void, () => void, (clock: Clock) => void]{

    // make opacity changeable by setting transparent=true
    useEffect(()=>{
        if(meshRef != null){
            // // @ts-ignore
            // meshRef.material.transparent = true;
            // console.log("USE EFFECT IN OPACITY FACE HOOK CALLED");
            // // @ts-ignore
            // console.log(meshRef.material.transparent);
        }
    }, [meshRef]);

    const [fade, setFade] = useState<boolean>(false);
    const timeOfFadeStart = useRef<null | number>(null);
    const onOpacityFadeCalled = useRef<boolean>(false);


    const startFade = () => {
        onOpacityFadeCalled.current = false;
        setFade(true);
    }

    const stopFade = () => {
        if(meshRef != null){
            // @ts-ignore
            meshRef.material.opacity = 1; 
            timeOfFadeStart.current = null;
            setFade(false);
        }
    }

    function update(clock: Clock){
        if(meshRef == null)
            return;
        // @ts-ignore
        if(meshRef.material.opacity == 0){
            if(onOpacityFadeFinished && !onOpacityFadeCalled.current){
                onOpacityFadeCalled.current = true;
                onOpacityFadeFinished();
            }
            return;
        }
            
        if(fade){
            if(timeOfFadeStart.current == null)
                timeOfFadeStart.current = clock.getElapsedTime();
                
            // @ts-ignore
            meshRef.material.opacity = Math.max(1 - ((clock.getElapsedTime() - timeOfFadeStart.current) / durationInSeconds), 0); 
            // @ts-ignore
            // console.log(meshRef.material.opacity);
        }
    }

    return [startFade, stopFade, update];
}