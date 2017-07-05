import { Pair } from "./pair";
import { Formula } from "./formula";

export enum Equation_Exception {
    /**欲分析的方程式输入为空*/
    EmptyInputException,
    /**方程式分析了两次*/
    DoubleConstructException,
    /**方程式中出现多于一处的反应物-生成物分隔符*/
    MultiDelimiterException,
    /**方程式的反应物列表或生成物列表为空*/
    EmptySideException,
    /**方程式一侧列表开头遇到空白项*/
    EmptyFirstItemException,
    /**方程式一侧列表内遇到空白项*/
    EmptyInnerItemException
}

export class Equation {
    public reactant: Array<Pair<Formula, number>>;
    public product: Array<Pair<Formula, number>>;

    toString(): string {
        let strTemp: string;

        for (let pair of this.reactant) {
            if (pair.getR() != 1) {
                strTemp += pair.getR();
            }

            strTemp += pair.getL().strRaw;
            strTemp += " + ";
        }

        strTemp = strTemp.substring(0, strTemp.length - 3);
        strTemp += " ---> ";

        for (let pair of this.product) {
            if (pair.getR() != 1) {
                strTemp += pair.getR;
            }
            strTemp += pair.getL().strRaw;
            strTemp += " + ";
        }

        strTemp = strTemp.substring(0, strTemp.length - 3);
        return strTemp;
    }

    /** 以给定的含有有效格式的化学方程式字符串生成一个Equation对象。
	 * 可接受的格式示例如下：
	 *  * 2C + O2 = 2CO
	 *  * 2C + O2 -> 2CO
	 *  * 2C + O2 === 2CO
	 *  * 2C + O2 ==> 2CO
	*/
    constructor(strEquation?: string) {
        if (strEquation == undefined) {
            return this;
        } else if (strEquation.length == 0) {
            throw Equation_Exception.EmptyInputException;
        } else if (this.reactant.length != 0 || this.product.length != 0) {
            throw Equation_Exception.DoubleConstructException;
        } else {
            // 反应物、生成物缓冲区
            let partLeft: string;
            let partRight: string;

            // 分离部分：拆散字符串
            {
                let isRight: boolean = false;   // 是否到了生成物标志 
                let bAuxFlag: boolean = false;  // 辅助标志

                for (let i of strEquation.split("")) {
                    if (i == "=" || i == "-") { // 出现 = 或 - 符号时判定为反应物结束 
                        isRight = true;
                        if (bAuxFlag) { // 若又出现一次分隔符，则判定为错误 
                            throw Equation_Exception.MultiDelimiterException;
                        }
                        continue;
                    } else if (i == " " || i == ">") {  // 忽略掉 ---> 格式中的 > 字符以及空白字符
                        continue;
                    } else {
                        if (isRight) {  // 若已到了生成物部分
                            bAuxFlag = true;    // 设定辅助标志 
                        }
                    }

                    if (isRight) {
                        partRight += i;
                    } else {
                        partLeft += i;
                    }
                }
            }
            // 整合部分：将拆散的字符串插进列表里
            {
                if (partLeft.length == 0 || partRight.length == 0) {
                    throw Equation_Exception.EmptySideException;
                }


                let isStarting: boolean = true; // 标志：是否是化学式的开头
                let strTempA: string;   // 系数存储
                let strTempB: string;   // 化学式存储

                for (let i in partLeft.split("")) {
                    if (isStarting) {
                        if ((0x30 <= i.charCodeAt(0)) && (i.charCodeAt(0) <= 0x39)) {
                            strTempA += i;
                        } else {
                            isStarting = false;

                            if (strTempA.length == 0) {
                                strTempA = "1";
                            }

                            if (i == "+") {
                                throw Equation_Exception.EmptyFirstItemException;
                            }

                            strTempB += i;
                        }
                    } else {
                        if (i == "+") {
                            if (strTempA.length == 0 || strTempB.length == 0) {
                                throw Equation_Exception.EmptyInnerItemException;
                            } else {
                                this.reactant.push(new Pair<Formula, number>(new Formula(strTempB), parseInt(strTempA)));
                                // 初始化状态 
                                strTempA = "";
                                strTempB = "";
                                isStarting = true;
                            }
                        } else {
                            strTempB += i;
                        }
                    }
                }
                // 循环后处理
                if (!(strTempA.length == 0 || strTempB.length == 0)) {
                    this.reactant.push(new Pair<Formula, number>(new Formula(strTempB), parseInt(strTempA)));
                    // 初始化状态 
                    strTempA = "";
                    strTempB = "";
                    isStarting = true;
                }

                // -------------

                isStarting = true; // 标志：是否是化学式的开头
                strTempA = "";   // 系数存储
                strTempB = "";   // 化学式存储

                for (let i in partRight.split("")) {
                    if (isStarting) {
                        if ((0x30 <= i.charCodeAt(0)) && (i.charCodeAt(0) <= 0x39)) {
                            strTempA += i;
                        } else {
                            isStarting = false;

                            if (strTempA.length == 0) {
                                strTempA = "1";
                            }

                            if (i == "+") {
                                throw Equation_Exception.EmptyFirstItemException;
                            }

                            strTempB += i;
                        }
                    } else {
                        if (i == "+") {
                            if (strTempA.length == 0 || strTempB.length == 0) {
                                throw Equation_Exception.EmptyInnerItemException;
                            } else {
                                this.product.push(new Pair<Formula, number>(new Formula(strTempB), parseInt(strTempA)));
                                // 初始化状态 
                                strTempA = "";
                                strTempB = "";
                                isStarting = true;
                            }
                        } else {
                            strTempB += i;
                        }
                    }
                }
                // 循环后处理
                if (!(strTempA.length == 0 || strTempB.length == 0)) {
                    this.product.push(new Pair<Formula, number>(new Formula(strTempB), parseInt(strTempA)));
                    // 初始化状态 
                    strTempA = "";
                    strTempB = "";
                    isStarting = true;
                }
            }
        }
    }
}