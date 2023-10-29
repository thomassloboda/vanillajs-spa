import {storage} from "./services/storage.js";
import {apiClient} from "./services/api.js";
import {router} from "./services/router.js";
import {initializeStore, store} from "./services/store.js";
import {initializeComponentFactory} from "./components/factory.js";

window.app = {};

app.base = 'http://localhost:8083/';
app.container = null;
app.storage = storage;
app.store = store;
app.api = apiClient();
app.router = router;

initializeComponentFactory();
initializeStore();

window.addEventListener("DOMContentLoaded", () => {
    app.container = document.querySelector("main#root");
    app.router.init();
    if (!app.store.user) {
        app.router.go("/login");
    } else {
        window.addEventListener('appuserchange', (event) => {
            if (!event.detail.user) {
                app.router.go("/login");
            } else {
                app.router.go("/");
            }
        });
    }
});