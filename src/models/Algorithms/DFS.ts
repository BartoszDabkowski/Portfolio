import Grid from "../Grid";
import Queue from "@datastructures-js/queue";
import Cell from "../Cell";
import { CellType } from "../CellType";
import PathFindingData from "../PathFindingData";

export default class DFS {
  private _rowQueue: Queue;
  private _colQueue: Queue;
  private _returnQueue: Queue;

  private _directionRowVector = [-1, +1, 0, 0];
  private _directionColVector = [0, 0, +1, -1];
  private _moveCount = 0;
  private _cellsLeftInLayer = 1;
  private _cellsInNextLayer = 0;
  private _reachedEnd = false;

  constructor() {
    this._rowQueue = new Queue();
    this._colQueue = new Queue();
    this._returnQueue = new Array();
  }

  getPathFindingData = (grid: Grid): PathFindingData => {
    grid = grid.clone();
    let traversalOrderArr: [number, number][][] = [];
    let cellsInLayerArr: [number, number][][] = [];
    let cellCount = 1;
    let nextCellCount = 0;

    this._rowQueue.enqueue(grid.startCell.rowIndex);
    this._colQueue.enqueue(grid.startCell.colIndex);

    grid.setVisitedCell(grid.startCell.rowIndex, grid.startCell.colIndex);

    while (this._rowQueue.size() > 0) {
      let rowIndex = this._rowQueue.dequeue();
      let colIndex = this._colQueue.dequeue();

      if (grid.getCell(rowIndex, colIndex).cellType === CellType.Finish) {
        this._reachedEnd = true;
        break;
      }

      let visitedCellArr = this._exploreNeighbors(grid, rowIndex, colIndex);

      cellsInLayerArr.push(visitedCellArr);
      this._cellsLeftInLayer--;
      nextCellCount += visitedCellArr.length;
      cellCount--;

      if (cellCount === 0) {
        traversalOrderArr.push(cellsInLayerArr.flat());
        cellsInLayerArr = [];
        cellCount = nextCellCount;
        nextCellCount = 0;
      }

      if (this._cellsLeftInLayer === 0) {
        this._cellsLeftInLayer = this._cellsInNextLayer;
        this._cellsInNextLayer = 0;
        this._moveCount++;
      }
    }
    if (this._reachedEnd) {
      let shortestPath = grid.getCell(
        grid.finishCell.rowIndex,
        grid.finishCell.colIndex
      ).previousCell;

      let shortestArray = [];
      while (shortestPath != null) {
        shortestArray.push([shortestPath.rowIndex, shortestPath.colIndex]);
        shortestPath = shortestPath.previousCell;
      }

      shortestArray = shortestArray.reverse();
      return new PathFindingData(shortestArray, traversalOrderArr);
    }

    return new PathFindingData([], traversalOrderArr);
  };

  private _exploreNeighbors = (
    grid: Grid,
    rowIndex: number,
    colIndex: number
  ): [number, number][] => {
    let visitedCellArr: [number, number][] = [];

    for (let i = 0; i < 4; i++) {
      let nextRowIndex = rowIndex + this._directionRowVector[i];
      let nextColIndex = colIndex + this._directionColVector[i];

      // Skip Cell if out of bounds
      if (
        nextRowIndex < 0 ||
        nextRowIndex >= grid.numRows ||
        nextColIndex < 0 ||
        nextColIndex >= grid.numCols
      ) {
        continue;
      }

      // Ship Cell if Wall or Visited
      let currCell = grid.getCell(nextRowIndex, nextColIndex);
      if (currCell.cellType === CellType.Wall || currCell.isVisited) {
        continue;
      }

      // Assign Prev
      grid.grid[nextRowIndex][nextColIndex].previousCell =
        grid.grid[rowIndex][colIndex];

      this._rowQueue.enqueue(nextRowIndex);
      this._colQueue.enqueue(nextColIndex);
      grid.setVisitedCell(nextRowIndex, nextColIndex);

      visitedCellArr.push([nextRowIndex, nextColIndex]);

      this._cellsInNextLayer++;
    }

    return visitedCellArr;
  };
}
