import { FxTokenNode } from "../../lexer/model/fx-token-node";
import { FxExpression } from "../../runtime/model/fx-expression";
import { FxTokenTag } from "../../lexer/model/fx-token-tag";
import { FxArray } from "../../runtime/model/fx-array";
import { FxDef } from "./model/fx-def";

export class GroupDef extends FxDef {

  public get tag(): FxTokenTag { return "group"; }

  protected optimize(token: FxTokenNode): void {
    if (token.parent && token.count <= 1) {
      token.unwrap();
    }
  }

  protected compile(token: FxTokenNode): FxExpression {
    if (token.parent) {
      return new FxArray(token.children.map(c => c.compile()));
    } else {
      return token.first.compile();
    }
  }
}
