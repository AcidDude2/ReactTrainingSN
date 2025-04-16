import { AppStateType } from "redux/redux-store.ts";
import { actions } from "../../../redux/profile-reducer.ts";
import MyPosts, { MapPropsType, DispatchPropsType } from "./MyPosts.tsx";
import { connect } from "react-redux";


let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer;