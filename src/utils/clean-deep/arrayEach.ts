export default function arrayEach(array: any, iteratee: (value: any, index: any, object: any) => void): void {
  for (let i = 0; i < array.length; ++i) {
    iteratee(array[i], i, array);
  }
}
