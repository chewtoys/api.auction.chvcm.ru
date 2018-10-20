import getSymbols from "./getSymbols";

export default function getSymbolsIn(object: any): symbol[] {
  const result: symbol[] = [];
  while (object) {
    result.push(...getSymbols(object));
    object = Object.getPrototypeOf(object);
  }
  return result;
}
