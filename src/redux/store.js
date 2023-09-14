// import dialogReducer from "./dialog-reducer";
// import profileReducer from "./profile-reducer";
// import sidebarReducer from "./sidebar-reducer";

// let store = {

//     _state: {
//         profilePage: {
//             posts: [
//                 { id: 1, message: 'Hi, how are you?', likesCount: 20 },
//                 { id: 2, message: "It's my first message", likesCount: 30 }
//             ],
//             newPostText: ''
//         },

//         dialogsPage: {
//             dialogs: [
//                 { id: 1, name: 'Dima' },
//                 { id: 2, name: 'Vasya' },
//                 { id: 3, name: 'Katya' },
//                 { id: 4, name: 'Serega' },
//                 { id: 5, name: 'Volodya' },
//                 { id: 6, name: 'Anya' }
//             ],
//             messages: [
//                 { id: 1, message: 'Hi there!' },
//                 { id: 2, message: 'How is your day?' },
//                 { id: 3, message: 'Whatever, dude' },
//                 { id: 4, message: 'Hi there!' },
//                 { id: 5, message: 'How is your day?' },
//                 { id: 6, message: 'Whatever, dude' }
//             ],
//             newMessageBody: ''
//         },

//         sidebar: {}
//     },

//     _callSubscriber() {
//         console.log('State has been changed');
//     },

//     getState() {
//         return (this._state);
//     },

//     // addPost() {
//     //     let newPost = {
//     //         id: 5,
//     //         message: this._state.profilePage.newPostText,
//     //         likesCount: 0
//     //     }
//     //     this._state.profilePage.posts.push(newPost);
//     //     this._state.profilePage.newPostText = '';
//     //     this._callSubscriber(this._state);
//     // },

//     // updateNewPostText(newText) {
//     //     this._state.profilePage.newPostText = newText;
//     //     this._callSubscriber(this._state);
//     // },

//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action);

//         this._callSubscriber(this._state);
//     },

//     subscribe(observer) {
//         this._callSubscriber = observer;
//     }
// }

// export default store;