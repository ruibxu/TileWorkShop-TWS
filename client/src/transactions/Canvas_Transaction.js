import jsTPS_Transaction from "../common/jsTPS";

export default class Canvas_Transcation extends jsTPS_Transaction {
    constructor(undoCallback, redoCallback) {
        super();
        this.undoCallback = undoCallback
        this.redoCallback = redoCallback
        console.log('transaction created')
    }

    doTransaction() {
        console.log('Reached Do Transaction')
        this.redoCallback()
    }

    undoTransaction() {
        console.log('Reached undo Transaction')
        this.undoCallback()
    }
}