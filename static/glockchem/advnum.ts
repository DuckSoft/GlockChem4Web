/**
 * AdvNum - 带误差估计的数字类型
 * @author DuckSoft
 * @version 0.1
 */
export class AdvNum {
    /**AdvNum的内部数值。*/
    numInner: number;
    /**AdvNum的最小值。*/
    numMin: number;
    /**AdvNum的最大值。*/
    numMax: number;

    /**
     * 将一个AdvNum或数字加到本AdvNum上。
     * @param operand 要加到本AdvNum上的数。
     */
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

    /**
     * 将一个AdvNum或数字从本AdvNum中减去。
     * @param operand 要从本AdvNum中减去的数。
     */
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

   /**
     * 将一个AdvNum或数字与本AdvNum中相乘。
     * @param operand 要与本AdvNum中相乘的数。
     */
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

    /**
     * 将一个AdvNum或数字与本AdvNum中相除。
     * @param operand 本AdvNum要除以的数。
     */
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

    /**
     * 设定本AdvNum的值。
     * @param nInner 要设定的内部数值。
     * @param nMin 要设定的最小值。
     * @param nMax 要设定的最大值。
     */
    set(nInner: number, nMin: number, nMax: number): AdvNum {
        this.numInner = nInner;
        this.numMin = nMin;
        this.numMax = nMax;
        return this;
    }

    /**
     * 获取AdvNum的中心化数（即该数最大值与最小值的平均数）。
	 * 注意该方法仅获取中心化数，并不使得AdvNum中心化。
	 * 若要令某个AdvNum中心化，参见Centerize()方法。
	 */
    getCenterizedNum(): number {
        return (this.numMin + this.numMax) / 2;
    }

    /**
     * 令本AdvNum中心化。
     * 中心化，即令AdvNum的中心数变为该AdvNum的最大值与最小值的平均数。
     * 若仅需获取AdvNum的中心数而不需改变，参见getCenterizedNum()方法。
     */
    centerize(): AdvNum {
        this.numInner = this.getCenterizedNum();
        return this;
    }
    /**
     * 令本AdvNum误差化。
     * 误差化，即以中心数为中心，以某个给定的值为长度，使得AdvNum的最大值和最小值分别为中心数加减该定值。
     * @param error 误差定值。
     */
    errorize(error: number): AdvNum {
        error = Math.abs(error);
        this.numMin = this.numInner - error;
        this.numMax = this.numInner + error;
        return this;
    }
    /**
     * 获取绝对误差界的大小。
     */
    getErrorWidth(): number {
        return this.numMax - this.numMin;
    }
    /**
     * 构造函数。
     * 该构造函数可以构造某一数值的AdvNum。
     * 当参数省略时，该数值默认为0。
     * @param num 要写入AdvNum的数值。
     */
    constructor(num?: number) {
        if (num == undefined) {
            this.set(0,0,0);
        } else {
            this.set(num,num,num);
        }
    }
}