export const signin = user => fetch('/auth/signin/', { 
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include', 
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .catch(err => console.log(err))


export const signout = user => fetch('/auth/signout/', { 
    method: 'GET', 
  })
  .then(response => response.json())
  .catch(err => console.log(err))


  
  