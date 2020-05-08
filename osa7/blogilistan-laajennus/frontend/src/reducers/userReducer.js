const reducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const loginUser = user => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default reducer