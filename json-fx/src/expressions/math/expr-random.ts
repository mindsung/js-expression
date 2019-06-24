import { FxExpressionDefinition } from "../../defs";

function randint(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const exprRandom: ReadonlyArray<FxExpressionDefinition> = [
  {
    name: "math~rand",
    expression: (min: number = 0, max: number = 1) => Math.random() * (max - min) + min
  },
  {
    name: "math~randint",
    expression: randint
  },
  {
    name: "math~randselect",
    expression: (arr: any[]) => arr[randint(0, arr.length)]
  }
];