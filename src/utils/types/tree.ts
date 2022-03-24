export type Node = {
  value: number;
  left?: Node | null;
  right?: Node | null;
};
export class Tree {
  private arr: Array<number | null>;
  private nodeArr: Array<Node | null>;
  private root: Node | null;
  private numOfLevel: number;
  private numOfNodes: number;
  private numOfMaxNodes: number;
  constructor(data: Array<number | null>) {
    this.arr = data;
    this.nodeArr = new Array<Node | null>(data.length);
    this.root = null;
    this.numOfNodes = data.length;
    this.numOfLevel = Math.floor(Math.log2(this.numOfNodes)) + 1;
    this.numOfMaxNodes = Math.pow(2, this.numOfLevel - 1);
    this.createTree();
    this.getCodeIncPlusPlus();
  }
  // getters
  getArray(): Array<number | null> {
    return this.arr;
  }
  getNodeArray() {
    return this.nodeArr;
  }
  getRoot() {
    return this.root;
  }
  getNumberOfLevel() {
    return this.numOfLevel;
  }
  getNumberOfMaxNode() {
    return this.numOfMaxNodes;
  }
  getNumberOfNodes() {
    return this.numOfNodes;
  }
  createTreeUtil(index: number) {
    if (index >= this.arr.length) {
      return null;
    }
    if (this.arr[index] == null) {
      this.nodeArr[index] = null;
      return null;
    } else {
      let node: Node = {
        value: this.arr[index] || 0,
        left: this.createTreeUtil(2 * index + 1),
        right: this.createTreeUtil(2 * index + 2),
      };
      this.nodeArr[index] = node;
      return node;
    }
  }
  createTree() {
    this.root = this.createTreeUtil(0);
  }
  levelOrder(withNull: boolean = true) {
    const queue: Array<{ node: Node | undefined | null; level: number }> = []; // hold node and its level
    const result: Array<Node | null | undefined> = [];
    // for root element
    if (this.root != null) {
      queue.push({ node: this.root, level: 1 });
    }
    // current element is holdling level number and number of nodes that are not null in that level
    const currentLevel: any = { level: 1, num: 0 };
    while (queue.length > 0) {
      const element:
        | { node: Node | undefined | null; level: number }
        | undefined = queue.shift();

      const node: Node | undefined | null = element?.node;
      if (currentLevel.level !== element?.level) {
        // if all elements at last level was null than break the loop otherwise set currentlevel to new latest level
        if (currentLevel.num === 0) {
          break;
        } else {
          currentLevel.level = element?.level;
          currentLevel.num = 0;
        }
      }
      if (withNull) {
        result.push(node);
      } else {
        if (node != null && node !== undefined) {
          result.push(node);
        }
      }
      if (node != null && node !== undefined) {
        currentLevel.num++;
      }

      queue.push({
        node: node?.left,
        level: element?.level ? element.level + 1 : 1,
      });
      queue.push({
        node: node?.right,
        level: element?.level ? element.level + 1 : 1,
      });
    }
    // trim array -> remove all null elements from last of the array
    while (
      result.length > 0 &&
      (result[result.length - 1] == null ||
        result[result.length - 1] === undefined)
    ) {
      result.pop();
    }
  }
  getCodeIncPlusPlusUtil(
    root: Node | null | undefined,
    codeString: string,
    isLeft: boolean,
    isRight: boolean,
    resultArray: Array<string>
  ) {
    let newCodeString = codeString;
    if (root) {
      if (isLeft) {
        newCodeString = codeString + "->left";
      } else if (isRight) {
        newCodeString = codeString + "->right";
      }
      const newResultString = newCodeString + ` = new Node(${root.value}) ; `;
      resultArray.push(newResultString);
      this.getCodeIncPlusPlusUtil(
        root.left,
        newCodeString,
        true,
        false,
        resultArray
      );
      this.getCodeIncPlusPlusUtil(
        root.right,
        newCodeString,
        false,
        true,
        resultArray
      );
    }
  }

  getCodeIncPlusPlus() : Array<string> {
    const temp = this.root;
    const codeString = `Node* root`;
    const resultArray: Array<string> = [];
    this.getCodeIncPlusPlusUtil(
      this.root,
      codeString,
      false,
      false,
      resultArray
    );
    return resultArray;
  }
}
