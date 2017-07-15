export class Pair<L, R> {
    private l: L;
    private r: R;

    constructor(l: L, r: R) {
        this.l = l;
        this.r = r;
    }

    getL(): L {
        return this.l;
    }

    getR(): R {
        return this.r;
    }

    setL(l: L): void {
        this.l = l;
    }

    setR(r: R): void {
        this.r = r;
    }
}