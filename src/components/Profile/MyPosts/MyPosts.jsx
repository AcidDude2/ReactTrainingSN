import React from "react";
import styles from "../MyPosts/MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }

  let postsElement = props.posts.map(p => <Post message={p.message} likes_counter={p.likesCount} />)

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div>
        <textarea onChange={ onPostChange } ref={newPostElement} value={props.newPostText}/>
      </div>
      <div>
        <button onClick={onAddPost}>Add Post</button>
      </div>
      <div className={styles.posts}>
        {postsElement}
      </div>
    </div>
  )
}

export default MyPosts;