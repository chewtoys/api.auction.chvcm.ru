import getAllKeysIn from "./getAllKeysIn";

export default function baseForOwn(object: any, iteratee: (value: any, key: any, object: any) => void): void {
  const iterable = Object(object);
  for (const key of getAllKeysIn(object)) {
    iteratee(iterable[key], key, iterable);
  }
}
