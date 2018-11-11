import { Issues } from '../IssuesCollection/IssuesCollection';

class ManoaFixItClass {
  constructor() {
    this.collections = [
        Issues,
    ];
  }
}

export const ManoaFixIt = new ManoaFixItClass();
