export function setToken (state, token) {
  state.token = token
}
export function setEmail (state, email) {
  state.email = email
}
export function setId (state, id) {
  state.id = id
}
export function setCustomer (state, id, token, email) {
  state.id = id
  state.token = token
  state.email = email
}
