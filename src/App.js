import React, { Suspense, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer.ts";
import GlobalPreloader from "./components/common/GlobalPreloader/GlobalPreloader";
import { compose } from "redux";
import { withRouter } from "./hoc/withRouter";
import store from "./redux/redux-store.ts";
import Preloader from "./components/common/Preloader/Preloader";
import SystemMessageWindowContainer from "./components/common/SystemMessageWindow/SystemMessageWindow";


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer.tsx"));
const Login = React.lazy(() => import("./components/Login/Login.tsx"));
const HomePage = React.lazy(() => import("./components/HomePage/HomePage"));


const App = (props) => {
  useEffect(() => { props.initializeApp() })

  if (!props.initialized) {
    return <GlobalPreloader />
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Suspense fallback={<div><Preloader /></div>}>
          <Routes>
            <Route exact path="/" element={props.initialized ? <ProfileContainer /> : <Login />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<UsersContainer pageTitle={"Самураи"}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
        <SystemMessageWindowContainer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SocialNetworkApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
};


export default SocialNetworkApp;