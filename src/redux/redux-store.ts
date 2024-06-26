import {Action, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import dialogReducer from "./dialog-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import appReducer from "./app-reducer.ts";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { compose } from "redux";
import { ThunkAction } from "redux-thunk";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>;

export type BaseThunkType<AT extends Action = Action, R = void> = ThunkAction<Promise<R>, AppStateType, unknown, AT>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store;