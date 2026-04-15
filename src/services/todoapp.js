class Todo {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://qwertqwert.f5.si/todo";
    }

    async _request(endpoint, method = "GET", body = null) {
        const options = {
            method,
            headers: {
                token: this.apiKey
            }
        };

        if(body) {
            options.headers["Content-Type"] = "application/x-www-form-urlencoded";
            options.body = new URLSearchParams(body);
        }

        const res = await fetch(`${this.baseURL}${endpoint}`, options)
        if(!res.ok) throw new Error("通信エラー");
        return res.json().catch(() => {});
    }

    async getTasks() {
        return this._request("/get_tasks");
    }

    async addTask(content, deadline) {
        return this._request("/add_task", "POST", { content, deadline });
    }

    async controlTask(id, mode) {
        return this._request(`/control_task?id=${id}&mode=${mode}`);
    }
}

export default Todo;