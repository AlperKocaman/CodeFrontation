import React, {Component, Suspense, useContext} from "react";
import Application from "./Components/Application";
import './App.css';
import Compiler from "./Components/Compiler";
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
