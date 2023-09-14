const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

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
    newMessageBody: ''
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
            ...state,
            newMessageBody: action.body
            }
        case SEND_MESSAGE: {
            let body = state.newMessageBody;
           return { 
            ...state,
            newMessageBody: '',
            messages: [...state.messages, { id: 7, message: body }]
           }
        }
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
});

export default dialogReducer;