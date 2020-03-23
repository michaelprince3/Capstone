const remoteURL = "http://localhost:5002";

export default {

  get(id) {
    return fetch(`${remoteURL}/tasks/${id}`).then(results => results.json())
  }, 

    getWithTasks(stepId) {
        return fetch(`${remoteURL}/steps/${stepId}?_embed=tasks`).then(results => results.json())
    },

    post(newTask) {
        return fetch(`${remoteURL}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newTask)
        }).then(data => data.json());
      },

      delete(id) {
        return fetch(`${remoteURL}/tasks/${id}`, {
          method: "DELETE"
        }).then(result => result.json());
      },

      update(editedTask) {
        return fetch(`${remoteURL}/tasks/${editedTask.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedTask)
        }).then(data => data.json());
      },

      complete(id, isComplete) {
        return fetch(`${remoteURL}/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id, isComplete })
        });
      }
}