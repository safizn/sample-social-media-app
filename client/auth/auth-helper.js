import { signout } from './api-auth.js'

const auth = {
  authenticate(jwt, cb) {
    if(typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  }, 
  isAuthenticated() {
    if(typeof window == "undefined") return false
    if(sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else return false
  }, 
  signout(cb) {
    if(typeof window !== "undefnied")
      sessionStorage.removeItem('jwt')
    cb()
    // optional
    signout()
      .then(data => {
        // remove cookie
        const cookieName = 't'
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      })
  }
}

export default auth