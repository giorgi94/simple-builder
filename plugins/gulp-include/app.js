const Vuex = require("lib/vuex.min");


function createStore() {
    return Vuex.Store({
        strict: false,
        state: {
            amount: 7
        }
    });
}