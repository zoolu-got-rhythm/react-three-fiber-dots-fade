// curry this function
export function getRandomNumberInRangeFunction(min: number, max: number): () => number{
  return () => {
    let step1 = max - min;
    let step2 = Math.random() * step1;
    let result = step2 + min;
    return result;
  }
}