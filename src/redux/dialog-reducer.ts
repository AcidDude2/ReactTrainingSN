import { InferActionsType } from "./redux-store";

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
    ] as Array<MessageType>
};

const dialogReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/dialog-reducer/SEND-MESSAGE": {
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

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({type: "SN/dialog-reducer/SEND-MESSAGE", newMessageBody} as const)
}

type DialogType = {
    id: number
    name: string
};

type MessageType = {
    id: number
    message: string
};

type ActionsType = InferActionsType<typeof actions>
export type InitialStateType = typeof initialState;

export default dialogReducer;