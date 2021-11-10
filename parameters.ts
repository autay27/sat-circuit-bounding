import {seq} from "./utils";

type row = {in: number, out: number}
export type table = {rows: row[], ins: number, outs: number}

export class Parameters {

    readonly N: number
    readonly table: table

    constructor(N: number, table: table) {
        this.N=N
        this.table = table
    }

    gates(): number[] {
        return seq(this.table.ins, this.table.ins + this.N)
    }

    sources(): number[] {
        return seq(0, this.table.ins)
    }

    connectibleGates(i: number): number[] {
        return seq(this.table.ins, i)
    }

    connectible(i: number): number[] {
        return seq(0, i)
    }

    sourcesAndGates(): number[] {
        return seq(0, this.table.ins + this.N)
    }

    sinks(): number[] {
        return seq(0, this.table.outs)
    }

    inputVectors(): number[] {
        return seq(0, Math.pow(2, this.table.ins))
    }

}

//I wonder if this can provide the iterable list of gates (indices), etc.