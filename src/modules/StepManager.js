const remoteURL = "http://localhost:5002";

export default {

  get(id) {
    return fetch(`${remoteURL}/steps/${id}`).then(results => results.json())
  }, 

    getWithTasks(stepId) {
        return fetch(`${remoteURL}/steps/${stepId}?_embed=tasks`).then(results => results.json())
    },

    post(newStep) {
        return fetch(`${remoteURL}/steps`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newStep)
        }).then(data => data.json());
      },

      delete(id) {
        return fetch(`${remoteURL}/steps/${id}`, {
          method: "DELETE"
        }).then(result => result.json());
      },

      update(editedStep) {
        return fetch(`${remoteURL}/steps/${editedStep.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedStep)
        }).then(data => data.json());
      }
}