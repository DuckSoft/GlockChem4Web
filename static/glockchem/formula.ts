export enum Formula_Exception {
    /**��ѧʽ�г��ַǷ��ַ�*/
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
            // ��һ��ԭ�� 
			// sm[1]: ԭ������
			// sm[2]: ԭ������(�п���Ϊ�հ�)
            let sm = inFormula.match(/^([A-Z][a-z]*)(\d*)/);

            if (sm != null) {   // ���ɹ���ȡ��ԭ��
                let tempNum: number;

                if (sm[2] == "") {  // ��û���±�
                    tempNum = 1 * numMultiplier;    // Ĭ���±�Ϊ1 
                } else {    // ���±�
                    tempNum = parseInt(sm[2]) * numMultiplier;
                }

                // ���������㷨
                let tempStr: string = sm[1];
                this.insertList(tempStr, tempNum);
            } else if (inFormula.charAt(0) == "*") {
                // ������һ���µ�
                // sm[1]: �γ���
                // sm[2]: ������
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
                } else {// �նεĴ���
                    //TODO: �ն�
                }

            } else if (inFormula.charAt(0) == '(') {
                //TODO: ��ֲ���ŵĴ���
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