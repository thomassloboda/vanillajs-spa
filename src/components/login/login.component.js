import {loadTemplate, loadStyle} from "../../utils/component.utils.js";

export class Login extends HTMLElement {
    #user = {
        username: '',
        password: ''
    };

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});

        Promise.all([
            loadStyle('src/components/login/login.style.css', this.root),
            loadTemplate('src/components/login/login.template.html', this.root)
        ]).then(() => {
            this.render()
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        this.setFormBindings(this.root.querySelector('#login-form'));
    }

    setFormBindings(form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            app.api.user.login(this.#user.username, this.#user.password).then((response) => {
                this.#user.username = "";
                this.#user.password = "";
                app.store.user = response;
            });
        });

        Array.from(form.elements).forEach(element => {
            if (element.name) {
                element.value = this.#user[element.name];
                element.addEventListener("change", event => {
                    this.#user[element.name] = element.value;
                })
            }
        });
        this.#user = new Proxy(this.#user, {
            set(target, property, value) {
                target[property] = value;
                form.elements[property].value = value;
                return true;
            }
        })
    }
}