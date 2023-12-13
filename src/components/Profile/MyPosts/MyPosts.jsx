import React from "react";
import styles from "../MyPosts/MyPosts.module.css";
import Post from "./Post/Post";
import { AddNewPostReduxForm } from "./AddPostForm/AddPostForm";


const MyPosts = React.memo((props) => {
  // console.log("RENDERED")

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }

  let postsElement = [...props.posts].reverse().map(p => <Post message={p.message} likes_counter={p.likesCount} />)

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostReduxForm onSubmit={onAddPost} />
      </div>
      <div className={styles.posts}>
        {postsElement}
      </div>
    </div>
  )
});


export default MyPosts;