import React, {useContext, useEffect, useState} from "react";
import {Link} from "@reach/router";
import {auth, signInWithGoogle, generateUserDocument} from "./Firebase";
import UserService from "../service/UserService";

const SignUp = () => {
    let userService = new UserService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {

        event.preventDefault();
        try {
            let req = {
                username: username,
                firstName: firstname,
                lastName: lastname,
                email: email,
                isAdmin: false,
            }
            await userService.addUser(req);
            console.log("user signup success");
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            let userInfo = await generateUserDocument(user, {firstname, lastname, username});

        } catch (error) {
            setError('Error Signing up with email and password');
        }

        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setUsername("");
    };

    const onChangeHandler = event => {
        const {name, value} = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "firstname") {
            setFirstname(value);
        } else if (name === "lastname") {
            setLastname(value);
        } else if (name === "username") {
            setUsername(value);
        }
    }

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="username" className="block">
            Username:
          </label>
          <input
              type="text"
              className="my-1 p-1 w-full "
              name="username"
              value={username}
              placeholder="E.g: testUser"
              id="username"
              onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="firstname" className="block">
            First Name:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="firstname"
            value={firstname}
            placeholder="E.g: Ali"
            id="firstname"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="lastname" className="block">
            Last Name:
          </label>
          <input
              type="text"
              className="my-1 p-1 w-full "
              name="lastname"
              value={lastname}
              placeholder="E.g: Dogan"
              id="lastname"
              onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: test123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        {/*<p className="text-center my-3">or</p>
        <button
          onClick={() => {
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
        >
          Sign In with Google
        </button>*/}
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
