import {loadTemplate, loadStyle} from "../../utils/component.utils.js";

export class Post extends HTMLElement {
    #post;
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});

        Promise.all([
            loadStyle('src/components/post/post.style.css', this.root),
            loadTemplate('src/components/post/post.template.html', this.root)
        ]).then(() => {
            this.#post = app.store.posts.find((post) => post.id == this.dataset.id);
            this.render()
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        this.root.querySelector('#post-title').innerText = this.#post.title;
        this.root.querySelector('#post-body').innerText = this.#post.body;
        this.root.querySelector('#post-tags').textContent = this.#post.tags.join(', ');
        const user = app.store.users[this.#post.userId];
        if (user !== undefined) {
            this.root.querySelector('#post-author').textContent = `${user.firstName} ${user.lastName}`;
        } else {
            app.api.user.getById(this.#post.userId).then((user) => {
                this.root.querySelector('#post-author').textContent = `${user.firstName} ${user.lastName}`;
                app.store.users[user.id] = user;
            });
        }
    }
}