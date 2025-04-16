import { usersAPI } from "api/users-api";
import { follow, unfollow, actions } from "./users-reducer";
import { APIResponseType, ResultCodesEnum } from "api/instance";


jest.mock("../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear,
  getStateMock.mockClear,
  usersAPIMock.follow.mockClear,
  usersAPIMock.unfollow.mockClear
});

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
};

test("Follow success thunk", async () => {
  usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

  const thunk = follow(2);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toHaveBeenCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 2));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 2));
});

test("Unfollow success thunk", async () => {
  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
  
  const thunk = unfollow(2);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toHaveBeenCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 2));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 2));
});