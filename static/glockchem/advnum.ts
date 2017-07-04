/**
 * AdvNum - 带误差估计的数字类型
 * @author DuckSoft
 * @version 0.1
 */
export class AdvNum {
    numInner: number;
    numMin: number;
    numMax: number;

    add(operand: number | AdvNum): AdvNum {
        if (typeof operand === "number") {
            this.numInner += operand;
            this.numMin += operand;
            this.numMax += operand;
        } else {
            this.numInner += operand.numInner;
            this.numMin += operand.numMin;
            this.numMax += operand.numMax;
        }
        return this;
    }

    subtract(operand: number | AdvNum): AdvNum {
        if (typeof operand === "number") {
            this.numInner -= operand;
            this.numMin -= operand;
            this.numMax -= operand;
        } else {
            this.numInner -= operand.numInner;
            this.numMin -= operand.numMin;
            this.numMax -= operand.numMax;
        }
        return this;
    }

    multiply(operand: number | AdvNum): AdvNum {
        if (typeof operand === "number") {
            this.numInner *= operand;
            this.numMin *= operand;
            this.numMax *= operand;
        } else {
            this.numInner *= operand.numInner;
            this.numMin *= operand.numMin;
            this.numMax *= operand.numMax;
        }
        return this;
    }

    divide(operand: number | AdvNum): AdvNum {
        if (typeof operand === "number") {
            this.numInner /= operand;
            this.numMin /= operand;
            this.numMax /= operand;
        } else {
            this.numInner /= operand.numInner;
            this.numMin /= operand.numMax;
            this.numMax /= operand.numMin;
        }
        return this;
    }

    set(nInner: number, nMin: number, nMax: number): AdvNum {
        this.numInner = nInner;
        this.numMin = nMin;
        this.numMax = nMax;
        return this;
    }

    getCenterizedNum(): number {
        return (this.numMin + this.numMax) / 2;
    }

    centerize(): AdvNum {
        this.numInner = this.getCenterizedNum();
        return this;
    }

    errorize(error: number): AdvNum {
        error = Math.abs(error);
        this.numMin = this.numInner - error;
        this.numMax = this.numInner + error;
        return this;
    }

    getErrorWidth(): number {
        return this.numMax - this.numMin;
    }

    constructor(num?: number) {
        if (num == undefined) {
            this.set(0,0,0);
        } else {
            this.set(num,num,num);
        }
    }
}