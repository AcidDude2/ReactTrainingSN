import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile } from "../../redux/profile-reducer";
import { Navigate, useParams } from 'react-router-dom';
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


function ProfileContainer(props) {
  let { userId } = useParams();

  useEffect(() => {props.getUserProfile(userId)}, [userId],);

  return (
    <>
    {props.isFetching ? <Preloader /> : <Profile profile={props.profile} />}
    </>
  )
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
  }
}

export default compose (withAuthRedirect, connect(mapStateToProps, { getUserProfile }))(ProfileContainer);