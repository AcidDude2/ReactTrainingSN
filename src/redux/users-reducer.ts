import { AppStateType, InferActionsType } from './redux-store.ts';
import { usersAPI } from "../api/users-api.ts";
import { updateObjectsInArray } from "../components/utils/objects-helpers/objects-helpers";
import { UserType } from "./types/types.ts";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';


let initailState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
};

export type InitialStateType = typeof initailState;

const usersReducer = (state: InitialStateType = initailState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/users-reducer/FOLLOW_SUCCESS':
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, "id", { followed: true })
            }
        case 'SN/users-reducer/UNFOLLOW_SUCCESS':
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, "id", { followed: false })
            }
        case 'SN/users-reducer/SET_USERS':
            return { ...state, users: action.users }
        case 'SN/users-reducer/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SN/users-reducer/SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.count }
        case 'SN/users-reducer/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'SN/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

export const actions = {
    followSuccess: (userId: number) => ({ type: "SN/users-reducer/FOLLOW_SUCCESS", userId } as const),
    unfollowSuccess: (userId: number) => ({ type: "SN/users-reducer/UNFOLLOW_SUCCESS", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "SN/users-reducer/SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "SN/users-reducer/SET_CURRENT_PAGE", currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "SN/users-reducer/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "SN/users-reducer/TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: "SN/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const)
}

type ActionsType = InferActionsType<typeof actions>
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
};


export default usersReducer;