import { FxExpressionDefinition } from "../../model/fx-definition";

export const FnLogical: ReadonlyArray<FxExpressionDefinition> = [
  {
    name: "or",
    evaluate: (a, b) => a || b,
    operator: { symbol: "||", precedence: 1 }
  },
  {
    name: "and",
    evaluate: (a, b) => a && b,
    operator: { symbol: "&&", precedence: 1.1 }
  },
  {
    name: "not",
    evaluate: a => !a,
    operator: { symbol: "!", precedence: 1.2, isUnary: true, assoc: "left" }
  },
  {
    name: "notNot",
    evaluate: a => !!a,
    operator: { symbol: "!!", precedence: 1.2, isUnary: true, assoc: "left" }
  },
  {
    name: "funny",
    evaluate: a => {
      return a == 1;
    },
    operator: { symbol: "?", precedence: 0, isUnary: true, assoc: "right" }
  }
];
