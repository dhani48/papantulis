export const whichMenu = (state = 0, action) => {
    switch (action.type) {
        case 'SWITCH_MENU':
            return action.menu
        default:
        return state
    }
  }

