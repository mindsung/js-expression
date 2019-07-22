import { FxTokenNode } from "./model/fx-token-node";
import { IteratorParser } from "./iterator-parser";
import { Loader } from "./loader";

export class ExpressionParser extends IteratorParser {

  private loader: Loader;

  private parent: FxTokenNode;
  private current: FxTokenNode;
  private next: FxTokenNode;

  constructor(loader: Loader) {
    super();
    this.loader = loader;
  }

  protected before(parent: FxTokenNode): void {
    this.parent = parent;
  }

  protected parseItem(current: FxTokenNode, next: FxTokenNode): void {
    this.current = current;
    this.next = next;

    if (this.isCall()) {
      this.convertToCall();
    } else if (this.isIndexer()) {
      this.convertToIndexer();
    }
  }

  private isCall(): boolean {
    return this.next && this.next.tag == "group"
      && (this.current.tag == "identifier" || this.current.tag == "template");
  }

  private convertToCall(): void {
    let args: FxTokenNode;

    if (this.current.tag == "identifier") {
      this.current.tag = "expression";
      args = this.current;
    } else if (this.current.tag == "template") {
      this.current.tag = "template-call";
      args = this.loader.createToken("args");
      this.current.unshift(args);
    }

    while (this.next.first) {
      args.add(this.next.first);
    }

    this.next.orphan();
  }

  private isIndexer(): boolean {
    return this.next && this.next.tag == "array"
      && (this.current.tag == "variable"
        || this.current.tag == "expression"
        || this.current.tag == "array"
        || this.current.tag == "object");
  }

  private convertToIndexer(): void {
    const indexer = this.loader.createToken("indexer");
    this.current.wrap(indexer);
    indexer.add(this.next);
  }
}
