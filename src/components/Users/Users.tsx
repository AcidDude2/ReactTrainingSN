import React, { FC } from "react";
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";
import { UserType } from "../../redux/types/types";


type PropsType = {
    totalUsersCount: number
    currentPage: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let Users: FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {users.map(u => <User user={u} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} key={u.id} />)}
            </div>
        </div>)
};


export default Users;