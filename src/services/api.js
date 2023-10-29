const BASE_URL = "https://dummyjson.com/";

export const apiClient = () => {
    const post = async (path, data) => {
        return fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    const get = async (path) => {
        return fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return {
        user: {
            login: async (username, password) => {
                const response = await post('auth/login', {username, password})
                return response.json();
            },
            getById: async (id) => {
                const response = await get(`users/${id}`);
                return response.json();
            }
        },
        posts: {
            get: async () => {
                const response = await get(`posts`);
                return response.json();
            }
        }
    }
}