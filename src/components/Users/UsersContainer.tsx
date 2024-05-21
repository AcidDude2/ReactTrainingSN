import React from "react";
import Users from "./Users.tsx";
import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer.ts";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors.ts";
import Preloader from "../common/Preloader/Preloader.jsx";
import { UserType } from "../../redux/types/types.ts";
import { AppStateType } from "../../redux/redux-store.ts";
import { compose } from "redux";


type OwnPropsType = {
    pageTitle: string
}

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    isFetching: boolean
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    onPageChanged={this.onPageChanged}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress} />
            </>)
    }
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        { follow, unfollow, getUsers: requestUsers })
)(UsersContainer);