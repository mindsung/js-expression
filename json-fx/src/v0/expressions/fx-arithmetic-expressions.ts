import { Expression } from "../core/expression";

export const fxArithmeticExpressions: ReadonlyArray<Expression> = [
  {
    key: "add",
    expression: (a, b) => a + b,
    operator: { key: "+", precedence: 3 }
  },
  {
    key: "sub",
    expression: (a, b) => a - b,
    operator: { key: "-", precedence: 3 }
  },
  {
    key: "mul",
    expression: (a, b) => a * b,
    operator: { key: "*", precedence: 3.1 }
  },
  {
    key: "div",
    expression: (a, b) => a / b,
    operator: { key: "/", precedence: 3.1 }
  }
];