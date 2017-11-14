export const validateAdmin = (user) => {
  if(!User)
    throw new Error('User input required')
  let { storeName, password, email, token } = admin
  if(!storeName || !password || !email || !token)
    throw new Error('__VALIDATION_ERROR__ invalid admin');
}

export default(state=null, { type, payload }) => {
  switch (type) {
    case 'ADMIN_SET':
      validateAdmin(payload)
      return payload
    case 'TOKEN_REMOVE':
      return null
    default:
      return state;
  }
}
