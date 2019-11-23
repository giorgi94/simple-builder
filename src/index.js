/* globals Vue createStore createRouter */
const App = require("./App");


gulpInclude("../includes/store/index");
gulpInclude("../includes/router/index");


function createApp() {
    const router = createRouter();
    const store = createStore();

    const app = new Vue({
        el: "#app",
        store,
        router,
        render: h => h(App)
    });

    return {
        app,
        router,
        store
    };
}


const { app, router, store } = createApp();

window.app = app;