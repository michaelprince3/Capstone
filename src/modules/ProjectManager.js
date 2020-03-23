const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/projects/${id}`).then(results => results.json());
  },

  getAll() {
    return fetch(`${remoteURL}/projects`).then(results => results.json());
  },

  getWithSteps(projectId) {
    return fetch(
      `${remoteURL}/projects/${projectId}?_embed=steps`
    ).then(results => results.json());
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
  },

  active(id, isActive) {
    return fetch(`${remoteURL}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, isActive })
    });
  },

  complete(id, isComplete) {
    return fetch(`${remoteURL}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, isComplete })
    });
  }
};
