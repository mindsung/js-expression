import { Expression } from "../core/expression";
import { ArrayExpression } from "../core/array-expression";
import { TransformExpression } from "../core/transform-expression";

export class ArrayAvgExpression<TIn extends Array<TItem>, TItem> extends ArrayExpression<TIn, TItem, number> {
  constructor(input: Expression<TIn>, private params: [ TransformExpression<TItem, number> ]) {
    super(input);
  }

  transform(inputValue: TIn) {
    let count = 0;
    let total = 0;
    inputValue.forEach(item => {
      const val = this.evaluateForItem(item, this.params[0]);
      if (val != null) {
        count++;
        total += val;
      }
    });
    return count > 0 ? total / count : null;
  }
}
