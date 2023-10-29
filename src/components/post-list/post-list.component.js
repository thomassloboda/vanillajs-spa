import {loadTemplate, loadStyle} from "../../utils/component.utils.js";

export class PostList extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});

        Promise.all([
            loadStyle('src/components/post-list/post-list.style.css', this.root),
            loadTemplate('src/components/post-list/post-list.template.html', this.root)
        ]).then(() => {
            this.render()
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        app.api.posts.get().then((response) => {
            if (response?.posts) {
                app.store.posts = [...app.store.posts, ...response.posts];
                this.root.querySelector('#post-list').innerHTML = response.posts.map((post) => {
                    return `<app-post-list-item data-id=${post.id}></app-post-list-item>`;
                }).join('');
            }
        });
    }
}