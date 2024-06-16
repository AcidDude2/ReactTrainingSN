import { getAuthUserData } from "./auth-reducer.ts";
import { InferActionsType } from "./redux-store.ts";

let initialState = {
    initialized: false as boolean
};

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/APP-REDUCER/INITIALIZATION_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

const actions = {
    initialisationSuccess: () => ({ type: "SN/APP-REDUCER/INITIALIZATION_SUCCESS" } as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initialisationSuccess())
        })
};

type ActionsType = InferActionsType<typeof actions>;
export type InitialStateType = typeof initialState;

export default appReducer;