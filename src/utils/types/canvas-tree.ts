import { Tree } from "./tree";

export type CanvasTreeNode = {
  value: number;
  isLeftChild: boolean;
  isRightChild: boolean;
  leftChildIndex: number;
  rightChildIndex: number;
  circleX: number;
  circleY: number;
  lineLeftX?: number;
  lineLeftY?: number;
  lineRightX?: number;
  lineRightY?: number;
  lineUpX?: number;
  lineUpY?: number;
  canvasX1: number;
  canvasX2: number;
};
export class CanvasTree {
  private radius: number = 30;
  private tree: Tree;
  private canvasTree: Array<CanvasTreeNode>;
  private width: number = 1000;
  private height: number = 1000;
  private horizontalOffset = 100;
  private verticalOffset = 20;
  constructor(array: Array<number | null>, radius?: number) {
    this.radius = radius || 30;
    this.tree = new Tree(array);
    this.resetSize();
    this.canvasTree = new Array<CanvasTreeNode>(array.length);
    this.setCordinates();
  }
  //getters
  getRadius() {
    return this.radius;
  }
  getTree() {
    return this.tree;
  }
  getCanvasTree() {
    return this.canvasTree;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getHorizonatlOffset() {
    return this.horizontalOffset;
  }
  getVerticalOffset() {
    return this.verticalOffset;
  }
  //
  resetSize() {
    const minWidth =
      this.tree.getNumberOfMaxNode() * 2 * 2 * this.radius +
      (this.tree.getNumberOfMaxNode() - 1) * this.horizontalOffset;
    const minHeight =
      this.tree.getNumberOfLevel() * 2 * this.radius +
      (this.tree.getNumberOfLevel() - 1) * this.verticalOffset;
    if (minWidth > 0) {
      this.width = minWidth;
    }
    if (minHeight > 0) {
      this.height = minHeight;
    }
  }
  setCordinates() {
    const nodeArray = this.tree.getNodeArray();
    // initialize all elements
    nodeArray.forEach((data, index) => {
      if (data != null && data !== undefined) {
        const value = data.value;
        const isLeftChild = Boolean(data.left);
        const isRightChild = Boolean(data.right);
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        const circleX = this.width / 2;
        const circleY = this.radius;
        this.canvasTree[index] = {
          value,
          isLeftChild,
          isRightChild,
          leftChildIndex,
          rightChildIndex,
          circleX,
          circleY,
          canvasX1: 0,
          canvasX2: this.width,
          lineLeftX: circleX - this.radius,
          lineLeftY: this.radius,
          lineRightX: circleX + this.radius,
          lineRightY: this.radius,
        };
      }
    });
    this.canvasTree.forEach((data, index) => {
      if (data.isLeftChild) {
        const leftChild = this.canvasTree[data.leftChildIndex];
        leftChild.canvasX1 = data.canvasX1;
        leftChild.canvasX2 = data.circleX;
        leftChild.circleX =
          leftChild.canvasX1 + (leftChild.canvasX2 - leftChild.canvasX1) / 2;
        leftChild.circleY =
          data.circleY + 2 * this.radius + this.verticalOffset;
        leftChild.lineLeftX = leftChild.circleX - this.radius;
        leftChild.lineLeftY = leftChild.circleY;
        leftChild.lineRightX = leftChild.circleX + this.radius;
        leftChild.lineRightY = leftChild.circleY;
        leftChild.lineUpX = leftChild.circleX;
        leftChild.lineUpY = leftChild.circleY - this.radius;
      }
      if (data.isRightChild) {
        const rightChild = this.canvasTree[data.rightChildIndex];
        rightChild.canvasX1 = data.circleX;
        rightChild.canvasX2 = data.canvasX2;
        rightChild.circleX =
          rightChild.canvasX1 + (rightChild.canvasX2 - rightChild.canvasX1) / 2;
        rightChild.circleY =
          data.circleY + 2 * this.radius + this.verticalOffset;
        rightChild.lineLeftX = rightChild.circleX - this.radius;
        rightChild.lineLeftY = rightChild.circleY;
        rightChild.lineRightX = rightChild.circleX + this.radius;
        rightChild.lineRightY = rightChild.circleY;
        rightChild.lineUpX = rightChild.circleX;
        rightChild.lineUpY = rightChild.circleY - this.radius;
      }
    });
  }
}
