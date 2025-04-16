import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction, Store, compose, Reducer } from "redux"
import dialogReducer from "./dialog-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import appReducer from "./app-reducer.ts";
import { thunk } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { ThunkAction, ThunkDispatch } from "redux-thunk";


let rootReducer: Reducer<any, UnknownAction> = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<AT extends Action = Action, R = void> = ThunkAction<Promise<R>, AppStateType, unknown, AT>;

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, any>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store<AppStateType> = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// @ts-ignore
window.__store__ = store

export default store;