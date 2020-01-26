
import { CellType } from '@/models/CellType';
import { BaseCell, CalculationCell, DisplayCell, IBaseCell } from './ICell';

export default class BaseGrid {
  private grid: IBaseCell[][];
  private startCell!: IBaseCell;
  private finishCell!: IBaseCell;
  private _numRows: number;
  private _numCols: number;

  constructor(numRows: number, numCols: number) {
    if (numRows < 1 || numCols < 1) {
      throw `numRows or numCols cannot be less than 1. You set numRows: ${numRows}, numCols ${numCols}`;
    }

    this._numRows = numRows;
    this._numCols = numCols;
    this.grid = [];

    // for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    //   this.grid[rowIndex] = [];
    //   for (let colIndex = 0; colIndex < numCols; colIndex++) {
    //     this.grid[rowIndex][colIndex] = new CalculationCell(
    //       rowIndex,
    //       colIndex,
    //     );
    //   }
    // }

    //this.setStartCell(0, 0);
    //this.setFinishCell(numRows - 1, numCols - 1);
  }

  //   resetCell = () => {
  //     for (let rowIndex = 0; rowIndex < this.numRows; rowIndex++) {
  //       for (let colIndex = 0; colIndex < this.numCols; colIndex++) {
  //         this.grid[rowIndex][colIndex].resetCell();
  //       }
  //     }
  //   };

  setStartCell = (rowIndex: number, colIndex: number) => {
    this.grid[rowIndex][colIndex].toggleStartType();
    this.startCell = this.grid[rowIndex][colIndex];
  };

  //   setFinishCell = (rowIndex: number, colIndex: number) => {
  //     this._setCell(rowIndex, colIndex, CellType.Finish);
  //     this.finishCell = this.grid[rowIndex][colIndex];
  //   };

  //   setVisitedCell = (rowIndex: number, colIndex: number) => {
  //     this.grid[rowIndex][colIndex].setVisitedCell();
  //   };

  //   setShortestPathCell = (rowIndex: number, colIndex: number) => {
  //     this.grid[rowIndex][colIndex].setShortestPathCell();
  //   };

  //   toggleWall = (rowIndex: number, colIndex: number) => {
  //     if (this.grid[rowIndex][colIndex].isVisited) {
  //       return;
  //     }
  //     this.grid[rowIndex][colIndex].toggleWall();
  //   };

  getCell = (rowIndex: number, colIndex: number) => {
    return this.grid[rowIndex][colIndex];
  };

  //   private _setCell = (
  //     rowIndex: number,
  //     colIndex: number,
  //     cellType: CellType
  //   ) => {
  //     if (
  //       rowIndex < 0 ||
  //       rowIndex > this.grid.length - 1 ||
  //       colIndex < 0 ||
  //       colIndex > this.grid[0].length
  //     ) {
  //       throw `rowIndex or colIndex is out of bounds. You set rowIndex: ${rowIndex}, colIndex ${colIndex}`;
  //     }
  //     this.grid[rowIndex][colIndex].setCell(cellType);
  //   };

  //   //TODO: make clone method more efficient;
  //   clone() {
  //     let gridClone = new Grid(this.numRows, this.numCols);

  //     let newGrid: Cell[][];
  //     newGrid = [];

  //     for (let rowIndex = 0; rowIndex < this.numRows; rowIndex++) {
  //       newGrid[rowIndex] = [];
  //       for (let colIndex = 0; colIndex < this.numCols; colIndex++) {
  //         let cell = this.getCell(rowIndex, colIndex);
  //         newGrid[rowIndex][colIndex] = new Cell(
  //           cell.rowIndex,
  //           cell.colIndex,
  //           cell.cellType
  //         );
  //       }
  //     }

  //     gridClone.grid = newGrid;
  //     gridClone.setStartCell(this.startCell.rowIndex, this.startCell.colIndex);
  //     gridClone.setFinishCell(this.finishCell.rowIndex, this.finishCell.colIndex);
  //     return gridClone;
  //   }
}
