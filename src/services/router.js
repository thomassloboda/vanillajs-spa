export const router = {
    init: () => {
        window.addEventListener('popstate', (event) => {
            router.go(event.state.path, false);
        });

        [...document.querySelectorAll('a')]
            .forEach(a => {
                if (a.dataset?.follow) return;
                a.addEventListener('click', (event) => {
                    event.preventDefault();
                    router.go(event.target.getAttribute("href"));
                })
            });

        router.go(window.location.pathname);
    },
    go: (path, addToHistory = true) => {
        if (addToHistory) {
            window.history.pushState({path}, null, path);
        }

        let element = null;
        app.container.textContent = "";
        switch (path) {
            case '/':
                element = document.createElement('app-home');
                break;
            case '/login':
                element = document.createElement('app-login');
                break;
            default:
                if (path.startsWith("/post/")) {
                    element = document.createElement("app-post");
                    element.dataset.id = path.substring(path.lastIndexOf("/") + 1);
                }
                break;
        }
        if (element) {
            app.container.appendChild(element);
        } else {
            app.container.textContent = "404";
        }
        window.scrollY = 0;
        window.scrollX = 0;

        window.dispatchEvent(new CustomEvent('approutechange', {detail: {path}}));
    }
}