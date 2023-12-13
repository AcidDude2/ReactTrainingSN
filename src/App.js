import React, { Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import GlobalPreloader from "./components/common/GlobalPreloader/GlobalPreloader";
import { compose } from "redux";
import { withRouter } from "./hoc/withRouter";
import store from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  };

  render() {

    if (!this.props.initialized) {
      return <GlobalPreloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
};

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