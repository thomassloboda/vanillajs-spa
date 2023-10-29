const target = {
    user: null,
    posts: [],
    users: {}
};

const handler = {
    set(target, name, value) {

        switch (name) {
            case 'user':
                target[name] = value;
                app.storage.session.setItem(name, JSON.stringify(value));
                window.dispatchEvent(new CustomEvent('appuserchange', {detail: {user: value}}));
                break;
            case 'users':
                target[name][value.id] = {value};
                window.dispatchEvent(new CustomEvent('appuserschange', {detail: {user: value}}));
                break;
            case 'posts':
                target[name] = value;
                window.dispatchEvent(new CustomEvent('apppostschange', {detail: {posts: value}}));
                break;
            default:
                target[name] = value;
                console.log('No event dispatched for', name);
                break;
        }
        return true;
    }
};

export const initializeStore = () => {
    const user = app.storage.session.getItem('user');
    if (user) {
        target.user = JSON.parse(user);
    }
};

export const store = new Proxy(target, handler);