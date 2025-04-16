import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer.ts";
import { Navigate, useParams } from 'react-router-dom';
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { withRouter } from "../../hoc/withRouter.tsx";
import { AppStateType } from "redux/redux-store.ts";
import { ProfileType } from "types/types.ts";


type MapPropsType = {
    profile: ProfileType | null
    isFetching: boolean
    status: string
    authorizedUserId: number | null
    isAuth: boolean
};

type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileContainer: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let { userId: stringUserId } = useParams<{ userId: string }>();

  let userId: number | null = null;
  if (stringUserId === undefined || stringUserId === "") {
    userId = props.authorizedUserId;
  } else {
    userId = parseInt(stringUserId);
    if (isNaN(userId)) {
      userId = null;
    }
  }

  useEffect(() => {
    if (userId !== null) {
      props.getUserProfile(userId);
      props.getStatus(userId);
    } else {
      console.error("ID should exist in URI params or in state ('authorizedUserId')");
    }
  }, [userId]);

  if (!userId) {
    return <Navigate to="/profile/" />;
  }

  // const catchAllUnhandleErrors = (reason, promise) => {
  //   alert("Some error occured")
  // }

  // window.addEventListener("unhandledrejection", catchAllUnhandleErrors);

  return (
    <>
      {props.isFetching ? <Preloader /> : <Profile
        isOwner={!(userId != props.authorizedUserId)}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile} />}
    </>
  )
};

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  }
};

export default compose<React.FC>(
  withRouter,
  withAuthRedirect,
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile })
)(ProfileContainer);