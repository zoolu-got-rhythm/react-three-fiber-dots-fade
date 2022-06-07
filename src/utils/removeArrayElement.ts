// no mutation on original array, is a pure function
export function removeElementByIndexAndGetNewArr(arr: any[], index: number): any[]{
    return arr.slice(0, index).concat(arr.slice(index+1, arr.length));
}

// no mutation on original array, is a pure function
export function removeElementAndGetNewArr(arr: any[], element: any): any[]{
    let index = arr.indexOf(element);
    return removeElementByIndexAndGetNewArr(arr, index);
}

// no mutation on original array, is a pure function
export function removeElementsAndGetNewArr(arr: any[], elements: any[]): any[]{
    let newArr = [...arr];
    [...elements].forEach((ele) => {
        newArr = removeElementAndGetNewArr(newArr, ele);
    });
    return newArr;
}