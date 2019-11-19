const notificationReducer = (state = 'testi', action) => {
    switch (action.type) {
        case 'NOTIFY_VOTE':
        const anecdote = action.data.anecdote.content
            return `You voted '${anecdote}'`
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

export default notificationReducer