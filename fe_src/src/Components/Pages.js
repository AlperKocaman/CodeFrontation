import React, {useContext} from "react";
import {Router} from "@reach/router";
import ProblemList from "./ProblemList";
import SubmissionList from "./SubmissionList";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import DataTableCrudDemo from "../Demo/DataTableCrudDemo";
import Compiler from "./Compiler";
import UserListTest from "../Demo/UserListTest";

function Pages() {
    return (

        <Router>
            <Compiler path="/"/>
            <Dashboard path="admin"/>
            <UserListTest path="users"/>
            <DataTableCrudDemo path="test"/>
            <ProblemList path="admin/problems"/>
            <ProblemList path="admin/problems/:username"/>
            <SubmissionList path="admin/submissions"/>
            <SubmissionList path="admin/submissions/:username"/>
            <SubmissionList path="admin/submissions/:username/:problemCode"/>
            <UserList path="admin/users"/>
        </Router>


    );
}

export default Pages;
