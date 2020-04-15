export const create = user => {
  return fetch('/api/users', {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .catch(err => console.log(err))
}

export const list = () => fetch('/api/users', {
    method: 'GET'
  })
  .then(response => response.json())
  .catch(err => console.log(err))

export const read = (params, credentials) => fetch(`/api/users/${params.userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + credentials.t
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err))

export const update = (params, credentials, user) => fetch(`/api/users/${params.userId}`, {
    method: 'PUT', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .catch(err => console.log(err))

export const remove = (params, credentials) => fetch(`/api/users/${params.userId}`, {
    method: 'DELETE', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err))

