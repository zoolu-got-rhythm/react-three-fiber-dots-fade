import { Console } from "console";
import { useEffect, useRef, useState } from "react";
import { Clock } from "three";

/**
 * IMPORTANT NOTE: when using this hook with R3F mesh components, transparency prop must = true on material of referenced mesh
 * @param {THREE.Mesh} meshRef - reference of mesh to fade
 * @param {number} durationInSeconds - fade duration in seconds 
 * @param {function} onOpacityFadeFinished - callback that is called when opacity on material of mesh has reached 0 (from 1)
 * @returns startFade function, stopFade function and update function as array
 */ 
export function useOpacityFade(meshRef: THREE.Mesh, durationInSeconds: number, onOpacityFadeFinished?: () => void): 
    [() => void, () => void, (clock: Clock) => void]{

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

    const update = (clock: Clock) => {
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
        }
    }

    return [startFade, stopFade, update];
}