import { CellType } from "./CellType";

export default class Cell {
  private _rowIndex: number;
  private _colIndex: number;
  cellType: CellType;
  isVisited: Boolean;

  isShortest: Boolean;
  previousCell?: Cell;

  constructor(rowIndex: number, colIndex: number, cellType: CellType) {
    (this._rowIndex = rowIndex), (this._colIndex = colIndex);
    this.cellType = cellType;
    this.isVisited = false;
    this.isShortest = false;
  }

  get rowIndex(): number {
    return this._rowIndex;
  }

  get colIndex(): number {
    return this._colIndex;
  }

  toggleWall = () => {
    if (this.cellType !== CellType.Empty && this.cellType !== CellType.Wall) {
      return;
    }

    this.cellType =
      this.cellType === CellType.Empty ? CellType.Wall : CellType.Empty;
  };
  setCell = (cellType: CellType) => {
    this.cellType = cellType;
  };

  resetCell = () => {
    this.isShortest = false;
    this.isVisited = false;
  };

  setVisitedCell = () => {
    this.isVisited = true;
  };
  setShortestPathCell = () => {
    this.isShortest = true;
  };
}
