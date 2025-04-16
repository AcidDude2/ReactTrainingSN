import React from "react";
import styles from "../MyPosts/MyPosts.module.css";
import Post from "./Post/Post";
import AddNewPostForm from "./AddPostForm/AddPostForm";
import { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { PostType } from "types/types";


export type MapPropsType = {
  posts: Array<PostType>
};

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
};


const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

  let postsElement = [...props.posts].reverse().map(p => <Post key={p.id} message={p.message} likes_counter={p.likesCount} />)

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostForm onSubmit={onAddPost} />
      </div>
      <div className={styles.posts}>
        {postsElement}
      </div>
    </div>
  )
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;