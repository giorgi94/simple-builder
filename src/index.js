
const Vue = require("lib/vue.min");
const App = require("./App");



function createApp() {
    // const router = createRouter();
    // const store = createStore();

    const app = new Vue({
        el: "#app",
        // store,
        // router,
        render: h => h(App)
    });

    return {
        app,
        // router,
        // store
    };
}


const { app } = createApp();

console.log(app);