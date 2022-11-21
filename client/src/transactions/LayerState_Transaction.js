import jsTPS_Transaction from "../common/jsTPS";

export default class LayerState_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldState, initNewState, func) {
        super();
        this.store = initStore;
        this.oldLayerState = initOldState;
        this.newLayerState = initNewState;
        this.func = func 
    }

    doTransaction() {
        this.store.changeLayer(this.newLayerState);
    }

    undoTransaction() {
        this.store.changeLayer(this.oldLayerState);
    }
}