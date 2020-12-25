import React, {useContext} from "react";
import {Router} from "@reach/router";
import ProblemList from "./ProblemList";
import SubmissionList from "./SubmissionList";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import DataTableCrudDemo from "../Demo/DataTableCrudDemo";
import Compiler from "./Compiler";
import UserListTest from "../Demo/UserListTest";
import Problem from "./Problem";
import AddProblem from "./AddProblem";

function Pages() {
    return (

        <Router>
            <Compiler path="/"/>
            <Dashboard path="admin"/>
            <UserListTest path="users"/>
            <DataTableCrudDemo path="test"/>
            <Problem path="admin/problems/problemKey/:problemCode"/>
            <ProblemList path="admin/problems"/>
            <AddProblem path="admin/problems/addProblem"/>
            <AddProblem path="admin/problems/addProblem/:problemCode"/>
            <ProblemList path="admin/problems/:username"/>
            <SubmissionList path="admin/submissions"/>
            <UserList path="admin/users"/>
        </Router>


    );
}

export default Pages;
