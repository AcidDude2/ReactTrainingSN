import { getAuthUserData } from "./auth-reducer";

const INITIALIZATION_SUCCESS = "SN/app-reducer/INITIALIZATION_SUCCESS";

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
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

export const initialisationSuccess = () => ({ type: INITIALIZATION_SUCCESS });

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initialisationSuccess())
        });
};


export default appReducer;
