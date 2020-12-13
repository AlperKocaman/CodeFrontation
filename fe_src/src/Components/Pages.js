import React, {useContext} from "react";
import {Router} from "@reach/router";
import ProblemList from "./ProblemList";
import SubmissionList from "./SubmissionList";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import DataTableCrudDemo from "../Demo/DataTableCrudDemo";

function Pages() {
    return (

        <Router>
            <Dashboard path="/"/>
            <UserList path="users"/>
            <DataTableCrudDemo path="test"/>
            <ProblemList path="admin/problems"/>
            <SubmissionList path="admin/submissions"/>
            <UserList path="admin/users"/>
        </Router>

    );
}

export default Pages;
