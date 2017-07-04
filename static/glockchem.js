// GlockChem JS Library
/*------ BEGIN: AdvNum ------*/
/**
 * AdvNum - 带误差计算的数值类型
 * 注意：
 *   四则运算不能与普通数值型混用。
 *   若要混用，请用new AdvNum(num)来代替原数值！
 * @author DuckSoft
 * @version 0.1
 * @param {any} num 
 * @param {any} uncertain 相对于初始化数值的离散程度，可不填
 */
function AdvNum(num, uncertain) {
	this.set = function (value) {
		this.numInner = this.numMin = this.numMax = value;
		return this;
	}

    this.add = function (operand) {
		this.numInner += operand.numInner;
		this.numMin += operand.numMin;
		this.numMax += operand.numMax;
		return this;
	}

	this.subtract = function (operand) {
		this.numInner -= operand.numInner;
		this.numMin -= operand.numMin;
		this.numMax -= operand.numMax;
		return this;
	}

	this.multiply = function (operand) {
		this.numInner *= operand.numInner;
		this.numMin *= operand.numMin;
		this.numMax *= operand.numMax;
		return this;
	}

	this.divide = function (operand) {
		this.numInner /= operand.numInner;
		this.numMin /= operand.numMax;
		this.numMax /= operand.numMix;
		return this;
	}

    this.getCenterizedNum = function () {
        return (this.numMin + this.numMax) / 2;
    }

    this.centerize = function () {
        this.numInner = this.getCenterizedNum();
    }

    this.getErrorWidth = function () {
        return this.numMax - this.numMin;
    }

	if (num == undefined) {
		this.set(0.0);
	} else {
		this.set(num);
		if (uncertain != undefined) {
			this.numMin -= uncertain;
			this.numMax += uncertain;
		}
	}
}
/*------  END : AdvNum ------*/
// TODO: RMDatabase
// TODO: Formula
// TODO: Equation
// TODO: EquationBalance
// TODO: EquationCalc
