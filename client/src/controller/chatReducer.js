const initialState = {
    selectedChat: null
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_CHAT':
            return {
                ...state,
                selectedChat: action.payload
            }
        default:
            return state
    }
}
export default chatReducer;