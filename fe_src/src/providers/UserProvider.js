import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../Components/Firebase";


export const UserContext = createContext({ user: null }); //TODO provider kulanılmıyor app.js'e taşındı sonra düzelt

class UserProvider extends Component {
  state = {
    user: null
  };

  
  
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });


  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
