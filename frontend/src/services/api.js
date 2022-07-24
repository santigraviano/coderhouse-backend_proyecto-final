
class API {
  constructor(host) {
    this.host = host
    this.token = null
    this.headers = {
      'Content-Type': 'application/json'
    }
  }

  setToken(token) {
    this.token = token
    this.headers['Authorization'] = `Bearer ${token}`
  }

  get(url) {
    return fetch(`${this.host}${url}`, { headers: this.headers })
  }

  post(url, body) {
    return fetch(`${this.host}${url}`, { method: 'post', headers: this.headers, body: JSON.stringify(body) })
  }

  put(url, body) {
    return fetch(`${this.host}${url}`, { method: 'put', headers: this.headers, body: JSON.stringify(body) })
  }

  delete(url, body) {
    return fetch(`${this.host}${url}`, { method: 'delete', headers: this.headers, body: JSON.stringify(body) })
  }
}

export default new API('http://localhost:8080/api')