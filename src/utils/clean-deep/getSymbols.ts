export default function getSymbols(object: any): symbol[] {
  if (!object) {
    return [];
  }
  return Object.getOwnPropertySymbols(Object(object))
    .filter((symbol) => object.propertyIsEnumerable(symbol));
}
