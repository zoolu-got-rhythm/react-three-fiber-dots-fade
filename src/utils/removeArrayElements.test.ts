import { removeElementAndGetNewArr, removeElementsAndGetNewArr } from "./removeArrayElement";

test('adds 1 + 2 to equal 3', () => {
    expect(1 +2).toBe(3);
});

test("test removeElementAndGetNewArr basic functionality and edge cases", () => {
    let testData = ["a", "b", "c"];
    expect(removeElementAndGetNewArr(testData, "b")).toEqual(["a", "c"]);
    expect(testData).toEqual(["a", "b", "c"]);

    testData = ["a", "b", "c"];
    expect(removeElementAndGetNewArr(testData, "a")).toEqual(["b", "c"]);

    testData = ["a", "b", "c"];
    expect(removeElementAndGetNewArr(testData, "c")).toEqual(["a", "b"]);

    testData = ["a"];
    expect(removeElementAndGetNewArr(testData, "c")).toEqual(["a"]);

    testData = ["a"];
    expect(removeElementAndGetNewArr(testData, "a")).toEqual([]);
});


test("test removeElementsAndGetNewArr basic functionality and edge cases", () => {
    let testData = ["a", "b", "c"];
    expect(removeElementsAndGetNewArr(testData, ["b"])).toEqual(["a", "c"]);
    expect(testData).toEqual(["a", "b", "c"]);

    testData = ["a", "b", "c"];
    expect(removeElementsAndGetNewArr(testData, ["a", "c"])).toEqual(["b"]);

    testData = ["a"];
    expect(removeElementsAndGetNewArr(testData, ["b", "c"])).toEqual(["a"]);

    testData = ["a"];
    expect(removeElementsAndGetNewArr(testData, ["a"])).toEqual([]);
});




