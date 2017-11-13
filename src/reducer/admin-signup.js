export const validateAdmin = (user) => {
  if(!User)
    throw new Error('Profile Required!')
  let { firstName, lastName, city, state, bio } = profile
  if(!firstName || !lastName)
    throw new Error('__VALIDATION_ERROR__ invalid profile');
}

export default(state=null, { type, payload }) => {
  switch (type) {
    case 'ADMIN_SET':
      validateProfile(payload)
      return payload
    case 'TOKEN_REMOVE':
      return null
    default:
      return state;
  }
}
