import React, {Component} from "react";
import Authentication from "./Authentication";
import { Button } from 'primereact/button';
import { auth, generateUserDocument } from "./Firebase";
import Pages from "./Pages";
import { navigate } from '@reach/router';

class Main extends Component {
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
                <div>
                    { checkUser && <div>
                        { user &&
                        <div  style = {{width: '98vw', height: '100vh'}}>
                          <span className="p-buttonset" >
                              <div style = {{marginBottom : '0.5%',  backgroundColor: '#2196F3', display: 'flex-end', flexDirection: 'row'}} >
                              <Button style = {{fontSize: '20px', textColor:'#2196F3'}} label="Problems" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/problems')} } />
                              <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Submissions" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/submissions') } } />
                              <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Users" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/users') } } />
                              <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Comments" className="p-button-raised  p-text-bold" onClick = { () => {navigate('/admin/comments') } } />
                              <Button style = {{fontSize: '20px', textcolor:'#2196F3'}} label="Templates" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/templates') } } />
                              <Button style = {{fontSize: '20px', textcolor:'red', float: "right"}} label="Sign out" className="p-button-raised  p-text-bold" onClick = { () => {auth.signOut(); navigate('/') } } />
                              </div>
                          </span>

                              <Pages/>
                        </div>}
                        { !user &&
                        <Authentication />}
                    </div>}
                </div>
            )
        }
}
export default Main;



