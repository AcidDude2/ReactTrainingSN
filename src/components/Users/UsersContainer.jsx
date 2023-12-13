import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }

    render() {
        return (
        <>
        {
        this.props.isFetching ? <Preloader /> : <Users
        totalUsersCount={this.props.totalUsersCount}
        onPageChanged={this.onPageChanged}
        currentPage={this.props.currentPage}
        pageSize={this.props.pageSize}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}/>
        }
        </>)
    }
};

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};


export default connect(mapStateToProps, {follow, unfollow, requestUsers})(UsersContainer);