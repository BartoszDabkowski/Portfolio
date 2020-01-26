import { CellType } from './../models/CellType';
import { CellType } from '@/models/CellType';
import Cell from '@/models/Cell';

export interface IBaseCell {
    readonly rowIndex: number;
    readonly colIndex: number;
    readonly cellType: CellType;
    isVisited: Boolean;

    toggleWallType(): void;
    toggleStartType(): void;
    toggleFinishType(): void
    reset(): void;
}

export abstract class BaseCell implements IBaseCell {
    private _rowIndex: number;
    private _colIndex: number;
    private _cellType: CellType;
    isVisited: Boolean;

    constructor(rowIndex: number, colIndex: number) {
        this._rowIndex = rowIndex;
        this._colIndex = colIndex;

        this._cellType = CellType.Empty;
        this.isVisited = false;
    }

    get rowIndex(): number {
        return this._rowIndex;
    }

    get colIndex(): number {
        return this._colIndex;
    }

    get cellType(): CellType {
        return this._cellType;
    }

    toggleWallType = (): void => {
        if (this.cellType !== CellType.Empty && this.cellType !== CellType.Wall) {
            return;
        }

        this._cellType = this.cellType === CellType.Empty ? CellType.Wall : CellType.Empty;
    };

    toggleStartType = (): void => {
        if (this.cellType !== CellType.Empty && this.cellType !== CellType.Start) {
            return;
        }

        this._cellType = this.cellType === CellType.Empty ? CellType.Start : CellType.Empty;
    };

    toggleFinishType = (): void => {
        if (this.cellType !== CellType.Empty && this.cellType !== CellType.Finish) {
            return;
        }

        this._cellType = this.cellType === CellType.Empty ? CellType.Finish : CellType.Empty;
    };

    reset = (): void => {
        this.isVisited = false;
    };
}

export class CalculationCell extends BaseCell {
    previousCell: CalculationCell | null;

    constructor(rowIndex: number, colIndex: number) {
        super(rowIndex, colIndex);
        this.previousCell = null;
    }

    reset = () => {
        this.isVisited = false;
        this.previousCell = null;
    };
}

export class DisplayCell extends BaseCell {
    isShortest: Boolean = false;
    // constructor(rowIndex: number, colIndex: number) {
    //     super(rowIndex, colIndex);   
    // }

    reset = () => {
        this.isVisited = false;
        this.isShortest = false;
    };
}

