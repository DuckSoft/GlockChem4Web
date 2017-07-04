// GlockChem JS Library
/*------ BEGIN: AdvNum ------*/
/**
 * AdvNum - �����������ֵ����
 * ע�⣺
 *   �������㲻������ͨ��ֵ�ͻ��á�
 *   ��Ҫ���ã�����new AdvNum(num)������ԭ��ֵ��
 * @author DuckSoft
 * @version 0.1
 * @param {any} num 
 * @param {any} uncertain ����ڳ�ʼ����ֵ����ɢ�̶ȣ��ɲ���
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
