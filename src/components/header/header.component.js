import {loadTemplate, loadStyle} from "../../utils/component.utils.js";

export class Header extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});

        Promise.all([
            loadStyle('src/components/header/header.style.css', this.root),
            loadTemplate('src/components/header/header.template.html', this.root)
        ]).then(() => {
            this.render()
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        this.root.querySelector('#title').addEventListener('click', (event) => {
            app.router.go('/');
        });
        this.root.querySelector('#username').textContent = app.store.user.username;
        this.root.querySelector('#profile-picture').setAttribute('src', app.store.user.image);
        this.root.querySelector('#profile-picture').setAttribute('alt', `${app.store.user.firstName} ${app.store.user.lastName}`);
    }
}