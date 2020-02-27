import {EventEmitter} from "events";

class appStore extends EventEmitter {
    constructor() {
        super()
        this.appStore = {
            board: [0,0,0,0,0,0,0,0,0],
            player: 1,
            score: [0,0],
            reset: false,
            winner: 0
        }
    }

    getAll() {
        return this.appStore;
    }

    reset() {
        this.appStore.board = [0,0,0,0,0,0,0,0,0];
        this.appStore.player = 1;
        this.appStore.rese = false;

        this.emit("change");
    }
}

const store = new appStore();

export default store;