import { Dispatch } from "redux";
import { getAuthUserData } from "./auth-reducer.ts";
import { AppStateType } from "./redux-store.ts";
import { ThunkAction } from "redux-thunk";

const INITIALIZATION_SUCCESS = "SN/app-reducer/INITIALIZATION_SUCCESS";

let initialState = {
    initialized: false as boolean
};

type InitialStateType = typeof initialState;

const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

type InitializationSuccessActionCreator = {
    type: typeof INITIALIZATION_SUCCESS
};

export const initialisationSuccess = (): InitializationSuccessActionCreator => ({ type: INITIALIZATION_SUCCESS });

type DispatchType = Dispatch<InitializationSuccessActionCreator>;
type GetStateType = () => AppStateType;
type ThunkType = ThunkAction<void, AppStateType, unknown, InitializationSuccessActionCreator>;

export const initializeApp = (): ThunkType => (dispatch: DispatchType, getState: GetStateType) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initialisationSuccess())
        })
};


export default appReducer;