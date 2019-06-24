import {FxParser} from "./model/fx-parser";
import {FxNode} from "./model/fx-node";

export class NodeParser extends FxParser<FxNode, void> {
  public parsers: FxParser<FxNode, void>[];

  constructor(...parsers: FxParser<FxNode, void>[]) {
    super();
    this.parsers = parsers;
  }

  parse(root: FxNode): void {
    for (const parser of this.parsers) {
      this.parseTree(root, parser);
    }
  }

  private parseTree(root: FxNode, parser: FxParser<FxNode, void>) {
    for (const node of root.children) {
      this.parseTree(node, parser);
    }
    parser.parse(root);
  }
}