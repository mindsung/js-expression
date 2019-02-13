export class PxNode {
    private parent: PxNode;
    private children: Array<PxNode>;

    private tags: Array<string>;

    constructor(public value: string = "", ...tags: string[]) {
        this.parent = null;
        this.children = [];
        this.tags = tags;
    }

    getTags() {
        return this.tags;
    }

    isTagged(...tags: string[]): boolean {
        if (tags.length === 0) {
            return this.tags.length > 0;
        } else {
            for (const tag of tags) {
                if (this.tags.indexOf(tag) === -1) {
                    return false;
                }
            }
            return true;
        }
    }

    isTaggedAny(...tags: string[]): boolean {
        if (tags.length === 0) {
            return this.tags.length > 0;
        } else {
            for (const tag of tags) {
                if (this.tags.indexOf(tag) !== -1) {
                    return true;
                }
            }
            return false;
        }
    }

    removeTags(...tags: string[]): void {
        if (tags.length === 0) {
            this.tags = [];
        } else {
            for (const tag of tags) {
                const i = this.tags.indexOf(tag);
                if (i !== -1) {
                    this.tags.splice(i, 1);
                }
            }
        }
    }

    addTags(...tags: string[]): void {
        for (const tag of tags) {
            if (this.tags.indexOf(tag) === -1) {
                this.tags.push(tag);
            }
        }
    }

    getParent(): PxNode {
        return this.parent;
    }

    setParent(parent: PxNode, unshift: boolean = false): PxNode {
        if (parent !== this.parent) {
            if (this.parent !== null) {
                this.parent.children = this.parent.children.filter(el => el !== this);
            }

            this.parent = parent;

            if (this.parent !== null) {
                if (unshift) {
                    this.parent.children.unshift(this);
                } else {
                    this.parent.children.push(this);
                }
            }
        }
        return parent;
    }

    firstChild(): PxNode {
        return this.children[0] || null;
    }

    lastChild(): PxNode {
        return this.children[this.children.length - 1] || null;
    }

    forEachChild(callback: (index: number, node: PxNode) => void): void {
        for (let i = 0; i < this.children.length; i++) {
            callback(i, this.children[i]);
        }
    }

    addChild(child: PxNode, unshift: boolean = false): PxNode {
        if (child !== null) {
            child.setParent(this, unshift);
        }
        return child;
    }

    insertChild(child: PxNode, target: PxNode, after: boolean = false): PxNode {
        const index = this.children.indexOf(target);
        if (index !== -1) {
            this.children.splice(after ? index + 1 : index, 0, child);
        } else {
            this.addChild(child, !after);
        }
        return child;
    }

    transferChildren(target: PxNode, unshift: boolean = false): PxNode {
        while (this.children.length > 0) {
            if (unshift) {
                target.addChild(this.children[this.children.length - 1], true);
            } else {
                target.addChild(this.children[0]);
            }
        }
        return target;
    }

    orphan(): PxNode {
        this.setParent(null);
        return this;
    }

    unwrap(): PxNode {
        if (this.parent !== null) {
            while (this.children.length > 0) {
                this.parent.insertChild(this.children[0], this);
            }
        }
        return this.orphan();
    }

    public toString(): string {
        return this.value.toString();
    }
}
