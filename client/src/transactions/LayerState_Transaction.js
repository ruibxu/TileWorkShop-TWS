import jsTPS_Transaction from "../common/jsTPS";

export default class LayerState_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldState, initNewState, redoCallback, undoCallback) {
        super();
        this.store = initStore;
        this.oldLayerState = initOldState;
        this.newLayerState = initNewState;
        this.redoCallback = redoCallback; 
        this.undoCallback = undoCallback;
    }

    doTransaction() {
        this.store.changeLayer(this.newLayerState);
        console.log(!(!(()=>{})))
        if(this.redoCallback){
            this.redoCallback()
        }
    }

    undoTransaction() {
        this.store.changeLayer(this.oldLayerState);
        if(this.undoCallback){
            this.undoCallback()
        }
    }
}