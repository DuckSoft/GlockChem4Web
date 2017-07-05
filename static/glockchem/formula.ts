export enum Formula_Exception {
    /**化学式中出现非法字符*/
    InvalidCharacterException
}

export class Formula {
    public strRaw: string;
    public mapAtom: Map<string, number>;

    private insertList(strAtom: string, numAtom: number): void {
        if (this.mapAtom.has(strAtom)) {
            this.mapAtom.set(strAtom, this.mapAtom.get(strAtom) + numAtom);
        } else {
            this.mapAtom.set(strAtom, numAtom);
        }
    }

    private parseFormula(inFormula: string, numMultiplier: number): void {
        while (inFormula.length != 0) {
            // 找一坨原子 
			// sm[1]: 原子名称
			// sm[2]: 原子数量(有可能为空白)
            let sm = inFormula.match(/^([A-Z][a-z]*)(\d*)/);

            if (sm != null) {   // 若成功提取出原子
                let tempNum: number;

                if (sm[2] == "") {  // 若没有下标
                    tempNum = 1 * numMultiplier;    // 默认下标为1 
                } else {    // 有下标
                    tempNum = parseInt(sm[2]) * numMultiplier;
                }

                // 交给插入算法
                let tempStr: string = sm[1];
                this.insertList(tempStr, tempNum);
            } else if (inFormula.charAt(0) == "*") {
                // 又来了一段新的
                // sm[1]: 段乘数
                // sm[2]: 段内容
                let sm = inFormula.match(/\*(\d*)([^*]+)[\*]??/);

                if (sm != null) {
                    let tempNum: number;

                    if (sm[1] == "") {
                        tempNum = 1;
                    } else {
                        tempNum = parseInt(sm[1]);
                    }

                    let strTemp: string = sm[2];
                    inFormula = inFormula.substring(sm[0].length);
                    this.parseFormula(strTemp, tempNum);
                } else {// 空段的处理
                    //TODO: 空段
                }

            } else if (inFormula.charAt(0) == '(') {
                //TODO: 移植括号的处理
            } else {
                throw Formula_Exception.InvalidCharacterException;
            }
        }
    }

    constructor(inFormula: string) {
        this.strRaw = inFormula;
        this.parseFormula(inFormula, 1);
    }


}