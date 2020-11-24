import React, {Component, Suspense, useContext} from "react";
import { Router } from "@reach/router";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
import './App.css';
import ProfilePage from "./Components/ProfilePage";
import { UserContext } from "./providers/UserProvider";
import Compiler from "./Components/Compiler";
import PasswordReset from "./Components/PasswordReset";
import {auth, generateUserDocument} from "./Components/Firebase";

class App extends Component {
    state = {
        user: null
    };
    check=false;
    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            this.setState({ user });
        });
    };
    render() {
        let { user } = this.state;
        user=true;  //login mekanizmasını kaldırmak için konuldu
        return (
            <div>
            <div className={user ?  '' :'hidden'}>
                    <Compiler />
                </div>
                <div className={user ? 'hidden' : ''}>
                    <Application />
                </div>
            </div>
        );
    }
}

export default App;
