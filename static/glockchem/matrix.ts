/**
 * Matrix - 简单的矩阵实现。
 */
export class Matrix {
    /**矩阵对象*/
    public matrix: Array<Int32Array>;

    /**
     * 构造函数。
     * 构造一个新的矩阵对象。
     * 注意：矩阵的行数和列数必须均为正整数！
     * @param lines 新矩阵的行数。
     * @param cols 新矩阵的列数。
     */
    constructor(lines: number, cols: number) {
        for (let i: number = 0; i < lines; ++i) {
            this.matrix.push(new Int32Array(cols));
        }
    }

    /**
     * 将矩阵转化为可显示的字符串以供显示。
     */
    toString() : string {
        let strTemp: string;
        for (let ln: number = 0; ln < this.matrix.length; ln++) {
            for (let col= 0;col < this.matrix[0].length; col++) {
                strTemp += "[";
                strTemp += this.matrix[ln][col];
                strTemp += "]";
            }
            strTemp += "\n";
        }

        return strTemp;
    }
}