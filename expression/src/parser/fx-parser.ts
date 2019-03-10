import {FxModule} from "../modules/fx-module";
import {OldExpression} from "../core/expression";

export abstract class FxParser<TIn, TOut = void> {
  constructor(public module: FxModule) {
  }

  abstract evaluate(item: TIn): TOut;
}

export abstract class FxCompiler<TIn> extends FxParser<TIn, OldExpression<any>> {
}
