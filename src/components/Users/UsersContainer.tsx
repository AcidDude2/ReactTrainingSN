import React from "react";
import { Users } from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching } from "../../redux/users-selectors";
import { useSelector } from "react-redux";

type UsersContainerPropsType = {
  pageTitle: string
};

const UsersContainer: React.FC<UsersContainerPropsType> = (props) => {

  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching ? <Preloader /> : <>
        <h2>{props.pageTitle}</h2>
        <Users />
      </>}
    </>
  );
};

export default UsersContainer;