import React, {Component, Suspense, useContext} from "react";
import Authentication from "./Components/Authentication";
import './App.css';
import { Button } from 'primereact/button';
import { auth, generateUserDocument } from "./Components/Firebase";
import Pages from "./Components/Pages";
import { navigate } from '@reach/router';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            checkUser:false
        };
    }

    componentDidMount = async () => {   //FIXME : auth methodu constructor'a taşınabilir
        auth.onAuthStateChanged(async  userAuth =>  {
            const user = await generateUserDocument(userAuth);
            if (userAuth) {
                userAuth.getIdToken().then(idToken =>  {
                    console.log("idTokennnnn: "+idToken);
                });
            }

            const checkUser = true;
            this.setState({ user, checkUser });
        });
    };

    render() {
        let { user } = this.state;
        let { checkUser } = this.state;
        return (
            <div className={checkUser ? '' : 'hidden'}>
                <div className={user ? '' : 'hidden'}>
                <span className="p-buttonset" >
                    <div style = {{marginBottom : '0.5%',  backgroundColor: '#2196F3'}} >
                    <Button style = {{fontSize: '20px', textColor:'#2196F3'}} label="Problems" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/problems')} } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Submissions" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/submissions') } } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Users" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/users') } } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Comments" className="p-button-raised  p-text-bold" onClick = { () => {navigate('/admin/comments') } } />
                    <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Templates" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/templates') } } />
                    <Button style = {{fontSize: '20px', textcolor:'red', marginLeft:'700px'}} label="Sign out" className="p-button-raised  p-text-bold" onClick = { () => {auth.signOut() } } />
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
