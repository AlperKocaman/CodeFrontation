import React, {Component, Suspense, useContext} from "react";
import Authentication from "./Components/Authentication";
import './App.css';
import { Button } from 'primereact/button';
import { auth, generateUserDocument } from "./Components/Firebase";
import Pages from "./Components/Pages";
import { navigate } from '@reach/router';

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
                <div className={user ? '' : 'hidden'}>
                <span className="p-buttonset" >
                    <div style = {{marginBottom : '0.5%'}}>
                    <Button label="Problems" className="p-button-raised p-button-text" onClick = { () => { navigate('/admin/problems')} } />
                    <Button label="Submissions" className="p-button-raised p-button-text" onClick = { () => { navigate('/admin/submissions') } } />
                    <Button label="Users" className="p-button-raised p-button-text" onClick = { () => { navigate('/admin/users') } } />
                    <Button label="Comments" className="p-button-raised p-button-text" onClick = { () => {navigate('/admin/comments') } } />
                    <Button label="Templates" className="p-button-raised p-button-text" onClick = { () => { navigate('/admin/templates') } } />
                    </div>       
                </span>

                    <Pages/>
                </div>
                <div className={user ? 'hidden' : ''}>
                    <Authentication />
                </div>
            </div>
        );
    }
}

export default App;
