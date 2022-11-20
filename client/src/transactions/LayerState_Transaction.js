import jsTPS_Transaction from "../common/jsTPS";

export default class LayerState_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldState, initNewState) {
        super();
        this.store = initStore;
        this.oldLayerState = initOldState;
        this.newLayerState = initNewState;
    }

    doTransaction() {
        console.log("here")
        this.store.changeLayer(this.newLayerState);
    }

    undoTransaction() {
        this.store.changeLayer(this.oldLayerState);
    }
}