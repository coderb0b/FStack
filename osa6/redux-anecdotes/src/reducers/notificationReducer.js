const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR':
            return ''
        case 'NOTIFICATION':
            return `${action.data.text}`
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    const timeInSeconds = time * 1000
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: {
                text: content
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, timeInSeconds)
    }
}

export default notificationReducer