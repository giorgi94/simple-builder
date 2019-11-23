/* globals VueRouter */
/* eslint-disable no-unused-vars */

function createRouter() {
    const router = new VueRouter({
        mode: "history",
        routes: [
            {
                path: "/",
                name: "home"
            }
        ]
    });

    return router;
}