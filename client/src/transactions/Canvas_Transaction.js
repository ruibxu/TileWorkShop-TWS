import jsTPS_Transaction from "../common/jsTPS";

export default class Canvas_Transcation extends jsTPS_Transaction {
    constructor(undoCallback, redoCallback) {
        super();
        this.undoCallback = undoCallback
        this.redoCallback = redoCallback
        // this.oldState = initOldState;
        // this.newState = initNewState;
        // this.setFunction = setFunction
        console.log('transaction created')
    }

    doTransaction() {
        console.log('Reached Do Transaction')
        this.redoCallback()
        // this.setFunction(this.newState)
    }

    undoTransaction() {
        console.log('Reached undo Transaction')
        this.undoCallback()
        // this.setFunction(this.oldState)
    }
}