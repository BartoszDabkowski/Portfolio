export default class PathFindingData {
  constructor(
    public shortestPathOrder: number[][],
    public traversalOrder: [number, number][][]
  ) {}

  doesShortestPathExist = (): boolean => {
    return this.shortestPathOrder.length !== 0;
  };
}
