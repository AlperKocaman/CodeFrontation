import React, {Component, Suspense, useContext} from "react";
import Authentication from "./Components/Authentication";
import './App.css';
import {auth, generateUserDocument} from "./Components/Firebase";
import Pages from "./Components/Pages";

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
        user=true;  //FIXME login mekanizmasını kaldırmak için konuldu
        return (
            <div>
            <div className={user ?  '' :'hidden'}>
                    <Pages />
                </div>
                <div className={user ? 'hidden' : ''}>
                    <Authentication />
                </div>
            </div>
        );
    }
}

export default App;
