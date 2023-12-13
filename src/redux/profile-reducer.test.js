import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";


let state = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 20 },
        { id: 2, message: "It's my first message", likesCount: 30 }
    ]
};

it("length of post shouldbe increment", () => {
    let action = addPostActionCreator("Some text");

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it("message of new post should be correct", () => {
    let action = addPostActionCreator("Some text");

    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe("Some text");
});

it("after deleting length of message should be decrement", () => {
    let action = deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});

it("after deleting length of message shouldn't be decrement if id is incorrect", () => {
    let action = deletePost(1000);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});