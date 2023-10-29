const target = {
    local: localStorage,
    session: sessionStorage
};

const handler = {
    set(target, name, value) {
        target.setItem(name, value);
        switch (name) {
            case 'token':
                window.dispatchEvent(new CustomEvent('apptokenchange', {detail: value}));
                break;
            case 'user':
                window.dispatchEvent(new CustomEvent('appuserchange', {detail: value}));
                break;
            default:
                console.log('No event dispatched for', name);
                break;
        }
        return true;
    }
}

export const storage = new Proxy(target, handler);