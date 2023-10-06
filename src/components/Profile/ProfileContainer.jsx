import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { useParams } from 'react-router-dom';
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { withRouter } from "../../hoc/withRouter";


function ProfileContainer(props) {

  let { userId } = useParams();
  
  if(!userId) {
    userId = props.authorizedUserId
  }

  useEffect(() => {props.getUserProfile(userId)}, [userId],);
  useEffect(() => {props.getStatus(userId)}, [userId],);

  return (
    <>
    {props.isFetching ? <Preloader /> : <Profile profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>}
    </>
  )
};

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  }
};

export default compose (withRouter, withAuthRedirect, connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }))(ProfileContainer);