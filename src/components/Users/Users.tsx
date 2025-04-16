import React, { FC, useEffect } from "react";
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator.tsx";
import { FilterType, requestUsers } from "../../redux/users-reducer";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm.tsx";
import { useSelector, useDispatch } from "react-redux";
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsers, getFollowingInProgress, getUsersFilter } from "../../redux/users-selectors";
import { AppDispatchType } from "../../redux/redux-store.ts";
import { UserType } from "../../types/types.ts";


type PropsType = {};

export const Users: FC<PropsType> = () => {

    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector(getUsersFilter);
    
    const dispatch: AppDispatchType = useDispatch();

    useEffect(() => {
        requestUsers(currentPage, pageSize, filter);
    }), [];

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize,filter))
    };

    const follow = (userId: number) => {
        dispatch(follow(userId));
    };

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    };

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {users.map((u: UserType) => <User user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} key={u.id} />)}
            </div>
        </div>)
};