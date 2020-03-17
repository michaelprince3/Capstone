const remoteURL = "http://localhost:5002";

export default {
  getAll() {
    return fetch(`${remoteURL}/projects`).then(results => results.json());
  },

  post(newProject) {
    return fetch(`${remoteURL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProject)
    }).then(data => data.json());
  },

  delete(id) {
    return fetch(`${remoteURL}/projects/${id}`, {
      method: "DELETE"
    }).then(result => result.json());
  },

  update(editedProject) {
    return fetch(`${remoteURL}/projects/${editedProject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedProject)
    }).then(data => data.json());
  }
};
