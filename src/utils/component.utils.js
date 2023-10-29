const load = async (path) => {
    const response = await fetch(app.base + path);
    return response.text();
}

export const loadTemplate = async (path, container) => {
    const tmp = document.createElement('template');
    tmp.innerHTML = await load(path);
    container.appendChild(tmp.content);
}

export const loadStyle = async (path, container) => {
    const style = document.createElement('style');
    container.appendChild(style);
    style.innerHTML = await load(path);
}
