const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFY_VOTE':
        const anecdote = action.data.anecdote.content
            return `You voted '${anecdote}'`
        case 'NOTIFY_CREATE':
            return `${action.data.anecdote} was created`
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export const notificationVote = (anecdote) => {
    return {
        type: 'NOTIFY_VOTE',
        data: {
            anecdote: anecdote
        }
    }
}

export const notificationCreate = (anecdote) => {
    return {
        type: 'NOTIFY_CREATE',
        data: {
            anecdote: anecdote
        }
    }
}

export const clear = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer