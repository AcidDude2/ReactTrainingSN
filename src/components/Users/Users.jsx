import React from "react";
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";


let Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
            {users.map(u => <User user={u} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} key={u.id} />)}
            </div>
        </div>)
};


export default Users;