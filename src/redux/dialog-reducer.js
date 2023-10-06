const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Vasya' },
        { id: 3, name: 'Katya' },
        { id: 4, name: 'Serega' },
        { id: 5, name: 'Volodya' },
        { id: 6, name: 'Anya' }
    ],
    messages: [
        { id: 1, message: 'Hi there!' },
        { id: 2, message: 'How is your day?' },
        { id: 3, message: 'Whatever, dude' },
        { id: 4, message: 'Hi there!' },
        { id: 5, message: 'How is your day?' },
        { id: 6, message: 'Whatever, dude' }
    ],
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
           return { 
            ...state,
            messages: [...state.messages, { id: 7, message: body }]
           }
        }
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});


export default dialogReducer;