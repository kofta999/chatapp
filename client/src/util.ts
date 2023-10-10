import { useAuthStore } from './store'

export async function sendAuthenticatedRequest(url: string, method: string, data = {}) {
  const token = useAuthStore().token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
  let options
  if (method === 'GET') {
    options = {
      method: method,
      headers: headers
    }
  } else {
    options = {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    }
  }
  const res = await fetch(url, options)
  return res
}
