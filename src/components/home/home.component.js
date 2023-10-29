import {loadTemplate, loadStyle} from "../../utils/component.utils.js";

export class Home extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});

        Promise.all([
            loadStyle('src/components/home/home.style.css', this.root),
            loadTemplate('src/components/home/home.template.html', this.root)
        ]).then(() => {
            this.render()
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        this.root.querySelector('#username').innerText = app.store.user.firstName;
    }
}