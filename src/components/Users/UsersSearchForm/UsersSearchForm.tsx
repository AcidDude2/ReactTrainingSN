import React from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "redux/users-reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../../redux/users-selectors";


type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = "true" | "false" | "null";

type FormValuesType = {
  term: string;
  friend: "true" | "false" | "null";
};

const usersSearchFormValidate = () => {
  const errors = {};
  return errors;
};

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);
  const submit = (values: FormValuesType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  const clearFilter = () => {
    const emptyFilter: FilterType = {
      term: "",
      friend: null
    };
    props.onFilterChanged(emptyFilter);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value={"null"}>All</option>
              <option value={"true"}>Followed</option>
              <option value={"false"}>Unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>Find</button>
            <button type="button" onClick={() => 
              {resetForm();
              clearFilter();}}>Clear</button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;