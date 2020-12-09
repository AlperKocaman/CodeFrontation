import React, {useContext} from "react";
import {Router} from "@reach/router";
import ProblemList from "./ProblemList";
import SubmissionList from "./SubmissionList";
import UserList from "./UserList";
import Dashboard from "./Dashboard";

function Pages() {
    return (

        <Router>
            <Dashboard path="/"/>
            <ProblemList path="admin/problems"/>
            <SubmissionList path="admin/submissions"/>
            <UserList path="admin/users"/>
        </Router>

    );
}

export default Pages;
