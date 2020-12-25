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
                    <div style = {{marginBottom : '0.5%',  backgroundColor: '#2196F3'}} >
                    <Button style = {{fontSize: '20px', textColor:'#2196F3'}} label="Problems" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/problems')} } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Submissions" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/submissions') } } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Users" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/users') } } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Comments" className="p-button-raised  p-text-bold" onClick = { () => {navigate('/admin/comments') } } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Templates" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/templates') } } />
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
