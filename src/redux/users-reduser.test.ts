import usersReducer, { actions, InitialStateType } from "./users-reducer";


let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      { id: 0, name: "User0", status: "", photos: { small: null, large: null }, followed: true },
      { id: 1, name: "User1", status: "", photos: { small: null, large: null }, followed: true },
      { id: 2, name: "User2", status: "", photos: { small: null, large: null }, followed: false },
      { id: 3, name: "User3", status: "", photos: { small: null, large: null }, followed: false },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  }
});

test("follow success", () => {
  const newState = usersReducer(state, actions.followSuccess(2));

  expect(newState.users[2].followed).toBeTruthy;
  expect(newState.users[3].followed).toBeFalsy;
});

test("unfollow success", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(1));

  expect(newState.users[0].followed).toBeTruthy;
  expect(newState.users[1].followed).toBeFalsy;
});