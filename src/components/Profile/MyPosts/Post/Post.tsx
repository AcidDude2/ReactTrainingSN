import React from "react";
import styles from "../Post/Post.module.css";


type PropsType = {
  message: string
  likes_counter: number
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div className={styles.item}>
        <img src="https://cs10.pikabu.ru/post_img/big/2019/11/11/10/1573494458145017681.png" />
        {props.message}
        <div>
          <span>like</span> {props.likes_counter}
        </div>
      </div>
    </div>
  )
};

export default Post;