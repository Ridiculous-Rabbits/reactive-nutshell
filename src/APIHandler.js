
export default class APIHandler {
    static getData = (section) => {
        return fetch(`http://localhost:5002/${section}`)
            .then(e => e.json())
    }
    static editData = (section, id, body) => {
        return fetch(`http://localhost:5002/${section}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
    static deleteData = (section, id) => {
        return fetch(`http://localhost:5002/${section}/${id}`, {
            method: "DELETE"
        })
    }
    static addData = (section, body) => {
        return fetch(`http://localhost:5002/${section}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(body)
        })
    }
    static archiveTask = id => {
        return fetch(`http://localhost:5002/tasks/${id}`, {
            method: "PATCH",
            data: {
                completed: true
            }
        })
    }
}