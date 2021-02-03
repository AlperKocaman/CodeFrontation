import React, {Component} from "react";
import Authentication from "./Authentication";
import { Button } from 'primereact/button';
import { auth, generateUserDocument } from "./Firebase";
import AdminPages from "./AdminPages";
import { navigate } from '@reach/router';
import UserService from "../service/UserService";
import Pages from "./Pages";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAdmin: null,
            checkUser:false
        };
        this.userService = new UserService();
    }

    componentDidMount = async () => {   //FIXME : auth methodu constructor'a taşınabilir
        auth.onAuthStateChanged(async  userAuth =>  {
            let user = await generateUserDocument(userAuth);
            if (userAuth) {
                userAuth.getIdToken().then(idToken =>  {
                    const username=user.username;
                    this.userService.getUserByUsername(username, idToken).then(res => {
                     if(res && res.data ) {
                         this.setState({isAdmin: res.data.isAdmin});
                     }else{
                         user=null;
                     }
                     const checkUser = true;
                     this.setState({ user, checkUser });
                    });

                });
            }else{
                const checkUser = true;
                this.setState({ user, checkUser });
            }
        });
    };

    render() {
            let { user, checkUser, isAdmin } = this.state;
            return (
                <div>
                    { checkUser &&
                    <div>
                        { user && isAdmin &&
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

                              <AdminPages/>
                        </div>}
                            { user && !isAdmin &&
                            <div  style = {{width: '98vw', height: '100vh'}}>
                            <span className="p-buttonset" >
                                <div style = {{marginBottom : '0.5%',  backgroundColor: '#2196F3', display: 'flex-end', flexDirection: 'row'}} >
                            <Button style = {{fontSize: '20px', textColor:'#2196F3'}} label="Problems" className="p-button-raised  p-text-bold" onClick = { () => { navigate('/admin/problems')} } />
                            <Button style = {{fontSize: '20px', textcolor:'red', float: "right"}} label="Sign out" className="p-button-raised  p-text-bold" onClick = { () => {auth.signOut(); navigate('/') } } />
                            </div>
                            </span>

                            <Pages username={this.state.user.username} />
                        </div>}
                        { !user &&
                        <Authentication />}
                    </div>}
                </div>
            )
        }
}
export default Main;




