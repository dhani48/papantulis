export const authorized = (state = false, action) => {
    switch (action.type) {
        case 'AUTHORIZED':
            return true
        case 'NOT_AUTHORIZED':
            return false
        default:
        return state
    }
  }

  export const authDetail = (state=false, action) => {
    switch (action.type) {
        case 'LOGIN_DETAIL':
            return action.data
        default:
        return state
    }
  }