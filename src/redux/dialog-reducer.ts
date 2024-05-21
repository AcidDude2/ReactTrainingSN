let SEND_MESSAGE = 'SN/dialog-reducer/SEND-MESSAGE';

type DialogType = {
    id: number
    name: string
};

type MessageType = {
    id: number
    message: string
};

let initialState = {
    dialogs: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Vasya' },
        { id: 3, name: 'Katya' },
        { id: 4, name: 'Serega' },
        { id: 5, name: 'Volodya' },
        { id: 6, name: 'Anya' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi there!'},
        { id: 2, message: 'How is your day?' },
        { id: 3, message: 'Whatever, dude' }
    ] as Array<MessageType>,
};

type InitialStateType = typeof initialState;

const dialogReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
           return { 
            ...state,
            messages: [...state.messages, { id: 4, message: body }]
           }
        }
        default:
            return state;
    }
};

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
};

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});


export default dialogReducer;