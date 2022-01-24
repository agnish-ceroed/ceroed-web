export function setCookie (name, value, options = {}) {
    const { days, path = '/' } = options
    let expiry = ''
  
    if (days) {
      const date = new Date()
  
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  
      expiry = `; expires=${date.toUTCString()}`
    }
  
    document.cookie = `${name}=${value}${expiry}; path=${path}`
  }
  
  export function getCookie (name) {
    const cookieMatch = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)
  
    return cookieMatch ? cookieMatch.pop() : ''
  }
  
  export function deleteCookie (name) {
    setCookie(name, '', { days: -1 })
  }