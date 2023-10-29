import {Login} from './login/login.component.js';
import {Home} from "./home/home.component.js";
import {Header} from "./header/header.component.js";
import {PostList} from "./post-list/post-list.component.js";
import {PostListItem} from "./post-list-item/post-list-item.component.js";
import {Post} from "./post/post.component.js";

export const initializeComponentFactory = () => {
    customElements.define('app-login', Login);
    customElements.define('app-home', Home);
    customElements.define('app-header', Header);
    customElements.define('app-post-list', PostList);
    customElements.define('app-post-list-item', PostListItem);
    customElements.define('app-post', Post);
};