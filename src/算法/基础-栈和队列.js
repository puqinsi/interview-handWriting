/* Stack */
export class Stack {
  constructor() {
    this.value = [];
    this.length = this.value.length;
  }

  add(val) {
    this.value.push(val);
  }

  remove() {
    this.value.pop();
  }

  has(val) {
    return this.value.includes(val);
  }
}

// const stack = new Stack();
// stack.add(1);
// stack.add(2);
// stack.remove();
// console.log("stack", stack.value);

/* Queue */
export class Queue {
  constructor() {
    this.value = [];
  }

  add(val) {
    this.value.push(val);
  }

  remove() {
    this.value.shift();
  }

  has(val) {
    return this.value.includes(val);
  }
}

// const queue = new Queue();
// queue.add(1);
// queue.add(2);
// queue.remove();
// console.log("queue", queue.value);
