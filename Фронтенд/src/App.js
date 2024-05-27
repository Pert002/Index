import React, { useLayoutEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import {store} from "./store";
import MainPage from "./components/mainPage/MainPage";
import Authentication from "./components/login/authentication/Authentication";
import Registration from "./components/login/registration/Registration";
import Profile from "./components/login/Profile/Profile";
import PasswordReset from "./components/login/passwordReset/PasswordReset";
import AboutProject from "./components/aboutProject/components/AboutProject";
import IndexCalculation from "./components/index/components/IndexCalculation";
import {setAuthenticated, setUser} from "./store/slices/userSlice";
import './styles/App.css'
import axios from "axios";
import ForumTopics from "./components/forum/components/ForumTopics";
import ForumMessages from "./components/forum/components/ForumMessages";
import AdminPanel from "./components/admin/components/AdminPanel";
function App() {
    useLayoutEffect(() => {
        const token = localStorage.getItem('userToken');

        if (token) {
            axios.get('http://localhost:4444/auth/me', {
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'authorization': token,
                },
            })
                .then(user => {
                    store.dispatch(setUser({
                        email: user.data.email,
                        id: user.data._id,
                        token: token,
                        fullName: user.data.fullName,
                        role: user.data.role
                    }));
                    store.dispatch(setAuthenticated());
                })
                .catch(error => {
                    console.log(error)
                })
        }
}, [])


  return (
      <PrimeReactProvider >
          <Router>
              <div className="App">
                  <Provider store={store}>
                  <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/authentication" element={<Authentication />}> </Route>
                      <Route path="/registration" element={<Registration />}></Route>
                      <Route path="/profile" element={<Profile />}></Route>
                      <Route path="/passres" element={<PasswordReset />}></Route>
                      <Route path="/about_project" element={<AboutProject />}></Route>
                      <Route path="/index" element={<IndexCalculation />}></Route>
                      <Route path="/forum" element={<ForumTopics />}></Route>
                      <Route path={`/forum/:id`} element={<ForumMessages />}></Route>
                      <Route path={'/admin'} element={<AdminPanel />}> </Route>
                  </Routes>
                  </Provider>
              </div>
          </Router>
      </PrimeReactProvider>
  );
}

export default App;
