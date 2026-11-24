const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')
const TOKEN_KEY = 'cribsy_access_token'

export const getToken = () => sessionStorage.getItem(TOKEN_KEY)
export const setToken = token => sessionStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY)

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json')

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (response.status === 204) return null
  const type = response.headers.get('content-type') || ''
  const data = type.includes('application/json') ? await response.json() : await response.text()
  if (!response.ok) {
    const error = new Error(
      typeof data === 'object' ? data.message || data.error || 'Request failed' : data
    )
    error.status = response.status
    error.data = data
    throw error
  }
  return data
}

export const post = data => ({ method: 'POST', body: JSON.stringify(data) })
export const patch = data => ({ method: 'PATCH', body: JSON.stringify(data) })
export const put = data => ({ method: 'PUT', body: JSON.stringify(data) })

export const authAPI = {
  register: data => apiRequest('/api/auth/register', post(data)),
  login: data => apiRequest('/api/auth/login', post(data)),
  verify: data => apiRequest('/api/auth/verify', post(data)),
  forgotPassword: data => apiRequest('/api/auth/forgot-password', post(data)),
  resetPassword: data => apiRequest('/api/auth/reset-password', post(data)),
  me: () => apiRequest('/api/auth/me'),
  updateMe: data => apiRequest('/api/auth/me', patch(data)),
}

export const uploadAPI = {
  image: file => {
    const form = new FormData()
    form.append('file', file)
    return apiRequest('/api/uploads/image', { method: 'POST', body: form })
  },
}

export const applicationAPI = {
  submit: (propertyId, data) => apiRequest(`/api/properties/${propertyId}/applications`, post(data)),
  mine: () => apiRequest('/api/tenant/applications'),
  landlordList: status => apiRequest('/api/landlord/applications' + (status ? `?status=${encodeURIComponent(status)}` : '')),
  review: (id, status) => apiRequest(`/api/landlord/applications/${id}`, patch({ status })),
  assign: (id, data) => apiRequest(`/api/landlord/applications/${id}/assign`, post(data)),
}

export const unitAPI = {
  list: propertyId => apiRequest(`/api/landlord/properties/${propertyId}/units`),
  create: (propertyId, data) => apiRequest(`/api/landlord/properties/${propertyId}/units`, post(data)),
}

export const propertyAPI = {
  list: params => apiRequest('/api/properties' + (params ? '?' + new URLSearchParams(params) : '')),
  get: id => apiRequest(`/api/properties/${id}`),
}

export const tenantAPI = {
  dashboard: () => apiRequest('/api/tenant/dashboard'),
  tenancy: () => apiRequest('/api/tenant/tenancy'),
  payments: () => apiRequest('/api/tenant/payments'),
  payment: id => apiRequest(`/api/tenant/payments/${id}`),
  maintenance: () => apiRequest('/api/tenant/maintenance'),
  createMaintenance: data => apiRequest('/api/tenant/maintenance', post(data)),
}

export const landlordAPI = {
  dashboard: () => apiRequest('/api/landlord/dashboard'),
  properties: () => apiRequest('/api/landlord/properties'),
  property: id => apiRequest(`/api/landlord/properties/${id}`),
  createProperty: data => apiRequest('/api/landlord/properties', post(data)),
  updateProperty: (id, data) => apiRequest(`/api/landlord/properties/${id}`, put(data)),
  deleteProperty: id => apiRequest(`/api/landlord/properties/${id}`, { method: 'DELETE' }),
  tenants: () => apiRequest('/api/landlord/tenants'),
  createTenancy: data => apiRequest('/api/landlord/tenancies', post(data)),
  maintenance: () => apiRequest('/api/landlord/maintenance'),
  updateMaintenance: (id, status) => apiRequest(`/api/landlord/maintenance/${id}`, patch({ status })),
  payments: () => apiRequest('/api/landlord/payments'),
}

export const adminAPI = {
  stats: () => apiRequest('/api/admin/stats'),
  users: () => apiRequest('/api/admin/users'),
  updateUserStatus: (id, status) => apiRequest(`/api/admin/users/${id}/status`, patch({ status })),
  properties: () => apiRequest('/api/admin/properties'),
  updatePropertyApproval: (id, approval_status) =>
    apiRequest(`/api/admin/properties/${id}/approval`, patch({ approval_status })),
}
