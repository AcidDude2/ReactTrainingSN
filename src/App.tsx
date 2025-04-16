import React, { Suspense, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer.ts";
import GlobalPreloader from "./components/common/GlobalPreloader/GlobalPreloader";
import { compose } from "redux";
import { withRouter } from "./hoc/withRouter.tsx";
import store, { AppStateType } from "./redux/redux-store.ts";
import Preloader from "components/common/Preloader/Preloader";
import SystemMessageWindowContainer from "./components/common/SystemMessageWindow/SystemMessageWindow.tsx";
import { Login } from "./components/Login/Login.tsx";


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer.tsx"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer.tsx"));
const News = React.lazy(() => import("./components/News/News.tsx"));
const Music = React.lazy(() => import("./components/Music/Music.tsx"));
const Settings = React.lazy(() => import("./components/Settings/Settings.tsx"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer.tsx"));
const HomePage = React.lazy(() => import("./components/HomePage/HomePage.tsx"));


const App: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  // const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
  //   alert("Some error occured")
  // }
  // useEffect(() => { catchAllUnhandledErrors })
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
            <Route path="/" element={props.initialized ? <ProfileContainer /> : <Login />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<UsersContainer pageTitle={"Самураи"} />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
        <SystemMessageWindowContainer />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SocialNetworkApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
};

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchToPropsType = {
  initializeApp: () => void
};

export default SocialNetworkApp;